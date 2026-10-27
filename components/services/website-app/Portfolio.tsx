"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { WebsiteAppPortfolio } from "@/lib/content/services/websiteApp";
import PortfolioCard from "./PortfolioCard";

type PortfolioProps = {
  data: WebsiteAppPortfolio;
};

export default function Portfolio({ data }: PortfolioProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const trackRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(1);

  // Pause animation when section is off-screen or tab is hidden
  useEffect(() => {
    if (reduced || !trackRef.current) return;

    const section = ref.current;
    if (!section) return;

    let inView = true;

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        update();
      },
      { threshold: 0.1 }
    );

    const update = () => {
      const visible = inView && document.visibilityState === "visible";
      if (trackRef.current) {
        trackRef.current.style.animationPlayState = visible ? "running" : "paused";
      }
    };

    observer.observe(section);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduced]);

  // Measure track width and adjust repeat if needed
  useEffect(() => {
    if (reduced || !trackRef.current) return;

    const updateRepeat = () => {
      if (!trackRef.current) return;
      const oneSetWidth = trackRef.current.scrollWidth / 2;
      const viewportWidth = window.innerWidth;

      // If one set is smaller than 1.2x viewport, repeat it
      if (oneSetWidth < viewportWidth * 1.2) {
        const needed = Math.ceil((viewportWidth * 1.2) / oneSetWidth);
        setRepeat(needed);
      } else {
        setRepeat(1);
      }

      // Set animation duration based on width
      const totalWidth = oneSetWidth * repeat;
      const duration = Math.max(50, Math.min(110, totalWidth / 45));
      if (trackRef.current) {
        trackRef.current.style.setProperty("--pf-duration", `${duration}s`);
      }

      // DEBUG: Log measurements (remove after verification)
      console.log("Portfolio rail debug:", {
        oneSetWidth,
        viewportWidth,
        repeat,
        totalWidth,
        duration,
        trackScrollWidth: trackRef.current.scrollWidth,
      });

      // DEBUG: Log first card rect
      const firstCard = trackRef.current.firstElementChild as HTMLElement;
      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        console.log("First card rect:", rect);
      }
    };

    const resizeObserver = new ResizeObserver(updateRepeat);
    resizeObserver.observe(trackRef.current);
    updateRepeat();

    return () => {
      resizeObserver.disconnect();
    };
  }, [reduced, repeat]);

  const cards = data.cards;
  const cardSet = Array.from({ length: repeat }, () => cards).flat();

  return (
    <section
      ref={ref}
      id="sample-work"
      aria-labelledby="pf-title"
      className="relative overflow-hidden scroll-mt-24 bg-white text-[#1D1E20] py-16 md:py-24"
    >
      {/* Fade from previous section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[120px]"
        style={{
          background: "linear-gradient(180deg, #5B3FD8, rgba(255,255,255,0))",
        }}
      />

      {/* Screen-reader list of labels */}
      <ul className="sr-only" aria-label="Sample work categories">
        {cards.map((card) => (
          <li key={card.id}>{card.label}</li>
        ))}
      </ul>

      {/* Header */}
      <div className="relative max-w-3xl mx-auto px-4 text-center pt-12 md:pt-14">
        <div
          className={cn(
            "inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.2em] text-[#673DE6]",
            !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700"
          )}
        >
          <div className="w-[9px] h-[9px] rounded-sm bg-[#673DE6]" />
          {data.eyebrow}
        </div>
        <h2
          id="pf-title"
          className={cn(
            "mt-4 font-normal tracking-[-0.03em] leading-[1.1] text-4xl md:text-5xl lg:text-[52px] text-balance",
            !reduced && inView && "animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100"
          )}
        >
          {data.heading}
        </h2>
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-[#1D1E20]/70",
            !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
          )}
        >
          {data.sub}
        </p>
      </div>

      {/* Rail wrapper */}
      <div
        className={cn(
          "relative mt-12 md:mt-14 w-screen left-1/2 -translate-x-1/2 overflow-hidden group",
          "focus-within:pause"
        )}
        role="region"
        aria-label="Sample work"
        tabIndex={0}
        style={{
          maskImage: "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(
            "flex w-max gap-6 will-change-transform",
            reduced ? "overflow-x-auto snap-x snap-mandatory no-scrollbar" : "pf-track"
          )}
          style={{
            "--pf-duration": "70s",
          } as React.CSSProperties}
        >
          {/* First set */}
          {cardSet.map((card) => (
            <PortfolioCard key={card.id} card={card} hasReducedMotion={reduced} />
          ))}

          {/* Duplicated set (for infinite loop) - aria-hidden */}
          {!reduced && (
            <>
              {cardSet.map((card) => (
                <PortfolioCard
                  key={`${card.id}-b`}
                  card={card}
                  hasReducedMotion={reduced}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Closing row */}
      <div
        className={cn(
          "mt-12 md:mt-14 px-4 text-center",
          !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        )}
      >
        <Link
          href={data.cta.href}
          className={cn(
            "inline-flex items-center justify-center rounded-xl bg-[#673DE6] text-white",
            "px-10 py-4 text-lg font-semibold",
            "transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1]",
            "hover:shadow-[0_12px_32px_rgba(99,61,230,.35)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
          )}
        >
          {data.cta.label}
        </Link>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#1D1E20]/70">
          <ShieldCheck size={16} />
          <span>{data.trust}</span>
        </div>
        <p className="mt-5 text-xs text-[#1D1E20]/50 max-w-xl mx-auto">
          {data.note}
        </p>
      </div>
    </section>
  );
}
