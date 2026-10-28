import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiAirtable,
  SiFirebase,
  SiGmail,
  SiGoogleanalytics,
  SiGooglecalendar,
  SiGooglesheets,
  SiGraphql,
  SiHubspot,
  SiLooker,
  SiMetabase,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNotion,
  SiPaypal,
  SiPipedrive,
  SiPostgresql,
  SiPostman,
  SiPowerbi,
  SiQuickbooks,
  SiRazorpay,
  SiSalesforce,
  SiShopify,
  SiSlack,
  SiStripe,
  SiSupabase,
  SiTelegram,
  SiTwilio,
  SiWhatsapp,
  SiWix,
  SiWoocommerce,
  SiWordpress,
  SiZapier,
  SiZoho,
} from "react-icons/si";
import type { IntegrationTool } from "@/lib/content/services/integrationTools";
import { cn } from "@/lib/cn";

const ICONS: Record<string, IconType> = {
  SiAirtable,
  SiFirebase,
  SiGmail,
  SiGoogleanalytics,
  SiGooglecalendar,
  SiGooglesheets,
  SiGraphql,
  SiHubspot,
  SiLooker,
  SiMetabase,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNotion,
  SiPaypal,
  SiPipedrive,
  SiPostgresql,
  SiPostman,
  SiPowerbi,
  SiQuickbooks,
  SiRazorpay,
  SiSalesforce,
  SiShopify,
  SiSlack,
  SiStripe,
  SiSupabase,
  SiTelegram,
  SiTwilio,
  SiWhatsapp,
  SiWix,
  SiWoocommerce,
  SiWordpress,
  SiZapier,
  SiZoho,
};

const NEAR_BLACK_MAX_CHANNEL = 0x30;

function glyphColor(hex: string): string {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return channels.every((c) => c <= NEAR_BLACK_MAX_CHANNEL) ? "#111111" : hex;
}

type ToolTileProps = {
  tool: IntegrationTool;
  duplicate?: boolean;
};

export default function ToolTile({ tool, duplicate = false }: ToolTileProps) {
  const Icon = tool.kind === "icon" && tool.icon ? ICONS[tool.icon] : undefined;
  const color = glyphColor(tool.color);
  const letter = tool.letter ?? tool.name.charAt(0).toUpperCase();

  return (
    <div
      className={cn("tool-tile relative flex-none", duplicate && "tools-dup")}
      aria-hidden={duplicate || undefined}
      title={tool.name}
      style={{ "--tool-border": `${color}59` } as CSSProperties}
    >
      <div className="tool-tile-box flex h-[84px] w-[84px] items-center justify-center rounded-[22px] md:h-[100px] md:w-[100px]">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="h-[42px] w-[42px] md:h-[50px] md:w-[50px]"
            style={{ color }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-sans text-[34px] font-bold leading-none tracking-tight md:text-[40px]"
            style={{ color }}
          >
            {letter}
          </span>
        )}
        {!duplicate && <span className="sr-only">{tool.name}</span>}
      </div>
      <span
        className="tool-chip pointer-events-none absolute left-1/2 whitespace-nowrap rounded-full bg-[#1D1E20] px-3 py-1.5 text-[12px] font-medium text-white"
        aria-hidden="true"
      >
        {tool.name}
      </span>
    </div>
  );
}
