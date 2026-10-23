"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import {
  BellRing,
  CreditCard,
  PackageCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useScaledCanvas } from "../hooks/useScaledCanvas";

type OrderFlowDiagramProps = {
  animateIn?: boolean;
  running?: boolean;
  reduced?: boolean;
  highlight?: boolean;
};

type Pill = {
  cy: number;
  top: number;
  label: string;
  color: string;
  icon: LucideIcon;
};

const PILLS: Pill[] = [
  { cy: 33, top: 8, label: "Payment confirmed", color: "#7B8CFF", icon: CreditCard },
  { cy: 103, top: 78, label: "Order created", color: "#34C77B", icon: PackageCheck },
  { cy: 173, top: 148, label: "Courier booked", color: "#FFB84D", icon: Truck },
  { cy: 243, top: 218, label: "Customer updated", color: "#FF7AB6", icon: BellRing },
];

const PULSE_TIMES = [0, 0.12, 0.3, 0.55, 0.78, 0.92, 1];

function curvePoints(cy: number) {
  const xs: number[] = [];
  const ys: number[] = [];
  const p0 = { x: 96, y: 140 };
  const p1 = { x: 150, y: 140 };
  const p2 = { x: 160, y: cy };
  const p3 = { x: 208, y: cy };

  for (const t of [0, 0.2, 0.45, 0.7, 0.88, 1]) {
    const it = 1 - t;
    xs.push(
      it * it * it * p0.x +
        3 * it * it * t * p1.x +
        3 * it * t * t * p2.x +
        t * t * t * p3.x,
    );
    ys.push(
      it * it * it * p0.y +
        3 * it * it * t * p1.y +
        3 * it * t * t * p2.y +
        t * t * t * p3.y,
    );
  }

  xs.push(232);
  ys.push(cy);
  return { xs, ys };
}

const CURVES = PILLS.map((pill) => curvePoints(pill.cy));

export default function OrderFlowDiagram({
  animateIn = false,
  running = false,
  reduced = false,
  highlight = false,
}: OrderFlowDiagramProps) {
  const { wrapperRef, scale } = useScaledCanvas();
  const [leg, setLeg] = useState<{ index: number; nonce: number } | null>(null);
  const [ring, setRing] = useState<number | null>(null);
  const nonceRef = useRef(0);

  useEffect(() => {
    if (!running || reduced) {
      setLeg(null);
      setRing(null);
      return;
    }

    let stopped = false;
    let timers: number[] = [];
    const cycle = highlight ? 3000 : 4500;
    const step = cycle / 4;
    const travel = Math.min(700, step - 100);

    const start = () => {
      if (stopped) return;
      timers = [];

      for (let i = 0; i < PILLS.length; i += 1) {
        timers.push(
          window.setTimeout(() => {
            nonceRef.current += 1;
            setLeg({ index: i, nonce: nonceRef.current });
          }, i * step),
        );
        timers.push(
          window.setTimeout(() => setRing(i), i * step + travel),
        );
        timers.push(
          window.setTimeout(() => setRing(null), i * step + travel + 450),
        );
      }

      timers.push(window.setTimeout(start, cycle));
    };

    start();

    return () => {
      stopped = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };
  }, [running, reduced, highlight]);

  const activeCurve = leg ? CURVES[leg.index] : null;

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Diagram: payment confirmed, order created, courier booked and customer updated, connected in one flow"
      className="relative aspect-[480/280] w-full min-w-0 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: 480,
          height: 280,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <svg
          className="absolute inset-0"
          width={480}
          height={280}
          viewBox="0 0 480 280"
          fill="none"
        >
          {PILLS.map((pill, i) => (
            <path
              key={pill.label}
              d={`M96 140 C 150 140, 160 ${pill.cy}, 208 ${pill.cy} H 232`}
              pathLength={1}
              stroke={highlight ? "#9B8CFF" : "#6F5BE8"}
              strokeWidth={1.5}
              strokeOpacity={highlight ? 1 : 0.85}
              strokeLinecap="round"
              className={animateIn ? "ba-draw" : undefined}
              style={{
                animationDelay: `${120 + i * 120}ms`,
                transition: "stroke 200ms ease, stroke-opacity 200ms ease",
              }}
            />
          ))}
        </svg>

        <div
          className="absolute"
          style={{
            left: 18,
            top: 101,
            width: 78,
            height: 78,
            borderRadius: 20,
            background: "linear-gradient(150deg, #1D1740, #120E2D)",
            border: "1.5px solid rgba(111, 91, 232, 0.65)",
            boxShadow: "0 0 30px rgba(99, 61, 230, 0.35)",
          }}
        >
          <div className="grid h-full w-full place-items-center">
            <Image
              src="/logo.png"
              alt=""
              width={42}
              height={42}
              className="object-contain"
            />
          </div>
        </div>
        <span
          className="absolute text-center text-[11px] text-white/60"
          style={{ left: 18, top: 186, width: 78 }}
        >
          Your order
        </span>

        {PILLS.map((pill, i) => {
          const Icon = pill.icon;
          const isRinging = ring === i;
          return (
            <div
              key={pill.label}
              className={`absolute flex items-center gap-2.5 ${animateIn ? "ba-pill-pop" : ""}`}
              style={{
                left: 232,
                top: pill.top,
                width: 218,
                height: 50,
                borderRadius: 14,
                background: "linear-gradient(150deg, #1A1540, #110D2B)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                boxShadow: isRinging
                  ? "0 0 0 3px rgba(52, 199, 123, 0.45), 0 8px 20px rgba(0, 0, 0, 0.35)"
                  : "0 8px 20px rgba(0, 0, 0, 0.35)",
                paddingLeft: 10,
                animationDelay: animateIn ? `${90 * i}ms` : undefined,
                transition: "box-shadow 220ms ease",
              }}
            >
              <span
                className="grid place-items-center rounded-lg"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: isRinging
                    ? `${pill.color}33`
                    : "rgba(255, 255, 255, 0.06)",
                  transition: "background-color 220ms ease",
                }}
              >
                <Icon size={16} style={{ color: pill.color }} />
              </span>
              <span className="text-[15px] leading-none text-white">{pill.label}</span>
            </div>
          );
        })}

        {running && !reduced && leg && activeCurve ? (
          <svg
            className="pointer-events-none absolute inset-0 z-20"
            width={480}
            height={280}
            viewBox="0 0 480 280"
            fill="none"
          >
            <m.circle
              key={leg.nonce}
              r={3.5}
              fill="#B9A8FF"
              initial={{ cx: 96, cy: 140, opacity: 0 }}
              animate={{
                cx: activeCurve.xs,
                cy: activeCurve.ys,
                opacity: [0, 1, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: Math.min(0.7, (highlight ? 3000 : 4500) / 4 / 1000 - 0.1),
                times: PULSE_TIMES,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
}
