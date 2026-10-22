"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { Check, Compass, Globe, Lock, MessageCircle } from "lucide-react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { DeliverableCard as DeliverableCardData } from "@/lib/content/packages/digitalFoundation";
import WidgetCanvas, { WidgetMotionContext } from "./WidgetCanvas";
import ChecklistWide from "./widgets/ChecklistWide";
import DesignedForWidget from "./widgets/DesignedForWidget";
import FlowWidget from "./widgets/FlowWidget";
import Gauge from "./widgets/Gauge";
import IconTile from "./widgets/IconTile";
import PagesWidget from "./widgets/PagesWidget";
import SecurityListWidget from "./widgets/SecurityListWidget";
import StatusWide from "./widgets/StatusWide";

/** Positions of the three widgets in a "trio" card, in canvas px. */
const TRIO_SLOTS = [
  { left: 96, width: 195 },
  { left: 312, width: 219 },
  { left: 552, width: 195 },
];

type SlotProps = {
  left: number;
  top: number;
  width: number;
  height?: number;
  index: number;
  children: ReactNode;
};

/** One widget on the design canvas: floats gently, pops in with the card. */
function Slot({ left, top, width, height = 196, index, children }: SlotProps) {
  return (
    <div
      className="absolute"
      style={
        {
          left,
          top,
          width,
          height,
          "--dfd-delay": `${index * 90}ms`,
          "--dfd-draw-delay": `${index * 90 + 420}ms`,
        } as CSSProperties
      }
    >
      <div
        className="dfd-float h-full w-full"
        style={{
          animationDuration: `${5 + index * 0.7}s`,
          animationDelay: `${index * 1.1}s`,
        }}
      >
        <div className="dfd-pop h-full w-full">{children}</div>
      </div>
    </div>
  );
}

/** A gauge sitting on its own white widget surface. */
function GaugeWidget({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`dfd-widget h-[196px] w-[195px] ${className ?? ""}`} aria-hidden="true">
      {children}
    </div>
  );
}

type DeliverableCardProps = {
  card: DeliverableCardData;
  index: number;
};

export default function DeliverableCard({ card, index }: DeliverableCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const trio =
    card.id === "website"
      ? [
          <GaugeWidget key="status">
            <Gauge
              label="Website status"
              centerText="Live"
              gapIcon={Globe}
              color="teal"
              className="absolute left-[34px] top-[35px]"
            />
          </GaugeWidget>,
          <PagesWidget key="pages" />,
          <DesignedForWidget key="built" />,
        ]
      : [
          <GaugeWidget key="security">
            <Gauge
              label="Security"
              centerText="HTTPS"
              centerSize={24}
              gapIcon={Lock}
              color="teal"
              className="absolute left-[34px] top-[35px]"
            />
          </GaugeWidget>,
          <FlowWidget key="flow" />,
          <SecurityListWidget key="secure" />,
        ];

  const statusCard =
    card.id === "leads" ? <StatusWide /> : <ChecklistWide />;

  const statusPanel = (
    <div
      className="df-card-purple relative hidden aspect-[840/307] w-full overflow-visible md:block"
      role="img"
      aria-label={card.panelLabel}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <span className="dfd-shape dfd-shape-l1" />
        <span className="dfd-shape dfd-shape-l2" />
        <span className="dfd-shape dfd-shape-l3" />

        <WidgetCanvas>
          {card.layout === "trio" ? (
            TRIO_SLOTS.map((slot, slotIndex) => (
              <Slot
                key={slotIndex}
                left={slot.left}
                top={56}
                width={slot.width}
                index={slotIndex}
              >
                {trio[slotIndex]}
              </Slot>
            ))
          ) : (
            <>
              <Slot left={127} top={56} width={544} index={0}>
                {statusCard}
              </Slot>
              <Slot left={600} top={162} width={113} height={113} index={1}>
                <IconTile
                  icon={card.id === "leads" ? MessageCircle : Compass}
                />
              </Slot>            </>
          )}
        </WidgetCanvas>
      </div>
    </div>
  );

  const compactPanel = (
    <div
      className="df-card-purple relative block w-full overflow-visible pb-6 pt-5 md:hidden"
      role="img"
      aria-label={card.panelLabel}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <span className="dfd-shape dfd-shape-l1" />
        <span className="dfd-shape dfd-shape-l2" />
        <span className="dfd-shape dfd-shape-l3" />
      </div>

      <div aria-hidden="true" className="relative">
        {card.layout === "trio" ? (
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trio.map((widget, widgetIndex) => (
              <div
                key={widgetIndex}
                className="dfd-float flex-none snap-center"
                style={{
                  animationDuration: `${5 + widgetIndex * 0.7}s`,
                  animationDelay: `${widgetIndex * 1.1}s`,
                }}
              >
                <div
                  className="dfd-pop"
                  style={{ "--dfd-delay": `${widgetIndex * 90}ms` } as CSSProperties}
                >
                  {widget}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="dfd-pop mx-auto">
              {card.id === "leads" ? (
                <StatusWide compact />
              ) : (
                <ChecklistWide compact />
              )}
            </div>
          </div>
        )}
      </div>

      {/* The tile overlaps the bottom edge of the panel */}
      {card.layout === "wide" ? (
        <div className="absolute bottom-[-20px] right-5 z-10">
          <IconTile
            icon={card.id === "leads" ? MessageCircle : Compass}
            compact
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="dfd-card dfd-rise group mx-auto flex w-full max-w-[840px] flex-col overflow-hidden rounded-[22px] bg-[var(--dfd-card-bg)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 md:rounded-[28px] xl:max-w-none"
      style={{ "--dfd-delay": `${index * 120}ms` } as CSSProperties}
    >
      <WidgetMotionContext.Provider value={{ inView, reduced }}>
        {statusPanel}
        {compactPanel}
      </WidgetMotionContext.Provider>

      <div
        className={`px-[clamp(24px,3.6vw,50px)] pt-[clamp(24px,3.4vw,48px)] ${
          card.layout === "wide"
            ? "pb-8 md:pb-[clamp(28px,3.8vw,50px)]"
            : "pb-[clamp(28px,3.8vw,50px)]"
        }`}
      >
        <h3 className="text-[clamp(22px,2.1vw,30px)] font-normal leading-tight tracking-[-0.02em] text-[var(--dfd-ink)]">
          {card.title}
        </h3>

        <ul className="mt-6 space-y-3.5">
          {card.bullets.map((bullet, bulletIndex) => (
            <li
              key={bullet}
              className="dfd-bullet flex items-start gap-3.5"
              style={{ "--dfd-delay": `${bulletIndex * 70 + 180}ms` } as CSSProperties}
            >
              <Check
                className="mt-[3px] flex-none text-[var(--dfd-tick)]"
                size={22}
                strokeWidth={2.5}
              />
              <span className="text-[clamp(15px,1.25vw,19px)] leading-snug text-[var(--dfd-ink)]">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
