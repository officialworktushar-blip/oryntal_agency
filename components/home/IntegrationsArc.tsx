"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  type CSSProperties,
} from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Sparkles, Truck } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiAirtable,
  SiGmail,
  SiGooglecalendar,
  SiGooglesheets,
  SiHubspot,
  SiN8N,
  SiRazorpay,
  SiStripe,
  SiWhatsapp,
} from "react-icons/si";
import { connections, type Connection } from "@/lib/content/connections";
import { industries, type Industry } from "@/lib/content/industries";
import { cn } from "@/lib/cn";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const siIcons: Record<string, IconType> = {
  SiGooglesheets,
  SiStripe,
  SiHubspot,
  SiN8N,
  SiWhatsapp,
  SiRazorpay,
  SiGmail,
  SiGooglecalendar,
  SiAirtable,
};

const CENTRE_INDEX = 5;

/* Desktop arc geometry (percentages of the stage). */
const X_SPREAD = 46;
const TOP_BASE = 6;
const TOP_DEPTH = 52;
/* Tuned slightly below 12.5% so neighbouring tiles never collide at the centre. */
const TILE_BASE = 9.4;

/* Compact arc for < md (only indices 2..8 are shown). */
const MOBILE_X_SPREAD = 44;
const MOBILE_TOP_BASE = 8;
const MOBILE_TOP_DEPTH = 46;
const MOBILE_TILE_BASE = 20;

/* ---------------------------------------------------------------
   Outer industry arc — a parabola concentric with the tools arc.
   Positions are percentages of the stage; the stage design height
   is 470px (aspect 1240/470) on md+ and 0.95 of the width below.
---------------------------------------------------------------- */
const T_HALF = 1.15;
const FADE_T = 0.9;
const DESIGN_HEIGHT = 470;
const IND_TOP_BASE = 6;
const IND_TOP_DEPTH = 180;
const IND_TOP_CAP = 1.3;
/* A full loop around the arc takes ~110 seconds. */
const DRIFT_SPEED = 1 / 110;
/* How many industries are shown below md. */
const MOBILE_INDUSTRY_COUNT = 6;

type ArcShape = { spread: number; maxW: number; count: number };

const DESKTOP_SHAPE: ArcShape = { spread: 46, maxW: 8, count: 10 };
const MOBILE_SHAPE: ArcShape = {
  spread: 44,
  maxW: 14,
  count: MOBILE_INDUSTRY_COUNT,
};

/* x%, top% (of stage height), width% and opacity for a given t in [-1.15, 1.15]. */
function industryGeom(t: number, shape: ArcShape) {
  const spacing = ((2.3 / shape.count) * shape.spread);
  const centreW = Math.min(shape.maxW, 0.8 * spacing);
  const shrink = 1 - 0.45 * Math.min(Math.abs(t), 1);
  const w = centreW * shrink;
  const x = 50 + t * shape.spread;
  const top =
    ((IND_TOP_BASE + IND_TOP_DEPTH * Math.min(t * t, IND_TOP_CAP)) /
      DESIGN_HEIGHT) *
    100;
  const absT = Math.abs(t);
  const opacity =
    absT <= FADE_T ? 1 : Math.max(0, (T_HALF - absT) / (T_HALF - FADE_T));
  return { x, top, w, opacity };
}

function tForPhase(u: number) {
  return -T_HALF + 2 * T_HALF * u;
}

/* The dotted track line samples the exact same function as the tiles. */
function trackPathD(shape: ArcShape) {
  const steps = 48;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const g = industryGeom(tForPhase(i / steps), shape);
    d += `${i === 0 ? "M" : "L"}${g.x.toFixed(3)} ${g.top.toFixed(3)} `;
  }
  return d.trim();
}

function TileIcon({ name, color }: { name: string; color: string }) {
  if (name === "Truck") {
    return (
      <Truck
        color={color}
        strokeWidth={1.75}
        aria-hidden
        className="h-[52%] w-[52%]"
      />
    );
  }
  if (name === "Sparkles") {
    return (
      <Sparkles
        color={color}
        strokeWidth={1.75}
        aria-hidden
        className="h-[52%] w-[52%]"
      />
    );
  }
  const Icon = siIcons[name];
  if (!Icon) return null;
  return <Icon color={color} aria-hidden className="h-[52%] w-[52%]" />;
}

type ArcTileProps = {
  item: Connection;
  index: number;
  revealed: boolean;
  stageVisible: boolean;
  pageVisible: boolean;
  reduced: boolean;
  parallax: MotionValue<number>;
};

function ArcTile({
  item,
  index,
  revealed,
  stageVisible,
  pageVisible,
  reduced,
  parallax,
}: ArcTileProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const t = (index - CENTRE_INDEX) / CENTRE_INDEX;
  const x = 50 + t * X_SPREAD;
  const top = TOP_BASE + TOP_DEPTH * t * t;
  const width = item.size * TILE_BASE;

  const mobileT = (index - CENTRE_INDEX) / 3;
  const mobileX = 50 + mobileT * MOBILE_X_SPREAD;
  const mobileTop = MOBILE_TOP_BASE + MOBILE_TOP_DEPTH * mobileT * mobileT;
  const mobileWidth = item.size * MOBILE_TILE_BASE;

  const delay = Math.abs(t) * 0.12;
  const float =
    revealed && stageVisible && pageVisible && !reduced && !hovered && !focused;
  const shift = useTransform(parallax, (value) => value * Math.abs(t));

  const style = {
    "--x": `${x}%`,
    "--top": `${top}%`,
    "--w": `${width}%`,
    "--mx": `${mobileX}%`,
    "--mtop": `${mobileTop}%`,
    "--mw": `${mobileWidth}%`,
  } as CSSProperties;

  const hidden =
    index < CENTRE_INDEX - 3 || index > CENTRE_INDEX + 3
      ? "hidden md:block"
      : undefined;

  return (
    <li
      style={style}
      className={cn(
        "absolute -translate-x-1/2 left-[var(--x)] top-[var(--top)] w-[var(--w)]",
        "max-md:left-[var(--mx)] max-md:top-[var(--mtop)] max-md:w-[var(--mw)]",
        hidden,
      )}
    >
      <span className="sr-only">{item.name}</span>

      <m.div style={{ x: shift }} className="will-change-transform">
        <m.div
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.85 }
          }
          animate={
            revealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 48, scale: 0.85 }
          }
          transition={
            reduced
              ? { opacity: { duration: 0.4, delay }, duration: 0.4 }
              : {
                  opacity: { duration: 0.5, delay },
                  y: {
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    delay,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    delay,
                  },
                }
          }
        >
          <m.div
            initial={false}
            animate={float ? { y: [0, -4, 0] } : { y: 0 }}
            transition={
              float
                ? {
                    duration: 4 + (index % 3),
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: (index % 5) * 0.4,
                  }
                : { duration: 0.3, ease: "easeOut" }
            }
          >
            <div
              role="img"
              aria-label={item.name}
              tabIndex={0}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={cn(
                "group relative flex aspect-square w-full items-center justify-center rounded-[24%]",
                "border border-white/10 bg-[linear-gradient(160deg,#2B2347_0%,#1B1433_100%)]",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_rgba(5,2,20,0.55)]",
                "outline-none transition-[transform,border-color] duration-300 ease-out",
                "hover:border-white/25 focus-visible:border-white/25",
                "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110B2B]",
                "motion-safe:hover:scale-110 motion-safe:hover:-translate-y-1.5",
                "motion-safe:focus-visible:scale-110 motion-safe:focus-visible:-translate-y-1.5",
              )}
            >
              <TileIcon name={item.icon} color={item.brand} />

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap",
                  "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur",
                  "opacity-0 transition-opacity duration-200",
                  "group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                {item.name}
              </span>
            </div>
          </m.div>
        </m.div>
      </m.div>
    </li>
  );
}

type IndustryTileProps = {
  item: Industry;
  index: number;
  revealed: boolean;
  reduced: boolean;
  register: (index: number, node: HTMLLIElement | null) => void;
};

function IndustryTile({
  item,
  index,
  revealed,
  reduced,
  register,
}: IndustryTileProps) {
  const [hot, setHot] = useState(false);
  const Icon = item.icon;

  return (
    <li
      ref={(node) => register(index, node)}
      className="absolute left-0 top-0 will-change-transform"
    >
      <span className="sr-only">{item.name}</span>

      {/* Entrance only — the drift itself writes transform/opacity on the li. */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{
          duration: reduced ? 0.35 : 0.45,
          delay: reduced ? index * 0.04 : 0.6 + index * 0.06,
          ease: "easeOut",
        }}
      >
        <div
          onPointerEnter={() => setHot(true)}
          onPointerLeave={() => setHot(false)}
          className={cn(
            "industry-tile pointer-events-auto relative flex aspect-square w-full",
            "items-center justify-center rounded-[24%] outline-none",
            "transition-[transform,border-color] duration-300 ease-out",
            "motion-safe:hover:scale-[1.08]",
          )}
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-[50%] w-[50%] text-[var(--int-industry-icon)]"
          />
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "mt-2 block whitespace-nowrap text-center text-[10px] font-medium md:text-[11px]",
            hot ? "text-white" : "text-white/70",
          )}
        >
          {item.name}
        </span>
      </m.div>
    </li>
  );
}

export default function IntegrationsArc() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const revealed = useInView(stageRef, { amount: 0.35, once: true });
  const stageVisible = useInView(stageRef, { amount: 0.05 });
  const driftInView = useInView(stageRef, { amount: 0.15 });
  const [pageVisible, setPageVisible] = useState(true);
  const [canParallax, setCanParallax] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  /* Frozen while the pointer rests on an industry tile. */
  const [frozen, setFrozen] = useState(false);

  const shape = isMobile ? MOBILE_SHAPE : DESKTOP_SHAPE;
  const visibleIndustries = isMobile
    ? industries.slice(0, MOBILE_INDUSTRY_COUNT)
    : industries;

  const tileRefs = useRef<Array<HTMLLIElement | null>>([]);
  const stageSize = useRef({ w: 0, h: 0 });
  const elapsed = useRef(0);
  const lastFrame = useRef<number | null>(null);
  const runningRef = useRef(false);
  const applyRef = useRef<() => void>(() => {});

  const rawParallax = useMotionValue(0);
  const parallax = useSpring(rawParallax, {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  /* Position/size/opacity for every tile from the shared geometry. */
  applyRef.current = () => {
    const { w: stageW, h: stageH } = stageSize.current;
    if (!stageW || !stageH) return;
    for (let i = 0; i < shape.count; i += 1) {
      const node = tileRefs.current[i];
      if (!node) continue;
      const u = reduced
        ? (i + 0.5) / shape.count
        : (((i / shape.count + elapsed.current * DRIFT_SPEED) % 1) + 1) % 1;
      const g = industryGeom(tForPhase(u), shape);
      const widthPx = (g.w / 100) * stageW;
      const xPx = (g.x / 100) * stageW - widthPx / 2;
      const yPx = (g.top / 100) * stageH;
      node.style.width = `${g.w}%`;
      node.style.transform = `translate3d(${xPx.toFixed(2)}px, ${yPx.toFixed(2)}px, 0)`;
      node.style.opacity = reduced ? "1" : g.opacity.toFixed(3);
    }
  };

  useIsoLayoutEffect(() => {
    applyRef.current();
  });

  useEffect(() => {
    runningRef.current = driftInView && pageVisible && !frozen && !reduced;
  }, [driftInView, pageVisible, frozen, reduced]);

  /* One animation loop drives every tile; no React state per frame. */
  useAnimationFrame((time) => {
    if (reduced) return;
    const last = lastFrame.current;
    lastFrame.current = time;
    if (last === null || !runningRef.current) return;
    elapsed.current += Math.min((time - last) / 1000, 0.1);
    applyRef.current();
  });

  const registerTile = useCallback(
    (index: number, node: HTMLLIElement | null) => {
      tileRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      stageSize.current = { w: rect.width, h: rect.height };
      applyRef.current();
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanParallax(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canParallax || reduced || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normalized = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    rawParallax.set(-normalized * 6);
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => rawParallax.set(0)}
      className="relative mx-auto aspect-[1/0.95] w-full max-w-[1240px] md:aspect-[1240/470]"
    >
      {/* Outer arc: industry tiles drifting along a dotted track */}
      <div
        onPointerEnter={() => setFrozen(true)}
        onPointerLeave={() => setFrozen(false)}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full"
      >
        <m.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="integrations-industry-track"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="100"
              y2="0"
            >
              <stop offset="0" stopColor="var(--int-track)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--int-track)" />
              <stop offset="1" stopColor="var(--int-track)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={trackPathD(shape)}
            fill="none"
            stroke="url(#integrations-industry-track)"
            strokeWidth="2"
            strokeDasharray="1 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </m.svg>

        <ul
          role="list"
          aria-label="Industries ORYNTAL builds for"
          className="absolute inset-0"
        >
          {visibleIndustries.map((item, index) => (
            <IndustryTile
              key={item.id}
              item={item}
              index={index}
              revealed={revealed}
              reduced={reduced}
              register={registerTile}
            />
          ))}
        </ul>
      </div>

      {/* Inner arc: the tools, unchanged */}
      <div className="absolute inset-x-0 bottom-0 aspect-[1240/330]">
        {/* Curved purple glow behind the arc */}
        <m.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute left-[-6%] top-[18%] z-0 w-[112%]"
        >
          <div className="relative aspect-[2.4/1] w-full">
            <div
              className="absolute inset-0 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 0%, rgba(139,108,255,0.55) 0%, rgba(139,108,255,0) 70%)",
                filter: "blur(18px)",
              }}
            />
            <svg
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              fill="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient
                  id="integrations-arc"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0" stopColor="#8B6CFF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#8B6CFF" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#8B6CFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 250 A 600 250 0 0 1 1200 250"
                stroke="url(#integrations-arc)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </m.div>

        <ul
          role="list"
          aria-label="Tools ORYNTAL connects"
          className="absolute inset-0 z-10"
        >
          {connections.map((item, index) => (
            <ArcTile
              key={item.id}
              item={item}
              index={index}
              revealed={revealed}
              stageVisible={stageVisible}
              pageVisible={pageVisible}
              reduced={reduced}
              parallax={parallax}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
