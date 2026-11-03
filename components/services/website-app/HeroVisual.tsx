"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { websiteApp } from "@/lib/content/services/websiteApp";
import { cn } from "@/lib/cn";

type HeroVisualProps = {
  activeId: string;
  onCycle: () => void;
  paused: boolean;
  onUserInteract: () => void;
};

const CYCLE_DURATION = 3400;

const PHOTO_LAYOUT = [
  { id: "c1", left: 60, top: 150, width: 220, height: 150 },
  { id: "c2", left: 140, top: 316, width: 140, height: 190 },
  { id: "c3", left: 300, top: 168, width: 160, height: 250 },
  { id: "c4", left: 306, top: 380, width: 170, height: 112 },
  { id: "c5", left: 372, top: 60, width: 150, height: 98 },
  { id: "c6", left: 486, top: 244, width: 92, height: 140 },
] as const;

export default function HeroVisual({ activeId, onCycle, paused, onUserInteract }: HeroVisualProps) {
  const reduced = useReducedMotion() ?? false;
  const { heroCollage, collageForBuild } = websiteApp;
  const activeCollageId = collageForBuild[activeId] || "c1";

  const { wrapperRef, scale } = useScaledCanvas(600);
  const visualRef = useRef<HTMLDivElement>(null);
  const [entrance, setEntrance] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const inView = useInView(visualRef, { amount: 0.3, once: false });

  useEffect(() => {
    if (reduced) {
      setEntrance(true);
      return;
    }
    setEntrance(true);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    if (paused) return;
    if (hasInteracted) return;

    const next = setTimeout(() => {
      onCycle();
    }, CYCLE_DURATION);

    return () => clearTimeout(next);
  }, [reduced, inView, paused, activeId, hasInteracted, onCycle]);

  const handleInteract = () => {
    setHasInteracted(true);
    onUserInteract();
  };

  return (
    <div
      ref={visualRef}
      role="img"
      aria-label="Collage of website and app designs: business website, online store, mobile app, web application, customer portal and UI/UX design"
      className="relative w-full max-w-[600px] aspect-[600/520] lg:justify-self-end"
      onPointerEnter={handleInteract}
      onFocusCapture={handleInteract}
    >
      <div ref={wrapperRef} className="relative h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-[520px] w-[600px] origin-top-left"
          style={{ scale }}
          initial={entrance && !reduced ? { scale: 1.04 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute left-0 top-0 h-[520px] w-[600px] rounded-[22px]"
              style={{
                background: "#F7F1EA",
                boxShadow: "inset 0 2px 8px rgba(160,130,100,0.15)",
                border: "1px solid rgba(160,130,100,0.18)",
              }}
            />

            <div
              className="absolute rounded-[4px]"
              style={{ left: 214, top: 70, width: 108, height: 40, background: "rgba(217,189,163,0.75)" }}
            />
            <div
              className="absolute rounded-[4px]"
              style={{ left: 482, top: 112, width: 88, height: 112, background: "rgba(217,189,163,0.75)" }}
            />
            <div
              className="absolute rounded-[4px]"
              style={{ left: 482, top: 316, width: 88, height: 96, background: "rgba(217,189,163,0.75)" }}
            />

            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
              <g stroke="#C9A98C" strokeWidth="1" opacity="0.8">
                <motion.path
                  d="M96 150 L214 90"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  fill="none"
                />
                <motion.path
                  d="M322 90 L402 62 L460 44"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  fill="none"
                />
                <motion.path
                  d="M482 112 V60"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  fill="none"
                />
                <motion.path
                  d="M96 336 L36 440"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  fill="none"
                />
                <motion.path
                  d="M300 470 L460 500"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  fill="none"
                />
                <motion.path
                  d="M570 224 L588 250"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  fill="none"
                />
              </g>
              <motion.polygon
                points="258,19 282,42 258,65 234,42"
                stroke="#C9A98C"
                strokeWidth="1.2"
                fill="none"
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </svg>

            {heroCollage.map((item, index) => {
              const layout = PHOTO_LAYOUT.find((l) => l.id === item.id);
              if (!layout) return null;

              const isActive = item.id === activeCollageId;
              const isPortrait = item.ratio === "portrait";

              return (
                <motion.div
                  key={item.id}
                  className="absolute overflow-hidden rounded-[6px]"
                  style={{
                    left: layout.left,
                    top: layout.top,
                    width: layout.width,
                    height: layout.height,
                    boxShadow: "0 10px 24px rgba(60,40,20,0.28)",
                    zIndex: isActive ? 10 : 1,
                  }}
                  initial={
                    entrance && !reduced
                      ? {
                          x: (Math.random() - 0.5) * 80,
                          y: (Math.random() - 0.5) * 80,
                          rotate: (Math.random() - 0.5) * 6,
                          scale: 0.92,
                        }
                      : { x: 0, y: 0, rotate: 0, scale: 1 }
                  }
                  animate={{
                    x: 0,
                    y: isActive ? 0 : 0,
                    rotate: 0,
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : hasInteracted ? 0.78 : 1,
                  }}
                  transition={{
                    delay: index * 0.09,
                    type: "spring",
                    stiffness: 160,
                    damping: 22,
                  }}
                  whileHover={{ y: -4 }}
                  onPointerEnter={handleInteract}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-[6px]"
                      style={{
                        border: "2px solid #8B7CFF",
                        boxShadow: "0 0 20px rgba(139,124,255,0.4)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}

                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(min-width:1024px) 220px, 40vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-3"
                      style={{
                        background: isPortrait
                          ? "linear-gradient(180deg, #E8E4E0 0%, #D4D0CC 100%)"
                          : "linear-gradient(180deg, #E0DCD8 0%, #CCC8C4 100%)",
                      }}
                    >
                      {isPortrait ? (
                        <div className="w-full h-full border-2 border-dashed border-[#B0ABA5] rounded-lg flex flex-col gap-2 p-2">
                          <div className="h-2 bg-[#A09C96] rounded w-1/2" />
                          <div className="h-2 bg-[#A09C96] rounded w-3/4" />
                          <div className="h-2 bg-[#A09C96] rounded w-1/2" />
                        </div>
                      ) : (
                        <div className="w-full h-full border-2 border-dashed border-[#B0ABA5] rounded-lg flex flex-col gap-2 p-2">
                          <div className="h-3 bg-[#A09C96] rounded flex gap-1 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#8C8884]" />
                            <div className="w-2 h-2 rounded-full bg-[#8C8884]" />
                            <div className="w-2 h-2 rounded-full bg-[#8C8884]" />
                          </div>
                          <div className="h-8 bg-[#A09C96] rounded" />
                          <div className="h-8 bg-[#A09C96] rounded" />
                          <div className="h-8 bg-[#A09C96] rounded" />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-2 right-2 text-[9px] text-[#8C8884] text-center leading-tight">
                        {item.shotLabel}
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] text-white backdrop-blur",
                      isActive ? "bg-black/55" : "bg-black/40"
                    )}
                  >
                    {item.tag}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
