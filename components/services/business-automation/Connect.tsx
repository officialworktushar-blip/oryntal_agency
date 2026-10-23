"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ChevronDown } from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import { useCollapsedRows } from "./hooks/useCollapsedRows";
import ToolTile from "./ToolTile";

const FALLBACK_MAX_HEIGHT = "calc(3 * 62px + 2 * 12px + 6px)";

export default function Connect() {
  const reduced = useReducedMotion() ?? false;
  const { connect } = businessAutomation;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const [phase, setPhase] = useState<"base" | "out" | "in">("base");
  const [tilesEntered, setTilesEntered] = useState(false);
  const [tilesAnimating, setTilesAnimating] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const expandedRef = useRef(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 0 });
  const [heightAuto, setHeightAuto] = useState(false);
  const [pulseOn, setPulseOn] = useState(false);
  const [revealFrom, setRevealFrom] = useState<number | null>(null);

  const {
    gridRef,
    expanded,
    setExpanded,
    collapsedHeight,
    fullHeight,
    visibleCount,
    hasMore,
  } = useCollapsedRows({ collapsedRows: connect.collapsedRows });

  const totalCount = connect.tools.length;
  const pulseVisible = expanded ? totalCount : visibleCount;
  const running = inView && pageVisible && !reduced;

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useLayoutEffect(() => {
    if (reduced) {
      setPhase("in");
      return;
    }
    // Content is visible on first paint; this entrance is an enhancement with
    // a hard stop so nothing can stay hidden.
    setPhase("out");
    const timer = window.setTimeout(() => setPhase("in"), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (inView) setPhase("in");
  }, [inView]);

  useEffect(() => {
    if (inView && phase === "in") setTilesEntered(true);
  }, [inView, phase]);

  useEffect(() => {
    if (!tilesEntered || reduced) return;
    setTilesAnimating(true);
    const timer = window.setTimeout(() => setTilesAnimating(false), 1600);
    return () => window.clearTimeout(timer);
  }, [tilesEntered, reduced]);

  useEffect(() => {
    if (!running) {
      setPulseOn(false);
      return;
    }

    let onTimer = 0;
    let offTimer = 0;

    const trigger = () => {
      setPulseOn(false);
      onTimer = window.setTimeout(() => {
        setPulseOn(true);
        offTimer = window.setTimeout(
          () => setPulseOn(false),
          900 + 90 * Math.max(1, pulseVisible),
        );
      }, 20);
    };

    const first = window.setTimeout(trigger, 1200);
    const interval = window.setInterval(trigger, 5000);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(onTimer);
      window.clearTimeout(offTimer);
      window.clearInterval(interval);
      setPulseOn(false);
    };
  }, [running, pulseVisible]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleToggle = () => {
    if (expanded) {
      expandedRef.current = false;
      setHeightAuto(false);
      setExpanded(false);
      const panel = panelRef.current;
      if (panel && panel.getBoundingClientRect().top < 0) {
        panel.scrollIntoView({
          block: "start",
          behavior: reduced ? "auto" : "smooth",
        });
      }
      return;
    }

    expandedRef.current = true;
    setRevealFrom(visibleCount);
    setExpanded(true);
    window.setTimeout(() => setRevealFrom(null), 1200);
  };

  const revealAttr = phase === "base" ? {} : { "data-reveal": phase };
  const revealStyle = (delay: number, y = 24, duration = 700): CSSProperties =>
    ({
      "--ba-reveal-y": `${y}px`,
      "--ba-reveal-delay": `${delay}ms`,
      "--ba-reveal-dur": `${duration}ms`,
    }) as CSSProperties;

  const hiddenCount = Math.max(0, totalCount - visibleCount);
  const shownCount = expanded || !hasMore ? totalCount : visibleCount;
  const targetHeight = heightAuto
    ? "auto"
    : expanded
    ? fullHeight || "auto"
    : collapsedHeight ?? "auto";

  return (
    <section
      ref={sectionRef}
      id="connect"
      aria-labelledby="connect-title"
      className="ba-tools-bg relative overflow-hidden scroll-mt-24 py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <span
            {...revealAttr}
            style={revealStyle(0)}
            className="ba-reveal inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm"
          >
            {connect.pill}
          </span>
          <h2
            id="connect-title"
            {...revealAttr}
            style={revealStyle(80)}
            className="ba-reveal mx-auto mt-5 max-w-4xl text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] md:text-5xl lg:text-[58px]"
          >
            <span className="block text-white">{connect.headingLine1}</span>
            <span className="block text-gradient-brand">{connect.headingLine2}</span>
          </h2>
          <p
            {...revealAttr}
            style={revealStyle(160)}
            className="ba-reveal mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg"
          >
            {connect.sub}
          </p>
        </div>

        <div
          ref={panelRef}
          {...revealAttr}
          style={revealStyle(240, 30, 600)}
          className="ba-reveal relative mt-12 scroll-mt-24 overflow-hidden rounded-[28px] border border-white/8 bg-[#1D1838] p-5 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:p-8 md:mt-16 lg:p-12"
          onPointerMove={onMove}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={
              {
                "--mx": `${spotlight.x}%`,
                "--my": `${spotlight.y}%`,
                background: reduced
                  ? "none"
                  : "radial-gradient(260px circle at var(--mx) var(--my), rgba(155,149,255,.14), transparent 70%)",
              } as CSSProperties
            }
          />

          <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="ba-status-dot inline-block h-2 w-2 rounded-full bg-[#2EC27E]" />
              <span>{connect.panelLabel}</span>
            </div>
            <div className="text-sm text-white/60" aria-live="polite">
              Showing {shownCount} of {totalCount}
            </div>
          </div>

          <div className="relative z-10">
            <m.div
              className="relative overflow-hidden"
              initial={false}
              animate={{ height: targetHeight }}
              transition={
                reduced
                  ? { duration: 0.15, ease: "easeOut" }
                  : { type: "spring", stiffness: 180, damping: 28 }
              }
              style={{
                maxHeight:
                  collapsedHeight === null && !expanded ? FALLBACK_MAX_HEIGHT : "none",
              }}
              onAnimationComplete={() => {
                if (expandedRef.current) setHeightAuto(true);
              }}
            >
              <ul
                ref={gridRef}
                id="tools-grid"
                role="list"
                className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {connect.tools.map((tool, index) => (
                  <ToolTile
                    key={tool.id}
                    tool={tool}
                    index={index}
                    animate={tilesAnimating && !reduced}
                    pulse={pulseOn && index < pulseVisible}
                    reveal={revealFrom !== null && index >= revealFrom}
                  />
                ))}
              </ul>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(29,24,56,0) 0%, #1D1838 85%)",
                  opacity: hasMore && !expanded ? 1 : 0,
                }}
              />
            </m.div>

            {hasMore ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-expanded={expanded}
                  aria-controls="tools-grid"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {expanded ? connect.showLess : `${connect.showMore} (+${hiddenCount})`}
                  <ChevronDown
                    className={`size-[18px] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-white/80">{connect.askLine}</p>
              <a
                href={connect.askCta.href}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-auto"
              >
                {connect.askCta.label}
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/50">
          {connect.note}
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: connect.tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name,
            })),
          }),
        }}
      />
      <p className="sr-only">
        ORYNTAL connects tools such as {connect.tools.map((tool) => tool.name).join(", ")}{" "}
        as part of the Business Automation Package, subject to the agreed scope.
      </p>
    </section>
  );
}
