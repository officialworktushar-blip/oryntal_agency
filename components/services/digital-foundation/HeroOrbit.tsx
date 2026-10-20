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
} from "framer-motion";
import { digitalFoundation, type OrbitTile } from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";

const RINGS = [40, 60, 82, 106];
const RING_ALPHA = [0.75, 0.55, 0.38, 0.25];

const logo = "/oryntal-logo.png";

/** Stylised website wireframe shown inside the centre tile. */
function Wireframe() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-[64%] w-[64%] flex-col overflow-hidden rounded-xl bg-[#CFC7FF] shadow-md">
        {/* window top bar */}
        <div className="flex items-center gap-1 px-1.5 py-1">
          <span className="size-[5px] rounded-full bg-[#7B68FF]" />
          <span className="size-[5px] rounded-full bg-[#7B68FF]" />
          <span className="size-[5px] rounded-full bg-[#7B68FF]" />
        </div>
        {/* page area */}
        <div className="flex min-h-0 flex-1 flex-col gap-1 px-1.5 pb-1.5">
          <Image
            src={logo}
            alt=""
            width={14}
            height={14}
            className="h-[14px] w-auto object-contain brightness-0"
          />
          <span className="h-1.5 w-[70%] rounded-full bg-[#4A35B8]/70" />
          <span className="h-1.5 w-[45%] rounded-full bg-[#4A35B8]/70" />
          <span className="flex h-3 w-[52%] items-center justify-center rounded bg-[#673DE6]">
            <svg viewBox="0 0 12 12" className="size-2" aria-hidden="true">
              <path
                d="M2 6h7M6 2.5 9.5 6 6 9.5"
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="mt-auto grid grid-cols-2 gap-1">
            <span className="h-4 rounded-md bg-[#A99BFF]/60" />
            <span className="h-4 rounded-md bg-[#A99BFF]/60" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({
  tile,
  reduced,
  index,
  visible,
}: {
  tile: OrbitTile;
  reduced: boolean;
  index: number;
  visible: boolean;
}) {
  const Icon = tile.icon;
  const [hot, setHot] = useState(false);
  const duration = 4 + (index % 5) * 0.5;

  return (
    <div
      style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
      className={cn(
        "df-orbit-tile absolute z-30 -translate-x-1/2 -translate-y-1/2",
        tile.desktopOnly && "hidden md:block",
      )}
    >
      <m.div
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, x: "50%", y: "50%", scale: 0.3 }
        }
        animate={
          reduced
            ? { opacity: visible ? 1 : 0 }
            : visible
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: "50%", y: "50%", scale: 0.3 }
        }
        transition={
          reduced
            ? { duration: 0.2, delay: index * 0.03 }
            : {
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.55 + index * 0.07,
              }
        }
        className="relative"
      >
        <m.div
          animate={reduced ? undefined : { y: [0, -5, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        >
          <div
            onPointerEnter={() => setHot(true)}
            onPointerLeave={() => setHot(false)}
            className="relative"
          >
            <AnimatePresence>
              {hot && !reduced ? (
                <m.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur md:block"
                >
                  {tile.label}
              </m.span>
            ) : null}
          </AnimatePresence>
          <m.div
            animate={hot ? { scale: 1.12 } : { scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ rotate: tile.tilt }}
            className="df-orbit-tilebox grid aspect-square place-items-center rounded-[24%] border border-white/10"
          >
            <div
              className="flex size-full items-center justify-center rounded-[24%] border border-white/10"
              style={{
                background: "linear-gradient(150deg, #3A3A46 0%, #25252E 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 28px rgba(4,2,16,0.6)",
              }}
            >
              <Icon
                aria-hidden="true"
                className="h-[52%] w-[52%]"
                style={{ color: tile.color }}
              />
            </div>
          </m.div>
        </div>
        </m.div>
      </m.div>
    </div>
  );
}

export default function HeroOrbit() {
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.3, once: true });
  const { orbit } = digitalFoundation;

  const [pointerFine, setPointerFine] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setPointerFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPointerFine(e.matches);
    mq.addEventListener("change", onChange);

    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
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

  const pRingX = useTransform(sx, (v) => v * 4);
  const pRingY = useTransform(sy, (v) => v * 4);
  const pTileX = useTransform(sx, (v) => v * -14);
  const pTileY = useTransform(sy, (v) => v * -14);
  const pCentreX = useTransform(sx, (v) => v * 8);
  const pCentreY = useTransform(sy, (v) => v * 8);
  const pCursorX = useTransform(sx, (v) => v * 18);
  const pCursorY = useTransform(sy, (v) => v * 18);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!parallaxOn) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="relative flex justify-center lg:justify-end">
      <div
        ref={stageRef}
        role="img"
        aria-label="Illustration of a professional business website connected to WhatsApp, Google, Instagram, Facebook, lead capture, SSL security and registration guidance"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="df-orbit-stage relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden md:max-w-[520px] lg:mx-0 lg:max-w-[600px]"
      >        {/* Dark base behind the rings */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-10%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(8,6,22,0.92) 0%, rgba(8,6,22,0.75) 45%, rgba(8,6,22,0) 100%)",
          }}
        />

        {/* Purple glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={parallaxOn ? { x: pRingX, y: pRingY } : undefined}
            className="size-full rounded-full [background:radial-gradient(closest-side,rgba(99,61,230,0.55)_0%,rgba(99,61,230,0.18)_55%,rgba(99,61,230,0)_100%)] blur-[10px]"
          />
        </div>

        {/* Concentric rings */}
        {RINGS.map((size, i) => (
          <div
            key={size}
            aria-hidden="true"
            style={{ width: `${size}%` }}
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2",
              size === 106 && "hidden md:block",
            )}
          >
            <m.div
              style={parallaxOn ? { x: pRingX, y: pRingY } : undefined}
              className="size-full"
            >
              <m.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                animate={
                  reduced
                    ? { opacity: inView ? 1 : 0 }
                    : { opacity: inView ? 1 : 0, scale: inView ? 1 : 0.85 }
                }
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="size-full"
              >
                <m.div
                  animate={reduced ? undefined : { scale: [1, 1.025, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                  className="size-full rounded-[26%] border"
                  style={{
                    borderColor: `rgba(123,92,255,${RING_ALPHA[i]})`,
                    background:
                      i < 2
                        ? "linear-gradient(160deg, rgba(60,40,140,0.28), rgba(15,10,40,0))"
                        : undefined,
                    boxShadow: i === 0 ? "0 0 60px rgba(99,61,230,0.35)" : undefined,
                  }}
                />
              </m.div>
            </m.div>
          </div>
        ))}

        {/* Centre tile — website wireframe or provided image */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-20 aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={parallaxOn ? { x: pCentreX, y: pCentreY } : undefined}
            className="size-full"
          >
            <m.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
              animate={
                reduced
                  ? { opacity: inView ? 1 : 0 }
                  : { opacity: inView ? 1 : 0, scale: inView ? 1 : 0.85 }
              }
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { type: "spring", stiffness: 200, damping: 18, delay: 0.4 }
              }
              className="size-full"
            >
              <m.div
                animate={reduced ? undefined : { y: [0, -4, 0], scale: [1, 0.965, 1] }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="flex size-full items-center justify-center rounded-[24%] border border-white/10"
                style={{
                  background: "linear-gradient(150deg, #44445A 0%, #26262F 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 28px 60px rgba(4,2,16,0.65)",
                }}
              >
                {orbit.centreSrc ? (
                  <Image
                    src={orbit.centreSrc}
                    alt=""
                    width={200}
                    height={200}
                    className="h-[78%] w-[78%] object-contain"
                  />
                ) : (
                  <Wireframe />
                )}
              </m.div>
            </m.div>
          </m.div>
        </div>

        {/* Cursor */}
        {!reduced ? (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            style={{ left: "63%", top: "60%", ...(parallaxOn ? { x: pCursorX, y: pCursorY } : {}) }}
            className="pointer-events-none absolute z-30 hidden min-[480px]:block"
          >
            <m.div
              animate={reduced ? undefined : { x: [0, 8, 0, -6, 0], y: [0, -6, 4, 2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <m.div
                animate={reduced ? undefined : { scale: [1, 0.88, 1] }}
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
                  className="h-auto w-[15%] min-w-[52px] drop-shadow-[0_6px_14px_rgba(4,2,16,0.7)]"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="df-cursor" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7B4DFF" />
                      <stop offset="1" stopColor="#2A1478" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 2 L4 20 L9 15 L12 22 L15 20.5 L12 13.5 L18 13.5 Z"
                    fill="url(#df-cursor)"
                    stroke="#0B0D12"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
                <m.span
                  aria-hidden="true"
                  animate={reduced ? undefined : { scale: [1, 1.9], opacity: [0.7, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatDelay: 5.1,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-1/2 size-[15%] min-w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[rgba(155,149,255,0.7)]"
                />
              </m.div>
            </m.div>
          </m.div>
        ) : null}

        {/* Orbit tiles */}
        {orbit.tiles.map((tile, i) => (
          <Tile
            key={tile.id}
            tile={tile}
            reduced={reduced || !tabVisible}
            index={i}
            visible={inView}
          />
        ))}
      </div>
    </div>
  );
}
