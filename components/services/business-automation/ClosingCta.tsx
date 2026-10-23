"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import TileGrid from "./TileGrid";

export default function ClosingCta() {
  const reduced = useReducedMotion() ?? false;
  const { closing } = businessAutomation;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [phase, setPhase] = useState<"base" | "out" | "in">("base");
  const [pageVisible, setPageVisible] = useState(true);

  useLayoutEffect(() => {
    if (reduced) {
      setPhase("in");
      return;
    }
    setPhase("out");
    const timer = window.setTimeout(() => setPhase("in"), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (inView) setPhase("in");
  }, [inView]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const revealAttr = phase === "base" ? {} : { "data-reveal": phase };
  const revealStyle = (delay: number): CSSProperties =>
    ({
      "--ba-reveal-y": "24px",
      "--ba-reveal-delay": `${delay}ms`,
      "--ba-reveal-dur": "700ms",
    }) as CSSProperties;

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bacta-1)] text-white"
    >
      <div className="ba-cta-bg absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid items-center gap-12 md:gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          <div className="max-w-xl">
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {closing.heading.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <span
                    {...revealAttr}
                    style={revealStyle(index * 70)}
                    className="ba-reveal inline-block"
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h2>

            <p
              {...revealAttr}
              style={revealStyle(280)}
              className="ba-reveal mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
            >
              {closing.sub}
            </p>

            <div
              {...revealAttr}
              style={revealStyle(350)}
              className="ba-reveal mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={closing.primary.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#120D2E] transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {closing.primary.label}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={closing.secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white/85 transition hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {closing.secondary.label}
              </Link>
            </div>

            <div
              {...revealAttr}
              style={revealStyle(420)}
              className="ba-reveal mt-8 space-y-2"
            >
              <p className="flex items-center gap-2 text-sm text-white/60">
                <ShieldCheck size={16} className="text-white/45" aria-hidden="true" />
                {closing.trustLine}
              </p>
              <p className="max-w-md text-xs leading-relaxed text-white/40">
                {closing.feeNote}
              </p>
            </div>
          </div>

          <TileGrid
            phase={phase}
            autoplay={inView && pageVisible}
            reduced={reduced}
          />
        </div>
      </div>
    </section>
  );
}
