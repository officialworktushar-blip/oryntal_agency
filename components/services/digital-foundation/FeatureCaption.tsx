"use client";

import { m, useReducedMotion } from "framer-motion";
import type { IncludedItem } from "@/lib/content/packages/digitalFoundation";

type FeatureCaptionProps = {
  items: IncludedItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function FeatureCaption({
  items,
  activeId,
  onSelect,
}: FeatureCaptionProps) {
  const reduced = useReducedMotion() ?? false;
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const Icon = active.icon;

  return (
    <div className="relative mx-auto mt-8 hidden max-w-2xl text-center md:block">
      <div className="relative flex min-h-[176px] flex-col items-center">
        <m.div
          key={active.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.28, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[rgba(255,255,255,0.75)]">
            <Icon className="size-5 text-[#673DE6]" strokeWidth={1.8} />
          </span>

          <p className="mt-4 text-xl font-semibold leading-tight text-[#0F1B2B]">
            {active.title}
          </p>

          <p className="mt-2 max-w-xl text-base leading-relaxed text-[#2B3F55]">
            {active.description}
          </p>
        </m.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-label={`Show ${item.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group grid h-3 w-3 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673DE6]"
            >
              <span
                className={
                  isActive
                    ? "h-[8px] w-6 rounded-full bg-[#673DE6]"
                    : "size-2 rounded-full bg-[#0F1B2B]/25 transition-colors duration-200 group-hover:bg-[#0F1B2B]/45"
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
