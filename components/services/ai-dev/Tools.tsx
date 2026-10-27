"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { aiDev } from "@/lib/content/services/aiDev";
import { aiTools, rowA, rowB, type AiTool } from "@/lib/content/services/aiTools";
import { cn } from "@/lib/cn";
import ToolTile from "./ToolTile";

const MIN_SET_TO_VIEWPORT = 1.2;
const MIN_DURATION_S = 45;
const MAX_DURATION_S = 120;

/** Hidden-then-revealed only when JS runs and the block starts below the fold. */
function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setArmed(false);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-armed={armed} className={cn("tools-reveal", className)}>
      {children}
    </div>
  );
}

function revealStyle(index: number): CSSProperties {
  return { "--reveal-i": index } as CSSProperties;
}

type RailProps = {
  tools: AiTool[];
  label: string;
  speed: number;
  durationVar: "--tools-dur-a" | "--tools-dur-b";
  trackClass: string;
  offset?: boolean;
};

function Rail({ tools, label, speed, durationVar, trackClass, offset = false }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(1);
  const [duration, setDuration] = useState<number | null>(null);

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
      setDuration(Math.min(MAX_DURATION_S, Math.max(MIN_DURATION_S, loopWidth / speed)));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(document.documentElement);
    measure();
    return () => observer.disconnect();
  }, [repeat, speed]);

  const copies = Array.from({ length: repeat * 2 }, (_, copy) => copy);
  const trackStyle = {
    ...(duration ? { [durationVar]: `${duration}s` } : {}),
    ...(offset ? { marginLeft: "-60px" } : {}),
  } as CSSProperties;

  return (
    <div className="tools-row">
      <h3 className="sr-only">{label}</h3>
      <div
        ref={trackRef}
        className={cn("tools-track flex w-max gap-5 pr-5 will-change-transform", trackClass)}
        style={trackStyle}
      >
        {copies.flatMap((copy) =>
          tools.map((tool) => (
            <ToolTile
              key={copy === 0 ? tool.id : copy === 1 ? `${tool.id}-b` : `${tool.id}-${copy}`}
              tool={tool}
              duplicate={copy > 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function Tools() {
  const { tools } = aiDev;
  const sectionRef = useRef<HTMLElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [holding, setHolding] = useState(false);

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

  const srSentence = `ORYNTAL connects AI to tools such as ${aiTools
    .map((tool) => tool.name)
    .join(", ")}, depending on your scope.`;

  return (
    <section
      ref={sectionRef}
      id="tools"
      aria-labelledby="tools-title"
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 text-[#1D1E20] md:py-24"
    >
      <Reveal className="mx-auto max-w-4xl px-4 text-center lg:max-w-6xl">
        <h2
          id="tools-title"
          className="text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] md:text-5xl lg:text-[58px]"
        >
          <span className="tools-reveal-item block" style={revealStyle(0)}>
            {tools.headingLine1}
          </span>
          <span className="tools-reveal-item block" style={revealStyle(1)}>
            {tools.headingLine2}
          </span>
        </h2>
        <p
          className="tools-reveal-item mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1D1E20]/75 md:text-lg"
          style={revealStyle(2)}
        >
          {tools.sub}
        </p>
      </Reveal>

      <p className="sr-only">{srSentence}</p>

      <div
        role="region"
        aria-label="Tools AI can connect with"
        tabIndex={0}
        data-paused={offscreen || holding}
        onTouchStart={() => setHolding(true)}
        onTouchEnd={() => setHolding(false)}
        onTouchCancel={() => setHolding(false)}
        className="tools-rails group relative left-1/2 mt-6 flex w-screen -translate-x-1/2 flex-col gap-5 overflow-hidden pb-14 pt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#673DE6] md:mt-8 md:gap-6"
      >
        <Rail
          tools={rowA}
          label={tools.rowALabel}
          speed={40}
          durationVar="--tools-dur-a"
          trackClass="tools-track-a"
        />
        <Rail
          tools={rowB}
          label={tools.rowBLabel}
          speed={32}
          durationVar="--tools-dur-b"
          trackClass="tools-track-b"
          offset
        />
      </div>

      <Reveal className="mt-4 px-4 text-center md:mt-6">
        <div className="tools-reveal-item" style={revealStyle(0)}>
          <Link
            href={tools.cta.href}
            className="inline-flex items-center justify-center rounded-xl bg-[#673DE6] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1] hover:shadow-[0_12px_32px_rgba(99,61,230,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {tools.cta.label}
          </Link>
        </div>
        <div
          className="tools-reveal-item mt-4 flex items-center justify-center gap-2 text-sm text-[#1D1E20]/70"
          style={revealStyle(1)}
        >
          <ShieldCheck size={16} aria-hidden="true" />
          <span>{tools.trust}</span>
        </div>
        <p
          className="tools-reveal-item mx-auto mt-6 max-w-2xl text-xs text-[#1D1E20]/50"
          style={revealStyle(2)}
        >
          {tools.note}
        </p>
      </Reveal>
    </section>
  );
}
