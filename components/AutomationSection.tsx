"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import {
  ArrowRight,
  Calendar,
  Eye,
  Folder,
  MessageSquare,
  Mic,
  Zap,
  ChevronDown,
} from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

type TabKey = "workflows" | "chat" | "voice" | "documents" | "vision";

type TabData = {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const tabs: TabData[] = [
  { key: "workflows", label: "Workflows", icon: Calendar },
  { key: "chat", label: "Chat", icon: MessageSquare },
  { key: "voice", label: "Voice", icon: Mic },
  { key: "documents", label: "Documents", icon: Folder },
  { key: "vision", label: "Vision", icon: Eye },
];

const cardTextByTab: Record<TabKey, string> = {
  workflows: "Send invoices and reminders automatically",
  chat: "Reply to customer enquiries automatically",
  voice: "Answer calls with a voice assistant",
  documents: "Find answers from my company files",
  vision: "Check product photos for quality",
};

type AutomationSectionProps = {
  heading?: string;
  paragraph?: string;
  checklist?: string[];
  buttonText?: string;
  buttonHref?: string;
  logo?: React.ReactNode;
  showBadge?: boolean;
};

const defaultChecklist = [
  "Automated workflows and daily business tasks",
  "Chat and voice assistants for customers and teams",
  "Smart solutions trained on your own business data",
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" fill="rgba(124, 77, 255, 0.25)" />
      <path
        d="M5.5 8.5L7 10L10.5 6.5"
        stroke="#b9a6ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleLogo() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M28 8L31.09 20.26L43 21.27L33.82 29.14L36.18 41L28 34.27L19.82 41L22.18 29.14L13 21.27L24.91 20.26L28 8Z"
        fill="white"
      />
      <circle cx="40" cy="16" r="3" fill="white" opacity="0.9" />
      <circle cx="18" cy="14" r="2" fill="white" opacity="0.7" />
    </svg>
  );
}

function MousePointer() {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 2L18.5 12L12 14L9 21L2 2Z"
        fill="white"
        stroke="#1b1233"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 6L15.7634 11.2366L21 13L15.7634 14.7634L14 20L12.2366 14.7634L7 13L12.2366 11.2366L14 6Z"
        fill="white"
      />
      <path
        d="M8 7L8.88197 9.11803L11 10L8.88197 10.882L8 13L7.11803 10.882L5 10L7.11803 9.11803L8 7Z"
        fill="white"
        opacity="0.8"
      />
      <path
        d="M20 8L20.618 9.38203L22 10L20.618 10.618L20 12L19.382 10.618L18 10L19.382 9.38203L20 8Z"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}

export default function AutomationSection({
  heading = "Same business. Smarter ways to grow.",
  paragraph = "Let your business keep working even when you're not. We build smart tools that answer customers, handle calls, read your documents and take care of repetitive work, so your team can focus on what matters. From simple automation to fully custom solutions built around the way you work.",
  checklist = defaultChecklist,
  buttonText = "Automate my business",
  buttonHref = "/contact",
  logo,
  showBadge = true,
}: AutomationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("chat");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const frontCardText = cardTextByTab[activeTab];

  return (
    <section
      ref={sectionRef}
      className={`${dmSans.className} relative overflow-hidden min-h-[600px] text-white`}
      style={{
        background:
          "radial-gradient(ellipse at 85% 30%, #6b3fe0 0%, #2a1560 40%, #14092e 75%)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#7c4dff]/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-120px] bottom-[-160px] h-[520px] w-[520px] rounded-full bg-[#6b3fe0]/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10 xl:pl-[190px] xl:pr-12">
        <div className="w-full max-w-[640px] text-center lg:text-left">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-[34px] font-medium leading-[1.1] tracking-tight sm:text-[44px] lg:text-[52px]">
              {heading}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/80 sm:text-[19px]">
              {paragraph}
            </p>
            <ul className="mt-6 flex flex-col items-center gap-3 text-[15px] text-white/70 sm:text-[16px] lg:items-start">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
              <Link
                href={buttonHref}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[18px] font-medium text-[#14092e] transition-colors hover:bg-[#ece6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14092e]"
              >
                {buttonText}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <div className="h-px w-full max-w-[640px] border-t border-white/20" />
            </div>
          </div>
        </div>

        <div className="relative flex w-full justify-center lg:w-auto lg:flex-1">
          <div className="relative h-[520px] w-full max-w-[720px] sm:h-[560px] lg:h-[620px]">
            <div
              className="pointer-events-none absolute left-1/2 top-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#7c4dff]/25 blur-3xl lg:left-[55%]"
              aria-hidden="true"
            />

            <div className="absolute -top-6 right-4 sm:right-10 lg:right-16">
              <div
                className={`relative flex h-[130px] w-[130px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#7b61ff] to-[#5b3fe0] shadow-[0_40px_80px_-40px_rgba(123,97,255,0.9)] ${
                  isVisible ? "animate-float" : ""
                }`}
                style={{ animationPlayState: "running" }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-[28px] border border-white/30" />
                <div className="relative">{logo ?? <SparkleLogo />}</div>
              </div>
            </div>

            <div className="absolute bottom-[160px] left-1/2 w-[min(90%,_640px)] -translate-x-1/2 sm:bottom-[150px] lg:bottom-[170px] lg:left-auto lg:right-[220px] lg:translate-x-0">
              <div
                className={`relative transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <div className="absolute -top-10 left-6 right-10 h-[190px] rounded-[28px] bg-gradient-to-br from-white/40 to-white/16 backdrop-blur-xl border border-white/25 shadow-2xl opacity-70" />
                <div className="absolute -top-5 left-3 right-6 h-[210px] rounded-[28px] bg-gradient-to-br from-white/45 to-white/18 backdrop-blur-xl border border-white/28 shadow-2xl opacity-80" />
                <div className="relative rounded-[28px] bg-gradient-to-br from-white/55 to-white/24 backdrop-blur-xl border border-white/35 shadow-2xl">
                  <div className="flex items-start justify-between px-8 pt-7">
                    <p className="max-w-[420px] text-[22px] leading-snug text-[#1b1233]/90 sm:text-[24px]">
                      {frontCardText}
                    </p>
                    <Zap className="mt-1 h-5 w-5 text-[#1b1233]/60" />
                  </div>
                  <div className="mt-6 flex items-center gap-2 px-8 pb-7 text-[#1b1233]/70">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Solutions</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10">
              <div
                className={`relative transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div
                  className="absolute -left-10 -top-6 hidden sm:block"
                  aria-hidden="true"
                >
                  <MousePointer />
                </div>
                <div
                  className="flex items-end gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_40px_70px_-30px_rgba(27,18,51,0.9)]"
                  role="tablist"
                  aria-label="Automation examples"
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={tab.label}
                        onClick={() => setActiveTab(tab.key)}
                        className={`group relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[#2a2a3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c4dff]/60 ${
                          isActive ? "bg-[#dcd5ff]" : "hover:bg-[#f3f0ff]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-[14px] leading-none">{tab.label}</span>
                        {isActive && (
                          <span
                            className="absolute -right-6 -top-6 hidden sm:block"
                            aria-hidden="true"
                          >
                            <MousePointer />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {showBadge && (
              <div
                className={`absolute -bottom-10 right-2 hidden sm:block lg:-bottom-6 lg:right-[-10px] transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-14 opacity-0"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <div className="relative h-[110px] w-[110px]">
                  <svg
                    viewBox="0 0 110 110"
                    className="h-full w-full animate-spin-slow"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="badgeTextPath"
                        d="M 55, 55 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      />
                    </defs>
                    <circle cx="55" cy="55" r="55" fill="#5b3fe0" />
                    <text
                      fill="white"
                      fontSize="9"
                      letterSpacing="4px"
                      style={{ textTransform: "uppercase" }}
                    >
                      <textPath href="#badgeTextPath" startOffset="0%">
                        FREE CONSULTATION • FREE CONSULTATION •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                      <BadgeIcon />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
