"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  MapPin,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const servicesInterested = [
  "Web/App Development",
  "AI & Automation (RAG, Chatbots, Voice AI)",
  "API Integrations",
  "Business Sourcing Support",
  "Business Package (Digital Foundation / Automation / Premium)",
  "QR2 Review",
  "Client Database & Call-Handling",
  "Recommendation System",
  "Other",
] as const;

const textareaClass =
  "w-full rounded-xl border border-brand-soft bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/30";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's plan your 3-month Custom Business Consultation"
        description="Tell us about your business and the challenges you're looking to solve. We'll get back to you with a clear next step within one business day."
      />

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Contact Info */}
          <Reveal className="lg:col-span-2">
            <div className="card flex h-full flex-col gap-6 p-6 sm:p-8">
              <div>
                <h2 className="text-lg font-bold text-ink">Get in touch</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Prefer to talk directly? Reach out via email, phone, or
                  WhatsApp.
                </p>
              </div>

              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-brand-hover"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-brand-hover"
                  >
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a
                    href="https://wa.me/15550123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-hover"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{site.location}</span>
                </li>
              </ul>

              <div className="mt-auto rounded-2xl border border-brand-soft bg-brand-wash p-5">
                <h3 className="text-sm font-bold text-brand-hover">
                  Let&apos;s plan your 3-month Custom Business Consultation
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-hover/80">
                  We&apos;ll review your goals, current systems, and priorities,
                  then share a clear roadmap with actionable next steps.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/packages" className="btn-secondary">
                  View Packages
                </Link>
                <Link href="/services" className="btn-secondary">
                  Explore Services
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right: Lead Capture Form */}
          <Reveal delay={0.06} className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-ink">Lead Capture Form</h2>
              <p className="mt-1 text-sm text-muted">
                Share a few details so we can tailor the consultation to your
                business.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Full Name" placeholder="Enter your full name" required />
                  <Field
                    id="businessName"
                    label="Business Name"
                    placeholder="Enter your business name"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="name@company.com"
                    required
                  />
                  <Field
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full rounded-xl border border-brand-soft bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/30"
                  >
                    <option value="" disabled selected>
                      Select a service
                    </option>
                    {servicesInterested.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    Additional Details (Optional)
                  </label>
                  <Suspense
                    fallback={
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your goals, timeline, or current setup."
                        className={textareaClass}
                      />
                    }
                  >
                    <MessageField />
                  </Suspense>
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  {status === "sent" ? "Request Sent" : "Send Consultation Request"}
                  <Send className="h-4 w-4" />
                </button>

                {status === "sent" && (
                  <p className="text-sm font-medium text-brand-hover">
                    Thanks! This is a demo form — connect it to your backend,
                    CRM, or email service to go live.
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const TOPIC_PREFILL: Record<string, string> = {
  website: "planning my website",
  "lead-capture": "capturing more enquiries",
  "whatsapp-and-links": "connecting WhatsApp and my business links",
  automation: "automating repetitive tasks",
  "registration-and-setup": "MSME/Udyam registration and digital setup",
};

/** Prefills the message box from ?message= or ?topic= (e.g. the hero search pill). */
function MessageField() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(() => {
    const fromMessage = searchParams.get("message");
    if (fromMessage) return fromMessage;

    const topic = searchParams.get("topic");
    const label = topic ? TOPIC_PREFILL[topic] : undefined;
    return label ? `I'd like help with: ${label}.` : "";
  });

  return (
    <textarea
      id="message"
      name="message"
      rows={5}
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      placeholder="Tell us about your goals, timeline, or current setup."
      className={textareaClass}
    />
  );
}

function Field({ id, label, type = "text", placeholder, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-soft bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
