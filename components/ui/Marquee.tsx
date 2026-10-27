"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  phrases: string[];
  className?: string;
  duration?: string;
};

export default function Marquee({ phrases, className, duration = "55s" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = trackRef.current?.closest("section");
    if (!section) return;

    let inView = true;

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        update();
      },
      { threshold: 0.1 }
    );

    const update = () => {
      const visible = inView && document.visibilityState === "visible";
      if (trackRef.current) {
        trackRef.current.style.animationPlayState = visible ? "running" : "paused";
      }
    };

    observer.observe(section);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const items = [...phrases, ...phrases];

  return (
    <div
      className={cn(
        "relative flex h-16 items-center overflow-hidden border-t border-white/10 bg-transparent",
        className
      )}
      aria-label="What we build"
    >
      <ul className="sr-only" aria-label="What we build phrases">
        {phrases.map((phrase, idx) => (
          <li key={idx}>{phrase}</li>
        ))}
      </ul>
      <div
        ref={trackRef}
        className="flex w-max items-center animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: duration, willChange: "transform" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
        aria-hidden="true"
      >
        {items.map((phrase, idx) => (
          <div key={idx} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-white/90 md:text-sm">
              {phrase}
            </span>
            <span className="mx-6 h-2 w-2 shrink-0 bg-[#7B65F0]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
