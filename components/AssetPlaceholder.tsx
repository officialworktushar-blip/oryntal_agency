import { ImageIcon, PlayCircle, type LucideIcon } from "lucide-react";

type AssetPlaceholderProps = {
  title: string;
  description: string;
  kind?: "image" | "video";
  className?: string;
  dark?: boolean;
  icon?: LucideIcon;
};

/**
 * Reserved slot for brand photography, illustrations, or video.
 * Replace the inner content with <Image /> or a <video>/<iframe> when the
 * final asset is delivered — the layout box is already sized and styled.
 */
export default function AssetPlaceholder({
  title,
  description,
  kind = "image",
  className,
  dark = false,
  icon,
}: AssetPlaceholderProps) {
  const Icon = icon ?? (kind === "video" ? PlayCircle : ImageIcon);

  return (
    <div
      className={`group relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed ${
        dark
          ? "border-white/25 bg-white/5"
          : "border-brand-300/70 bg-gradient-to-br from-brand-50 to-white"
      } ${className ?? ""}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-70 ${
          dark
            ? "bg-[radial-gradient(circle_at_30%_20%,rgba(138,102,250,0.25),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(138,102,250,0.18),transparent_55%)]"
        }`}
      />
      <div className="relative mx-4 max-w-sm text-center">
        <span
          className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${
            dark ? "bg-white/10 text-white" : "bg-brand-100 text-brand-700"
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <p
          className={`mt-4 text-sm font-semibold ${
            dark ? "text-white" : "text-brand-900"
          }`}
        >
          {title}
        </p>
        <p
          className={`mt-1.5 text-xs leading-relaxed ${
            dark ? "text-brand-100/80" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
