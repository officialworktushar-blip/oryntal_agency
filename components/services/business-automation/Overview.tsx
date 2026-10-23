"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import OverviewCard from "./OverviewCard";

type RevealState = "base" | "out" | "in";

export default function Overview() {
  const reduced = useReducedMotion() ?? false;
  const { overview } = businessAutomation;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const [phase, setPhase] = useState<RevealState>("base");
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("in");
      return;
    }

    // Content is fully visible on first paint; the entrance is an enhancement
    // that starts only after hydration, with a hard stop at 1.5s.
    setPhase("out");
    const timer = window.setTimeout(() => setPhase("in"), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (inView) setPhase("in");
  }, [inView]);

  const running = inView && pageVisible && !reduced;
  const revealAttr = phase === "base" ? {} : { "data-reveal": phase };

  const revealStyle = (
    delay: number,
    y = 24,
    duration = 700,
  ): CSSProperties =>
    ({
      "--ba-reveal-y": `${y}px`,
      "--ba-reveal-delay": `${delay}ms`,
      "--ba-reveal-dur": `${duration}ms`,
    }) as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="automation"
      aria-labelledby="automation-title"
      className="ba-overview-bg relative overflow-hidden scroll-mt-24 py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="automation-title"
            {...revealAttr}
            style={revealStyle(0)}
            className="ba-reveal mx-auto max-w-3xl text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-5xl lg:text-[58px]"
          >
            {overview.heading}
          </h2>
          <p
            {...revealAttr}
            style={revealStyle(80)}
            className="ba-reveal mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg"
          >
            {overview.sub}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3 lg:gap-7">
          {overview.cards.map((card, index) => (
            <OverviewCard
              key={card.id}
              card={card}
              index={index}
              revealState={phase}
              running={running}
              reduced={reduced}
            />
          ))}
        </div>

        <div
          {...revealAttr}
          style={revealStyle(200)}
          className="ba-reveal mt-12 text-center md:mt-14"
        >
          <p className="mx-auto max-w-xl text-lg text-white/80">{overview.closing.text}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={overview.closing.cta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-9 py-3.5 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#140F33]"
            >
              {overview.closing.cta.label}
            </Link>
            <a
              href={overview.closing.link.href}
              className="group inline-flex items-center gap-1.5 rounded text-white underline decoration-white/60 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {overview.closing.link.label}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-white/55">
            {overview.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
