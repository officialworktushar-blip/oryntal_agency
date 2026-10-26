"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PremiumCustomModuleItem } from "@/lib/content/packages/premiumCustom";

type ModuleListProps = {
  items: PremiumCustomModuleItem[];
  active: number;
  onSelect: (index: number) => void;
  idBase: string;
};

export default function ModuleList({ items, active, onSelect, idBase }: ModuleListProps) {
  const reduced = useReducedMotion() ?? false;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;

    event.preventDefault();
    onSelect(next);
    window.requestAnimationFrame(() => refs.current[next]?.focus());
  }

  return (
    <div
      role="tablist"
      aria-orientation="vertical"
      aria-label="What you get modules"
      className="flex flex-col gap-2.5"
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        const isActive = active === i;
        return (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`${idBase}-panel-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(event) => handleKeyDown(event, i)}
            className={`group relative flex h-[61px] w-full items-center gap-3.5 rounded-[14px] border px-5 text-left text-[17px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] ${
              isActive
                ? "border-transparent bg-[#232327] text-white"
                : "border-white/[0.08] bg-[#17171A] text-white/90 hover:border-white/20"
            }`}
          >
            {isActive && (
              <m.div
                layoutId="pcmActive"
                className="pointer-events-none absolute inset-0 rounded-[14px]"
                style={{
                  border: "1.5px solid #8B7CFF",
                  boxShadow: reduced
                    ? "none"
                    : "0 0 0 1px rgba(139,124,255,.25), 0 8px 24px rgba(99,61,230,.18)",
                }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 34 }}
              />
            )}
            <Icon
              size={20}
              className="relative shrink-0"
              style={{ color: isActive ? "#8B7CFF" : "rgba(255,255,255,0.7)" }}
              aria-hidden="true"
            />
            <span className="relative min-w-0 flex-1">{item.label}</span>
            <ArrowRight
              size={18}
              className={`relative shrink-0 transition-all duration-200 group-hover:translate-x-[3px] ${
                isActive ? "text-white/80" : "text-white/40"
              }`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
