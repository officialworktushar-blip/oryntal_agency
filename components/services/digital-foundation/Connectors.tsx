"use client";

import { m } from "framer-motion";

/** Connector routes, in canvas pixels. */
const PATHS = [
  "M828 318 H861 Q875 318 875 304 V185",
  "M828 270 H920 Q934 270 934 256 V203",
];

type ConnectorsProps = {
  reduced: boolean;
  visible: boolean;
  /** Pulses only run while the stage is on screen and the tab is active. */
  playing: boolean;
};

export default function Connectors({ reduced, visible, playing }: ConnectorsProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 15 }}
    >
      <svg
        viewBox="0 0 980 430"
        width="980"
        height="430"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <filter id="dfPulseGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {PATHS.map((d, index) => (
          <g key={d}>
            <m.path
              d={d}
              stroke="#FFFFFF"
              strokeOpacity={0.9}
              strokeWidth={1.3}
              strokeLinecap="round"
              fill="none"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: visible ? 1 : 0 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                delay: reduced ? 0 : 1 + index * 0.12,
                ease: "easeInOut",
              }}
            />
            {!reduced && playing ? (
              <circle
                r={2.5}
                fill="#9B95FF"
                filter="url(#dfPulseGlow)"
                opacity={0.95}
              >
                <animateMotion
                  dur="4s"
                  begin={`${index * 1.2}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1"
                />
              </circle>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}
