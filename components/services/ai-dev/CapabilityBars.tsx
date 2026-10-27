"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion, type Transition } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Target } from "lucide-react";
import { aiDev, type AiDevCapabilityBar } from "@/lib/content/services/aiDev";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

/* Uneven bar heights (percent) when the pointer is outside the row. */
const COLLAPSED_HEIGHTS = [100, 100, 100, 75, 100];

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 30 };
const AUTOPLAY_MS = 6500;

const activeLayer =
  "radial-gradient(70% 55% at 100% 100%, var(--cap-glow) 0%, rgba(140,120,255,0) 70%), linear-gradient(160deg, var(--cap-active-1) 0%, var(--cap-active-2) 45%, var(--cap-active-3) 100%)";

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
    <m.div
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
    </m.div>
  );
}

export default function CapabilityBars() {
  const { bars, chipLabel, defaultActive } = aiDev.capabilities;
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
    <m.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={reduced ? { duration: 0.15 } : SPRING}
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: activeLayer }}
    />
  );

  const renderContent = (bar: AiDevCapabilityBar, open: boolean, desktop: boolean) => (
    <div
      id={`cap-content-${bar.id}`}
      role="region"
      aria-labelledby={`cap-title-${bar.id}`}
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
            desktop ? "mt-3 text-sm xl:mt-4 xl:text-base" : "mt-1 text-[15px]"
          )}
        >
          {bar.description}
        </p>
      </Stagger>

      <Stagger
        index={1}
        open={open}
        reduced={reduced}
        className={cn("flex flex-wrap items-center gap-3", desktop ? "mt-4 xl:mt-5" : "mt-5")}
      >
        <span className={cn("font-medium text-white/90", desktop ? "text-sm xl:text-[15px]" : "text-[15px]")}>
          {chipLabel}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.12] text-white",
            desktop ? "px-3 py-1.5 text-[13px] xl:px-4 xl:py-2 xl:text-[14px]" : "px-4 py-2 text-[14px]"
          )}
        >
          <Target size={16} aria-hidden="true" className="shrink-0 text-[#B9A8FF]" />
          {bar.bestFor}
        </span>
      </Stagger>

      <Stagger index={2} open={open} reduced={reduced}>
        <ul className={desktop ? "mt-4 space-y-2 xl:mt-6 xl:space-y-3" : "mt-6 space-y-3"}>
          {bar.points.map((point) => (
            <li
              key={point}
              className={cn(
                "flex items-start gap-3 text-white/90",
                desktop ? "text-sm xl:text-base" : "text-[15px]"
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
      className="relative mt-12 flex h-[480px] items-end gap-2.5 md:mt-16 xl:h-[525px]"
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
          <m.div
            key={bar.id}
            data-cap-bar=""
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
            className="cap-bar relative min-w-0 overflow-hidden rounded-[24px] border backdrop-blur-sm"
          >
            {activeBackground(open)}

            <div className="relative flex h-full flex-col p-6 xl:p-8 min-[1440px]:p-10">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                aria-expanded={open}
                aria-controls={`cap-content-${bar.id}`}
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
                  id={`cap-title-${bar.id}`}
                  className="line-clamp-2 text-xl font-normal leading-snug text-white xl:text-2xl min-[1440px]:text-[28px]"
                >
                  {bar.title}
                </h3>
              </button>

              {renderContent(bar, open, true)}
            </div>
          </m.div>
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
          <m.div
            key={bar.id}
            data-cap-bar=""
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
            className="cap-bar relative overflow-hidden rounded-[24px] border"
          >
            {activeBackground(open)}

            <button
              type="button"
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-expanded={open}
              aria-controls={`cap-content-${bar.id}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="relative z-10 flex min-h-[76px] w-full items-center justify-between gap-3 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              <h3 id={`cap-title-${bar.id}`} className="text-xl font-normal leading-snug text-white">
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
          </m.div>
        );
      })}
    </div>
  );

  return <div ref={wrapRef}>{isDesktop ? renderBars() : renderAccordion()}</div>;
}
