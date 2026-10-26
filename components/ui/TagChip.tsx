import { cn } from "@/lib/cn";

type TagChipProps = {
  children: React.ReactNode;
  tone?: "brand" | "offer";
  sheen?: boolean;
  className?: string;
};

export default function TagChip({
  children,
  tone = "brand",
  sheen = false,
  className,
}: TagChipProps) {
  const background = tone === "offer" ? "var(--offer-red)" : "#673DE6";

  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        tone === "offer" && "ws-tag-offer",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-[2px]"
        style={{ backgroundColor: background }}
      />
      <span
        className="relative inline-flex items-center overflow-hidden rounded-lg px-5 py-2.5 font-bold text-white"
        style={{ backgroundColor: background }}
      >
        <span className="relative z-10">{children}</span>
        {sheen ? (
          <span aria-hidden="true" className="ws-tag-sheen absolute inset-y-0 left-0 w-9 bg-white/35" />
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-1/2 z-10 size-1.5 -translate-y-1/2 rounded-full bg-black/65"
      />
    </span>
  );
}
