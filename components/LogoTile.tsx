import type { LucideIcon } from "lucide-react";

export type LogoItem = {
  name: string;
  icon: LucideIcon;
  accent: string;
};

type LogoTileProps = {
  item: LogoItem;
  variant?: "partner" | "integration";
};

export default function LogoTile({ item, variant = "partner" }: LogoTileProps) {
  const Icon = item.icon;

  return (
    <div
      className={`group flex items-center justify-center gap-2.5 rounded-2xl border border-brand-100 bg-white filter grayscale transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card hover:grayscale-0 ${
        variant === "integration" ? "px-5 py-4" : "px-6 py-5"
      }`}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
        style={{ color: item.accent }}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-ink">
        {item.name}
      </span>
    </div>
  );
}
