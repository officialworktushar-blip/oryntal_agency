"use client";

import { useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChartColumn, CreditCard, Handshake, Headset, PackageCheck } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import Cursor from "@/components/services/premium-custom/Cursor";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN = 984;
const TILE = 134;
const GAP = 31;
const CURSOR_X = 345;
const CURSOR_Y = 215;

const iconMap: Record<string, LucideIcon> = {
  Handshake,
  CreditCard,
  PackageCheck,
  Headset,
  ChartColumn,
};

export default function ModulesCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef, scale } = useScaledCanvas(DESIGN, 0.45);
  const { modules } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(5, 2600, { inViewRef: cardRef });
  const items = modules.items.map((item) => ({ ...item, Icon: iconMap[item.icon] }));

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 30 };
  const cursorSpring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 120, damping: 20 };

  return (
    <article
      ref={cardRef}
      className="group relative h-full w-full overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_24px_60px_rgba(70,40,200,.18)] mx-auto max-w-[640px] md:max-w-none"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
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
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "984 / 340" }}
        role="img"
        aria-label="Expanding feature pills over an angled purple outline"
      >
        <div aria-hidden="true">
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{ width: DESIGN, height: 340, marginLeft: -DESIGN / 2, transform: `scale(${scale})` }}
          >
            <svg viewBox="0 0 984 340" className="absolute inset-0" aria-hidden="true">
              <defs>
                <linearGradient id="pcsAngled" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="rgba(99,61,230,.22)" />
                  <stop offset="1" stopColor="rgba(99,61,230,.03)" />
                </linearGradient>
              </defs>
              <polygon
                points="188,36 528,36 865,271 865,340 188,340"
                fill="url(#pcsAngled)"
                stroke="#6A4BE6"
                strokeWidth="1.2"
                className="transition-colors duration-300 group-hover:stroke-[#8A66FF]"
              />
            </svg>

            <div className="absolute overflow-visible" style={{ left: 45, top: 104 }}>
              <m.div
                className="flex items-center"
                style={{ gap: GAP }}
                initial={false}
                animate={{ x: reduced ? 0 : -(active * (TILE + GAP)) }}
                transition={spring}
              >
                {items.map((item, i) => {
                  const Icon = item.Icon;
                  const isActive = active === i;
                  return (
                    <m.div
                      key={item.label}
                      layout
                      className="relative flex h-[134px] shrink-0 items-center overflow-visible"
                      initial={false}
                      style={{
                        borderRadius: 30,
                        backgroundColor: isActive ? "#101012" : "#151517",
                        border: isActive ? "2px solid #7B65F0" : "1px solid rgba(255,255,255,.08)",
                        boxShadow: isActive ? "0 0 30px rgba(123,101,240,.35)" : "none",
                      }}
                      animate={{ width: isActive ? 360 : TILE }}
                      transition={spring}
                      onMouseEnter={() => {
                        if (reduced) return;
                        setActive(i);
                      }}
                    >
                      <Icon
                        size={isActive ? 60 : 52}
                        className={isActive ? "ml-[36px]" : "mx-auto"}
                        style={{ color: isActive ? "#8F7BFF" : "rgba(255,255,255,0.35)" }}
                      />
                      {isActive && (
                        <m.div
                          initial={reduced ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={reduced ? { duration: 0 } : { duration: 0.25 }}
                          className="ml-[22px] whitespace-nowrap text-[24px] font-semibold text-white"
                        >
                          {item.label}
                        </m.div>
                      )}
                    </m.div>
                  );
                })}
              </m.div>
            </div>

            {!reduced && (
              <AnimatePresence>
                <m.span
                  key={`module-ripple-${active}`}
                  className="pointer-events-none absolute"
                  style={{
                    left: CURSOR_X - 35,
                    top: CURSOR_Y - 35,
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
              className="pointer-events-none absolute"
              initial={false}
              animate={{ left: CURSOR_X, top: CURSOR_Y }}
              transition={cursorSpring}
            >
              <Cursor clickKey={active} reduced={reduced} />
            </m.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">
          {modules.title}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">
          {modules.text}
        </p>
      </div>
    </article>
  );
}
