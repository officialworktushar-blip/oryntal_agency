"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  Database,
  Gift,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const TABS = [
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "crm", label: "CRM", icon: Users },
  { id: "data", label: "Data", icon: Database },
  { id: "reports", label: "Reports", icon: BarChart3 },
] as const;

const CARD_TEXT: Record<string, string> = {
  payments: "Accept online payments safely",
  whatsapp: "Send order updates on WhatsApp automatically",
  crm: "Save every new enquiry in my CRM",
  data: "Keep my sheets and database always updated",
  reports: "Show me today's sales in one dashboard",
};

interface IntegrationFinalCtaProps {
  href?: string;
  showBadge?: boolean;
}

export default function IntegrationFinalCta({
  href = "/contact?interest=software-api-and-system-integration",
  showBadge = true,
}: IntegrationFinalCtaProps) {
  const [activeTab, setActiveTab] = useState<string>("crm");

  return (
    <section
      aria-label="Connect your business systems"
      className="relative flex min-h-[600px] items-center overflow-hidden py-16 text-white lg:py-0"
      style={{
        background:
          "radial-gradient(ellipse_at_85%_30%,#6b3fe0_0%,#2a1560_40%,#14092e_75%)",
      }}
    >
      <style jsx>{`
        @keyframes ifc-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes ifc-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .ifc-float {
          animation: ifc-float 5s ease-in-out infinite;
        }
        .ifc-spin {
          animation: ifc-spin 18s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ifc-float,
          .ifc-spin {
            animation: none;
          }
        }
      `}</style>
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-[#7c4dff]/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <div>
          <h2 className="text-[36px] font-medium leading-[1.1] tracking-tight md:text-[52px]">
            Same business. Everything connected.
          </h2>
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-white/80">
            Stop copying the same information from one place to another. We connect your payments, messaging, customer records, sheets and reports into one smooth system, so orders, enquiries and updates move on their own and your team saves hours every day.
          </p>
          <ul className="mt-6 space-y-3 text-white/75">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c4dff]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>Payments, messaging and customer records working together</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c4dff]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>Data that stays updated in your database and sheets</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c4dff]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>Live reports that show how your business is doing</span>
            </li>
          </ul>
          <Link
            href={href}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-medium text-[#14092e] transition hover:bg-[#ece6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span>Connect my business</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none" aria-hidden="true" />
          </Link>
          <div className="mt-8 max-w-[600px] border-t border-white/20" />
        </div>
        <div className="relative min-h-[420px] lg:min-h-[520px]">
          <div className="ifc-float absolute -right-2 -top-6 flex h-[110px] w-[110px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#7b61ff] to-[#5b3fe0] border border-white/30 shadow-[0_40px_80px_-40px_rgba(124,77,255,.9)] lg:h-[130px] lg:w-[130px]">
            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
              <g stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12.9 12.9l4.2 4.2M30.9 30.9l4.2 4.2M12.9 35.1l4.2-4.2M30.9 17.1l4.2-4.2" />
              </g>
            </svg>
          </div>
          <div className="absolute right-[10%] top-[16%] w-[78%] max-w-[420px] rounded-[28px] border border-white/30 bg-gradient-to-br from-white/50 to-white/20 p-8 backdrop-blur-xl shadow-2xl">
            <p className="text-xl text-[#1b1233]/80 sm:text-2xl">Connect my store with my accounts</p>
          </div>
          <div className="absolute right-[14%] top-[26%] w-[78%] max-w-[420px] rounded-[28px] border border-white/30 bg-gradient-to-br from-white/40 to-white/15 p-8 backdrop-blur-xl shadow-2xl">
            <p className="text-xl text-[#1b1233]/60 sm:text-2xl">Send payment reminders automatically</p>
          </div>
          <div className="absolute right-[18%] top-[36%] w-[78%] max-w-[420px] rounded-[28px] border border-white/30 bg-gradient-to-br from-white/60 to-white/25 p-8 pb-20 backdrop-blur-xl shadow-2xl">
            <p className="text-xl text-[#1b1233]/90 sm:text-2xl">{CARD_TEXT[activeTab]}</p>
            <div className="absolute bottom-6 left-8 flex items-center gap-2 text-[#1b1233]/70">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Connected smoothly</span>
            </div>
          </div>
          <div className="absolute bottom-[-10%] left-[6%] w-[88%] max-w-[460px] rounded-2xl bg-white p-2 shadow-2xl">
            <div role="tablist" aria-label="Integration areas" className="flex items-center justify-between gap-1 sm:gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[#2a2a3a] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c4dff]/60 ${
                      isActive ? "bg-[#dcd5ff]" : "hover:bg-[#f3f0ff]"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="text-[13px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <svg
            className="pointer-events-none absolute bottom-[4%] left-[14%] hidden h-10 w-10 lg:block"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <path d="M4 2L8 12L12 8L18 16" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="4" cy="2" r="2" fill="white" />
          </svg>
          {showBadge && (
            <div className="pointer-events-none absolute -bottom-10 -right-4 hidden h-[100px] w-[100px] items-center justify-center lg:flex">
              <svg viewBox="0 0 100 100" className="ifc-spin absolute inset-0 h-full w-full">
                <defs>
                  <path id="ifc-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="11" fill="white" letterSpacing="2px">
                  <textPath href="#ifc-circle" startOffset="0%">
                    FREE CONSULTATION • FREE CONSULTATION •
                  </textPath>
                </text>
              </svg>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Gift className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
