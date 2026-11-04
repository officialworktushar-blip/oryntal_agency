import type { Metadata } from "next";
import type { ReactNode } from "react";
import RequestProposalForm from "@/components/services/custom-proposal/RequestProposalForm";

const title = "Custom Proposal | ORYNTAL";
const description =
  "Tell us what you need. ORYNTAL prepares a customized proposal based on your requirements, complexity and agreed deliverables.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services/custom-proposal" },
  openGraph: { title, description, url: "/services/custom-proposal" },
  twitter: { card: "summary_large_image", title, description },
};

type IconProps = { className?: string };

function IconBase({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

function IconSystems({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7M17.5 14v7" />
    </IconBase>
  );
}

function IconGap({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
      <path d="M10.5 7.5v4" />
      <path d="M10.5 14.2h.01" />
    </IconBase>
  );
}

function IconImprove({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7h9M18 7h2M4 17h2M10 17h10" />
      <circle cx="15.5" cy="7" r="2.5" />
      <circle cx="7.5" cy="17" r="2.5" />
    </IconBase>
  );
}

function IconPlan({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="3.5" width="7" height="6" rx="1.5" />
      <rect x="14" y="14.5" width="7" height="6" rx="1.5" />
      <path d="M10 6.5h3.5a4 4 0 0 1 4 4v4" />
      <path d="m15 12.5 2.5 2.5 2.5-2.5" />
    </IconBase>
  );
}

function IconSpecialist({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M18 7.5v6M15 10.5h6" />
    </IconBase>
  );
}

function IconNetwork({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6" />
    </IconBase>
  );
}

function IconPresence({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </IconBase>
  );
}

function IconAutomation({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M13 2.5 4.5 13H11l-1 8.5L19.5 11H13l0-8.5Z" />
    </IconBase>
  );
}

function IconAi({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <circle cx="12" cy="12" r="3.2" />
    </IconBase>
  );
}

function IconIntegration({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M9 7V3M15 7V3" />
      <path d="M7 7h10v4a5 5 0 0 1-10 0V7Z" />
      <path d="M12 16v5" />
    </IconBase>
  );
}

function IconCustomize({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M5 5v14M12 5v14M19 5v14" />
      <circle cx="5" cy="9" r="2" />
      <circle cx="12" cy="15" r="2" />
      <circle cx="19" cy="8" r="2" />
    </IconBase>
  );
}

function IconConnections({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M10.8 7.2 6.2 16.8M13.2 7.2l4.6 9.6M7.5 19h9" />
    </IconBase>
  );
}

const capabilities = [
  {
    title: "Systems review",
    description: "Reviewing your current business systems and workflows",
    icon: IconSystems,
  },
  {
    title: "System gaps",
    description: "Finding slow, disconnected or hard-to-maintain systems",
    icon: IconGap,
  },
  {
    title: "Improvements",
    description: "Suggesting improvements to how your systems are set up",
    icon: IconImprove,
  },
  {
    title: "Custom planning",
    description: "Planning custom software and automation solutions",
    icon: IconPlan,
  },
  {
    title: "Specialist support",
    description:
      "Bringing in outside specialists or consultants when needed",
    icon: IconSpecialist,
  },
  {
    title: "Business network",
    description:
      "Connecting you with suppliers and partners through our contacts",
    icon: IconNetwork,
  },
];

const valueItems = [
  {
    label: "Digital presence",
    description: "Websites, applications and business interfaces",
    icon: IconPresence,
  },
  {
    label: "Automation",
    description: "Less repetitive work and smoother workflows",
    icon: IconAutomation,
  },
  {
    label: "AI tools",
    description:
      "Chatbots, voice assistants, and AI that answers from your own documents",
    icon: IconAi,
  },
  {
    label: "Integration",
    description:
      "Connecting payment gateways, APIs, logistics platforms and other compatible tools",
    icon: IconIntegration,
  },
  {
    label: "Customization",
    description: "Solutions designed around your specific requirements",
    icon: IconCustomize,
  },
  {
    label: "Business connections",
    description:
      "Access to supplier, wholesaler and sourcing contacts through our network",
    icon: IconConnections,
  },
];

const heroNotes = [
  "No fixed pricing",
  "Tailored to your needs",
  "Clear deliverables",
];

export default function CustomProposalPage() {
  return (
    <main className="bg-[#0d0f0e] text-white">
      <section
        aria-labelledby="cp-hero-title"
        className="relative isolate flex w-full items-center justify-center overflow-hidden bg-[#0d0f0e] px-5 py-24 text-center sm:px-6 lg:px-8"
        style={{ minHeight: "max(680px, 100vh)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
        >
          <div className="absolute inset-y-0 left-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:left-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:left-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:left-[540px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:right-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:right-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:right-[540px] lg:w-[240px]" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(13,15,14,0.94) 0%, rgba(13,15,14,0.68) 55%, rgba(13,15,14,0.08) 100%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] md:hidden"
          style={{
            background:
              "radial-gradient(ellipse at bottom, rgba(124,92,232,0.5) 0%, rgba(106,63,224,0.18) 45%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7bff]">
            Custom Proposal
          </p>

          <h1
            id="cp-hero-title"
            className="mt-5 text-[40px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]"
          >
            Built around your business,
            <br />
            not a fixed package
          </h1>

          <p className="mx-auto mt-6 max-w-[880px] text-base leading-relaxed text-[#d1d1d6] sm:text-lg">
            Tell us what you need. ORYNTAL prepares a customized proposal based
            on your requirements, complexity and agreed deliverables.
          </p>

          <a
            href="#request"
            className="mt-9 inline-flex h-[60px] w-[230px] max-w-full items-center justify-center rounded-2xl bg-white px-8 text-base font-medium text-[#0d0f0e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ece6ff] hover:shadow-[0_16px_44px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
          >
            Request a proposal
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/65">
            {heroNotes.map((note, index) => (
              <span key={note} className="inline-flex items-center gap-2">
                <CheckIcon className="size-4 text-[#8b7bff]" />
                <span>{note}</span>
                {index < heroNotes.length - 1 ? (
                  <span aria-hidden className="ml-1 text-white/25">
                    •
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="cp-reveal mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7bff]">
              How we can help
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">
              What we can help with
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="cp-reveal group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-[#7c5ce8]/40 hover:bg-white/[0.05] hover:shadow-[0_0_42px_rgba(124,92,232,0.12)]"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-[#7c5ce8]/20 bg-[#7c5ce8]/10 text-[#9b8cff]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="cp-reveal mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7bff]">
              Investment
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Pricing
            </h2>
          </div>

          <div className="cp-reveal mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#7c5ce8]/15 via-white/[0.03] to-transparent p-8 md:p-10">
            <div className="flex items-start gap-4">
              <span className="mt-1 hidden h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#8b7bff] to-[#6a3fe0] sm:block" />
              <p className="text-lg leading-relaxed text-[#d1d1d6] sm:text-xl">
                No fixed price applies here. ORYNTAL prepares a customized
                proposal based on your requirements, complexity, integrations,
                development effort and agreed deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="cp-reveal mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7bff]">
              What you get
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">
              ORYNTAL&apos;s Value Proposition
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#d1d1d6]">
              ORYNTAL helps businesses move from disconnected manual work toward
              more organized, connected and technology-enabled operations.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valueItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="cp-reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-[#7c5ce8]/40 hover:bg-white/[0.05] hover:shadow-[0_0_42px_rgba(124,92,232,0.12)]"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-[#7c5ce8]/20 bg-[#7c5ce8]/10 text-[#9b8cff]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="request"
        className="relative overflow-hidden border-t border-white/[0.06] px-5 py-20 sm:px-6 md:py-24 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(124,92,232,0.22) 0%, rgba(124,92,232,0.06) 45%, transparent 72%)",
        }}
      >
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="cp-reveal text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7bff]">
              Next step
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Request your proposal
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#d1d1d6]">
              Share a few details about your business and what you need. We will
              use them to prepare a proposal tailored to your scope.
            </p>
          </div>

          <div className="cp-reveal mt-10">
            <RequestProposalForm />
          </div>
        </div>
      </section>
    </main>
  );
}
