"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ChevronRight, Check, ShieldCheck } from "lucide-react";
import HeroComposition from "@/components/services/digital-foundation/HeroComposition";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";

const LILAC = "#9B95FF";

export default function DigitalFoundationHero() {
  const reduced = useReducedMotion() ?? false;
  const {
    packageName,
    priceLabel,
    priceNote,
    heroLine,
    checklist,
    primaryCta,
    secondaryCta,
    trustLine,
    feeNote,
    crumbs,
  } = digitalFoundation;

  const line = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "blur(0px)" : "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  function scrollToIncluded(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("included");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      aria-labelledby="df-hero-title"
      className="df-hero-gradient df-hero-grain df-hero-fade relative overflow-hidden pb-40 pt-[72px] text-white md:pb-52"
    >
      <div className="container-x relative grid min-h-[640px] items-center gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-6">
        {/* LEFT */}
        <div className="relative z-10">
          <m.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {crumbs.map((crumb, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {crumb.label}
                      </span>
                    )}
                    {!last ? <ChevronRight className="size-3.5 text-white/40" aria-hidden="true" /> : null}
                  </li>
                );
              })}
            </ol>
          </m.nav>

          <h1
            id="df-hero-title"
            className="mt-6 text-5xl font-normal leading-[1.08] tracking-[-0.03em] lg:text-[64px]"
          >
            <m.span className="block" style={{ color: LILAC }} {...line(0.1)}>
              {packageName}
            </m.span>
            <m.span className="block text-white" {...line(0.18)}>
              {heroLine}
            </m.span>
          </h1>

          <ul className="mt-8 space-y-3.5">
            {checklist.map((item, i) => (
              <m.li
                key={item}
                initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                className="flex items-center gap-3 text-lg text-white"
              >
                <Check className="size-[18px] shrink-0" style={{ color: LILAC }} strokeWidth={2} aria-hidden="true" />
                {item}
              </m.li>
            ))}
          </ul>

          {/* Price line — a tag chip, no offer/discount wording */}
          <m.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            className="mt-9 flex items-center gap-3 text-lg"
          >
            <span className="text-white">Package price</span>
            <span className="relative inline-flex items-center rounded-lg bg-[#673DE6] py-2 pl-5 pr-4 font-bold text-white">
              {/* Left notch: a rotated square with a dark dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-[2px] bg-[#673DE6]"
              />
              <span
                aria-hidden="true"
                className="absolute left-[4px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#0B0D12]/70"
              />
              {priceLabel}
              <span className="ml-1.5 text-sm font-medium text-white/80">{priceNote}</span>
            </span>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 md:flex-row md:items-center"
          >
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-12 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0"
            >
              {primaryCta.label}
            </Link>
            <a
              href={secondaryCta.href}
              onClick={scrollToIncluded}
              className="hidden items-center justify-center rounded-2xl border border-white/25 px-7 py-4 text-white transition-colors duration-200 hover:bg-white/10 md:inline-flex"
            >
              {secondaryCta.label}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="mt-5 flex items-center gap-2 text-white/85">
              <ShieldCheck className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              {trustLine}
            </p>
            <p className="mt-2 max-w-md text-xs text-white/50">{feeNote}</p>
          </m.div>
        </div>

        {/* RIGHT */}
        <div className="relative lg:-mr-16 xl:-mr-28">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}
