"use client";

import { useId } from "react";

const PAGES = ["Home", "Services", "Contact"];

/** Flat, then rising, then a small dip. Decorative only. */
const CHART_PATH =
  "M 2 38 C 26 38 38 37 54 31 C 70 25 84 17 100 13 C 116 9 132 7 146 11 C 158 14 166 12 173 10";

type PagesWidgetProps = {
  className?: string;
};

export default function PagesWidget({ className }: PagesWidgetProps) {
  const gradientId = useId();

  return (
    <div
      className={`dfd-widget h-[196px] w-[219px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="absolute left-[22px] top-[17px] text-[16px] leading-none text-[var(--dfd-ink)]">
        Your pages
      </span>

      {PAGES.map((page, index) => (
        <div
          key={page}
          className="absolute left-[22px] flex h-[22px] w-[175px] items-center rounded-[11px] bg-[var(--dfd-lilac)] pl-[10px]"
          style={{ top: 54 + index * 26 }}
        >
          <span className="mr-[8px] size-[6px] rounded-full bg-[var(--dfd-4)]" />
          <span className="text-[12px] leading-none text-[var(--dfd-violet-ink)]">
            {page}
          </span>
        </div>
      ))}

      <svg
        className="dfd-draw-in absolute left-[22px]"
        style={{ top: 134 }}
        width={175}
        height={52}
        viewBox="0 0 175 52"
        fill="none"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dfd-4)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--dfd-4)" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <path
          d={`${CHART_PATH} L 173 52 L 2 52 Z`}
          fill={`url(#${gradientId})`}
        />
        <path
          className="dfd-draw"
          d={CHART_PATH}
          pathLength={1}
          fill="none"
          stroke="var(--dfd-4)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
