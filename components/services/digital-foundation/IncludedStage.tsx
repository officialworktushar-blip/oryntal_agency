"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Lock, Plug, Settings, ShieldCheck, Sparkles, UserCircle } from "lucide-react";
import { SiFacebook, SiGoogle, SiInstagram, SiWhatsapp } from "react-icons/si";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";
import MiniVisual, { type VisualId } from "./IncludedVisuals";
import Rocks from "./Rocks";

const LOGO = "/oryntal-logo.png";

const AUTOPLAY_MS = 5200;
const MANUAL_PAUSE_MS = 12000;

/** The stage is designed on a 1240 × 660 canvas; everything is a % of it. */
const DESIGN_W = 1240;
const DESIGN_H = 660;

/** Fixed width of the dashboard window's inner layout, scaled to fit. */
const CANVAS_W = 840;

/** Monochrome tile width, as a fraction of the stage width. */
const TILE_W = 0.076;

type Point = [number, number];

/** Round the corners of a polyline and return the dense outline plus its path. */
function makeRoute(corners: Point[], radius = 12) {
  const pts: Point[] = [];

  corners.forEach((corner, i) => {
    const prev = corners[i - 1];
    const next = corners[i + 1];
    if (!prev || !next) {
      pts.push(corner);
      return;
    }
    const v1: Point = [prev[0] - corner[0], prev[1] - corner[1]];
    const v2: Point = [next[0] - corner[0], next[1] - corner[1]];
    const l1 = Math.hypot(v1[0], v1[1]) || 1;
    const l2 = Math.hypot(v2[0], v2[1]) || 1;
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const a: Point = [corner[0] + (v1[0] / l1) * r, corner[1] + (v1[1] / l1) * r];
    const b: Point = [corner[0] + (v2[0] / l2) * r, corner[1] + (v2[1] / l2) * r];
    const start = Math.atan2(a[1] - corner[1], a[0] - corner[0]);
    const end = Math.atan2(b[1] - corner[1], b[0] - corner[0]);
    let delta = end - start;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    const steps = 8;
    for (let s = 0; s <= steps; s += 1) {
      const angle = start + (delta * s) / steps;
      pts.push([corner[0] + Math.cos(angle) * r, corner[1] + Math.sin(angle) * r]);
    }
  });

  const cumulative: number[] = [0];
  for (let i = 1; i < pts.length; i += 1) {
    cumulative.push(
      cumulative[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    );
  }
  const total = cumulative[cumulative.length - 1] || 1;

  return {
    d: `M ${pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" L ")}`,
    at(t: number): Point {
      const target = Math.max(0, Math.min(1, t)) * total;
      let i = 1;
      while (i < cumulative.length - 1 && cumulative[i] < target) i += 1;
      const segment = cumulative[i] - cumulative[i - 1] || 1;
      const f = (target - cumulative[i - 1]) / segment;
      return [
        pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f,
        pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f,
      ];
    },
  };
}

/** Geometry of the composition, in design pixels. */
const CARD_LEFT = 0.59 * DESIGN_W;
const CARD_W = 0.24 * DESIGN_W;
const CARD_RIGHT = CARD_LEFT + CARD_W;

const TILE_SIZE = TILE_W * DESIGN_W;
const COLUMN_X: Record<string, number> = {
  A: 0.88 * DESIGN_W,
  B: 0.955 * DESIGN_W,
};

/** Lowest tile of each column, and the point its connector lands on. */
const LOWEST_ROW_Y = 0.44 * DESIGN_H;
const TILE_BOTTOM_Y = LOWEST_ROW_Y + TILE_SIZE / 2;

const ROUTES = [
  makeRoute([
    [CARD_RIGHT, 300],
    [CARD_RIGHT + 26, 300],
    [CARD_RIGHT + 26, TILE_BOTTOM_Y],
    [COLUMN_X.A, TILE_BOTTOM_Y],
  ]),
  makeRoute([
    [CARD_RIGHT, 330],
    [COLUMN_X.B - 64, 330],
    [COLUMN_X.B - 64, TILE_BOTTOM_Y + 25],
    [COLUMN_X.B - 32, TILE_BOTTOM_Y + 25],
    [COLUMN_X.B - 32, TILE_BOTTOM_Y],
    [COLUMN_X.B, TILE_BOTTOM_Y],
  ]),
];

type TileSpec = {
  id: string;
  label: string;
  /** Centre of the tile, % of the stage. */
  x: number;
  y: number;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

const TILES: TileSpec[] = [
  { id: "logo", label: "ORYNTAL", x: 88, y: 26 },
  { id: "google", label: "Google", x: 88, y: 44, icon: SiGoogle },
  { id: "whatsapp", label: "WhatsApp", x: 95.5, y: 8, icon: SiWhatsapp },
  { id: "instagram", label: "Instagram", x: 95.5, y: 26, icon: SiInstagram },
  { id: "facebook", label: "Facebook", x: 95.5, y: 44, icon: SiFacebook },
];

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
        alt=""
        width={44}
        height={44}
        className="h-[46%] w-auto object-contain"
      />
    );
  }

  const Icon = TILE_ICONS[id];
  if (!Icon) return null;

  return (
    <Icon
      className="h-[54%] w-[54%]"
      style={{ color: "#1D1E20", opacity: 0.54 }}
    />
  );
}

/** A travelling dot that runs along a connector route. */
function Pulse({
  route,
  delay,
  reduced,
}: {
  route: ReturnType<typeof makeRoute>;
  delay: number;
  reduced: boolean;
}) {
  const progress = useMotionValue(0);
  const x = useTransform(progress, (v) => route.at(v)[0]);
  const y = useTransform(progress, (v) => route.at(v)[1]);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, [0, 1], {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      delay,
    });
    return () => controls.stop();
  }, [progress, reduced, delay]);

  if (reduced) return null;

  return (
    <m.circle
      cx={x}
      cy={y}
      r={3}
      fill="#9B95FF"
      style={{ filter: "drop-shadow(0 0 6px rgba(155,149,255,0.9))" }}
    />
  );
}

export default function IncludedStage() {
  const reduced = useReducedMotion() ?? false;
  const { included } = digitalFoundation;
  const items = included.items;

  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [docVisible, setDocVisible] = useState(true);
  const [pointerFine, setPointerFine] = useState(false);
  const [scale, setScale] = useState(1);
  const [canvasHeight, setCanvasHeight] = useState(600);

  const stageRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pauseTimer = useRef<number | null>(null);

  const entered = useInView(stageRef, { amount: 0.25, once: true });
  const onScreen = useInView(stageRef, { amount: 0.35 });
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 85%", "center 55%"],
  });
  const zoomScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const zoomY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const zoomOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.5 });

  const tiltY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const windowX = useTransform(sx, (v) => v * 3);
  const windowY = useTransform(sy, (v) => v * 3);
  const tileX = useTransform(sx, (v) => v * 6);
  const tileY = useTransform(sy, (v) => v * 6);
  const cardX = useTransform(sx, (v) => v * 10);
  const cardY = useTransform(sy, (v) => v * 10);

  const parallaxOn = pointerFine && !reduced;

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

  /* Keep the dashboard's inner layout at a fixed 960px and scale it to fit. */
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (!width) return;
      const next = width / CANVAS_W;
      setScale(next);
      setCanvasHeight(el.clientHeight / next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  const select = useCallback(
    (index: number) => {
      setActive((current) => {
        if (index !== current) setExiting(current);
        return index;
      });
      setPaused(true);
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
      pauseTimer.current = window.setTimeout(() => setPaused(false), MANUAL_PAUSE_MS);
    },
    []
  );

  /* The outgoing panel fades out, then goes back to being hidden. */
  useEffect(() => {
    if (exiting === null) return;
    const timer = window.setTimeout(() => setExiting(null), 220);
    return () => window.clearTimeout(timer);
  }, [exiting]);

  /* Autoplay — only while the stage is on screen, the tab is visible and nobody is interacting. */
  useEffect(() => {
    if (reduced || paused || interacting || !onScreen || !docVisible) return;

    const timer = window.setTimeout(() => {
      setActive((current) => {
        const next = (current + 1) % items.length;
        setExiting(current);
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [active, docVisible, interacting, items.length, onScreen, paused, reduced]);

  /* Keep the active tab visible in the horizontal strip. */
  useEffect(() => {
    if (isLarge) return;
    const el = tabRefs.current[active];
    if (!el) return;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active, isLarge, reduced]);

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
    if (!parallaxOn) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    setInteracting(false);
    px.set(0);
    py.set(0);
  }

  function onBlurCapture(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
  }

  const activeItem = items[active];
  const glowTiles = activeItem.id === "connect";
  const pulseCard = activeItem.id === "connect" || activeItem.id === "leads";

  const canvasStyle = useMemo(
    () =>
      isDesktop
        ? {
            position: "absolute" as const,
            inset: 0,
            width: CANVAS_W,
            height: canvasHeight,
            transformOrigin: "top left" as const,
            transform: `scale(${scale})`,
          }
        : undefined,
    [isDesktop, scale, canvasHeight]
  );

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label="Interactive overview of what's included in the Digital Foundation Package"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={onBlurCapture}
      className="relative mx-auto mt-14 w-full max-w-[1240px] md:mt-20"
      style={{ perspective: 1600 }}
    >
      <div className="relative md:aspect-[1240/700] lg:aspect-[1240/660]">
        {/* Soft glow behind the lower half of the window */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[34%] hidden h-[58%] w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,180,215,0.35),rgba(150,180,215,0))] blur-[40px] md:block"
        />

        <Rocks
          rocks={included.rocks}
          parallaxX={sx}
          parallaxY={sy}
          reduced={reduced}
          visible={entered}
        />

        {/* Connectors from the website card to the integration columns */}
        <svg
          className="pointer-events-none absolute inset-0 z-[25] hidden h-full w-full md:block"
          viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {ROUTES.map((route, i) => (
            <g key={i}>
              <m.path
                d={route.d}
                fill="none"
                stroke="rgba(228,236,246,0.65)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={entered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  duration: reduced ? 0.2 : 0.9,
                  delay: reduced ? 0 : 0.7 + i * 0.15,
                  ease: "easeInOut",
                }}
              />
              <Pulse route={route} delay={i * 1.3} reduced={reduced} />
            </g>
          ))}
        </svg>

        {/* The dashboard window */}
        <m.div
          className="relative z-20 w-full md:absolute md:left-1/2 md:top-[6%] md:h-[76%] md:w-[68%] lg:w-[64%]"
          style={
            isDesktop
              ? { x: "-50%", scale: zoomScale, y: zoomY, opacity: zoomOpacity }
              : undefined
          }
        >
          <m.div
            style={
              parallaxOn && isDesktop
                ? { rotateX: tiltX, rotateY: tiltY, x: windowX, y: windowY }
                : undefined
            }
            className="h-full"
          >
            <div
              ref={windowRef}
              className="relative h-full overflow-hidden rounded-xl border border-white/40 bg-[#F2F4F7] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            >
              <div style={canvasStyle} className="h-full">
                <div className="flex h-full flex-col lg:flex-row">
                  {/* Window chrome */}
                  <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#E3E4E8] bg-white px-3">
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="size-2 rounded-full bg-[#FF5F57]" />
                      <span className="size-2 rounded-full bg-[#FEBC2E]" />
                      <span className="size-2 rounded-full bg-[#28C840]" />
                      <Image
                        src={LOGO}
                        alt="ORYNTAL"
                        width={16}
                        height={16}
                        className="ml-1 h-4 w-auto object-contain"
                      />
                      <span className="h-4 w-px bg-[#E3E4E8]" />
                      <span className="hidden text-[12px] text-[#1D1E20] sm:inline">
                        Digital Foundation
                      </span>
                    </div>

                    <div className="hidden flex-1 justify-center md:flex">
                      <span className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-2.5 py-1">
                        <Lock className="size-[11px] text-[#6D7081]" strokeWidth={2} />
                        <span className="text-[11px] text-[#6D7081]">yourbusiness.com</span>
                      </span>
                    </div>

                    <div className="ml-auto flex shrink-0 items-center gap-2">
                      <span
                        className="flex items-center gap-1 rounded-full border-[1.5px] border-transparent px-2 py-[3px]"
                        style={{
                          background:
                            "linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#7B4DFF,#C13BE0) border-box",
                        }}
                      >
                        <Sparkles className="size-3 text-[#673DE6]" strokeWidth={2} />
                        <span className="hidden text-[11px] text-[#1D1E20] sm:inline">
                          Ask ORYNTAL
                        </span>
                      </span>
                      <span className="grid size-6 place-items-center rounded-full bg-[#E7E9EE]">
                        <UserCircle className="size-3.5 text-[#6D7081]" strokeWidth={1.75} />
                      </span>
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col">
                    {/* Tab strip (small screens) / sidebar (large screens) */}
                    <div className="flex shrink-0 flex-col border-b border-[#E3E4E8] bg-[#F2F4F7] lg:border-b-0 lg:border-r lg:w-[22%]">
                      <div
                        role="tablist"
                        aria-label="What the package includes"
                        onKeyDown={onKeyDown}
                        className="no-scrollbar flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:p-3"
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
                                "relative flex shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12px] transition-colors duration-200",
                                isActive
                                  ? "bg-white font-medium text-[#1D1E20] shadow-sm"
                                  : "text-[#4A5568] hover:bg-white/60"
                              )}
                            >
                              {isActive ? (
                                <>
                                  <m.span
                                    layoutId="dfiActivePill"
                                    transition={{ type: "spring", stiffness: 340, damping: 34 }}
                                    className="absolute inset-0 rounded-md bg-white shadow-sm"
                                  />
                                  <m.span
                                    layoutId="dfiActive"
                                    transition={{ type: "spring", stiffness: 340, damping: 34 }}
                                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[#673DE6] lg:inset-x-auto lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-[3px] lg:rounded-r-full lg:rounded-tl-none"
                                  />
                                </>
                              ) : null}
                              <Icon
                                aria-hidden="true"
                                className="relative size-4 shrink-0"
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
                        className="hidden border-t border-[#E3E4E8] p-3 lg:block"
                      >
                        <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-[#9AA0AE]">
                          <Settings className="size-4" strokeWidth={1.75} />
                          Settings
                        </span>
                        <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-[#9AA0AE]">
                          <Plug className="size-4" strokeWidth={1.75} />
                          Integrations
                        </span>
                      </div>
                    </div>

                    {/* Main area */}
                    <div className="flex min-h-0 flex-1 flex-col bg-[#F7F8FA] p-3 md:p-5 lg:p-6">
                      <div className="flex shrink-0 items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[15px] font-semibold leading-tight text-[#1D1E20] lg:text-[18px]">
                            Welcome back
                          </p>
                          <p className="text-[11px] text-[#6D7081] lg:text-[12px]">
                            Here&apos;s what&apos;s included in your setup
                          </p>
                        </div>
                        <div className="hidden shrink-0 items-center gap-2 rounded-md border border-[#E3E4E8] bg-white px-2.5 py-1.5 sm:flex">
                          <span className="text-[11px] text-[#6D7081]">Your website</span>
                          <span className="text-[11px] text-[#673DE6] underline">
                            yourbusiness.com
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-xl border border-[#E9EAEE] bg-white p-3 md:p-4 lg:p-5">
                        <div className="flex shrink-0 items-center justify-between gap-3">
                          <p className="text-[12px] font-semibold text-[#1D1E20] lg:text-[13px]">
                            Setup overview
                          </p>
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            {items.map((item, i) => (
                              <m.span
                                key={item.id}
                                animate={{
                                  backgroundColor:
                                    i === active
                                      ? "#673DE6"
                                      : i < active
                                        ? "#2EC27E"
                                        : "#E3E4E8",
                                }}
                                transition={{ duration: 0.3 }}
                                className="grid size-3.5 place-items-center rounded-full"
                              >
                                {i < active ? (
                                  <Check className="size-2.5 text-white" strokeWidth={3.5} />
                                ) : null}
                              </m.span>
                            ))}
                          </div>
                        </div>

                        <div className="relative mt-3 h-[260px] md:flex-1">
                          {items.map((item, i) => {
                            const Icon = item.icon;
                            const isActive = i === active;
                            const isExiting = i === exiting && !isActive;
                            const visible = isActive || isExiting;

                            return (
                              <m.div
                                key={item.id}
                                id={`dfi-panel-${item.id}`}
                                role="tabpanel"
                                aria-labelledby={`dfi-tab-${item.id}`}
                                hidden={!visible}
                                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                                animate={{
                                  opacity: visible ? 1 : 0,
                                  y: isActive ? 0 : reduced ? 0 : -8,
                                }}
                                transition={{
                                  duration: isActive ? 0.32 : 0.18,
                                  ease: "easeOut",
                                }}
                                className="absolute inset-0 flex flex-row gap-3 lg:gap-6"
                              >
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#EEE9FF] lg:size-10">
                                    <Icon
                                      aria-hidden="true"
                                      className="size-4 text-[#673DE6] lg:size-5"
                                      strokeWidth={1.75}
                                    />
                                  </span>
                                  <p className="mt-2 text-[15px] font-semibold leading-tight text-[#1D1E20] lg:mt-3 lg:text-[20px]">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 max-w-sm text-[12px] leading-relaxed text-[#6D7081] lg:mt-1.5 lg:text-[13px]">
                                    {item.description}
                                  </p>
                                  <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#E6F7EE] px-2 py-[3px] text-[10px] font-medium text-[#12805C] lg:mt-3 lg:text-[11px]">
                                    <Check className="size-2.5" strokeWidth={3} />
                                    Included
                                  </span>
                                </div>

                                <div className="w-[112px] shrink-0 sm:w-[168px] lg:w-[260px]">
                                  <div className="h-[126px] overflow-hidden rounded-lg border border-[#E3E4E8] bg-[#FBFCFD] p-2 lg:h-[120px] lg:p-2.5">
                                    <MiniVisual
                                      id={item.id as VisualId}
                                      active={isActive}
                                      reduced={reduced}
                                    />
                                  </div>
                                </div>
                              </m.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>

        {/* Floating website card */}
        <m.div
          className="relative z-30 mx-auto mt-4 w-full max-w-[320px] md:absolute md:left-[59%] md:top-[44%] md:mx-0 md:mt-0 md:w-[24%] md:max-w-none"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: reduced ? 0.3 : 0.6, delay: reduced ? 0 : 0.45, ease: "easeOut" }}
        >
          <m.div
            style={parallaxOn ? { x: cardX, y: cardY } : undefined}
            className="relative"
          >
            <m.div
              animate={reduced ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_28px_70px_rgba(10,20,40,0.4)] backdrop-blur"
            >
              {pulseCard && !reduced ? (
                <m.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-[20px] border-2 border-[#9B95FF]/60"
                  animate={{ scale: [1, 1.08], opacity: [0.65, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              ) : null}

              <div className="overflow-hidden rounded-xl">
                <MediaPlaceholder
                  type="image"
                  aspect="4/3"
                  label="Add: a screenshot of your finished website"
                  hint="Homepage, 4:3, 800×600"
                  compact
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
                <div className="min-w-0">
                  <p className="truncate text-[clamp(11px,1.25vw,17px)] font-semibold text-[#1D1E20]">
                    Your business website
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#6D7081]">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2EC27E]" />
                    <ShieldCheck className="size-3 shrink-0" strokeWidth={2} />
                    Live on HTTPS
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EEF1F5]"
                >
                  <svg viewBox="0 0 24 24" className="size-5 text-[#4A5568]" aria-hidden="true">
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </m.div>
          </m.div>
        </m.div>

        {/* Monochrome integration tiles — desktop columns */}
        {TILES.map((tile, i) => (
          <div
            key={tile.id}
            role="img"
            aria-label={tile.label}
            className="absolute z-30 hidden md:block"
            style={{
              left: `${tile.x}%`,
              top: `${tile.y}%`,
              width: `${TILE_W * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <m.div
              style={parallaxOn ? { x: tileX, y: tileY } : undefined}
              className="relative"
            >
              <m.div
                animate={reduced ? undefined : { y: [0, -3, 0] }}
                transition={{
                  duration: 5 + (i % 4) * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="relative"
              >
                <m.div
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  animate={
                    entered
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: reduced ? 1 : 0.7 }
                  }
                  transition={
                    reduced
                      ? { duration: 0.2, delay: i * 0.03 }
                      : { type: "spring", stiffness: 220, damping: 18, delay: 0.5 + i * 0.08 }
                  }
                  className="grid aspect-square place-items-center rounded-[22%] border border-white/70 bg-[#E3EBF3] shadow-[0_10px_28px_rgba(0,0,0,0.3)]"
                  style={
                    glowTiles
                      ? { boxShadow: "0 0 0 6px rgba(155,149,255,0.35), 0 10px 28px rgba(0,0,0,0.3)" }
                      : undefined
                  }
                >
                  <TileGlyph id={tile.id} />
                </m.div>

                {glowTiles && !reduced ? (
                  <m.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-[26%] border-2 border-[#9B95FF]/60"
                    animate={{ scale: [1, 1.16], opacity: [0.7, 0] }}
                    transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                  />
                ) : null}
              </m.div>
            </m.div>
          </div>
        ))}

        {/* Monochrome integration tiles — small screens */}
        <div
          role="img"
          aria-label="ORYNTAL, Google, WhatsApp, Instagram, Facebook"
          className="mt-6 flex items-center justify-center gap-3 md:hidden"
        >
          {TILES.map((tile) => (
            <div
              key={tile.id}
              className="grid size-11 place-items-center rounded-[22%] border border-white/70 bg-[#E3EBF3] shadow-[0_10px_28px_rgba(0,0,0,0.3)]"
            >
              <TileGlyph id={tile.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
