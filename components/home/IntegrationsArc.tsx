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
   Industry tiles: scattered anchors that float gently around the
   tools arc (never on a fixed path). Positions are percentages of
   the stage; the stage is aspect 1240/470 on md+ and 0.95 of the
   width below md.
---------------------------------------------------------------- */

/* How many industries are shown below md. */
const MOBILE_INDUSTRY_COUNT = 6;

/* Same size list the tools arc uses, so we can avoid overlapping it. */
const TOOL_SIZES = [0.4, 0.5, 0.62, 0.76, 0.88, 1, 0.88, 0.76, 0.62, 0.5, 0.4];

const DESKTOP_BOX_FRAC = 330 / 470; /* tools inner box / stage height */
const DESKTOP_BOX_TOP = 100 * (1 - DESKTOP_BOX_FRAC);
const MOBILE_BOX_FRAC = 330 / 1240 / 0.95;
const MOBILE_BOX_TOP = 100 * (1 - MOBILE_BOX_FRAC);
/* Design widths used to convert px paddings into percentages. */
const DESKTOP_DESIGN_W = 1240;
const MOBILE_DESIGN_W = 328;

/* Tile height in stage-height % for a given width in stage-width %. */
function heightPctOf(w: number, mobile: boolean) {
  return w * (mobile ? 1 / 0.95 : DESKTOP_DESIGN_W / 470);
}

/* Deterministic pseudo-random in [0, 1). */
function rand(seed: number, salt: number) {
  const v = Math.sin(seed * 127.1 + salt * 311.7 + 13.37) * 43758.5453;
  return v - Math.floor(v);
}

/* Topmost tool-tile edge (stage-height %) near a given x (stage-width %). */
function toolTopNear(x: number, mobile: boolean) {
  let top = 100;
  for (let i = 0; i < TOOL_SIZES.length; i += 1) {
    let t: number;
    let xi: number;
    let wi: number;
    let base: number;
    let depth: number;
    let boxTop: number;
    let boxFrac: number;
    if (mobile) {
      if (i < 2 || i > 8) continue;
      t = (i - 5) / 3;
      xi = 50 + t * 44;
      wi = TOOL_SIZES[i] * 20;
      base = 8;
      depth = 46;
      boxTop = MOBILE_BOX_TOP;
      boxFrac = MOBILE_BOX_FRAC;
    } else {
      t = (i - 5) / 5;
      xi = 50 + t * 46;
      wi = TOOL_SIZES[i] * 9.4;
      base = 6;
      depth = 52;
      boxTop = DESKTOP_BOX_TOP;
      boxFrac = DESKTOP_BOX_FRAC;
    }
    if (Math.abs(x - xi) > wi / 2 + (mobile ? 5 : 4)) continue;
    top = Math.min(top, boxTop + (base + depth * t * t) * boxFrac);
  }
  return top;
}

type IndustryAnchor = {
  /** Anchor x in stage-width %. */
  x: number;
  /** Anchor y in stage-height %. */
  y: number;
  /** Tile width in stage-width %. */
  w: number;
  /** Bob amplitudes + speeds + phases for the slow floating motion. */
  ax: number;
  ay: number;
  wx: number;
  wy: number;
  px: number;
  py: number;
};

type Box = { l: number; r: number; t: number; b: number };

/* Scattered anchors above / beside the tools arc, with clearance. */
function scatterAnchors(count: number, mobile: boolean): IndustryAnchor[] {
  const maxW = mobile ? 14 : 8;
  const xMin = mobile ? 8 : 4;
  const xMax = mobile ? 92 : 96;
  const designW = mobile ? MOBILE_DESIGN_W : DESKTOP_DESIGN_W;
  const pxH = (designW * (mobile ? 0.95 : 470 / 1240)) / 100; /* px per height % */
  const labelH = (mobile ? 22 : 25) / pxH;
  const clearH = (mobile ? 22 : 24) / pxH;
  const cellW = (xMax - xMin) / count;

  const anchors: IndustryAnchor[] = [];
  const boxes: Box[] = [];

  for (let i = 0; i < count; i += 1) {
    let pick: IndustryAnchor | null = null;
    let box: Box | null = null;
    let best: { anchor: IndustryAnchor; box: Box; score: number } | null =
      null;

    for (let attempt = 0; attempt < 16; attempt += 1) {
      /* Stratified x: every tile owns a column, so they never cluster. */
      const x = xMin + (i + 0.12 + 0.76 * rand(i, attempt * 3 + 1)) * cellW;
      const w = maxW * (0.66 + 0.34 * rand(i, attempt * 3 + 2));
      const h = heightPctOf(w, mobile);
      const topLimit = toolTopNear(x, mobile) - h - labelH - clearH;
      if (topLimit < 1.2) continue;
      const y = 1.2 + rand(i, attempt * 3 + 3) * (topLimit - 1.2);
      const candidate: IndustryAnchor = {
        x,
        y,
        w,
        ax: 0.35 + rand(i, 11) * 0.65,
        ay: 0.45 + rand(i, 12) * 0.75,
        wx: (2 * Math.PI) / (7 + rand(i, 13) * 8),
        wy: (2 * Math.PI) / (9 + rand(i, 14) * 9),
        px: rand(i, 15) * Math.PI * 2,
        py: rand(i, 16) * Math.PI * 2,
      };
      const candidateBox = {
        l: x - w / 2 - 1,
        r: x + w / 2 + 1,
        t: y - 1.5,
        b: y + h + labelH + 1.5,
      };
      /* Two boxes overlap only when they collide on both axes. */
      let worstOverlap = 0;
      let fits = true;
      for (const p of boxes) {
        const xGap = Math.max(candidateBox.l - p.r, p.l - candidateBox.r);
        const yGap = Math.max(candidateBox.t - p.b, p.t - candidateBox.b);
        if (xGap <= 0 && yGap <= 0) {
          fits = false;
          worstOverlap = Math.max(worstOverlap, Math.min(-xGap, -yGap));
        }
      }
      if (fits) {
        pick = candidate;
        box = candidateBox;
        break;
      }
      if (!best || -worstOverlap > best.score) {
        best = { anchor: candidate, box: candidateBox, score: -worstOverlap };
      }
    }

    if (!pick && best) {
      pick = best.anchor;
      box = best.box;
    }

    if (!pick || !box) {
      const w = maxW * 0.72;
      pick = {
        x: 50,
        y: 2,
        w,
        ax: 0.5,
        ay: 0.6,
        wx: (2 * Math.PI) / 10,
        wy: (2 * Math.PI) / 12,
        px: rand(i, 15) * Math.PI * 2,
        py: rand(i, 16) * Math.PI * 2,
      };
      box = {
        l: 50 - w / 2,
        r: 50 + w / 2,
        t: 2,
        b: 2 + heightPctOf(w, mobile) + labelH,
      };
    }

    anchors.push(pick);
    boxes.push(box);
  }

  return anchors;
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

      {/* Entrance only — the float loop itself writes transform on the li. */}
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

  const visibleIndustries = isMobile
    ? industries.slice(0, MOBILE_INDUSTRY_COUNT)
    : industries;

  const tileRefs = useRef<Array<HTMLLIElement | null>>([]);
  const stageSize = useRef({ w: 0, h: 0 });
  const elapsed = useRef(0);
  const lastFrame = useRef<number | null>(null);
  const runningRef = useRef(false);
  const applyRef = useRef<() => void>(() => {});
  const anchorsRef = useRef<IndustryAnchor[]>([]);

  const rawParallax = useMotionValue(0);
  const parallax = useSpring(rawParallax, {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  /* Every tile floats gently around its scattered anchor. */
  applyRef.current = () => {
    const { w: stageW, h: stageH } = stageSize.current;
    if (!stageW || !stageH) return;
    const anchors = anchorsRef.current;
    for (let i = 0; i < anchors.length; i += 1) {
      const node = tileRefs.current[i];
      const anchor = anchors[i];
      if (!node || !anchor) continue;
      const x = reduced
        ? anchor.x
        : anchor.x + anchor.ax * Math.sin(elapsed.current * anchor.wx + anchor.px);
      const y = reduced
        ? anchor.y
        : anchor.y + anchor.ay * Math.sin(elapsed.current * anchor.wy + anchor.py);
      const widthPx = (anchor.w / 100) * stageW;
      node.style.width = `${anchor.w}%`;
      node.style.transform = `translate3d(${((x / 100) * stageW - widthPx / 2).toFixed(2)}px, ${((y / 100) * stageH).toFixed(2)}px, 0)`;
    }
  };

  useIsoLayoutEffect(() => {
    anchorsRef.current = scatterAnchors(visibleIndustries.length, isMobile);
    applyRef.current();
  }, [visibleIndustries.length, isMobile]);

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
      {/* Industry tiles floating scattered around the tools arc */}
      <div
        onPointerEnter={() => setFrozen(true)}
        onPointerLeave={() => setFrozen(false)}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full"
      >
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
