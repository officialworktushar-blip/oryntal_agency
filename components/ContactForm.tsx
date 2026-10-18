"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="card p-6 sm:p-8 lg:col-span-3">
        <h2 className="text-lg font-bold text-ink">Tell us about your project</h2>
        <p className="mt-1 text-sm text-slate-500">
          Share a few details and we&apos;ll reply within one business day.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name" placeholder="Jane Doe" />
            <Field
              id="email"
              label="Email"
              type="email"
              placeholder="jane@company.com"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="company" label="Company" placeholder="Acme Inc." />
            <Field id="budget" label="Budget" placeholder="$2k – $10k" />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="What are you trying to achieve?"
              className="w-full rounded-xl border border-brand-100 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            {status === "sent" ? "Request sent" : "Send request"}
            <Send className="h-4 w-4" />
          </button>

          {status === "sent" && (
            <p className="text-sm font-medium text-brand-700">
              Thanks! This is a demo form — connect it to your backend or email
              service to go live.
            </p>
          )}
        </form>
      </div>

      <div className="space-y-5 lg:col-span-2">
        <div className="card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-ink">Contact details</h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-800">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-brand-800"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h3 className="text-sm font-bold text-brand-900">
            Free 30-minute consultation
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-800/80">
            We&apos;ll review your current setup and leave you with a prioritized
            action plan — whether or not we work together.
          </p>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
};

function Field({ id, label, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-100 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
