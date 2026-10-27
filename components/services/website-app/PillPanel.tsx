"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useTransform, m } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { useScaledCanvas } from "@/hooks/useScaledCanvas";
import Cursor from "@/components/ui/Cursor";
import { cn } from "@/lib/cn";
import * as Icons from "lucide-react";
import type { WebsiteAppPill } from "@/lib/content/services/websiteApp";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe: Icons.Globe,
  ShoppingCart: Icons.ShoppingCart,
  AppWindow: Icons.AppWindow,
  Smartphone: Icons.Smartphone,
  Boxes: Icons.Boxes,
  LayoutDashboard: Icons.LayoutDashboard,
  ShieldCheck: Icons.ShieldCheck,
  PenTool: Icons.PenTool,
};

type PillPanelProps = {
  pills: WebsiteAppPill[];
};

const ROWS: readonly (readonly number[])[] = [
  [0, 1],       // Row A: indices 0, 1
  [2, 3, 4],    // Row B: indices 2, 3, 4 (cropped)
  [5, 6, 7],    // Row C: indices 5, 6, 7
];

export default function PillPanel({ pills }: PillPanelProps) {
  const reduced = useReducedMotion() ?? false;
  const { wrapperRef, scale } = useScaledCanvas(800, 0.62);
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorTarget, setCursorTarget] = useState({ x: 0, y: 0 });
  const [clickKey, setClickKey] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { amount: 0.3, once: false });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms
  const rowAParallaxX = useTransform(mouseX, [0, 800], [8, -8]);
  const rowAParallaxY = useTransform(mouseY, [0, 600], [8, -8]);
  const rowBParallaxX = useTransform(mouseX, [0, 800], [-8, 8]);
  const rowBParallaxY = useTransform(mouseY, [0, 600], [-8, 8]);
  const rowCParallaxX = useTransform(mouseX, [0, 800], [8, -8]);
  const rowCParallaxY = useTransform(mouseY, [0, 600], [8, -8]);
  const cursorParallaxX = useTransform(mouseX, [0, 800], [-10, 10]);
  const cursorParallaxY = useTransform(mouseY, [0, 600], [-10, 10]);

  const flatPills: number[] = ROWS.flat();

  const { active, pause, resume } = useAutoCycle(flatPills.length, 2600, {
    inViewRef: panelRef,
  });

  useEffect(() => {
    if (reduced) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(active);
  }, [active, reduced]);

  useEffect(() => {
    if (hovered) {
      pause();
    } else {
      resume();
    }
  }, [hovered, pause, resume]);

  useEffect(() => {
    if (!entered || reduced) return;
    const pillIdx = flatPills[activeIndex];
    if (pillIdx === undefined) return;

    let rowIdx = -1;
    let positionInRow = -1;

    for (let i = 0; i < ROWS.length; i++) {
      const idx = ROWS[i].indexOf(pillIdx);
      if (idx !== -1) {
        rowIdx = i;
        positionInRow = idx;
        break;
      }
    }

    if (rowIdx === -1) return;

    const row = panelRef.current?.querySelector(
      `.wwb-row-${String.fromCharCode(97 + rowIdx)}`
    ) as HTMLElement;
    if (!row) return;

    const pillEl = row.children[positionInRow] as HTMLElement;
    if (!pillEl) return;

    const pillRect = pillEl.getBoundingClientRect();
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (!panelRect) return;

    const targetX = pillRect.left - panelRect.left + pillRect.width / 2 - 30;
    const targetY = pillRect.bottom - panelRect.top + 6;

    setCursorTarget({ x: targetX, y: targetY });
    setClickKey((prev) => prev + 1);
  }, [activeIndex, entered, reduced, flatPills]);

  useEffect(() => {
    if (!inView) {
      setEntered(false);
      return;
    }
    const timer = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(timer);
  }, [inView]);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handlePillHover = (idx: number) => {
    if (reduced) return;
    setActiveIndex(idx);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const activePill = flatPills[activeIndex];
  const activePillData = activePill !== undefined ? pills[activePill] : null;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full aspect-[800/600] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(60,40,160,0.22)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 w-[800px] h-[600px] wwb-panel-bg"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        aria-hidden="true"
      >
        {/* Glass waves */}
        <svg
          className="wwb-wave wwb-wave-1"
          viewBox="0 0 800 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 Q200,20 400,40 T800,40 L800,80 L0,80 Z"
            fill="white"
          />
        </svg>
        <svg
          className="wwb-wave wwb-wave-2"
          viewBox="0 0 800 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,50 Q200,30 400,50 T800,50 L800,80 L0,80 Z"
            fill="white"
          />
        </svg>

        {/* Grain overlay */}
        <div className="wwb-grain" aria-hidden="true" />

        {/* Rows */}
        {ROWS.map((rowIndices, rowIdx) => {
          const rowChar = String.fromCharCode(97 + rowIdx);
          const leftOffset = rowIdx === 0 ? 44 : rowIdx === 1 ? -34 : 22;
          const topOffset = rowIdx === 0 ? 130 : rowIdx === 1 ? 262 : 394;

          const parallaxX = rowIdx === 0 ? rowAParallaxX : rowIdx === 1 ? rowBParallaxX : rowCParallaxX;
          const parallaxY = rowIdx === 0 ? rowAParallaxY : rowIdx === 1 ? rowBParallaxY : rowCParallaxY;

          return (
            <div
              key={rowIdx}
              className={cn("wwb-row", `wwb-row-${rowChar}`)}
              style={{
                left: `${leftOffset}px`,
                top: `${topOffset}px`,
                transform: reduced || !hovered ? undefined : `translate(${parallaxX.get()}px, ${parallaxY.get()}px)`,
              }}
            >
              {rowIndices.map((pillIdx) => {
                const pillData = pills[pillIdx];
                const flatIdx = flatPills.indexOf(pillIdx as number);
                const isActive = flatIdx === activeIndex;
                const IconComponent = iconMap[pillData.icon];

                return (
                  <li
                    key={pillData.id}
                    className="wwb-pill"
                    data-active={isActive || undefined}
                    style={{
                      "--wwb-active-color": `${pillData.color}99`,
                    } as React.CSSProperties}
                    role="listitem"
                    onMouseEnter={() => handlePillHover(flatIdx)}
                  >
                    <div
                      className="wwb-pill-icon"
                      style={{ backgroundColor: pillData.color }}
                    >
                      {IconComponent && <IconComponent size={24} className="text-white" />}
                    </div>
                    <span>{pillData.label}</span>
                    {isActive && (
                      <div
                        className="wwb-ripple"
                        style={{ borderColor: pillData.color }}
                      />
                    )}
                  </li>
                );
              })}
            </div>
          );
        })}

        {/* Cursor */}
        <m.div
          className="wwb-cursor"
          animate={{
            x: cursorTarget.x + (reduced || !hovered ? 0 : cursorParallaxX.get()),
            y: cursorTarget.y + (reduced || !hovered ? 0 : cursorParallaxY.get()),
            opacity: entered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <Cursor clickKey={clickKey} reduced={reduced} />
        </m.div>

        {/* Caption */}
        {activePillData && (
          <div
            key={activePillData.id}
            className="wwb-caption"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(6px)",
            }}
          >
            <div
              className="wwb-caption-dot"
              style={{ backgroundColor: activePillData.color }}
            />
            <span>{activePillData.caption}</span>
          </div>
        )}
      </div>
    </div>
  );
}
