"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  connectionCategories,
  digitalFoundation,
  type ConnectionFilter,
} from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";

/** How often the decorative pulse wave crosses the tiles. */
const PULSE_MS = 4000;
/** Offset between neighbouring tiles in the pulse wave. */
const PULSE_STAGGER = 0.09;

export default function Connections() {
  const reduced = useReducedMotion() ?? false;
  const { connections, primaryCta } = digitalFoundation;
  const items = connections.items;
  const [titleLead, titleTail] = connections.titleLines;

  const [filter, setFilter] = useState<ConnectionFilter>("All");
  const [cycle, setCycle] = useState(0);
  const [docVisible, setDocVisible] = useState(true);
  const [pointerFine, setPointerFine] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const entered = useInView(panelRef, { amount: 0.15, once: true });
  const onScreen = useInView(panelRef, { amount: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setPointerFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPointerFine(e.matches);
    mq.addEventListener("change", onChange);

    const onVisibility = () => setDocVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mq.removeEventListener("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /* The pulse wave only runs while the panel is on screen and the tab is visible. */
  useEffect(() => {
    if (reduced || !onScreen || !docVisible) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), PULSE_MS);
    return () => window.clearInterval(id);
  }, [reduced, onScreen, docVisible]);

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 24,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  function onChipKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    const count = connectionCategories.length;
    let next = -1;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (index + 1) % count;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (index - 1 + count) % count;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = count - 1;
    }

    if (next < 0) return;
    e.preventDefault();
    setFilter(connectionCategories[next]);
    chipRefs.current[next]?.focus();
  }

  function onPanelPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !pointerFine) return;
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.opacity = "1";
  }

  function onPanelPointerLeave() {
    const el = spotlightRef.current;
    if (el) el.style.opacity = "0";
  }

  const pulseOn = !reduced && cycle > 0 && onScreen && docVisible;

  return (
    <section
      id="connections"
      aria-labelledby="connections-title"
      className="df-connect-bg relative scroll-mt-24 overflow-hidden py-20 text-white md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <m.span
            {...reveal(0)}
            className="inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm text-white"
          >
            {connections.eyebrow}
          </m.span>

          <m.h2
            id="connections-title"
            className="mt-5 font-normal leading-[1.1] tracking-[-0.03em] text-4xl text-white md:text-5xl lg:text-[58px]"
          >
            <m.span {...reveal(0.08)} className="block text-[#9B95FF]">
              {titleLead}
            </m.span>
            <m.span {...reveal(0.16)} className="block text-white">
              {titleTail}
            </m.span>
          </m.h2>

          <m.p
            {...reveal(0.24)}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-white/75 md:text-lg"
          >
            {connections.intro}
          </m.p>
        </div>

        <p className="sr-only">
          ORYNTAL connects {items.map((item) => item.name).join(", ")} as part
          of the Digital Foundation Package, chosen to fit your business.
        </p>

        {/* Panel */}
        <m.div
          ref={panelRef}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 30 }}
          transition={{ duration: reduced ? 0.2 : 0.6, ease: "easeOut" }}
          onPointerMove={onPanelPointerMove}
          onPointerLeave={onPanelPointerLeave}
          className="relative mt-12 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#1D1838] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:mt-16 sm:p-8 lg:p-12"
        >
          {/* Pointer spotlight */}
          <div
            ref={spotlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: 0,
              background:
                "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(155,149,255,0.14), transparent 70%)",
            }}
          />

          <div className="relative">
            {/* Top row */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="relative flex size-2 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#2EC27E] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#2EC27E]" />
                </span>
                {connections.panelLabel}
              </span>

              <div
                role="radiogroup"
                aria-label="Filter connections"
                className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto"
              >
                {connectionCategories.map((category, i) => {
                  const isActive = filter === category;
                  return (
                    <button
                      key={category}
                      ref={(el) => {
                        chipRefs.current[i] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setFilter(category)}
                      onKeyDown={(e) => onChipKeyDown(e, i)}
                      className={cn(
                        "relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1838]",
                        isActive
                          ? "text-[#1D1E20]"
                          : "bg-white/[0.06] text-white/75 hover:bg-white/10"
                      )}
                    >
                      {isActive ? (
                        <m.span
                          layoutId="dfcChip"
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 340, damping: 34 }
                          }
                          className="absolute inset-0 rounded-full bg-white"
                        />
                      ) : null}
                      <span className="relative">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            <ul role="list" className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
              {items.map((item, index) => {
                const Icon = item.icon;
                const dimmed = filter !== "All" && item.category !== filter;
                const delay = reduced ? 0 : index * 0.03;

                return (
                  <m.li
                    key={item.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={
                      entered
                        ? reduced
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                        : reduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: 14 }
                    }
                    transition={{ duration: reduced ? 0.2 : 0.45, delay, ease: "easeOut" }}
                    className="group -m-2.5 rounded-2xl p-2.5 transition-colors duration-200 hover:bg-white/5"
                  >
                    <span
                      className="flex min-w-0 items-center gap-4 transition-opacity duration-300"
                      style={{ opacity: dimmed ? 0.22 : 1 }}
                    >
                      <m.span
                        className="relative block shrink-0"
                        initial={{ opacity: 0, scale: reduced ? 1 : 0.85 }}
                        animate={
                          entered
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: reduced ? 1 : 0.85 }
                        }
                        transition={{ duration: reduced ? 0.2 : 0.45, delay, ease: "easeOut" }}
                      >
                        <span
                          className={cn(
                            "relative grid size-11 place-items-center rounded-xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-[1.06] sm:size-[50px]",
                            dimmed && "grayscale"
                          )}
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-[22px] sm:size-[26px]"
                            style={{ color: item.color }}
                          />

                          {pulseOn ? (
                            <m.span
                              key={`pulse-${cycle}-${item.id}`}
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-xl"
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: [0, 0.85, 0], scale: [0.92, 1.18] }}
                              transition={{
                                duration: 0.9,
                                delay: index * PULSE_STAGGER,
                                ease: "easeOut",
                              }}
                              style={{ boxShadow: "0 0 0 6px rgba(155,149,255,0.35)" }}
                            />
                          ) : null}
                        </span>
                      </m.span>

                      <span className="min-w-0">
                        <span className="block break-words text-base font-medium leading-tight text-white md:text-[17px] lg:text-lg">
                          {item.name}
                        </span>
                        <span className="hidden text-[13px] text-white/55 sm:block">
                          {item.sub}
                        </span>
                      </span>
                    </span>
                  </m.li>
                );
              })}
            </ul>

            {/* Bottom row */}
            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-white/80 md:text-base">
                {connections.upsell.text}{" "}
                <Link
                  href={connections.upsell.href}
                  className="group inline-flex items-center gap-1 text-white underline underline-offset-4 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1838]"
                >
                  {connections.upsell.linkLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </p>

              <Link
                href={primaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1838] md:w-auto"
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>
        </m.div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/50">
          {connections.note}
        </p>
      </div>
    </section>
  );
}
