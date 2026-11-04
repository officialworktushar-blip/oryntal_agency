"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Target, ShieldCheck } from "lucide-react";
import { engagementEvaluate, type EngagementEvaluateBar } from "@/lib/content/services/engagement";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

/* Uneven bar heights (percent) when the pointer is outside the row. */
const COLLAPSED_HEIGHTS = [100, 100, 100, 75, 100];

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 30 };
const AUTOPLAY_MS = 6500;

const activeLayer =
  "radial-gradient(70% 55% at 100% 100%, rgba(140,120,255,.85) 0%, rgba(140,120,255,0) 70%), linear-gradient(160deg, #2A1B66 0%, #3A24A0 45%, #5B3FD8 100%)";

function Stagger({
  index,
  open,
  reduced,
  className,
  children,
}: {
  index: number;
  open: boolean;
  reduced: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0, y: open || reduced ? 0 : 8 }}
      transition={{
        duration: reduced ? 0.15 : 0.28,
        delay: reduced || !open ? 0 : 0.06 * (index + 1),
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EvaluateBars() {
  const { bars, chipLabel, defaultActive, heading, sub, closing, footnote, srSummary } = engagementEvaluate;
  const count = bars.length;

  const [active, setActive] = useState(defaultActive);
  const [engaged, setEngaged] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35 });

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Entrance is an enhancement: only armed when JS runs and the row starts below the fold. */
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || reduced) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setArmed(false);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  /* Idle autoplay: desktop, in view, page visible and no pointer/focus inside. */
  useEffect(() => {
    if (reduced || engaged || !isDesktop || !inView || !pageVisible || count === 0) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(timer);
  }, [reduced, engaged, isDesktop, inView, pageVisible, count]);

  const cancelHover = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  useEffect(() => cancelHover, [cancelHover]);

  /* 80ms hover intent so sweeping across the row does not flicker. */
  const scheduleHover = useCallback(
    (index: number) => {
      cancelHover();
      hoverTimer.current = setTimeout(() => setActive(index), 80);
    },
    [cancelHover]
  );

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setEngaged(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    buttonRefs.current[next]?.focus();
  };

  const entrance = (index: number) => ({
    animate: { opacity: armed ? 0 : 1, y: armed ? 40 : 0 },
    transition: reduced
      ? { opacity: { duration: 0.15 }, y: { duration: 0 } }
      : {
          opacity: { duration: 0.6, delay: index * 0.08, ease: "easeOut" as const },
          y: { duration: 0.6, delay: index * 0.08, ease: "easeOut" as const },
        },
  });

  const activeBackground = (open: boolean) => (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={reduced ? { duration: 0.15 } : SPRING}
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: activeLayer }}
    />
  );

  const renderContent = (bar: EngagementEvaluateBar, open: boolean, desktop: boolean) => (
    <div
      id={`eval-content-${bar.id}`}
      role="region"
      aria-labelledby={`eval-title-${bar.id}`}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "relative z-10 transition-opacity",
        reduced ? "duration-150" : "duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0",
        desktop ? "max-w-xl" : "px-5 pb-6"
      )}
    >
      <Stagger index={0} open={open} reduced={reduced}>
        <p
          className={cn(
            "leading-relaxed text-white/80",
            desktop ? "mt-4 text-base" : "mt-1 text-[15px]"
          )}
        >
          {bar.description}
        </p>
      </Stagger>

      <Stagger
        index={1}
        open={open}
        reduced={reduced}
        className={cn("flex flex-wrap items-center gap-3", desktop ? "mt-5" : "mt-5")}
      >
        <span className={cn("font-medium text-white/90", desktop ? "text-[15px]" : "text-[15px]")}>
          {chipLabel}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.12] text-white",
            desktop ? "px-4 py-2 text-[14px]" : "px-4 py-2 text-[14px]"
          )}
        >
          <Target size={16} aria-hidden="true" className="shrink-0 text-[#B9A8FF]" />
          {bar.bestFor}
        </span>
      </Stagger>

      <Stagger index={2} open={open} reduced={reduced}>
        <ul className={desktop ? "mt-6 space-y-3" : "mt-6 space-y-3"}>
          {bar.points.map((point) => (
            <li
              key={point}
              className={cn(
                "flex items-start gap-3 text-white/90",
                desktop ? "text-base" : "text-[15px]"
              )}
            >
              <Check
                size={18}
                strokeWidth={2.5}
                aria-hidden="true"
                className="mt-[3px] shrink-0 text-[#2EC27E]"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Stagger>

      <Stagger index={3} open={open} reduced={reduced}>
        <Link
          href={bar.href}
          className="group/link mt-7 inline-flex items-center gap-1.5 rounded-sm font-semibold text-white underline decoration-white/60 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A24A0]"
        >
          {bar.linkLabel}
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </Stagger>
    </div>
  );

  const renderBars = () => (
    <div
      className="relative mt-12 flex h-[500px] items-end gap-2.5 md:mt-16 xl:h-[525px]"
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => {
        cancelHover();
        setEngaged(false);
      }}
      onFocus={() => setEngaged(true)}
      onBlur={handleBlur}
    >
      {bars.map((bar, index) => {
        const open = index === active;
        const collapsed = COLLAPSED_HEIGHTS[index] ?? 100;
        const enter = entrance(index);

        return (
          <motion.div
            key={bar.id}
            data-eval-bar=""
            initial={false}
            animate={{
              flexGrow: open ? 2.32 : 1,
              height: open || engaged ? "100%" : `${collapsed}%`,
              borderColor: open ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
              ...enter.animate,
            }}
            transition={
              reduced
                ? {
                    flexGrow: { duration: 0 },
                    height: { duration: 0 },
                    borderColor: { duration: 0.15 },
                    ...enter.transition,
                  }
                : { ...SPRING, ...enter.transition }
            }
            style={{ flexBasis: 0 }}
            onPointerEnter={() => scheduleHover(index)}
            onPointerLeave={cancelHover}
            className="eval-bar relative min-w-0 overflow-hidden rounded-[24px] border backdrop-blur-sm"
          >
            {activeBackground(open)}

            <div className="relative flex h-full flex-col p-6 lg:p-10">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                aria-expanded={open}
                aria-controls={`eval-content-${bar.id}`}
                onClick={() => {
                  cancelHover();
                  setActive(index);
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onFocus={() => {
                  setEngaged(true);
                  setActive(index);
                }}
                className="block w-full rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
              >
                <h3
                  id={`eval-title-${bar.id}`}
                  className="line-clamp-2 text-2xl font-normal leading-snug text-white lg:text-[28px]"
                >
                  {bar.title}
                </h3>
              </button>

              {renderContent(bar, open, true)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderAccordion = () => (
    <div className="mt-10 flex flex-col gap-3 md:mt-12">
      {bars.map((bar, index) => {
        const open = index === active;
        const enter = entrance(index);

        return (
          <motion.div
            key={bar.id}
            data-eval-bar=""
            initial={false}
            animate={{
              height: open ? "auto" : 76,
              borderColor: open ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
              ...enter.animate,
            }}
            transition={
              reduced
                ? { height: { duration: 0 }, borderColor: { duration: 0.15 }, ...enter.transition }
                : { ...SPRING, ...enter.transition }
            }
            className="eval-bar relative overflow-hidden rounded-[24px] border"
          >
            {activeBackground(open)}

            <button
              type="button"
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-expanded={open}
              aria-controls={`eval-content-${bar.id}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="relative z-10 flex min-h-[76px] w-full items-center justify-between gap-3 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              <h3 id={`eval-title-${bar.id}`} className="text-xl font-normal leading-snug text-white">
                {bar.title}
              </h3>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-5 shrink-0 text-white/70 transition-transform duration-300",
                  open && "rotate-180"
                )}
              />
            </button>

            {renderContent(bar, open, false)}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={wrapRef}
      id="evaluate"
      aria-labelledby="eng-eval-title"
      className="relative overflow-hidden scroll-mt-24 text-white py-20 md:py-28"
      style={{
        background: "radial-gradient(55% 45% at 100% 100%, rgba(91,52,214,0.62) 0%, rgba(91,52,214,0) 72%), radial-gradient(60% 50% at 20% 105%, rgba(60,34,150,0.55) 0%, rgba(60,34,150,0) 72%), radial-gradient(50% 35% at 50% 100%, rgba(99,61,230,0.30) 0%, rgba(99,61,230,0) 70%), linear-gradient(180deg, #0B0B0D 0%, #0A0716 34%, #190F45 74%, #2B1A7A 100%)",
      }}
    >
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <motion.h2
          id="eng-eval-title"
          initial={reduced ? false : { y: 16, opacity: 0.6 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-balance text-4xl font-normal tracking-[-0.03em] leading-[1.1] text-white md:text-5xl lg:text-[54px]"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={reduced ? false : { y: 16, opacity: 0.6 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 mx-auto max-w-2xl text-base text-white/70 md:text-lg"
        >
          {sub}
        </motion.p>

        {isDesktop ? (
          <div className="hidden lg:flex">{renderBars()}</div>
        ) : (
          <div className="lg:hidden" aria-hidden="true">
            {renderAccordion()}
          </div>
        )}
        {isDesktop ? (
          <div className="lg:hidden" aria-hidden="true">
            {renderAccordion()}
          </div>
        ) : (
          <div className="hidden lg:flex">{renderBars()}</div>
        )}

        <motion.div
          initial={reduced ? false : { y: 16, opacity: 0.6 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-12 text-center md:mt-16"
        >
          <p className="mx-auto max-w-2xl text-lg text-white/80">{closing.text}</p>
          <Link
            href={closing.cta.href}
            className="mt-6 inline-flex h-[64px] items-center justify-center rounded-2xl bg-white px-10 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B1A7A]"
          >
            {closing.cta.label}
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/75">
            <ShieldCheck className="size-4" aria-hidden="true" />
            <span>{closing.trust}</span>
          </div>
          <p className="mt-6 mx-auto max-w-3xl text-xs text-white/45">{footnote}</p>
        </motion.div>

        <p className="sr-only">{srSummary}</p>
      </div>
    </section>
  );
}
