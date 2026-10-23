"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MousePointerClick, Plus } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { businessAutomation } from "@/lib/content/packages/businessAutomation";
import type {
  BusinessAutomationComparisonRow,
  BusinessAutomationComparisonStatus,
} from "@/lib/content/packages/businessAutomation";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";

const STATUS_LABEL: Record<BusinessAutomationComparisonStatus, string> = {
  yes: "Included",
  no: "Not included",
  partial: "Limited",
};

const STATUS_COLOR: Record<BusinessAutomationComparisonStatus, string> = {
  yes: "var(--cmp-yes)",
  no: "var(--cmp-no)",
  partial: "var(--cmp-partial)",
};

type StatusIconProps = {
  status: BusinessAutomationComparisonStatus;
  delay?: number;
  emphasis?: boolean;
};

function StatusIcon({ status, delay = 0, emphasis = false }: StatusIconProps) {
  return (
    <span
      className="ba-cmp-status relative inline-flex size-[22px] shrink-0 items-center justify-center transition-transform duration-200"
      style={
        {
          transform: emphasis ? "scale(1.12)" : "scale(1)",
          "--ba-cmp-icon-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="flex size-full items-center justify-center rounded-full"
        style={{ backgroundColor: STATUS_COLOR[status] }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[14px]">
          {status === "yes" ? (
            <path
              className="ba-cmp-check-path"
              d="M5.5 12.5 10 17 18.5 7.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
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
      </span>
      <span className="sr-only">{STATUS_LABEL[status]}</span>
    </span>
  );
}

type ProblemChipProps = {
  row: BusinessAutomationComparisonRow;
  selected: boolean;
  chipLabel: string;
  chipLabelSelected: string;
  onToggle: (id: string) => void;
};

function ProblemChip({
  row,
  selected,
  chipLabel,
  chipLabelSelected,
  onToggle,
}: ProblemChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${chipLabel}: ${row.problem}`}
      onClick={() => onToggle(row.id)}
      className={cn(
        "mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]",
        selected
          ? "border-[#8B7CFF] bg-[#673DE6] text-white"
          : "border-white/20 text-white/75 hover:border-white/35 hover:text-white",
      )}
    >
      {selected ? (
        <Check className="size-3" aria-hidden="true" />
      ) : (
        <Plus className="size-3" aria-hidden="true" />
      )}
      {selected ? chipLabelSelected : chipLabel}
    </button>
  );
}

function RowBar({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-0 top-0 h-full w-[3px] origin-top bg-[#8B7CFF] transition-transform duration-200",
        selected ? "scale-y-100" : "scale-y-0",
      )}
    />
  );
}

export default function Comparison() {
  const reduced = useReducedMotion() ?? false;
  const { comparison } = businessAutomation;
  const { rows, columns, chipLabel, chipLabelSelected, cta } = comparison;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const [phase, setPhase] = useState<"base" | "out" | "in">("base");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useLayoutEffect(() => {
    if (reduced) {
      setPhase("in");
      return;
    }
    setPhase("out");
    const timer = window.setTimeout(() => setPhase("in"), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (inView) setPhase("in");
  }, [inView]);

  const selectedRows = rows.filter((row) => selectedIds.includes(row.id));
  const selectedCount = selectedRows.length;
  const selected = new Set(selectedIds);

  const href =
    selectedCount > 0
      ? `${cta.selected.hrefBase}${encodeURIComponent(
          selectedRows.map((row) => row.id).join(","),
        )}`
      : cta.default.href;
  const ctaLabel =
    selectedCount > 0
      ? cta.selected.label(selectedCount)
      : cta.default.label;

  function toggleRow(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  const revealAttr = phase === "base" ? {} : { "data-reveal": phase };
  const revealStyle = (delay: number): CSSProperties =>
    ({
      "--ba-reveal-y": "24px",
      "--ba-reveal-delay": `${delay}ms`,
      "--ba-reveal-dur": "700ms",
    }) as CSSProperties;

  const cmpReveal = (index: number) => ({
    "data-cmp-reveal": phase === "base" ? undefined : phase,
    style: {
      "--ba-cmp-delay": `${index * 90}ms`,
      "--ba-cmp-y": "16px",
    } as CSSProperties,
  });

  const ctaLine = (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-white/70">
      <span>{"We'll start with these in your consultation."}</span>
      <button
        type="button"
        onClick={() => setSelectedIds([])}
        className="rounded underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]"
      >
        Clear
      </button>
    </div>
  );

  const ctaLabelNode = (
    <span key={selectedCount} className="ba-cmp-cta-label inline-block">
      {ctaLabel}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      id="compare"
      aria-labelledby="compare-title"
      className="ba-compare-bg relative overflow-hidden scroll-mt-24 border-t border-white/8 py-20 text-white md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span
            {...revealAttr}
            style={revealStyle(0)}
            className="ba-reveal inline-flex items-center rounded-full border border-white/10 bg-[#2A1F5C]/70 px-4 py-1.5 text-sm text-white"
          >
            {comparison.pill}
          </span>

          <h2
            id="compare-title"
            className="mt-5 text-balance text-4xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-5xl lg:text-[58px]"
          >
            <span
              {...revealAttr}
              style={revealStyle(80)}
              className="ba-reveal block text-[#9B95FF]"
            >
              {comparison.headingLine1}
            </span>
            <span
              {...revealAttr}
              style={revealStyle(160)}
              className="ba-reveal block text-white"
            >
              {comparison.headingLine2}
            </span>
          </h2>

          <p
            {...revealAttr}
            style={revealStyle(240)}
            className="ba-reveal mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            {comparison.sub}
          </p>

          <p
            {...revealAttr}
            style={revealStyle(320)}
            className="ba-reveal mt-8 flex items-center justify-center gap-2 text-sm text-white/60"
          >
            <MousePointerClick
              className="size-4 shrink-0 text-[#9B95FF]"
              aria-hidden="true"
            />
            <span>{comparison.helper}</span>
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          {selectedCount} {selectedCount === 1 ? "problem" : "problems"} selected
        </p>

        <div className="relative mt-8 md:mt-10">
          {isDesktop ? (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
              />

              <table className="ba-cmp-table relative z-20">
                <caption className="sr-only">
                  Comparison of ORYNTAL Business Automation with a typical manual
                  or DIY setup
                </caption>

                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="rounded-tl-[28px] px-8 py-6 text-left md:px-6 lg:px-12"
                    >
                      <span className="text-sm uppercase tracking-widest text-white/50">
                        {columns.problem}
                      </span>
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
                      <span className="mt-2 block max-w-[18rem] text-xs leading-relaxed text-white/60">
                        {comparison.badge}
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
                  {rows.map((row, index) => {
                    const isSelected = selected.has(row.id);
                    const isHovered = hoveredId === row.id;
                    const rowDelay = index * 90;

                    return (
                      <tr
                        key={row.id}
                        onPointerEnter={() => setHoveredId(row.id)}
                        onPointerLeave={() =>
                          setHoveredId((current) =>
                            current === row.id ? null : current,
                          )
                        }
                      >
                        <th
                          scope="row"
                          className={cn(
                            "ba-cmp-reveal relative border-t border-white/10 px-8 py-6 text-left md:px-6 lg:px-12",
                            index === rows.length - 1 && "rounded-bl-[28px]",
                            isSelected
                              ? "bg-[#2A1F5C]/40"
                              : isHovered && "bg-white/[0.04]",
                          )}
                          {...cmpReveal(index)}
                        >
                          <RowBar selected={isSelected} />
                          <span className="block max-w-[16rem] text-lg font-semibold leading-snug text-white">
                            {row.problem}
                          </span>
                          <ProblemChip
                            row={row}
                            selected={isSelected}
                            chipLabel={chipLabel}
                            chipLabelSelected={chipLabelSelected}
                            onToggle={toggleRow}
                          />
                        </th>

                        <td
                          className={cn(
                            "ba-cmp-reveal border-t border-white/10 px-8 py-6 md:px-6 lg:px-8",
                            isSelected
                              ? "bg-[#2A1F5C]/40"
                              : isHovered && "bg-white/[0.06]",
                          )}
                          {...cmpReveal(index)}
                        >
                          <span className="flex items-start gap-3">
                            <StatusIcon
                              status="yes"
                              delay={rowDelay + 120}
                              emphasis={isHovered}
                            />
                            <span className="text-[17px] leading-relaxed text-white">
                              {row.us}
                            </span>
                          </span>
                        </td>

                        <td
                          className={cn(
                            "ba-cmp-reveal border-t border-white/10 px-8 py-6 md:px-6 lg:px-8",
                            index === rows.length - 1 && "rounded-br-[28px]",
                            isSelected
                              ? "bg-[#2A1F5C]/40"
                              : isHovered && "bg-white/[0.04]",
                          )}
                          {...cmpReveal(index)}
                        >
                          <span className="flex items-start gap-3">
                            <StatusIcon
                              status={row.themStatus}
                              delay={rowDelay + 240}
                            />
                            <span className="text-[17px] leading-relaxed text-white/85">
                              {row.them}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div
                className="ba-cmp-col"
                data-cmp-reveal={phase === "base" ? undefined : phase}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-start gap-1.5 px-4 pt-1 lg:justify-center lg:pt-0"
                  style={{ height: "var(--ba-cmp-overhang)" }}
                >
                  {selectedCount > 0 ? (
                    <div className="pointer-events-auto max-w-full">{ctaLine}</div>
                  ) : null}
                  <Link
                    href={href}
                    className="pointer-events-auto inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(99,61,230,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#180F42] lg:px-7 lg:py-3 lg:text-base"
                  >
                    {ctaLabelNode}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <ul role="list" className="flex flex-col gap-4">
              {rows.map((row, index) => {
                const isSelected = selected.has(row.id);
                const rowDelay = index * 90;

                return (
                  <li
                    key={row.id}
                    className={cn(
                      "ba-cmp-reveal relative overflow-hidden rounded-2xl border border-white/10 p-5",
                      isSelected
                        ? "bg-[#2A1F5C]/40"
                        : "bg-white/[0.04]",
                    )}
                    {...cmpReveal(index)}
                  >
                    <RowBar selected={isSelected} />

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-base font-semibold text-white">
                        {row.problem}
                      </p>
                      <ProblemChip
                        row={row}
                        selected={isSelected}
                        chipLabel={chipLabel}
                        chipLabelSelected={chipLabelSelected}
                        onToggle={toggleRow}
                      />
                    </div>

                    <div className="mt-4 rounded-xl border border-[#8B7CFF]/60 bg-[#1D1745] p-3">
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
                        <StatusIcon
                          status="yes"
                          delay={rowDelay + 120}
                        />
                        <span className="text-[15px] leading-relaxed text-white/90">
                          {row.us}
                        </span>
                      </span>
                    </div>

                    <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                      Typical setup
                    </span>
                    <span className="mt-2 flex items-start gap-2.5">
                      <StatusIcon
                        status={row.themStatus}
                        delay={rowDelay + 240}
                      />
                      <span className="text-[15px] leading-relaxed text-white/80">
                        {row.them}
                      </span>
                    </span>
                  </li>
                );
              })}

              <li className="ba-cmp-reveal mt-2" {...cmpReveal(rows.length)}>
                <div className="flex flex-col items-center gap-3">
                  {selectedCount > 0 ? ctaLine : null}
                  <Link
                    href={href}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-3 font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(99,61,230,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]"
                  >
                    {ctaLabelNode}
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </div>

        <div
          className={cn(
            "text-center",
            isDesktop ? "mt-24" : "mt-8",
          )}
        >
          <Link
            href={comparison.secondary.href}
            className="group inline-flex items-center gap-1 text-white underline underline-offset-4 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B95FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120D2E]"
          >
            {comparison.secondary.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-white/50">
          {comparison.footnote}
        </p>
      </div>
    </section>
  );
}
