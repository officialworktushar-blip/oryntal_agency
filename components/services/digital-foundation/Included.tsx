"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import IncludedStage from "./IncludedStage";

export default function Included() {
  const reduced = useReducedMotion() ?? false;
  const { included } = digitalFoundation;

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className="df-included-gradient df-included-grain relative scroll-mt-24 overflow-hidden pb-24 pt-24 text-white md:pb-32 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="df-included-fade pointer-events-none absolute inset-x-0 bottom-0 h-14"
      />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <m.p
            {...reveal(0)}
            className="eyebrow text-[#9B95FF]"
          >
            {included.eyebrow}
          </m.p>
          <m.h2
            id="included-title"
            {...reveal(0.08)}
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[clamp(30px,3.4vw,44px)]"
          >
            {included.title}
          </m.h2>
          <m.p
            {...reveal(0.16)}
            className="mt-5 text-base leading-relaxed text-white/70 md:text-lg"
          >
            {included.intro}
          </m.p>
        </div>

        {/* Every deliverable, spelled out for screen readers and crawlers */}
        <ul className="sr-only" aria-label="What's included in the Digital Foundation Package">
          {included.items.map((item) => (
            <li key={item.id}>
              {item.bullet} {item.title} {item.description}
            </li>
          ))}
        </ul>

        <IncludedStage />

        <div className="relative mt-16 md:mt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_70%)]"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <m.p
              {...reveal(0)}
              className="text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {included.footer.ideal}
            </m.p>

            <m.div
              {...reveal(0.08)}
              className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-center"
            >
              <Link
                href={included.footer.cta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-[#673DE6] px-9 py-3.5 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7B4DFF] hover:shadow-[0_16px_40px_rgba(103,61,230,0.45)] focus-visible:ring-2 focus-visible:ring-white"
              >
                {included.footer.cta.label}
              </Link>
              <Link
                href={included.footer.secondary.href}
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-8 py-3.5 text-base text-white transition-colors duration-200 hover:bg-white/10"
              >
                {included.footer.secondary.label}
              </Link>
            </m.div>

            <m.p {...reveal(0.16)} className="mt-5 text-xs text-white/40">
              {included.footer.feeNote}
            </m.p>
          </div>
        </div>
      </div>
    </section>
  );
}
