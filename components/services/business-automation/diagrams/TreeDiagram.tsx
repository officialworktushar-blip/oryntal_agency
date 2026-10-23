"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import {
  Check,
  CreditCard,
  PackageCheck,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { IconType } from "react-icons";
import { useScaledCanvas } from "../hooks/useScaledCanvas";

type TreeDiagramProps = {
  animateIn?: boolean;
  running?: boolean;
  reduced?: boolean;
  highlight?: boolean;
};

type Node = {
  cx: number;
  label: string;
  color: string;
  icon: IconType | LucideIcon;
};

const NODES: Node[] = [
  { cx: 80, label: "Payments", color: "#7B8CFF", icon: CreditCard },
  { cx: 187, label: "Orders", color: "#34C77B", icon: PackageCheck },
  { cx: 293, label: "Shipping", color: "#FFB84D", icon: Truck },
  { cx: 400, label: "WhatsApp", color: "#25D366", icon: SiWhatsapp },
];

export default function TreeDiagram({
  animateIn = false,
  running = false,
  reduced = false,
  highlight = false,
}: TreeDiagramProps) {
  const { wrapperRef, scale } = useScaledCanvas();
  const [round, setRound] = useState(0);
  const [badge, setBadge] = useState(false);

  useEffect(() => {
    if (!running || reduced) {
      setBadge(false);
      return;
    }

    let arrivedTimer = 0;
    let leaveTimer = 0;

    const trigger = () => {
      setRound((value) => value + 1);
      arrivedTimer = window.setTimeout(() => setBadge(true), 1050);
      leaveTimer = window.setTimeout(() => setBadge(false), 2250);
    };

    trigger();
    const interval = window.setInterval(trigger, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(arrivedTimer);
      window.clearTimeout(leaveTimer);
      setBadge(false);
    };
  }, [running, reduced]);

  const lineColor = highlight ? "#9B8CFF" : "#6F5BE8";

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Diagram: one workflow connecting payments, orders, shipping and WhatsApp"
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
          <path
            d="M240 64 V112"
            pathLength={1}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={highlight ? 1 : 0.9}
            className={animateIn ? "ba-draw" : undefined}
            style={{ transition: "stroke 200ms ease" }}
          />
          <path
            d="M80 168 V132 Q80 112 100 112 H380 Q400 112 400 132 V168"
            pathLength={1}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={highlight ? 1 : 0.9}
            className={animateIn ? "ba-draw" : undefined}
            style={{ animationDelay: "120ms", transition: "stroke 200ms ease" }}
          />
          <path
            d="M187 168 V112"
            pathLength={1}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={highlight ? 1 : 0.9}
            className={animateIn ? "ba-draw" : undefined}
            style={{ animationDelay: "120ms", transition: "stroke 200ms ease" }}
          />
          <path
            d="M293 168 V112"
            pathLength={1}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={highlight ? 1 : 0.9}
            className={animateIn ? "ba-draw" : undefined}
            style={{ animationDelay: "120ms", transition: "stroke 200ms ease" }}
          />
        </svg>

        <div
          className={`absolute flex items-center justify-center ${animateIn ? "ba-scale-pop" : ""}`}
          style={{
            left: 208,
            top: 0,
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(150deg, #1D1740, #120E2D)",
            border: "1.5px solid rgba(111, 91, 232, 0.65)",
          }}
        >
          <span
            className={running && !reduced ? "ba-breathe inline-flex" : "inline-flex"}
          >
            <Workflow size={30} style={{ color: "#FF5C8A" }} />
          </span>
        </div>
        <span
          className="absolute text-[13px] text-white/70"
          style={{ left: 284, top: 22 }}
        >
          Set up once
        </span>

        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label}>
              <div
                className={`absolute flex items-center justify-center ${animateIn ? "ba-scale-pop" : ""}`}
                style={{
                  left: node.cx - 32,
                  top: 168,
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#14102F",
                  border: "1.5px solid rgba(111, 91, 232, 0.55)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
                  animationDelay: animateIn ? `${150 + i * 90}ms` : undefined,
                }}
              >
                <Icon size={26} style={{ color: node.color }} />
                {badge ? (
                  <span
                    className="ba-badge-pop absolute grid place-items-center rounded-full"
                    style={{
                      right: -2,
                      bottom: -2,
                      width: 14,
                      height: 14,
                      background: "#34C77B",
                      border: "2px solid #14102F",
                    }}
                  >
                    <Check size={8} strokeWidth={3} style={{ color: "#0B2016" }} />
                  </span>
                ) : null}
              </div>
              <span
                className="absolute text-center text-[12px] text-white/65"
                style={{ left: node.cx - 45, top: 240, width: 90 }}
              >
                {node.label}
              </span>
            </div>
          );
        })}

        {running && !reduced ? (
          <svg
            className="pointer-events-none absolute inset-0 z-20"
            width={480}
            height={280}
            viewBox="0 0 480 280"
            fill="none"
          >
            <m.circle
              key={`stem-${round}`}
              r={3.5}
              fill="#B9A8FF"
              initial={{ cx: 240, cy: 64, opacity: 0 }}
              animate={{ cy: [64, 112], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.55, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
            />
            {NODES.map((node) => (
              <m.circle
                key={`branch-${round}-${node.cx}`}
                r={3.5}
                fill="#B9A8FF"
                initial={{ cx: 240, cy: 112, opacity: 0 }}
                animate={{
                  cx: [240, node.cx, node.cx],
                  cy: [112, 112, 168],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.5,
                  times: [0, 0.5, 0.85, 1],
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
              />
            ))}
          </svg>
        ) : null}
      </div>
    </div>
  );
}
