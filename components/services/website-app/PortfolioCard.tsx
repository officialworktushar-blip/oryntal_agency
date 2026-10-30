"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { WebsiteAppPortfolioCard } from "@/lib/content/services/websiteApp";

type PortfolioCardProps = {
  card: WebsiteAppPortfolioCard;
  hasReducedMotion: boolean;
};

export default function PortfolioCard({ card, hasReducedMotion }: PortfolioCardProps) {
  const hasRealImage = !!card.src;

  // Desktop/wide wireframe
  if (card.kind === "desktop" || card.kind === "wide") {
    return (
      <div
        className={cn(
          "flex-none relative rounded-[22px] overflow-hidden border border-black/6",
          "shadow-[0_14px_40px_rgba(20,10,60,.12)]",
          "transition-transform duration-300",
          "h-[320px] md:h-[360px] lg:h-[400px]",
          "group",
          !hasReducedMotion && "hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(20,10,60,.18)]"
        )}
        style={{
          width: `calc(${card.width}px * var(--pf-scale, 1))`,
          backgroundColor: hasRealImage ? "transparent" : card.bg,
        } as React.CSSProperties}
      >
        {/* Wireframe for desktop/wide */}
        {!hasRealImage && (
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            {/* Browser bar */}
            <div className="h-[34px] flex items-center gap-2 px-4 border-b border-black/8 bg-black/4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
              </div>
              <div className="flex-1 h-6 rounded-full bg-black/6 max-w-[180px]" />
            </div>
            {/* Content blocks */}
            <div className="flex-1 p-4 flex flex-col gap-3">
              <div className="h-4 rounded-full bg-black/8 w-3/4" />
              <div className="h-3 rounded-full bg-black/6 w-1/2" />
              <div className="h-3 rounded-full bg-black/6 w-2/3" />
              <div className="mt-2 h-20 rounded-lg bg-black/6" />
              <div className="mt-auto h-10 rounded-lg bg-[#673DE6]/80 w-32" />
            </div>
          </div>
        )}

        {/* Real image or placeholder */}
        <div className="absolute inset-0">
          {hasRealImage && card.src ? (
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="(max-width: 768px) 80vw, 60vw"
              loading="lazy"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-[11px] text-[#2F1C6A] text-center max-w-[90%]">
                {card.shotLabel}
              </div>
            </div>
          )}
        </div>

        {/* Label chip */}
        <div
          className={cn(
            "absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5",
            "text-[13px] font-medium text-[#1D1E20] shadow-sm flex items-center gap-2",
            "transition-all duration-200",
            "opacity-0 translate-y-2",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "group-focus-within:opacity-100 group-focus-within:translate-y-0",
            "hover:opacity-100 hover:translate-y-0",
            // Always visible on touch devices (no hover support)
            "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#673DE6]" />
          {card.label}
        </div>
      </div>
    );
  }

  // Mobile wireframe
  return (
    <div
      className={cn(
        "flex-none relative rounded-[22px] overflow-hidden border border-black/6",
        "shadow-[0_14px_40px_rgba(20,10,60,.12)]",
        "transition-transform duration-300",
        "h-[320px] md:h-[360px] lg:h-[400px]",
        "group",
        !hasReducedMotion && "hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(20,10,60,.18)]"
      )}
      style={{
        width: `calc(${card.width}px * var(--pf-scale, 1))`,
        backgroundColor: hasRealImage ? "transparent" : card.bg,
      } as React.CSSProperties}
    >
      {/* Phone frame wireframe */}
      {!hasRealImage && (
        <div className="absolute inset-0 flex items-center justify-center p-4" aria-hidden="true">
          <div className="relative w-full h-full rounded-[16px] border-2 border-black/12 bg-black/2 flex flex-col">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black/8" />
            {/* Header */}
            <div className="mt-8 h-6 rounded-full bg-black/8 w-3/4 mx-auto" />
            {/* List rows */}
            <div className="flex-1 flex flex-col gap-2 p-3 mt-2">
              <div className="h-10 rounded-lg bg-black/6" />
              <div className="h-10 rounded-lg bg-black/6" />
              <div className="h-10 rounded-lg bg-black/6" />
            </div>
            {/* Bottom nav */}
            <div className="h-12 border-t border-black/8 flex items-center justify-around">
              <div className="w-6 h-6 rounded-full bg-black/8" />
              <div className="w-6 h-6 rounded-full bg-black/8" />
              <div className="w-6 h-6 rounded-full bg-black/8" />
            </div>
          </div>
        </div>
      )}

      {/* Real image or placeholder */}
      <div className="absolute inset-0">
        {hasRealImage && card.src ? (
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 30vw, 20vw"
            loading="lazy"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-[11px] text-[#2F1C6A] text-center max-w-[90%]">
              {card.shotLabel}
            </div>
          </div>
        )}
      </div>

      {/* Label chip */}
      <div
        className={cn(
          "absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5",
          "text-[13px] font-medium text-[#1D1E20] shadow-sm flex items-center gap-2",
          "transition-all duration-200",
          "opacity-0 translate-y-2",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:translate-y-0",
          "hover:opacity-100 hover:translate-y-0",
          // Always visible on touch devices (no hover support)
          "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
        )}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#673DE6]" />
        {card.label}
      </div>
    </div>
  );
}
