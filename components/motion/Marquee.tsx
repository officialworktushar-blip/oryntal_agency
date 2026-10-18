"use client";

import { cn } from "@/lib/cn";

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  /** CSS gap between items. */
  gap?: string;
  /** Duration of one full loop. */
  duration?: string;
  className?: string;
};

/**
 * CSS-transform marquee with duplicated track, edge fade masks,
 * and pause on hover. Falls back to a static row under reduced motion.
 */
export default function Marquee<T>({
  items,
  renderItem,
  gap = "3rem",
  duration = "38s",
  className,
}: MarqueeProps<T>) {
  if (items.length === 0) return null;

  const track = (
    <div className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
      {items.map((item, i) => (
        <div key={i} className="flex shrink-0 items-center" style={{ gap }}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-mask relative overflow-hidden", className)}>
      <div
        className="group flex w-max animate-marquee motion-reduce:animate-none motion-reduce:justify-center"
        style={{ animationDuration: duration }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {/* Duplicate the track so the loop is seamless */}
        {track}
        {track}
      </div>
    </div>
  );
}
