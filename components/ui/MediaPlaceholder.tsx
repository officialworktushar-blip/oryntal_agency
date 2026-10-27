import Image from "next/image";
import { ImageIcon, Video, PlayCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  /** "image" for screenshots/diagrams, "video" for player slots. */
  type?: "image" | "video";
  /** CSS aspect ratio, e.g. "16/9". */
  aspect?: string;
  /** What to add, plus recommended size, e.g. "Dashboard screenshot · 1600×900". */
  label: string;
  /** One short line of guidance. */
  hint?: string;
  /** When a real asset exists, render it instead of the placeholder. */
  src?: string;
  alt?: string;
  /** next/image sizes attribute (image + src only). */
  sizes?: string;
  /** next/image loading strategy (image + src only). Defaults to "lazy". */
  loading?: "lazy" | "eager";
  className?: string;
  dark?: boolean;
  /** Tighter padding, smaller icon and text for use inside small cards. */
  compact?: boolean;
  /** "compact" is a tiny, dashed placeholder used inside illustrative cards. */
  /** "shot" is a designed showcase tile (tinted gradient, icon badge, label chip). */
  variant?: "default" | "compact" | "shot";
  /** Centre icon for the "shot" variant. */
  icon?: LucideIcon;
  /** Base colour for the "shot" variant gradient. */
  tint?: string;
};

export default function MediaPlaceholder({
  type = "image",
  aspect = "16/9",
  label,
  hint,
  src,
  alt,
  sizes,
  loading = "lazy",
  className,
  dark = false,
  compact = false,
  variant = "default",
  icon,
  tint = "#EDE9FF",
}: MediaPlaceholderProps) {
  if (variant === "shot") {
    const ShotIcon = icon ?? ImageIcon;
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: aspect }}>
        {src ? (
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
            loading={loading}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={alt ?? label}
            title={hint}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backgroundColor: tint,
              backgroundImage: `radial-gradient(70% 60% at 50% 38%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%), linear-gradient(160deg, ${tint} 0%, color-mix(in srgb, ${tint} 78%, #673DE6 22%) 100%)`,
            }}
          >
            <span
              aria-hidden="true"
              className="grid size-24 place-items-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(60,40,160,0.12)]"
            >
              <ShotIcon className="size-14 text-[#673DE6]/80" strokeWidth={1.5} />
            </span>
            <span aria-hidden="true" className="mt-6 flex w-3/5 flex-col items-center gap-2">
              <span className="h-2.5 w-full rounded-full bg-white/70" />
              <span className="h-2.5 w-4/5 rounded-full bg-white/60" />
              <span className="h-2.5 w-3/5 rounded-full bg-white/50" />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-3 bottom-3 rounded-full bg-white/85 px-3 py-1.5 text-center text-[11px] leading-snug text-[#2F1C6A] backdrop-blur"
            >
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (src) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-3xl border",
          dark ? "border-white/10" : "border-line",
          className
        )}
        style={{ aspectRatio: aspect }}
      >
        {type === "video" ? (
          <video
            src={src}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes={sizes ?? "(max-width: 768px) 100vw, 66vw"}
            loading={loading}
            className="object-cover"
          />
        )}
      </div>
    );
  }

  const Icon = type === "video" ? Video : ImageIcon;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-[9px] border border-dashed border-[rgba(103,61,230,0.4)] bg-white/70 text-center",
          className
        )}
        style={{ aspectRatio: aspect }}
      >
        <Icon
          className="size-[9px] text-[#2F1C6A]"
          strokeWidth={1.75}
        />
        {label ? (
          <span className="mt-1 max-w-[92%] text-[8px] leading-[1.35] text-[#2F1C6A]">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border-[1.5px] border-dashed text-center",
        compact ? "gap-1.5 p-3" : "gap-3 p-6",
        dark
          ? "border-white/25 bg-white/5 text-white/80"
          : "border-brand/40 bg-brand-wash text-ink",
        className
      )}
      style={{ aspectRatio: aspect }}
    >
      <span
        className={cn(
          "grid place-items-center rounded-xl",
          compact ? "size-7" : "size-12",
          dark ? "bg-white/10" : "bg-brand-soft"
        )}
      >
        <Icon
          className={cn(
            compact ? "size-3.5" : "size-6",
            dark ? "text-white" : "text-brand"
          )}
          strokeWidth={1.75}
        />
      </span>
      {label ? (
        <span
          className={cn(
            "max-w-sm font-semibold",
            compact ? "text-[11px] leading-snug" : "text-sm"
          )}
        >
          {label}
        </span>
      ) : null}
      {hint ? (
        <span
          className={cn(
            "max-w-sm",
            compact ? "text-[10px] leading-snug" : "text-xs",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {hint}
        </span>
      ) : null}
      {type === "video" ? (
        <PlayCircle
          className={cn(
            "opacity-60",
            compact ? "mt-0.5 size-4" : "mt-1 size-5",
            dark ? "text-white" : "text-brand"
          )}
          strokeWidth={1.75}
        />
      ) : null}
    </div>
  );
}
