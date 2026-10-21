"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Settings, Workflow } from "lucide-react";
import { SiFacebook, SiGoogle, SiInstagram, SiWhatsapp } from "react-icons/si";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";
import MiniVisual, { type VisualId } from "./IncludedVisuals";
import Rocks from "./Rocks";

const LOGO = "/oryntal-logo.png";
const AUTOPLAY_MS = 5200;
const MANUAL_PAUSE_MS = 12000;

/** Connector routes between the floating card and the integration columns, in design pixels. */
const CONNECTORS = [
  {
    id: "col-a",
    d: "M 942.4 303.6 H 985.2 Q 995.2 303.6 995.2 293.6 V 251.4 Q 995.2 241.4 1005.2 241.4 H 1029.2",
  },
  {
    id: "col-b",
    d: "M 942.4 316 H 1115 Q 1125 316 1125 306 V 277.8 Q 1125 267.8 1134.6 267.8",
  },
];

/** Monochrome integration tiles, positioned in the 1240×660 design box. */
const DESKTOP_TILES = [
  { id: "logo", col: "A", y: 16 },
  { id: "google", col: "A", y: 30 },
  { id: "whatsapp", col: "B", y: 8 },
  { id: "instagram", col: "B", y: 21 },
  { id: "facebook", col: "B", y: 34 },
];

const COLUMN_X: Record<string, number> = { A: 86.5, B: 95 };

const TILE_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  google: SiGoogle,
  whatsapp: SiWhatsapp,
  instagram: SiInstagram,
  facebook: SiFacebook,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function TileGlyph({ id }: { id: string }) {
  if (id === "logo") {
    return (
      <Image
        src={LOGO}
        alt="ORYNTAL"
        width={40}
        height={40}
        className="h-[52%] w-auto object-contain"
        style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
      />
    );
  }

  const Icon = TILE_ICONS[id];
  if (!Icon) return null;

  return (
    <Icon
      className="h-[44%] w-[44%]"
      style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
    />
  );
}

function Tile({ id, style }: { id: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className="grid place-items-center rounded-[24%] border border-white/10 bg-gradient-to-b from-[#39424E] to-[#171C24] shadow-[0_18px_38px_rgba(0,0,0,0.5)]"
    >
      <TileGlyph id={id} />
    </div>
  );
}

export default function IncludedStage() {
  const reduced = useReducedMotion() ?? false;
  const { included } = digitalFoundation;
  const items = included.items;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [docVisible, setDocVisible] = useState(true);
  const [pointerFine, setPointerFine] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pauseTimer = useRef<number | null>(null);

  const inView = useInView(stageRef, { amount: 0.35 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const zoom = useTransform(scrollYProgress, [0, 0.45, 1], [0.972, 1, 1.006]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [2.5, -2.5]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
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

  useEffect(() => {
    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  const select = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setPaused(false), MANUAL_PAUSE_MS);
  }, []);

  /* Autoplay — only while the stage is on screen, the tab is visible and nobody is interacting. */
  useEffect(() => {
    if (reduced || paused || interacting || !inView || !docVisible) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [active, docVisible, inView, interacting, items.length, paused, reduced]);

  /* Keep the active tab visible in the mobile strip. */
  useEffect(() => {
    if (isDesktop) return;
    const el = tabRefs.current[active];
    if (!el) return;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active, isDesktop, reduced]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const count = items.length;
    let next = -1;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;

    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointerFine || reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    setInteracting(false);
    px.set(0);
    py.set(0);
  }

  const tiltOn = pointerFine && !reduced && isDesktop;

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label="Interactive overview of what's included in the Digital Foundation Package"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={onPointerLeave}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onPointerMove={onPointerMove}
      className="relative mt-14 w-full md:mt-20"
      style={{ perspective: 1600 }}
    >
      <div className="relative md:aspect-[1240/700] lg:aspect-[1240/660]">
        <m.div
          style={{
            ...(tiltOn ? { rotateX, rotateY } : {}),
            ...(isDesktop && !reduced ? { scale: zoom } : {}),
          }}
          className="relative flex flex-col gap-6 md:absolute md:inset-x-0 md:top-0 md:block md:h-[94.2857%] lg:h-full"
        >
          <Rocks
            rocks={included.rocks}
            progress={scrollYProgress}
            reduced={reduced}
          />

          {/* Connectors from the website card to the integration columns */}
          <svg
            className="pointer-events-none absolute inset-0 z-[25] hidden h-full w-full md:block"
            viewBox="0 0 1240 660"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {CONNECTORS.map((c, i) => (
              <g key={c.id}>
                <m.path
                  d={c.d}
                  fill="none"
                  stroke="rgba(155,149,255,0.32)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    duration: reduced ? 0.2 : 1.1,
                    delay: reduced ? 0 : 0.35 + i * 0.15,
                    ease: "easeInOut",
                  }}
                />
                {!reduced ? (
                  <path
                    className="dfi-flow"
                    d={c.d}
                    fill="none"
                    stroke="#C4BFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{ animationDelay: `${i * 1.4}s` }}
                  />
                ) : null}
              </g>
            ))}
          </svg>

          {/* The dashboard window */}
          <div className="relative z-20 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D131B]/95 shadow-[0_40px_90px_rgba(0,0,0,0.6)] backdrop-blur-sm md:absolute md:left-1/2 md:top-[6%] md:h-[76%] md:w-[58%] md:-translate-x-1/2">
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2">
              <span className="size-[7px] rounded-full bg-white/20" />
              <span className="size-[7px] rounded-full bg-white/20" />
              <span className="size-[7px] rounded-full bg-white/20" />
              <span className="mx-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/45">
                <Image
                  src={LOGO}
                  alt="ORYNTAL"
                  width={14}
                  height={14}
                  className="h-3 w-auto object-contain"
                  style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
                />
                yourbusiness.com
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              {/* Sidebar on desktop, scrolling strip on mobile */}
              <div className="flex shrink-0 flex-col border-b border-white/10 md:w-[150px] md:border-b-0 md:border-r lg:w-[170px]">
                <div
                  role="tablist"
                  aria-label="What the package includes"
                  onKeyDown={onKeyDown}
                  className="no-scrollbar flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible"
                >
                  {items.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = i === active;
                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          tabRefs.current[i] = el;
                        }}
                        id={`dfi-tab-${item.id}`}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        aria-controls={`dfi-panel-${item.id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => select(i)}
                        className={cn(
                          "relative flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors duration-200",
                          isActive ? "text-white" : "text-white/45 hover:text-white/75"
                        )}
                      >
                        {isActive ? (
                          <m.span
                            layoutId="dfiActive"
                            transition={{ type: "spring", stiffness: 340, damping: 34 }}
                            className="absolute inset-0 rounded-lg border border-white/12 bg-white/[0.07]"
                          />
                        ) : null}
                        <Icon
                          aria-hidden="true"
                          className="relative size-3.5 shrink-0"
                          strokeWidth={1.75}
                        />
                        <span className="relative whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Decorative only */}
                <div
                  aria-hidden="true"
                  className="hidden border-t border-white/10 p-2 md:block"
                >
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] text-white/25">
                    <Settings className="size-3.5" strokeWidth={1.75} />
                    Settings
                  </span>
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] text-white/25">
                    <Workflow className="size-3.5" strokeWidth={1.75} />
                    Integrations
                  </span>
                </div>
              </div>

              {/* Main area */}
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-3 md:p-4">
                <div className="flex shrink-0 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      Setup overview
                    </p>
                    <p className="truncate text-[13px] font-medium text-white/85">
                      {digitalFoundation.packageName}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1" aria-hidden="true">
                    {items.map((item, i) => (
                      <span
                        key={item.id}
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          i === active ? "w-5 bg-[#9B95FF]" : "w-2 bg-white/20"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {items.map((item, i) => (
                  <div
                    key={item.id}
                    id={`dfi-panel-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`dfi-tab-${item.id}`}
                    hidden={i !== active}
                    className="flex min-h-0 flex-1 flex-col gap-2.5"
                  >
                    <div className="shrink-0">
                      <h3 className="text-[15px] font-medium leading-snug text-white md:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-28 shrink-0 md:h-auto md:min-h-0 md:flex-1">
                      <MiniVisual
                        id={item.id as VisualId}
                        active={i === active}
                        reduced={reduced}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating website card */}
          <div className="relative z-30 mx-auto w-full max-w-[320px] rounded-2xl border border-white/10 bg-[#0D131B]/95 p-2.5 shadow-[0_36px_80px_rgba(0,0,0,0.65)] md:absolute md:left-[56%] md:top-[46%] md:mx-0 md:w-[20%] md:max-w-none">
            <div className="flex items-center gap-1.5 pb-2">
              <Image
                src={LOGO}
                alt="ORYNTAL"
                width={14}
                height={14}
                className="h-3.5 w-auto object-contain"
                style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
              />
              <span className="text-[10px] text-white/45">yourbusiness.com</span>
            </div>
            <MediaPlaceholder
              type="image"
              aspect="4/3"
              label="Website preview"
              dark
              className="p-0"
            />
          </div>

          {/* Monochrome integration tiles — desktop columns */}
          {DESKTOP_TILES.map((tile) => (
            <div
              key={tile.id}
              className="absolute z-30 hidden h-[13.1515%] w-[7%] md:block"
              style={{
                left: `${COLUMN_X[tile.col]}%`,
                top: `${tile.y}%`,
                transform: "translateX(-50%)",
              }}
            >
              <Tile id={tile.id} />
            </div>
          ))}

          {/* Monochrome integration tiles — mobile row */}
          <div className="flex items-center justify-center gap-3 md:hidden">
            {DESKTOP_TILES.map((tile) => (
              <div key={tile.id} className="h-11 w-11">
                <Tile id={tile.id} />
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  );
}
