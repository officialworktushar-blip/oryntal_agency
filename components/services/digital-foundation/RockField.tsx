"use client";

import Image from "next/image";
import { m, useTransform, type MotionValue } from "framer-motion";
import type { ShowcaseDebris, ShowcaseRock } from "@/lib/content/packages/digitalFoundation";

/** Deterministic PRNG so every render (and the server) draws the same stone. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = { x: number; y: number };

type Facet = {
  points: Point[];
  /** 0 = darkest face, 1 = brightest face. */
  light: number;
};

type RockPalette = {
  dark: string;
  mid: string;
  light: string;
  edge: string;
  specular: string;
  specularAlpha: number;
  opacity: number;
};

const PALETTES: Record<ShowcaseRock["kind"], RockPalette> = {
  obsidian: {
    dark: "#080B10",
    mid: "#18222E",
    light: "#2B3747",
    edge: "rgba(160,185,215,0.2)",
    specular: "#6F849E",
    specularAlpha: 0.35,
    opacity: 1,
  },
  ice: {
    dark: "#9FB8CF",
    mid: "#C4D6E6",
    light: "#EAF3FA",
    edge: "rgba(255,255,255,0.6)",
    specular: "#FFFFFF",
    specularAlpha: 0.55,
    opacity: 0.78,
  },
};

/** Light comes from the top-left of the stage. */
const LIGHT = { x: -0.55, y: -0.78 };

function shade(
  palette: RockPalette,
  light: number,
  index: number,
): string {
  if (index % 7 === 3) {
    return palette.specular;
  }
  if (light < 0.34) return palette.dark;
  if (light < 0.62) return palette.mid;
  return palette.light;
}

/** Builds the faceted outline of one rock inside a w × h box. */
function buildRock(w: number, h: number, seed: number): { facets: Facet[] } {
  const rand = mulberry32(seed);
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2;
  const ry = h / 2;

  const outerCount = 12 + Math.floor(rand() * 4);
  const innerCount = 7 + Math.floor(rand() * 3);

  const outer: Point[] = [];
  for (let i = 0; i < outerCount; i += 1) {
    const angle = (i / outerCount) * Math.PI * 2 - Math.PI / 2;
    const radius = 0.72 + rand() * 0.28;
    const wobble = 0.94 + rand() * 0.12;
    outer.push({
      x: cx + Math.cos(angle) * rx * radius * wobble,
      y: cy + Math.sin(angle) * ry * radius * wobble,
    });
  }

  const inner: Point[] = [];
  for (let i = 0; i < innerCount; i += 1) {
    const angle = (i / innerCount) * Math.PI * 2 - Math.PI / 2 + 0.2;
    const radius = 0.34 + rand() * 0.2;
    inner.push({
      x: cx + Math.cos(angle) * rx * radius,
      y: cy + Math.sin(angle) * ry * radius,
    });
  }

  const centre: Point = { x: cx, y: cy };

  const facets: Facet[] = [];

  const push = (points: Point[]) => {
    const [a, b, c] = points;
    // 2D normal of the triangle, used for flat shading.
    const e1 = { x: b.x - a.x, y: b.y - a.y };
    const e2 = { x: c.x - a.x, y: c.y - a.y };
    const normal = { x: e1.y - e2.y, y: e2.x - e1.x };
    const length = Math.hypot(normal.x, normal.y) || 1;
    const unit = { x: normal.x / length, y: normal.y / length };
    const facing = unit.x * LIGHT.x + unit.y * LIGHT.y;
    const light = Math.min(1, Math.max(0, facing * 0.5 + 0.5));
    facets.push({ points, light });
  };

  for (let i = 0; i < outerCount; i += 1) {
    const a = outer[i];
    const b = outer[(i + 1) % outerCount];
    const anchor = inner[i % innerCount];
    push([a, b, anchor]);
  }

  for (let i = 0; i < innerCount; i += 1) {
    const a = inner[i];
    const b = inner[(i + 1) % innerCount];
    push([a, b, centre]);
  }

  return { facets };
}

function pathOf(points: Point[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

type RockProps = {
  rock: ShowcaseRock;
  index: number;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
};

function Rock({ rock, index, parallaxX, parallaxY, reduced, visible }: RockProps) {
  const x = useTransform(parallaxX, (v) => -v * 14);
  const y = useTransform(parallaxY, (v) => -v * 14);
  const palette = PALETTES[rock.kind];
  const { facets } = buildRock(rock.w, rock.h, rock.seed);
  const duration = 9 + (index % 5);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: rock.x,
        top: rock.y,
        width: rock.w,
        height: rock.h,
        zIndex: rock.z,
      }}
    >
      <m.div
        style={reduced ? undefined : { x, y }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{
          duration: reduced ? 0.3 : 0.6,
          delay: reduced ? 0 : 0.05 + index * 0.07,
          ease: "easeOut",
        }}
      >
        <m.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [rock.rotation - 3, rock.rotation + 3, rock.rotation - 3],
                }
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.9,
          }}
          style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.35))" }}
        >
          {rock.src ? (
            <Image
              src={rock.src}
              alt=""
              width={rock.w}
              height={rock.h}
              className="h-full w-full object-contain"
            />
          ) : (
            <svg
              viewBox={`0 0 ${rock.w} ${rock.h}`}
              width={rock.w}
              height={rock.h}
              className="h-full w-full"
              style={{ opacity: palette.opacity }}
            >
              {facets.map((facet, i) => (
                <path
                  key={`${rock.id}-${i}`}
                  d={pathOf(facet.points)}
                  fill={shade(palette, facet.light, i)}
                  fillOpacity={
                    palette.specularAlpha < 1 && i % 7 === 3
                      ? palette.specularAlpha
                      : 1
                  }
                  stroke={palette.edge}
                  strokeWidth={0.6}
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          )}
        </m.div>
      </m.div>
    </div>
  );
}

type DebrisProps = {
  chip: ShowcaseDebris;
  index: number;
  reduced: boolean;
  visible: boolean;
};

function Debris({ chip, index, reduced, visible }: DebrisProps) {
  const points: Point[] = [];
  const rand = mulberry32(chip.size * 977 + chip.x);
  for (let i = 0; i < 5; i += 1) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = chip.size * (0.6 + rand() * 0.5);
    points.push({
      x: chip.size / 2 + Math.cos(angle) * radius,
      y: chip.size / 2 + Math.sin(angle) * radius,
    });
  }

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: chip.x, top: chip.y, width: chip.size, height: chip.size }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: reduced ? 0.3 : 0.5,
        delay: reduced ? 0 : 0.4 + index * 0.05,
        ease: "easeOut",
      }}
    >
      <svg viewBox={`0 0 ${chip.size} ${chip.size}`} width={chip.size} height={chip.size}>
        <path
          d={pathOf(points)}
          fill="#1D2734"
          stroke="rgba(160,185,215,0.22)"
          strokeWidth={0.5}
        />
      </svg>
    </m.div>
  );
}

type RockFieldProps = {
  rocks: ShowcaseRock[];
  debris: ShowcaseDebris[];
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
};

export default function RockField({
  rocks,
  debris,
  parallaxX,
  parallaxY,
  reduced,
  visible,
}: RockFieldProps) {
  return (
    <>
      {rocks.map((rock, index) => (
        <Rock
          key={rock.id}
          rock={rock}
          index={index}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reduced={reduced}
          visible={visible}
        />
      ))}
      {debris.map((chip, index) => (
        <Debris key={chip.id} chip={chip} index={index} reduced={reduced} visible={visible} />
      ))}
    </>
  );
}
