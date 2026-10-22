"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Globe, ShieldCheck } from "lucide-react";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import GlobeCanvas from "./GlobeCanvas";

export default function GlobalReach() {
  const reduced = useReducedMotion() ?? false;
  const { globalReach } = digitalFoundation;

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 20,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="global-reach"
      aria-labelledby="reach-title"
      className="relative overflow-hidden scroll-mt-24 bg-[#050507] text-white py-10 md:py-14"
    >
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: reduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="relative grid overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#111113] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:h-[440px] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
            style={{
              backgroundImage:
                "radial-gradient(40% 60% at 80% 50%, rgba(91,52,214,0.16), transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:py-4 lg:pl-10 lg:pr-8 xl:py-6 xl:pl-[60px] xl:pr-12 2xl:py-4">
            <m.p
              {...reveal(0)}
              className="text-[15px] leading-none text-white/90"
            >
              {globalReach.label}
            </m.p>

            <m.div {...reveal(0.07)} className="mt-3 lg:mt-2">
              <div className="inline-flex items-center gap-3 rounded-xl bg-[#1C1C1F] px-4 py-2.5 sm:py-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#2A2450]">
                  <Globe
                    className="size-4 text-[#9B95FF]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-[15px] text-white">
                    {globalReach.chip.text}
                  </span>
                  <span className="hidden size-1 shrink-0 rounded-full bg-white/50 sm:block" />
                  <span className="text-[15px] text-white/80">
                    {globalReach.chip.sub}
                  </span>
                </div>
              </div>
            </m.div>

            <m.h2
              id="reach-title"
              {...reveal(0.14)}
              className="mt-6 text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl lg:mt-4 lg:text-[38px] xl:mt-6 xl:text-[40px] min-[1400px]:text-[46px] 2xl:text-[52px]"
            >
              {globalReach.heading}
            </m.h2>

            <m.p
              {...reveal(0.21)}
              className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/80 md:text-lg lg:mt-2 lg:text-[15px] xl:mt-3 xl:text-[17px] 2xl:text-lg"
            >
              {globalReach.body}
            </m.p>

            <m.div {...reveal(0.28)} className="mt-6 lg:mt-4 xl:mt-5 2xl:mt-8">
              <Link
                href={globalReach.cta.href}
                className="inline-flex items-center justify-center rounded-xl bg-[#673DE6] px-9 py-4 text-lg font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1] hover:shadow-[0_18px_44px_rgba(103,61,230,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] lg:px-8 lg:py-3 lg:text-base xl:py-3.5 xl:text-[17px] 2xl:px-9 2xl:py-4 2xl:text-lg"
              >
                {globalReach.cta.label}
              </Link>

              <p className="mt-4 flex items-center gap-2 text-sm text-white/60 lg:mt-1 xl:mt-3 2xl:mt-2">
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                {globalReach.trust}
              </p>
            </m.div>
          </div>

          <GlobeCanvas
            pins={globalReach.pins}
            caption={globalReach.mapCaption}
          />
        </m.div>
      </div>
    </section>
  );
}
