"use client";

import { useId } from "react";
import { m } from "framer-motion";

type CursorProps = {
  className?: string;
  clickKey?: number | string;
  reduced?: boolean;
};

export default function Cursor({ className = "", clickKey = 0, reduced = false }: CursorProps) {
  const gradientId = `pcs-cursor-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 70 70"
      className={`h-[44px] w-[44px] md:h-[70px] md:w-[70px] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7B4DFF" />
          <stop offset="1" stopColor="#2A1478" />
        </linearGradient>
      </defs>
      <m.g
        key={clickKey}
        initial={reduced ? false : { scale: 1 }}
        animate={reduced ? { scale: 1 } : { scale: [1, 0.88, 1] }}
        transition={reduced ? { duration: 0 } : { duration: 0.2, delay: 0.18, ease: "easeOut" }}
        style={{ transformBox: "view-box", transformOrigin: "2px 2px" }}
      >
        <path
          d="M2 2 L62 33 L33 37 L23 61 Z"
          fill={`url(#${gradientId})`}
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 10px 22px rgba(123,77,255,.5))" }}
        />
      </m.g>
    </svg>
  );
}
