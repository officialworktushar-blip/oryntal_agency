import type { CSSProperties, ReactNode } from "react";

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9h17M9 9v10.5" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5l8.5 4.5 8.5-4.5" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h5l2 2h7a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" />
    </svg>
  );
}

function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 10v4a1 1 0 0 0 1 1h2l9 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M16 8.5a3.5 3.5 0 0 1 0 7M7 15v4" />
    </svg>
  );
}

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="12" width="4" height="7" rx="2" />
      <rect x="17" y="12" width="4" height="7" rx="2" />
      <path d="M19 19a4 4 0 0 1-4 3h-1" />
    </svg>
  );
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 7v10M8 5h4a4 4 0 0 1 4 4v1M8 19h4a4 4 0 0 0 4-4v-1" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

function CursorArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 28"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#ffffff"
        stroke="#0a0a0b"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

function StartVisual() {
  return (
    <div className="relative h-full p-4 sm:p-5">
      <svg
        viewBox="0 0 560 340"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="why-start-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a3fe0" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#6a3fe0" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path
          d="M0 280H150L240 205H370L460 130H560V340H0Z"
          fill="url(#why-start-fill)"
        />
        <polyline
          points="0,280 150,280 240,205 370,205 460,130 560,130"
          fill="none"
          stroke="#6a3fe0"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative flex h-full flex-col justify-center gap-4">
        <div className="relative flex h-20 items-center gap-3 rounded-2xl border-2 border-[#7c5ce8] bg-[#111114] px-3 shadow-[0_0_34px_rgba(124,92,232,0.2)] sm:h-[88px] sm:gap-4 sm:px-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#6a3fe0] sm:size-14 xl:size-16">
            <LayoutIcon className="size-5 sm:size-6" />
          </div>
          <p className="min-w-0 text-lg font-semibold leading-tight text-white sm:text-xl lg:text-2xl xl:text-[28px]">
            Website + customer replies
          </p>
          <div className="wo-float absolute -bottom-2 -right-2 z-20">
            <CursorArrow className="h-auto w-7 sm:w-8" />
          </div>
        </div>

        <div className="flex h-20 items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1a1d] px-3 sm:h-[88px] sm:gap-4 sm:px-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#26262b] text-white/35 sm:size-11">
            <LayersIcon className="size-5" />
          </div>
          <p className="min-w-0 text-sm font-medium leading-tight text-white/80 sm:text-base lg:text-lg">
            Automation + bookings + payments
          </p>
        </div>

        <div className="flex h-20 items-center rounded-2xl border border-white/10 bg-[#1a1a1d] px-4 sm:h-[88px]">
          <p className="text-sm font-medium leading-tight text-white/60 sm:text-base lg:text-lg">
            Complete custom business system
          </p>
        </div>
      </div>
    </div>
  );
}

const statusRows = [
  { task: "Customer reply", status: "Sent", number: "#1042" },
  { task: "Payment reminder", status: "Sent", number: "#1043" },
  { task: "Order update", status: "Sent", number: "#1044" },
  { task: "Review request", status: "Sent", number: "#1045" },
  { task: "Supplier enquiry", status: "Done", number: "#1046" },
];

function RunningVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center p-4 sm:p-5">
      <div className="relative mx-auto w-full max-w-[330px]">
        <div className="absolute inset-x-7 -top-4 h-14 rounded-2xl border border-white/10 bg-[#1a1a1d]" />
        <div className="absolute inset-x-3.5 -top-2 h-14 rounded-2xl border border-white/10 bg-[#1a1a1d]" />

        <div className="relative rounded-2xl border border-white/15 bg-[#111114] px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-bold text-white sm:text-base">
              Order follow-up flow
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-[10px] font-medium text-[#10b981]">
                Active
              </span>
              <span className="flex h-4 w-7 items-center justify-end rounded-full bg-[#10b981] p-0.5">
                <span className="size-3 rounded-full bg-white" />
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-3 space-y-1.5 overflow-hidden pb-8">
          {statusRows.map((row, index) => (
            <div
              key={row.number}
              className="relative grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg bg-[#1e1e22] px-3 py-2 text-xs text-white/70"
            >
              <span
                className={`absolute inset-y-2 left-0 w-0.5 rounded-full ${
                  index % 2 === 0 ? "bg-[#7c5ce8]" : "bg-[#2dd4bf]"
                }`}
              />
              <span className="truncate">{row.task}</span>
              <span className="text-[#10b981]">{row.status}</span>
              <span className="text-white/35">{row.number}</span>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#17171a] to-transparent" />
        </div>
      </div>
    </div>
  );
}

function ProposalVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center p-4 sm:p-5">
      <div className="pointer-events-none absolute left-1/2 top-8 bottom-8 w-24 -translate-x-1/2 rounded-full bg-[#7c5ce8]/15 blur-3xl" />

      <PlusMark className="wo-plus absolute left-5 top-8 size-4 text-[#8b7bff]" />
      <PlusMark
        className="wo-plus absolute right-6 top-1/2 size-3.5 text-[#8b7bff]"
        style={{ animationDelay: "0.7s" }}
      />
      <PlusMark
        className="wo-plus absolute bottom-14 left-8 size-3 text-[#8b7bff]"
        style={{ animationDelay: "1.2s" }}
      />

      <div className="relative space-y-4">
        <div className="flex h-20 items-center gap-4 rounded-2xl border-2 border-[#7c5ce8] bg-[#111114] px-4 sm:h-[88px]">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1e1e22] text-white">
            <LayoutIcon className="size-5" />
          </div>
          <span className="h-px flex-1 bg-[#7c5ce8]/70" />
        </div>

        <div className="flex h-20 items-center gap-3 rounded-2xl border border-[#7c5ce8]/30 bg-[#141416] px-4 sm:h-[88px]">
          <span className="h-1.5 w-4 rounded-full bg-[#10b981]" />
          <span className="h-1.5 w-4 rounded-full bg-[#7c5ce8]" />
          <span className="h-px flex-1 bg-[#7c5ce8]/50" />
        </div>

        <div
          className="flex h-20 items-center gap-3 rounded-2xl border border-[#7c5ce8]/30 bg-[#141416] px-4 opacity-60 sm:h-[88px]"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        >
          <span className="h-1.5 w-4 rounded-full bg-[#10b981]" />
          <span className="h-1.5 w-4 rounded-full bg-[#7c5ce8]" />
          <span className="h-px flex-1 bg-[#7c5ce8]/50" />
        </div>
      </div>
    </div>
  );
}

function AssistantVisual() {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 bg-[#111114]/85" />

      <svg
        viewBox="0 0 560 340"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="relative z-10 h-full w-full font-sans"
      >
        <path
          d="M42 60 24 100h13l-5 28 23-36H42V60Z"
          fill="#8b7bff"
        />
        <line
          x1="62"
          y1="92"
          x2="84"
          y2="92"
          stroke="#3f3f46"
          strokeWidth="2"
        />

        <rect
          x="84"
          y="50"
          width="88"
          height="84"
          rx="24"
          fill="#1e1e22"
          stroke="#3f3f46"
        />
        <path
          d="M112 76h28a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-12l-8 6v-6h-8a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5Z"
          fill="none"
          stroke="#d4d4d8"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <line
          x1="172"
          y1="92"
          x2="202"
          y2="92"
          stroke="#3f3f46"
          strokeWidth="2"
        />

        <rect
          x="202"
          y="38"
          width="430"
          height="108"
          rx="28"
          fill="#1e1e22"
          stroke="#7c5ce8"
          strokeOpacity="0.45"
        />
        <path
          d="M244 74c.3 3.4 2.7 5.8 6.1 6.1-3.4.3-5.8 2.7-6.1 6.1-.3-3.4-2.7-5.8-6.1-6.1 3.4-.3 5.8-2.7 6.1-6.1Z"
          fill="#8b7bff"
        />
        <text
          x="264"
          y="101"
          fill="#ffffff"
          fontSize="22"
          fontWeight="700"
        >
          Smart Assistant
        </text>

        <path
          d="M300 146C300 198 258 212 258 278"
          fill="none"
          stroke="#8b7bff"
          strokeOpacity="0.32"
          strokeWidth="2"
        />
        <path
          d="M370 146C370 198 438 212 438 278"
          fill="none"
          stroke="#8b7bff"
          strokeOpacity="0.32"
          strokeWidth="2"
        />

        <circle
          cx="258"
          cy="278"
          r="36"
          fill="#17171a"
          stroke="#4b4b52"
          strokeWidth="1.5"
        />
        <path
          d="M247 262h13l7 7v17a2 2 0 0 1-2 2h-18a2 2 0 0 1-2-2v-22a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="#b8b8c2"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M260 262v7h7M250 274h10M250 279h8"
          fill="none"
          stroke="#b8b8c2"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <circle
          cx="438"
          cy="278"
          r="36"
          fill="#17171a"
          stroke="#4b4b52"
          strokeWidth="1.5"
        />
        <ellipse
          cx="438"
          cy="267"
          rx="18"
          ry="7"
          fill="none"
          stroke="#b8b8c2"
          strokeWidth="1.4"
        />
        <path
          d="M420 267v13c0 3.9 8.1 7 18 7s18-3.1 18-7v-13"
          fill="none"
          stroke="#b8b8c2"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M420 280v8c0 3.9 8.1 7 18 7s18-3.1 18-7v-8"
          fill="none"
          stroke="#b8b8c2"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const networkTiles = [
  { label: "Marketing", icon: <MegaphoneIcon className="size-8 sm:size-10" /> },
  {
    label: "Customer support",
    icon: <HeadsetIcon className="size-8 sm:size-10" />,
  },
  {
    label: "Integrations",
    icon: <BranchIcon className="size-8 sm:size-10" />,
  },
  { label: "Network", icon: <GlobeIcon className="size-8 sm:size-10" /> },
];

function NetworkVisual() {
  return (
    <div className="relative h-full">
      <svg
        viewBox="0 0 700 340"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="why-network-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a3fe0" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#6a3fe0" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path
          d="M0 250H120L190 190H330L410 130H540L620 80H700V340H0Z"
          fill="url(#why-network-fill)"
        />
        <polyline
          points="0,250 120,250 190,190 330,190 410,130 540,130 620,80 700,80"
          fill="none"
          stroke="#6a3fe0"
          strokeWidth="1.5"
        />
      </svg>

      <div className="absolute inset-y-0 left-4 flex items-center sm:left-5">
        <div className="flex min-w-max items-center gap-2.5">
          <div className="relative flex h-20 w-[230px] items-center gap-2.5 rounded-2xl border-2 border-[#7c5ce8] bg-[#111114] px-3 shadow-[0_0_34px_rgba(124,92,232,0.18)]">
            <FolderIcon className="size-8 shrink-0 text-[#8b7bff] sm:size-9" />
            <span className="text-xl font-semibold leading-tight text-white sm:text-[22px] xl:text-2xl">
              Supplier Network
            </span>
            <div className="wo-float absolute -bottom-4 right-3 z-20">
              <CursorArrow className="h-auto w-7 sm:w-8" />
            </div>
          </div>

          {networkTiles.map((tile) => (
            <div
              key={tile.label}
              title={tile.label}
              className="flex size-[120px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#1a1a1d] text-white/45"
            >
              {tile.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cards: Array<{
  title: string;
  description: string;
  visual: ReactNode;
}> = [
  {
    title: "Start where you are",
    description:
      "Begin with one tool or build a full system. We plan it around your business and grow it with you.",
    visual: <StartVisual />,
  },
  {
    title: "Always running in the background",
    description:
      "Replies, reminders and updates go out on their own, so work keeps moving even when your team is offline.",
    visual: <RunningVisual />,
  },
  {
    title: "A clear proposal, no surprises",
    description:
      "No fixed packages. You get a customized proposal based on your needs, complexity, integrations and agreed deliverables.",
    visual: <ProposalVisual />,
  },
  {
    title: "Answers from your own business information",
    description:
      "Chat and voice assistants that reply using your products, prices and documents, on WhatsApp and your website.",
    visual: <AssistantVisual />,
  },
  {
    title: "Connected to the tools and people you need",
    description:
      "We connect payment gateways, delivery partners and the tools you already use, and bring in suppliers, wholesalers and outside specialists through our network.",
    visual: <NetworkVisual />,
  },
];

function WhyCard({
  card,
}: {
  card: (typeof cards)[number];
}) {
  return (
    <div className="cp-reveal h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#17171a] transition-all duration-300 hover:-translate-y-1 hover:border-[#7c5ce8]/40 hover:shadow-[0_24px_70px_rgba(124,92,232,0.16)]">
        <div className="relative h-[320px] overflow-hidden sm:h-[340px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 42%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 42%, transparent 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-transparent to-[#17171a]" />

          <div aria-hidden="true" className="relative z-20 h-full">
            {card.visual}
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-[28px] font-medium leading-tight text-white">
            {card.title}
          </h3>
          <p className="mt-3 text-[18px] leading-relaxed text-white/70">
            {card.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default function WhyOryntal() {
  return (
    <section
      id="why-oryntal"
      aria-labelledby="why-oryntal-title"
      className="bg-[#0a0a0b] px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="why-oryntal-title"
          className="cp-reveal mx-auto max-w-4xl text-center text-[34px] font-light leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]"
        >
          Built around the way your business works
        </h2>

        <p className="cp-reveal mx-auto mt-5 max-w-[700px] text-center text-[18px] leading-relaxed text-white/70">
          From a simple first tool to a complete system, we plan, build and
          connect everything around your needs.
        </p>

        <div className="mt-12 space-y-5 md:mt-14">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            {cards.slice(0, 3).map((card) => (
              <WhyCard key={card.title} card={card} />
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr]">
            {cards.slice(3).map((card) => (
              <WhyCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
