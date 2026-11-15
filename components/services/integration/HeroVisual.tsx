"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { integration } from "@/lib/content/services/integration";

type HeroVisualProps = {
  activeId: string;
  onCycle: () => void;
  paused: boolean;
  onUserInteract: () => void;
  onActiveChange?: (id: string) => void;
};

const DESIGN_WIDTH = 600;
const DESIGN_HEIGHT = 460;

export default function HeroVisual({ activeId, onCycle, paused, onUserInteract, onActiveChange }: HeroVisualProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [scale, setScale] = useState(1);
  const [showCapabilityIcon, setShowCapabilityIcon] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const activeItem = integration.build.find((item) => item.id === activeId) || integration.build[0];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setScale(Math.min(1, width / DESIGN_WIDTH));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cycle timer
  useEffect(() => {
    if (reduced || paused || !inView) return;

    const cycleInterval = setInterval(() => {
      onCycle();
    }, 3400);

    return () => clearInterval(cycleInterval);
  }, [reduced, paused, inView, onCycle]);

  // Show capability icon briefly when active
  useEffect(() => {
    if (reduced) return;
    setShowCapabilityIcon(true);
    const t = setTimeout(() => setShowCapabilityIcon(false), 1800);
    return () => clearTimeout(t);
  }, [activeId, reduced]);

  // Hover handling
  const handleTileHover = (id: string) => {
    if (reduced) return;
    setHoveredTile(id);
    onUserInteract();
  };

  const handleTileLeave = () => {
    setHoveredTile(null);
  };

  const handleTileClick = (id: string) => {
    onUserInteract();
    if (onActiveChange) {
      onActiveChange(id);
    }
  };

  // Tile positions (left, top in canvas coordinates)
  const tiles = [
    { id: "apis", left: 36, top: 20 },
    { id: "payments", left: 462, top: 24 },
    { id: "comms", left: 500, top: 196 },
    { id: "insights", left: 452, top: 376 },
    { id: "data", left: 30, top: 376 },
    { id: "crm", left: 24, top: 190 },
  ];

  const isTileActive = (id: string) => id === activeId || id === hoveredTile;

  return (
    <div className="w-full min-w-0">
      <div
        ref={ref}
        id="ai-visual"
        role="tabpanel"
        aria-label={integration.visual.srCaption}
        className="relative mx-auto aspect-[600/460] w-full min-w-0 max-w-[600px] overflow-hidden lg:justify-self-end"
      >
        <div
          className="absolute left-0 top-0 h-[460px] w-[600px] origin-top-left bg-black"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Grid lines */}
          <svg
            width={DESIGN_WIDTH}
            height={DESIGN_HEIGHT}
            viewBox="0 0 600 460"
            fill="none"
            className="absolute left-0 top-0 hidden sm:block"
            aria-hidden="true"
          >
            {/* Horizontal lines */}
            <line x1="120" y1="58" x2="560" y2="58" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="40" y1="134" x2="500" y2="134" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="150" y1="380" x2="600" y2="380" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="0" y1="441" x2="440" y2="441" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            {/* Vertical lines */}
            <line x1="112" y1="110" x2="112" y2="430" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="196" y1="20" x2="196" y2="400" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="336" y1="0" x2="336" y2="440" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="508" y1="70" x2="508" y2="330" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <line x1="548" y1="40" x2="548" y2="300" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          </svg>

          {/* Lilac segments - frame edges */}
          <svg
            width={DESIGN_WIDTH}
            height={DESIGN_HEIGHT}
            viewBox="0 0 600 460"
            fill="none"
            className="absolute left-0 top-0"
            aria-hidden="true"
          >
            <path
              d="M196 168 V332"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M196 168 H400"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M196 332 H520"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M400 168 V440"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Outer accents */}
            <path
              d="M236 58 H392"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M452 58 H498 V112"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M112 360 V420 H176"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M20 330 H196"
              stroke="#7B65F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>

          {/* Centre frame */}
          <div
            className="absolute bg-black"
            style={{
              left: 196,
              top: 168,
              width: 204,
              height: 164,
            }}
          >
            {/* Logo or capability icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {showCapabilityIcon && activeItem ? (
                <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-white/10 bg-[#17171A]">
                  <activeItem.icon size={56} className="text-white" />
                </div>
              ) : (
                <div className="relative h-[96px] w-[96px]">
                  <Image
                    src="/logo.png"
                    alt="ORYNTAL"
                    fill
                    className="object-contain"
                    style={{ filter: "drop-shadow(0 0 24px rgba(123,92,255,.55))" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Centre label */}
          <div
            className="absolute text-center text-[12px] text-white/55"
            style={{
              left: 196,
              top: 344,
              width: 204,
            }}
          >
            {integration.visual.centreLabel}
          </div>

          {/* Corner tiles */}
          {tiles.map((tile) => {
            const item = integration.build.find((b) => b.id === tile.id);
            if (!item) return null;
            const active = isTileActive(tile.id);
            const Icon = item.icon;

            return (
              <div
                key={tile.id}
                className="absolute cursor-pointer rounded-[18px] transition-transform duration-200 lg:hover:scale-105"
                style={{
                  left: tile.left,
                  top: tile.top,
                  width: 74,
                  height: 74,
                  background: "linear-gradient(150deg, #1D1D22, #111114)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: active
                    ? "0 0 0 3px rgba(139,124,255,.5), 0 0 30px rgba(123,92,255,.6)"
                    : "0 14px 30px rgba(0,0,0,.6)",
                }}
                onMouseEnter={() => handleTileHover(tile.id)}
                onMouseLeave={handleTileLeave}
                onClick={() => handleTileClick(tile.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    size={34}
                    className={active ? "text-[#B9A8FF]" : "text-white/80"}
                  />
                </div>
                {/* Label on hover/active */}
                {(active || hoveredTile === tile.id) && (
                  <div className="absolute bottom-0 left-0 right-0 hidden pb-2 text-center text-[11px] text-white/50 sm:block">
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption pill */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex w-auto max-w-full items-center gap-2 whitespace-normal rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center text-[13px] leading-snug text-white backdrop-blur">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#19d3a2]" aria-hidden="true" />
          <span>
            {activeItem.title} · {activeItem.caption}
          </span>
        </div>
      </div>
    </div>
  );
}
