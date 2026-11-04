import type { ReactNode } from "react";

const PROPOSAL_LINK = "#request";

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.5 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.2-.7L4 20l1.4-4.2a7.5 7.5 0 1 1 15.1-4.3Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 9a6 6 0 0 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
      <path d="M10 19h4" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01" />
    </svg>
  );
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
      <path d="M14 11a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.4-1.4" />
    </svg>
  );
}

const pills: Array<{
  label: string;
  color: string;
  icon: ReactNode;
}> = [
  {
    label: "Customer Replies",
    color: "#8b7bff",
    icon: <ChatIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Lead Follow-up",
    color: "#e8a317",
    icon: <BellIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Order Updates",
    color: "#3b82f6",
    icon: <PackageIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Appointment Booking",
    color: "#5b3de0",
    icon: <CalendarIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Payment Reminders",
    color: "#1a1a1d",
    icon: <CardIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Review Collection",
    color: "#3b82f6",
    icon: <StarIcon className="size-4 sm:size-5" />,
  },
  {
    label: "Supplier Sourcing",
    color: "#c81e1e",
    icon: <LinkIcon className="size-4 sm:size-5" />,
  },
];

const pillRows = [
  {
    items: pills.slice(0, 2),
    motionClass: "gyb-row-1",
    offsetClass: "translate-x-2 lg:translate-x-10",
  },
  {
    items: pills.slice(2, 5),
    motionClass: "gyb-row-2",
    offsetClass: "",
  },
  {
    items: pills.slice(5),
    motionClass: "gyb-row-3",
    offsetClass: "-translate-x-2 lg:-translate-x-8",
  },
];

function Pill({ label, color, icon }: (typeof pills)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-5 text-[18px] font-medium text-[#0d0d0f] shadow-[0_10px_24px_rgba(13,13,15,0.16)] sm:gap-3.5 sm:py-3 sm:pl-3 sm:pr-7 sm:text-2xl">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-white sm:size-12"
        style={{ backgroundColor: color }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function CursorArrow() {
  return (
    <svg
      viewBox="0 0 24 28"
      aria-hidden="true"
      className="h-auto w-7 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] sm:w-8 lg:w-9"
    >
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#0d0d0f"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GrowYourBusiness() {
  return (
    <section
      id="grow-your-business"
      aria-labelledby="grow-your-business-title"
      className="bg-white px-5 py-16 text-[#0d0d0f] sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div
          aria-hidden="true"
          className="cp-reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(36,27,82,0.18)]"
          style={{
            background:
              "linear-gradient(180deg, #241b52 0%, #3b2c85 30%, #a78bfa 68%, #e4d9ff 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-[-20%] bottom-[-28%] h-[70%] rounded-[50%] bg-white/45 blur-3xl" />
          <div className="pointer-events-none absolute left-[8%] top-[52%] h-[40%] w-[84%] rounded-[50%] bg-[#e4d9ff]/60 blur-3xl" />

          <div className="absolute inset-0 flex flex-col justify-center gap-4 sm:gap-8">
            {pillRows.map((row) => (
              <div
                key={row.motionClass}
                className={`flex justify-center ${row.offsetClass}`}
              >
                <div
                  className={`flex min-w-max gap-3 sm:gap-6 ${row.motionClass}`}
                >
                  {row.items.map((pill) => (
                    <Pill key={pill.label} {...pill} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute left-[52%] top-[56%] z-20">
            <CursorArrow />
          </div>
        </div>

        <div className="cp-reveal max-w-[520px]">
          <h2
            id="grow-your-business-title"
            className="text-[34px] font-light leading-[1.1] tracking-[-0.04em] text-[#0d0d0f] sm:text-5xl lg:text-[56px]"
          >
            Do more for your customers, without hiring more people
          </h2>

          <p className="mt-6 text-[18px] leading-relaxed text-[#26262b]">
            ORYNTAL builds custom tools that handle customer replies,
            follow-ups, bookings and reports for you, so your team can focus on
            growing the business.
          </p>

          <a
            href={PROPOSAL_LINK}
            className="mt-8 inline-flex h-[60px] items-center justify-center rounded-xl border border-[#6a3fe0] px-10 font-semibold text-[#6a3fe0] transition-colors duration-200 hover:bg-[#6a3fe0] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a3fe0] focus-visible:ring-offset-2"
          >
            Request a proposal
          </a>
        </div>
      </div>
    </section>
  );
}
