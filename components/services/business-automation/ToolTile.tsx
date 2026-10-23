"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import type { BusinessAutomationConnectTool } from "@/lib/content/packages/businessAutomation";

type ToolTileProps = {
  tool: BusinessAutomationConnectTool;
  index?: number;
  animate?: boolean;
  pulse?: boolean;
  reveal?: boolean;
};

export default function ToolTile({
  tool,
  index = 0,
  animate = false,
  pulse = false,
  reveal = false,
}: ToolTileProps) {
  const Icon = tool.icon as IconType | undefined;
  const isMonogram = tool.icon === "monogram";

  const style = {
    "--ba-tool-delay": `${index * 30}ms`,
    "--ba-pulse-delay": `${index * 90}ms`,
    "--ba-reveal-delay": `${index * 25}ms`,
  } as CSSProperties;

  return (
    <li
      className="ba-tool-item group relative flex h-[62px] items-center gap-4 rounded-2xl transition-colors duration-200 hover:bg-white/5"
      style={style}
      data-animate={animate ? "true" : undefined}
      data-reveal={reveal ? "true" : undefined}
      data-pulse={pulse ? "true" : undefined}
    >
      <span className="ba-tool-tile relative grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl bg-white shadow-[0_4px_14px_rgba(0,0,0,.25)] transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:scale-[1.06] sm:h-[50px] sm:w-[50px]">
        {isMonogram || !Icon ? (
          <span
            className="text-lg font-bold leading-none"
            style={{ color: tool.color }}
            aria-hidden="true"
          >
            {tool.name.charAt(0)}
          </span>
        ) : (
          <Icon size={26} style={{ color: tool.color }} aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[16px] font-medium leading-tight text-white md:text-[17px]">
          {tool.name}
        </span>
        <span className="hidden text-[13px] text-white/55 sm:block">{tool.sub}</span>
      </span>
    </li>
  );
}
