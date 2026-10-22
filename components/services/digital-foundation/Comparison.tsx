"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  digitalFoundation,
  type ComparisonRow,
  type ComparisonStatus,
} from "@/lib/content/packages/digitalFoundation";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

/** Screen-reader label for each status icon. */
const STATUS_LABEL: Record<ComparisonStatus, string> = {
  yes: "Included",
  no: "Not included",
  partial: "Limited",
};

/** Fill colour of each status icon. */
const STATUS_COLOR: Record<ComparisonStatus, string> = {
  yes: "var(--cmp-yes)",
  no: "var(--cmp-no)",
  partial: "var(--cmp-partial)",
};

type StatusIconProps = {
  status: ComparisonStatus;
  /** Seconds to wait before the icon pops in. */
  delay?: number;
  /** Whether the icon animates in when the table comes into view. */
  animate?: boolean;
  /** Slightly larger while its row is hovered. */
  emphasis?: boolean;
  reduced: boolean;
};

/**
 * Status marker: a filled 22px circle with a distinct symbol, so the meaning
 * never depends on colour alone.
 */
function StatusIcon({
  status,
  delay = 0,
  animate = false,
  emphasis = false,
  reduced,
}: StatusIconProps) {
  return (
    <span
      className="relative inline-flex size-[22px] shrink-0 items-center justify-center transition-transform duration-200"
      style={{ transform: emphasis ? "scale(1.12)" : "scale(1)" }}
    >
      <m.span
        aria-hidden="true"
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 18, delay }
        }
        className="flex size-full items-center justify-center rounded-full"
        style={{ backgroundColor: STATUS_COLOR[status] }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[14px]">
          {status === "yes" ? (
            <m.path
              d="M5.5 12.5 10 17 18.5 7.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: reduced || animate ? 1 : 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.45, delay: delay + 0.08, ease: "easeOut" }
              }
            />
          ) : status === "no" ? (
            <path
              d="M7.5 7.5 16.5 16.5M16.5 7.5 7.5 16.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth={3.2}
              strokeLinecap="round"
            />
          ) : (
            <>
              <path
                d="M12 6.5v7"
                fill="none"
                stroke="#201A3F"
                strokeWidth={3.2}
                strokeLinecap="round"
              />
              <circle cx="12" cy="17.4" r="1.9" fill="#201A3F" />
            </>
          )}
        </svg>
      </m.span>
      <span className="sr-only">{STATUS_LABEL[status]}</span>
    </span>
  );
}

export default function Comparison() {
  const reduced = useReducedMotion() ?? false;
  const { comparison } = digitalFoundation;
  const { rows, columns, badge, cta, secondary, footnote } = comparison;

  /* The table is for md and up; below that the same rows stack as cards. */
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const entered = useInView(tableRef, { amount: 0.2, once: true });

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 24,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="compare"
      aria-labelledby="compare-title"
      className="df-compare-bg relative scroll-mt-24 overflow-hidden border-t border-white/[0.08] py-20 text-white md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <m.span
            {...reveal(0)}
            className="inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm text-white"
          >
            {comparison.pill}
          </m.span>

          <m.h2
            id="compare-title"
            className="mt-5 font-normal leading-[1.1] tracking-[-0.03em] text-4xl text-white md:text-5xl lg:text-[58px]"
          >
            <m.span {...reveal(0.08)} className="block text-[#9B95FF]">
              {comparison.headingLine1}
            </m.span>
            <m.span {...reveal(0.16)} className="block text-white">
              {comparison.headingLine2}
            </m.span>
          </m.h2>

          <m.p
            {...reveal(0.24)}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-white/75 md:text-lg"
          >
            {comparison.sub}
          </m.p>
        </div>

        {/* The table (desktop) and the stacked cards (mobile) share one
            wrapper, so the in-view gate always has a stable element. */}
        <div ref={tableRef} className="relative mt-14 md:mt-16">
          {isDesktop ? (
            /* ----------------------------------------------------------------
               Desktop — a real table laid out as a CSS grid.
               ---------------------------------------------------------------- */
            <>
              {/* Outer frame around the label column and the right column */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
              />

              <table role="table" className="df-cmp-table relative z-20">
                <caption className="sr-only">
                  Comparison of ORYNTAL Digital Foundation with a typical DIY or
                  template setup
                </caption>

                <thead>
                  <tr role="row">
                    <th
                      scope="col"
                      className="rounded-tl-[28px] px-8 py-6 text-left md:px-6 lg:px-12"
                    >
                      <span className="sr-only">What we compare</span>
                    </th>

                    <th
                      scope="col"
                      className="px-8 py-6 text-left md:px-6 lg:px-8"
                    >
                      <span className="flex items-center gap-2.5">
                        <Image
                          src="/logo.png"
                          alt=""
                          width={22}
                          height={22}
                          className="h-[22px] w-[22px] shrink-0 brightness-0 invert"
                        />
                        <span className="text-xl font-semibold text-white">
                          {columns.us}
                        </span>
                      </span>
                      <span
                        title={badge}
                        className="mt-2 block max-w-[18rem] text-xs leading-relaxed text-white/60 line-clamp-2"
                      >
                        {badge}
                      </span>
                    </th>

                    <th
                      scope="col"
                      className="rounded-tr-[28px] px-8 py-6 text-left md:px-6 lg:px-8"
                    >
                      <span className="text-xl font-semibold text-white">
                        {columns.them}
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, i) => (
                    <ComparisonRowRow
                      key={row.id}
                      row={row}
                      index={i}
                      last={i === rows.length - 1}
                      hovered={hoveredRow === i}
                      entered={entered}
                      reduced={reduced}
                      setHoveredRow={setHoveredRow}
                    />
                  ))}
                </tbody>
              </table>

              {/* Highlighted ORYNTAL column — frame, glow and the CTA */}
              <m.div
                className="df-cmp-col"
                initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                animate={
                  reduced
                    ? { opacity: 1 }
                    : entered
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.98 }
                }
                transition={{ duration: reduced ? 0.2 : 0.5, ease: "easeOut" }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center"
                  style={{ height: "var(--cmp-overhang)" }}
                >
                  <Link
                    href={cta.href}
                    className="pointer-events-auto inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(99,61,230,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#180F42]"
                  >
                    {cta.label}
                  </Link>
                </div>
              </m.div>
            </>
          ) : (
            /* ----------------------------------------------------------------
               Mobile — the same rows stacked as cards.
               ---------------------------------------------------------------- */
            <ul role="list" className="flex flex-col gap-4">
              {rows.map((row, i) => (
                <m.li
                  key={row.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={
                    reduced ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: reduced ? 0.2 : 0.45,
                    delay: reduced ? 0 : i * 0.06,
                    ease: "easeOut",
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-base font-semibold text-white">
                    {row.label}
                  </p>

                  <div className="mt-3 rounded-xl border border-[var(--cmp-border-soft)] bg-[var(--cmp-card-bg)] p-3">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/logo.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0 brightness-0 invert"
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9B95FF]">
                        ORYNTAL
                      </span>
                    </span>
                    <span className="mt-2 flex items-start gap-2.5">
                      <StatusIcon status="yes" reduced={reduced} />
                      <span className="text-[15px] leading-relaxed text-white/90">
                        {row.us}
                      </span>
                    </span>
                  </div>

                  <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Typical setup
                  </span>
                  <span className="mt-2 flex items-start gap-2.5">
                    <StatusIcon status={row.themStatus} reduced={reduced} />
                    <span className="text-[15px] leading-relaxed text-white/80">
                      {row.them}
                    </span>
                  </span>
                </m.li>
              ))}

              <m.li
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduced ? 0.2 : 0.45,
                  delay: reduced ? 0 : rows.length * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={cta.href}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(99,61,230,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]"
                >
                  {cta.label}
                </Link>
              </m.li>
            </ul>
          )}
        </div>

        {/* Secondary link + footnote */}
        <div className={cn("text-center", isDesktop ? "mt-24" : "mt-8")}>
          <Link
            href={secondary.href}
            className="group inline-flex items-center gap-1 text-white underline underline-offset-4 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]"
          >
            {secondary.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-white/50">
          {footnote}
        </p>
      </div>
    </section>
  );
}

type RowProps = {
  row: ComparisonRow;
  index: number;
  last: boolean;
  hovered: boolean;
  entered: boolean;
  reduced: boolean;
  setHoveredRow: Dispatch<SetStateAction<number | null>>;
};

/** One comparison row: label, ORYNTAL cell, typical-setup cell. */
function ComparisonRowRow({
  row,
  index,
  last,
  hovered,
  entered,
  reduced,
  setHoveredRow,
}: RowProps) {
  const rowDelay = 0.4 + index * 0.09;

  const cell = (extra: number) => ({
    /* With reduced motion the rows are simply there — never gated behind the
       in-view observer, so the content can never be hidden. */
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: reduced
      ? { opacity: 1 }
      : entered
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 16 },
    transition: {
      duration: reduced ? 0.2 : 0.45,
      delay: reduced ? 0 : rowDelay + extra,
      ease: "easeOut" as const,
    },
  });

  return (
    <tr
      role="row"
      onPointerEnter={() => setHoveredRow(index)}
      onPointerLeave={() =>
        setHoveredRow((current) => (current === index ? null : current))
      }
    >
      <m.th
        scope="row"
        {...cell(0)}
        className={cn(
          "border-t border-white/10 px-8 py-5 text-left text-base font-semibold text-white md:px-6 lg:px-12 lg:text-lg",
          last && "rounded-bl-[28px]",
          hovered && "bg-white/[0.04]"
        )}
      >
        {row.label}
      </m.th>

      <m.td
        {...cell(0.06)}
        className={cn(
          "border-t border-white/10 px-8 py-5 md:px-6 lg:px-8",
          hovered && "bg-white/[0.06]"
        )}
      >
        <span className="flex items-start gap-3">
          <StatusIcon
            status="yes"
            delay={rowDelay + 0.08}
            animate={entered}
            emphasis={hovered}
            reduced={reduced}
          />
          <span className="text-[15px] leading-relaxed text-white/90">
            {row.us}
          </span>
        </span>
      </m.td>

      <m.td
        {...cell(0.2)}
        className={cn(
          "border-t border-white/10 px-8 py-5 md:px-6 lg:px-8",
          last && "rounded-br-[28px]",
          hovered && "bg-white/[0.04]"
        )}
      >
        <span className="flex items-start gap-3">
          <StatusIcon
            status={row.themStatus}
            delay={rowDelay + 0.2}
            animate={entered}
            emphasis={hovered}
            reduced={reduced}
          />
          <span className="text-[17px] leading-relaxed text-white/85">
            {row.them}
          </span>
        </span>
      </m.td>
    </tr>
  );
}
