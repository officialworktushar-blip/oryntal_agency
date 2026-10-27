import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  Globe,
  ShoppingCart,
  AppWindow,
  Smartphone,
  Boxes,
  LayoutDashboard,
  ShieldCheck,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { WebsiteAppDeliverableItem } from "@/lib/content/services/websiteApp";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Globe,
  ShoppingCart,
  AppWindow,
  Smartphone,
  Boxes,
  LayoutDashboard,
  ShieldCheck,
  PenTool,
};

type DeliverableCardProps = {
  item: WebsiteAppDeliverableItem;
  bestForLabel: string;
  inView: boolean;
  reduced: boolean;
  index: number;
};

export default function DeliverableCard({
  item,
  bestForLabel,
  inView,
  reduced,
  index,
}: DeliverableCardProps) {
  const Icon = iconMap[item.icon] || Globe;
  const linkAria = `Talk to us about ${item.title}`;

  return (
    <li
      className={cn(
        "flex-none snap-start",
        // Responsive width: 82vw on mobile, clamp(300px, 26vw, 370px) on desktop
        "w-[82vw] max-w-[340px] md:w-[clamp(300px,26vw,370px)]",
        // Fixed height
        "h-[405px] md:h-[380px]",
        // Entrance animation
        !reduced && inView && "animate-in fade-in slide-in-from-bottom-10 duration-600",
        !reduced && inView && `delay-[${Math.min(index * 70, 300)}ms]`
      )}
      style={{
        animationDelay: reduced ? undefined : `${Math.min(index * 70, 300)}ms`,
      }}
    >
      <Link
        href={`/contact?interest=website-and-app-development&topic=${item.topic}`}
        aria-label={linkAria}
        className={cn(
          "wd-card group block w-full h-full rounded-[22px] relative overflow-hidden",
          "p-[28px_30px] border border-white/8",
          "bg-gradient-to-b from-[#080612] via-[#0E0A24] 55% to-[#2B1F66]",
          "shadow-[0_20px_50px_rgba(0,0,0,0.35)]",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
          // Hover/focus
          "hover:-translate-y-[6px] hover:border-white/20",
          "active:scale-[0.985]"
        )}
      >
        {/* Bottom glow */}
        <div className="wd-card-glow" />

        {/* Top sheen effect */}
        <div className="wd-card-sheen" />

        {/* Icon (top-left) */}
        <div className="absolute top-[28px] left-[30px]">
          <Icon size={30} className="text-[#8F7BFF]" strokeWidth={1.6} />
        </div>

        {/* Arrow (top-right) */}
        <div className="absolute top-[28px] right-[30px] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight
            size={22}
            className="text-white/85 transition-colors duration-200 group-hover:text-[#B9A8FF]"
          />
        </div>

        {/* Title */}
        <h3 className="mt-6 text-[24px] lg:text-[26px] font-normal text-white leading-snug tracking-[-0.01em]">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[16px] lg:text-[17px] text-white/70 leading-relaxed">
          {item.description}
        </p>

        {/* Best for line (bottom) */}
        <div className="absolute left-[30px] right-[30px] bottom-[26px]">
          <div className="border-t border-white/10 pt-4 flex items-center gap-2">
            <Target size={14} className="text-[#B9A8FF] shrink-0" />
            <span className="text-[13px] text-white/50 shrink-0">
              {bestForLabel}
            </span>
            <span className="text-[14px] text-white/85">
              {item.bestFor}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
