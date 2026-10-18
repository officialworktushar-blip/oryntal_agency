"use client";

import Link from "next/link";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Magnetic from "@/components/motion/Magnetic";
import { hero } from "@/lib/content/home";

const chips = [
  { label: "CRM Dashboard", className: "left-[-4%] top-[14%]", delay: 0 },
  { label: "Landing Page", className: "right-[-3%] top-[8%]", delay: 0.8 },
  { label: "AI Assistant", className: "left-[-2%] bottom-[16%]", delay: 1.6 },
  { label: "WhatsApp Automation", className: "right-[-5%] bottom-[10%]", delay: 2.4 },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const mediaY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : -40]);

  return (
    <section className="glow-brand relative overflow-hidden bg-gradient-to-b from-brand-wash to-white">
      <div className="container-x relative flex flex-col items-center pb-16 pt-16 text-center md:pt-24">
        <span className="inline-flex items-center rounded-full border border-brand/20 bg-white px-3 py-1.5 text-xs font-medium text-brand shadow-card">
          {hero.pill}
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.heading}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {hero.subheading}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Magnetic>
            <Link href={hero.primaryCta.href} className="btn-primary px-6 py-3.5 text-base">
              {hero.primaryCta.label}
            </Link>
          </Magnetic>
          <Link href={hero.secondaryCta.href} className="btn-secondary px-6 py-3.5 text-base">
            {hero.secondaryCta.label}
          </Link>
        </div>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
          <Check className="size-4 text-brand" aria-hidden />
          {hero.microTrust}
        </p>

        <m.div
          style={{ y: mediaY }}
          className="relative mt-14 w-full max-w-5xl px-2 sm:px-8"
        >
          {/* Browser-frame mockup */}
          <div className="card overflow-hidden !rounded-3xl shadow-pop">
            <div className="flex items-center gap-1.5 border-b border-line bg-white/80 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 h-4 flex-1 rounded bg-line/70" />
            </div>
            <MediaPlaceholder
              type="image"
              aspect="16/10"
              label={hero.image.label}
              hint={hero.image.hint}
              className="!rounded-none border-0"
            />
          </div>

          {/* Floating chips */}
          {chips.map((chip) => (
            <m.span
              key={chip.label}
              className={`absolute hidden rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-card lg:block ${chip.className}`}
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay,
              }}
            >
              {chip.label}
            </m.span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
