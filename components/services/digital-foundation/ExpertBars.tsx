"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  m,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  digitalFoundation,
  type ExpertBar,
  type ExpertMock,
} from "@/lib/content/packages/digitalFoundation";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";
import PromptMock from "./expert-mocks/PromptMock";
import LeadCardsMock from "./expert-mocks/LeadCardsMock";
import ChannelsMock from "./expert-mocks/ChannelsMock";
import FlowMock from "./expert-mocks/FlowMock";
import ChecklistMock from "./expert-mocks/ChecklistMock";

/* Uneven bar heights (percent) when the pointer is outside the row. */
const COLLAPSED_HEIGHTS = [100, 50, 100, 77, 100];

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 30 };

const DESIGN_W = 440;
const DESIGN_H = 200;

const MOCKS: Record<ExpertMock, ComponentType> = {
  prompt: PromptMock,
  leads: LeadCardsMock,
  channels: ChannelsMock,
  flow: FlowMock,
  checklist: ChecklistMock,
};

const activeGradient =
  "linear-gradient(160deg, var(--dfe-active-1) 0%, var(--dfe-active-2) 50%, var(--dfe-active-3) 100%), linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0) 70%)";

function useElementWidth<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!active || !element) return;

    const update = () => setWidth(element.getBoundingClientRect().width);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [active]);

  return { ref, width };
}

export default function ExpertBars() {
  const { bars } = digitalFoundation.experts;
  const count = bars.length;

  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const revealRef = useRef<HTMLDivElement>(null);
  const inView = useInView(revealRef, { amount: 0.35 });
  const revealed = useInView(revealRef, { once: true, margin: "-10% 0px" });

  const row = useElementWidth<HTMLDivElement>(isDesktop);
  const stack = useElementWidth<HTMLDivElement>(!isDesktop);

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Idle autoplay: desktop, in view, page visible and no pointer/focus inside. */
  useEffect(() => {
    if (
      reduced ||
      engaged ||
      !isDesktop ||
      !inView ||
      !pageVisible ||
      count === 0
    ) {
      return;
    }
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      6500,
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
    [cancelHover],
  );

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setEngaged(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
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

  const activeBarWidth =
    row.width > 0 ? ((row.width - 40) * 2.32) / (2.32 + 4) : 0;
  const desktopScale =
    activeBarWidth > 0 ? Math.min(1, (activeBarWidth - 80) / DESIGN_W) : 0;
  const mobileScale =
    stack.width > 0
      ? Math.min(1, (stack.width - 48) / DESIGN_W)
      : 0;

  const Mock = (bar: ExpertBar) => MOCKS[bar.mock];

  const backgroundLayer = (isOpen: boolean) => (
    <m.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={reduced ? { duration: 0.15 } : SPRING}
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: activeGradient }}
    />
  );

  const revealMotion = () =>
    reduced
      ? {
          opacity: revealed ? 1 : 0,
          y: 0,
        }
      : {
          opacity: revealed ? 1 : 0,
          y: revealed ? 0 : 40,
        };

  const revealTransition = (index: number) =>
    reduced
      ? { opacity: { duration: 0.15, delay: index * 0.02 } }
      : {
          opacity: { duration: 0.6, delay: index * 0.08, ease: "easeOut" as const },
          y: { duration: 0.6, delay: index * 0.08, ease: "easeOut" as const },
        };

  const renderBars = () => (
    <div
      ref={row.ref}
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
        const isOpen = index === active;
        const collapsed = COLLAPSED_HEIGHTS[index] ?? 100;
        const BarMock = Mock(bar);

        return (
          <m.div
            key={bar.id}
            initial={false}
            animate={{
              flexGrow: isOpen ? 2.32 : 1,
              height: isOpen || engaged ? "100%" : `${collapsed}%`,
              backgroundColor: isOpen
                ? "#7461F5"
                : "#0F0F11",
              borderColor: isOpen
                ? "rgba(255,255,255,0)"
                : "rgba(255,255,255,0.04)",
              ...revealMotion(),
            }}
            transition={
              reduced
                ? {
                    flexGrow: { duration: 0 },
                    height: { duration: 0 },
                    backgroundColor: { duration: 0.15 },
                    borderColor: { duration: 0.15 },
                    ...revealTransition(index),
                  }
                : {
                    ...SPRING,
                    ...revealTransition(index),
                  }
            }
            style={{ flexBasis: 0 }}
            onPointerEnter={() => scheduleHover(index)}
            onPointerLeave={cancelHover}
            className="relative min-w-0 overflow-hidden rounded-[24px] border"
          >
            {backgroundLayer(isOpen)}

            <div className="relative flex h-full flex-col p-8 lg:p-10">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                aria-expanded={isOpen}
                aria-controls={`expert-content-${bar.id}`}
                aria-labelledby={`expert-title-${bar.id}`}
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
                  id={`expert-title-${bar.id}`}
                  className="line-clamp-2 text-2xl font-normal tracking-tight text-white lg:text-[28px]"
                >
                  {bar.title}
                </h3>
              </button>

              <div
                id={`expert-content-${bar.id}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={cn(
                  "relative z-10 transition-opacity",
                  reduced ? "duration-150" : "duration-300",
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <m.p
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 8 }}
                  transition={{
                    duration: reduced ? 0.15 : 0.28,
                    delay: reduced ? 0 : 0.06,
                    ease: "easeOut",
                  }}
                  className="mt-4 max-w-lg text-base text-white/80 lg:text-lg"
                >
                  {bar.description}
                </m.p>

                <m.div
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 8 }}
                  transition={{
                    duration: reduced ? 0.15 : 0.28,
                    delay: reduced ? 0 : 0.12,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={bar.href}
                    className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/60 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#7461F5]"
                  >
                    {bar.linkLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </m.div>
              </div>

              {isOpen && revealed && (
                <m.div
                  aria-hidden="true"
                  initial={
                    reduced ? false : { opacity: 0, y: 16, scale: desktopScale }
                  }
                  animate={{ opacity: 1, y: 0, scale: desktopScale }}
                  transition={{
                    opacity: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.12 },
                    y: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.12 },
                    scale: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="pointer-events-none absolute bottom-9 left-10 origin-bottom-left"
                  style={{ width: DESIGN_W, height: DESIGN_H }}
                >
                  <BarMock />
                </m.div>
              )}
            </div>
          </m.div>
        );
      })}
    </div>
  );

  const renderAccordion = () => (
    <div
      ref={stack.ref}
      className="mt-10 flex flex-col gap-3"
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={handleBlur}
    >
      {bars.map((bar, index) => {
        const isOpen = index === active;
        const BarMock = Mock(bar);

        return (
          <m.div
            key={bar.id}
            initial={false}
            animate={{
              height: isOpen ? "auto" : 76,
              backgroundColor: isOpen
                ? "#7461F5"
                : "#0F0F11",
              borderColor: isOpen
                ? "rgba(255,255,255,0)"
                : "rgba(255,255,255,0.04)",
              ...revealMotion(),
            }}
            transition={
              reduced
                ? {
                    height: { duration: 0 },
                    backgroundColor: { duration: 0.15 },
                    borderColor: { duration: 0.15 },
                    ...revealTransition(index),
                  }
                : {
                    ...SPRING,
                    ...revealTransition(index),
                  }
            }
            className="relative overflow-hidden rounded-[24px] border"
          >
            {backgroundLayer(isOpen)}

            <button
              type="button"
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-expanded={isOpen}
              aria-controls={`expert-content-${bar.id}`}
              aria-labelledby={`expert-title-${bar.id}`}
              onClick={() => setActive(index)}
              onFocus={() => {
                setEngaged(true);
                setActive(index);
              }}
              className="relative z-10 flex min-h-[76px] w-full items-center justify-between gap-3 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
            >
              <h3
                id={`expert-title-${bar.id}`}
                className="text-xl font-normal tracking-tight text-white"
              >
                {bar.title}
              </h3>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-5 shrink-0 text-white/70 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              id={`expert-content-${bar.id}`}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn(
                "relative z-10 px-5 pb-5 transition-opacity",
                reduced ? "duration-150" : "duration-300",
                isOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <p className="text-base text-white/80">{bar.description}</p>

              <Link
                href={bar.href}
                className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/60 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#7461F5]"
              >
                {bar.linkLabel}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {isOpen && revealed && (
                <div
                  className="relative mt-4"
                  style={{ height: DESIGN_H * mobileScale }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 origin-top-left"
                    style={{
                      width: DESIGN_W,
                      height: DESIGN_H,
                      transform: `scale(${mobileScale})`,
                    }}
                  >
                    <BarMock />
                  </div>
                </div>
              )}
            </div>
          </m.div>
        );
      })}
    </div>
  );

  return (
    <div ref={revealRef}>
      {isDesktop ? renderBars() : renderAccordion()}
    </div>
  );
}
