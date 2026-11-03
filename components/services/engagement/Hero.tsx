"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, ShieldCheck, Search, Hammer, Rocket } from "lucide-react";
import { engagement } from "@/lib/content/services/engagement";
import { cn } from "@/lib/cn";

const ICONS = {
  Search,
  Hammer,
  Rocket,
} as const;

export default function EngagementHero() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const inView = useInView(timelineRef, { amount: 0.5, once: true });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="eng-hero-title"
      className="relative isolate overflow-hidden text-center text-white"
      style={{ backgroundColor: "#0C0D0D", paddingTop: "calc(var(--header-h, 72px) + 64px)", paddingBottom: "72px", minHeight: "720px" }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: calc(var(--header-h, 72px) + 72px) !important;
            padding-bottom: 96px !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[12%] left-0 h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #15122A 0%, #7C58F0 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[12%] left-[12.5%] h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #14122A 0%, #5A37D1 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[30%] left-[25%] h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #121022 0%, #4B30A8 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[54%] left-[37.5%] h-full w-[25%]"
          style={{
            background: "linear-gradient(180deg, #0E0E12 0%, #2A1F5E 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[30%] left-[62.5%] h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #121022 0%, #4B30A8 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[12%] left-[75%] h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #14122A 0%, #5A37D1 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />
        <div
          className="absolute top-[12%] left-[87.5%] h-full w-[12.5%]"
          style={{
            background: "linear-gradient(180deg, #15122A 0%, #7C58F0 100%)",
            opacity: reduced ? 1 : 0.92,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(60% 55% at 50% 36%, rgba(12,13,13,0.85), rgba(12,13,13,0) 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/55">
            <li>Services</li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4" aria-hidden="true" />
              <span>Custom Consultation & Development</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4" aria-hidden="true" />
              <span className="text-white/80" aria-current="page">
                Three-Month Engagement
              </span>
            </li>
          </ol>
        </nav>

        <p className="mt-6 text-[15px] font-medium md:text-base" style={{ color: "#9B95FF" }}>
          {engagement.eyebrow}
        </p>

        <h1
          id="eng-hero-title"
          className="mt-5 mx-auto max-w-4xl text-balance text-5xl font-normal tracking-[-0.035em] leading-[1.08] text-white sm:text-6xl lg:text-[68px]"
        >
          <motion.span
            initial={reduced ? false : { y: 20, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            {engagement.h1Line1}
          </motion.span>
          <motion.span
            initial={reduced ? false : { y: 20, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="block"
          >
            {engagement.h1Line2}
          </motion.span>
        </h1>

        <p className="mt-6 mx-auto max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
          {engagement.sub}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={engagement.primaryCta.href}
            className="inline-flex h-[64px] items-center justify-center rounded-xl bg-white px-12 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0D]"
          >
            {engagement.primaryCta.label}
          </Link>
          <a
            href={engagement.secondaryCta.href}
            className="inline-flex h-[64px] items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-lg font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0D]"
          >
            {engagement.secondaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
          <ShieldCheck className="size-4" aria-hidden="true" />
          <span>{engagement.trust}</span>
        </div>
        <p className="mt-1 mx-auto max-w-xl text-xs text-white/55">
          {engagement.pricingNote}
        </p>

        <ol
          ref={timelineRef}
          aria-label="Three-month engagement plan"
          className="mt-12 mx-auto max-w-[980px] relative md:mt-14"
        >
          <div className="relative hidden md:block">
            <div
              className="absolute top-[44px] left-[44px] right-[44px] h-[2px]"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <motion.div
              className="absolute top-[44px] left-[44px] h-[2px]"
              style={{
                background: "linear-gradient(90deg, #B9A8FF, #7B65F0)",
                width: reduced ? "100%" : inView ? "100%" : "0%",
              }}
              initial={{ width: reduced ? "100%" : "0%" }}
              animate={{ width: reduced ? "100%" : inView ? "100%" : "0%" }}
              transition={{ duration: 2.4, ease: "easeOut" }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {engagement.stages.map((stage, index) => {
              const Icon = ICONS[stage.icon];
              return (
                <motion.li
                  key={stage.id}
                  initial={reduced ? false : { y: 12, opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.12 }}
                  className="relative rounded-2xl border border-white/15 p-5 text-left md:text-center"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(10px)",
                    textShadow: "0 1px 12px rgba(10,6,30,0.55)",
                  }}
                  onPointerEnter={(e) => {
                    if (!reduced) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "rgba(185,168,255,0.5)";
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (!reduced) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    }
                  }}
                >
                  <div className="flex items-center gap-3 md:flex-col md:gap-0">
                    <div className="grid size-[44px] shrink-0 place-items-center rounded-full border border-white/20 md:mx-auto" style={{ background: "rgba(185,168,255,0.18)" }}>
                      <Icon className="size-[22px]" style={{ color: "#D9CFFF" }} aria-hidden="true" />
                    </div>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#B9A8FF" }}>
                      {stage.month}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[18px] font-semibold leading-snug text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/75">
                    {stage.caption}
                  </p>
                  {index < engagement.stages.length - 1 && (
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 hidden text-white/50 md:block" aria-hidden="true" />
                  )}
                </motion.li>
              );
            })}
          </div>
        </ol>

        <p className="mt-5 mx-auto max-w-xl text-xs text-white/60">
          {engagement.timelineNote}
        </p>

        <p className="sr-only">{engagement.srSummary}</p>
      </div>
    </section>
  );
}
