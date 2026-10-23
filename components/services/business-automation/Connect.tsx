"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import { useCollapsedRows } from "./hooks/useCollapsedRows";
import ToolTile from "./ToolTile";

export default function Connect() {
  const reduced = useReducedMotion() ?? false;
  const { connect } = businessAutomation;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const [phase, setPhase] = useState<"base" | "out" | "in">("base");
  const [pageVisible, setPageVisible] = useState(true);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 20 });
  const [pulse, setPulse] = useState(0);

  const {
    gridRef,
    expanded,
    toggle,
    collapsedHeight,
    fullHeight,
    visibleCount,
    totalCount,
    hasMore,
  } = useCollapsedRows({ collapsedRows: connect.collapsedRows, gapY: 12, extra: 6 });

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("in");
      return;
    }
    setPhase("out");
    const timer = window.setTimeout(() => setPhase("in"), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (inView) setPhase("in");
  }, [inView]);

  useEffect(() => {
    if (!inView || !pageVisible || reduced) return;
    const id = window.setInterval(() => setPulse((v) => v + 1), 5000);
    return () => window.clearInterval(id);
  }, [inView, pageVisible, reduced]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  const revealAttr = phase === "base" ? {} : { "data-reveal": phase };
  const revealStyle = (delay: number): CSSProperties =>
    ({
      "--ba-reveal-y": "24px",
      "--ba-reveal-delay": `${delay}ms`,
      "--ba-reveal-dur": "700ms",
    }) as CSSProperties;

  const hiddenCount = Math.max(0, totalCount - visibleCount);
  const panelCollapsed = !expanded && hasMore && collapsedHeight !== null;
  const wrapperHeight = expanded
    ? fullHeight || "auto"
    : collapsedHeight !== null
    ? collapsedHeight
    : "calc(3 * 62px + 2 * 12px + 6px)";

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
          style={revealStyle(240)}
          className="ba-reveal relative mt-12 overflow-hidden rounded-[28px] border border-white/8 bg-[#1D1838] p-5 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:p-8 md:mt-16 lg:p-12"
          onPointerMove={onMove}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: reduced
                ? "none"
                : `radial-gradient(260px circle at ${spotlight.x}% ${spotlight.y}%, rgba(155,149,255,.14), transparent 70%)`,
            }}
          />

          <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2EC27E] shadow-[0_0_0_6px_rgba(46,194,126,.12)]" />
              <span>{connect.panelLabel}</span>
            </div>
            <div className="text-sm text-white/60" aria-live="polite">
              Showing {expanded || !hasMore ? totalCount : visibleCount} of {totalCount}
            </div>
          </div>

          <div className="relative z-10">
            <div
              className="relative overflow-hidden"
              style={{
                height: wrapperHeight,
                transition: reduced ? "height 150ms ease" : undefined,
              }}
            >
              <m.ul
                ref={gridRef}
                id="tools-grid"
                role="list"
                className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                animate={
                  reduced
                    ? {}
                    : expanded
                    ? { height: fullHeight || "auto" }
                    : { height: collapsedHeight ?? "auto" }
                }
                transition={{ type: "spring", stiffness: 180, damping: 28 }}
                onAnimationComplete={() => {
                  if (expanded && gridRef.current) {
                    gridRef.current.style.height = "auto";
                  }
                }}
              >
                {connect.tools.map((tool, index) => (
                  <ToolTile
                    key={tool.id}
                    tool={tool}
                    index={index}
                    animate={phase === "in" && inView && !reduced}
                  />
                ))}
              </m.ul>

              {panelCollapsed ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background: "linear-gradient(to bottom, rgba(29,24,56,0) 0%, #1D1838 85%)",
                  }}
                />
              ) : null}
            </div>

            {hasMore ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={toggle}
                  aria-expanded={expanded}
                  aria-controls="tools-grid"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {expanded ? connect.showLess : `${connect.showMore} (+${hiddenCount})`}
                  <ChevronDown
                    className={`size-[18px] transition-transform ${expanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-white/80">{connect.askLine}</p>
              <a
                href={connect.askCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,255,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {connect.askCta.label}
              </a>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                pulse > 0 && inView && pageVisible && !reduced
                  ? "none"
                  : "none",
            }}
          />
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
        ORYNTAL connects tools such as {connect.tools.map((tool) => tool.name).join(", ")} as part of the Business Automation Package, subject to the agreed scope.
      </p>
    </section>
  );
}
