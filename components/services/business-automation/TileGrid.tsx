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
const DESIGN_HEIGHT = 470;

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
  const whatsappTile =
    iconTiles.find((tile) => tile.id === "whatsapp") ?? iconTiles[0];

  const activeX = PAD + activeTile.col * PITCH + TILE / 2;
  const activeY = PAD + activeTile.row * PITCH + TILE / 2;

  const tilesX = useSpring(0, { stiffness: 150, damping: 20 });
  const tilesY = useSpring(0, { stiffness: 150, damping: 20 });
  const patternX = useSpring(0, { stiffness: 150, damping: 20 });
  const patternY = useSpring(0, { stiffness: 150, damping: 20 });

  const spotlightX = useSpring(PAD + whatsappTile.col * PITCH + TILE / 2, {
    stiffness: 120,
    damping: 20,
  });
  const spotlightY = useSpring(PAD + whatsappTile.row * PITCH + TILE / 2, {
    stiffness: 120,
    damping: 20,
  });
  const spotlightMask = useMotionTemplate`radial-gradient(150px circle at ${spotlightX}px ${spotlightY}px, #000 0%, transparent 70%)`;

  useEffect(() => {
    spotlightX.set(activeX);
    spotlightY.set(activeY);
  }, [activeX, activeY, spotlightX, spotlightY]);

  // TEMP DEBUG
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const timer = window.setTimeout(() => {
      const rect = wrapper.getBoundingClientRect();
      // eslint-disable-next-line no-console
      console.log("[ba-cta] wrapper", { width: rect.width, height: rect.height }, "scale", scale);
      wrapper.setAttribute(
        "data-debug",
        `${Math.round(rect.width)}x${Math.round(rect.height)}:${scale.toFixed(3)}`,
      );
    }, 500);
    return () => window.clearTimeout(timer);
  }, [scale, wrapperRef]);

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
      aria-label="Icons for website, payments, orders, WhatsApp, shipping, AI assistant and notifications connected in one workflow"
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
              <PlusPattern id="ba-plus-base" stroke="rgba(255,255,255,0.10)" />
            </div>
            {!reduced && (
              <motion.div
                className="absolute inset-0"
                style={{ maskImage: spotlightMask, WebkitMaskImage: spotlightMask }}
              >
                <PlusPattern id="ba-plus-hot" stroke="rgba(190,170,255,0.65)" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div className="absolute inset-0" style={{ x: tilesX, y: tilesY }}>
          {tiles.map((tile) => {
            const left = PAD + tile.col * PITCH;
            const top = PAD + tile.row * PITCH;
            const delay = (tile.row + tile.col) * 70;
            const filled = tile.style?.variant === "filled";
            const Icon = tile.icon;

            if (tile.kind === "empty") {
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
                  <div className="ba-cta-tile ba-cta-empty h-full w-full" />
                </div>
              );
            }

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
                  onPointerEnter={() => {
                    if (canHover && !reduced) setActiveId(tile.id);
                  }}
                >
                  {filled ? (
                    <span
                      className="ba-cta-filled flex items-center justify-center"
                      style={{ background: tile.style?.background }}
                    >
                      <span className="ba-cta-glyph" style={{ color: "#FFFFFF" }}>
                        {Icon ? <Icon size={32} aria-hidden /> : null}
                      </span>
                    </span>
                  ) : (
                    <span className="ba-cta-glyph" style={{ color: tile.style?.color }}>
                      {Icon ? <Icon size={58} aria-hidden /> : null}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {!reduced && (
          <motion.span
            key={`ripple-${activeId}`}
            className="ba-cta-ripple pointer-events-none absolute rounded-[22px] border-[1.5px] border-[rgba(155,149,255,0.7)]"
            style={{
              left: activeLeft,
              top: activeTop,
              width: TILE,
              height: TILE,
            }}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8 }}
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
              : { type: "spring", stiffness: 120, damping: 20 }
          }
        >
          <motion.div
            key={`click-${activeId}`}
            initial={{ scale: 1 }}
            animate={reduced ? { scale: 1 } : { scale: [1, 0.88, 1] }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.18, delay: 0.22 }
            }
          >
            <CursorGraphic />
          </motion.div>
        </motion.div>

        <div className="ba-cta-caption absolute left-1/2 top-[428px] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-sm text-white backdrop-blur">
          <span className="ba-cta-caption-dot h-1.5 w-1.5 rounded-full bg-[#25D366]" />
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
      height={DESIGN_HEIGHT}
      viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
      className="absolute left-0 top-0"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="69"
          height="69"
          patternUnits="userSpaceOnUse"
          x="-42.5"
          y="-42.5"
        >
          <path
            d="M34.5 27.5v14M27.5 34.5h14"
            stroke={stroke}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width={DESIGN_WIDTH} height={DESIGN_HEIGHT} fill={`url(#${id})`} />
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
          <stop stopColor="#7B4DFF" />
          <stop offset="1" stopColor="#2A1478" />
        </linearGradient>
      </defs>
      <path
        d="M3 3L41 23L23 27L15 45L3 3Z"
        fill="url(#ba-cursor-fill)"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
