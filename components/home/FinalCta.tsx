"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  m,
  useInView,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  ChevronDown,
  Globe,
  PackageSearch,
  Pause,
  Play,
  Plug,
  Workflow,
  Zap,
} from "lucide-react";
import {
  finalCtaContent,
  finalCtaTabs,
  type FinalCtaTabId,
} from "@/lib/content/finalCta";
import { cn } from "@/lib/cn";

const tabIcons: Record<FinalCtaTabId, typeof Globe> = {
  websites: Globe,
  ai: Bot,
  automation: Workflow,
  integrations: Plug,
  sourcing: PackageSearch,
};

/* Staircase of glass prompt cards (desktop % of the composition). */
const cardLayers = [
  { z: 10, opacity: 0.75, blur: 0.5, l: 0, t: 14, w: 62, ml: 0, mt: 10, mw: 82 },
  { z: 20, opacity: 0.9, blur: 0, l: 10, t: 32, w: 66, ml: 4, mt: 30, mw: 86 },
  { z: 30, opacity: 1, blur: 0, l: 20, t: 50, w: 70, ml: 8, mt: 50, mw: 90 },
];

export default function FinalCta() {
  const reduced = useReducedMotion() ?? false;

  const compRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [manualHold, setManualHold] = useState(false);
  const [pointerOver, setPointerOver] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [badgeHover, setBadgeHover] = useState(false);
  const [pill, setPill] = useState({
    x: 0,
    w: 0,
    top: 0,
    h: 0,
    ready: false,
  });

  const holdTimer = useRef<number | null>(null);
  const inView = useInView(compRef, { amount: 0.3 });
  const entered = useInView(compRef, { amount: 0.3, once: true });

  const cursorX = useSpring(0, { stiffness: 120, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 120, damping: 20 });
  const setCursorX = cursorX.set;
  const setCursorY = cursorY.set;

  /* Autoplay — only when in view, page visible, pointer outside, not paused. */
  useEffect(() => {
    if (reduced || userPaused || manualHold || !inView || !pageVisible || pointerOver) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % finalCtaTabs.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [reduced, userPaused, manualHold, inView, pageVisible, pointerOver]);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(
    () => () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    },
    [],
  );

  const selectTab = (index: number) => {
    setActiveIndex(index);
    setManualHold(true);
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setManualHold(false), 10000);
  };

  /* Measure the active tab so the pill + cursor can glide to it. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const comp = compRef.current;
    const btn = tabRefs.current[activeIndex];
    if (!track || !comp || !btn) return;

    setPill({
      x: btn.offsetLeft,
      w: btn.offsetWidth,
      top: btn.offsetTop,
      h: btn.offsetHeight,
      ready: true,
    });

    const compRect = comp.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setCursorX(btnRect.right - compRect.left - 8);
    setCursorY(btnRect.bottom - compRect.top - 8);
  }, [activeIndex, setCursorX, setCursorY]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* Keep the active tab centred in the scrollable (mobile) toolbar. */
  useEffect(() => {
    const track = trackRef.current;
    const btn = tabRefs.current[activeIndex];
    if (!track || !btn) return;
    if (track.scrollWidth > track.clientWidth + 1) {
      track.scrollTo({
        left: Math.max(
          0,
          btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2,
        ),
        behavior: reduced ? "auto" : "smooth",
      });
    }
  }, [activeIndex, reduced]);

  const floatActive = entered && inView && !reduced;

  const textGroup: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };
  const textItem: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="book"
      aria-labelledby="cta-title"
      className="cta-gradient cta-grain relative scroll-mt-24 overflow-hidden py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* LEFT — heading, description, CTA row */}
          <m.div
            variants={textGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <m.p
              variants={textItem}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B9A8FF]"
            >
              {finalCtaContent.eyebrow}
            </m.p>

            <m.h2
              id="cta-title"
              variants={textItem}
              className="mt-4 max-w-xl text-4xl font-medium leading-[1.12] tracking-[-0.03em] text-white md:text-[46px] lg:text-5xl"
            >
              {finalCtaContent.heading}
            </m.h2>

            <m.p
              variants={textItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              {finalCtaContent.description}
            </m.p>

            <m.div variants={textItem} className="mt-10 max-w-xl">
              <Link
                href={finalCtaContent.primary.href}
                className="group flex items-center justify-between border-b border-white/20 py-5 text-xl text-white outline-none transition-colors hover:border-white/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A0F45]"
              >
                <span>{finalCtaContent.primary.label}</span>
                <ArrowRight
                  aria-hidden
                  className="size-6 transition-transform duration-200 group-hover:translate-x-1.5"
                />
              </Link>
            </m.div>

            <m.p variants={textItem} className="mt-5 text-sm text-white/70">
              {finalCtaContent.secondaryPrefix}
              <Link
                href={finalCtaContent.secondary.href}
                className="underline underline-offset-4 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A0F45]"
              >
                {finalCtaContent.secondary.label}
              </Link>
            </m.p>
          </m.div>

          {/* RIGHT — the composition */}
          <div
            ref={compRef}
            onMouseEnter={() => setPointerOver(true)}
            onMouseLeave={() => setPointerOver(false)}
            className="relative min-h-[420px] min-w-0 overflow-visible md:min-h-[440px] lg:min-h-[520px]"
          >
            {/* Screen-reader copy of every example prompt */}
            <ul className="sr-only" aria-label="Examples of what ORYNTAL can build">
              {finalCtaTabs.flatMap((tab) =>
                tab.prompts.map((prompt) => (
                  <li key={`${tab.id}-${prompt}`}>{prompt}</li>
                )),
              )}
            </ul>

            {/* A) App tile */}
            <div aria-hidden="true">
              <m.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={
                  entered
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { type: "spring", stiffness: 220, damping: 20 }
                }
                className="absolute right-[6%] top-0 z-30 size-24 md:size-[120px]"
              >
                <m.div
                  animate={floatActive ? { y: [0, -6, 0] } : { y: 0 }}
                  transition={
                    floatActive
                      ? {
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }
                      : { duration: 0.3 }
                  }
                  className="flex size-full items-center justify-center rounded-[28px] border border-white/20 bg-[linear-gradient(145deg,#7B68FF_0%,#5B34D6_100%)] shadow-[0_20px_50px_rgba(60,30,160,0.5)]"
                >
                  <Image
                    src="/oryntal-logo.png"
                    alt=""
                    width={64}
                    height={64}
                    className="size-14 object-contain brightness-0 invert md:size-16"
                  />
                </m.div>
              </m.div>
            </div>

            {/* B) Three overlapping prompt cards */}
            {cardLayers.map((layer, cardIndex) => {
              const prompt = finalCtaTabs[activeIndex].prompts[cardIndex];
              const isFront = cardIndex === cardLayers.length - 1;

              return (
                <div
                  key={layer.z}
                  aria-hidden="true"
                  style={
                    {
                      "--l": `${layer.l}%`,
                      "--t": `${layer.t}%`,
                      "--w": `${layer.w}%`,
                      "--ml": `${layer.ml}%`,
                      "--mt": `${layer.mt}%`,
                      "--mw": `${layer.mw}%`,
                      zIndex: layer.z,
                    } as React.CSSProperties
                  }
                  className="absolute left-[var(--l)] top-[var(--t)] w-[var(--w)] max-md:left-[var(--ml)] max-md:top-[var(--mt)] max-md:w-[var(--mw)]"
                >
                  <m.div
                    initial={
                      reduced
                        ? { opacity: 0 }
                        : { opacity: 0, x: 60, y: 30 }
                    }
                    animate={
                      entered
                        ? { opacity: layer.opacity, x: 0, y: 0 }
                        : { opacity: 0, x: 60, y: 30 }
                    }
                    transition={
                      reduced
                        ? { duration: 0.35, delay: cardIndex * 0.07 }
                        : {
                            type: "spring",
                            stiffness: 220,
                            damping: 26,
                            delay: 0.1 + cardIndex * 0.12,
                          }
                    }
                  >
                    <m.div
                      animate={floatActive ? { y: [0, -4, 0] } : { y: 0 }}
                      transition={
                        floatActive
                          ? {
                              duration: 6,
                              repeat: Infinity,
                              repeatType: "mirror",
                              ease: "easeInOut",
                              delay: cardIndex * 0.9,
                            }
                          : { duration: 0.3 }
                      }
                    >
                      <div
                        className="relative flex min-h-[150px] flex-col justify-between gap-5 rounded-[28px] border border-white/30 bg-[linear-gradient(160deg,rgba(220,212,255,0.92)_0%,rgba(168,152,245,0.85)_100%)] px-6 py-5 shadow-[0_18px_50px_rgba(20,8,70,0.45)] backdrop-blur-md md:px-8 md:py-7"
                        style={
                          layer.blur
                            ? { filter: `blur(${layer.blur}px)` }
                            : undefined
                        }
                      >
                        {cardIndex === 0 ? (
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-[28px] bg-[#3B22A0]/25"
                          />
                        ) : null}

                        <div className="relative">
                          <AnimatePresence mode="wait" initial={false}>
                            <m.p
                              key={`${activeIndex}-${cardIndex}`}
                              initial={
                                reduced
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 10 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={
                                reduced
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: -10 }
                              }
                              transition={{
                                duration: reduced ? 0.15 : 0.26,
                                delay: reduced ? 0 : cardIndex * 0.07,
                                ease: "easeOut",
                              }}
                              className="text-lg leading-snug text-[#2A1C5E] md:text-xl lg:text-2xl"
                            >
                              {prompt}
                            </m.p>
                          </AnimatePresence>
                        </div>

                        {isFront ? (
                          <div className="relative flex items-center gap-1.5 text-sm font-medium text-[#2A1C5E]/80">
                            <Zap aria-hidden className="size-4" />
                            <span>{finalCtaContent.frontCardLabel}</span>
                            <ChevronDown aria-hidden className="size-3.5" />
                          </div>
                        ) : (
                          <Zap
                            aria-hidden
                            className="relative size-4 text-[#2A1C5E]/60"
                          />
                        )}
                      </div>
                    </m.div>
                  </m.div>
                </div>
              );
            })}

            {/* C) Toolbar pill */}
            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={
                entered
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                duration: reduced ? 0.3 : 0.45,
                delay: reduced ? 0 : 0.5,
                ease: "easeOut",
              }}
              className="absolute bottom-0 left-0 right-0 z-40 md:bottom-[2%] md:left-[30%] md:right-auto"
            >
              <div
                ref={trackRef}
                className="relative flex gap-1 overflow-x-auto rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(10,4,40,0.45)] no-scrollbar md:overflow-visible"
              >
                <m.span
                  aria-hidden
                  className="absolute rounded-xl bg-[#E6E1FF]"
                  style={{ top: pill.top, height: pill.h }}
                  animate={{
                    x: pill.x,
                    width: pill.w,
                    opacity: pill.ready ? 1 : 0,
                  }}
                  transition={
                    reduced
                      ? { duration: 0.15 }
                      : { type: "spring", stiffness: 210, damping: 26 }
                  }
                />
                {finalCtaTabs.map((tab, index) => {
                  const Icon = tabIcons[tab.id];
                  const active = index === activeIndex;
                  return (
                    <button
                      key={tab.id}
                      ref={(node) => {
                        tabRefs.current[index] = node;
                      }}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectTab(index)}
                      className={cn(
                        "relative z-10 flex shrink-0 flex-col items-center gap-1 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors outline-none xl:px-4",
                        "focus-visible:ring-2 focus-visible:ring-[#4A2FB8] focus-visible:ring-offset-2",
                        active ? "text-[#4A2FB8]" : "text-[#2A2A3C]",
                      )}
                    >
                      <Icon aria-hidden className="size-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </m.div>

            {/* D) Cursor gliding over the toolbar (pointer devices only) */}
            {!reduced ? (
              <m.div
                aria-hidden
                style={{ x: cursorX, y: cursorY }}
                className="pointer-events-none absolute left-0 top-0 z-[45] hidden md:block"
              >
                <m.span
                  key={`cursor-press-${activeIndex}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ delay: 0.36, duration: 0.26 }}
                  className="block origin-top-left drop-shadow-[0_4px_10px_rgba(10,4,40,0.5)]"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5.5 2.9 L18.9 12.6 L12.9 13.4 L15.9 19.6 L13.2 20.7 L10.2 14.5 L6.3 18.1 Z"
                      fill="#FFFFFF"
                      stroke="#1A1030"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </m.span>
              </m.div>
            ) : null}

            {/* Autoplay pause / play */}
            <m.button
              type="button"
              aria-pressed={userPaused}
              aria-label={userPaused ? "Play animation" : "Pause animation"}
              onClick={() => setUserPaused((paused) => !paused)}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={
                entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              transition={{
                duration: reduced ? 0.3 : 0.35,
                delay: reduced ? 0 : 0.6,
                ease: "easeOut",
              }}
              className="absolute bottom-[84px] left-0 z-50 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A0F45] md:bottom-0"
            >
              {userPaused ? (
                <Play aria-hidden className="size-4" />
              ) : (
                <Pause aria-hidden className="size-4" />
              )}
            </m.button>

            {/* E) Rotating "Book a Consultant" badge */}
            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={
                entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
              }
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { type: "spring", stiffness: 260, damping: 16, delay: 0.7 }
              }
              className="absolute bottom-[84px] right-0 z-50 md:bottom-[-2%] md:right-[-1%]"
            >
              <Link
                href={finalCtaContent.primary.href}
                aria-label={finalCtaContent.badgeLabel}
                onMouseEnter={() => setBadgeHover(true)}
                onMouseLeave={() => setBadgeHover(false)}
                className="group relative block size-[108px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A0F45] md:size-[132px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-white/25 shadow-[0_16px_40px_rgba(60,30,160,0.55)] transition-shadow duration-300 group-hover:shadow-[0_16px_64px_rgba(90,50,220,0.85)]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #8F78FF 0%, #5B34D6 70%)",
                  }}
                />
                <m.span
                  aria-hidden
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: badgeHover ? 60 : 18,
                          repeat: badgeHover ? 0 : Infinity,
                          ease: "linear",
                        }
                  }
                >
                  <svg
                    viewBox="0 0 132 132"
                    className="size-full"
                    aria-hidden
                  >
                    <path
                      id="cta-badge-path"
                      d="M 66,66 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
                      fill="none"
                    />
                    <text
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="600"
                      letterSpacing="2.4"
                      textLength="318"
                      lengthAdjust="spacingAndGlyphs"
                    >
                      <textPath href="#cta-badge-path">
                        BOOK A CONSULTANT • BOOK A CONSULTANT •
                      </textPath>
                    </text>
                  </svg>
                </m.span>
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 grid size-[40px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-[#4A28B0] md:size-[52px]"
                >
                  <CalendarCheck
                    aria-hidden
                    className="size-5 text-white md:size-6"
                  />
                </span>
              </Link>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
