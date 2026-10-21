"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import {
  digitalFoundation,
  includedFooter,
} from "@/lib/content/packages/digitalFoundation";
import IncludedStage from "./IncludedStage";

export default function Included() {
  const reduced = useReducedMotion() ?? false;
  const { included } = digitalFoundation;
  const [titleLead, titleTail] = included.titleLines;

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
      id="included"
      aria-labelledby="included-title"
      className="df-included-gradient df-included-grain relative scroll-mt-24 overflow-hidden pb-24 pt-24 text-white md:pb-32 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="df-included-fade pointer-events-none absolute inset-x-0 bottom-0 h-14"
      />

      <div className="container-x relative">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <m.span
            {...reveal(0)}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white"
          >
            {included.eyebrow}
          </m.span>

          <m.h2
            id="included-title"
            className="mt-6 font-normal leading-[1.08] tracking-[-0.03em] text-4xl text-white md:text-5xl lg:text-[60px]"
          >
            <m.span
              {...reveal(0.08)}
              className="block text-[#9B95FF]"
            >
              {titleLead}
            </m.span>
            <m.span
              {...reveal(0.16)}
              className="block text-white"
            >
              {titleTail}
            </m.span>
          </m.h2>

          <m.p
            {...reveal(0.24)}
            className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/75"
          >
            {included.intro}
          </m.p>
        </div>

        {/* Every deliverable, spelled out for screen readers and crawlers */}
        <ul
          className="sr-only"
          aria-label="What's included in the Digital Foundation Package"
        >
          {included.items.map((item) => (
            <li key={item.id}>{item.bullet}</li>
          ))}
        </ul>

        <IncludedStage />

        {/* Closing block, sitting in the pale zone at the bottom */}
        <div className="relative mt-10 md:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 bg-[radial-gradient(58%_70%_at_50%_50%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_72%)]"
          />

          <m.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto max-w-2xl text-center"
          >
            <p className="text-base leading-relaxed text-[#2B3A4D] md:text-lg">
              {includedFooter.ideal}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={includedFooter.cta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-[#673DE6] px-10 py-4 text-lg font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(103,61,230,0.45)] focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2"
              >
                {includedFooter.cta.label}
              </Link>
              <Link
                href={includedFooter.secondary.href}
                className="inline-flex items-center justify-center rounded-2xl border border-[#2B3A4D]/25 px-7 py-4 text-lg text-[#2B3A4D] transition-colors duration-200 hover:bg-white/50"
              >
                {includedFooter.secondary.label}
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#5B6B7F]">
              {included.footer.feeNote}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
