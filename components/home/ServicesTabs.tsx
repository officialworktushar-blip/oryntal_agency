"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { domains } from "@/lib/content/navigation";
import { servicesSection } from "@/lib/content/home";
import { packages, products } from "@/lib/data";
import { cn } from "@/lib/cn";

function PackagesPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-white p-5",
            pkg.highlighted ? "border-brand shadow-lift" : "border-line shadow-card"
          )}
        >
          {pkg.highlighted ? (
            <span className="absolute -top-2.5 left-5 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-white">
              Most popular
            </span>
          ) : null}
          <h4 className="text-base font-bold text-ink">{pkg.name}</h4>
          <p className="mt-1 text-xl font-bold tracking-tight text-brand">{pkg.price}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.tagline}</p>
          <Link
            href={`/packages#${pkg.id}`}
            className="link-arrow mt-4 pt-1"
          >
            View package <ArrowRight className="size-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}

function ServicesPanel() {
  const groups: { label: string; items: { label: string }[] }[] = [
    { label: "Web & Apps", items: [{ label: "Landing pages" }, { label: "Company websites" }, { label: "Web portals" }, { label: "Dashboards" }] },
    { label: "AI & Automation", items: [{ label: "AI chat assistants" }, { label: "Document AI" }, { label: "Workflow automation" }, { label: "Voice agents" }] },
    { label: "Integrations", items: [{ label: "CRM setup" }, { label: "WhatsApp Business API" }, { label: "Payment gateways" }, { label: "Email & calendars" }] },
    { label: "Sourcing", items: [{ label: "Embedded engineers" }, { label: "Dedicated teams" }, { label: "Code reviews" }, { label: "Maintenance" }] },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group) => (
        <div key={group.label} className="rounded-2xl border border-line bg-white p-5">
          <h4 className="text-sm font-bold text-ink">{group.label}</h4>
          <ul className="mt-3 flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-muted">
                <Check className="size-4 shrink-0 text-brand" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProductsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {products.slice(0, 3).map((product) => (
        <div key={product.name} className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-base font-bold text-ink">{product.name}</h4>
            <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
              {product.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
        </div>
      ))}
    </div>
  );
}

function ConsultationPanel() {
  const months = [
    { month: "Month 1", title: "Discovery", copy: "Workshops, process mapping, and a prioritised opportunity list." },
    { month: "Month 2", title: "Build", copy: "Development in weekly increments with regular demos." },
    { month: "Month 3", title: "Launch", copy: "Testing, training, documentation, and handover." },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {months.map((m) => (
        <div key={m.month} className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            {m.month}
          </span>
          <h4 className="mt-1.5 text-base font-bold text-ink">{m.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.copy}</p>
        </div>
      ))}
    </div>
  );
}

const panels = [PackagesPanel, ServicesPanel, ProductsPanel, ConsultationPanel];

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active];

  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{servicesSection.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {servicesSection.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {servicesSection.description}
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Service domains"
          className="no-scrollbar mx-auto mt-10 flex w-full max-w-3xl gap-1 overflow-x-auto rounded-full border border-line bg-brand-wash p-1"
        >
          {domains.map((domain, i) => (
            <button
              key={domain.id}
              role="tab"
              id={`tab-${domain.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${domain.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((i + 1) % domains.length);
                if (e.key === "ArrowLeft") setActive((i - 1 + domains.length) % domains.length);
              }}
              className={cn(
                "relative flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                i === active ? "text-white" : "text-muted hover:text-ink"
              )}
            >
              {i === active ? (
                <m.span
                  layoutId="services-tab-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative">{domain.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              role="tabpanel"
              id={`panel-${domains[active].id}`}
              aria-labelledby={`tab-${domains[active].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]"
            >
              <div>
                <span className="text-xs font-semibold text-brand">
                  Domain {domains[active].number}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                  {domains[active].label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {domains[active].summary}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {domains[active].items.slice(0, 4).map((item) => (
                    <li key={item.href} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      {item.label}
                    </li>
                  ))}
                </ul>
                <Link href={domains[active].href} className="link-arrow mt-6">
                  Explore this domain <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="flex flex-col gap-6">
                <ActivePanel />
                <MediaPlaceholder
                  type="image"
                  aspect="16/9"
                  label={`${domains[active].label} product screenshot · 1600×900`}
                  hint="One representative screenshot or diagram per domain."
                />
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-xs text-muted">{servicesSection.footnote}</p>
      </div>
    </section>
  );
}
