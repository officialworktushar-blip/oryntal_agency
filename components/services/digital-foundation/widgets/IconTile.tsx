"use client";

import type { LucideIcon } from "lucide-react";

type IconTileProps = {
  icon: LucideIcon;
  /** Position of the tile inside the canvas. */
  className?: string;
  /** Smaller tile that overlaps the bottom edge of the panel. */
  compact?: boolean;
};

export default function IconTile({ icon: Icon, className, compact }: IconTileProps) {
  if (compact) {
    return (
      <span
        className={`grid size-[72px] place-items-center rounded-[18px] border border-white/25 ${className ?? ""}`}
        style={{
          backgroundImage:
            "linear-gradient(150deg, var(--dfd-tile-1) 0%, var(--dfd-tile-2) 100%)",
          boxShadow: "var(--dfd-tile-shadow)",
        }}
        aria-hidden="true"
      >
        <Icon className="size-8 text-white" strokeWidth={1.7} />
      </span>
    );
  }

  return (
    <span
      className={`z-10 grid size-[113px] place-items-center rounded-[22px] border border-white/25 ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(150deg, var(--dfd-tile-1) 0%, var(--dfd-tile-2) 100%)",
        boxShadow: "var(--dfd-tile-shadow)",
      }}
      aria-hidden="true"
    >
      <Icon className="size-[54px] text-white" strokeWidth={1.5} />
    </span>
  );
}
