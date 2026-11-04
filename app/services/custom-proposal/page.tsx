import type { Metadata } from "next";
import GrowYourBusiness from "@/components/services/custom-proposal/GrowYourBusiness";
import SampleRequests from "@/components/services/custom-proposal/SampleRequests";
import WhatWeBuild from "@/components/services/custom-proposal/WhatWeBuild";
import WhyOryntal from "@/components/services/custom-proposal/WhyOryntal";

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

function CheckIcon({ className }: { className?: string }) {
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
            href="#what-we-build"
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

      <WhatWeBuild />

      <SampleRequests />

      <GrowYourBusiness />

      <WhyOryntal />
    </main>
  );
}
