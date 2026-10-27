"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import PillPanel from "./PillPanel";
import { cn } from "@/lib/cn";
import type { WebsiteAppWhatWeBuild } from "@/lib/content/services/websiteApp";

type WhatWeBuildProps = {
  data: WebsiteAppWhatWeBuild;
};

export default function WhatWeBuild({ data }: WhatWeBuildProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (data.cta.href.startsWith("#")) {
      e.preventDefault();
      const id = data.cta.href.replace(/^#/, "");
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={ref}
      id="what-we-build"
      aria-labelledby="wwb-title"
      className="relative scroll-mt-24 bg-white text-[#1D1E20] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:gap-16 items-center lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)]">
          {/* Panel - left on desktop, below text on mobile */}
          <div className="order-2 lg:order-1 flex justify-center md:justify-start">
            <div className="w-full max-w-[520px] md:max-w-[680px] lg:max-w-[800px]">
              <PillPanel pills={data.pills} />
            </div>
          </div>

          {/* Text - right on desktop, above panel on mobile */}
          <div className="order-1 lg:order-2">
            <h2
              id="wwb-title"
              className={cn(
                "font-normal tracking-[-0.03em] leading-[1.1] text-[#1D1E20] text-4xl md:text-5xl lg:text-[56px] max-w-xl text-balance",
                !reduced && inView && "animate-in fade-in slide-in-from-bottom-8 duration-500"
              )}
            >
              <span className="block">{data.headingLine1}</span>
              <span className="block">{data.headingLine2}</span>
            </h2>

            <p
              className={cn(
                "mt-6 text-lg md:text-[19px] text-[#1D1E20]/80 leading-relaxed max-w-xl",
                !reduced && inView && "animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100"
              )}
            >
              {data.body}
            </p>

            <div
              className={cn(
                "mt-8 flex flex-wrap gap-4",
                !reduced && inView && "animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150"
              )}
            >
              <Link
                href={data.cta.href}
                onClick={handleScroll}
                className="group inline-flex items-center gap-2 border border-[#673DE6] text-[#673DE6] rounded-xl px-9 py-4 text-lg font-semibold bg-transparent transition-all duration-200 hover:bg-[#673DE6]/8 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
              >
                {data.cta.label}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={data.secondary.href}
                className="inline-flex items-center gap-2 text-[#1D1E20] underline underline-offset-4 transition-colors hover:text-[#673DE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 focus-visible:ring-offset-2"
              >
                {data.secondary.label}
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <p
              className={cn(
                "mt-6 text-xs text-[#1D1E20]/55 max-w-md",
                !reduced && inView && "animate-in fade-in duration-500 delay-200"
              )}
            >
              {data.note}
            </p>
          </div>
        </div>

        {/* Screen reader only list */}
        <div className="sr-only">
          <p>{data.srSummary}</p>
          <ul aria-label="What we build">
            {data.pills.map((pill) => (
              <li key={pill.id}>
                {pill.label}: {pill.caption}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
