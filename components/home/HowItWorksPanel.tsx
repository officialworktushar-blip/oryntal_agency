"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import StageHeader from "./StageHeader";
import type { HowItWorksTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";

type HowItWorksPanelProps = {
  tab: HowItWorksTab;
  headingId: string;
};

/**
 * The Build stage: media left, copy right.
 */
export default function HowItWorksPanel({
  tab,
  headingId,
}: HowItWorksPanelProps) {
  const reduced = useReducedMotion() ?? false;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const inView = useInView(mediaRef, { amount: 0.25 });

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Runs by itself while the stage is on screen and the tab is visible. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced || !inView || !pageVisible) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, [inView, pageVisible, reduced]);

  const mediaVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const copyGroup: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };

  const copyItem: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const bulletContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const bulletItem: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, x: -6 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website and application design and development",
    serviceType: "Web and app development",
    description: tab.description,
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      url: siteUrl && siteUrl.length > 0 ? siteUrl : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        {/* Left: Media */}
        <m.div
          variants={mediaVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="relative aspect-video rounded-3xl bg-white/70 shadow-[0_20px_60px_rgba(103,61,230,0.12)] ring-1 ring-white/70"
        >
          <div ref={mediaRef} className="absolute inset-0 overflow-hidden rounded-3xl">
            {tab.videoSrc ? (
              <video
                ref={videoRef}
                src={tab.videoSrc}
                poster={tab.posterSrc || undefined}
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              tab.media && (
                <MediaPlaceholder
                  type="video"
                  aspect="16/9"
                  label={tab.media.label}
                  hint={tab.media.hint}
                  className="h-full w-full justify-end rounded-3xl border-[#673DE6]/40 bg-transparent pb-12 text-[#2F1C6A] [&>span:first-child]:hidden"
                />
              )
            )}
          </div>

          {/* Glass chip */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#673DE6]" />
            <span>{tab.label}</span>
          </div>
        </m.div>

        {/* Right: Content */}
        <m.div
          variants={copyGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="flex flex-col p-4 md:p-6 lg:p-8"
        >
          <m.div variants={copyItem}>
            <StageHeader
              label={tab.label}
              title={tab.title}
              headingId={headingId}
            />
          </m.div>

          <m.p
            variants={copyItem}
            className="mt-4 text-base leading-relaxed text-muted md:text-lg"
          >
            {tab.description}
          </m.p>

          <m.ul variants={bulletContainer} className="mt-6 space-y-3">
            {tab.bullets?.map((bullet) => (
              <m.li
                key={bullet}
                variants={bulletItem}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-[#673DE6]/10">
                  <Check
                    className="size-3.5 text-[#673DE6]"
                    strokeWidth={2.75}
                  />
                </span>
                <span className="text-ink">{bullet}</span>
              </m.li>
            ))}
          </m.ul>

          <m.div variants={copyItem} className="mt-8">
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
          </m.div>
        </m.div>
      </div>
    </>
  );
}
