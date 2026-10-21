"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronsUpDown,
  CircleUser,
  Globe,
  Sparkles,
} from "lucide-react";
import {
  m,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import type {
  ShowcaseContent,
  ShowcaseNavRow,
  ShowcaseStat,
} from "@/lib/content/packages/digitalFoundation";

const WINDOW_W = 642;
const WINDOW_H = 362;
const HEADER_H = 34;
const SIDEBAR_W = 123;
const SIDEBAR_PAD_TOP = 9;
const SIDEBAR_PAD_X = 8;
const ROW_H = 20;
const GROUP_GAP = 10;

type ChartProps = {
  showcase: ShowcaseContent;
  id: string;
  delay: number;
  active: boolean;
};

function Chart({ showcase, id, delay, active }: ChartProps) {
  const { chart } = showcase;
  const areaId = `dfChartArea-${id}`;

  return (
    <svg
      viewBox="0 0 128 60"
      width={128}
      height={60}
      className="block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34C77B" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#34C77B" stopOpacity={0.02} />
        </linearGradient>
      </defs>

      <line
        x1="0"
        y1={chart.baselineY}
        x2="128"
        y2={chart.baselineY}
        stroke="#E4E7EC"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      <path
        d={`${chart.path} L${chart.endX} 60 L0 60 Z`}
        fill={`url(#${areaId})`}
        className="df-chart-area"
        style={{ "--df-chart-delay": `${delay}s` } as React.CSSProperties}
      />

      <line
        x1={chart.endX}
        y1={chart.endY}
        x2={chart.endX}
        y2={chart.baselineY}
        stroke="#34C77B"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      <path
        d={chart.path}
        pathLength={1}
        fill="none"
        stroke="#34C77B"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="df-chart-line"
        style={{ "--df-chart-delay": `${delay}s` } as React.CSSProperties}
      />

      <circle
        cx={chart.endX}
        cy={chart.endY}
        r="3"
        fill="#34C77B"
        className="df-chart-dot"
        style={{ "--df-chart-delay": `${delay + 0.85}s` } as React.CSSProperties}
      />

      <circle
        cx={chart.endX}
        cy={chart.endY}
        r="3"
        fill="none"
        stroke="#34C77B"
        strokeWidth="1"
        className="df-chart-pulse"
        data-active={active ? "true" : "false"}
        style={{ "--df-chart-delay": `${delay + 0.85}s` } as React.CSSProperties}
      />
    </svg>
  );
}

type StatCardProps = {
  stat: ShowcaseStat;
  showcase: ShowcaseContent;
  active: boolean;
  delay: number;
  pulseActive: boolean;
};

function StatCard({
  stat,
  showcase,
  active,
  delay,
  pulseActive,
}: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div
      data-df="stat-card"
      className="relative h-[127px] w-[144px] shrink-0 rounded-[8px] border border-[#E4E7EC] bg-[#F7F8FA] px-[10px] pt-[8px]"
      style={active ? { boxShadow: "0 0 0 2px #673DE6" } : undefined}
    >
      <div className="flex items-start justify-between">
        <Icon className="size-[11px] shrink-0 text-[#1B1F27]" strokeWidth={1.6} />
        <span className="rounded-full bg-[#E3F5EA] px-[6px] py-[3px] text-[7px] font-medium leading-none text-[#1E8A4C]">
          {stat.chip}
        </span>
      </div>

      <p className="mt-[6px] text-[8.5px] leading-none text-[#6B7480]">
        {stat.label}
      </p>

      <p className="mt-[4px] text-[11px] font-bold leading-none text-[#1B1F27]">
        {stat.value}
      </p>

      <p className="mt-[3px] text-[7px] leading-none text-[#6B7480]">
        {stat.muted}
      </p>

      <div className="absolute bottom-[3px] left-[8px]">
        <Chart
          showcase={showcase}
          id={stat.id}
          delay={delay}
          active={pulseActive}
        />
      </div>
    </div>
  );
}

type WindowProps = {
  showcase: ShowcaseContent;
  activeId: string | null;
  onSelect: (id: string) => void;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  reduced: boolean;
  visible: boolean;
};

export default function DashboardWindow({
  showcase,
  activeId,
  onSelect,
  parallaxX,
  parallaxY,
  tiltX,
  tiltY,
  reduced,
  visible,
}: WindowProps) {
  const { copy, navGroups, stats, tableColumns } = showcase;
  const x = useTransform(parallaxX, (v) => -v * 2);
  const y = useTransform(parallaxY, (v) => -v * 2);

  const rows: ShowcaseNavRow[] = navGroups.flatMap((group) => group.rows);
  const tabRows = rows.filter((row) => row.includedId);

  const activeRow =
    rows.find((row) => row.includedId === activeId && !row.secondary) ??
    rows.find((row) => row.includedId === activeId) ??
    null;
  const focusRowId = activeRow?.id ?? tabRows[0]?.id ?? null;

  // Row offsets follow the sidebar flow, so the shared highlight can sit
  // behind the row that is currently active.
  const rowOffsets = new Map<string, number>();
  {
    let top = SIDEBAR_PAD_TOP;
    navGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) top += GROUP_GAP;
      group.rows.forEach((row) => {
        rowOffsets.set(row.id, top);
        top += ROW_H;
      });
    });
  }

  const columnWidths = tableColumns.map((column, index) => {
    const next = tableColumns[index + 1];
    return next ? next.x - column.x : 160 - column.x;
  });

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: ShowcaseNavRow,
  ) => {
    const index = tabRows.indexOf(row);
    if (index < 0) return;
    let next = -1;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % tabRows.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + tabRows.length) % tabRows.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabRows.length - 1;
    }

    if (next < 0) return;
    event.preventDefault();
    const target = tabRows[next];
    if (target.includedId) onSelect(target.includedId);
    const node = document.getElementById(`dfShowcaseTab-${target.id}`);
    node?.focus();
  };

  const renderRow = (row: ShowcaseNavRow) => {
    const Icon = row.icon;
    const Trailing = row.trailingIcon;
    const isTab = Boolean(row.includedId);
    const matched = row.includedId === activeId;
    const offset = rowOffsets.get(row.id) ?? 0;

    const highlight =
      matched && !row.secondary ? (
        <m.div
          layoutId="dfShowcaseNav"
          className="absolute rounded-[6px] bg-[#ECEEF1]"
          style={{
            top: offset,
            left: SIDEBAR_PAD_X,
            width: SIDEBAR_W - SIDEBAR_PAD_X * 2,
            height: ROW_H,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      ) : matched && row.secondary ? (
        <span className="absolute rounded-[6px] bg-[#ECEEF1]" style={{ inset: 0 }} />
      ) : null;

    const content = (
      <>
        {highlight}
        <Icon className="size-[11px] shrink-0 text-[#1B1F27]" strokeWidth={1.6} />
        <span
          className={cn(
            "truncate text-[8.5px] leading-none text-[#1B1F27]",
            matched && "font-medium",
          )}
        >
          {row.label}
        </span>
        {Trailing ? (
          <Trailing className="ml-auto size-[8px] shrink-0 text-[#6B7480]" strokeWidth={2} />
        ) : null}
      </>
    );

    if (!isTab) {
      return (
        <div
          key={row.id}
          role="presentation"
          className="flex h-5 w-full items-center gap-1.5 rounded-[6px] px-2"
        >
          {content}
        </div>
      );
    }

    return (
      <button
        key={row.id}
        id={`dfShowcaseTab-${row.id}`}
        type="button"
        role="tab"
        aria-selected={matched && !row.secondary}
        tabIndex={row.id === focusRowId ? 0 : -1}
        onClick={() => row.includedId && onSelect(row.includedId)}
        onKeyDown={(event) => handleKeyDown(event, row)}
        className="flex h-5 w-full items-center gap-1.5 rounded-[6px] px-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673DE6]"
      >
        {content}
      </button>
    );
  };

  return (
    <div
      className="absolute"
      style={{ left: 128, top: 25, width: WINDOW_W, height: WINDOW_H, zIndex: 10 }}
    >
      <m.div
        style={reduced ? undefined : { x, y }}
        className="h-full w-full"
      >
        <m.div
          className="h-full w-full"
          initial={false}
          animate={
            visible && !reduced
              ? { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          <m.div
            style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY }}
            className="h-full w-full"
          >
            <div
              data-df="window-root"
              className="flex flex-col overflow-hidden rounded-[8px] bg-[#F2F4F7] text-[#1B1F27]"
              style={{
                width: WINDOW_W,
                height: WINDOW_H,
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.55), 0 24px 60px rgba(8,16,30,0.38), 0 40px 80px -20px rgba(150,185,220,0.35)",
              }}
            >
              {/* Header */}
              <div
                data-df="window-header"
                aria-hidden="true"
                className="flex shrink-0 items-center gap-[7px] border-b border-[#E4E7EC] bg-white"
                style={{ height: HEADER_H, padding: "0 12px 0 15px" }}
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-[14px] w-auto shrink-0"
                />
                <span className="h-3 w-px shrink-0 bg-[#CBD0D8]" />
                <span className="whitespace-nowrap text-[8.5px] font-normal leading-none text-[#1B1F27]">
                  {copy.product}
                </span>

                <span className="flex-1" />

                <span className="flex shrink-0 items-center rounded-[10px] bg-[linear-gradient(90deg,#7B4DFF,#E24BC8)] p-[1.2px]">
                  <span className="flex h-[18px] items-center gap-1 rounded-[9px] bg-white px-2">
                    <Sparkles className="size-[9px] shrink-0 text-[#7B4DFF]" strokeWidth={2} />
                    <span className="whitespace-nowrap text-[7px] font-medium leading-none text-[#3F2A9E]">
                      {copy.ask}
                    </span>
                  </span>
                </span>

                <CircleUser
                  className="ml-2 size-[13px] shrink-0 text-[#1B1F27]"
                  strokeWidth={1.6}
                />
              </div>

              {/* Body */}
              <div className="flex min-h-0 flex-1">
                {/* Sidebar */}
                <div
                  data-df="window-sidebar"
                  role="tablist"
                  aria-label="What's included"
                  aria-orientation="vertical"
                  className="relative flex h-full w-[123px] shrink-0 flex-col bg-[#F7F8FA] px-2 pt-[9px]"
                >
                  {navGroups.map((group, groupIndex) => (
                    <div
                      key={group.rows[0].id}
                      role="presentation"
                      className={cn(
                        "flex flex-col",
                        groupIndex > 0 && "mt-[10px]",
                      )}
                    >
                      {group.rows.map((row) => renderRow(row))}
                    </div>
                  ))}
                </div>

                {/* Main */}
                <div
                  data-df="window-main"
                  aria-hidden="true"
                  className="relative flex h-full min-w-0 flex-1 flex-col"
                  style={{ padding: "14px 14px 0 28px" }}
                >
                  {/* Welcome */}
                  <div className="flex h-[34px] shrink-0 items-start gap-2">
                    <div className="flex min-w-0 flex-1 flex-col items-center pt-[12px]">
                      <p className="text-[13px] font-bold leading-none text-[#1B1F27]">
                        {copy.welcome}
                      </p>
                      <p className="mt-[3px] text-[8.5px] leading-none text-[#6B7480]">
                        {copy.welcomeSub}
                      </p>
                    </div>

                    <div className="flex h-[34px] w-[98px] shrink-0 items-center gap-[5px] rounded-[8px] border border-[#E4E7EC] bg-white px-[8px]">
                      <Globe
                        className="size-[10px] shrink-0 text-[#6B7480]"
                        strokeWidth={1.8}
                      />
                      <span className="truncate text-[7.5px] leading-none text-[#1B1F27]">
                        {copy.siteUrl}
                      </span>
                    </div>
                  </div>

                  {/* Setup overview */}
                  <div
                    data-df="setup-card"
                    className="mt-[15px] w-[465px] shrink-0 rounded-[10px] border border-[#E4E7EC] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.04)]"
                    style={{ height: 188 }}
                  >
                    <div className="flex items-center justify-between px-[16px] pt-[13px]">
                      <p className="text-[10px] font-bold leading-none text-[#1B1F27]">
                        {copy.setupOverview}
                      </p>
                      <span className="flex items-center gap-[3px] text-[8px] leading-none text-[#673DE6]">
                        {copy.viewDetails}
                        <ArrowRight className="size-[8px]" strokeWidth={2.2} />
                      </span>
                    </div>

                    <div className="mt-[6px] flex gap-2 px-2">
                      {stats.map((stat, index) => (
                        <StatCard
                          key={stat.id}
                          stat={stat}
                          showcase={showcase}
                          active={activeId !== null && stat.id === activeId}
                          delay={0.55 + index * 0.15}
                          pulseActive={visible}
                        />
                      ))}
                    </div>

                    <p className="mt-[8px] pl-[10px] text-[6.5px] leading-none text-[#8A93A0]">
                      {copy.cardCaption}
                    </p>
                  </div>

                  {/* Recent enquiries */}
                  <div
                    data-df="enquiries-card"
                    className="mt-[14px] w-[465px] shrink-0 rounded-[10px] border border-[#E4E7EC] bg-white"
                    style={{ height: 140 }}
                  >
                    <p className="px-[16px] pt-[15px] text-[10px] font-bold leading-none text-[#1B1F27]">
                      {copy.enquiries}
                    </p>

                    <div className="mt-[16px] flex h-[13px] items-start border-b border-[#E4E7EC] px-[8px] text-[8px] leading-none text-[#6B7480]">
                      {tableColumns.map((column, index) => (
                        <span
                          key={column.label}
                          className="flex items-center gap-[3px]"
                          style={{ width: columnWidths[index] }}
                        >
                          {column.label}
                          <ChevronsUpDown className="size-[6px]" strokeWidth={2.2} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}
