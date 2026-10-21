"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import ServicesExpandingCards from "@/components/home/ServicesExpandingCards";
import HeroChat, { HeroChatNote } from "@/components/chat/HeroChat";

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const line1 = ["Orient", "your", "business."];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero-gradient relative -mt-[72px] pt-[72px] text-white">
      {/* Decorative layer: drifting blobs + grain (clipped to the hero) */}
      <div className="hero-noise pointer-events-none absolute inset-0 overflow-hidden">
        <m.div
          aria-hidden
          className="absolute -left-24 bottom-[-15%] size-[520px] rounded-full bg-brand opacity-[0.35] blur-3xl"
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          aria-hidden
          className="absolute -right-16 bottom-[-25%] size-[440px] rounded-full bg-[#9678ff] opacity-[0.35] blur-3xl"
          animate={reduced ? undefined : { x: [0, -40, 0], y: [0, -36, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* AI chat pill + right-side note — spans edge to edge with a small side gap */}
        <div className="flex w-full flex-col items-center gap-4 px-4 pt-8 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8 md:pt-10">
          <HeroChat />
          <HeroChatNote />
        </div>

        <div className="container-x flex flex-col items-center text-center">
          {/* Headline */}
          <m.h1
            initial={reduced ? "show" : "hidden"}
            animate="show"
            variants={headline}
            className="mt-12 max-w-4xl text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[76px]"
          >
            {line1.map((w) => (
              <m.span
                key={w}
                variants={reduced ? undefined : word}
                className="inline-block"
              >
                {w}&nbsp;
              </m.span>
            ))}
          </m.h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            ORYNTAL builds websites, AI systems, and business automation around
            the way your business actually works — so repetitive work gets
            handled, and your team gets time back for growth.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-7 py-3.5 text-base font-medium text-ink shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-14px_rgba(255,255,255,0.65)]"
            >
              Get started
            </Link>
            <Link
              href="#services"
              className="rounded-lg border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck className="size-4 shrink-0" aria-hidden />
            Clear scope and pricing before we start
          </p>
        </div>

        {/* 4 expanding service cards — same width as the chat bar */}
        <div className="px-4 pb-20 sm:px-6 lg:px-8 md:pb-28">
          <ServicesExpandingCards />
        </div>
      </div>
    </section>
  );
}
