"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  Check,
  ClipboardCheck,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const NODES: { label: string; icon: LucideIcon; left: number }[] = [
  { label: "Form submitted", icon: UserPlus, left: 0 },
  { label: "WhatsApp alert", icon: MessageCircle, left: 156 },
  { label: "Saved to records", icon: ClipboardCheck, left: 312 },
];

export default function FlowMock() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(reduced ? -1 : 0);

  useEffect(() => {
    if (reduced) {
      setActive(-1);
      return;
    }
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % NODES.length),
      1066,
    );
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative h-[200px] w-[440px]" aria-hidden="true">
      <m.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1 }}
        className="relative h-[170px] w-[430px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(40,20,140,0.30)]"
      >
        {/* Dashed connectors */}
        <span
          className="absolute h-px"
          style={{
            left: 118,
            top: 51,
            width: 38,
            backgroundImage:
              "repeating-linear-gradient(to right, #B9AEF5 0 3px, transparent 3px 7px)",
          }}
        />
        <span
          className="absolute h-px"
          style={{
            left: 274,
            top: 51,
            width: 38,
            backgroundImage:
              "repeating-linear-gradient(to right, #B9AEF5 0 3px, transparent 3px 7px)",
          }}
        />

        {!reduced && (
          <span className="dfe-flow-pulse absolute top-[47.5px] z-[5] size-[7px] rounded-full bg-[#6C47E0]" />
        )}

        {NODES.map((node, index) => {
          const Icon = node.icon;
          const done = reduced || active === index;
          return (
            <div
              key={node.label}
              className="absolute top-[24px] z-10 flex h-[54px] w-[118px] items-center gap-1.5 rounded-xl border border-[#F0EDFB] bg-white px-2 shadow-[0_4px_12px_rgba(40,20,140,0.10)]"
              style={{ left: node.left }}
            >
              <span
                className="grid size-[26px] shrink-0 place-items-center rounded-full transition-colors duration-200"
                style={{ backgroundColor: done ? "#1E8A4C" : "#EDE9FF" }}
              >
                {done ? (
                  <Check className="size-3.5 text-white" strokeWidth={3.2} />
                ) : (
                  <Icon className="size-3.5 text-[#4A2FB8]" strokeWidth={2.4} />
                )}
              </span>
              <span className="min-w-0 text-[12.5px] leading-[1.15] text-[#1B1B1F]">
                {node.label}
              </span>
            </div>
          );
        })}

        <span className="absolute bottom-3.5 left-4 text-[11px] text-[#6B7480]">
          Where feasible
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-[#EDE9FF] px-2 py-1 text-[10px] font-medium leading-none text-[#4A2FB8]">
          Basic automation
        </span>
      </m.div>
    </div>
  );
}
