import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Code2,
  CreditCard,
  Cpu,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  MessageCircle,
  Play,
  Plug,
  QrCode,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AssetPlaceholder from "@/components/AssetPlaceholder";

export const metadata = {
  title: "ORYNTAL — Practical Technology Solutions",
  description:
    "Practical technology solutions designed around the way your business works: web and app development, AI automation, software integration, and business operations.",
};

type Icon = LucideIcon;

const integrations: { name: string; icon: Icon }[] = [
  { name: "Meta", icon: InfinityIcon },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Stripe", icon: CreditCard },
  { name: "Udyam MSME", icon: ShieldCheck },
];

type Pkg = {
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

const businessPackages: Pkg[] = [
  {
    name: "Digital Foundation Package",
    price: "₹30,000",
    tagline: "A credible, conversion-ready presence for growing businesses.",
    features: ["Pro Website", "Lead Generation", "WhatsApp Integration"],
    cta: "Get Started",
  },
  {
    name: "Business Automation Package",
    price: "₹70,000",
    tagline: "Automate the busywork so your team can focus on growth.",
    features: [
      "Custom Web",
      "UX/UI Design",
      "Payment Gateway",
      "Order Automation",
      "AI Chatbots",
    ],
    popular: true,
    cta: "Choose Automation",
  },
  {
    name: "Premium Custom System",
    price: "₹3,00,000",
    priceNote: "– ₹4,00,000",
    tagline: "Fully custom systems and multi-agent AI built to your workflow.",
    features: ["Custom Apps", "Multi-Agent Systems"],
    cta: "Talk to an Architect",
  },
];

const individualServices: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Web / App Development",
    description:
      "Fast, scalable websites and applications built on modern, maintainable foundations.",
    icon: Code2,
  },
  {
    title: "AI & Automation",
    description:
      "Chatbots, workflows, and AI agents that handle repetitive work end to end.",
    icon: Bot,
  },
  {
    title: "Software / API Integration",
    description:
      "Connect the tools you already use into one reliable, automated system.",
    icon: Plug,
  },
  {
    title: "Business Operations",
    description:
      "Dashboards, reporting, and process design that keep day-to-day running smoothly.",
    icon: BarChart3,
  },
];

const processSteps: { month: string; title: string; description: string; icon: Icon }[] = [
  {
    month: "Month 1",
    title: "Business Understanding & Planning",
    description:
      "We map your workflows, goals, and constraints, then agree on scope and a clear plan.",
    icon: Users,
  },
  {
    month: "Month 2",
    title: "Development & Implementation",
    description:
      "Design and engineering run in focused sprints with regular, reviewable progress.",
    icon: Code2,
  },
  {
    month: "Month 3",
    title: "Integration, Testing & Refinement",
    description:
      "We connect systems, test thoroughly, and refine until everything performs as promised.",
    icon: Zap,
  },
];

const pillars: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Digital Presence",
    description: "A professional online footprint that builds trust and converts.",
    icon: Globe,
  },
  {
    title: "Automation",
    description: "Repetitive processes handled automatically, around the clock.",
    icon: Zap,
  },
  {
    title: "AI Capabilities",
    description: "Multi-lingual AI agents that answer, sell, and support.",
    icon: Cpu,
  },
  {
    title: "Integration",
    description: "Every tool and system connected into one clear workflow.",
    icon: Layers,
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
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
          <div>
            <span className="eyebrow">Orient Your Business.</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Practical Technology Solutions Designed Around the Way Your
              Business Works.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
              From websites and automation to AI and integrations, ORYNTAL builds
              the systems that move your business forward — no jargon, no
              bloated scope.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/packages" className="btn-primary">
                View Business Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-secondary">
                Explore AI Services
              </Link>
            </div>
          </div>

          <Reveal className="lg:justify-self-end">
            <AssetPlaceholder
              kind="image"
              title="Isometric / 3D system graphic"
              description="A clean isometric or 3D illustration connecting AI nodes, the WhatsApp logo, a payment gateway, and business dashboards into a single workflow."
              className="aspect-[4/3] w-full lg:aspect-square lg:max-w-md"
            />
          </Reveal>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="border-y border-brand-100 bg-white">
        <div className="container-x py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Built to integrate with the tools you already use
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            {integrations.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-2 text-slate-400 grayscale transition-opacity hover:opacity-70"
              >
                <Icon className="h-6 w-6" />
                <span className="text-lg font-bold tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIDEO DEMO REEL */}
      <section className="bg-ink">
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              Demo Reel
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              See Our Technology in Action
            </h2>
            <p className="mt-4 text-slate-300">
              A fast-paced look at the systems we build and the results they
              deliver for businesses like yours.
            </p>
          </div>

          <Reveal className="mt-12">
            <div className="relative mx-auto max-w-4xl">
              <AssetPlaceholder
                kind="video"
                dark
                icon={Play}
                title="60–90 second landscape demo video"
                description="Fast-paced reel: n8n workflows running in the background, custom React dashboards on screen, and multi-lingual AI voice calls (Hindi / English / Telugu) with animated waveforms."
                className="aspect-video w-full"
              />
              <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur-sm">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand-700">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </span>
              </span>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              "n8n workflows running behind the scenes",
              "Custom React dashboards on screen",
              "Multi-lingual AI voice: Hindi · English · Telugu",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSINESS PACKAGES */}
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
          {businessPackages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-card ${
                  pkg.popular
                    ? "border-brand-600 ring-2 ring-brand-600"
                    : "border-brand-100"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-ink">{pkg.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{pkg.tagline}</p>

                <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="text-4xl font-extrabold tracking-tight text-brand-700">
                    {pkg.price}
                  </span>
                  {pkg.priceNote && (
                    <span className="pb-1 text-sm font-semibold text-slate-400">
                      {pkg.priceNote}
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
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
                    pkg.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
          Package prices exclude third-party costs such as domain registration,
          hosting, payment gateway fees, and advertising spend, which are billed
          directly by their providers.
        </p>
      </section>

      {/* 5. SOCIAL PROOF */}
      <section className="border-y border-brand-100 bg-white">
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Social Proof</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Verified Client Feedback via QR2Review
            </h2>
            <p className="mt-4 text-slate-500">
              Real results from real businesses — captured and verified through
              our QR2Review system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal>
              <AssetPlaceholder
                title="Client dashboard UI"
                description="Screenshots of live client dashboards showing the systems we built in production."
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <Reveal delay={0.06}>
              <AssetPlaceholder
                title="QR2Review verified tags"
                description="Verified feedback badges captured through QR2Review scans."
                icon={ShieldCheck}
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <AssetPlaceholder
                title="Growth charts"
                description="Charts highlighting an 80% time saved after automation was deployed."
                icon={TrendingUp}
                className="aspect-[4/3] w-full"
              />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { value: "80%", label: "Time saved with automation" },
              { value: "4.9/5", label: "Average client rating" },
              { value: "100%", label: "Verified QR2Review feedback" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-brand-100 bg-surface p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-brand-700">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ORYNTAL PROCESS */}
      <section id="process" className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Process</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The Oryntal Process
          </h2>
          <p className="mt-4 text-slate-500">
            A clear three-month path from understanding to a fully refined
            system.
          </p>
        </div>

        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-brand-100 md:block"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.month} delay={i * 0.08}>
                <div className="relative text-center md:text-left">
                  <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-cta md:mx-0">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                    {step.month}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INDIVIDUAL SERVICES */}
      <section
        id="services"
        className="border-y border-brand-100 bg-white"
      >
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Individual Services</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Pick exactly what your business needs
            </h2>
            <p className="mt-4 text-slate-500">
              Combine them into a package or start with a single service.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {individualServices.map((service, i) => (
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRODUCTS SPOTLIGHT */}
      <section id="products" className="container-x py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Product Spotlight</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              QR2 Review
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-500">
              Turn every customer into a verified review. QR2 Review captures
              feedback in seconds and routes happy customers straight to your
              public profiles.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Scan-to-review in under 30 seconds",
                "One-tap routing to Google and social reviews",
                "Verified feedback tags via QR2Review",
                "Dashboard analytics and insights",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn-primary mt-8">
              Explore QR2 Review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Reveal className="lg:justify-self-end">
            <AssetPlaceholder
              title="QR2Review mobile mockup"
              description="A premium phone mockup showing the QR2Review scan page and the review submission flow."
              icon={QrCode}
              className="aspect-[3/4] w-full max-w-sm"
            />
          </Reveal>
        </div>
      </section>

      {/* 9. VALUE PROPOSITION + FINAL CTA */}
      <section className="border-t border-brand-100 bg-white">
        <div className="container-x py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why Oryntal</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Four pillars, one connected system
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-brand-100 bg-surface p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                    <pillar.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-14 text-center sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
              />
              <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to scale? Schedule Your Strategy Call
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-brand-100">
                Book a free consultation and we&apos;ll map the fastest path to
                results for your business.
              </p>
              <div className="relative mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                >
                  Schedule Your Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
