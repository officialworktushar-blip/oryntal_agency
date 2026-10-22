"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUp, Check, ChevronDown, Zap } from "lucide-react";

const PHRASE = "Plan a website for my business";
const TYPE_MS = 28;

function Cursor() {
  return (
    <svg
      width={34}
      height={34}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 3.2 18.6 10l-5.9 1.6-2.4 5.8L5 3.2Z"
        fill="#ffffff"
        stroke="#6C47E0"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PromptMock() {
  const reduced = useReducedMotion() ?? false;
  const [typed, setTyped] = useState(reduced ? PHRASE : "");

  useEffect(() => {
    if (reduced) {
      setTyped(PHRASE);
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(PHRASE.slice(0, index));
      if (index >= PHRASE.length) window.clearInterval(timer);
    }, TYPE_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const done = typed.length >= PHRASE.length;
  const clickDelay = reduced ? 0 : 0.35 + PHRASE.length * (TYPE_MS / 1000);
  const fade = reduced ? 0 : 0.12;

  return (
    <div className="relative h-[200px] w-[440px]" aria-hidden="true">
      {/* Stacked layers behind the prompt card */}
      <div className="absolute left-[18px] top-[46px] h-[122px] w-[428px] rounded-[18px] bg-white/[0.14]" />
      <div className="absolute left-[10px] top-[38px] h-[122px] w-[428px] rounded-[18px] bg-white/[0.22]" />

      <m.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: fade, ease: "easeOut" }}
        className="absolute left-0 top-[28px] h-[122px] w-[428px] rounded-[18px] bg-white px-4 py-3.5 text-[#1B1B1F] shadow-[0_18px_40px_rgba(40,20,140,0.30)]"
      >
        <div className="flex h-full flex-col justify-between">
          <p className="text-[16px] leading-snug">
            {typed}
            {!reduced && !done && (
              <span className="typing-caret ml-0.5 inline-block h-[15px] w-px translate-y-[2px] bg-[#4A2FB8]" />
            )}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1.5 text-[12px]">
              <Zap
                className="size-3.5 shrink-0 text-[#6C47E0]"
                strokeWidth={2.4}
              />
              <span className="truncate font-medium text-[#4A2FB8]">
                Website planner
              </span>
              <ChevronDown
                className="size-2.5 shrink-0 text-[#6B7480]"
                strokeWidth={2.6}
              />
            </div>

            <div className="relative shrink-0">
              <m.span
                aria-hidden="true"
                initial={reduced ? false : { scale: 0.6, opacity: 0.45 }}
                animate={reduced ? { opacity: 0 } : { scale: 2.1, opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  delay: clickDelay + 0.12,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute inset-0 rounded-xl border border-[#C9BFFF]"
              />
              <m.span
                className="grid size-10 place-items-center rounded-xl bg-[#5B3BE0] text-white"
                style={{ boxShadow: "0 0 0 1.5px #EDE9FF" }}
                animate={reduced ? undefined : { scale: [1, 1, 0.88, 1] }}
                transition={{
                  duration: 0.45,
                  delay: clickDelay,
                  times: [0, 0.45, 0.7, 1],
                }}
              >
                <ArrowUp className="size-4" strokeWidth={2.4} />
              </m.span>

              {!reduced && (
                <m.span
                  className="pointer-events-none absolute left-6 top-5"
                  initial={{ x: 64, y: 104, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Cursor />
                </m.span>
              )}
            </div>
          </div>
        </div>
      </m.div>

      <m.span
        initial={reduced ? false : { opacity: 0, y: 6, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduced ? 0 : 0.3,
          delay: reduced ? 0 : clickDelay + 0.35,
          ease: "easeOut",
        }}
        className="absolute left-[304px] top-[2px] inline-flex items-center gap-1 rounded-full bg-[#E3F5EA] px-2.5 py-1 text-[11px] font-medium text-[#1E8A4C]"
      >
        <Check className="size-3" strokeWidth={3} />
        Plan ready
      </m.span>
    </div>
  );
}
