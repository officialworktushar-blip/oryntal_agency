"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion, useSpring, type MotionStyle } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const COLUMN_WEIGHTS = [22.4, 30.1, 25.7, 21.8] as const;
const COLUMN_DURATIONS = ["14s", "18s", "16s", "20s"] as const;
const COLUMN_PHASES = ["-2s", "-7s", "-4s", "-11s"] as const;
const SPRING = { stiffness: 120, damping: 24 };

export default function ClosingBanner() {
  const { heading, sub, cta, trust, link, footnote } = premiumCustom.closingBanner;
  const words = heading.split(" ");
  const bannerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bannerRef, { amount: 0.3, once: true });
  const visible = useInView(bannerRef, { amount: 0.1 });
  const reduced = useReducedMotion() ?? false;
  const [animate, setAnimate] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [canHover, setCanHover] = useState(false);

  const grow1 = useSpring(COLUMN_WEIGHTS[0], SPRING);
  const grow2 = useSpring(COLUMN_WEIGHTS[1], SPRING);
  const grow3 = useSpring(COLUMN_WEIGHTS[2], SPRING);
  const grow4 = useSpring(COLUMN_WEIGHTS[3], SPRING);
  const grows = [grow1, grow2, grow3, grow4];

  useEffect(() => {
    if (inView && !reduced) setAnimate(true);
  }, [inView, reduced]);

  useEffect(() => {
    if (!animate) return;
    const timer = window.setTimeout(() => setAnimate(false), 1500);
    return () => window.clearTimeout(timer);
  }, [animate]);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!reduced) return;
    grow1.set(COLUMN_WEIGHTS[0]);
    grow2.set(COLUMN_WEIGHTS[1]);
    grow3.set(COLUMN_WEIGHTS[2]);
    grow4.set(COLUMN_WEIGHTS[3]);
  }, [reduced, grow1, grow2, grow3, grow4]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const banner = bannerRef.current;
      if (!banner) return;
      const rect = (node: Element) => {
        const r = node.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      };
      const columns = Array.from(banner.querySelectorAll(".pcb-col"));
      const bannerRect = rect(banner);
      console.log("[pcb-debug] banner", bannerRect);
      columns.forEach((column, i) => console.log(`[pcb-debug] column ${i + 1}`, rect(column)));
      banner.setAttribute(
        "data-pcb-debug",
        JSON.stringify([bannerRect, ...columns.map((column) => rect(column))])
      );
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const playing = Boolean(visible) && tabVisible && !reduced;

  function resetColumns() {
    COLUMN_WEIGHTS.forEach((weight, i) => grows[i].set(weight));
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!canHover || reduced) return;
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const position = ratio * 100;
    let index = COLUMN_WEIGHTS.length - 1;
    let edge = 0;
    for (let i = 0; i < COLUMN_WEIGHTS.length; i += 1) {
      edge += COLUMN_WEIGHTS[i];
      if (position <= edge) {
        index = i;
        break;
      }
    }

    const base = COLUMN_WEIGHTS[index];
    const bonus = base * 0.1;
    const othersTotal = 100 - base;
    const scale = othersTotal > 0 ? (100 - base - bonus) / othersTotal : 1;

    COLUMN_WEIGHTS.forEach((weight, i) => {
      grows[i].set(i === index ? base + bonus : weight * scale);
    });
  }

  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="pcb-bg relative scroll-mt-24 pt-24 pb-20 text-white md:pt-32 md:pb-28"
    >
      <noscript>
        <style>{`.pcb-animate{clip-path:none!important;opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>

      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[3.5%]">
        <div
          ref={bannerRef}
          className={`pcb-banner relative isolate flex min-h-[300px] overflow-hidden rounded-2xl bg-[var(--pcb-1)] md:rounded-[20px] lg:min-h-[315px] ${
            playing ? "pcb-playing" : ""
          }`}
          style={{ boxShadow: "inset 0 1px 0 var(--pcb-highlight)" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetColumns}
          onPointerCancel={resetColumns}
        >
          <div aria-hidden="true" className="absolute inset-0 z-0 flex">
            {COLUMN_WEIGHTS.map((_, i) => (
              <m.div
                key={i}
                className={`pcb-col pcb-col-${i + 1} relative min-w-0 basis-0 ${
                  animate ? "pcb-animate" : ""
                }`}
                style={
                  {
                    flexGrow: grows[i],
                    animationDelay: `${i * 90}ms`,
                  } as MotionStyle
                }
              >
                <div
                  className="pcb-drift"
                  style={{
                    animationDuration: COLUMN_DURATIONS[i],
                    animationDelay: COLUMN_PHASES[i],
                  }}
                />
              </m.div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pcs-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
          />

          <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-10 text-center md:px-6 md:py-14">
            <h2
              id="start-title"
              aria-label={heading}
              className="max-w-3xl text-balance text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[46px]"
              style={{ textShadow: "0 2px 24px var(--pcb-title-shadow)" }}
            >
              <span aria-hidden="true">
                {words.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className={`pcb-word inline-block ${animate ? "pcb-animate" : ""} ${
                      i === words.length - 1 ? "" : "mr-[0.22em]"
                    }`}
                    style={{ animationDelay: `${700 + i * 50}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h2>

            <p
              className={`pcb-fade mt-4 max-w-xl text-base text-white/85 md:text-lg ${
                animate ? "pcb-animate" : ""
              }`}
              style={{ animationDelay: "1100ms" }}
            >
              {sub}
            </p>

            <div
              className={`pcb-fade mt-7 flex w-full justify-center ${
                animate ? "pcb-animate" : ""
              }`}
              style={{ animationDelay: "1200ms" }}
            >
              <Link
                href={cta.href}
                className="pcb-cta relative inline-flex w-full max-w-xs items-center justify-center overflow-hidden rounded-xl px-12 py-4 text-lg font-medium transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pcb-ring-offset)] sm:w-auto"
              >
                {cta.label}
                <span aria-hidden="true" className="pcb-sheen" />
              </Link>
            </div>

            <div
              className={`pcb-fade mt-5 flex items-center gap-2 text-sm text-white/85 ${
                animate ? "pcb-animate" : ""
              }`}
              style={{ animationDelay: "1300ms" }}
            >
              <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
              <span>{trust}</span>
            </div>

            <div
              className={`pcb-fade mt-2 ${animate ? "pcb-animate" : ""}`}
              style={{ animationDelay: "1380ms" }}
            >
              <Link
                href={link.href}
                className="group inline-flex items-center gap-1.5 rounded text-sm text-white/90 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pcb-ring-offset)]"
              >
                {link.label}
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-white/40">{footnote}</p>
      </div>
    </section>
  );
}
