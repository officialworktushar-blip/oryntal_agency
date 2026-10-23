"use client";

import { useState, type CSSProperties } from "react";
import type { BusinessAutomationOverviewCard } from "@/lib/content/packages/businessAutomation";
import OrderFlowDiagram from "./diagrams/OrderFlowDiagram";
import TreeDiagram from "./diagrams/TreeDiagram";
import ChatDiagram from "./diagrams/ChatDiagram";

type RevealState = "base" | "out" | "in";

type OverviewCardProps = {
  card: BusinessAutomationOverviewCard;
  index: number;
  revealState: RevealState;
  running: boolean;
  reduced: boolean;
};

const DIAGRAMS = {
  orders: OrderFlowDiagram,
  repeat: TreeDiagram,
  chats: ChatDiagram,
};

export default function OverviewCard({
  card,
  index,
  revealState,
  running,
  reduced,
}: OverviewCardProps) {
  const [hovered, setHovered] = useState(false);
  const Diagram = DIAGRAMS[card.id];
  const animateIn = revealState === "in" && !reduced;

  return (
    <article
      data-reveal={revealState === "base" ? undefined : revealState}
      className="ba-reveal ba-overview-card relative mx-auto flex w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] border border-white/[0.07] p-7 text-white lg:max-w-none lg:p-[30px]"
      style={
        {
          "--ba-reveal-y": "40px",
          "--ba-reveal-dur": "650ms",
          "--ba-reveal-delay": `${index * 120}ms`,
          backgroundColor: "#17123A",
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, rgba(120, 90, 255, 0.10) 100%)",
        } as CSSProperties
      }
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <h3 className="text-2xl font-normal leading-tight tracking-[-0.02em] text-white lg:text-[28px]">
        {card.title}
      </h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-white/75 lg:text-[17px]">
        {card.description}
      </p>

      <div className="mt-8 min-w-0 lg:mt-10">
        <Diagram
          animateIn={animateIn}
          running={running}
          reduced={reduced}
          highlight={hovered}
        />
      </div>
    </article>
  );
}
