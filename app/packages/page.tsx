import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { packages } from "@/lib/data";
import faq from "@/lib/pricing-faq.json";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Detailed pricing for ORYNTAL's business packages: Digital Foundation, Business Automation, and Premium Custom System.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business Packages"
        title="Clear pricing. Defined outcomes."
        description="Compare each package, see what's included, and pick the right starting point for your growth roadmap."
      >
        <Link href="/contact" className="btn-primary">
          Book Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/services" className="btn-secondary">
          Explore Services
        </Link>
      </PageHeader>

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-card ${
                  pkg.highlighted
                    ? "border-brand ring-2 ring-brand"
                    : "border-brand-soft"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h2 className="text-lg font-bold text-ink">{pkg.name}</h2>
                <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>

                <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="text-3xl font-extrabold tracking-tight text-brand-hover sm:text-4xl">
                    {pkg.price}
                  </span>
                  <span className="pb-1 text-xs text-muted">{pkg.cadence}</span>
                </div>

                <p className="mt-3 text-xs font-medium text-muted">
                  Ideal for: {pkg.idealFor}
                </p>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Core Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    What&apos;s Included
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`mt-8 w-full ${
                    pkg.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Choose {pkg.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-brand-soft bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink">Important Note</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Payment gateways, APIs, domain registration, hosting, CRM/SMS/email
              providers, logistics, mapping, and AI/voice usage may require
              separate provider subscriptions or fees. These are not included in
              the package prices above and are billed directly by their
              respective providers.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-brand-soft bg-white/60">
        <div className="container-x py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted">
              Get clarity on scope, timelines, and third-party costs before you
              get started.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {faq.map((item, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="card p-6 sm:p-8">
                  <h3 className="text-base font-semibold text-ink">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
