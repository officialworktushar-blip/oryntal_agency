import Image from "next/image";
import { ImageIcon, Video, PlayCircle } from "lucide-react";
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
}: MediaPlaceholderProps) {
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
