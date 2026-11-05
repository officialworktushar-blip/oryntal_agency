import type { Metadata } from "next";

const title = "Case Studies | ORYNTAL";
const description =
  "See how ORYNTAL turns a business requirement into a website, app or automated workflow.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title, description, url: "/case-studies" },
  twitter: { card: "summary_large_image", title, description },
};

const FEATURED = {
  label: "FEATURED CASE STUDY",
  businessType: "Retail business",
  title: "An online store with payments and WhatsApp order updates",
  summary:
    "From a simple requirement to a working store, built around how the business sells.",
  chips: ["Website", "WhatsApp updates", "Online payments"],
  href: "#case-studies",
};

const chipIcons = [
  // monitor / website
  <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  // chat bubble
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.1A8 8 0 1 1 21 12Z" />
  </svg>,
  // card / payments
  <svg key="card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
  </svg>,
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#0d0f0e] text-white">
      <section
        id="case-studies-hero"
        aria-labelledby="case-studies-title"
        className="relative isolate flex min-h-[max(720px,100vh)] w-full flex-col items-center justify-center overflow-hidden bg-[#0d0f0e] px-5 pb-20 pt-28 text-center sm:px-6 lg:px-8"
      >
        <style>{`
          @keyframes cs-fade-up {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes cs-glow-pulse {
            0%, 100% { box-shadow: 0 0 60px rgba(124,92,232,0.35); }
            50% { box-shadow: 0 0 95px rgba(124,92,232,0.55); }
          }
          @keyframes cs-shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.82; }
          }
          @keyframes cs-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .cs-in { animation: cs-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both; }
            .cs-glow { animation: cs-glow-pulse 4s ease-in-out infinite; }
            .cs-pillars { animation: cs-shimmer 7s ease-in-out infinite; }
            .cs-bob { animation: cs-bob 2.4s ease-in-out infinite; }
          }
        `}</style>

        {/* stepped violet pillar bands, left and right (desktop only) */}
        <div aria-hidden className="cs-pillars pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute inset-y-0 left-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:left-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:left-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:left-[540px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:right-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:right-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:right-[540px] lg:w-[240px]" />
        </div>

        {/* wide centered pillar — the lit stage behind the text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[640px] max-w-[88vw] -translate-x-1/2 bg-gradient-to-b from-[#2a1f5c]/0 via-[#2a1f5c]/70 to-[#2a1f5c]/80"
        />

        {/* strong violet glow rising from the bottom edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] blur-[70px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 100%, rgba(124,92,232,0.55) 0%, rgba(106,63,224,0.22) 45%, transparent 72%)",
          }}
        />

        {/* vignette so the text stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(13,15,14,0.94) 0%, rgba(13,15,14,0.68) 55%, rgba(13,15,14,0.08) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <h1
            id="case-studies-title"
            className="cs-in text-[40px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]"
            style={{ animationDelay: "0.05s" }}
          >
            See what we&apos;ve built
            <br />
            for real businesses
          </h1>

          <p
            className="cs-in mx-auto mt-6 max-w-[880px] text-base leading-relaxed text-[#d1d1d6] sm:text-lg"
            style={{ animationDelay: "0.15s" }}
          >
            Browse case studies that show how ORYNTAL turns a business
            requirement into a website, an app or an automated workflow.
          </p>

          {/* featured case study card */}
          <div className="cs-in mt-12" style={{ animationDelay: "0.25s" }}>
            <article className="cs-glow rounded-3xl border-2 border-[#6a4fe0] bg-white p-7 text-left sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6a3fe0]">
                  {FEATURED.label}
                </span>
                <span className="rounded-full bg-[#f1edff] px-3.5 py-1 text-[13px] font-medium text-[#5b3de0]">
                  {FEATURED.businessType}
                </span>
              </div>

              <h2 className="mt-4 max-w-[640px] text-[22px] font-medium leading-snug text-[#0d0d0f] sm:text-[28px]">
                {FEATURED.title}
              </h2>
              <p className="mt-2 text-[17px] text-[#4b4b55]">{FEATURED.summary}</p>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap gap-2">
                  {FEATURED.chips.map((chip, i) => (
                    <li
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f4f6] px-3.5 py-1.5 text-sm text-[#26262b]"
                    >
                      <span className="text-[#7c5ce8]">{chipIcons[i]}</span>
                      {chip}
                    </li>
                  ))}
                </ul>
                <a
                  href={FEATURED.href}
                  className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#111113] px-7 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d1d20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5ce8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e] sm:w-auto"
                >
                  View case study
                  <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </div>

          <a
            href="#case-studies"
            className="cs-in cs-bob mt-8 inline-flex items-center gap-2 text-[15px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
            style={{ animationDelay: "0.4s" }}
          >
            Scroll to browse all case studies
            <ArrowDownIcon className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
