"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useRef } from "react";
import PlatformCard from "@/components/services/premium-custom/cards/PlatformCard";
import WorkflowCard from "@/components/services/premium-custom/cards/WorkflowCard";
import PrototypeCard from "@/components/services/premium-custom/cards/PrototypeCard";
import ModulesCard from "@/components/services/premium-custom/cards/ModulesCard";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

export default function System() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const { pill, headingLine1, headingLine2, sub, closing } = premiumCustom.system;

  if (typeof window !== "undefined") {
    console.log("[PCS] system section in view", inView);
  }

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "blur(0px)" : "blur(6px)" },
    animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      ref={ref}
      id="system"
      aria-labelledby="system-title"
      className="relative overflow-hidden scroll-mt-24 pcs-bg text-white py-20 md:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 pcs-grain opacity-[0.03]" />
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center">
          <m.span
            className="inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm"
            {...fade(0.05)}
          >
            {pill}
          </m.span>
          <h2 id="system-title" className="mt-5 font-normal tracking-[-0.03em] leading-[1.1] text-4xl md:text-5xl lg:text-[56px] text-balance">
            <m.span className="block" style={{ color: "#9B95FF" }} {...fade(0.12)}>
              {headingLine1}
            </m.span>
            <m.span className="block text-white" {...fade(0.18)}>
              {headingLine2}
            </m.span>
          </h2>
          <m.p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-white/70" {...fade(0.24)}>
            {sub}
          </m.p>
        </div>

        <div className="mt-12 md:mt-16 grid gap-5 grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:697fr_482fr_482fr] lg:items-stretch">
          <m.div {...fade(0.3)} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <PlatformCard />
          </m.div>
          <m.div {...fade(0.36)} className="col-span-1">
            <WorkflowCard />
          </m.div>
          <m.div {...fade(0.42)} className="col-span-1">
            <PrototypeCard />
          </m.div>
          <m.div {...fade(0.48)} className="md:col-span-2 lg:col-span-2">
            <ModulesCard />
          </m.div>
        </div>

        <div className="mt-12 md:mt-14 text-center">
          <m.p className="mx-auto max-w-2xl text-base md:text-lg text-white/75" {...fade(0.54)}>
            {closing.ideal}
          </m.p>
          <m.div {...fade(0.6)} className="mt-6">
            <Link
              href={closing.cta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {closing.cta.label}
            </Link>
          </m.div>
          <m.p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70" {...fade(0.66)}>
            <ShieldCheck className="size-4" aria-hidden />
            {closing.trust}
          </m.p>
          <m.p className="mt-6 mx-auto max-w-2xl text-xs text-white/45" {...fade(0.72)}>
            {closing.note}
          </m.p>
        </div>
      </div>
    </section>
  );
}
