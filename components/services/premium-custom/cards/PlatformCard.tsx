"use client";

import { useRef } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bot,
  Boxes,
  CreditCard,
  Database,
  MessagesSquare,
  Smartphone,
  Zap,
} from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import Cursor from "@/components/services/premium-custom/Cursor";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const iconMap: Record<string, LucideIcon> = {
  AppWindow,
  Smartphone,
  Boxes,
};

const DESIGN = 697;
const ROW_TOPS = [134, 278, 421];
const ROW_HEIGHTS = [113, 112, 112];

export default function PlatformCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { amount: 0.3 });
  const { wrapperRef: wrapA, scale: scaleA } = useScaledCanvas(DESIGN, 0.45);
  const { wrapperRef: wrapB, scale: scaleB } = useScaledCanvas(DESIGN, 0.45);
  const { platform } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(3, 2600, { inViewRef: cardRef });
  const {
    active: pulseTick,
    pause: pausePulse,
    resume: resumePulse,
  } = useAutoCycle(1000, 5000, { inViewRef: cardRef });

  const rows = platform.rows.map((row) => ({ ...row, Icon: iconMap[row.icon] }));
  const cursorLeft = 550;
  const cursorTop = ROW_TOPS[active] + 48;

  const handleEnter = () => {
    pause();
    pausePulse();
  };
  const handleLeave = () => {
    resume();
    resumePulse();
  };

  const rowTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 28 };
  const cursorTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 120, damping: 20 };

  return (
    <article
      ref={cardRef}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_24px_60px_rgba(70,40,200,.18)] mx-auto max-w-[640px] md:max-w-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocusCapture={handleEnter}
      onBlurCapture={handleLeave}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative">
        <div
          ref={wrapA}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "697 / 560" }}
          role="img"
          aria-label="Options for a custom web application, mobile application or business-specific system"
        >
          <div aria-hidden="true">
            <div
              className="absolute left-1/2 top-0 origin-top"
              style={{ width: DESIGN, height: 560, marginLeft: -DESIGN / 2, transform: `scale(${scaleA})` }}
            >
              <svg viewBox="0 0 697 560" className="absolute inset-0" aria-hidden="true">
                <defs>
                  <linearGradient id="pcsPoly" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="rgba(99,61,230,.22)" />
                    <stop offset="1" stopColor="rgba(99,61,230,.04)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 395 L460 55 H697 V560 H0 Z"
                  fill="url(#pcsPoly)"
                  stroke="#6E49F0"
                  strokeWidth="1.2"
                  className="transition-colors duration-300 group-hover:stroke-[#8A66FF]"
                />
              </svg>

              {rows.map((row, i) => {
                const Icon = row.Icon;
                const isActive = active === i;
                return (
                  <m.div
                    key={row.label}
                    className="absolute flex items-center"
                    style={{
                      left: 45,
                      top: ROW_TOPS[i],
                      width: 604,
                      height: ROW_HEIGHTS[i],
                      borderRadius: 28,
                    }}
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? "#101012" : "rgba(255,255,255,.035)",
                      border: isActive
                        ? "2.5px solid transparent"
                        : "1px solid rgba(255,255,255,.08)",
                      boxShadow: isActive ? "none" : "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={rowTransition}
                    onMouseEnter={() => {
                      if (reduced) return;
                      setActive(i);
                    }}
                  >
                    {isActive && (
                      <m.div
                        layoutId="pcsRow"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          borderRadius: 28,
                          border: "2.5px solid #7B4DFF",
                          boxShadow: "0 0 30px rgba(123,77,255,.35)",
                        }}
                        transition={rowTransition}
                      />
                    )}
                    <div
                      className="relative ml-[21px] flex items-center justify-center"
                      style={{
                        width: 78,
                        height: 78,
                        borderRadius: 20,
                        backgroundColor: isActive ? "white" : "#232327",
                        transition: reduced ? "none" : "background-color .3s ease",
                      }}
                    >
                      <Icon
                        size={40}
                        style={{
                          color: isActive ? "#673DE6" : "rgba(255,255,255,0.8)",
                          transition: reduced ? "none" : "color .3s ease",
                        }}
                      />
                    </div>
                    <div
                      className="relative ml-[50px] text-[32px] leading-none tracking-[0.01em]"
                      style={{
                        fontWeight: 600,
                        color: isActive ? "white" : "rgba(255,255,255,0.75)",
                        transition: reduced ? "none" : "color .3s ease",
                      }}
                    >
                      {row.label}
                    </div>
                  </m.div>
                );
              })}

              {!reduced && (
                <AnimatePresence>
                  <m.span
                    key={`ripple-${active}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute"
                    style={{
                      left: cursorLeft - 35,
                      top: cursorTop - 35,
                      width: 70,
                      height: 70,
                      borderRadius: 999,
                      border: "2px solid rgba(185,168,255,.65)",
                    }}
                    initial={{ scale: 0.25, opacity: 0.7 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  />
                </AnimatePresence>
              )}

              <m.div
                aria-hidden="true"
                className="pointer-events-none absolute"
                initial={false}
                animate={{ left: cursorLeft, top: cursorTop }}
                transition={cursorTransition}
              >
                <Cursor clickKey={active} reduced={reduced} />
              </m.div>
            </div>
          </div>
        </div>

        <div
          ref={wrapB}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "697 / 400" }}
          role="img"
          aria-label="AI agent workflow connecting chat, an AI agent, payments and a database"
        >
          <div aria-hidden="true">
            <div
              className="absolute left-1/2 top-0 origin-top"
              style={{ width: DESIGN, height: 400, marginLeft: -DESIGN / 2, transform: `scale(${scaleB})` }}
            >
              <svg viewBox="0 0 697 400" className="absolute inset-0" aria-hidden="true">
                <rect x="0" y="0" width="160" height="245" fill="rgba(99,61,230,.16)" />
                <line x1="0" y1="245" x2="160" y2="245" stroke="#6E49F0" strokeWidth="1" />
              </svg>

              <div
                className="absolute overflow-hidden"
                style={{
                  left: 160,
                  top: 10,
                  width: 560,
                  height: 392,
                  borderRadius: 30,
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,.07) 2px, transparent 2px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              <svg className="absolute inset-0" viewBox="0 0 697 400" aria-hidden="true">
                <path
                  d="M367 141 H407"
                  stroke="rgba(255,255,255,.18)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M503 203 V215 Q503 229 489 229 H454 Q440 229 440 243 V249"
                  stroke="rgba(255,255,255,.2)"
                  strokeWidth="1.2"
                  fill="none"
                  className="transition-colors duration-300 group-hover:stroke-[#9A7BFF]/60"
                />
                <path
                  d="M588 203 V249"
                  stroke="rgba(255,255,255,.2)"
                  strokeWidth="1.2"
                  fill="none"
                  className="transition-colors duration-300 group-hover:stroke-[#9A7BFF]/60"
                />
              </svg>

              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: 211,
                  top: 141,
                  width: 30,
                  height: 30,
                  filter: "drop-shadow(0 0 12px rgba(185,168,255,.35))",
                }}
              >
                <Zap size={30} style={{ color: "rgba(255,255,255,0.7)" }} />
              </div>

              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: 244,
                  top: 80,
                  width: 123,
                  height: 123,
                  borderRadius: 38,
                  backgroundColor: "#141416",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
              >
                <MessagesSquare size={58} style={{ color: "rgba(255,255,255,0.85)" }} />
              </div>

              <m.div
                key={`agent-${pulseTick}`}
                className="absolute flex items-center"
                style={{
                  left: 407,
                  top: 80,
                  width: 330,
                  height: 123,
                  borderRadius: 28,
                  backgroundColor: "#141416",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
                initial={{ borderColor: "rgba(255,255,255,.14)" }}
                animate={
                  reduced || !cardInView
                    ? { borderColor: "rgba(255,255,255,.14)" }
                    : {
                        borderColor: [
                          "rgba(255,255,255,.14)",
                          "rgba(185,168,255,.95)",
                          "rgba(255,255,255,.14)",
                        ],
                      }
                }
                transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 1.05, times: [0, 0.4, 1] }}
              >
                <Bot size={62} className="ml-[92px]" style={{ color: "rgba(255,255,255,0.85)" }} />
                <div className="ml-[16px] text-[28px] font-semibold text-white/90">AI Agent</div>
              </m.div>

              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: 391,
                  top: 249,
                  width: 99,
                  height: 99,
                  borderRadius: "50%",
                  backgroundColor: "#141416",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
              >
                <CreditCard size={44} style={{ color: "rgba(255,255,255,0.8)" }} />
              </div>
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: 539,
                  top: 249,
                  width: 99,
                  height: 99,
                  borderRadius: "50%",
                  backgroundColor: "#141416",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
              >
                <Database size={44} style={{ color: "rgba(255,255,255,0.8)" }} />
              </div>
              <div
                className="absolute"
                style={{ left: 391, top: 355, width: 99, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)" }}
              >
                Payments
              </div>
              <div
                className="absolute"
                style={{ left: 539, top: 355, width: 99, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)" }}
              >
                Your data
              </div>

              {!reduced && cardInView && (
                <>
                  <svg className="pointer-events-none absolute inset-0" viewBox="0 0 697 400" aria-hidden="true">
                    <m.circle
                      key={`pulse-main-${pulseTick}`}
                      r={3.5}
                      fill="#B9A8FF"
                      style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
                      initial={{ cx: 226, cy: 156, opacity: 0 }}
                      animate={{ cx: [226, 305, 407], cy: [156, 141, 141], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.3, times: [0, 0.35, 0.85, 1], ease: "easeInOut" }}
                    />
                    <m.circle
                      key={`pulse-pay-${pulseTick}`}
                      r={3.5}
                      fill="#B9A8FF"
                      style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
                      initial={{ cx: 503, cy: 203, opacity: 0 }}
                      animate={{
                        cx: [503, 503, 489, 440, 440],
                        cy: [203, 229, 229, 229, 249],
                        opacity: [0, 1, 1, 1, 0],
                      }}
                      transition={{ duration: 1.2, delay: 1.25, times: [0, 0.25, 0.45, 0.78, 1], ease: "easeInOut" }}
                    />
                    <m.circle
                      key={`pulse-data-${pulseTick}`}
                      r={3.5}
                      fill="#B9A8FF"
                      style={{ filter: "drop-shadow(0 0 6px #B9A8FF)" }}
                      initial={{ cx: 588, cy: 203, opacity: 0 }}
                      animate={{ cx: 588, cy: [203, 249], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, delay: 1.25, times: [0, 0.8, 1], ease: "easeInOut" }}
                    />
                  </svg>

                  <svg className="pointer-events-none absolute inset-0" viewBox="0 0 697 400" aria-hidden="true">
                    <m.g
                      key={`badge-pay-${pulseTick}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1.15, 1, 1] }}
                      transition={{ duration: 2.2, delay: 2.35, times: [0, 0.45, 0.62, 0.82, 1] }}
                      style={{ transformBox: "fill-box", transformOrigin: "472px 270px" }}
                    >
                      <circle cx="472" cy="270" r="8" fill="#34C77B" />
                      <path d="M468.5 270 l2.5 2.5 l4.5 -5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </m.g>
                    <m.g
                      key={`badge-data-${pulseTick}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1.15, 1, 1] }}
                      transition={{ duration: 2.2, delay: 2.35, times: [0, 0.45, 0.62, 0.82, 1] }}
                      style={{ transformBox: "fill-box", transformOrigin: "619px 270px" }}
                    >
                      <circle cx="619" cy="270" r="8" fill="#34C77B" />
                      <path d="M615.5 270 l2.5 2.5 l4.5 -5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </m.g>
                  </svg>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="relative z-10 px-8 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">
          {platform.title}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">
          {platform.text}
        </p>
      </div>
    </article>
  );
}
