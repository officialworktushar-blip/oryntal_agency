"use client";

import { ShieldCheck } from "lucide-react";

type SecurityListWidgetProps = {
  className?: string;
};

export default function SecurityListWidget({
  className,
}: SecurityListWidgetProps) {
  return (
    <div
      className={`dfd-widget h-[196px] w-[195px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="absolute left-[22px] top-[17px] text-[16px] leading-none text-[var(--dfd-ink)]">
        Essential security
      </span>

      <span className="absolute left-1/2 top-[52px] grid size-[72px] -translate-x-1/2 place-items-center rounded-full bg-[var(--dfd-lilac)]">
        <ShieldCheck className="size-[44px] text-[var(--dfd-4)]" strokeWidth={1.8} />
      </span>

      <p className="absolute inset-x-0 top-[140px] text-center text-[13px] leading-none text-[var(--dfd-ink-soft)]">
        set up for you
      </p>
    </div>
  );
}
