"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { WebsiteAppDeliverables } from "@/lib/content/services/websiteApp";
import DeliverableCard from "./DeliverableCard";
import { useCarousel } from "@/hooks/useCarousel";

type DeliverablesProps = {
  data: WebsiteAppDeliverables;
};

export default function Deliverables({ data }: DeliverablesProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  const {
    trackRef,
    canPrev,
    canNext,
    handlePrev,
    handleNext,
    progressWidth,
  } = useCarousel({ reduced });

  // Auto-nudge on first view
  const [hasNudged, setHasNudged] = useState(false);
  useEffect(() => {
    if (inView && !hasNudged && !reduced && trackRef.current) {
      const track = trackRef.current;

      // Nudge right and back
      track.scrollBy({ left: 60, behavior: "smooth" });
      setTimeout(() => {
        track.scrollBy({ left: -60, behavior: "smooth" });
      }, 350);

      setHasNudged(true);
    }
  }, [inView, hasNudged, reduced, trackRef]);

  return (
    <section
      ref={ref}
      id="services-list"
      aria-labelledby="wd-title"
      className="relative overflow-hidden scroll-mt-24 wd-bg text-white py-20 md:py-28"
    >
      {/* Container: full-bleed so the last card can peek past the right edge */}
      <div className="w-full pl-4 sm:pl-6 lg:pl-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))]">
        {/* Header row */}
        <div className="pr-4 sm:pr-6 lg:pr-10 flex items-center justify-between">
          {/* Left: heading and sub */}
          <div className="flex-1">
            <h2
              id="wd-title"
              className={cn(
                "font-normal tracking-[-0.03em] leading-[1.1] text-3xl md:text-4xl lg:text-[46px] text-white",
                !reduced && inView && "animate-in fade-in slide-in-from-bottom-6 duration-700"
              )}
            >
              {data.headingLine}
            </h2>
            <p
              className={cn(
                "mt-3 text-base md:text-lg text-white/75 max-w-2xl",
                !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-75"
              )}
            >
              {data.sub}
            </p>
            {/* Hint text on mobile only */}
            <p className="mt-2 md:hidden text-xs text-white/55">
              {data.hint}
            </p>
          </div>

          {/* Right: arrow buttons (hidden on mobile) */}
          <div
            className={cn(
              "hidden md:flex items-center gap-3",
              !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            )}
          >
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              aria-disabled={!canPrev}
              aria-label="Previous services"
              className={cn(
                "w-[50px] h-[50px] rounded-full flex items-center justify-center border border-white/14 transition-all duration-200",
                "bg-white/16 hover:bg-white/26 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                !canPrev && "opacity-40 pointer-events-none"
              )}
            >
              <ChevronLeft size={26} className="text-white" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              aria-disabled={!canNext}
              aria-label="Next services"
              className={cn(
                "w-[50px] h-[50px] rounded-full flex items-center justify-center border border-white/14 transition-all duration-200",
                "bg-white/16 hover:bg-white/26 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                !canNext && "opacity-40 pointer-events-none"
              )}
            >
              <ChevronRight size={26} className="text-white" />
            </button>
          </div>
        </div>

        {/* Track */}
        <ul
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="What we build"
          className={cn(
            "mt-10 md:mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pr-6 lg:pr-10",
            "no-scrollbar",
            "-webkit-overflow-scrolling: touch",
            "overscroll-behavior-x: contain"
          )}
          style={{
            scrollPaddingLeft: 'max(1rem, calc((100vw - 1500px) / 2 + 2.5rem))',
          }}
        >
          {data.items.map((item, index) => (
            <DeliverableCard
              key={item.id}
              item={item}
              bestForLabel={data.bestForLabel}
              inView={inView}
              reduced={reduced}
              index={index}
            />
          ))}
        </ul>

        {/* Progress bar */}
        <div
          className={cn(
            "mt-6 pr-4 sm:pr-6 lg:pr-10 h-1 rounded-full bg-white/14 relative overflow-hidden",
            !reduced && inView && "animate-in fade-in duration-700 delay-200"
          )}
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 h-full bg-white/85 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Closing row */}
        <div
          className={cn(
            "mt-12 md:mt-14 px-4 text-center",
            !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          )}
        >
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            {data.closing.text}
          </p>
          <Link
            href={data.closing.cta.href}
            className={cn(
              "mt-6 inline-flex items-center justify-center rounded-xl bg-white text-[#1D1E20]",
              "px-10 py-4 text-lg font-medium",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            )}
          >
            {data.closing.cta.label}
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
            <ShieldCheck size={16} />
            <span>{data.closing.trust}</span>
          </div>
          <p className="mt-6 text-xs text-white/50 max-w-2xl mx-auto">
            {data.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
