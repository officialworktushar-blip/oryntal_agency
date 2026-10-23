"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useScaledCanvas } from "./hooks/useScaledCanvas";

const TILE = 122;
const GAP = 16;
const PAD = 10;
const PITCH = TILE + GAP;
const DESIGN_WIDTH = 700;

const CYCLE = [
  "whatsapp",
  "shipping",
  "notify",
  "ai",
  "orders",
  "payments",
  "website",
];

type TileGridProps = {
  phase: "base" | "out" | "in";
  autoplay: boolean;
  reduced: boolean;
};

export default function TileGrid({ phase, autoplay, reduced }: TileGridProps) {
  const tiles = businessAutomation.closing.tiles;
  const iconTiles = tiles.filter((tile) => tile.kind === "icon");
  const { wrapperRef, scale } = useScaledCanvas(DESIGN_WIDTH, 0);

  const [activeId, setActiveId] = useState("whatsapp");
  const [pointerInside, setPointerInside] = useState(false);
  const canHover = useMediaQuery("(hover: hover)");
  const gridRef = useRef<HTMLDivElement>(null);

  const activeTile = iconTiles.find((tile) => tile.id === activeId) ?? iconTiles[0];
  const activeX = PAD + activeTile.col * PITCH + TILE / 2;
  const activeY = PAD + activeTile.row * PITCH + TILE / 2;

  const tilesX = useSpring(0, { stiffness: 150, damping: 20 });
  const tilesY = useSpring(0, { stiffness: 150, damping: 20 });
  const patternX = useSpring(0, { stiffness: 150, damping: 20 });
  const patternY = useSpring(0, { stiffness: 150, damping: 20 });

  const initialX = PAD + iconTiles.find((tile) => tile.id === "whatsapp")!.col * PITCH + TILE / 2;
  const initialY = PAD + iconTiles.find((tile) => tile.id === "whatsapp")!.row * PITCH + TILE / 2;
  const spotlightX = useSpring(initialX, { stiffness: 120, damping: 20 });
  const spotlightY = useSpring(initialY, { stiffness: 120, damping: 20 });
  const spotlightMask = useMotionTemplate`radial-gradient(150px circle at ${spotlightX}px ${spotlightY}px, #000 0%, transparent 70%)`;

  useEffect(() => {
    spotlightX.set(activeX);
    spotlightY.set(activeY);
  }, [activeX, activeY, spotlightX, spotlightY]);

  useEffect(() => {
    if (!autoplay || reduced || pointerInside) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = CYCLE.indexOf(current);
        return CYCLE[(index + 1) % CYCLE.length];
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [autoplay, pointerInside, reduced]);

  const resetParallax = () => {
    tilesX.set(0);
    tilesY.set(0);
    patternX.set(0);
    patternY.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || reduced) return;
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    tilesX.set(-nx * 6);
    tilesY.set(-ny * 6);
    patternX.set(-nx * 12);
    patternY.set(-ny * 12);
  };

  const handlePointerLeave = () => {
    setPointerInside(false);
    resetParallax();
  };

  const activeLeft = PAD + activeTile.col * PITCH;
  const activeTop = PAD + activeTile.row * PITCH;
  const tipX = activeLeft + 96;
  const tipY = activeTop + 98;

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Connected business workflow with website, payments, orders, shipping, WhatsApp updates, an AI assistant, and customer notifications."
      className="relative mx-auto aspect-[700/470] w-full max-w-[420px] overflow-hidden md:max-w-[560px] lg:-mr-6 lg:max-w-[720px] lg:justify-self-end"
      onPointerEnter={() => setPointerInside(true)}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div
        ref={gridRef}
        aria-hidden="true"
        className="ba-cta-canvas absolute left-0 top-0 h-[470px] w-[700px] origin-top-left"
        data-entrance={phase === "base" ? undefined : phase}
        style={{ transform: `scale(${scale})` }}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{ x: patternX, y: patternY }}
          >
            <div className="ba-cta-plus-base absolute inset-0">
              <PlusPattern id="ba-plus-base" stroke="rgba(255,255,255,0.08)" />
            </div>
            {!reduced && (
              <motion.div
                className="absolute inset-0"
                style={{ maskImage: spotlightMask, WebkitMaskImage: spotlightMask }}
              >
                <PlusPattern id="ba-plus-hot" stroke="rgba(196,181,253,0.24)" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div className="absolute inset-0" style={{ x: tilesX, y: tilesY }}>
          {iconTiles.map((tile) => {
            const left = PAD + tile.col * PITCH;
            const top = PAD + tile.row * PITCH;
            const delay = (tile.row + tile.col) * 70;
            const Icon = tile.icon;
            const filled = tile.style?.variant === "filled";

            return (
              <div
                key={tile.id}
                className="ba-cta-slot absolute"
                style={
                  {
                    left,
                    top,
                    width: TILE,
                    height: TILE,
                    "--slot-delay": `${delay}ms`,
                  } as CSSProperties
                }
              >
                <div
                  className="ba-cta-tile flex h-full w-full items-center justify-center"
                  data-tile={tile.id}
                  data-active={tile.id === activeId ? "true" : undefined}
                  style={
                    filled
                      ? { background: tile.style?.background }
                      : undefined
                  }
                  onPointerEnter={() => {
                    if (canHover && !reduced) setActiveId(tile.id);
                  }}
                >
                  <span
                    className="ba-cta-glyph"
                    style={{ color: filled ? "#FFFFFF" : tile.style?.color }}
                  >
                    {Icon ? <Icon size={44} aria-hidden /> : null}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {!reduced && (
          <motion.span
            key={`ripple-${activeId}`}
            className="ba-cta-ripple pointer-events-none absolute rounded-[36px] border-2 border-white/50"
            style={{
              left: activeLeft,
              top: activeTop,
              width: TILE,
              height: TILE,
            }}
            initial={{ opacity: 0.65, scale: 1 }}
            animate={{ opacity: 0, scale: 1.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        <motion.div
          className="ba-cta-cursor pointer-events-none absolute left-0 top-0"
          initial={{ x: tipX - 2, y: tipY - 2 }}
          animate={{ x: tipX - 2, y: tipY - 2 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 170, damping: 22 }
          }
        >
          <motion.div
            key={`click-${activeId}`}
            initial={{ scale: 1 }}
            animate={reduced ? { scale: 1 } : { scale: [1, 0.88, 1] }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.2, delay: 0.25 }
            }
          >
            <CursorGraphic />
          </motion.div>
        </motion.div>

        <div className="ba-cta-caption absolute left-1/2 top-[428px] flex h-9 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.07] px-4 text-sm text-white/85 backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full bg-white"
            style={{
              background:
                activeTile.style?.variant === "glyph"
                  ? activeTile.style.color
                  : "#FFFFFF",
            }}
          />
          <span
            key={activeId}
            className={reduced ? undefined : "ba-cta-caption-in"}
          >
            {activeTile.caption}
          </span>
        </div>
      </div>
    </div>
  );
}

function PlusPattern({ id, stroke }: { id: string; stroke: string }) {
  return (
    <svg
      width={DESIGN_WIDTH}
      height={470}
      viewBox={`0 0 ${DESIGN_WIDTH} 470`}
      className="absolute left-0 top-0"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="69"
          height="69"
          patternUnits="userSpaceOnUse"
          x="24"
          y="24"
        >
          <path
            d="M34.5 24v21M24 34.5h21"
            stroke={stroke}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width={DESIGN_WIDTH} height={470} fill={`url(#${id})`} />
    </svg>
  );
}

function CursorGraphic() {
  return (
    <svg
      width="48"
      height="52"
      viewBox="0 0 48 52"
      fill="none"
      className="ba-cta-cursor-svg drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ba-cursor-fill" x1="8" y1="6" x2="38" y2="44">
          <stop stopColor="#C4B5FD" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <path
        d="M3 3L41 23L23 27L15 45L3 3Z"
        fill="url(#ba-cursor-fill)"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
