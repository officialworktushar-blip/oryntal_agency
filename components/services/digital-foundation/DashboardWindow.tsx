"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronsUpDown,
  CircleUser,
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
const SIDEBAR_W = 123;
const HEADER_H = 34;

type ChartProps = {
  showcase: ShowcaseContent;
  id: string;
  delay: number;
  reduced: boolean;
  visible: boolean;
};

function Chart({ showcase, id, delay, reduced, visible }: ChartProps) {
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
        opacity={visible ? 1 : 0}
        style={{ transition: `opacity 0.6s ease ${delay}s` }}
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

      <m.path
        d={chart.path}
        fill="none"
        stroke="#34C77B"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: visible ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: "easeInOut" }}
      />

      <m.circle
        cx={chart.endX}
        cy={chart.endY}
        r="3"
        fill="#34C77B"
        initial={reduced ? false : { scale: 0 }}
        animate={{ scale: visible ? 1 : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          delay: reduced ? 0 : delay + 0.85,
        }}
        style={{ transformOrigin: `${chart.endX}px ${chart.endY}px` }}
      />
    </svg>
  );
}

type StatCardProps = {
  stat: ShowcaseStat;
  showcase: ShowcaseContent;
  index: number;
  active: boolean;
  reduced: boolean;
  visible: boolean;
};

function StatCard({ stat, showcase, index, active, reduced, visible }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div
      className="absolute h-[126px] w-[144px] rounded-[8px] border border-[#E4E7EC] bg-[#F7F8FA]"
      style={{
        left: 8 + index * 152,
        top: 29,
        boxShadow: active ? "0 0 0 2px #673DE6" : undefined,
      }}
    >
      <div className="absolute left-[10px] top-[8px]">
        <Icon className="size-[11px] text-[#1B1F27]" strokeWidth={1.9} />
      </div>

      <p className="absolute left-[10px] top-[22px] text-[8.5px] leading-none text-[#6B7480]">
        {stat.label}
      </p>

      <p className="absolute left-[10px] top-[34px] text-[11px] font-bold leading-none text-[#1B1F27]">
        {stat.value}
      </p>

      <span className="absolute left-[74px] top-[32px] rounded-full bg-[#E3F5EA] px-[6px] py-[3px] text-[7px] font-medium leading-none text-[#1E8A4C]">
        {stat.chip}
      </span>

      <p className="absolute left-[10px] top-[50px] text-[7px] leading-none text-[#6B7480]">
        {stat.muted}
      </p>

      <div className="absolute left-[8px] top-[60px]">
        <Chart
          showcase={showcase}
          id={stat.id}
          delay={0.55 + index * 0.15}
          reduced={reduced}
          visible={visible}
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

  return (
    <div
      className="absolute"
      style={{ left: 128, top: 25, width: WINDOW_W, height: WINDOW_H, zIndex: 10 }}
    >
      <m.div
        style={reduced ? undefined : { x, y }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{
          duration: reduced ? 0.3 : 0.7,
          delay: reduced ? 0 : 0.15,
          ease: "easeOut",
        }}
      >
        <m.div
          style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY }}
          className="h-full w-full"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.55)] bg-[#F2F4F7] shadow-[0_24px_60px_rgba(8,16,30,0.38),0_40px_80px_-20px_rgba(150,185,220,0.35)]"
          >
            {/* Header */}
            <div
              aria-hidden="true"
              className="relative flex items-center border-b border-[#E4E7EC] bg-[#F2F4F7]"
              style={{ height: HEADER_H }}
            >
              <Image
                src="/oryntal-logo.png"
                alt=""
                width={512}
                height={505}
                className="ml-3 h-[11px] w-auto"
              />
              <span className="mx-2 h-[11px] w-px bg-[#D8DCE2]" />
              <span className="text-[8.5px] leading-none text-[#6B7480]">
                {copy.product}
              </span>

              <span
                className="absolute grid h-5 w-[58px] place-items-center rounded-full bg-[linear-gradient(90deg,#7B4DFF,#E24BC8)] p-[1.2px]"
                style={{ left: 549, top: 7 }}
              >
                <span className="flex h-full w-full items-center justify-center gap-[3px] rounded-full bg-[#F2F4F7]">
                  <Sparkles className="size-[9px] text-[#7B4DFF]" strokeWidth={2} />
                  <span className="text-[7px] font-medium leading-none text-[#3F2A9E]">
                    {copy.ask}
                  </span>
                </span>
              </span>

              <span
                className="absolute"
                style={{ left: 622, top: 11 }}
              >
                <CircleUser className="size-3 text-[#6B7480]" strokeWidth={1.8} />
              </span>
            </div>

            {/* Sidebar */}
            <div
              role="tablist"
              aria-label="What's included"
              aria-orientation="vertical"
              className="absolute bg-[#F7F8FA]"
              style={{ left: 0, top: HEADER_H, width: SIDEBAR_W, height: WINDOW_H - HEADER_H }}
            >
              {navGroups.map((group) => (
                <div key={group.rows[0].id} role="presentation">
                  {group.rows.map((row) => {
                    const Icon = row.icon;
                    const Trailing = row.trailingIcon;
                    const matched = row.includedId === activeId;
                    const isTab = Boolean(row.includedId);

                    if (!isTab) {
                      return (
                        <div
                          key={row.id}
                          role="presentation"
                          className="absolute h-5 w-[109px] rounded-[6px]"
                          style={{ left: 8, top: row.top - HEADER_H }}
                        >
                          {activeId === null ? (
                            <span className="absolute inset-0 rounded-[6px] bg-[#ECEEF1]" />
                          ) : null}
                          <span className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Icon className="size-[11px] text-[#1B1F27]" strokeWidth={1.9} />
                          </span>
                          <span className="absolute left-[23px] top-1/2 -translate-y-1/2 text-[8.5px] font-medium leading-none text-[#1B1F27]">
                            {row.label}
                          </span>
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
                        className={cn(
                          "absolute h-5 w-[109px] rounded-[6px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673DE6]",
                          matched ? "font-medium text-[#1B1F27]" : "text-[#5A636E]",
                        )}
                        style={{ left: 8, top: row.top - HEADER_H }}
                      >
                        {matched ? (
                          row.secondary ? (
                            <span className="absolute inset-0 rounded-[6px] bg-[#ECEEF1]" />
                          ) : (
                            <m.span
                              layoutId="dfShowcaseNav"
                              className="absolute inset-0 rounded-[6px] bg-[#ECEEF1]"
                              transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            />
                          )
                        ) : null}
                        <span className="absolute left-2 top-1/2 -translate-y-1/2">
                          <Icon className="size-[11px] text-[#1B1F27]" strokeWidth={1.9} />
                        </span>
                        <span className="absolute left-[23px] top-1/2 -translate-y-1/2 text-[8.5px] leading-none">
                          {row.label}
                        </span>
                        {Trailing ? (
                          <span className="absolute right-[6px] top-1/2 -translate-y-1/2">
                            <Trailing className="size-[9px] text-[#6B7480]" strokeWidth={2} />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Main */}
            <div
              aria-hidden="true"
              className="absolute"
              style={{ left: SIDEBAR_W, top: HEADER_H, width: WINDOW_W - SIDEBAR_W, height: WINDOW_H - HEADER_H }}
            >
              <p className="absolute left-0 right-0 top-[26px] text-center text-[13px] font-bold leading-none text-[#1B1F27]">
                {copy.welcome}
              </p>
              <p className="absolute left-0 right-0 top-[40px] text-center text-[8.5px] leading-none text-[#6B7480]">
                {copy.welcomeSub}
              </p>

              {/* Website box */}
              <div
                className="absolute flex items-center gap-[5px] rounded-[8px] border border-[#E4E7EC] bg-white px-[8px]"
                style={{ left: 518 - SIDEBAR_W, top: 14, width: 98, height: 34 }}
              >
                <span className="size-[10px] shrink-0 rounded-full bg-[#E3F5EA]" />
                <span className="truncate text-[7.5px] leading-none text-[#1B1F27]">
                  {copy.siteUrl}
                </span>
              </div>

              {/* Setup overview */}
              <div
                className="absolute rounded-[10px] border border-[#E4E7EC] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.04)]"
                style={{ left: 151 - SIDEBAR_W, top: 97 - HEADER_H, width: 465, height: 188 }}
              >
                <p className="absolute left-[16px] top-[13px] text-[10px] font-bold leading-none text-[#1B1F27]">
                  {copy.setupOverview}
                </p>
                <span className="absolute right-[16px] top-[13px] flex items-center gap-[3px] text-[8px] leading-none text-[#673DE6]">
                  {copy.viewDetails}
                  <ArrowRight className="size-[8px]" strokeWidth={2.2} />
                </span>

                {stats.map((stat, index) => (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    showcase={showcase}
                    index={index}
                    active={activeId !== null && stat.id === activeId}
                    reduced={reduced}
                    visible={visible}
                  />
                ))}

                <p className="absolute left-[10px] top-[163px] text-[6.5px] leading-none text-[#8A93A0]">
                  {copy.cardCaption}
                </p>
              </div>

              {/* Recent enquiries */}
              <div
                className="absolute rounded-[10px] border border-[#E4E7EC] bg-white"
                style={{ left: 151 - SIDEBAR_W, top: 299 - HEADER_H, width: 465, height: 140 }}
              >
                <p className="absolute left-[16px] top-[15px] text-[10px] font-bold leading-none text-[#1B1F27]">
                  {copy.enquiries}
                </p>

                {tableColumns.map((column) => (
                  <span
                    key={column.label}
                    className="absolute flex items-center gap-[3px] text-[8px] leading-none text-[#6B7480]"
                    style={{ left: column.x, top: 41 }}
                  >
                    {column.label}
                    <ChevronsUpDown className="size-[6px]" strokeWidth={2.2} />
                  </span>
                ))}

                <span
                  className="absolute left-0 right-0 top-[54px] h-px bg-[#E4E7EC]"
                />
              </div>
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
