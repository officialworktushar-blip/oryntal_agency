"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const DESIGN = 482;

export default function WorkflowCard() {
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const { wrapperRef, scale } = useScaledCanvas(DESIGN, 0.45);
  const { workflow } = premiumCustom.system.cards;
  const { pause, resume } = useAutoCycle(workflow.feed.length, 2400, { inViewRef: cardRef });
  const [rows, setRows] = useState(() =>
    workflow.feed.slice(0, 5).map((f, i) => ({
      id: i,
      name: f[0],
      module: f[1],
      status: "Done" as const,
    }))
  );
  const [index, setIndex] = useState(5);

  if (typeof window !== "undefined") {
    console.log("[PCS] workflow card rect", cardRef.current?.getBoundingClientRect(), "scale", scale);
  }

  return (
    <article
      ref={cardRef}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#17171A] to-[#111113] transition-all duration-300 hover:border-white/12 hover:shadow-[0_24px_60px_rgba(70,40,200,.18)]"
      onMouseEnter={() => {
        pause();
      }}
      onMouseLeave={() => {
        resume();
      }}
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
        aria-label="Live business workflow showing orders, payments, inventory, messaging, reports, suppliers, billing and shipping"
      >
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: DESIGN, height: 390, marginLeft: -DESIGN / 2, transform: `scale(${scale})` }}
        >
          <div
            className="absolute"
            style={{ left: 55, top: 73, width: 370, height: 84, borderRadius: 26, backgroundColor: "#0D0D0F", border: "1px solid rgba(255,255,255,.08)", opacity: 0.8 }}
          />
          <div
            className="absolute"
            style={{ left: 75, top: 59, width: 330, height: 84, borderRadius: 26, backgroundColor: "#0D0D0F", border: "1px solid rgba(255,255,255,.08)", opacity: 0.55 }}
          />
          <div
            className="absolute flex items-center justify-between"
            style={{ left: 35, top: 91, width: 410, height: 84, borderRadius: 26, backgroundColor: "#101012", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 14px 30px rgba(0,0,0,.45)" }}
          >
            <div className="ml-[20px] text-[19px] font-semibold text-white">{workflow.header}</div>
            <div className="mr-[20px] flex items-center gap-2">
              <span className="text-[14px] font-semibold" style={{ color: "#2DD4A0" }}>Active</span>
              <span className="h-1.5 w-1.5 rounded-full pc-pulse-dot" style={{ backgroundColor: "#2DD4A0" }} />
              <div className="relative h-[30px] w-[56px] rounded-full bg-[#14B889]">
                <div className="absolute right-[3px] top-[3px] h-[24px] w-[24px] rounded-full bg-white" />
              </div>
            </div>
          </div>

          <div
            className="absolute"
            style={{ left: 35, top: 181, width: 410, maskImage: "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)" }}
          >
            <AnimatePresence initial={false}>
              {rows.slice(0, 5).map((row, i) => (
                <m.div
                  key={row.id}
                  layout
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 40, opacity: 1 }}
                  exit={reduced ? {} : { height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="relative flex items-center"
                  style={{ height: 40 }}
                >
                  <div className="absolute left-[3px] h-[18px] w-[2px]" style={{ backgroundColor: "#1FB5A0" }} />
                  <div className="ml-[45px] text-[12.5px] text-white/85">{row.name}</div>
                  <div className="absolute left-[190px] flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: row.status === "Done" ? "#34C77B" : "#FFC53D" }}
                    />
                    <span className="text-[12.5px]" style={{ color: row.status === "Done" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.8)" }}>
                      {row.status}
                    </span>
                  </div>
                  <div className="absolute right-[20px] text-[12px] text-white/55">{row.module}</div>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8 pt-2 lg:px-[30px]">
        <h3 className="text-[26px] font-medium tracking-[-0.01em] text-white lg:text-[28px]">{workflow.title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-white/75 lg:text-[17px]">{workflow.text}</p>
      </div>
    </article>
  );
}
