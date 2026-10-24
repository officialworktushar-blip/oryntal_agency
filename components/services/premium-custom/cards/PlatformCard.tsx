"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  BarChart3,
  Bot,
  Boxes,
  CreditCard,
  Database,
  Hammer,
  Handshake,
  Headset,
  LayoutTemplate,
  MessagesSquare,
  PackageCheck,
  SlidersHorizontal,
  Smartphone,
  Zap,
} from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import Cursor from "@/components/services/premium-custom/Cursor";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const iconMap: Record<string, any> = {
  AppWindow,
  Smartphone,
  Boxes,
  MessagesSquare,
  Bot,
  CreditCard,
  Database,
  Zap,
  LayoutTemplate,
  Hammer,
  SlidersHorizontal,
  Handshake,
  PackageCheck,
  Headset,
  BarChart3,
};

const DESIGN_A = 697;
const DESIGN_B = 697;

export default function PlatformCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef: wrapA, scale: scaleA } = useScaledCanvas(DESIGN_A, 0.45);
  const { wrapperRef: wrapB, scale: scaleB } = useScaledCanvas(DESIGN_B, 0.45);
  const { platform } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(3, 2600, { inViewRef: cardRef });

  const rows = platform.rows.map((r) => ({ ...r, Icon: iconMap[r.icon] }));
  const tops = [134, 278, 421];

  if (typeof window !== "undefined") {
    console.log("[PCS] platform card rect", cardRef.current?.getBoundingClientRect(), "scales", scaleA, scaleB);
  }

  return (
    <article
      ref={cardRef}
      className="relative flex flex-col overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/12 hover:shadow-[0_24px_60px_rgba(70,40,200,.18)] lg:row-span-2"
      onMouseEnter={pause}
      onMouseLeave={resume}
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
          className="relative w-full"
          style={{ aspectRatio: "697 / 560" }}
          role="img"
          aria-label="Options for a custom web application, mobile application or business-specific system"
        >
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{ width: DESIGN_A, height: 560, marginLeft: -DESIGN_A / 2, transform: `scale(${scaleA})` }}
          >
            <svg viewBox="0 0 697 560" className="absolute inset-0" aria-hidden>
              <defs>
                <linearGradient id="pcsPoly" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="rgba(99,61,230,.22)" />
                  <stop offset="1" stopColor="rgba(99,61,230,.04)" />
                </linearGradient>
              </defs>
              <path d="M0 395 L460 55 H697 V560 H0 Z" fill="url(#pcsPoly)" stroke="#6E49F0" strokeWidth="1.2" />
            </svg>
            {rows.map((row, i) => {
              const Icon = row.Icon;
              const isActive = active === i;
              return (
                <m.div
                  key={row.label}
                  className="absolute flex items-center"
                  style={{ left: 45, top: tops[i], width: 604, height: 113, borderRadius: 28 }}
                  initial={false}
                  animate={{
                    backgroundColor: isActive ? "#101012" : "rgba(255,255,255,.035)",
                    border: isActive ? "2.5px solid #7B4DFF" : "1px solid rgba(255,255,255,.08)",
                    boxShadow: isActive ? "0 0 30px rgba(123,77,255,.35)" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => {
                    if (reduced) return;
                    setActive(i);
                  }}
                >
                  <div
                    className="ml-[21px] flex items-center justify-center"
                    style={{
                      width: 78,
                      height: 78,
                      borderRadius: 20,
                      backgroundColor: isActive ? "white" : "#232327",
                    }}
                  >
                    <Icon size={40} style={{ color: isActive ? "#673DE6" : "rgba(255,255,255,0.8)" }} />
                  </div>
                  <div
                    className="ml-[50px] text-[32px] leading-none tracking-[0.01em]"
                    style={{ fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.75)" }}
                  >
                    {row.label}
                  </div>
                </m.div>
              );
            })}
            <m.div
              aria-hidden
              className="absolute"
              initial={false}
              animate={{ left: 45 + 505, top: tops[active] + 48 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <Cursor />
            </m.div>
          </div>
        </div>

        <div
          ref={wrapB}
          className="relative w-full -mt-4"
          style={{ aspectRatio: "697 / 400" }}
          role="img"
          aria-label="AI agent workflow connecting chat, an AI agent, payments and a database"
        >
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{ width: DESIGN_B, height: 400, marginLeft: -DESIGN_B / 2, transform: `scale(${scaleB})` }}
          >
            <svg viewBox="0 0 697 400" className="absolute inset-0" aria-hidden>
              <rect x="0" y="0" width="160" height="245" fill="rgba(99,61,230,.16)" />
              <line x1="0" y1="245" x2="160" y2="245" stroke="#6E49F0" strokeWidth="1" />
            </svg>
            <div
              className="absolute"
              style={{ left: 160, top: 10, width: 560, height: 392, borderRadius: 30, backgroundColor: "#121214", border: "1px solid rgba(255,255,255,.08)" }}
            >
              <div
                className="absolute inset-0 rounded-[30px]"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,.07) 2px, transparent 2px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <Zap size={30} className="absolute" style={{ left: 211, top: 141, color: "rgba(255,255,255,0.7)" }} />
              <div
                className="absolute flex items-center justify-center"
                style={{ left: 244, top: 80, width: 123, height: 123, borderRadius: 38, backgroundColor: "#141416", border: "1px solid rgba(255,255,255,.14)" }}
              >
                <MessagesSquare size={58} style={{ color: "rgba(255,255,255,0.85)" }} />
              </div>
              <svg className="absolute" style={{ left: 367, top: 141 }} width="40" height="1" aria-hidden>
                <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
              </svg>
              <div
                className="absolute flex items-center"
                style={{ left: 407, top: 80, width: 330, height: 123, borderRadius: 28, backgroundColor: "#141416", border: "1px solid rgba(255,255,255,.14)" }}
              >
                <Bot size={62} className="ml-[92px]" style={{ color: "rgba(255,255,255,0.85)" }} />
                <div className="ml-[16px] text-[28px] font-semibold text-white/90">AI Agent</div>
              </div>
              <svg className="absolute inset-0" aria-hidden>
                <path d="M503 203 V215 Q503 229 489 229 H454 Q440 229 440 243 V249" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" fill="none" />
                <path d="M588 203 V249" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" fill="none" />
              </svg>
              <div
                className="absolute flex items-center justify-center"
                style={{ left: 391, top: 249, width: 99, height: 99, borderRadius: "50%", backgroundColor: "#141416", border: "1px solid rgba(255,255,255,.14)" }}
              >
                <CreditCard size={44} style={{ color: "rgba(255,255,255,0.8)" }} />
              </div>
              <div
                className="absolute flex items-center justify-center"
                style={{ left: 539, top: 249, width: 99, height: 99, borderRadius: "50%", backgroundColor: "#141416", border: "1px solid rgba(255,255,255,.14)" }}
              >
                <Database size={44} style={{ color: "rgba(255,255,255,0.8)" }} />
              </div>
              <div className="absolute" style={{ left: 391, top: 355, width: 99, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Payments</div>
              <div className="absolute" style={{ left: 539, top: 355, width: 99, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Your data</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 px-6 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">{platform.title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">{platform.text}</p>
      </div>
    </article>
  );
}
