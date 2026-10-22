"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import ExpertBars from "./ExpertBars";

export default function Experts() {
  const reduced = useReducedMotion() ?? false;
  const { experts } = digitalFoundation;

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 24,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="experts"
      aria-labelledby="experts-title"
      className="df-experts-bg relative overflow-hidden scroll-mt-24 border-t border-white/[0.08] py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <m.h2
            id="experts-title"
            {...reveal(0)}
            className="mx-auto max-w-4xl text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-5xl lg:text-[56px]"
          >
            {experts.heading}
          </m.h2>

          <m.p
            {...reveal(0.12)}
            className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg"
          >
            {experts.sub}
          </m.p>
        </div>

        <ExpertBars />

        <m.div
          {...reveal(0.1)}
          className="mx-auto mt-12 max-w-2xl text-center md:mt-16"
        >
          <p className="text-lg text-white/80">{experts.cta.text}</p>

          <div className="mt-6">
            <Link
              href={experts.cta.primary.href}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(123,104,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
            >
              {experts.cta.primary.label}
            </Link>
          </div>

          <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm text-white/70">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            {experts.cta.trust}
          </p>

          <p className="mt-3 text-xs text-white/45">
            Third-party services, if any, may carry separate provider fees.
          </p>
        </m.div>
      </div>
    </section>
  );
}
