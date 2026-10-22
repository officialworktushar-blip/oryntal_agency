"use client";

const ROWS = [
  "MSME / Udyam guidance",
  "Relevant registrations",
  "Digital setup basics",
];

type ChecklistWideProps = {
  className?: string;
  /** Stacked layout used on small screens. */
  compact?: boolean;
};

export default function ChecklistWide({ className, compact }: ChecklistWideProps) {
  const heading = (
    <p className="text-[17px] leading-none text-[var(--dfd-ink)]">Setup guidance</p>
  );

  const chip = (
    <span className="inline-flex items-center gap-2">
      <span className="size-2 rounded-full bg-[var(--dfd-4)]" />
      <span className="text-[11.5px] font-bold tracking-[0.06em] text-[var(--dfd-chip-ink)]">
        GUIDED
      </span>
    </span>
  );

  const caption = (
    <p className="text-[12px] leading-snug text-[var(--dfd-muted)]">
      Where applicable
    </p>
  );

  const rows = ROWS.map((row, index) => (
    <div
      key={row}
      className={`flex h-9 items-center gap-[10px] rounded-[10px] bg-[var(--dfd-lilac-soft)] px-[10px] ${
        compact ? "left-5 right-5" : "left-[25px] w-[328px]"
      }`}
      style={{ top: compact ? 22 + index * 44 : 26 + index * 44 }}
    >
      <span className="grid size-5 flex-none place-items-center rounded-full bg-[var(--dfd-green)]">
        <svg
          className="size-[11px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="text-[14px] leading-none text-[var(--dfd-ink)]">{row}</span>
      <span className="ml-auto rounded-[6px] bg-[var(--dfd-chip)] px-2 py-[2px] text-[11px] leading-none text-[var(--dfd-chip-ink)]">
        Guided
      </span>
    </div>
  ));

  if (compact) {
    return (
      <div
        className={`dfd-widget ${className ?? ""}`}
        style={{ width: "calc(100% - 40px)" }}
        aria-hidden="true"
      >
        <div className="relative h-[152px] px-5 pt-[22px]">{rows}</div>
        <div className="flex flex-col gap-2 px-5 pb-5 pt-1">
          {heading}
          {chip}
          {caption}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`dfd-widget h-[196px] w-[544px] ${className ?? ""}`}
      aria-hidden="true"
    >
      {rows}

      <div className="absolute left-[379px] top-[33px]">{heading}</div>
      <div className="absolute left-[379px] top-[59px]">{chip}</div>
      <div className="absolute left-[379px] top-[160px]">{caption}</div>
    </div>
  );
}
