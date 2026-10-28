"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { IntegrationBuildItem } from "@/lib/content/services/integration";

type BuildSelectorProps = {
  build: IntegrationBuildItem[];
  activeId: string;
  onChange: (id: string) => void;
  onUserInteract: () => void;
};

export default function BuildSelector({ build, activeId, onChange, onUserInteract }: BuildSelectorProps) {
  const [focusedIndex, setFocusedIndex] = useState(() =>
    build.findIndex((item) => item.id === activeId)
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % build.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + build.length) % build.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = build.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    onUserInteract();
    const nextItem = build[nextIndex];
    onChange(nextItem.id);
    setFocusedIndex(nextIndex);
    const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <span className="text-base text-white/60">We build</span>
      <div role="tablist" aria-label="Integration capabilities we build" className="flex flex-wrap items-center gap-2">
        {build.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="ai-visual"
              aria-label={item.label}
              title={item.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                onUserInteract();
                onChange(item.id);
                setFocusedIndex(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#17171A] transition-all duration-200 hover:scale-105 hover:bg-[#202024]",
                isActive ? "border-[1.5px] border-[#8B7CFF]" : "border border-white/10"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="aiBuildActive"
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: "0 0 0 1px rgba(139,124,255,.3), 0 0 20px rgba(123,92,255,.35)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-5 w-5",
                  isActive ? "text-white" : "text-white/75"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
