"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import {
  digitalFoundation,
  type OrbitTile,
} from "@/lib/content/packages/digitalFoundation";

const RING_SIZES = [44, 60, 82, 106];
const RING_ALPHA = [0.85, 0.6, 0.4, 0.25];
const TILE_WIDTH = 10;

const LOGO_SRC = "/logo.png";
const STAGE_LABEL =
  "ORYNTAL logo surrounded by icons for website, Google, SSL security, lead capture, MSME/Udyam guidance and WhatsApp";

type TileProps = {
  tile: OrbitTile;
  index: number;
  reduced: boolean;
  visible: boolean;
  idle: boolean;
  pointerFine: boolean;
  parallaxOn: boolean;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
};

function Tile({
  tile,
  index,
  reduced,
  visible,
  idle,
  pointerFine,
  parallaxOn,
  sx,
  sy,
}: TileProps) {
  const Icon = tile.icon;
  const [hot, setHot] = useState(false);
  const dir = index % 2 === 0 ? -1 : 1;
  const px = useTransform(sx, (v) => v * 14 * dir);
  const py = useTransform(sy, (v) => v * 14 * dir);

  /* Offset from the stage centre, expressed in % of the tile's own width. */
  const fromX = ((50 - tile.x) / TILE_WIDTH) * 100;
  const fromY = ((50 - tile.y) / TILE_WIDTH) * 100;

  const hiddenBelowMd = tile.id === "register" || tile.id === "google";
  const duration = 4 + (index % 4) * 0.6;

  return (
    <div
      aria-hidden="true"
      style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
      className={cn(
        "df-orbit-tile absolute z-30 w-[8.5%] -translate-x-1/2 -translate-y-1/2 md:w-[10%]",
        hiddenBelowMd && "hidden md:block",
      )}
    >
      <m.div
        className="df-orbit-anim relative"
        initial={
          reduced
            ? { opacity: 0 }
            : {
                opacity: 0,
                scale: 0.3,
                x: `${fromX}%`,
                y: `${fromY}%`,
              }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : visible
              ? { opacity: 1, scale: 1, x: "0%", y: "0%" }
              : { opacity: 0, scale: 0.3, x: `${fromX}%`, y: `${fromY}%` }
        }
        transition={
          reduced
            ? { duration: 0.2 }
            : {
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.55 + index * 0.08,
              }
        }
      >
        <m.div style={parallaxOn ? { x: px, y: py } : undefined}>
          <m.div
            animate={!reduced && idle ? { y: [0, -5, 0] } : { y: 0 }}
            transition={{
              duration,
              repeat: idle && !reduced ? Infinity : 0,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
          >
            <div
              onPointerEnter={() => {
                if (pointerFine) setHot(true);
              }}
              onPointerLeave={() => setHot(false)}
              className="relative"
            >
              <AnimatePresence>
                {hot && pointerFine && !reduced ? (
                  <m.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur"
                  >
                    {tile.label}
                  </m.span>
                ) : null}
              </AnimatePresence>

              <m.div
                animate={
                  hot && pointerFine && !reduced
                    ? { scale: 1.12 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ rotate: `${tile.tilt}deg` }}
                className="aspect-square w-full rounded-[24%]"
              >
                <div
                  className="grid size-full place-items-center rounded-[24%]"
                  style={{
                    background:
                      "linear-gradient(150deg, #3C3C48 0%, #25252E 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 26px rgba(3,2,14,0.6)",
                  }}
                >
                  <Icon
                    className="h-[52%] w-[52%]"
                    style={{ color: tile.color }}
                  />
                </div>
              </m.div>
            </div>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}

function Cursor({
  visible,
  reduced,
  parallaxOn,
  cx,
  cy,
}: {
  visible: boolean;
  reduced: boolean;
  parallaxOn: boolean;
  cx: MotionValue<number>;
  cy: MotionValue<number>;
}) {
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[60%] top-[58%] z-40 hidden w-[14%] min-w-[48px] -translate-x-[17%] -translate-y-[8%] min-[480px]:block"
    >
      <m.div
        className="df-orbit-anim"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, delay: 1 }}
      >
        <m.div style={parallaxOn ? { x: cx, y: cy } : undefined}>
          <m.div
            animate={{ x: [0, 8, 0, -6, 0], y: [0, -6, 4, 2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <m.div
              animate={{ scale: [1, 0.88, 1] }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 5.8,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-auto w-full drop-shadow-[0_6px_16px_rgba(4,2,16,0.75)]"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="df-orbit-cursor"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#7B4DFF" />
                    <stop offset="1" stopColor="#2A1478" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 2 L4 20 L9 15 L12 22 L15 20.5 L12 13.5 L18 13.5 Z"
                  fill="url(#df-orbit-cursor)"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <m.span
                aria-hidden="true"
                animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatDelay: 5.1,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[rgba(155,149,255,0.7)]"
              />
            </m.div>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}

export default function HeroOrbit() {
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useInView(stageRef, { amount: 0.25, once: true });
  const active = useInView(stageRef, { amount: 0.2 });
  const { orbit } = digitalFoundation;

  const [pointerFine, setPointerFine] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setForced(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setPointerFine(mq.matches);
    const onChange = (event: MediaQueryListEvent) => {
      setPointerFine(event.matches);
    };
    mq.addEventListener("change", onChange);

    const onVisibility = () => {
      setTabVisible(document.visibilityState === "visible");
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mq.removeEventListener("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const parallaxOn = pointerFine && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.5 });

  const ringX = useTransform(sx, (v) => v * 4);
  const ringY = useTransform(sy, (v) => v * 4);
  const logoX = useTransform(sx, (v) => v * 8);
  const logoY = useTransform(sy, (v) => v * 8);
  const cursorX = useTransform(sx, (v) => v * -18);
  const cursorY = useTransform(sy, (v) => v * -18);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!parallaxOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const visible = seen || forced;
  const idle = active && tabVisible && !reduced;

  return (
    <div className="relative flex w-full items-center justify-center">
      <div
        ref={stageRef}
        role="img"
        aria-label={STAGE_LABEL}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="df-orbit-stage relative aspect-square w-full min-w-0 max-w-[360px] -rotate-[5deg] md:max-w-[480px] md:-rotate-[7deg] lg:-my-10 lg:max-w-[560px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        }}
      >
        <noscript>
          <style>{`
            .df-orbit-anim {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>

        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={{
              x: parallaxOn ? ringX : undefined,
              y: parallaxOn ? ringY : undefined,
              background:
                "radial-gradient(closest-side, rgb(var(--orbit-glow) / 0.55) 0%, rgb(var(--orbit-glow) / 0.18) 55%, rgb(var(--orbit-glow) / 0) 100%)",
              filter: "blur(8px)",
            }}
            className="size-full rounded-full"
          />
        </div>

        {/* Rings */}
        {RING_SIZES.map((size, index) => {
          const outer = size === RING_SIZES[RING_SIZES.length - 1];
          return (
            <div
              key={size}
              aria-hidden="true"
              style={{ width: `${size}%` }}
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2",
                outer && "hidden md:block",
              )}
            >
              <m.div
                style={parallaxOn ? { x: ringX, y: ringY } : undefined}
                className="size-full"
              >
                <m.div
                  className="df-orbit-anim size-full"
                  initial={
                    reduced
                      ? { opacity: 0, scale: 1 }
                      : { opacity: 0, scale: 0.88 }
                  }
                  animate={
                    reduced
                      ? { opacity: 1, scale: 1 }
                      : {
                          opacity: visible ? 1 : 0,
                          scale: visible ? 1 : 0.88,
                        }
                  }
                  transition={{
                    duration: reduced ? 0.2 : 0.5,
                    delay: reduced ? 0 : index * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <m.div
                    animate={
                      reduced ? undefined : { scale: [1, 1.025, 1] }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.6,
                    }}
                    className="size-full rounded-[26%] border"
                    style={{
                      borderColor: `rgb(var(--orbit-ring) / ${RING_ALPHA[index]})`,
                      background:
                        index < 2
                          ? "linear-gradient(160deg, rgba(70,46,170,0.28), rgba(12,8,36,0))"
                          : undefined,
                      boxShadow:
                        index === 0
                          ? "0 0 70px rgb(var(--orbit-glow) / 0.35)"
                          : undefined,
                    }}
                  />
                </m.div>
              </m.div>
            </div>
          );
        })}

        {/* Centre logo — image only, no tile/box/background */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-20 w-[30%] min-w-[120px] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={parallaxOn ? { x: logoX, y: logoY } : undefined}
            className="w-full"
          >
            <m.div
              className="df-orbit-anim w-full"
              initial={
                reduced
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : { opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : {
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                      delay: 0.4,
                    }
              }
            >
              <m.div
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        filter: [
                          "drop-shadow(0 0 24px rgba(123,92,255,0.45)) drop-shadow(0 14px 22px rgba(0,0,0,0.5))",
                          "drop-shadow(0 0 34px rgba(123,92,255,0.65)) drop-shadow(0 14px 22px rgba(0,0,0,0.5))",
                          "drop-shadow(0 0 24px rgba(123,92,255,0.45)) drop-shadow(0 14px 22px rgba(0,0,0,0.5))",
                        ],
                      }
                }
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  filter: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="df-orbit-logo w-full"
              >
                <Image
                  src={LOGO_SRC}
                  alt=""
                  width={220}
                  height={220}
                  priority
                  className="h-auto w-full object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 28px rgba(123,92,255,0.55)) drop-shadow(0 14px 22px rgba(0,0,0,0.5))",
                  }}
                />
              </m.div>
            </m.div>
          </m.div>
        </div>

        {/* Cursor */}
        <Cursor
          visible={visible && tabVisible}
          reduced={reduced}
          parallaxOn={parallaxOn}
          cx={cursorX}
          cy={cursorY}
        />

        {/* Tiles */}
        {orbit.tiles.slice(0, 6).map((tile, index) => (
          <Tile
            key={tile.id}
            tile={tile}
            index={index}
            reduced={reduced}
            visible={visible}
            idle={idle}
            pointerFine={pointerFine}
            parallaxOn={parallaxOn}
            sx={sx}
            sy={sy}
          />
        ))}
      </div>
    </div>
  );
}
