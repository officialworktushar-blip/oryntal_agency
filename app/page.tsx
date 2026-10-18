import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import HeroVisual from "@/components/HeroVisual";
import AvatarCluster from "@/components/AvatarCluster";
import LogoTile from "@/components/LogoTile";
import { packages } from "@/lib/data";
import {
  partnerLogos,
  integrationLogos,
  techServices,
  productsSpotlight,
  engagementMonths,
} from "@/lib/home-content";

export const metadata: Metadata = {
  title: "ORYNTAL — Practical Technology Solutions for Business",
  description:
    "ORYNTAL builds practical technology systems: web and app development, advanced AI & automation, API integrations, business sourcing, and custom 3-month consultations.",
  keywords: [
    "business automation",
    "AI agency",
    "web development",
    "RAG systems",
    "voice AI",
    "API integrations",
    "n8n automation",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl"
        />

        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left Column: Visual - Stacked UI */}
          <Reveal className="lg:order-1">
            <HeroVisual />
          </Reveal>

          {/* Right Column: Text */}
          <div className="lg:order-2">
            <span className="eyebrow inline-flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              Practical Technology Solutions
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Orient Your Business. Practical Technology Solutions.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
              Shift from manual tasks to automated, tech-enabled operations.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
            >
              Explore Our Domains
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-10">
              <AvatarCluster />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF */}
      <section className="border-y border-brand-100 bg-white">
        <div className="container-x py-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Trusted by Forward-Thinking Companies
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partnerLogos.map((logo) => (
              <LogoTile key={logo.name} item={logo} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOMAIN 1: BUSINESS PACKAGES */}
      <section id="packages" className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Business Packages</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Packages that scale with your ambition
          </h2>
          <p className="mt-4 text-slate-500">
            Clear scopes, fixed pricing, and everything connected from day one.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-card ${
                  pkg.highlighted
                    ? "border-brand-600 ring-2 ring-brand-600"
                    : "border-brand-100"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-ink">{pkg.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{pkg.tagline}</p>

                <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="text-4xl font-extrabold tracking-tight text-brand-700">
                    {pkg.price}
                  </span>
                  <span className="pb-1 text-xs text-slate-400">{pkg.cadence}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.includes.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

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

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
          Payment gateways, APIs, and logistics may require separate provider
          subscriptions or fees.
        </p>
      </section>

      {/* 5. DOMAIN 2: INDIVIDUAL TECHNOLOGY SERVICES */}
      <section
        id="services"
        className="border-y border-brand-100 bg-surface/60"
      >
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Individual Technology Services</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Targeted Solutions for Specific Needs
            </h2>
            <p className="mt-4 text-slate-500">
              Pick exactly what your business needs, or combine services into a
              complete system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techServices.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05}>
                <article className="card h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BUILT TO INTEGRATE */}
      <section className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Integrations</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Built to integrate with the tools you already use.
          </h2>
          <p className="mt-4 text-slate-500">
            Seamlessly connect your existing software with our custom systems.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {integrationLogos.map((logo, i) => (
            <Reveal key={logo.name} delay={i * 0.04}>
              <LogoTile item={logo} variant="integration" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. DOMAIN 3: PRE-BUILT PRODUCTS SPOTLIGHT */}
      <section id="products" className="border-y border-brand-100 bg-surface/60">
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Pre-Built Products</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Ready-to-deploy products
            </h2>
            <p className="mt-4 text-slate-500">
              Launch faster with products already proven in production.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {productsSpotlight.map((product, i) => (
              <Reveal key={product.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <product.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {product.tagline}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-ink">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {product.description}
                  </p>
                  {product.complimentary && (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      <Sparkles className="h-3 w-3" />
                      Complimentary for eligible clients
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="grid gap-5 md:grid-cols-2">
              <AssetPlaceholder
                title="QR2Review phone mockup"
                description="Phone mockup showing the QR2Review scan and review submission flow."
                className="aspect-video w-full"
              />
              <AssetPlaceholder
                title="Call-handling dashboard screenshot"
                description="Screenshot of the client database and call-handling dashboard."
                className="aspect-video w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. DOMAIN 4: CUSTOM BUSINESS CONSULTATION */}
      <section id="process" className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Custom Business Consultation</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Need a tailored system? Our 3-Month Engagement.
          </h2>
        </div>

        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-brand-100 md:block"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {engagementMonths.map((item, i) => (
              <Reveal key={item.month} delay={i * 0.08}>
                <div className="relative text-center md:text-left">
                  <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-cta md:mx-0">
                    <span className="text-sm font-extrabold">
                      {item.month.split(" ")[1]}
                    </span>
                  </span>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                    {item.month}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center justify-center gap-2 text-sm text-slate-600 md:justify-start"
                      >
                        <Check className="h-4 w-4 text-brand-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DEMO REEL */}
      <section className="bg-ink">
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              Demo Reel
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              See Our Systems in Action
            </h2>
            <p className="mt-4 text-slate-300">
              A 60-second look at our n8n automations, live AI voice agents, and
              React UIs.
            </p>
          </div>

          <Reveal className="mt-12">
            <div className="relative mx-auto max-w-4xl">
              <AssetPlaceholder
                kind="video"
                dark
                icon={Play}
                title="60-second video demo"
                description="Screen recording of n8n automations, live AI voice agent calls, and custom React UI."
                className="aspect-video w-full"
              />
              <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur-sm">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand-700">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="container-x py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let&apos;s build a practical technology system around your business.
          </h2>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Schedule Your Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
