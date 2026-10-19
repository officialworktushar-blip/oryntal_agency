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
  Bot,
  ChevronRight,
  MessageCircle,
  Pause,
  Play,
  QrCode,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { useTypewriter } from "./useTypewriter";
import type { GrowTypingTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Bot,
  Workflow,
  QrCode,
};

type StackOffset = {
  y: number;
  scale: number;
  z: number;
  overlay: number;
};

/* front / second / third card of the stack */
const stackOffsets: StackOffset[] = [
  { y: 0, scale: 1, z: 30, overlay: 0 },
  { y: -28, scale: 0.95, z: 20, overlay: 0.1 },
  { y: -52, scale: 0.9, z: 10, overlay: 0.2 },
];

const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

type GrowTypingStackProps = {
  tab: GrowTypingTab;
  /** true while the Grow tab is the selected panel */
  isActive?: boolean;
};

export default function GrowTypingStack({
  tab,
  isActive = true,
}: GrowTypingStackProps) {
  const slides = tab.slides;
  const slideCount = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });

  const activeSlide = slides[activeIndex];
  const paused = isPaused || isHovered || isFocused;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const { displayed, restart } = useTypewriter({
    text: activeSlide?.prompt ?? "",
    isPaused: paused,
    isActive,
    isVisible: inView && pageVisible,
    onCycleComplete: goToNext,
    mode: reduced ? "reduced" : "normal",
  });

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      restart();
    },
    [restart],
  );

  const handleDotKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToIndex((index + 1) % slideCount);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToIndex((index - 1 + slideCount) % slideCount);
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
      url:
        process.env.NEXT_PUBLIC_SITE_URL &&
        process.env.NEXT_PUBLIC_SITE_URL.length > 0
          ? process.env.NEXT_PUBLIC_SITE_URL
          : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-8">
        {/* ---------------------------------------------------------- LEFT */}
        <div ref={rootRef} className="relative mx-auto w-full max-w-[760px] pb-14">
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
            <AnimatePresence initial={false}>
              {slides.map((slide, idx) => {
                const offset =
                  ((idx - activeIndex) % slideCount + slideCount) % slideCount;
                // only the front three cards stay mounted; the front card
                // exits downward and the next card slides in at the back
                if (reduced ? offset !== 0 : offset > 2) return null;

                const stack = stackOffsets[offset] ?? stackOffsets[0];
                const isFront = offset === 0;

                return (
                  <m.div
                    key={`grow-slide-${idx}`}
                    initial={
                      reduced
                        ? { opacity: 0 }
                        : isFront
                          ? { y: 0, opacity: 1, scale: 1 }
                          : { y: -76, opacity: 0, scale: 0.86 }
                    }
                    animate={
                      reduced
                        ? { opacity: 1 }
                        : { y: stack.y, opacity: 1, scale: stack.scale }
                    }
                    exit={
                      reduced
                        ? { opacity: 0, transition: { duration: 0.25 } }
                        : {
                            y: 24,
                            opacity: 0,
                            scale: 1.02,
                            transition: { duration: 0.35, ease: "easeOut" },
                          }
                    }
                    transition={
                      reduced
                        ? { duration: 0.25 }
                        : { type: "spring", stiffness: 220, damping: 28 }
                    }
                    style={{
                      zIndex: stack.z,
                      pointerEvents: isFront ? "auto" : "none",
                    }}
                    className="absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(20,12,56,0.18)]"
                  >
                    <MediaPlaceholder
                      type="image"
                      aspect="3/2"
                      src={slide.mediaSrc}
                      alt={slide.alt}
                      label={slide.media.label}
                      hint={slide.media.hint}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(min-width:1024px) 45vw, 100vw"
                      className="h-full w-full rounded-3xl"
                    />

                    {stack.overlay > 0 && (
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-black"
                        style={{ opacity: stack.overlay }}
                      />
                    )}

                    {slide.badge && (
                      <div
                        className={cn(
                          "absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur transition-opacity duration-300",
                          isFront ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <span className="size-1.5 rounded-full bg-[#673DE6]" />
                        <span>{slide.badge}</span>
                      </div>
                    )}
                  </m.div>
                );
              })}
            </AnimatePresence>

            {/* Prompt box — gradient border, overlaps the bottom of the stack */}
            <div className="absolute bottom-0 left-[3%] right-[3%] z-40">
              <div className="rounded-3xl bg-gradient-to-r from-[var(--grad-border-1)] via-[var(--grad-border-2)] to-[var(--grad-border-3)] p-[1.5px]">
                <div className="flex items-center gap-4 rounded-[22px] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(103,61,230,0.18)] md:px-6 md:py-5">
                  <div className="min-h-[6em] flex-1 md:min-h-[4.2em] xl:min-h-[2.8em]">
                    <span
                      aria-hidden="true"
                      className="block break-words text-base leading-snug text-ink md:text-xl"
                    >
                      {displayed}
                      {!reduced && (
                        <span className="typing-caret ml-0.5 inline-block h-[1em] w-[2px] bg-[#673DE6] align-[-0.12em]" />
                      )}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="grid size-[52px] shrink-0 place-items-center rounded-xl bg-[#A99BFF] text-white"
                  >
                    <ChevronRight className="size-6" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full prompt of every slide — SEO + screen readers (not live) */}
          <div className="sr-only">
            {slides.map((slide, idx) => (
              <p key={`prompt-${idx}`}>{slide.prompt}</p>
            ))}
          </div>

          {/* Pause / play */}
          <button
            type="button"
            aria-label={isPaused ? "Play animation" : "Pause animation"}
            aria-pressed={isPaused}
            onClick={() => setIsPaused((value) => !value)}
            className="absolute bottom-0 right-0 grid size-10 place-items-center rounded-full bg-black/10 text-ink backdrop-blur transition-colors hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {isPaused ? (
              <Play className="size-4" />
            ) : (
              <Pause className="size-4" />
            )}
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, idx) => {
              const isActiveDot = idx === activeIndex;
              return (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  aria-label={`Show example ${idx + 1} of ${slideCount}`}
                  aria-current={isActiveDot ? "true" : undefined}
                  onClick={() => goToIndex(idx)}
                  onKeyDown={(event) => handleDotKeyDown(event, idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    isActiveDot
                      ? "w-6 bg-[#673DE6]"
                      : "w-2 bg-ink/20 hover:bg-ink/30",
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------------- RIGHT */}
        <m.div
          variants={revealGroup}
          initial={isActive ? "show" : "hidden"}
          animate={isActive ? "show" : "hidden"}
          className="flex flex-col"
        >
          <m.div variants={revealItem} className="mb-6">
            <TrendingUp
              className="size-11 text-ink"
              strokeWidth={2}
              aria-hidden="true"
            />
          </m.div>

          <m.h3
            variants={revealItem}
            className="text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-ink md:text-5xl"
          >
            {tab.title}
          </m.h3>

          <m.p
            variants={revealItem}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {tab.description}
          </m.p>

          <m.div variants={revealItem} className="mt-10">
            <Link
              href={tab.cta.href}
              className="group flex items-center justify-between border-b border-line py-5 text-xl text-ink outline-none transition-colors hover:border-[#673DE6] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span>{tab.cta.label}</span>
              <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </m.div>

          <m.div variants={revealItem} className="mt-8 flex items-center gap-4">
            <div className="flex shrink-0 items-center -space-x-2">
              {tab.chips.map((chip) => {
                const Icon = iconMap[chip.icon];
                if (!Icon) return null;
                return (
                  <span
                    key={chip.label}
                    role="img"
                    aria-label={chip.label}
                    title={chip.label}
                    className="grid size-11 place-items-center rounded-full border-2 border-white bg-brand-soft text-brand"
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                );
              })}
            </div>
            <p className="max-w-[16rem] text-sm text-muted">{tab.chipsIntro}</p>
          </m.div>
        </m.div>
      </div>
    </>
  );
}
