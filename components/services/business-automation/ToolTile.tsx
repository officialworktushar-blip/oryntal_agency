"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import type { BusinessAutomationConnectTool } from "@/lib/content/packages/businessAutomation";

type ToolTileProps = {
  tool: BusinessAutomationConnectTool;
  index?: number;
  animate?: boolean;
};

export default function ToolTile({ tool, index = 0, animate = false }: ToolTileProps) {
  const Icon = tool.icon as IconType | undefined;
  const isMonogram = tool.icon === "monogram";

  return (
    <li
      className="ba-tool-item group relative flex items-center gap-4 rounded-2xl p-2.5 -m-2.5 transition-colors duration-200 hover:bg-white/5"
      style={
        animate
          ? ({
              "--ba-tool-delay": `${(Math.floor(index / 5) * 30) + ((index % 5) * 10)}ms`,
            } as CSSProperties)
          : undefined
      }
      data-animate={animate ? "true" : undefined}
    >
      <span
        className="ba-tool-tile grid h-[50px] w-[50px] shrink-0 place-items-center rounded-xl bg-white shadow-[0_4px_14px_rgba(0,0,0,.25)] transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:scale-[1.06] sm:h-[44px] sm:w-[44px] md:h-[50px] md:w-[50px]"
      >
        {isMonogram ? (
          <span
            className="text-lg font-semibold leading-none"
            style={{ color: tool.color }}
            aria-hidden="true"
          >
            {tool.name.charAt(0)}
          </span>
        ) : Icon ? (
          <Icon
            size={26}
            style={{ color: tool.color }}
            aria-hidden="true"
          />
        ) : (
          <span
            className="text-lg font-semibold leading-none"
            style={{ color: tool.color }}
            aria-hidden="true"
          >
            {tool.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[16px] font-medium leading-tight text-white md:text-[17px]">
          {tool.name}
        </span>
        <span className="hidden text-[13px] text-white/55 sm:block">
          {tool.sub}
        </span>
      </span>
    </li>
  );
}
