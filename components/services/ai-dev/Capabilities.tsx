"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { aiDev } from "@/lib/content/services/aiDev";
import CapabilityBars from "./CapabilityBars";
import { RevealGroup, revealStyle } from "./RevealGroup";

export default function Capabilities() {
  const { capabilities } = aiDev;

  return (
    <section
      id="what-we-build"
      aria-labelledby="cap-title"
      className="cap-bg relative scroll-mt-24 overflow-hidden py-20 text-white md:py-28"
    >
      <div className="relative mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <RevealGroup className="text-center">
          <h2
            id="cap-title"
            className="tools-reveal-item mx-auto max-w-3xl text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-5xl lg:text-[54px]"
            style={revealStyle(0)}
          >
            {capabilities.heading}
          </h2>
          <p
            className="tools-reveal-item mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg"
            style={revealStyle(1)}
          >
            {capabilities.sub}
          </p>
        </RevealGroup>

        <p className="sr-only">{capabilities.srSentence}</p>

        <CapabilityBars />

        <RevealGroup className="mt-12 text-center md:mt-16">
          <p
            className="tools-reveal-item mx-auto max-w-2xl text-lg text-white/80"
            style={revealStyle(0)}
          >
            {capabilities.closing.text}
          </p>
          <div className="tools-reveal-item mt-6" style={revealStyle(1)}>
            <Link
              href={capabilities.closing.cta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(185,168,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#190F45]"
            >
              {capabilities.closing.cta.label}
            </Link>
          </div>
          <div
            className="tools-reveal-item mt-4 flex items-center justify-center gap-2 text-sm text-white/75"
            style={revealStyle(2)}
          >
            <ShieldCheck size={16} aria-hidden="true" />
            <span>{capabilities.closing.trust}</span>
          </div>
          <p
            className="tools-reveal-item mx-auto mt-6 max-w-3xl text-xs text-white/45"
            style={revealStyle(3)}
          >
            {capabilities.footnote}
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
