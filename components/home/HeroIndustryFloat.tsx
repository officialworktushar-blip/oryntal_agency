"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { industries, type Industry } from "@/lib/content/industries";
import { cn } from "@/lib/cn";

type Slot = {
  /** Vertical offset from the top of the hero, in px. */
  top: number;
  /** Tile size as a CSS clamp() so it scales with the viewport. */
  size: string;
  /** Distance from the hero edge, in % of the viewport width. */
  inset: number;
  /** Drift amplitude in px. */
  drift: number;
  /** Horizontal drift period in seconds. */
  period: number;
  /** Phase offset in seconds so no two niches move in lockstep. */
  phase: number;
  /** Tilt amplitude in degrees. */
  tilt: number;
};

/* Five niches drift down the left edge of the hero, five down the right. */
const LEFT_SLOTS: Slot[] = [
  { top: 205, size: "clamp(34px, 3.6vw, 54px)", inset: 1, drift: 12, period: 13, phase: 0, tilt: 8 },
  { top: 288, size: "clamp(30px, 3vw, 46px)", inset: 0.5, drift: 10, period: 11, phase: 2.3, tilt: -7 },
  { top: 366, size: "clamp(36px, 4vw, 62px)", inset: 1.2, drift: 13, period: 15, phase: 4.1, tilt: 6 },
  { top: 448, size: "clamp(32px, 3.2vw, 48px)", inset: 0.6, drift: 11, period: 12, phase: 1.4, tilt: -9 },
  { top: 522, size: "clamp(36px, 3.8vw, 56px)", inset: 1, drift: 12, period: 14, phase: 3.2, tilt: 7 },
];

const RIGHT_SLOTS: Slot[] = [
  { top: 232, size: "clamp(32px, 3.2vw, 48px)", inset: 1.6, drift: 11, period: 12, phase: 1.1, tilt: -6 },
  { top: 312, size: "clamp(36px, 4vw, 58px)", inset: 1.4, drift: 13, period: 14, phase: 3.6, tilt: 8 },
  { top: 392, size: "clamp(28px, 2.8vw, 42px)", inset: 1.8, drift: 10, period: 10, phase: 5.2, tilt: -7 },
  { top: 466, size: "clamp(34px, 3.6vw, 54px)", inset: 1.3, drift: 12, period: 13, phase: 0.7, tilt: 6 },
  { top: 538, size: "clamp(30px, 3vw, 46px)", inset: 1.7, drift: 11, period: 16, phase: 2.9, tilt: -8 },
];

type FloatTileProps = {
  item: Industry;
  slot: Slot;
  side: "left" | "right";
  index: number;
  revealed: boolean;
  reduced: boolean;
};

function FloatTile({
  item,
  slot,
  side,
  index,
  revealed,
  reduced,
}: FloatTileProps) {
  const Icon = item.icon;

  return (
    <m.div
      className="absolute"
      style={{
        top: slot.top,
        [side === "left" ? "left" : "right"]: `${slot.inset}%`,
        width: slot.size,
        height: slot.size,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: reduced ? 0.4 : 0.7,
        delay: reduced ? index * 0.05 : 0.25 + index * 0.08,
        ease: "easeOut",
      }}
    >
      {/* Horizontal drift — centred on the anchor so it never drifts into the copy */}
      <m.div
        animate={
          reduced
            ? undefined
            : { x: [-slot.drift / 2, slot.drift / 2, -slot.drift / 2] }
        }
        transition={{
          duration: slot.period,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: slot.phase,
        }}
      >
        {/* Vertical bob + tilt — a different period, so the path never repeats */}
        <m.div
          animate={
            reduced
              ? undefined
              : {
                  y: [-slot.drift, slot.drift, -slot.drift],
                  rotate: [0, slot.tilt, 0],
                }
          }
          transition={{
            duration: slot.period * 1.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: slot.phase * 0.7,
          }}
        >
          <div
            role="img"
            aria-label={item.name}
            className={cn(
              "float-tile group pointer-events-auto relative flex size-full",
              "items-center justify-center rounded-[26%] outline-none",
              "transition-[border-color,transform] duration-300 ease-out",
              "motion-safe:hover:scale-110",
            )}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.6}
              className="h-[48%] w-[48%] text-[var(--float-industry-icon)]"
            />

            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2",
                "whitespace-nowrap rounded-full border border-white/15 bg-white/10",
                "px-3 py-1 text-xs text-white backdrop-blur-md",
                "opacity-0 transition-opacity duration-200",
                "group-hover:opacity-100 xl:block",
                side === "left" ? "left-full ml-2" : "right-full mr-2",
              )}
            >
              {item.name}
            </span>
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
}

export default function HeroIndustryFloat() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useInView(ref, { amount: "some", once: true });

  const left = industries.slice(0, 5);
  const right = industries.slice(5, 10);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      <ul
        role="list"
        aria-label="Industries ORYNTAL builds for"
        className="absolute inset-0"
      >
        {left.map((item, index) => (
          <FloatTile
            key={item.id}
            item={item}
            slot={LEFT_SLOTS[index]}
            side="left"
            index={index}
            revealed={revealed}
            reduced={reduced}
          />
        ))}
        {right.map((item, index) => (
          <FloatTile
            key={item.id}
            item={item}
            slot={RIGHT_SLOTS[index]}
            side="right"
            index={index + left.length}
            revealed={revealed}
            reduced={reduced}
          />
        ))}
      </ul>
    </div>
  );
}
