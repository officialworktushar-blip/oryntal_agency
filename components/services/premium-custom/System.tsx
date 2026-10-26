"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import PlatformCard from "@/components/services/premium-custom/cards/PlatformCard";
import WorkflowCard from "@/components/services/premium-custom/cards/WorkflowCard";
import PrototypeCard from "@/components/services/premium-custom/cards/PrototypeCard";
import ModulesCard from "@/components/services/premium-custom/cards/ModulesCard";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduced = useReducedMotion() ?? false;
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const show = inView || forced || reduced;

  return (
    <m.div
      ref={ref}
      className={`pcs-reveal ${className}`}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(6px)" }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function RevealSpan({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduced = useReducedMotion() ?? false;
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const show = inView || forced || reduced;

  return (
    <m.span
      ref={ref}
      className={`pcs-reveal block ${className}`}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(6px)" }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.span>
  );
}

export default function System() {
  const { pill, headingLine1, headingLine2, sub, closing } = premiumCustom.system;

  return (
    <section
      id="system"
      aria-labelledby="system-title"
      className="relative overflow-hidden scroll-mt-24 pcs-bg text-white py-20 md:py-28"
    >
      <noscript>
        <style>{`.pcs-reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <div aria-hidden className="pointer-events-none absolute inset-0 pcs-grain opacity-[0.03]" />
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center">
          <Reveal delay={0.04} y={16}>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm">
              {pill}
            </span>
          </Reveal>
          <h2
            id="system-title"
            className="mt-5 font-normal tracking-[-0.03em] leading-[1.1] text-4xl md:text-5xl lg:text-[56px] text-balance"
          >
            <RevealSpan delay={0.1} y={24} className="text-[#9B95FF]">
              {headingLine1}
            </RevealSpan>
            <RevealSpan delay={0.18} y={24} className="text-white">
              {headingLine2}
            </RevealSpan>
          </h2>
          <Reveal delay={0.26} y={24}>
            <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-white/70">{sub}</p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16 grid gap-5 grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:697fr_482fr_482fr] lg:items-stretch">
          <Reveal
            delay={0.32}
            y={40}
            className="h-full md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <PlatformCard />
          </Reveal>
          <Reveal delay={0.43} y={40} className="h-full col-span-1">
            <WorkflowCard />
          </Reveal>
          <Reveal delay={0.54} y={40} className="h-full col-span-1">
            <PrototypeCard />
          </Reveal>
          <Reveal delay={0.65} y={40} className="h-full md:col-span-2 lg:col-span-2">
            <ModulesCard />
          </Reveal>
        </div>

        <div className="mt-12 md:mt-14 text-center">
          <Reveal delay={0.08} y={24}>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-white/75">{closing.ideal}</p>
          </Reveal>
          <Reveal delay={0.16} y={24}>
            <div className="mt-6">
              <Link
                href={closing.cta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C10]"
              >
                {closing.cta.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24} y={16}>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {closing.trust}
            </p>
          </Reveal>
          <Reveal delay={0.3} y={16}>
            <p className="mt-6 mx-auto max-w-2xl text-xs text-white/45">{closing.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
