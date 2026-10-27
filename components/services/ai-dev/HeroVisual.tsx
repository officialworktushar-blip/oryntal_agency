"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { aiDev } from "@/lib/content/services/aiDev";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";

type HeroVisualProps = {
  activeId: string;
  onCycle: () => void;
  paused: boolean;
  onUserInteract: () => void;
  onActiveChange?: (id: string) => void;
};

export default function HeroVisual({ activeId, onCycle, paused, onUserInteract, onActiveChange }: HeroVisualProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { wrapperRef, scale } = useScaledCanvas(600, 0.7);
  const [showCapabilityIcon, setShowCapabilityIcon] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const activeItem = aiDev.build.find((item) => item.id === activeId) || aiDev.build[0];

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
    { id: "chatbots", left: 36, top: 20 },
    { id: "voice", left: 462, top: 24 },
    { id: "rag", left: 500, top: 196 },
    { id: "vision", left: 452, top: 376 },
    { id: "llm", left: 30, top: 376 },
    { id: "workflow", left: 24, top: 190 },
  ];

  const isTileActive = (id: string) => id === activeId || id === hoveredTile;

  return (
    <div
      ref={ref}
      id="ai-visual"
      role="tabpanel"
      aria-label={aiDev.visual.srCaption}
      className="relative w-full max-w-[600px] aspect-[600/460] lg:justify-self-end"
    >
      <div ref={wrapperRef} className="relative w-full h-full">
        <div
          className="absolute inset-0 bg-black"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {/* Grid lines */}
          <svg
            viewBox="0 0 600 460"
            fill="none"
            className="absolute inset-0 w-full h-full"
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
            viewBox="0 0 600 460"
            fill="none"
            className="absolute inset-0 w-full h-full"
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
                <div className="relative w-[76px] h-[76px] rounded-2xl bg-[#17171A] border border-white/10 flex items-center justify-center">
                  <activeItem.icon size={56} className="text-white" />
                </div>
              ) : (
                <div className="relative w-[96px] h-[96px]">
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
            {aiDev.visual.centreLabel}
          </div>

          {/* Corner tiles */}
          {tiles.map((tile) => {
            const item = aiDev.build.find((b) => b.id === tile.id);
            if (!item) return null;
            const active = isTileActive(tile.id);
            const Icon = item.icon;

            return (
              <div
                key={tile.id}
                className="absolute rounded-[18px] cursor-pointer transition-transform duration-200 hover:scale-105"
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
                  <div
                    className="absolute bottom-0 left-0 right-0 text-center text-[11px] text-white/50 pb-2"
                  >
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}

          {/* Caption chip */}
          <div
            className="absolute rounded-full bg-white/8 border border-white/12 backdrop-blur px-4 py-2 text-[13px] text-white"
            style={{
              left: 300,
              top: 420,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#19d3a2] animate-pulse" />
              <span>
                {activeItem.title} · {activeItem.caption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
