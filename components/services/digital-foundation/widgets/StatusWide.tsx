"use client";

import { useId } from "react";

/** Nearly flat, decorative. */
const CHART_PATH =
  "M 4 30 C 40 28 72 27 104 26 C 150 25 200 24 250 23 C 280 22 305 21 324 20";

type StatusWideProps = {
  className?: string;
  /** Stacked layout used on small screens. */
  compact?: boolean;
};

export default function StatusWide({ className, compact }: StatusWideProps) {
  const gradientId = useId();

  const chart = (
    <svg
      className="dfd-draw-in block h-auto w-full"
      style={{ maxWidth: 328 }}
      viewBox="0 0 328 94"
      fill="none"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--dfd-teal)" stopOpacity={0.5} />
          <stop offset="100%" stopColor="var(--dfd-teal)" stopOpacity={0.03} />
        </linearGradient>
      </defs>

      <path d={`${CHART_PATH} L 324 94 L 4 94 Z`} fill={`url(#${gradientId})`} />
      <path
        className="dfd-draw"
        d={CHART_PATH}
        pathLength={1}
        fill="none"
        stroke="var(--dfd-teal)"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );

  const heading = (
    <p className="text-[17px] leading-none text-[var(--dfd-ink)]">Lead capture</p>
  );

  const chip = (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex size-2 items-center justify-center">
        <span className="dfd-chip-pulse absolute inset-0 rounded-full bg-[var(--dfd-teal)]" />
        <span className="relative size-2 rounded-full bg-[var(--dfd-green)]" />
      </span>
      <span className="text-[11.5px] font-bold tracking-[0.06em] text-[var(--dfd-teal-ink)]">
        ACTIVE
      </span>
    </span>
  );

  const caption = (
    <p className="text-[13.5px] leading-snug text-[var(--dfd-muted)]">
      Inquiry form · WhatsApp · Business links
    </p>
  );

  if (compact) {
    return (
      <div
        className={`dfd-widget ${className ?? ""}`}
        style={{ width: "calc(100% - 40px)" }}
        aria-hidden="true"
      >
        <div className="px-5 pt-5">{chart}</div>
        <div className="flex flex-col gap-2 px-5 pb-5 pt-3">
          {heading}
          {chip}
          {caption}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`dfd-widget h-[196px] w-[544px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="absolute left-[25px] top-[25px] w-[328px]">{chart}</div>

      <div
        className="absolute left-[25px] top-[160px] w-[328px] text-center"
        aria-hidden="true"
      >
        {caption}
      </div>

      <div className="absolute left-[379px] top-[33px]">{heading}</div>
      <div className="absolute left-[379px] top-[59px]">{chip}</div>
    </div>
  );
}
