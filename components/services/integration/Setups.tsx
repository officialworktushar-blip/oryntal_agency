"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { RevealGroup as Reveal, revealStyle } from "../ai-dev/RevealGroup";
import SetupCard from "./SetupCard";
import { integration } from "@/lib/content/services/integration";
import { ShieldCheck } from "lucide-react";

export default function Setups() {
  const setups = (integration as any).setups;
  const items = setups?.items || [];

  return (
    <section
      id="setups"
      aria-labelledby="setups-title"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 0%, #f5f3ff 0%, transparent 60%), radial-gradient(1000px 500px at 80% 100%, #f8f7ff 0%, #ffffff 70%)",
      }}
    >
      <Reveal className="mx-auto max-w-4xl px-4 text-center lg:max-w-6xl">
        <p className="tools-reveal-item text-sm uppercase tracking-[0.32em] text-[#673DE6]" style={revealStyle(0)}>
          {setups.eyebrow}
        </p>
        <h2
          id="setups-title"
          className="tools-reveal-item mt-4 text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] md:text-5xl lg:text-[58px]"
          style={revealStyle(1)}
        >
          {setups.heading}
        </h2>
        <p
          className="tools-reveal-item mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1D1E20]/75 md:text-lg"
          style={revealStyle(2)}
        >
          {setups.sub}
        </p>
      </Reveal>

      <div
        role="region"
        aria-label="Typical integration setups"
        className="group relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden md:mt-14"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent md:w-40" />
        <div className="assistants-track flex w-max gap-5 pr-5 will-change-transform">
          {[...items, ...items].map((item, index) => (
            <SetupCard key={index} item={item} />
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-10 max-w-4xl px-4 text-center lg:max-w-6xl md:mt-14">
        <div className="tools-reveal-item" style={revealStyle(0)}>
          <Link
            href={setups.cta.href}
            className="inline-flex items-center justify-center rounded-xl bg-[#673DE6] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1] hover:shadow-[0_12px_32px_rgba(99,61,230,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {setups.cta.label}
          </Link>
        </div>
        <div
          className="tools-reveal-item mt-4 flex items-center justify-center gap-2 text-sm text-[#1D1E20]/70"
          style={revealStyle(1)}
        >
          <ShieldCheck size={16} aria-hidden="true" />
          <span>{setups.trust}</span>
        </div>
        <p
          className="tools-reveal-item mx-auto mt-6 max-w-2xl text-xs text-[#1D1E20]/50"
          style={revealStyle(2)}
        >
          {setups.note}
        </p>
      </Reveal>
    </section>
  );
}
