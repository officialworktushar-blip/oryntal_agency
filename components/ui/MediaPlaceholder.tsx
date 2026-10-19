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
        "flex flex-col items-center justify-center gap-3 rounded-3xl border-[1.5px] border-dashed p-6 text-center",
        dark
          ? "border-white/25 bg-white/5 text-white/80"
          : "border-brand/40 bg-brand-wash text-ink",
        className
      )}
      style={{ aspectRatio: aspect }}
    >
      <span
        className={cn(
          "grid size-12 place-items-center rounded-xl",
          dark ? "bg-white/10" : "bg-brand-soft"
        )}
      >
        <Icon className={cn("size-6", dark ? "text-white" : "text-brand")} strokeWidth={1.75} />
      </span>
      {label ? (
        <span className="max-w-sm text-sm font-semibold">{label}</span>
      ) : null}
      {hint ? (
        <span className={cn("max-w-sm text-xs", dark ? "text-white/60" : "text-muted")}>
          {hint}
        </span>
      ) : null}
      {type === "video" ? (
        <PlayCircle className={cn("mt-1 size-5 opacity-60", dark ? "text-white" : "text-brand")} strokeWidth={1.75} />
      ) : null}
    </div>
  );
}
