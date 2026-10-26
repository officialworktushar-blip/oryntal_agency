"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Hammer, LayoutTemplate, SlidersHorizontal } from "lucide-react";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN = 482;
const LAYER_TOPS = [88, 196, 304];

const iconMap: Record<string, LucideIcon> = {
  LayoutTemplate,
  Hammer,
  SlidersHorizontal,
};

function PlusMark({ left, top, delay }: { left: number; top: number; delay: number }) {
  return (
    <svg
      className="pcs-twinkle absolute"
      style={{ left, top, animationDelay: `${delay}ms` }}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <line x1="7" y1="0" x2="7" y2="14" stroke="#7B5CFF" strokeWidth="2.5" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#7B5CFF" strokeWidth="2.5" />
    </svg>
  );
}

export default function PrototypeCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef, scale } = useScaledCanvas(DESIGN, 0.45);
  const { prototype } = premiumCustom.system.cards;
  const { active, setActive, pause, resume } = useAutoCycle(3, 2400, { inViewRef: cardRef });
  const layers = prototype.layers.map((layer) => ({ ...layer, Icon: iconMap[layer.icon] }));

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
        style={{ aspectRatio: "482 / 390" }}
        role="img"
        aria-label="Prototype, build and refine layers showing progress"
      >
        <div aria-hidden="true">
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{ width: DESIGN, height: 390, marginLeft: -DESIGN / 2, transform: `scale(${scale})` }}
          >
            <div
              className="absolute"
              style={{
                left: 100,
                top: 150,
                width: 280,
                height: 200,
                background: "radial-gradient(closest-side, rgba(99,61,230,.24), transparent)",
                filter: "blur(10px)",
              }}
            />

            {layers.map((layer, i) => {
              const Icon = layer.Icon;
              const isActive = active === i;
              return (
                <m.div
                  key={layer.label}
                  className="absolute"
                  style={{
                    left: 77,
                    top: LAYER_TOPS[i],
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
                  initial={false}
                  animate={{
                    backgroundColor: isActive ? "#101012" : "rgba(255,255,255,.035)",
                    borderColor: isActive ? "#8E7BFF" : "rgba(255,255,255,.1)",
                    boxShadow: isActive ? "0 0 28px rgba(123,92,255,.35)" : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={reduced ? { duration: 0 } : { duration: 0.3 }}
                  onMouseEnter={() => {
                    if (reduced) return;
                    setActive(i);
                  }}
                >
                  <Icon
                    size={42}
                    className="absolute"
                    style={{
                      left: 26,
                      top: 25,
                      color: isActive ? "white" : "rgba(255,255,255,0.55)",
                      transition: reduced ? "none" : "color .3s ease",
                    }}
                  />
                  <div
                    className="absolute text-[20px] font-semibold"
                    style={{
                      left: 86,
                      top: 14,
                      color: isActive ? "white" : "rgba(255,255,255,0.7)",
                      transition: reduced ? "none" : "color .3s ease",
                    }}
                  >
                    {layer.label}
                  </div>
                  <div
                    className="absolute overflow-hidden rounded-full"
                    style={{ left: 86, top: 56, width: 210, height: 4, backgroundColor: "rgba(255,255,255,.14)" }}
                  >
                    <m.div
                      className="h-full rounded-full"
                      initial={reduced ? false : { width: isActive ? "0%" : "35%" }}
                      animate={{
                        width: reduced ? (isActive ? "60%" : "35%") : isActive ? "100%" : "35%",
                      }}
                      transition={
                        reduced ? { duration: 0 } : { duration: isActive ? 2.2 : 0.3, ease: "easeOut" }
                      }
                      style={{ backgroundColor: isActive ? "#7B4DFF" : "rgba(255,255,255,.3)" }}
                    />
                  </div>
                </m.div>
              );
            })}

            <PlusMark left={176} top={60} delay={0} />
            <PlusMark left={448} top={129} delay={800} />
            <PlusMark left={41} top={264} delay={1600} />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">
          {prototype.title}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">
          {prototype.text}
        </p>
      </div>
    </article>
  );
}
