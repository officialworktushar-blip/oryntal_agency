"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";

const PROPOSAL_LINK = "#request";
const TYPE_INTERVAL_MS = 35;
const TYPE_SETTLE_MS = 120;
const THINKING_MS = 800;
const BUILD_STEP_MS = 450;
const BUILD_SETTLE_MS = 220;
const HOLD_MS = 2000;
const EXIT_MS = 300;

type Phase = "typing" | "thinking" | "building" | "done" | "exiting";
type FlowIcon = ComponentType<{ className?: string }>;

type ScopeItem = {
  text: string;
  tag: string;
};

type Scene = {
  rowLabel: string;
  businessType: string;
  requirement: string;
  scopeItems: ScopeItem[];
  icons: FlowIcon[];
};

function RefreshIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M20 11a8 8 0 0 0-14.9-3.9L3 9" />
      <path d="M3 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.9 3.9L21 15" />
      <path d="M21 20v-5h-5" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CursorArrow({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#ffffff"
        stroke="#050507"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WindowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9h17M7 6.75h.01M10 6.75h.01" />
    </svg>
  );
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 6.5h11v9.5H3zM14 9.5h4l3 3V16h-7z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17.5" cy="18" r="1.7" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.5 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.2-.7L4 20l1.4-4.2a7.5 7.5 0 1 1 15.1-4.3Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 9a6 6 0 0 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
      <path d="M10 19h4" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M7 15v-3M12 15V8M17 15v-5" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
      <path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 0 1-7-7L7 11" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </svg>
  );
}

function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 4h10M7 8h10M16 4c0 4-2.5 6-6 6H7l7 10" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="0"
        className="sb-check-circle"
      />
      <path
        d="m8 12.5 2.5 2.5L16 9"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="0"
        className="sb-check-mark"
      />
    </svg>
  );
}

const scenes: Scene[] = [
  {
    rowLabel: "Online store for a jewellery business",
    businessType: "Jewellery store",
    requirement:
      "I want to sell my jewellery online, take payments, and send order updates on WhatsApp.",
    scopeItems: [
      { text: "Website with product catalogue", tag: "Build" },
      { text: "Online payments", tag: "Connect" },
      { text: "Delivery partner connection", tag: "Connect" },
      { text: "WhatsApp order updates", tag: "Automate" },
    ],
    icons: [WindowIcon, CardIcon, TruckIcon, ChatIcon],
  },
  {
    rowLabel: "Bookings and replies for a clinic",
    businessType: "Clinic",
    requirement:
      "Patients message us all day. We need bookings, reminders and quick replies.",
    scopeItems: [
      { text: "Appointment booking page", tag: "Build" },
      { text: "Automatic reminders", tag: "Automate" },
      {
        text: "WhatsApp replies from clinic information",
        tag: "Automate",
      },
      { text: "Simple dashboard for the team", tag: "Build" },
    ],
    icons: [CalendarIcon, BellIcon, ChatIcon, ChartIcon],
  },
  {
    rowLabel: "Orders and sourcing for a wholesale business",
    businessType: "Wholesale business",
    requirement:
      "We need to find suppliers, track orders and chase payments without spreadsheets.",
    scopeItems: [
      { text: "Supplier sourcing support", tag: "Connect" },
      { text: "Order tracking dashboard", tag: "Build" },
      { text: "Payment reminders", tag: "Automate" },
      { text: "Monthly report", tag: "Automate" },
    ],
    icons: [LinkIcon, BoxIcon, RupeeIcon, DocumentIcon],
  },
];

function FlowNode({
  active,
  icon: Icon,
}: {
  active: boolean;
  icon: FlowIcon;
}) {
  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:size-14 ${
        active
          ? "border-[#7c5ce8] bg-[#21154a] text-[#b9a8ff] shadow-[0_0_22px_rgba(124,92,232,0.28)]"
          : "border-white/10 bg-[#151521] text-white/30"
      }`}
    >
      <Icon className="size-5 sm:size-6" />
    </div>
  );
}

function FlowConnector({ active }: { active: boolean }) {
  return (
    <div className="flex min-w-[8px] flex-1 items-center" aria-hidden="true">
      <span
        className={`h-px flex-1 ${active ? "bg-[#7c5ce8]/60" : "bg-white/10"}`}
      />
      <svg
        viewBox="0 0 6 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`h-2 w-1.5 ${active ? "text-[#7c5ce8]" : "text-white/25"}`}
      >
        <path d="m1 1 4 3-4 3" />
      </svg>
    </div>
  );
}

function ScopeRow({
  item,
  visible,
}: {
  item: ScopeItem;
  visible: boolean;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 sm:gap-2.5 sm:px-2.5 sm:py-2 ${
        visible ? "sb-scope-row bg-white/[0.03]" : "opacity-0"
      }`}
    >
      <span className="flex size-4 shrink-0 items-center justify-center text-[#8b7bff]">
        {visible ? <CheckCircleIcon className="size-4" /> : null}
      </span>
      <span className="min-w-0 flex-1 text-[12px] leading-snug text-white/80 sm:text-sm">
        {item.text}
      </span>
      <span className="shrink-0 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white/40 sm:text-[10px]">
        {item.tag}
      </span>
    </div>
  );
}

export default function ScopeBuilder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneIndexRef = useRef(0);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [runId, setRunId] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLength, setTypedLength] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [hoverCard, setHoverCard] = useState(false);
  const [hoverList, setHoverList] = useState(false);
  const previousReducedMotionRef = useRef(reducedMotion);

  const scene = scenes[sceneIndex];
  const paused = !inView || !tabVisible || hoverCard || hoverList;
  const isBuilding =
    phase === "typing" || phase === "thinking" || phase === "building";
  const isFinished = phase === "done" || phase === "exiting";
  const sceneDuration =
    scene.requirement.length * TYPE_INTERVAL_MS +
    TYPE_SETTLE_MS +
    THINKING_MS +
    BUILD_STEP_MS * 3 +
    BUILD_SETTLE_MS +
    HOLD_MS +
    EXIT_MS;

  useEffect(() => {
    sceneIndexRef.current = sceneIndex;
  }, [sceneIndex]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const wasReduced = previousReducedMotionRef.current;
    previousReducedMotionRef.current = reducedMotion;

    if (reducedMotion) {
      const current = scenes[sceneIndexRef.current];
      setPhase("done");
      setTypedLength(current.requirement.length);
      setRevealedCount(current.scopeItems.length);
      return;
    }

    setPhase("typing");
    setTypedLength(0);
    setRevealedCount(0);

    if (wasReduced) {
      setRunId((id) => id + 1);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState !== "hidden");

    update();
    document.addEventListener("visibilitychange", update);

    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || phase !== "typing") {
      return;
    }

    const requirement = scenes[sceneIndex].requirement;

    if (typedLength >= requirement.length) {
      const timeout = window.setTimeout(
        () => setPhase("thinking"),
        TYPE_SETTLE_MS,
      );
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setTypedLength((length) => Math.min(length + 1, requirement.length));
    }, TYPE_INTERVAL_MS);

    return () => window.clearTimeout(timeout);
  }, [phase, typedLength, paused, reducedMotion, sceneIndex]);

  useEffect(() => {
    if (reducedMotion || paused || phase !== "thinking") {
      return;
    }

    const timeout = window.setTimeout(() => setPhase("building"), THINKING_MS);
    return () => window.clearTimeout(timeout);
  }, [phase, paused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || paused || phase !== "building") {
      return;
    }

    const total = scenes[sceneIndex].scopeItems.length;

    if (revealedCount >= total) {
      const timeout = window.setTimeout(
        () => setPhase("done"),
        BUILD_SETTLE_MS,
      );
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(
      () => setRevealedCount((count) => Math.min(count + 1, total)),
      revealedCount === 0 ? 0 : BUILD_STEP_MS,
    );

    return () => window.clearTimeout(timeout);
  }, [phase, revealedCount, paused, reducedMotion, sceneIndex]);

  useEffect(() => {
    if (reducedMotion || paused || phase !== "done") {
      return;
    }

    const timeout = window.setTimeout(() => setPhase("exiting"), HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [phase, paused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || paused || phase !== "exiting") {
      return;
    }

    const timeout = window.setTimeout(() => {
      const next = (sceneIndexRef.current + 1) % scenes.length;

      sceneIndexRef.current = next;
      setSceneIndex(next);
      setRunId((id) => id + 1);
      setPhase("typing");
      setTypedLength(0);
      setRevealedCount(0);
    }, EXIT_MS);

    return () => window.clearTimeout(timeout);
  }, [phase, paused, reducedMotion]);

  function selectScene(index: number) {
    sceneIndexRef.current = index;
    setSceneIndex(index);
    setRunId((id) => id + 1);

    if (reducedMotion) {
      setPhase("done");
      setTypedLength(scenes[index].requirement.length);
      setRevealedCount(scenes[index].scopeItems.length);
      return;
    }

    setPhase("typing");
    setTypedLength(0);
    setRevealedCount(0);
  }

  return (
    <section
      ref={sectionRef}
      id="scope-builder"
      aria-labelledby="scope-builder-title"
      className="relative overflow-hidden border-t border-white/5 bg-[#050507] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-48 size-[520px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,31,143,0.35) 0%, rgba(59,31,143,0) 70%)",
        }}
      />

      <div className="cp-reveal relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHoverCard(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setHoverCard(false);
          }}
          className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 p-0 shadow-[0_30px_100px_rgba(30,16,82,0.4)] min-h-[520px] lg:min-h-[620px]"
          style={{
            background:
              "linear-gradient(to top right, #2a1a6e 0%, #120a2e 68%, #120a2e 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            }}
          />

          <svg
            viewBox="0 0 640 620"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient
                id="scope-frame-fill"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#6a3fe0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#6a3fe0" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <path
              d="M0 548H132V466H262V384H392V302H522V220H640V620H0Z"
              fill="url(#scope-frame-fill)"
            />
            <polyline
              points="0,548 132,548 132,466 262,466 262,384 392,384 392,302 522,302 522,220 640,220"
              fill="none"
              stroke="#6a3fe0"
              strokeWidth="1.5"
            />
          </svg>

          <div className="absolute left-5 top-5 z-20 lg:left-7 lg:top-7">
            <div className="relative">
              <div className="flex size-20 items-center justify-center rounded-2xl border border-[#8b7bff] bg-[#5b3de0] text-white shadow-[0_16px_50px_rgba(91,61,224,0.45)] lg:size-[100px]">
                <RefreshIcon
                  className={`size-10 lg:size-11 ${
                    !reducedMotion && isBuilding ? "sb-spin" : ""
                  }`}
                  style={{
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>
              <CursorArrow
                className="sb-float absolute -bottom-7 -right-1 h-auto w-7 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] lg:w-8"
                style={{
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          </div>

          <div className="relative z-10 mx-4 mb-4 mt-28 rounded-2xl border border-white/10 bg-[#0b0f1c] p-4 sm:p-5 lg:mx-0 lg:mb-3 lg:ml-[128px] lg:mr-[-12px] lg:mt-3 lg:p-6">
            <div
              key={`${sceneIndex}-${runId}`}
              className={`transition-opacity duration-300 ${
                phase === "exiting" ? "opacity-0" : "opacity-100"
              } ${reducedMotion ? "" : "sb-scene-in"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                  Client requirement
                </p>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-white/60 sm:text-[10px]">
                  {scene.businessType}
                </span>
              </div>

              <div className="mt-2.5 min-h-[92px] rounded-xl bg-[#151a2b] p-3 text-[15px] leading-[22px] text-white sm:mt-4 sm:min-h-[88px] sm:p-4 sm:text-[18px] sm:leading-relaxed">
                <span>{scene.requirement.slice(0, typedLength)}</span>
                {!reducedMotion && phase === "typing" ? (
                  <span
                    aria-hidden="true"
                    className="sb-caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[2px] bg-[#8b7bff]"
                    style={{
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                ) : null}
              </div>

              <div className="mt-2.5 flex h-5 items-center gap-2 text-[10px] text-white/45 sm:mt-3 sm:text-xs">
                {phase === "typing" ? (
                  <>
                    <span className="size-1.5 rounded-full bg-[#8b7bff]/60" />
                    <span>Reading requirement</span>
                  </>
                ) : null}

                {phase === "thinking" ? (
                  <>
                    <span>Preparing your scope</span>
                    <span className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="sb-dot size-1 rounded-full bg-[#8b7bff]"
                          style={{
                            animationDelay: `${dot * 0.14}s`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      ))}
                    </span>
                  </>
                ) : null}

                {phase === "building" ||
                phase === "done" ||
                phase === "exiting" ? (
                  <>
                    <span className="size-1.5 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.65)]" />
                    <span>Scope ready</span>
                  </>
                ) : null}
              </div>

              <div className="mt-2.5 rounded-xl border border-white/10 bg-[#101425] p-2.5 sm:mt-4 sm:p-4">
                <p className="text-[11px] font-medium text-white/55 sm:text-sm">
                  Proposed scope
                </p>

                <div className="mt-1.5 space-y-1.5 sm:mt-2.5 sm:space-y-2">
                  {scene.scopeItems.map((item, index) => (
                    <ScopeRow
                      key={`${scene.rowLabel}-${item.text}`}
                      item={item}
                      visible={index < revealedCount}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-1 sm:mt-4 sm:gap-2">
                {scene.icons.map((Icon, index) => (
                  <Fragment key={`${scene.rowLabel}-${index}`}>
                    <FlowNode
                      active={index < revealedCount}
                      icon={Icon}
                    />
                    {index < scene.icons.length - 1 ? (
                      <FlowConnector
                        active={revealedCount > index + 1}
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>

              <div className="mt-2.5 sm:mt-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/55 sm:text-[11px] ${
                    isFinished ? "opacity-100" : "opacity-0"
                  } ${isFinished && !reducedMotion ? "sb-footer-in" : ""}`}
                >
                  <span className="size-1.5 rounded-full bg-[#8b7bff]" />
                  Customized proposal, no fixed price
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHoverList(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setHoverList(false);
          }}
          className="min-w-0"
        >
          <h2
            id="scope-builder-title"
            className="text-[34px] font-light leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]"
          >
            Your scope, built around your requirement
          </h2>

          <p className="mt-5 max-w-[520px] text-[18px] leading-relaxed text-white/70">
            Every business is different. See how a simple requirement turns into
            a clear, customized scope that is ready for a proposal.
          </p>

          <div className="mt-10">
            {scenes.map((item, index) => {
              const isActive = index === sceneIndex;

              return (
                <button
                  key={item.rowLabel}
                  type="button"
                  onClick={() => selectScene(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex w-full items-center justify-between gap-4 border-b border-white/15 py-[22px] text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="min-w-0 text-[22px] leading-snug sm:text-2xl">
                    {item.rowLabel}
                  </span>
                  <ArrowRightIcon
                    className={`size-5 shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/70"
                    }`}
                  />

                  {isActive ? (
                    <span
                      key={`${sceneIndex}-${runId}`}
                      aria-hidden="true"
                      className={`absolute -bottom-px left-0 h-0.5 w-full origin-left bg-[#7c5ce8] ${
                        reducedMotion ? "sb-progress-static" : "sb-progress"
                      }`}
                      style={
                        reducedMotion
                          ? undefined
                          : {
                              animationDuration: `${sceneDuration}ms`,
                              animationPlayState: paused
                                ? "paused"
                                : "running",
                            }
                      }
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <a
            href={PROPOSAL_LINK}
            className="mt-10 inline-flex h-[60px] max-w-full items-center justify-center rounded-xl border border-[#8b7bff] px-10 font-semibold text-[#8b7bff] transition-colors duration-200 hover:bg-[#7c5ce8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
          >
            Request a proposal
          </a>
        </div>
      </div>
    </section>
  );
}
