"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { aiDev } from "@/lib/content/services/aiDev";
import AssistantCard from "./AssistantCard";
import { RevealGroup, revealStyle } from "./RevealGroup";

const SPEED_PX_PER_S = 38;
const MIN_SET_TO_VIEWPORT = 1.2;
const MIN_DURATION_S = 50;
const MAX_DURATION_S = 130;

export default function Assistants() {
  const { assistants } = aiDev;
  const { subscription, items } = assistants;
  const custom = !subscription.enabled;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [holding, setHolding] = useState(false);
  const [repeat, setRepeat] = useState(1);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let inView = true;
    const update = () => setOffscreen(!inView || document.visibilityState !== "visible");

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        update();
      },
      { threshold: 0 }
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const loopWidth = track.scrollWidth / 2;
      if (!loopWidth) return;
      const needed = Math.max(
        1,
        Math.ceil((window.innerWidth * MIN_SET_TO_VIEWPORT) / (loopWidth / repeat))
      );
      if (needed !== repeat) {
        setRepeat(needed);
        return;
      }
      setDuration(
        Math.min(MAX_DURATION_S, Math.max(MIN_DURATION_S, loopWidth / SPEED_PX_PER_S))
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(document.documentElement);
    measure();
    return () => observer.disconnect();
  }, [repeat]);

  const copies = Array.from({ length: repeat * 2 }, (_, copy) => copy);
  const trackStyle = (duration ? { "--as-dur": `${duration}s` } : {}) as CSSProperties;
  const linkLabel = custom ? assistants.linkCustom : undefined;

  return (
    <section
      ref={sectionRef}
      id="assistants"
      aria-labelledby="as-title"
      className="as-bg relative scroll-mt-24 overflow-hidden py-16 text-[#1D1E20] md:py-24"
    >
      <RevealGroup className="mx-auto max-w-3xl px-4 text-center">
        <p
          className="tools-reveal-item inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.2em] text-[#673DE6]"
          style={revealStyle(0)}
        >
          <span aria-hidden="true" className="size-[9px] bg-[#673DE6]" />
          {custom ? assistants.eyebrowCustom : assistants.eyebrow}
        </p>
        <h2
          id="as-title"
          className="tools-reveal-item mt-4 text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] md:text-5xl lg:text-[52px]"
          style={revealStyle(1)}
        >
          {custom ? assistants.headingCustom : assistants.heading}
        </h2>
        <p
          className="tools-reveal-item mt-4 text-base text-[#1D1E20]/70 md:text-lg"
          style={revealStyle(2)}
        >
          {custom ? assistants.subCustom : assistants.sub}
        </p>
      </RevealGroup>

      <ul className="sr-only" aria-label="AI assistants">
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.outcome}
          </li>
        ))}
      </ul>

      <div
        role="region"
        aria-label="AI assistants"
        tabIndex={0}
        data-paused={offscreen || holding}
        onTouchStart={() => setHolding(true)}
        onTouchEnd={() => setHolding(false)}
        onTouchCancel={() => setHolding(false)}
        className="as-rail group relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#673DE6] md:mt-10"
      >
        <div className="as-row pb-12 pt-4 md:pb-14">
          <div
            ref={trackRef}
            className="as-track flex w-max gap-6 pr-6 will-change-transform"
            style={trackStyle}
          >
            {copies.flatMap((copy) =>
              items.map((item) => (
                <AssistantCard
                  key={copy === 0 ? item.id : copy === 1 ? `${item.id}-b` : `${item.id}-${copy}`}
                  assistant={item}
                  subscription={subscription}
                  linkLabel={linkLabel ?? item.link}
                  shotHint={assistants.shotHint}
                  duplicate={copy > 0}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <RevealGroup className="px-4 text-center">
        <div className="tools-reveal-item" style={revealStyle(0)}>
          <Link
            href={assistants.cta.href}
            className="inline-flex items-center justify-center rounded-xl bg-[#673DE6] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1] hover:shadow-[0_12px_32px_rgba(99,61,230,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2"
          >
            {assistants.cta.label}
          </Link>
        </div>
        <div
          className="tools-reveal-item mt-4 flex items-center justify-center gap-2 text-sm text-[#1D1E20]/70"
          style={revealStyle(1)}
        >
          <ShieldCheck size={16} aria-hidden="true" />
          <span>{assistants.trust}</span>
        </div>
        <p
          className="tools-reveal-item mx-auto mt-5 max-w-2xl text-xs text-[#1D1E20]/[0.55]"
          style={revealStyle(2)}
        >
          {custom ? assistants.noteCustom : assistants.note}
        </p>
      </RevealGroup>
    </section>
  );
}
