"use client";

import { m } from "framer-motion";

export default function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" className={className} aria-hidden>
      <defs>
        <linearGradient id="pcsCursor" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7B4DFF" />
          <stop offset="1" stopColor="#2A1478" />
        </linearGradient>
      </defs>
      <m.path
        d="M10 6 L60 35 L33 39 L24 57 Z"
        fill="url(#pcsCursor)"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 10px 22px rgba(123,77,255,.5))" }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 0.88, 1] }}
        transition={{ duration: 0.18 }}
      />
    </svg>
  );
}
