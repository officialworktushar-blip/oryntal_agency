"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import {
  Check,
  ClipboardList,
  MessageCircle,
  Table2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tile = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

const TILES: Tile[] = [
  { id: "inquiry", label: "Inquiry form", icon: ClipboardList, color: "#6C47E0" },
  { id: "whatsapp", label: "WhatsApp button", icon: MessageCircle, color: "#1E8A4C" },
  { id: "sheet", label: "Lead sheet", icon: Table2, color: "#6C47E0" },
];

function ReadyChip() {
  return (
    <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-[#E3F5EA] px-1.5 py-0.5 text-[9px] font-medium leading-none text-[#1E8A4C]">
      <Check className="size-2" strokeWidth={3.4} />
      Ready
    </span>
  );
}

export default function LeadCardsMock() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative h-[200px] w-[440px]" aria-hidden="true">
      <div className="absolute left-0 top-0 flex h-[54px] w-[380px] items-center gap-2 rounded-2xl bg-white px-3.5 shadow-[0_18px_40px_rgba(40,20,140,0.30)]">
        <Image
          src="/logo.png"
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
        <span className="text-[14px] leading-none text-[#1B1B1F]">
          Here&apos;s your lead capture setup
        </span>
      </div>

      <div className="absolute left-[36px] top-[42px] flex gap-2">
        {TILES.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <m.div
              key={tile.id}
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reduced ? 0 : 0.35,
                delay: reduced ? 0 : 0.14 + index * 0.09,
                ease: "easeOut",
              }}
              className="flex h-[118px] w-[126px] flex-col rounded-[14px] bg-white p-2.5 shadow-[0_10px_24px_rgba(40,20,140,0.18)]"
            >
              <div className="flex items-center gap-1.5">
                <Icon
                  className="size-3.5 shrink-0"
                  style={{ color: tile.color }}
                  strokeWidth={2.4}
                />
                <span className="truncate text-[11px] font-medium text-[#1B1B1F]">
                  {tile.label}
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                {tile.id === "inquiry" && (
                  <>
                    <div className="h-5 rounded-md border border-[#E7E8EC] bg-[#F7F8FA]" />
                    <div className="h-5 rounded-md bg-[#EDE9FF]" />
                  </>
                )}

                {tile.id === "whatsapp" && (
                  <>
                    <div className="h-5 rounded-md border border-[#E7E8EC] bg-[#F7F8FA]" />
                    <div className="flex h-5 items-center gap-1 rounded-full bg-[#E3F5EA] px-1.5">
                      <span className="size-1.5 rounded-full bg-[#1E8A4C]" />
                      <span className="text-[9px] font-medium leading-none text-[#1E8A4C]">
                        Chat
                      </span>
                    </div>
                  </>
                )}

                {tile.id === "sheet" && (
                  <>
                    <div className="h-3 rounded-sm bg-[#F0F1F4]" />
                    <div className="h-3 w-[86%] rounded-sm bg-[#F0F1F4]" />
                    <div className="h-3 w-[70%] rounded-sm bg-[#F0F1F4]" />
                  </>
                )}
              </div>

              <ReadyChip />
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
