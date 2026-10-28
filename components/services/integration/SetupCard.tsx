import Link from "next/link";
import {
  PackageCheck,
  MessageCircle,
  Contact,
  Database,
  Table2,
  BarChart3,
  Cable,
} from "lucide-react";
import { cn } from "@/lib/cn";

type SetupItem = {
  id: string;
  name: string;
  outcome: string;
  tags: string[];
  bg: string;
  shotLabel: string;
  alt: string;
  icon: string;
};

const ICONS = {
  PackageCheck,
  MessageCircle,
  Contact,
  Database,
  Table2,
  BarChart3,
  Cable,
} as const;

export default function SetupCard({ item }: { item: SetupItem }) {
  const Icon = (ICONS as any)[item.icon] || Cable;

  return (
    <article
      className="assistant-card group/card relative flex w-[320px] flex-none flex-col overflow-hidden rounded-[28px] border border-[#EDEBFF] bg-white shadow-[0_40px_80px_-60px_rgba(80,37,209,.4)] transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1 md:w-[380px]"
    >
      <div
        className="relative flex h-[220px] w-full items-center justify-center overflow-hidden md:h-[260px]"
        style={{ background: `linear-gradient(180deg, ${item.bg} 0%, #ffffff 100%)` }}
      >
        <div className="absolute left-6 top-6 inline-flex items-center rounded-full bg-[#673DE6]/90 px-3 py-1 text-xs font-medium text-white shadow-[0_10px_30px_rgba(103,61,230,.25)]">
          Typical setup
        </div>
        <div className="flex h-[140px] w-[140px] items-center justify-center rounded-[24px] bg-white/80 shadow-[0_30px_60px_-40px_rgba(80,37,209,.8)] ring-1 ring-white/70 md:h-[160px] md:w-[160px]">
          <Icon className="h-10 w-10 text-[#673DE6] md:h-12 md:w-12" aria-hidden="true" />
        </div>
        <span className="sr-only">{item.shotLabel}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-[#F5F3FF] px-3 py-1 text-xs font-medium text-[#4C1D95]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-medium tracking-tight text-[#1D1E20] md:text-2xl">{item.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1D1E20]/75">{item.outcome}</p>
        </div>
        <div className="mt-auto">
          <Link
            href={`/contact?interest=software-api-and-system-integration&topic=setup&setup=${encodeURIComponent(item.id)}`}
            className="inline-flex items-center text-sm font-medium text-[#673DE6] transition-colors hover:text-[#5025D1] focus-visible:outline-none focus-visible:underline"
          >
            Ask about this setup
          </Link>
        </div>
      </div>
    </article>
  );
}
