"use client";

import { ClipboardCheck, MessageCircle, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useWidgetMotion } from "../WidgetCanvas";

const NODES: { icon: LucideIcon; label: string; top: number }[] = [
  { icon: UserPlus, label: "Form submitted", top: 52 },
  { icon: MessageCircle, label: "WhatsApp alert", top: 96 },
  { icon: ClipboardCheck, label: "Saved to records", top: 140 },
];

const NODE_CENTERS = NODES.map((node) => node.top + 14);
const FIRST_CENTER = NODE_CENTERS[0];
const LAST_CENTER = NODE_CENTERS[NODE_CENTERS.length - 1];
const TRAVEL = LAST_CENTER - FIRST_CENTER;
const CYCLE = 3200;

type FlowWidgetProps = {
  className?: string;
};

export default function FlowWidget({ className }: FlowWidgetProps) {
  const { inView, reduced } = useWidgetMotion();
  const playing = inView && !reduced;

  const progress = useMotionValue(0);
  const pulseTop = useTransform(progress, (value) => FIRST_CENTER + value * TRAVEL);
  const [active, setActive] = useState(-1);
  const startedAt = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (!playing) return;
    if (startedAt.current === null) startedAt.current = time;

    const cycle = ((time - startedAt.current) % CYCLE) / CYCLE;
    progress.set(cycle);

    const y = FIRST_CENTER + cycle * TRAVEL;
    let next = -1;
    for (let index = 0; index < NODE_CENTERS.length; index += 1) {
      if (Math.abs(y - NODE_CENTERS[index]) < 16) {
        next = index;
        break;
      }
    }
    setActive((current) => (current === next ? current : next));
  });

  return (
    <div
      className={`dfd-widget h-[196px] w-[219px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="absolute left-[22px] top-[17px] text-[16px] leading-none text-[var(--dfd-ink)]">
        Automation
      </span>

      {/* Dashed rail joining the three steps */}
      <span
        className="absolute left-[35px] w-px"
        style={{
          top: FIRST_CENTER,
          height: TRAVEL,
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--dfd-line) 0 3px, transparent 3px 7px)",
        }}
      />

      {/* The pulse travelling down the rail */}
      <motion.span
        className="absolute left-[32.5px] size-[7px] rounded-full bg-[var(--dfd-4)]"
        style={{ top: pulseTop }}
      />

      {NODES.map((node, index) => {
        const isActive = active === index;
        const Icon = node.icon;

        return (
          <div key={node.label}>
            <span
              className="absolute left-[22px] grid size-7 place-items-center rounded-full transition-colors duration-200"
              style={{
                top: node.top,
                backgroundColor: isActive
                  ? "var(--dfd-green)"
                  : "var(--dfd-lilac)",
              }}
            >
              <Icon
                className="absolute size-[14px] transition-opacity duration-200"
                style={{ opacity: isActive ? 0 : 1 }}
                strokeWidth={2.2}
              />
              <svg
                className="absolute size-[13px] transition-opacity duration-200"
                style={{ opacity: isActive ? 1 : 0 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth={3.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>

            <span
              className="absolute left-[60px] flex items-center text-[12.5px] leading-none text-[var(--dfd-ink)]"
              style={{ top: node.top + 8 }}
            >
              {node.label}
            </span>
          </div>
        );
      })}

      <span className="absolute left-[22px] top-[176px] text-[11px] leading-none text-[var(--dfd-muted)]">
        Where feasible
      </span>
    </div>
  );
}
