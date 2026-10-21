"use client";

import Image from "next/image";
import { m, useTransform, type MotionValue } from "framer-motion";
import type { RockSpec } from "@/lib/content/packages/digitalFoundation";

/** Facet outlines of the procedural rock, in a 200×160 view box. */
const FACETS = [
  "M20 120 L45 45 L100 85 Z",
  "M45 45 L120 18 L100 85 Z",
  "M120 18 L185 62 L100 85 Z",
  "M185 62 L170 130 L100 85 Z",
  "M170 130 L95 152 L100 85 Z",
  "M95 152 L20 120 L100 85 Z",
];

const FILLS = ["#1B2430", "#26313F", "#151C26", "#2A3342", "#1A222C", "#222B37"];

const TILTS = [-7, 6, -4, 9];

type RockProps = {
  spec: RockSpec;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
};

function Rock({ spec, index, progress, reduced }: RockProps) {
  const y = useTransform(progress, [0, 1], [spec.depth * 30, spec.depth * -30]);

  return (
    <m.div
      aria-hidden="true"
      style={{
        left: `${spec.x}%`,
        top: `${spec.y}%`,
        width: `${spec.w}%`,
        ...(reduced ? {} : { y }),
      }}
      className="pointer-events-none absolute z-0 hidden md:block"
    >
      <m.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 6 + index * 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7,
        }}
        style={{ rotate: TILTS[index % TILTS.length] }}
      >
        {spec.src ? (
          <Image
            src={spec.src}
            alt=""
            width={400}
            height={320}
            className="h-auto w-full opacity-80"
          />
        ) : (
          <svg
            viewBox="0 0 200 160"
            className="h-auto w-full drop-shadow-[0_24px_44px_rgba(0,0,0,0.45)]"
          >
            {FACETS.map((d, i) => (
              <polygon
                key={d}
                d={d}
                fill={FILLS[i]}
                stroke="rgba(160,185,215,0.25)"
                strokeWidth="1"
              />
            ))}
            {spec.icy ? (
              <polygon
                d={FACETS[2]}
                fill="#AFC6DB"
                fillOpacity="0.6"
                stroke="rgba(200,220,240,0.35)"
                strokeWidth="1"
              />
            ) : null}
          </svg>
        )}
      </m.div>
    </m.div>
  );
}

/**
 * Faceted rocks floating in the stage background.
 * They drift with the scroll and breathe with a slow float.
 */
export default function Rocks({
  rocks,
  progress,
  reduced,
}: {
  rocks: RockSpec[];
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <>
      {rocks.map((spec, i) => (
        <Rock
          key={spec.id}
          spec={spec}
          index={i}
          progress={progress}
          reduced={reduced}
        />
      ))}
    </>
  );
}
