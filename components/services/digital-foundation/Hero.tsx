"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import HeroOrbit from "@/components/services/digital-foundation/HeroOrbit";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";

const LILAC = "#9B95FF";

export default function DigitalFoundationHero() {
  const reduced = useReducedMotion() ?? false;
  const {
    packageName,
    heroLine,
    priceLabel,
    priceNote,
    checklist,
    primaryCta,
    secondaryCta,
    trustLine,
    feeNote,
  } = digitalFoundation;
  const heroChecklist = checklist.slice(0, 3);

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
      className="df-hero-gradient df-hero-grain relative -mt-[72px] overflow-hidden pb-14 pt-[calc(var(--header-h)+40px)] text-white md:pb-20 md:pt-[calc(var(--header-h)+64px)] lg:pt-[calc(var(--header-h)+72px)]"
    >
      <div className="container-x relative grid items-center gap-8 lg:grid-cols-2 lg:gap-6">
        {/* LEFT */}
        <div className="relative z-10 min-w-0">
          <h1 id="df-hero-title" className="mt-4 font-normal tracking-[-0.03em]">
            <m.span
              className="block whitespace-nowrap text-4xl leading-[1.1] md:text-[clamp(28px,3vw,50px)]"
              style={{ color: LILAC }}
              {...line(0.1)}
            >
              {packageName}
            </m.span>
            <m.span
              className="mt-3 block max-w-xl font-normal leading-snug tracking-[-0.02em] text-white/90"
              style={{ fontSize: "clamp(20px, 2.1vw, 30px)" }}
              {...line(0.18)}
            >
              {heroLine}
            </m.span>
          </h1>

          <ul className="mt-8 max-w-[640px] space-y-3">
            {(heroChecklist ?? []).slice(0, 3).map((item, i) => (
              <m.li
                key={item}
                initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                className="flex items-start gap-2.5 text-[17px] leading-snug text-white"
              >
                <Check className="mt-[3px] size-4 shrink-0" style={{ color: LILAC }} strokeWidth={2} aria-hidden="true" />
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
            className="mt-7 flex flex-col gap-3 md:flex-row md:items-center"
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
        <div className="relative flex min-w-0 items-center justify-center self-center">
          <HeroOrbit />
        </div>
      </div>
    </section>
  );
}
