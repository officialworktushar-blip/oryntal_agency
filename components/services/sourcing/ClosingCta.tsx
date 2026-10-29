"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { m } from "framer-motion";
import { sourcingClosing } from "@/lib/content/services/sourcing";
import {
  Boxes,
  Handshake,
  MapPin,
  Package,
  Search,
  Truck,
  Warehouse,
} from "lucide-react";

const ICON_MAP = {
  Search,
  Handshake,
  Boxes,
  Package,
  Warehouse,
  Truck,
  MapPin,
};

export default function ClosingCta() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.3 });

  useEffect(() => {
    if (prefersReducedMotion || !isInView || isHovering) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sourcingClosing.tiles.length);
    }, 2200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [prefersReducedMotion, isInView, isHovering]);

  const activeTile = sourcingClosing.tiles[activeIndex];

  return (
    <section
      id="start"
      aria-labelledby="so-cta-title"
      className="relative overflow-hidden text-white py-20 md:py-24 border-t border-white/10"
      style={{
        backgroundColor: "#030305",
        backgroundImage:
          "radial-gradient(40% 70% at 78% 0%, rgba(99,61,230,0.62) 0%, rgba(99,61,230,0) 72%), radial-gradient(55% 70% at 92% 45%, rgba(58,32,150,0.55) 0%, rgba(58,32,150,0) 75%), radial-gradient(40% 50% at 100% 100%, rgba(40,24,110,0.45) 0%, rgba(40,24,110,0) 70%), linear-gradient(90deg, #030305 0%, #05040B 42%, #120A33 100%)",
      }}
    >
      <div className="max-w-[1300px] px-4 sm:px-6 lg:px-10 mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-8 items-center">
        {/* LEFT */}
        <div className="min-w-0 relative z-10">
          <h2
            id="so-cta-title"
            className="font-normal tracking-[-0.03em] leading-[1.08] text-4xl md:text-5xl lg:text-[54px] max-w-xl text-balance"
          >
            {sourcingClosing.heading}
          </h2>
          <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl">
            {sourcingClosing.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={sourcingClosing.cta.href}
              className="bg-white text-[#1D1E20] rounded-xl px-9 py-4 text-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 inline-flex items-center gap-3"
            >
              {sourcingClosing.cta.label}
            </Link>
            <Link
              href={sourcingClosing.link.href}
              className="text-white underline underline-offset-4 inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              {sourcingClosing.link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>{sourcingClosing.trust}</span>
          </div>
          <p className="mt-3 text-xs text-white/50 max-w-md leading-relaxed">
            {sourcingClosing.note}
          </p>
        </div>

        {/* RIGHT */}
        <div
          ref={wrapperRef}
          className="relative w-full max-w-[640px] lg:justify-self-end"
          role="img"
          aria-label="Icons for sourcing partners, supplier connections, wholesale contacts, packaging, storage, delivery and logistics"
        >
          {/* Plus pattern */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 1v12M1 7h12' stroke='rgba(255,255,255,0.10)' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "69px 69px",
              maskImage: "radial-gradient(ellipse at 55% 45%, #000 20%, transparent 75%)",
            }}
          />

          {/* Grid */}
          <div className="relative grid grid-cols-5 gap-3">
            {sourcingClosing.tiles.map((tile, index) => {
              const Icon = ICON_MAP[tile.icon];
              const isActive = index === activeIndex;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={tile.id}
                  className="aspect-square rounded-[18px] border border-white/10 flex items-center justify-center transition-all duration-250 hover:scale-104 cursor-pointer"
                  style={{
                    gridRow: tile.row + 1,
                    gridColumn: tile.col,
                    background: isActive
                      ? "#211C48"
                      : "linear-gradient(160deg, #1A1636, #120F2A)",
                    borderColor: isActive
                      ? "rgba(155,149,255,0.85)"
                      : "rgba(255,255,255,0.1)",
                    borderWidth: isActive ? "1.5px" : "1px",
                    boxShadow: isActive
                      ? "0 0 40px rgba(123,92,255,0.5)"
                      : "0 14px 30px rgba(0,0,0,0.45)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setActiveIndex(index);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                  aria-hidden="true"
                >
                  <Icon
                    className="h-[34px] md:h-[40px] w-[34px] md:w-[40px]"
                    style={{ color: isEven ? "#B9A8FF" : "rgba(255,255,255,0.85)" }}
                  />
                  {isActive && (
                    <m.div
                      className="absolute right-[-10px] bottom-[-14px] z-20"
                      layoutId="so-cursor"
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                      >
                        <path
                          d="M5.5 3.21V40.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="#5B3BE0"
                        />
                      </svg>
                    </m.div>
                  )}
                </div>
              );
            })}

            {/* Empty tiles */}
            <div
              className="aspect-square rounded-[18px] border border-white/10 opacity-70"
              style={{
                gridRow: 1,
                gridColumn: 4,
                background: "linear-gradient(160deg, #1A1636, #120F2A)",
              }}
              aria-hidden="true"
            />
            <div
              className="aspect-square rounded-[18px] border border-white/10 opacity-70"
              style={{
                gridRow: 3,
                gridColumn: 5,
                background: "linear-gradient(160deg, #1A1636, #120F2A)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Caption */}
          <div
            className="mt-6 text-center"
            aria-hidden="true"
          >
            <m.div
              className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/12 px-4 py-2 text-[13px] text-white"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={activeTile.caption}
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeTile.caption}</span>
            </m.div>
          </div>
        </div>
      </div>

      {/* Screen reader summary */}
      <p className="sr-only">{sourcingClosing.srSummary}</p>
    </section>
  );
}
