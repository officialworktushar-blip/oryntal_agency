"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Hammer, LayoutTemplate, SlidersHorizontal } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN = 482;

const iconMap: Record<string, any> = {
  LayoutTemplate,
  Hammer,
  SlidersHorizontal,
};

export default function PrototypeCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef, scale } = useScaledCanvas(DESIGN, 0.45);
  const { prototype } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(3, 2400, { inViewRef: cardRef });
  const layers = prototype.layers.map((l) => ({ ...l, Icon: iconMap[l.icon] }));
  const tops = [88, 196, 304];

  if (typeof window !== "undefined") {
    console.log("[PCS] prototype card rect", cardRef.current?.getBoundingClientRect(), "scale", scale);
  }

  return (
    <article
      ref={cardRef}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/12 hover:shadow-[0_24px_60px_rgba(70,40,200,.18)]"
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
        style={{ aspectRatio: "482 / 390" }}
        role="img"
        aria-label="Prototype, build and refine layers showing progress"
      >
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: DESIGN, height: 390, marginLeft: -DESIGN / 2, transform: `scale(${scale})` }}
        >
          <div
            className="absolute"
            style={{ left: 100, top: 150, width: 280, height: 200, background: "radial-gradient(closest-side, rgba(99,61,230,.24), transparent)", filter: "blur(10px)" }}
          />
          {layers.map((layer, i) => {
            const Icon = layer.Icon;
            const isActive = active === i;
            return (
              <m.div
                key={layer.label}
                className="absolute flex items-center"
                style={{
                  left: 77,
                  top: tops[i],
                  width: 330,
                  height: 92,
                  borderRadius: 32,
                  backgroundColor: isActive ? "#101012" : "rgba(255,255,255,.035)",
                  border: isActive ? "2px solid #8E7BFF" : "1px solid rgba(255,255,255,.1)",
                  boxShadow: isActive ? "0 0 28px rgba(123,92,255,.35)" : "none",
                  opacity: i === 2 ? 0.5 : 1,
                  maskImage: i === 2 ? "linear-gradient(to bottom, #000 40%, transparent 100%)" : undefined,
                  WebkitMaskImage: i === 2 ? "linear-gradient(to bottom, #000 40%, transparent 100%)" : undefined,
                }}
                onMouseEnter={() => {
                  if (reduced) return;
                  setActive(i);
                }}
              >
                <Icon
                  size={42}
                  className="ml-[26px]"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.55)" }}
                />
                <div className="ml-[18px]">
                  <div
                    className="text-[20px] font-semibold"
                    style={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                  >
                    {layer.label}
                  </div>
                  <div className="mt-[10px] h-[4px] w-[210px] rounded-full" style={{ backgroundColor: "rgba(255,255,255,.14)" }}>
                    <m.div
                      className="h-full rounded-full"
                      initial={{ width: reduced ? "35%" : "0%" }}
                      animate={{ width: isActive ? "100%" : "35%" }}
                      transition={{ duration: isActive && !reduced ? 2.2 : 0.3 }}
                      style={{ backgroundColor: isActive ? "#7B4DFF" : "rgba(255,255,255,.3)" }}
                    />
                  </div>
                </div>
              </m.div>
            );
          })}
          <svg className="absolute" style={{ left: 176, top: 60 }} width="14" height="14" aria-hidden>
            <line x1="7" y1="0" x2="7" y2="14" stroke="#7B5CFF" strokeWidth="2.5" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="#7B5CFF" strokeWidth="2.5" />
          </svg>
          <svg className="absolute" style={{ left: 448, top: 129 }} width="14" height="14" aria-hidden>
            <line x1="7" y1="0" x2="7" y2="14" stroke="#7B5CFF" strokeWidth="2.5" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="#7B5CFF" strokeWidth="2.5" />
          </svg>
          <svg className="absolute" style={{ left: 41, top: 264 }} width="14" height="14" aria-hidden>
            <line x1="7" y1="0" x2="7" y2="14" stroke="#7B5CFF" strokeWidth="2.5" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="#7B5CFF" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">{prototype.title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">{prototype.text}</p>
      </div>
    </article>
  );
}
