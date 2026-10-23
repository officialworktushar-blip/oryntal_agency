"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { m, useInView, useReducedMotion, useSpring } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";

const SLIDE_DURATION = 4000;
const TYPE_START_DELAY = 250;
const TYPE_SPEED_MAX_MS = 26;
const TYPE_DURATION_TARGET = 2400;

type CardState = {
  typed: string;
  finished: boolean;
  elapsed: number;
};

function useTypewriter(prompt: string, active: boolean, running: boolean, reduced: boolean) {
  const [state, setState] = useState<CardState>({
    typed: reduced ? prompt : "",
    finished: reduced,
    elapsed: 0,
  });
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setState({ typed: prompt, finished: true, elapsed: SLIDE_DURATION });
      return;
    }
    if (!active) {
      setState({ typed: "", finished: false, elapsed: 0 });
      startRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }
    if (!running) {
      return;
    }
    const msPerChar = Math.min(TYPE_SPEED_MAX_MS, TYPE_DURATION_TARGET / Math.max(1, prompt.length));
    setState({ typed: "", finished: false, elapsed: 0 });
    startRef.current = performance.now() + TYPE_START_DELAY;

    const tick = (now: number) => {
      if (startRef.current === null) return;
      const elapsed = now - startRef.current;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const count = Math.floor(elapsed / msPerChar);
      if (count >= prompt.length) {
        setState({ typed: prompt, finished: true, elapsed: SLIDE_DURATION });
        return;
      }
      setState({ typed: prompt.slice(0, count), finished: false, elapsed });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [prompt, active, running, reduced]);

  return state;
}

export default function HeroCards() {
  const reduced = useReducedMotion() ?? false;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { amount: 0.3, once: false });
  const [index, setIndex] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const slides = businessAutomation.slides;

  const autoplay =
    inView && tabVisible && !hovered && !focused && !reduced;
  const running = autoplay;

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [running, slides.length]);

  const slide = slides[index];
  const typeState = useTypewriter(slide.prompt, true, running, reduced);
  const finished = reduced ? true : typeState.finished;

  const px = useSpring(0, { stiffness: 120, damping: 20 });
  const py = useSpring(0, { stiffness: 120, damping: 20 });
  const cx = useSpring(0, { stiffness: 120, damping: 20 });
  const cy = useSpring(0, { stiffness: 120, damping: 20 });
  const bx = useSpring(0, { stiffness: 120, damping: 20 });
  const by = useSpring(0, { stiffness: 120, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(mx * 6);
    py.set(my * 6);
    cx.set(mx * 10);
    cy.set(my * 10);
    bx.set(mx * 3);
    by.set(my * 3);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
    cx.set(0);
    cy.set(0);
    bx.set(0);
    by.set(0);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("[ba-hero] right column/card sizes", {
      wrapper: wrapperRef.current?.getBoundingClientRect(),
    });
    const t = setTimeout(() => {
      console.log("[ba-hero] right column/card sizes (delayed)", {
        wrapper: wrapperRef.current?.getBoundingClientRect(),
      });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      // ensure final state visible even if animations blocked
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      ref={wrapperRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Examples of how ORYNTAL automates daily operations"
      className="relative flex w-full flex-col items-center lg:items-end"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        onLeave();
      }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      onPointerMove={onMove}
    >
      <div className="relative w-full max-w-[560px] aspect-[11/12] pt-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
          <m.div
            style={{ x: bx, y: by, aspectRatio: "11/12" }}
            className="mx-auto w-[94%] translate-y-[-14px] scale-[0.95] rounded-[28px] border border-white/10 bg-white/6"
          />
          <m.div
            style={{ x: bx, y: by, aspectRatio: "11/12", marginTop: "-84%" }}
            className="mx-auto w-[90%] -translate-y-[28px] scale-[0.90] rounded-[28px] border border-white/10 bg-white/6 opacity-80"
          />
        </div>

        <m.div style={{ x: px, y: py }} className="relative h-full w-full">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.id}
                aria-hidden={!active}
                className={cn(
                  "absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.55)] border border-white/10 bg-[#1B1733]",
                  active
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-[1.03] pointer-events-none z-0"
                )}
                style={{
                  transition: reduced ? "opacity 150ms ease" : "opacity 600ms ease, transform 600ms ease, filter 600ms ease",
                }}
              >
                <MediaPlaceholder
                  type="image"
                  aspect="11/12"
                  label={s.media.label}
                  hint={s.media.hint}
                  src={undefined}
                  alt={s.alt}
                  sizes="(min-width:1024px) 560px, 92vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full"
                />

                <m.div
                  style={{ x: cx, y: cy }}
                  className={cn(
                    "absolute top-5 left-5 z-10",
                    s.chipLayout === "row" ? "flex gap-2" : "flex flex-col items-center"
                  )}
                >
                  {s.chipLayout === "row"
                    ?                       s.chips.map((chip, ci) => {
                        const Icon = chip.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
                        return (
                          <m.div
                            key={chip.label}
                            initial={reduced ? { scale: 1 } : { scale: 0.7, opacity: 0 }}
                            animate={active && !reduced ? { scale: 1, opacity: 1 } : reduced ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                            transition={{ duration: 0.25, delay: active && !reduced ? 0.15 + ci * 0.08 : 0 }}
                            className="flex items-center gap-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 p-2 shadow"
                          >
                            <div
                              className="grid size-11 sm:size-12 place-items-center rounded-xl"
                              style={{ background: "#ffffff" }}
                              aria-label={chip.label}
                            >
                              <Icon className="size-[26px]" style={{ color: chip.color }} />
                            </div>
                          </m.div>
                        );
                      })
                    : (
                        <div className="relative flex flex-col items-center">
                          <div className="flex gap-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 p-2 shadow">
                            {s.chips.slice(0, 2).map((chip, ci) => {
                              const Icon = chip.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
                              return (
                                <m.div
                                  key={chip.label}
                                  initial={reduced ? { scale: 1 } : { scale: 0.7, opacity: 0 }}
                                  animate={active && !reduced ? { scale: 1, opacity: 1 } : reduced ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                                  transition={{ duration: 0.25, delay: active && !reduced ? 0.15 + ci * 0.08 : 0 }}
                                  className="grid size-11 sm:size-12 place-items-center rounded-xl bg-white"
                                  aria-label={chip.label}
                                >
                                  <Icon className="size-[26px]" style={{ color: chip.color }} />
                                </m.div>
                              );
                            })}
                          </div>
                          <div className="mt-2 h-6 w-[1.5px] bg-white/70" />
                          {s.chips[2] ? (
                            <m.div
                              initial={reduced ? { scale: 1 } : { scale: 0.7, opacity: 0 }}
                              animate={active && !reduced ? { scale: 1, opacity: 1 } : reduced ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                              transition={{ duration: 0.25, delay: active && !reduced ? 0.15 + 0.16 : 0 }}
                              className="grid size-11 sm:size-12 place-items-center rounded-xl bg-white shadow"
                              aria-label={s.chips[2].label}
                            >
                              {(() => {
                                const Icon = s.chips[2].icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
                                return <Icon className="size-[26px]" style={{ color: s.chips[2].color }} />;
                              })()}
                            </m.div>
                          ) : null}
                        </div>
                      )}
                </m.div>

                <div className="absolute left-4 right-4 bottom-4 z-10 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_10px_30px_rgba(10,10,40,.25)] p-4 pr-16">
                  <div className="min-h-[72px] sm:min-h-[78px]">
                    <p className="text-[15px] sm:text-base text-[#1B1B1F] leading-snug">
                      <span aria-hidden="true">
                        {reduced ? s.prompt : typeState.typed}
                        {!finished ? <span className="inline-block w-[2px] h-[1em] align-middle bg-[#673DE6] ml-[1px] animate-pulse" /> : null}
                      </span>
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-[#673DE6] text-white transition-transform",
                      finished ? "scale-100" : "scale-100"
                    )}
                    style={{
                      animation: finished && !reduced ? "ba-send-press 160ms ease" : undefined,
                    }}
                  >
                    <SendHorizontal className="size-[18px]" />
                  </div>
                </div>
              </div>
            );
          })}
        </m.div>
      </div>

      <div className="mt-5 flex gap-2 justify-center lg:justify-end w-full max-w-[560px]">
        {slides.map((s, i) => {
          const active = i === index;
          const elapsed = active ? (reduced ? SLIDE_DURATION : typeState.elapsed) : i < index ? SLIDE_DURATION : 0;
          const pct = Math.max(0, Math.min(100, (elapsed / SLIDE_DURATION) * 100));
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Show example ${i + 1} of ${slides.length}: ${s.id}`}
              onClick={() => goTo(i)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="group relative h-4 w-11 sm:w-14 flex items-center"
            >
              <span className="absolute inset-x-0 h-1 rounded-full bg-white/20" />
              <span
                className={cn("absolute inset-x-0 h-1 rounded-full", active || i < index ? "bg-white" : "bg-white/0")}
                style={{ width: `${pct}%` }}
              />
            </button>
          );
        })}
      </div>

      <ul className="sr-only" aria-label="What the Business Automation Package automates">
        {slides.map((s) => (
          <li key={s.id}>{s.prompt}</li>
        ))}
      </ul>
      <ul className="sr-only" aria-label="What's included in the Business Automation Package">
        {businessAutomation.allIncluded.map((item) => (
          <li key={item.title}>{item.title}: {item.description}</li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes ba-send-press {
          0% { transform: scale(1); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
