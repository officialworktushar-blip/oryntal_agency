"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  m,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Lock,
  MessageCircle,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import StageHeader from "./StageHeader";
import type { HowItWorksTab } from "@/lib/content/howItWorks";

const iconMap: Record<string, LucideIcon> = {
  CreditCard,
  MessageCircle,
  Truck,
};

export type LaunchShowcaseTab = HowItWorksTab & {
  layout: "browser-showcase";
  media: { label: string; hint: string };
  keywordLine: string;
  browser: { url: string };
  toasts: Array<{ icon: string; title: string; sub: string }>;
};

type LaunchShowcaseProps = {
  tab: LaunchShowcaseTab;
  headingId: string;
};

const toastVariants = {
  enter: { opacity: 0, x: 24, scale: 0.96 },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 30 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

export default function LaunchShowcase({ tab, headingId }: LaunchShowcaseProps) {
  const [toastIndex, setToastIndex] = useState(0);
  /* Hover / focus inside the stage temporarily pauses the toast loop. */
  const [engaged, setEngaged] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  const hasVideo = Boolean(tab.videoSrc);
  const mediaAspect = tab.mediaAspect ?? "16 / 9";
  /* Start from the configured ratio, then trust the file's real dimensions
     once loaded so a replacement video can never be cropped or letterboxed. */
  const [videoAspect, setVideoAspect] = useState(mediaAspect);
  const toasts = tab.toasts;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

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

  const mediaVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const goToNextToast = useCallback(() => {
    setToastIndex((prev) => (prev + 1) % toasts.length);
  }, [toasts.length]);

  useEffect(() => {
    if (reduced || engaged || !isInView || !pageVisible) return;
    const timer = setTimeout(goToNextToast, 2200);
    return () => clearTimeout(timer);
  }, [toastIndex, reduced, engaged, isInView, pageVisible, goToNextToast]);

  /* Video runs by itself: plays while the stage is on screen and the tab is
     visible, pauses otherwise (performance only — not a user control). */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced || !isInView || !pageVisible) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, [isInView, pageVisible, reduced]);

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website launch with payments, WhatsApp and shipping integration",
    serviceType: "Website launch and integration",
    description: tab.description,
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      url: siteUrl || undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        ref={containerRef}
        onPointerEnter={() => setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setEngaged(false);
          }
        }}
        className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:items-center"
      >
        {/* Left */}
        <m.div
          variants={copyGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="order-1 min-w-0"
        >
          <m.div variants={copyItem}>
            <StageHeader
              label={tab.label}
              title={tab.title}
              headingId={headingId}
              className="max-w-xl"
            />
          </m.div>
          <m.p
            variants={copyItem}
            className="mt-6 text-lg leading-relaxed text-muted max-w-xl"
          >
            {tab.description}
          </m.p>
          <m.div variants={copyItem}>
            <Link
              href={tab.cta.href}
              className="group mt-10 flex items-center justify-between border-b border-line py-5 text-xl text-ink outline-none transition-colors hover:border-[#673DE6] focus-visible:ring-2 focus-visible:ring-brand max-w-xl"
            >
              <span>{tab.cta.label}</span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </m.div>
          <m.p
            variants={copyItem}
            className="mt-6 text-sm text-muted/80 max-w-xl"
          >
            {tab.keywordLine}
          </m.p>
        </m.div>

        {/* Right */}
        <m.div
          variants={mediaVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="order-2 min-w-0"
        >
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-[28px] p-2.5 shadow-[0_28px_70px_-32px_rgba(31,42,61,0.55)] ring-1 ring-white/60 sm:p-3.5">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(70% 60% at 0% 100%, #9DB6D0 0%, rgba(157,182,208,0) 70%), radial-gradient(60% 50% at 100% 0%, #E9EEF7 0%, rgba(233,238,247,0) 70%), linear-gradient(135deg, #EEF2F9 0%, #F8FAFD 45%, #DCE6F2 100%)",
                }}
              />
              {/* Browser — sized to the video's native ratio so the whole
                  capture is visible and fills the frame edge to edge. */}
              <div className="relative z-10 overflow-hidden rounded-[18px] bg-[#E4E5E9] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_40px_-24px_rgba(31,42,61,0.45)]">
                <div className="flex h-9 items-center justify-between px-3 sm:h-10">
                  <div className="flex items-center gap-2">
                    <span className="size-[11px] rounded-full bg-[#FF5F57]" />
                    <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
                    <span className="size-[11px] rounded-full bg-[#28C840]" />
                    <ChevronLeft className="ml-1 hidden size-3.5 text-gray-500 sm:block" />
                    <ChevronRight className="hidden size-3.5 text-gray-500 sm:block" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-white/70 px-2 py-0.5">
                    <Lock className="size-3 text-gray-500" />
                    <span className="text-[11px] text-gray-600">
                      {tab.browser.url}
                    </span>
                  </div>
                  <div className="w-[60px]" />
                </div>
                <div
                  className="relative overflow-hidden bg-gradient-to-b from-[#1F2A3D] to-[#5A7596]"
                  style={{ aspectRatio: videoAspect }}
                >
                  {hasVideo ? (
                    <video
                      ref={videoRef}
                      src={tab.videoSrc}
                      poster={tab.posterSrc || undefined}
                      autoPlay={!reduced}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(event) => {
                        const video = event.currentTarget;
                        if (video.videoWidth && video.videoHeight) {
                          setVideoAspect(
                            `${video.videoWidth} / ${video.videoHeight}`,
                          );
                        }
                      }}
                      aria-label="Screen recording of a live store: payment, WhatsApp confirmation and shipping update"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <MediaPlaceholder
                      type="video"
                      aspect={videoAspect}
                      label={tab.media.label}
                      hint={tab.media.hint}
                      className="h-full w-full justify-end border-white/40 bg-transparent pb-12 text-white/85 [&>span:first-child]:hidden"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Toasts — outside the clipping panel so they never get cut off. */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative z-20 mt-3 sm:absolute sm:inset-x-auto sm:-right-3 sm:top-[30%] sm:mt-0 sm:w-[214px] lg:-right-4"
            >
              <AnimatePresence mode="wait">
                {toasts[toastIndex] && (
                  <m.div
                    key={toastIndex}
                    variants={toastVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-lg backdrop-blur"
                  >
                    {(() => {
                      const Icon = iconMap[toasts[toastIndex].icon];
                      return Icon ? (
                        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#673DE6]/10">
                          <Icon className="size-5 text-[#673DE6]" />
                        </div>
                      ) : null;
                    })()}
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {toasts[toastIndex].title}
                      </div>
                      <div className="text-xs text-muted">
                        {toasts[toastIndex].sub}
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <p className="sr-only">
              Screen recording of a live store: a customer pays, a WhatsApp
              confirmation is sent, and the order is dispatched. Illustrative
              notifications: payment received, WhatsApp confirmation sent, order
              dispatched.
            </p>
          </div>
        </m.div>
      </div>
    </>
  );
}
