"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Users,
  Workflow,
  Gauge,
  Target,
  Hammer,
  Globe,
  Plug,
  LayoutDashboard,
  ClipboardCheck,
  Puzzle,
  FlaskConical,
  Bug,
  SlidersHorizontal,
  Rocket,
  Check,
  Copy,
  CheckCheck,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Boxes,
} from "lucide-react";
import { engagementMonths } from "@/lib/content/services/engagement";

const ICONS: Record<string, LucideIcon> = {
  Search,
  Users,
  Workflow,
  Gauge,
  Target,
  Hammer,
  Globe,
  Plug,
  LayoutDashboard,
  ClipboardCheck,
  Puzzle,
  FlaskConical,
  Bug,
  SlidersHorizontal,
  Rocket,
  Boxes,
};

export default function MonthsSelector() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: false });

  const [activeMonthId, setActiveMonthId] = useState("m1");
  const [activeId, setActiveId] = useState("m1-model");
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [monthAnnouncement, setMonthAnnouncement] = useState("");

  const allTasks = useMemo(() => {
    const tasks: Array<{ task: typeof engagementMonths.months[0]["tasks"][0]; monthLabel: string; monthTitle: string; monthNumber: number; monthId: string }> = [];
    engagementMonths.months.forEach((month, monthIdx) => {
      month.tasks.forEach((task) => {
        tasks.push({ task, monthLabel: month.label, monthTitle: month.title, monthNumber: monthIdx + 1, monthId: month.id });
      });
    });
    return tasks;
  }, []);

  const activeMonth = useMemo(() => {
    return engagementMonths.months.find((m) => m.id === activeMonthId);
  }, [activeMonthId]);

  const activeTask = useMemo(() => {
    return activeMonth?.tasks.find((t) => t.id === activeId);
  }, [activeId, activeMonth]);

  const activeMonthData = useMemo(() => {
    return allTasks.find((t) => t.task.id === activeId);
  }, [activeId, allTasks]);

  const focusedTaskIndex = useMemo(() => {
    return activeMonth?.tasks.findIndex((t) => t.id === activeId) ?? 0;
  }, [activeId, activeMonth]);

  const focusedMonthIndex = useMemo(() => {
    return engagementMonths.months.findIndex((m) => m.id === activeMonthId);
  }, [activeMonthId]);

  const handleCopy = useCallback(async () => {
    const text = `ORYNTAL: Three-Month Engagement\nMonth: ${activeMonthData?.monthLabel} (${activeMonthData?.monthTitle})\nTask: ${activeTask?.label}\nWhat I want to achieve: `;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [activeMonthData, activeTask]);

  const handleMonthSelect = useCallback((monthId: string) => {
    const month = engagementMonths.months.find((m) => m.id === monthId);
    if (month && month.tasks.length > 0) {
      setActiveMonthId(monthId);
      setActiveId(month.tasks[0].id);
      setPaused(true);
      setMonthAnnouncement(`Showing Month ${engagementMonths.months.findIndex((m) => m.id === monthId) + 1}: ${month.title}`);
    }
  }, []);

  const handleTaskSelect = useCallback((taskId: string) => {
    setActiveId(taskId);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (reduced) {
      const fullCommand = `brief --month ${activeMonthData?.monthNumber} --task ${activeTask?.briefKey}`;
      setTypedText(fullCommand);
      setShowComments(true);
      return;
    }

    setTypedText("");
    setShowComments(false);

    const fullCommand = `brief --month ${activeMonthData?.monthNumber} --task ${activeTask?.briefKey}`;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < fullCommand.length) {
        setTypedText(fullCommand.slice(0, charIndex + 1));
        charIndex += 1;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowComments(true), 100);
      }
    }, 22);

    return () => clearInterval(typeInterval);
  }, [activeId, activeMonthData, activeTask, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    if (paused) return;

    const interval = setInterval(() => {
      setActiveId((prevTaskId) => {
        const currentIndex = allTasks.findIndex((t) => t.task.id === prevTaskId);
        const nextIndex = (currentIndex + 1) % allTasks.length;
        const nextTask = allTasks[nextIndex];

        if (nextTask.monthId !== activeMonthId) {
          setActiveMonthId(nextTask.monthId);
          setMonthAnnouncement(`Showing Month ${nextTask.monthNumber}: ${nextTask.monthTitle}`);
        }

        return nextTask.task.id;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [inView, paused, allTasks, activeMonthId, reduced]);

  const handleMonthKeyDown = useCallback((e: React.KeyboardEvent) => {
    let nextIndex = focusedMonthIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (focusedMonthIndex + 1) % engagementMonths.months.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (focusedMonthIndex - 1 + engagementMonths.months.length) % engagementMonths.months.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = engagementMonths.months.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleMonthSelect(engagementMonths.months[nextIndex].id);
  }, [focusedMonthIndex, handleMonthSelect]);

  const handleTaskKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!activeMonth) return;
    let nextIndex = focusedTaskIndex;
    if (e.key === "ArrowDown") {
      nextIndex = (focusedTaskIndex + 1) % activeMonth.tasks.length;
    } else if (e.key === "ArrowUp") {
      nextIndex = (focusedTaskIndex - 1 + activeMonth.tasks.length) % activeMonth.tasks.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = activeMonth.tasks.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleTaskSelect(activeMonth.tasks[nextIndex].id);
  }, [activeMonth, focusedTaskIndex, handleTaskSelect]);

  return (
    <section
      ref={sectionRef}
      id="months"
      aria-labelledby="eng-months-title"
      className="relative scroll-mt-24 text-white py-20 md:py-28"
      style={{
        backgroundColor: "#0B0B0D",
        backgroundImage: "radial-gradient(45% 25% at 50% 0%, rgba(91,52,214,0.14), rgba(91,52,214,0) 70%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2.5">
          <div className="h-[9px] w-[9px] bg-[#8B7CFF]" aria-hidden="true" />
          <p className="text-[13px] font-medium uppercase tracking-[0.2em]" style={{ color: "#8B7CFF" }}>
            {engagementMonths.eyebrow}
          </p>
        </div>

        <motion.h2
          id="eng-months-title"
          initial={reduced ? false : { y: 16, opacity: 0.6 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-balance text-4xl font-semibold tracking-[-0.025em] leading-[1.08] md:text-5xl lg:text-[52px]"
        >
          <span className="block text-white">{engagementMonths.headingLine1}</span>
          <span className="block text-white/70">{engagementMonths.headingLine2}</span>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { y: 16, opacity: 0.6 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 max-w-2xl mx-auto text-base text-white/60 md:text-lg"
        >
          {engagementMonths.sub}
        </motion.p>

        <div
          ref={gridRef}
          className="mt-12 grid gap-7 items-start lg:grid-cols-[410px_1fr] md:mt-14"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="lg:min-h-[420px]">
            <div
              role="tablist"
              aria-label="Engagement months"
              className="grid grid-cols-3 gap-2"
              onKeyDown={handleMonthKeyDown}
            >
              {engagementMonths.months.map((month, monthIdx) => {
                const isActive = month.id === activeMonthId;
                return (
                  <button
                    key={month.id}
                    role="tab"
                    id={`eng-month-tab-${month.id}`}
                    aria-selected={isActive}
                    aria-controls="eng-month-list"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleMonthSelect(month.id)}
                    className="relative h-[64px] px-3 flex flex-col items-center justify-center text-center rounded-[14px] transition-all duration-200"
                    style={{
                      background: isActive ? "#232327" : "#17171A",
                      border: isActive ? "1.5px solid #8B7CFF" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="grid h-[22px] w-[22px] place-items-center rounded-full text-[11px] font-semibold"
                        style={{ background: "rgba(139,124,255,0.18)", border: "1px solid rgba(139,124,255,0.4)", color: "#CFC4FF" }}
                      >
                        {monthIdx + 1}
                      </div>
                      <span
                        className="text-[13px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                      >
                        {month.label}
                      </span>
                    </div>
                    {isActive && !reduced && (
                      <motion.div
                        layoutId="engMonthActive"
                        className="absolute inset-0 rounded-[14px]"
                        style={{ pointerEvents: "none", boxShadow: "0 0 0 1px rgba(139,124,255,0.25), 0 8px 24px rgba(99,61,230,0.18)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeMonth && (
                <motion.div
                  key={activeMonthId}
                  initial={reduced ? false : { opacity: 0.6, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0.6, y: -6 }}
                  transition={{ duration: reduced ? 0.15 : 0.2 }}
                  className="mt-4 px-1"
                >
                  <p className="text-[15px] font-medium text-white/85">{activeMonth.title}</p>
                  <p className="mt-1 text-[12.5px] text-white/50">{activeMonth.tasks.length} steps</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeMonth && (
                <motion.div
                  key={activeMonthId}
                  initial={reduced ? false : { opacity: 0.6, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0.6, x: -8 }}
                  transition={{ duration: reduced ? 0.15 : 0.24 }}
                >
                  <div
                    id="eng-month-list"
                    role="tablist"
                    aria-orientation="vertical"
                    aria-label="Tasks in the selected month"
                    className="mt-3 flex flex-col gap-2.5"
                    onKeyDown={handleTaskKeyDown}
                  >
                    {activeMonth.tasks.map((task, taskIdx) => {
                      const isActive = task.id === activeId;
                      const Icon = ICONS[task.icon];
                      return (
                        <button
                          key={task.id}
                          role="tab"
                          id={`tab-${task.id}`}
                          aria-selected={isActive}
                          aria-controls="eng-panel"
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleTaskSelect(task.id)}
                          className="relative h-[58px] w-full rounded-[14px] px-4 flex items-center gap-3.5 text-left text-[16px] font-medium transition-all duration-200"
                          style={{
                            background: isActive ? "#232327" : "#17171A",
                            border: isActive ? "1.5px solid #8B7CFF" : "1px solid rgba(255,255,255,0.08)",
                            color: isActive ? "white" : "rgba(255,255,255,0.9)",
                            boxShadow: isActive ? "0 0 0 1px rgba(139,124,255,0.25), 0 8px 24px rgba(99,61,230,0.18)" : "none",
                          }}
                        >
                          <Icon className="size-[19px]" style={{ color: isActive ? "#8B7CFF" : "rgba(255,255,255,0.65)" }} aria-hidden="true" />
                          <span className="flex-1 truncate">{task.label}</span>
                          <ArrowRight className="size-[17px]" style={{ color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }} aria-hidden="true" />
                          {isActive && !reduced && (
                            <motion.div
                              layoutId="engActive"
                              className="absolute inset-0 rounded-[14px]"
                              style={{ pointerEvents: "none" }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            id="eng-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            className="rounded-[28px] border border-white/[0.09] bg-[#111113] p-6 md:p-9 min-h-[560px]"
          >
            <AnimatePresence mode="wait">
              {activeTask && activeMonthData && (
                <motion.div
                  key={activeId}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduced ? 0.15 : 0.26 }}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-2xl"
                      style={{ background: "#1E1E22", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {(() => {
                        const Icon = ICONS[activeTask.icon];
                        return <Icon className="size-[30px]" style={{ color: "#8B7CFF" }} aria-hidden="true" />;
                      })()}
                    </div>
                    <div>
                      <div
                        className="inline-block rounded-full px-3 py-1 text-[12px] font-semibold"
                        style={{ background: "rgba(139,124,255,0.15)", color: "#CFC4FF" }}
                      >
                        {activeMonthData.monthLabel}
                      </div>
                      <h3 className="mt-2 text-[24px] font-semibold text-white leading-tight md:text-[28px]">
                        {activeTask.title}
                      </h3>
                      <p className="text-[16px] text-white/65">{activeTask.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-[17px] text-white/75 leading-relaxed max-w-2xl">
                    {activeTask.description}
                  </p>

                  <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {activeTask.points.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={reduced ? false : { x: -8, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: reduced ? 0 : idx * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full"
                          style={{ background: "rgba(139,124,255,0.15)" }}
                        >
                          <Check className="size-[12px]" style={{ color: "#8B7CFF" }} aria-hidden="true" />
                        </div>
                        <span className="text-[16px] text-white/85 leading-snug">{point}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Link
                    href={`/contact?interest=three-month-engagement&topic=${activeTask.briefKey}`}
                    className="mt-8 flex h-[64px] w-full items-center justify-center gap-2 rounded-2xl text-[19px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(99,61,230,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
                    style={{
                      background: "linear-gradient(180deg, #6F45EE, #5B34D6)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    {engagementMonths.ctaLabel}
                    <ArrowUpRight className="size-[20px]" aria-hidden="true" />
                  </Link>

                  <div className="mt-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[14px] text-white/45">{engagementMonths.divider}</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div
                    className="mt-5 rounded-2xl border border-white/10 px-5 py-4 flex items-start justify-between gap-4 font-mono text-[14px]"
                    style={{
                      background: "#18181B",
                      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
                    }}
                  >
                    <div className="flex-1 overflow-x-auto">
                      <div className="flex items-center gap-2">
                        <span style={{ color: "#8B7CFF" }}>$</span>
                        <span className="relative">
                          {typedText}
                          {!reduced && typedText.length < `brief --month ${activeMonthData.monthNumber} --task ${activeTask.briefKey}`.length && (
                            <span
                              className="absolute -right-1 top-0 h-4 w-0.5 bg-white/50 animate-pulse"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </div>
                      <div className="sr-only">{`brief --month ${activeMonthData.monthNumber} --task ${activeTask.briefKey}`}</div>
                      {showComments && (
                        <div className="mt-2 space-y-1">
                          <motion.div
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-[12.5px] text-white/50"
                          >
                            # month: {activeMonthData.monthLabel} ({activeMonthData.monthTitle})
                          </motion.div>
                          <motion.div
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.12 }}
                            className="text-[12.5px] text-white/50"
                          >
                            # task: {activeTask.label}
                          </motion.div>
                          <motion.div
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.24 }}
                            className="text-[12.5px] text-white/50"
                          >
                            # scope: agreed in your proposal
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors"
                      aria-label={copied ? engagementMonths.copiedLabel : engagementMonths.copyLabel}
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="size-[18px]" style={{ color: "#34C77B" }} aria-hidden="true" />
                          <span style={{ color: "#34C77B" }}>{engagementMonths.copiedLabel}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-[18px]" aria-hidden="true" />
                          <span>{engagementMonths.copyLabel}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-[13px] text-white/45">{engagementMonths.briefHelper}</p>
                  <p className="mt-4 text-[13px] text-white/50 max-w-2xl">{activeTask.note}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-white/75 max-w-xl mx-auto">{engagementMonths.closing.text}</p>
          <Link
            href={engagementMonths.closing.cta.href}
            className="mt-6 inline-flex h-[64px] items-center justify-center rounded-xl bg-white px-9 py-4 text-lg font-medium text-[#1D1E20] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
          >
            {engagementMonths.closing.cta.label}
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
            <ShieldCheck className="size-4" aria-hidden="true" />
            <span>{engagementMonths.closing.trust}</span>
          </div>
          <p className="mt-6 text-xs text-white/40 max-w-2xl mx-auto">{engagementMonths.footnote}</p>
        </div>

        <p className="sr-only">{engagementMonths.srSummary}</p>

        <ol aria-label="Three-month engagement tasks" className="sr-only">
          {engagementMonths.months.map((month) => (
            <li key={month.id}>
              <p>{month.label}: {month.title}</p>
              <ul>
                {month.tasks.map((task) => (
                  <li key={task.id}>{task.label}: {task.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div aria-live="polite" className="sr-only">{copied ? "Copied to clipboard" : ""}</div>
        <div aria-live="polite" className="sr-only">{monthAnnouncement}</div>
      </div>
    </section>
  );
}
