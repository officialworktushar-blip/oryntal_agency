"use client";

import Link from "next/link";
import { m, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { HowItWorksTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";

const bulletContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const bulletItem: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

type HowItWorksPanelProps = {
  tab: HowItWorksTab;
  reduced?: boolean;
};

/**
 * The shared "media left / copy right" panel used by the Build tab.
 */
export default function HowItWorksPanel({
  tab,
  reduced = false,
}: HowItWorksPanelProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
      {/* Left: Media */}
      <div className="relative aspect-video rounded-3xl bg-white/70 shadow-[0_20px_60px_rgba(103,61,230,0.12)] ring-1 ring-white/70">
        {tab.media && (
          <MediaPlaceholder
            type="video"
            aspect="16/9"
            label={tab.media.label}
            hint={tab.media.hint}
            className="h-full w-full justify-end rounded-3xl border-[#673DE6]/40 bg-transparent pb-12 text-[#2F1C6A] [&>span:first-child]:hidden"
          />
        )}

        {/* Glass chip */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#673DE6]" />
          {tab.step.includes(" · ") ? (
            <span>
              {tab.step.split(" · ")[0].trim()} ·{" "}
              {tab.step.split(" · ")[1].trim()}
            </span>
          ) : (
            <span>{tab.step}</span>
          )}
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col p-4 md:p-6 lg:p-8">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
          {tab.step.split(" of")[0]}
        </span>
        <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl md:leading-[1.15]">
          {tab.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {tab.description}
        </p>

        <m.ul
          variants={bulletContainer}
          initial="hidden"
          animate="show"
          className="mt-6 space-y-3"
        >
          {tab.bullets?.map((bullet) => (
            <m.li
              key={bullet}
              variants={bulletItem}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-[#673DE6]/10">
                <Check className="size-3.5 text-[#673DE6]" strokeWidth={2.75} />
              </span>
              <span className="text-ink">{bullet}</span>
            </m.li>
          ))}
        </m.ul>

        <div className="mt-8">
          <Link
            href={tab.cta.href}
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-base font-medium text-white shadow-cta outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand ring-offset-2 ring-offset-white",
              !reduced &&
                "hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lift",
            )}
          >
            {tab.cta.label}
            <ArrowRight
              className={cn(
                "size-5 transition-transform duration-200",
                !reduced && "group-hover:translate-x-1",
              )}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
