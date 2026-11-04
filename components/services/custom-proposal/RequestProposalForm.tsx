"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "REPLACE_WITH_NUMBER";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#7c5ce8]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#7c5ce8]/25";

type FormValues = {
  name: string;
  business: string;
  contact: string;
  need: string;
};

const initialValues: FormValues = {
  name: "",
  business: "",
  contact: "",
  need: "",
};

export default function RequestProposalForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (error) setError("");
    if (sent) setSent(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = values.name.trim();
    const business = values.business.trim();
    const contact = values.contact.trim();
    const need = values.need.trim();

    if (!name || !business || !contact || !need) {
      setError("Please fill in all fields before requesting a proposal.");
      return;
    }

    const message = [
      "Custom Proposal Request",
      "",
      `Name: ${name}`,
      `Business name: ${business}`,
      `Email or WhatsApp: ${contact}`,
      "",
      "What I need help with:",
      need,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cp-name"
            className="mb-1.5 block text-sm font-medium text-white/80"
          >
            Name
          </label>
          <input
            id="cp-name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="cp-business"
            className="mb-1.5 block text-sm font-medium text-white/80"
          >
            Business name
          </label>
          <input
            id="cp-business"
            name="business"
            type="text"
            required
            value={values.business}
            onChange={handleChange}
            placeholder="Your business name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="cp-contact"
          className="mb-1.5 block text-sm font-medium text-white/80"
        >
          Email or WhatsApp number
        </label>
        <input
          id="cp-contact"
          name="contact"
          type="text"
          required
          value={values.contact}
          onChange={handleChange}
          placeholder="name@company.com or +91 XXXXX XXXXX"
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="cp-need"
          className="mb-1.5 block text-sm font-medium text-white/80"
        >
          What do you need help with?
        </label>
        <textarea
          id="cp-need"
          name="need"
          rows={5}
          required
          value={values.need}
          onChange={handleChange}
          placeholder="Tell us about your business, current systems and what you want to improve."
          className={`${inputClass} resize-y`}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      {sent ? (
        <p className="mt-4 rounded-xl border border-[#7c5ce8]/30 bg-[#7c5ce8]/10 px-4 py-3 text-sm text-[#d1d1d6]">
          Your proposal request is ready in WhatsApp. If it did not open, check
          your pop-up settings and try again.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[#7c5ce8] px-6 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6a3fe0] hover:shadow-[0_16px_40px_rgba(124,92,232,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
      >
        Request a proposal
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-4"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
