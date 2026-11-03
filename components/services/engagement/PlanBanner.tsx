"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, ShieldCheck, Search, Hammer, Rocket, Circle, Loader } from "lucide-react";
import { engagementPlan } from "@/lib/content/services/engagement";

const ICONS = {
  Search,
  Hammer,
  Rocket,
} as const;

const ICON_RAIL_ICONS = [Search, Hammer, Rocket, Check, Circle, Loader] as const;

function WorkspaceWindow() {
  const reduced = useReducedMotion() ?? false;
  const windowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(windowRef, { amount: 0.3, once: false });
  const [activeMonth, setActiveMonth] = useState(0);
  const [done, setDone] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced) {
      setActiveMonth(0);
      setDone(5);
      return;
    }

    if (!inView) return;
    if (paused) return;

    const interval = setInterval(() => {
      setDone((prev) => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [inView, paused, reduced]);

  useEffect(() => {
    if (reduced) return;

    if (done === 5) {
      const timeout = setTimeout(() => {
        setActiveMonth((prev) => (prev + 1) % 3);
        setDone(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [done, reduced]);

  const activeMonthData = engagementPlan.months[activeMonth];
  const Icon = ICONS[activeMonthData.icon];

  return (
    <div
      ref={windowRef}
      role="img"
      aria-label="Illustrative engagement workspace showing the three-month plan and its tasks"
      className="relative min-w-0 lg:self-end mt-4 lg:mt-14 lg:-mr-24"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        className="rounded-tl-[22px] rounded-tr-[22px] border border-[#6D4FE6]"
        style={{
          background: "#0C0C11",
          borderRight: "none",
          borderBottom: "none",
          boxShadow: "0 0 70px rgba(109,79,230,0.38), 0 30px 80px rgba(0,0,0,0.5)",
          height: "470px",
        }}
      >
        <div className="flex h-full">
          <div
            className="flex flex-col items-center gap-3 py-3"
            style={{ width: "38px", background: "#101016", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {ICON_RAIL_ICONS.map((IconComp, idx) => {
              const isActive = idx === activeMonth;
              return (
                <div
                  key={idx}
                  className="grid h-[22px] w-[22px] place-items-center rounded-md"
                  style={{
                    background: isActive ? "#2A2150" : "transparent",
                  }}
                >
                  <IconComp
                    className="size-[13px]"
                    style={{ color: isActive ? "#CFC4FF" : "rgba(255,255,255,0.4)" }}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>

          <div
            className="p-3"
            style={{ width: "34%", minWidth: "150px", background: "#0F0F15", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/45">PLAN</p>
            <div
              className="mt-2 flex items-center gap-1.5 rounded-md bg-[#17171F] px-2 py-1.5"
              style={{ height: "28px" }}
            >
              <Search className="size-[10px] text-white/35" aria-hidden="true" />
              <span className="text-[9px] text-white/35">Filter tasks...</span>
            </div>

            <div className="mt-3 space-y-1.5">
              {engagementPlan.months.map((month, idx) => {
                const isActive = idx === activeMonth;
                const MonthIcon = ICONS[month.icon];
                return (
                  <button
                    key={month.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveMonth(idx);
                      setDone(3);
                      setPaused(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[10.5px] transition-colors"
                    style={{
                      background: isActive ? "#2A2150" : "transparent",
                      border: isActive ? "1px solid #7B65F0" : "none",
                      color: isActive ? "white" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    <MonthIcon className="size-[13px]" aria-hidden="true" />
                    <div className="flex flex-1 flex-col items-start">
                      <span className="font-semibold">{month.label}</span>
                      <span className="text-[9.5px] text-white/55 truncate">{month.title}</span>
                    </div>
                    {isActive && (
                      <div
                        className="h-[7px] w-[7px] rounded-full"
                        style={{ background: "#FFB547" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-[9px] text-white/35">Illustrative workspace</p>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold text-white">{activeMonthData.label}</p>
                <p className="text-[10px] text-white/70">{activeMonthData.title}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-[#17171F] px-2.5 py-1">
                <div
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ background: "#34C77B", animation: reduced ? "none" : "pulse 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                <span className="text-[9px] text-white/70">In progress</span>
              </div>
            </div>

            <div className="mt-3 h-[3px] w-full rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8B7CFF, #B9A8FF)",
                  width: `${(done / 5) * 100}%`,
                }}
                initial={{ width: reduced ? "100%" : "0%" }}
                animate={{ width: `${(done / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mt-3 space-y-2">
              {activeMonthData.tasks.map((task, idx) => {
                const isChecked = idx < done;
                const isProgress = idx === done && !reduced;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[10.5px] leading-snug text-white/85"
                    style={{
                      background: "#121219",
                      borderColor: isProgress ? "#7B65F0" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full"
                      style={{
                        border: isChecked ? "none" : "1px solid rgba(255,255,255,0.25)",
                        background: isChecked ? "#34C77B" : "transparent",
                      }}
                    >
                      {isChecked && <Check className="size-[9px] text-white" aria-hidden="true" />}
                      {isProgress && <Loader className="size-[9px] text-[#7B65F0] animate-spin" aria-hidden="true" />}
                    </div>
                    <span>{task}</span>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2"
              style={{ background: "#12121A", borderColor: "rgba(255,255,255,0.08)", height: "32px" }}
            >
              <span className="flex-1 text-[10px] text-white/35">Add a note for your team...</span>
              <div
                className="rounded-full px-2 py-0.5 text-[9px]"
                style={{ background: "#6B43E8", color: "white" }}
              >
                Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanBanner() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });

  return (
    <section
      ref={sectionRef}
      id="plan"
      aria-labelledby="eng-plan-title"
      className="relative scroll-mt-24 text-white"
      style={{ backgroundColor: "#0A0A0C", paddingTop: "100px" }}
    >
      <style jsx>{`
        @media (max-width: 1023px) {
          section {
            padding-top: 80px !important;
          }
        }
      `}</style>

      <div
        className="absolute inset-x-0 top-0 h-[140px]"
        style={{
          background: "linear-gradient(180deg, rgba(124,88,240,0.55) 0%, rgba(10,10,12,0) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-14">
        <div
          className="relative isolate overflow-hidden rounded-[34px]"
          style={{
            minHeight: "600px",
            background: "radial-gradient(70% 90% at 0% 0%, rgba(118,76,236,1) 0%, rgba(118,76,236,0) 70%), radial-gradient(60% 70% at 100% 100%, rgba(18,14,50,1) 0%, rgba(18,14,50,0) 70%), linear-gradient(135deg, #5B37CF 0%, #3A2394 35%, #1A1048 70%, #0E0A2A 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
          }}
        >
          <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:pl-[60px] lg:pr-0 lg:py-14">
            <div className="min-w-0 relative z-10">
              <div
                className="inline-flex h-[86px] w-[86px] items-center justify-center rounded-[20px]"
                style={{
                  background: "#1B1233",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
                }}
              >
                <Image src="/logo.png" alt="ORYNTAL" width={56} height={56} className="h-14 w-14 object-contain" />
              </div>

              <motion.h2
                id="eng-plan-title"
                initial={reduced ? false : { y: 16, opacity: 0.6 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
                transition={{ duration: 0.5 }}
                className="mt-10 max-w-xl text-balance text-4xl font-normal tracking-[-0.03em] leading-[1.1] text-white md:text-5xl lg:text-[52px]"
              >
                {engagementPlan.heading}
              </motion.h2>

              <motion.p
                initial={reduced ? false : { y: 16, opacity: 0.6 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.07 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-[19px]"
              >
                {engagementPlan.sub}
              </motion.p>

              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0.6 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <Link
                  href={engagementPlan.cta.href}
                  className="inline-flex h-[64px] items-center justify-center rounded-xl bg-[#6B43E8] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5A33D4] hover:shadow-[0_12px_32px_rgba(107,67,232,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5B37CF]"
                >
                  {engagementPlan.cta.label}
                </Link>
                <a
                  href={engagementPlan.link.href}
                  className="inline-flex items-center gap-1 text-white underline underline-offset-4 transition-transform duration-200 hover:translate-x-0.5"
                >
                  {engagementPlan.link.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </motion.div>

              <motion.div
                initial={reduced ? false : { y: 16, opacity: 0.6 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.21 }}
                className="mt-6 flex items-center gap-2 text-sm text-white/80"
              >
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span>{engagementPlan.trust}</span>
              </motion.div>

              <motion.p
                initial={reduced ? false : { y: 16, opacity: 0.6 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-2 max-w-md text-xs leading-relaxed text-white/55"
              >
                {engagementPlan.note}
              </motion.p>
            </div>

            <WorkspaceWindow />
          </div>
        </div>

        <p className="sr-only">{engagementPlan.srSummary}</p>

        <ol aria-label="Three-month engagement tasks" className="sr-only">
          {engagementPlan.months.map((month) => (
            <li key={month.id}>
              <p>{month.label}: {month.title}</p>
              <ul>
                {month.tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
