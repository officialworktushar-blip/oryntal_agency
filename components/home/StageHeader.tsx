import { cn } from "@/lib/cn";

type StageHeaderProps = {
  label: string;
  title: string;
  headingId: string;
  /** "dark" for the purple Manage band. */
  tone?: "light" | "dark";
  className?: string;
};

/** Stage name + section title shared by all four How-it-works stages. */
export default function StageHeader({
  label,
  title,
  headingId,
  tone = "light",
  className,
}: StageHeaderProps) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-[0.18em]",
          dark ? "text-[#B9A8FF]" : "text-brand",
        )}
      >
        {label}
      </p>
      <h3
        id={headingId}
        className={cn(
          "mt-4 text-4xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[46px]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h3>
    </div>
  );
}
