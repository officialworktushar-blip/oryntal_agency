"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import CodeBrief from "@/components/services/premium-custom/CodeBrief";
import type { PremiumCustomModuleItem } from "@/lib/content/packages/premiumCustom";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

type ModulePanelProps = {
  item: PremiumCustomModuleItem;
  isActive: boolean;
  idBase: string;
  variant?: "tab" | "accordion";
  compact?: boolean;
};

export default function ModulePanel({
  item,
  isActive,
  idBase,
  variant = "tab",
  compact = false,
}: ModulePanelProps) {
  const reduced = useReducedMotion() ?? false;
  const { divider, briefHelper } = premiumCustom.modules;
  const Icon = item.icon;
  const panelId = `${idBase}-panel-${item.id}`;
  const labelId = `${idBase}-tab-${item.id}`;

  return (
    <div
      id={variant === "tab" ? panelId : undefined}
      role={variant === "tab" ? "tabpanel" : undefined}
      aria-labelledby={variant === "tab" ? labelId : undefined}
      tabIndex={variant === "tab" ? 0 : undefined}
      hidden={variant === "tab" ? !isActive : undefined}
      className={`relative overflow-hidden border border-white/[0.09] bg-[#111113] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] ${
        compact ? "rounded-[22px] p-5" : "min-h-[540px] rounded-[28px] p-8 md:p-10"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, rgba(139,124,255,.10) 0%, rgba(139,124,255,0) 75%)",
        }}
      />

      <m.div
        initial={false}
        animate={
          reduced
            ? { opacity: 1, y: 0 }
            : isActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
        }
        transition={reduced ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
        className="relative"
      >
        <div className="flex items-center gap-5">
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#1E1E22] ${
              compact ? "h-[52px] w-[52px]" : "h-16 w-16"
            }`}
          >
            <Icon
              size={compact ? 26 : 32}
              style={{ color: "#8B7CFF" }}
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <h3
              className={`font-semibold leading-tight text-white ${
                compact ? "text-xl" : "text-[26px] md:text-[30px]"
              }`}
            >
              {item.title}
            </h3>
            <p className={`mt-1.5 text-white/65 ${compact ? "text-[15px]" : "text-[17px]"}`}>
              {item.subtitle}
            </p>
          </div>
        </div>

        <p
          className={`mt-6 max-w-2xl leading-relaxed text-white/75 ${
            compact ? "text-[15.5px]" : "text-[17px]"
          }`}
        >
          {item.description}
        </p>

        <ul
          className={`mt-6 grid gap-x-6 gap-y-3 ${
            compact ? "grid-cols-1" : "sm:grid-cols-2"
          }`}
        >
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(139,124,255,.15)" }}
                aria-hidden="true"
              >
                <Check size={12} style={{ color: "#8B7CFF" }} strokeWidth={3} />
              </span>
              <span
                className={`leading-snug text-white/85 ${
                  compact ? "text-[15px]" : "text-[16px]"
                }`}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={item.cta.href}
          className={`group/cta mt-8 flex w-full items-center justify-center gap-2 rounded-2xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(99,61,230,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] ${
            compact ? "h-14 text-[17px]" : "h-16 text-[19px]"
          }`}
          style={{
            background: "linear-gradient(180deg, #6F45EE, #5B34D6)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.18)",
          }}
        >
          {item.cta.label}
          <ArrowUpRight
            className="size-5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[14px] text-white/45">{divider}</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <CodeBrief item={item} isActive={isActive} />

        <p className="mt-3 text-[13px] text-white/45">{briefHelper}</p>
        <p className="mt-4 max-w-2xl text-[13px] text-white/50">{item.note}</p>
      </m.div>
    </div>
  );
}
