"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { m, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN_WIDTH = 640;
const DESIGN_HEIGHT = 540;

export default function SystemDiagram() {
  const reduced = useReducedMotion() ?? false;
  const { wrapperRef, scale } = useScaledCanvas(DESIGN_WIDTH, 0.4);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3, once: false });
  const { modules, stages, srSummary } = premiumCustom;

  const [active, setActive] = useState(reduced ? 2 : 0);
  const [hovered, setHovered] = useState(false);
  const [entrance, setEntrance] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hubX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const hubY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const pillX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const pillY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const dotsX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const dotsY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const cursorX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  useEffect(() => {
    const t = setTimeout(() => setEntrance(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced || hovered || !inView || document.visibilityState !== "visible") return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % modules.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [hovered, inView, modules.length, reduced]);

  function onMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
    hubX.set(px * -8);
    hubY.set(py * -8);
    pillX.set(px * -5);
    pillY.set(py * -5);
    dotsX.set(px * -12);
    dotsY.set(py * -12);
    cursorX.set(px * -10);
    cursorY.set(py * -10);
  }

  function onMouseLeave() {
    hubX.set(0);
    hubY.set(0);
    pillX.set(0);
    pillY.set(0);
    dotsX.set(0);
    dotsY.set(0);
    cursorX.set(0);
    cursorY.set(0);
  }

  const pillTops = [22, 120, 218, 316, 414];
  const cyValues = pillTops.map((t) => t + 33);

  const curvePaths = useMemo(() => {
    return cyValues.map((cy) => `M176 275 C 262 275, 272 ${cy}, 316 ${cy} H 340`);
  }, [cyValues]);

  const cursorLeft = 340 + 262;
  const cursorTop = pillTops[active] + 56;

  return (
    <div className="flex w-full flex-col items-center lg:items-end">
      <div
        ref={containerRef}
        role="img"
        aria-label="Diagram: a custom business system with a web or mobile app, admin and user panels, AI agents and automation, payments and integrations, and a supplier network"
        className="relative w-full max-w-[640px] aspect-[640/540] lg:justify-self-end"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          onMouseLeave();
        }}
        onMouseMove={onMouseMove}
      >
        <div
          ref={wrapperRef}
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, marginLeft: -DESIGN_WIDTH / 2, transform: `scale(${scale})` }}
        >
          <div className="relative h-full w-full">
            <m.div aria-hidden className="absolute inset-0" style={{ x: dotsX, y: dotsY }}>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                  maskImage: "radial-gradient(60% 60% at 40% 50%, #000, transparent)",
                  WebkitMaskImage: "radial-gradient(60% 60% at 40% 50%, #000, transparent)",
                }}
              />
            </m.div>

            <m.div
              aria-hidden
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: entrance ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                left: 26 - 180,
                top: 275 - 180,
                width: 360,
                height: 360,
                background: "radial-gradient(closest-side, rgba(99,61,230,.45), transparent)",
                filter: "blur(14px)",
                x: hubX,
                y: hubY,
              }}
            />

            <m.div
              aria-hidden
              initial={{ scale: reduced ? 1 : 0.85, opacity: reduced ? 1 : 0 }}
              animate={{ scale: entrance ? 1 : reduced ? 1 : 0.85, opacity: entrance ? 1 : reduced ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: reduced ? 0 : 0.1 }}
              className="absolute"
              style={{ left: 26, top: 200, x: hubX, y: hubY }}
            >
              <div className="relative h-[150px] w-[150px] rounded-[30px] border border-[rgba(123,102,255,.7)] bg-gradient-to-br from-[#241D52] to-[#120E2D] shadow-[0_0_50px_rgba(99,61,230,.45)] pc-hub-bob">
                <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,.1)]" />
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={78}
                    height={78}
                    priority
                    className="object-contain drop-shadow-[0_0_22px_rgba(123,92,255,.55)]"
                  />
                </div>
              </div>
              <div className="mt-8 w-[150px] text-center text-[12px] text-white/60">Your business system</div>
            </m.div>

            <m.div
              aria-hidden
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: entrance ? 1 : reduced ? 1 : 0 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.2 }}
              className="absolute"
              style={{ left: 26 + 75, top: 275, x: hubX, y: hubY }}
            >
              <svg width={208} height={208} viewBox="0 0 208 208" className="pc-orbit-rotate">
                <circle
                  cx={104}
                  cy={104}
                  r={104}
                  fill="none"
                  stroke="rgba(155,149,255,.30)"
                  strokeWidth={1.2}
                  strokeDasharray="3 8"
                />
              </svg>
            </m.div>

            <m.div
              aria-hidden
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -6 }}
              animate={{ opacity: entrance ? 1 : reduced ? 1 : 0, y: entrance ? 0 : reduced ? 0 : -6 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : 0.25 }}
              className="absolute left-[36px] top-[164px] inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-[11px] text-white"
              style={{ x: hubX, y: hubY }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#34C77B] pc-pulse-dot" />
              Live preview
            </m.div>

            <svg
              aria-hidden
              className="absolute inset-0"
              viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
              fill="none"
              stroke="#6F5BE8"
              strokeWidth={1.6}
              strokeLinecap="round"
              opacity={entrance ? 0.9 : reduced ? 0.9 : 0}
            >
              {curvePaths.map((d, i) => (
                <m.path
                  key={i}
                  d={d}
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: entrance ? 1 : reduced ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: reduced ? 0 : 0.3 + i * 0.11 }}
                />
              ))}
            </svg>

            {modules.map((module, i) => {
              const Icon = module.icon;
              const isActive = active === i;
              return (
                <m.div
                  key={module.id}
                  aria-hidden
                  initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 18 }}
                  animate={{ opacity: entrance ? 1 : reduced ? 1 : 0, x: entrance ? 0 : reduced ? 0 : 18 }}
                  transition={{ duration: 0.5, delay: reduced ? 0 : 0.4 + i * 0.09 }}
                  className="absolute"
                  style={{ left: 340, top: pillTops[i], x: pillX, y: pillY }}
                  onMouseEnter={() => {
                    if (reduced) return;
                    setHovered(true);
                    setActive(i);
                  }}
                >
                  <div
                    className="relative flex h-[66px] w-[292px] items-center rounded-[18px] border bg-gradient-to-br from-[#1D1747] to-[#120E2D] shadow-[0_10px_24px_rgba(0,0,0,.4)] transition-all duration-300"
                    style={{
                      borderColor: isActive ? "rgba(155,149,255,.85)" : "rgba(255,255,255,.10)",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(155,149,255,.35), 0 0 34px rgba(123,92,255,.45), 0 10px 24px rgba(0,0,0,.4)"
                        : "0 10px 24px rgba(0,0,0,.4)",
                      transform: isActive && !reduced ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    <div
                      className="ml-[14px] flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `color-mix(in srgb, ${module.color} 18%, #120E2D)` }}
                    >
                      <Icon className="h-[22px] w-[22px]" style={{ color: module.color }} />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="truncate text-[15px] font-medium text-white">{module.label}</div>
                      <div className="hidden text-[12px] text-white/55 sm:block">{module.sub}</div>
                    </div>
                  </div>
                </m.div>
              );
            })}

            <m.div
              aria-hidden
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: entrance ? 1 : reduced ? 1 : 0 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : 0.9 }}
              className="absolute"
              style={{ left: cursorLeft, top: cursorTop, x: cursorX, y: cursorY }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44">
                <defs>
                  <linearGradient id="pcCursor" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#7B4DFF" />
                    <stop offset="1" stopColor="#2A1478" />
                  </linearGradient>
                </defs>
                <path
                  d="M6 4 L38 22 L22 26 L16 38 Z"
                  fill="url(#pcCursor)"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 8px 18px rgba(123,77,255,.45))" }}
                />
              </svg>
            </m.div>

            <div aria-hidden className="absolute left-[36px] top-[500px] flex items-center gap-2 flex-wrap">
              {stages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300"
                    style={{
                      borderColor: !reduced && active === i ? "rgba(155,149,255,.85)" : "rgba(255,255,255,.12)",
                      backgroundColor: !reduced && active === i ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.06)",
                      color: !reduced && active === i ? "white" : "rgba(255,255,255,.7)",
                    }}
                  >
                    {!reduced && active === i && <span className="h-1.5 w-1.5 rounded-full bg-[#B9A8FF]" />}
                    {stage}
                  </div>
                  {i < stages.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="sr-only">{srSummary}</p>
        <ul className="sr-only" aria-label="What's included in the Premium Custom Business System">
          {premiumCustom.allIncluded.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
