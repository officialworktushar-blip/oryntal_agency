"use client";

import type { LucideIcon } from "lucide-react";

/** A 300 degree ring, open at the bottom. */
const ARC_PATH = "M 33.75 113.66 A 58.5 58.5 0 1 1 92.25 113.66";

type GaugeProps = {
  /** Caption above the ring. */
  label: string;
  /** Word in the middle of the ring. */
  centerText: string;
  /** Size of the middle word, in canvas px. */
  centerSize?: number;
  /** Small line under the middle word. */
  sub?: string;
  /** Icon sitting in the gap at the bottom of the ring. */
  gapIcon?: LucideIcon;
  color?: "teal" | "purple";
  /** Position of the gauge inside its widget. */
  className?: string;
};

export default function Gauge({
  label,
  centerText,
  centerSize = 30,
  sub,
  gapIcon: GapIcon,
  color = "teal",
  className,
}: GaugeProps) {
  const stroke = color === "teal" ? "var(--dfd-teal)" : "var(--dfd-4)";

  return (
    <div
      className={`relative h-[126px] w-[126px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        width={126}
        height={126}
        viewBox="0 0 126 126"
        fill="none"
        focusable="false"
      >
        <text
          x={63}
          y={26}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight={500}
          fill="var(--dfd-ink-soft)"
        >
          {label}
        </text>

        <path
          d={ARC_PATH}
          fill="none"
          stroke="var(--dfd-track)"
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path
          className="dfd-draw dfd-draw-in"
          d={ARC_PATH}
          pathLength={1}
          fill="none"
          stroke={stroke}
          strokeWidth={9}
          strokeLinecap="round"
        />

        {sub ? (
          <>
            <text
              x={63}
              y={57}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={centerSize}
              fontWeight={700}
              fill={stroke}
            >
              {centerText}
            </text>
            <text
              x={63}
              y={82}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={13}
              fill="var(--dfd-ink-soft)"
            >
              {sub}
            </text>
          </>
        ) : (
          <text
            x={63}
            y={63}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={centerSize}
            fontWeight={700}
            fill={stroke}
          >
            {centerText}
          </text>
        )}
      </svg>

      {GapIcon ? (
        <span className="absolute left-1/2 top-[92px] -translate-x-1/2 text-[var(--dfd-ink-soft)]">
          <GapIcon className="size-4" strokeWidth={2} />
        </span>
      ) : null}
    </div>
  );
}
