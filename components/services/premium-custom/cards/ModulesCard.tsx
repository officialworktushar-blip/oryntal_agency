"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { BarChart3, CreditCard, Handshake, Headset, PackageCheck } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import Cursor from "@/components/services/premium-custom/Cursor";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN = 984;

const iconMap: Record<string, any> = {
  Handshake,
  CreditCard,
  PackageCheck,
  Headset,
  BarChart3,
};

export default function ModulesCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef, scale } = useScaledCanvas(DESIGN, 0.45);
  const { modules } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(5, 2600, { inViewRef: cardRef });
  const items = modules.items.map((mitem) => ({ ...mitem, Icon: iconMap[mitem.icon] }));

  if (typeof window !== "undefined") {
    console.log("[PCS] modules card rect", cardRef.current?.getBoundingClientRect(), "scale", scale);
  }

  return (
    <article
      ref={cardRef}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/12 hover:shadow-[0_24px_60px_rgba(70,40,200,.18)] md:col-span-2 lg:col-span-2"
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

      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ aspectRatio: "984 / 340" }}
        role="img"
        aria-label="Expanding feature pills over an angled purple outline"
      >
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: DESIGN, height: 340, marginLeft: -DESIGN / 2, transform: `scale(${scale})` }}
        >
          <svg viewBox="0 0 984 340" className="absolute inset-0" aria-hidden>
            <defs>
              <linearGradient id="pcsAngled" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="rgba(99,61,230,.22)" />
                <stop offset="1" stopColor="rgba(99,61,230,.03)" />
              </linearGradient>
            </defs>
            <polygon points="188,36 528,36 865,271 865,340 188,340" fill="url(#pcsAngled)" stroke="#6A4BE6" strokeWidth="1.2" />
          </svg>
          <m.div
            className="absolute flex items-center"
            style={{ left: 45, top: 104, gap: 31 }}
            animate={{ x: reduced ? 0 : -(active * (134 + 31)) }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
          >
            {items.map((item, i) => {
              const Icon = item.Icon;
              const isActive = active === i;
              return (
                <m.div
                  key={item.label}
                  layout
                  className="relative flex items-center overflow-visible"
                  style={{
                    height: 134,
                    borderRadius: 30,
                    backgroundColor: isActive ? "#101012" : "#151517",
                    border: isActive ? "2px solid #7B65F0" : "1px solid rgba(255,255,255,.08)",
                    boxShadow: isActive ? "0 0 30px rgba(123,101,240,.35)" : "none",
                  }}
                  animate={{ width: isActive ? 360 : 134 }}
                  transition={{ type: "spring", stiffness: 220, damping: 30 }}
                  onMouseEnter={() => {
                    if (reduced) return;
                    setActive(i);
                  }}
                >
                  <Icon
                    size={isActive ? 60 : 52}
                    className="ml-[36px]"
                    style={{ color: isActive ? "#8F7BFF" : "rgba(255,255,255,0.35)" }}
                  />
                  {isActive && (
                    <m.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-[22px] text-[24px] font-semibold text-white"
                    >
                      {item.label}
                    </m.div>
                  )}
                </m.div>
              );
            })}
          </m.div>
          <m.div
            aria-hidden
            className="absolute"
            initial={false}
            animate={{ left: 45 + 345, top: 104 + 111 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Cursor />
          </m.div>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">{modules.title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">{modules.text}</p>
      </div>
    </article>
  );
}
