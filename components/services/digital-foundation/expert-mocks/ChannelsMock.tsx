"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ChevronRight, Link2, MessageCircle } from "lucide-react";

const ARC = "M 25 71.4 A 34 34 0 1 1 59 71.4";

type RowProps = {
  icon: typeof MessageCircle;
  label: string;
  chip: string;
  tone: "green" | "lilac";
  top: number;
  reduced: boolean;
  delay: number;
};

function Row({ icon: Icon, label, chip, tone, top, reduced, delay }: RowProps) {
  const green = tone === "green";
  return (
    <m.div
      initial={reduced ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : delay }}
      className="absolute left-[250px] flex h-[52px] w-[190px] items-center gap-1.5 rounded-[14px] bg-white px-2 shadow-[0_12px_28px_rgba(40,20,140,0.22)]"
      style={{ top }}
    >
      <span
        className="grid size-[22px] shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: green ? "#E3F5EA" : "#EDE9FF" }}
      >
        <Icon
          className="size-3"
          style={{ color: green ? "#1E8A4C" : "#4A2FB8" }}
          strokeWidth={2.4}
        />
      </span>
      <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-[#1B1B1F]">
        {label}
      </span>
      <span
        className="shrink-0 rounded-full px-1.5 py-0.5 text-[8.5px] font-medium leading-none"
        style={{
          backgroundColor: green ? "#E3F5EA" : "#EDE9FF",
          color: green ? "#1E8A4C" : "#4A2FB8",
        }}
      >
        {chip}
      </span>
      <ChevronRight
        className="size-3 shrink-0 text-[#9AA0A8]"
        strokeWidth={2.2}
      />
    </m.div>
  );
}

export default function ChannelsMock() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative h-[200px] w-[440px]" aria-hidden="true">
      <m.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1 }}
        className="absolute left-0 top-[10px] h-[190px] w-[330px] rounded-[18px] bg-white px-4 py-3.5 shadow-[0_18px_40px_rgba(40,20,140,0.30)]"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0"
          />
          <span className="text-[14px] leading-none text-[#1B1B1F]">
            Your channels are connected.
          </span>
        </div>

        <div className="relative mt-4 h-[84px] w-[84px]">
          <svg
            width={84}
            height={84}
            viewBox="0 0 84 84"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d={ARC}
              stroke="#E7E9ED"
              strokeWidth={8}
              strokeLinecap="round"
            />
            <m.path
              d={ARC}
              stroke="#11B198"
              strokeWidth={8}
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                delay: reduced ? 0 : 0.25,
                ease: "easeOut",
              }}
            />
          </svg>

          <span className="absolute inset-0 grid place-items-center pb-1 text-[16px] font-bold leading-none text-[#11B198]">
            Ready
          </span>

          <span className="absolute left-1/2 top-[71px] grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white">
            <Link2 className="size-3.5 text-[#4A2FB8]" strokeWidth={2.4} />
          </span>
        </div>
      </m.div>

      <Row
        icon={MessageCircle}
        label="WhatsApp chat"
        chip="Connected"
        tone="green"
        top={38}
        reduced={reduced}
        delay={0.28}
      />
      <Row
        icon={Link2}
        label="Business links"
        chip="Ready"
        tone="lilac"
        top={98}
        reduced={reduced}
        delay={0.36}
      />
    </div>
  );
}
