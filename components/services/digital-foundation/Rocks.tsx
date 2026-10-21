"use client";

import Image from "next/image";
import { m, useTransform, type MotionValue } from "framer-motion";
import type { RockSpec } from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";

/**
 * Low-poly rock silhouettes. Each rock is a handful of irregular facets
 * drawn in a 200×160 view box, filled with dark blues and edged with a
 * faint highlight so they read as faceted stone, not flat blobs.
 */
const FACET_SETS: string[][] = [
  [
    "M20 118 L44 44 L96 82 Z",
    "M44 44 L118 16 L96 82 Z",
    "M118 16 L184 60 L96 82 Z",
    "M184 60 L170 128 L96 82 Z",
    "M170 128 L94 152 L96 82 Z",
    "M94 152 L20 118 L96 82 Z",
  ],
  [
    "M34 140 L18 86 L58 52 Z",
    "M18 86 L58 52 L104 74 Z",
    "M58 52 L96 12 L104 74 Z",
    "M96 12 L152 30 L104 74 Z",
    "M152 30 L186 84 L104 74 Z",
    "M186 84 L160 140 L104 74 Z",
    "M160 140 L34 140 L104 74 Z",
  ],
  [
    "M40 132 L16 78 L70 44 Z",
    "M16 78 L70 44 L118 66 Z",
    "M70 44 L104 8 L118 66 Z",
    "M104 8 L162 22 L118 66 Z",
    "M162 22 L190 72 L118 66 Z",
    "M190 72 L176 132 L118 66 Z",
    "M176 132 L108 156 L118 66 Z",
    "M108 156 L40 132 L118 66 Z",
  ],
  [
    "M26 130 L52 60 L110 92 Z",
    "M52 60 L128 34 L110 92 Z",
    "M128 34 L180 72 L110 92 Z",
    "M180 72 L162 136 L110 92 Z",
    "M162 136 L80 154 L110 92 Z",
    "M80 154 L26 130 L110 92 Z",
  ],
];

/** Facet fills, dark steel-blue to near-black. */
const FILLS = ["#1A2330", "#232F3E", "#111720", "#2A3342", "#161D27", "#1E2836"];

const FLOAT_DURATIONS = [9, 11, 13, 10];

type RockProps = {
  spec: RockSpec;
  index: number;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
};

function Rock({ spec, index, parallaxX, parallaxY, reduced, visible }: RockProps) {
  const facets = FACET_SETS[index % FACET_SETS.length];
  const gradientId = `dfi-rock-${index}`;

  const x = useTransform(parallaxX, (v) => v * 16);
  const y = useTransform(parallaxY, (v) => v * 16);
  const tilt = spec.tilt ?? 0;

  return (
    <div
      aria-hidden="true"
      style={{
        left: `${spec.x}%`,
        top: `${spec.y}%`,
        width: `${spec.w}%`,
        zIndex: spec.z ?? 0,
      }}
      className={cn(
        "pointer-events-none absolute",
        spec.lgOnly ? "hidden lg:block" : "hidden md:block",
      )}
    >
      <m.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, rotate: tilt - 6 }}
        animate={visible ? { opacity: 1, y: 0, rotate: tilt } : { opacity: 0, y: 30 }}
        transition={{
          duration: reduced ? 0.3 : 0.9,
          delay: reduced ? 0 : 0.35 + index * 0.12,
          ease: "easeOut",
        }}
        style={reduced ? undefined : { x, y }}
      >
        <m.div
          animate={
            reduced
              ? undefined
              : { y: [0, -10, 0], rotate: [tilt - 3, tilt + 3, tilt - 3] }
          }
          transition={{
            duration: FLOAT_DURATIONS[index % FLOAT_DURATIONS.length],
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1.1,
          }}
        >
          {spec.src ? (
            <Image
              src={spec.src}
              alt=""
              width={400}
              height={320}
              className="h-auto w-full opacity-85"
            />
          ) : (
            <svg
              viewBox="0 0 200 160"
              className="h-auto w-full drop-shadow-[0_26px_50px_rgba(0,0,0,0.5)]"
              role="presentation"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0E1118" />
                  <stop offset="1" stopColor="#2A3342" />
                </linearGradient>
              </defs>
              {facets.map((d, i) => (
                <polygon
                  key={d}
                  d={d}
                  fill={i % 3 === 0 ? `url(#${gradientId})` : FILLS[i % FILLS.length]}
                  stroke="rgba(160,185,215,0.25)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              ))}
              {spec.icy ? (
                <polygon
                  d={facets[2]}
                  fill="#AFC6DB"
                  fillOpacity="0.6"
                  stroke="rgba(205,225,245,0.4)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              ) : null}
            </svg>
          )}
        </m.div>
      </m.div>
    </div>
  );
}

/**
 * Dark faceted rocks floating around the stage. Purely decorative.
 */
export default function Rocks({
  rocks,
  parallaxX,
  parallaxY,
  reduced,
  visible,
}: {
  rocks: RockSpec[];
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
}) {
  return (
    <>
      {rocks.map((spec, i) => (
        <Rock
          key={spec.id}
          spec={spec}
          index={i}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reduced={reduced}
          visible={visible}
        />
      ))}
    </>
  );
}
