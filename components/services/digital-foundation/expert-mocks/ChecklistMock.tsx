"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";

const ROWS = [
  "MSME / Udyam guidance",
  "Relevant registrations",
  "Digital setup basics",
];

export default function ChecklistMock() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative h-[200px] w-[440px]" aria-hidden="true">
      <m.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1 }}
        className="absolute left-0 top-0 h-[176px] w-[400px] overflow-hidden rounded-[18px] bg-white px-4 py-2.5 shadow-[0_18px_40px_rgba(40,20,140,0.30)]"
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
            Your setup guide
          </span>
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          {ROWS.map((row, index) => (
            <m.div
              key={row}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduced ? 0 : 0.3,
                delay: reduced ? 0 : 0.18 + index * 0.12,
                ease: "easeOut",
              }}
              className="flex h-[38px] items-center gap-2 rounded-[10px] bg-[#F2F0FD] px-2.5"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#1E8A4C]">
                <svg
                  viewBox="0 0 24 24"
                  className="size-3"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <m.path
                    d="M5 12.5 9.5 17 19 7.5"
                    stroke="#ffffff"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      delay: reduced ? 0 : 0.3 + index * 0.12,
                      ease: "easeOut",
                    }}
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] text-[#1B1B1F]">
                {row}
              </span>
              <span className="shrink-0 rounded-full bg-[#EDE9FF] px-2 py-1 text-[9.5px] font-medium leading-none text-[#4A2FB8]">
                Guided
              </span>
            </m.div>
          ))}
        </div>
      </m.div>

      <p className="absolute right-0 top-[182px] text-[11px] text-[#6B7480]">
        Where applicable
      </p>
    </div>
  );
}
