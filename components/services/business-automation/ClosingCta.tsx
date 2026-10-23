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
      aria-labelledby="cta-title"
      className="relative overflow-hidden scroll-mt-24 border-t border-white/[0.08] py-20 text-white md:py-24 ba-cta-bg"
    >
      <div className="ba-cta-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          <div className="relative z-10 min-w-0 max-w-xl">
            <p className="sr-only">{closing.srSummary}</p>

            <h2
              id="cta-title"
              className="max-w-xl text-balance text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl lg:text-[56px]"
            >
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
              className="ba-reveal mt-6 max-w-xl text-lg leading-relaxed text-white/85"
            >
              {closing.sub}
            </p>

            <div
              {...revealAttr}
              style={revealStyle(350)}
              className="ba-reveal mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center"
            >
              <Link
                href={closing.primary.href}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-9 py-4 text-lg font-medium text-[#1D1E20] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:w-auto"
              >
                {closing.primary.label}
              </Link>
              <Link
                href={closing.secondary.href}
                className="group inline-flex items-center gap-1.5 text-base text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {closing.secondary.label}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div
              {...revealAttr}
              style={revealStyle(420)}
              className="ba-reveal"
            >
              <p className="mt-5 flex items-center gap-2 text-sm text-white/75">
                <ShieldCheck size={16} aria-hidden="true" />
                {closing.trust}
              </p>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/45">
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
