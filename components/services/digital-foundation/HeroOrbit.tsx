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

const RINGS = [46, 62, 84, 108];
const RING_ALPHA = [0.85, 0.6, 0.4, 0.25];

const logo = "/oryntal-logo.png";

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
  const Icon = tile.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties; ariaHidden?: boolean }>;
  const [hot, setHot] = useState(false);
  const duration = 4 + (index % 5) * 0.5;
  const isSmall = tile.id === "facebook" || tile.id === "register";

  return (
    <div
      style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
      className={cn(
        "df-orbit-tile absolute z-30 -translate-x-1/2 -translate-y-1/2",
        isSmall && "hidden md:block",
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
                  background: "linear-gradient(150deg, #3C3C48 0%, #25252E 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 26px rgba(3,2,14,0.6)",
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
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setForced(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  const visible = inView || forced;

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div
        ref={stageRef}
        role="img"
        aria-label="Illustration of a professional business website connected to WhatsApp, Google, Instagram, Facebook, lead capture, SSL security and registration guidance"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="df-orbit-stage relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden sm:max-w-[500px] lg:mx-0 lg:-my-16 lg:max-w-[580px]"
      >
        {/* Purple glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={parallaxOn ? { x: pRingX, y: pRingY } : undefined}
            className="size-full rounded-full [background:radial-gradient(closest-side,rgba(99,61,230,0.5)_0%,rgba(99,61,230,0.16)_55%,rgba(99,61,230,0)_100%)] blur-[8px]"
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
              size === 108 && "hidden md:block",
            )}
          >
            <m.div
              style={parallaxOn ? { x: pRingX, y: pRingY } : undefined}
              className="size-full"
            >
              <m.div
                initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
                animate={reduced ? { opacity: 1, scale: 1 } : { opacity: visible ? 1 : 0, scale: visible ? 1 : 0.88 }}
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
                    borderColor: `rgba(112,86,240,${RING_ALPHA[i]})`,
                    background:
                      i < 2
                        ? "linear-gradient(160deg, rgba(70,46,170,0.30), rgba(12,8,36,0))"
                        : undefined,
                    boxShadow: i === 0 ? "0 0 70px rgba(99,61,230,0.35)" : undefined,
                  }}
                />
              </m.div>
            </m.div>
          </div>
        ))}

        {/* Centre tile — ORYNTAL logo */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-20 aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2"
        >
          <m.div
            style={parallaxOn ? { x: pCentreX, y: pCentreY } : undefined}
            className="size-full"
          >
            <m.div
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              animate={reduced ? { opacity: 1, scale: 1 } : { opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
              transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
              className="size-full"
            >
              <m.div
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                whileTap={reduced ? undefined : { scale: 0.965 }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="flex size-full items-center justify-center rounded-[26%] border border-white/10"
                style={{
                  background: "linear-gradient(150deg, #44445A 0%, #26262F 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -14px 24px rgba(0,0,0,0.25), 0 30px 60px rgba(3,2,14,0.7)",
                }}
              >
                <Image
                  src={orbit.centreSrc || logo}
                  alt=""
                  width={200}
                  height={200}
                  priority
                  className="h-[64%] w-[64%] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]"
                />
              </m.div>
            </m.div>
          </m.div>
        </div>

        {/* Cursor */}
        {!reduced ? (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            style={{ left: "62%", top: "57%", ...(parallaxOn ? { x: pCursorX, y: pCursorY } : {}) }}
            className="pointer-events-none absolute z-30 hidden min-[480px]:block"
          >
            <m.div
              animate={{ x: [0, 8, 0, -6, 0], y: [0, -6, 4, 2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}
