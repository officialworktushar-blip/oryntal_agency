"use client";

// Form data is not sent anywhere yet. Connect onSubmit to your email/CRM/API.

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Package,
  Layers,
  Boxes,
  Compass,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import { contactForm } from "@/lib/content/contactForm";

interface FormValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
}

interface EnquiryPayload {
  domain: string;
  options: string[];
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
  emi: boolean;
  consent: boolean;
  source: "contact-page";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const domainIcons = { Package, Layers, Boxes, Compass };

const initialValues: FormValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  message: "",
};

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#673DE6] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#5025D1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#C9C2E6] disabled:hover:bg-[#C9C2E6]";

const ghostButton =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-[#4A2FB8] transition-colors duration-150 hover:bg-[#F1EEFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50";

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1D1E20] outline-none transition focus:border-[#673DE6]/50 focus:ring-2 focus:ring-[#673DE6]/30 ${
    hasError ? "border-red-400" : "border-[#E3E4E8]"
  }`;
}

async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  // TODO: connect to your email/CRM/API. For now it resolves immediately.
  await Promise.resolve();
  void payload;
}

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [domainId, setDomainId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [emi, setEmi] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [sending, setSending] = useState(false);

  const didPrefill = useRef(false);
  const successTitleRef = useRef<HTMLHeadingElement>(null);

  const allOptionIds = useMemo(
    () =>
      new Set(
        contactForm.domains.flatMap((domain) =>
          domain.groups.flatMap((group) =>
            group.options.map((option) => option.id),
          ),
        ),
      ),
    [],
  );

  const domain = useMemo(
    () => contactForm.domains.find((item) => item.id === domainId) ?? null,
    [domainId],
  );

  const selectedLabels = useMemo(
    () =>
      domain
        ? domain.groups.flatMap((group) =>
            group.options
              .filter((option) => selected.includes(option.id))
              .map((option) => option.label),
          )
        : [],
    [domain, selected],
  );

  const emiOptionIds = useMemo(() => {
    const individual = contactForm.domains.find(
      (item) => item.id === "individual",
    );
    const group = individual?.groups.find(
      (item) => item.title === "Website & Application Development",
    );
    return new Set(group?.options.map((option) => option.id) ?? []);
  }, []);

  const emiApplies =
    domainId === "packages" ||
    (domainId === "individual" && selected.some((id) => emiOptionIds.has(id)));

  useEffect(() => {
    if (didPrefill.current) return;
    didPrefill.current = true;

    const interest = searchParams.get("interest") ?? "";
    const topic = searchParams.get("topic") ?? "";
    const message = searchParams.get("message");

    let nextDomain: string | null = null;
    let nextOption: string | null = null;

    if (
      interest === "business-packages" ||
      interest === "digital-foundation-package" ||
      interest === "business-automation-package" ||
      interest === "premium-custom-system"
    ) {
      nextDomain = "packages";
      if (interest === "digital-foundation-package") {
        nextOption = "digital-foundation";
      } else if (interest === "business-automation-package") {
        nextOption = "business-automation";
      } else if (interest === "premium-custom-system") {
        nextOption = "premium-custom-system";
      }
    } else if (
      interest === "website-and-app-development" ||
      interest === "ai-development-and-automation" ||
      interest === "software-api-and-system-integration" ||
      interest === "business-operations-and-sourcing-support" ||
      interest === "individual-services"
    ) {
      nextDomain = "individual";
      if (topic && allOptionIds.has(topic)) {
        nextOption = topic;
      }
    } else if (
      interest === "qr2-review" ||
      interest === "pre-built-products"
    ) {
      nextDomain = "products";
      if (interest === "qr2-review") {
        nextOption = "qr2-review";
      }
    } else if (
      interest === "three-month-engagement" ||
      interest === "custom-consultation" ||
      interest === "consultation"
    ) {
      nextDomain = "consultation";
      if (interest === "three-month-engagement") {
        nextOption = "three-month-engagement";
      }
    }

    if (nextDomain) {
      setDomainId(nextDomain);
      if (nextOption) setSelected([nextOption]);
      setStep(1);
    }

    if (message) {
      setValues((previous) => ({ ...previous, message }));
    }
  }, [searchParams, allOptionIds]);

  useEffect(() => {
    if (status === "sent") {
      successTitleRef.current?.focus();
    }
  }, [status]);

  function chooseDomain(id: string) {
    setDomainId(id);
    setSelected([]);
    setEmi(false);
    setErrors({});
  }

  function toggleOption(optionId: string, allowMultiple: boolean) {
    setSelected((previous) => {
      if (!allowMultiple) {
        return previous.includes(optionId) ? [] : [optionId];
      }
      return previous.includes(optionId)
        ? previous.filter((id) => id !== optionId)
        : [...previous, optionId];
    });
  }

  function goToStep(index: number) {
    if (index < step) {
      setStep(index);
      setErrors({});
    }
  }

  function handleValueChange(field: keyof FormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function clearError(field: string) {
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function focusField(field: string) {
    const element = document.getElementById(`enquiry-${field}`);
    if (element instanceof HTMLElement) element.focus();
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!values.business.trim()) {
      nextErrors.business = "Please enter your business name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }
    if (!consent) {
      nextErrors.consent = "Please agree to be contacted about your enquiry.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const order = ["name", "business", "email", "phone", "consent"];
      const first = order.find((key) => nextErrors[key]);
      if (first) focusField(first);
      return;
    }

    setErrors({});
    setSending(true);

    const payload: EnquiryPayload = {
      domain: domain?.label ?? "",
      options: selectedLabels,
      name: values.name.trim(),
      business: values.business.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      emi: emiApplies ? emi : false,
      consent,
      source: "contact-page",
    };

    await submitEnquiry(payload);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setSending(false);
    setStatus("sent");
  }

  function resetForm() {
    setStatus("idle");
    setStep(0);
    setDomainId(null);
    setSelected([]);
    setValues(initialValues);
    setEmi(false);
    setConsent(false);
    setErrors({});
    setSending(false);
  }

  const stepMotionProps = {
    initial: reduceMotion ? false : { opacity: 0.6, y: 10 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    exit: reduceMotion ? undefined : { opacity: 0.6, y: -10 },
    transition: reduceMotion
      ? undefined
      : { duration: 0.24, ease: "easeOut" as const },
  };

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-title"
      className="relative scroll-mt-24 py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6F3FF 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="sr-only">{contactForm.srSummary}</p>

        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#673DE6]">
            <span
              aria-hidden="true"
              className="inline-block h-[9px] w-[9px] rounded-[2px] bg-[#673DE6]"
            />
            {contactForm.eyebrow}
          </p>
          <h2
            id="enquiry-title"
            className="mt-4 text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-[#1D1E20] md:text-5xl"
          >
            {contactForm.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#1D1E20]/70 md:text-lg">
            {contactForm.sub}
          </p>
        </div>

        <ol
          aria-label="Form progress"
          className="mt-10 flex items-center gap-2"
        >
          {contactForm.steps.map((label, index) => {
            const isDone = index < step;
            const isActive = index === step;
            return (
              <li
                key={label}
                className={`flex items-center gap-2 ${
                  index === contactForm.steps.length - 1
                    ? "shrink-0"
                    : "flex-1"
                }`}
              >
                <button
                  type="button"
                  onClick={() => goToStep(index)}
                  disabled={index >= step}
                  aria-current={isActive ? "step" : undefined}
                  className="flex shrink-0 items-center gap-2 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 disabled:cursor-default"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isDone
                        ? "bg-[#673DE6] text-white"
                        : isActive
                          ? "bg-white text-[#673DE6] ring-2 ring-[#673DE6]"
                          : "border border-[#E3E4E8] bg-white text-[#6B6F7A]"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={`hidden text-sm sm:inline ${
                      isActive
                        ? "font-semibold text-[#1D1E20]"
                        : "text-[#6B6F7A]"
                    }`}
                  >
                    {label}
                  </span>
                </button>
                {index < contactForm.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`h-0.5 flex-1 rounded-full ${
                      index < step ? "bg-[#673DE6]" : "bg-[#E3E4E8]"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-[28px] border border-[#E3E4E8] bg-white p-5 shadow-[0_20px_60px_rgba(70,40,200,0.08)] sm:p-8 md:p-10">
          {status === "sent" ? (
            <div
              aria-live="polite"
              className="flex flex-col items-center py-6 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F7EE]">
                <CheckCircle2
                  className="h-9 w-9"
                  style={{ color: "#12805C" }}
                  aria-hidden="true"
                />
              </span>
              <h3
                ref={successTitleRef}
                tabIndex={-1}
                className="mt-6 text-2xl font-semibold text-[#1D1E20] outline-none"
              >
                {contactForm.success.title}
              </h3>
              <p className="mt-3 max-w-xl text-base text-[#1D1E20]/70">
                {contactForm.success.text}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {domain && (
                  <span className="rounded-full bg-[#F1EEFF] px-3 py-1 text-[13px] text-[#4A2FB8]">
                    {domain.label}
                  </span>
                )}
                {selectedLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-[#F1EEFF] px-3 py-1 text-[13px] text-[#4A2FB8]"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="mt-8 text-sm font-semibold text-[#673DE6] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
              >
                Send another request
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div key="step-0" {...stepMotionProps}>
                  <div
                    role="radiogroup"
                    aria-label="Service domain"
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {contactForm.domains.map((item) => {
                      const Icon = domainIcons[item.icon];
                      const isSelected = item.id === domainId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => chooseDomain(item.id)}
                          className={`relative rounded-2xl border-2 p-5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 ${
                            isSelected
                              ? "border-[#673DE6] bg-[#F6F3FF]"
                              : "border-[#E3E4E8] bg-white hover:-translate-y-0.5 hover:border-[#CFC4FF]"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#673DE6] text-white">
                              <Check
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EEFF]">
                            <Icon
                              className="h-[22px] w-[22px]"
                              style={{ color: "#673DE6" }}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="mt-4 block text-[18px] font-semibold text-[#1D1E20]">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-[14px] text-[#1D1E20]/65">
                            {item.tagline}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={!domainId}
                      className={primaryButton}
                    >
                      {contactForm.buttons.next}
                      <ArrowRight
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && domain && (
                <motion.div key="step-1" {...stepMotionProps}>
                  <p className="text-sm text-[#1D1E20]/65">
                    {domain.allowMultiple
                      ? "Choose one or more."
                      : "Choose one."}
                  </p>

                  {domain.groups.map((group, groupIndex) => (
                    <div
                      key={group.title ?? `group-${groupIndex}`}
                      className={groupIndex === 0 ? "" : "mt-6"}
                    >
                      {group.title && (
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#673DE6]">
                          {group.title}
                        </p>
                      )}
                      <div
                        role={domain.allowMultiple ? "group" : "radiogroup"}
                        aria-label={group.title ?? domain.label}
                        className="mt-3 grid gap-3 sm:grid-cols-2"
                      >
                        {group.options.map((option) => {
                          const isSelected = selected.includes(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              role={
                                domain.allowMultiple ? "checkbox" : "radio"
                              }
                              aria-checked={isSelected}
                              onClick={() =>
                                toggleOption(option.id, domain.allowMultiple)
                              }
                              className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 ${
                                isSelected
                                  ? "border-[#673DE6] bg-[#F6F3FF]"
                                  : "border-[#E3E4E8] bg-white hover:border-[#CFC4FF]"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center border-2 ${
                                  domain.allowMultiple
                                    ? "rounded-md"
                                    : "rounded-full"
                                } ${
                                  isSelected
                                    ? "border-[#673DE6] bg-[#673DE6]"
                                    : "border-[#C9CBD3] bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <Check
                                    className="h-3.5 w-3.5 text-white"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[16px] font-semibold text-[#1D1E20]">
                                  {option.label}
                                </span>
                                <span className="mt-0.5 block text-[13.5px] text-[#1D1E20]/65">
                                  {option.hint}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <p
                    aria-live="polite"
                    className="mt-5 text-sm text-[#1D1E20]/65"
                  >
                    {selected.length} selected
                  </p>

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className={ghostButton}
                    >
                      <ArrowLeft
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      />
                      {contactForm.buttons.back}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={selected.length === 0}
                      className={primaryButton}
                    >
                      {contactForm.buttons.next}
                      <ArrowRight
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step-2" {...stepMotionProps}>
                  <div className="flex flex-wrap items-center gap-2">
                    {domain && (
                      <span className="rounded-full bg-[#F1EEFF] px-3 py-1 text-[13px] text-[#4A2FB8]">
                        {domain.label}
                      </span>
                    )}
                    {selectedLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full bg-[#F1EEFF] px-3 py-1 text-[13px] text-[#4A2FB8]"
                      >
                        {label}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[13px] font-semibold text-[#673DE6] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
                    >
                      Edit
                    </button>
                  </div>

                  <form noValidate onSubmit={handleSubmit} className="mt-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enquiry-name"
                          className="mb-1.5 block text-sm font-medium text-[#1D1E20]"
                        >
                          {contactForm.fields.name.label}
                          <span className="ml-1 text-[#673DE6]">*</span>
                        </label>
                        <input
                          id="enquiry-name"
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={(event) =>
                            handleValueChange("name", event.target.value)
                          }
                          placeholder={contactForm.fields.name.placeholder}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name ? "enquiry-name-error" : undefined
                          }
                          className={inputClass(Boolean(errors.name))}
                        />
                        {errors.name && (
                          <p
                            id="enquiry-name-error"
                            role="alert"
                            className="mt-1 text-[13px] text-red-600"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-business"
                          className="mb-1.5 block text-sm font-medium text-[#1D1E20]"
                        >
                          {contactForm.fields.business.label}
                          <span className="ml-1 text-[#673DE6]">*</span>
                        </label>
                        <input
                          id="enquiry-business"
                          name="business"
                          type="text"
                          value={values.business}
                          onChange={(event) =>
                            handleValueChange("business", event.target.value)
                          }
                          placeholder={contactForm.fields.business.placeholder}
                          aria-invalid={Boolean(errors.business)}
                          aria-describedby={
                            errors.business
                              ? "enquiry-business-error"
                              : undefined
                          }
                          className={inputClass(Boolean(errors.business))}
                        />
                        {errors.business && (
                          <p
                            id="enquiry-business-error"
                            role="alert"
                            className="mt-1 text-[13px] text-red-600"
                          >
                            {errors.business}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-email"
                          className="mb-1.5 block text-sm font-medium text-[#1D1E20]"
                        >
                          {contactForm.fields.email.label}
                          <span className="ml-1 text-[#673DE6]">*</span>
                        </label>
                        <input
                          id="enquiry-email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={(event) =>
                            handleValueChange("email", event.target.value)
                          }
                          placeholder={contactForm.fields.email.placeholder}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email ? "enquiry-email-error" : undefined
                          }
                          className={inputClass(Boolean(errors.email))}
                        />
                        {errors.email && (
                          <p
                            id="enquiry-email-error"
                            role="alert"
                            className="mt-1 text-[13px] text-red-600"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-phone"
                          className="mb-1.5 block text-sm font-medium text-[#1D1E20]"
                        >
                          {contactForm.fields.phone.label}
                          <span className="ml-1 text-[#673DE6]">*</span>
                        </label>
                        <input
                          id="enquiry-phone"
                          name="phone"
                          type="tel"
                          value={values.phone}
                          onChange={(event) =>
                            handleValueChange("phone", event.target.value)
                          }
                          placeholder={contactForm.fields.phone.placeholder}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={
                            errors.phone ? "enquiry-phone-error" : undefined
                          }
                          className={inputClass(Boolean(errors.phone))}
                        />
                        {errors.phone && (
                          <p
                            id="enquiry-phone-error"
                            role="alert"
                            className="mt-1 text-[13px] text-red-600"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="enquiry-message"
                        className="mb-1.5 block text-sm font-medium text-[#1D1E20]"
                      >
                        {contactForm.fields.message.label}
                      </label>
                      <textarea
                        id="enquiry-message"
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={(event) =>
                          handleValueChange("message", event.target.value)
                        }
                        placeholder={contactForm.fields.message.placeholder}
                        className={inputClass(false)}
                      />
                    </div>

                    {emiApplies && (
                      <label className="mt-4 flex items-start gap-3 text-sm text-[#1D1E20]">
                        <input
                          type="checkbox"
                          checked={emi}
                          onChange={(event) => setEmi(event.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-[#C9CBD3] text-[#673DE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
                        />
                        <span>{contactForm.fields.emi.label}</span>
                      </label>
                    )}

                    <div className="mt-5">
                      <label className="flex items-start gap-3 text-sm text-[#1D1E20]">
                        <input
                          id="enquiry-consent"
                          type="checkbox"
                          checked={consent}
                          onChange={(event) => {
                            setConsent(event.target.checked);
                            if (event.target.checked) clearError("consent");
                          }}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={
                            errors.consent ? "enquiry-consent-error" : undefined
                          }
                          className="mt-0.5 h-4 w-4 rounded border-[#C9CBD3] text-[#673DE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
                        />
                        <span>
                          {contactForm.fields.consent.label}
                          <span className="ml-1 text-[#673DE6]">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p
                          id="enquiry-consent-error"
                          role="alert"
                          className="mt-1 text-[13px] text-red-600"
                        >
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={ghostButton}
                      >
                        <ArrowLeft
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                        {contactForm.buttons.back}
                      </button>
                      <button
                        type="submit"
                        disabled={sending}
                        className={`${primaryButton} w-full sm:w-auto`}
                      >
                        {sending ? "Sending..." : contactForm.buttons.send}
                        <Send
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-[#1D1E20]/65">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          {contactForm.reassurance}
        </p>
      </div>
    </section>
  );
}
