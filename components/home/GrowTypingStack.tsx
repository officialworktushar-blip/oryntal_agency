"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Pause,
  Play,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { MessageCircle, Bot, Workflow, QrCode } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { useTypewriter } from "./useTypewriter";
import type { HowItWorksTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Bot,
  Workflow,
  QrCode,
  TrendingUp,
};

const cardVariants = {
  enter: (direction: 1 | -1) => ({
    y: 24,
    opacity: 0,
    scale: 1.02,
    zIndex: 5,
    transition: { duration: 0.35, ease: "easeOut" },
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    zIndex: 30,
                    transition: { type: "spring", stiffness: 220, damping: 28 },
  },
  exit: (direction: 1 | -1) => ({
    y: 24,
    opacity: 0,
    scale: 1.02,
    zIndex: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  }),
};

const stackedVariants = [
  { y: 0, scale: 1, opacity: 1, z: 30 },
  { y: -28, scale: 0.95, z: 20, overlay: true, overlayOpacity: 0.1 },
  { y: -52, scale: 0.9, z: 10, overlay: true, overlayOpacity: 0.2 },
];

type GrowTypingStackProps = {
  tab: HowItWorksTab & {
    layout: "typing-stack";
    slides: Array<{
      prompt: string;
      alt: string;
      badge?: string;
      media: { label: string; hint: string };
      mediaSrc?: string;
    }>;
    chipsIntro: string;
    chips: Array<{ icon: string; label: string }>;
  };
};

export default function GrowTypingStack({ tab }: GrowTypingStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const reduced = useReducedMotion();

  const slides = tab.slides;
  const activeSlide = slides[activeIndex];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index % slides.length);
  }, []);

  const { displayed, fullText, restart } = useTypewriter({
    text: activeSlide?.prompt ?? "",
    isPaused: isPaused || isHovered || isFocused,
    isActive: true,
    isVisible: true,
    onCycleComplete: goToNext,
    mode: reduced ? "reduced" : "normal",
  });

  useEffect(() => {
    restart();
  }, [activeIndex, restart]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsPaused(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const handleDotClick = (index: number) => {
    goToIndex(index);
    setIsPaused(false);
  };

  const handleDotKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleDotClick((index + 1) % slides.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleDotClick((index - 1 + slides.length) % slides.length);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI agents, chatbots and business automation",
    serviceType: "Business automation",
    description: tab.description,
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      url: siteUrl || undefined,
    },
  };

  const chipIcons: Array<LucideIcon> = tab.chips
    .map((c) => iconMap[c.icon])
    .filter(Boolean) as LucideIcon[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        {/* Left column */}
        <div className="relative mx-auto w-full max-w-[760px] pb-14">
          <div
            className="relative aspect-[3/2.1]"
            role="group"
            aria-roledescription="carousel"
            aria-label="Examples of what we automate"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {slides.map((slide, idx) => {
              const offset = (idx - activeIndex + slides.length) % slides.length;
              const stacked = stackedVariants[offset as 0 | 1 | 2];
              if (!stacked) return null;

              const isFront = offset === 0;

              return (
                <AnimatePresence
                  key={`${activeSlide?.prompt}-${idx}`}
                  initial={false}
                >
                  <m.div
                    custom={1}
                    variants={reduced ? {} : cardVariants}
                    initial={reduced ? false : "enter"}
                    animate={reduced ? { opacity: isFront ? 1 : 0 } : "center"}
                    exit={reduced ? { opacity: 0 } : "exit"}
                    className={cn(
                      "absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(20,12,56,0.18)]",
                    )}
                    style={{
                      zIndex: stacked.z,
                      transform: reduced
                        ? "none"
                        : `translateY(${stacked.y}px) scale(${stacked.scale})`,
                      opacity: reduced ? (isFront ? 1 : 0) : stacked.opacity,
                      pointerEvents: isFront ? "auto" : "none",
                    }}
                  >
                    {slide.badge && isFront && (
                      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur">
                        <span className="size-1.5 rounded-full bg-[#673DE6]" />
                        <span>{slide.badge}</span>
                      </div>
                    )}

                    {stacked.overlay && (
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{ backgroundColor: `rgba(0,0,0,${stacked.overlayOpacity})` }}
                      />
                    )}

                    <div className="absolute inset-0">
                      {slide.mediaSrc ? (
                        <Image
                          src={slide.mediaSrc}
                          alt={slide.alt}
                          fill
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <MediaPlaceholder
                          type="image"
                          aspect="3/2"
                          label={slide.media.label}
                          hint={slide.media.hint}
                          className="h-full w-full rounded-3xl border-[#673DE6]/40 bg-white/90 text-[#2F1C6A]"
                        />
                      )}
                    </div>
                  </m.div>
                </AnimatePresence>
              );
            })}

            {/* Prompt box */}
            <div className="absolute bottom-0 left-[3%] right-[3%] z-40">
              <div className="rounded-3xl bg-gradient-to-r from-[#7B4DFF] via-[#C13BE0] to-[#7B4DFF] p-[1.5px] shadow-[0_12px_40px_rgba(103,61,230,0.18)]">
                <div className="flex items-center gap-4 rounded-[22px] bg-white px-5 py-4 md:px-6 md:py-5">
                  <div className="flex min-h-[2.8em] flex-1 items-start md:min-h-[2.8em]">
                    <span
                      aria-hidden
                      className="text-lg leading-snug text-ink md:text-xl"
                    >
                      {reduced ? fullText : displayed}
                      {!reduced && (
                        <span className="ml-0.5 inline-block h-[1.2em] w-[2px] bg-[#673DE6] animate-pulse" />
                      )}
                    </span>
                    <p className="sr-only">{fullText}</p>
                  </div>
                  <div className="grid size-[52px] shrink-0 place-items-center rounded-xl bg-[#A99BFF] text-white">
                    <ChevronRight className="size-6" aria-hidden />
                  </div>
                </div>
              </div>
            </div>

            {/* Pause/play */}
            <div className="absolute bottom-0 right-0 z-40 translate-y-12">
              <button
                type="button"
                aria-label={isPaused ? "Play animation" : "Pause animation"}
                aria-pressed={isPaused}
                onClick={() => setIsPaused((p) => !p)}
                className="grid size-10 place-items-center rounded-full bg-black/10 text-ink shadow-sm backdrop-blur transition-colors hover:bg-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {isPaused ? (
                  <Play className="size-4" />
                ) : (
                  <Pause className="size-4" />
                )}
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 translate-y-[72px] items-center gap-2">
              {slides.map((_, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Show example ${idx + 1} of ${slides.length}`}
                    onClick={() => handleDotClick(idx)}
                    onKeyDown={(e) => handleDotKeyDown(e, idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      active
                        ? "w-6 bg-[#673DE6]"
                        : "w-2 bg-ink/20 hover:bg-ink/30",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col">
          <div className="mb-6 grid size-11 place-items-center rounded-xl bg-brand-soft text-[#673DE6]">
            <TrendingUp className="size-5" strokeWidth={2} />
          </div>
          <h3 className="text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-ink md:text-5xl">
            {tab.title}
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {tab.description}
          </p>

          <Link
            href={tab.cta.href}
            className="group mt-10 flex items-center justify-between border-b border-line py-5 text-xl text-ink outline-none transition-colors hover:border-[#673DE6] focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span>{tab.cta.label}</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center">
              {chipIcons.map((Icon, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "grid size-11 place-items-center rounded-full border-2 border-white bg-brand-soft text-[#673DE6]",
                    idx > 0 && "-ml-2",
                  )}
                  title={tab.chips[idx]?.label}
                  aria-label={tab.chips[idx]?.label}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </div>
              ))}
            </div>
            <p className="max-w-[16rem] text-sm text-muted">{tab.chipsIntro}</p>
          </div>
        </div>
      </div>
    </>
  );
}
