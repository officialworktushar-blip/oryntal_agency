import type { ComponentType, CSSProperties } from "react";

const WHATSAPP_NUMBER = "REPLACE_WITH_NUMBER";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi ORYNTAL, I would like a customized proposal for my business.",
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

type TileVariant = "normal" | "empty" | "active";
type TileIcon = ComponentType<{ className?: string }>;

type Tile = {
  row: number;
  col: number;
  icon: TileIcon | null;
  variant: TileVariant;
  color: string;
  duration: number;
  delay: number;
  distance: number;
};

function WebsiteIcon({ className }: { className?: string }) {
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
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9h17M7 6.75h.01M10 6.75h.01" />
    </svg>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
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
      <path d="M20.5 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.2-.7L4 20l1.4-4.2a7.5 7.5 0 1 1 15.1-4.3Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
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
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01" />
    </svg>
  );
}

function ChatCheckIcon({ className }: { className?: string }) {
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
      <path d="M20.5 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.2-.7L4 20l1.4-4.2a7.5 7.5 0 1 1 15.1-4.3Z" />
      <path d="m8.5 11.5 2.2 2.2 4.3-4.5" />
    </svg>
  );
}

function PaymentCardIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}

function ReportIcon({ className }: { className?: string }) {
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
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 16v-3M12 16V9M16 16v-5" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
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
      <path d="M3 6.5h11v9.5H3zM14 9.5h4l3 3V16h-7z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17.5" cy="18" r="1.7" />
    </svg>
  );
}

function CursorArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden="true" className={className}>
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#ffffff"
        stroke="#09060f"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tiles: Tile[] = [
  {
    row: 1,
    col: 1,
    icon: WebsiteIcon,
    variant: "normal",
    color: "text-[#8b7bff]",
    duration: 6.2,
    delay: 0,
    distance: 5,
  },
  {
    row: 1,
    col: 2,
    icon: ChatBubbleIcon,
    variant: "normal",
    color: "text-[#c4b5fd]",
    duration: 7.1,
    delay: 0.8,
    distance: 4,
  },
  {
    row: 1,
    col: 3,
    icon: null,
    variant: "empty",
    color: "",
    duration: 5.4,
    delay: 1.6,
    distance: 6,
  },
  {
    row: 2,
    col: 2,
    icon: CalendarIcon,
    variant: "normal",
    color: "text-[#c4b5fd]",
    duration: 6.8,
    delay: 0.4,
    distance: 5,
  },
  {
    row: 2,
    col: 3,
    icon: ChatCheckIcon,
    variant: "active",
    color: "text-white",
    duration: 7.6,
    delay: 1.2,
    distance: 6,
  },
  {
    row: 2,
    col: 4,
    icon: PaymentCardIcon,
    variant: "normal",
    color: "text-[#8b7bff]",
    duration: 5.8,
    delay: 2,
    distance: 4,
  },
  {
    row: 3,
    col: 3,
    icon: ReportIcon,
    variant: "normal",
    color: "text-[#8b7bff]",
    duration: 7.3,
    delay: 0.9,
    distance: 5,
  },
  {
    row: 3,
    col: 4,
    icon: TruckIcon,
    variant: "normal",
    color: "text-[#c4b5fd]",
    duration: 6,
    delay: 1.7,
    distance: 6,
  },
  {
    row: 3,
    col: 5,
    icon: null,
    variant: "empty",
    color: "",
    duration: 5.6,
    delay: 2.4,
    distance: 4,
  },
];

function PlusGrid() {
  return (
    <svg
      aria-hidden="true"
      className="gs-plus-grid pointer-events-none absolute inset-y-0 right-0 h-full w-1/2"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 78% at 68% 32%, #000 0%, #000 42%, transparent 92%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 78% at 68% 32%, #000 0%, #000 42%, transparent 92%)",
      }}
    >
      <defs>
        <pattern
          id="get-started-plus-pattern"
          width="70"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M35 30v10M30 35h10"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#get-started-plus-pattern)"
      />
    </svg>
  );
}

function GetStartedTile({ tile }: { tile: Tile }) {
  const Icon = tile.icon;
  const variantClasses =
    tile.variant === "active"
      ? "border-[#8b7bff] bg-[#241d3d] shadow-[0_0_30px_rgba(124,92,232,0.45)]"
      : tile.variant === "empty"
        ? "border-white/10 bg-[#110e1a] opacity-60 shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]"
        : "border-white/10 bg-[#15111f] shadow-[inset_0_0_24px_rgba(0,0,0,0.28)]";

  const style = {
    gridRow: tile.row,
    gridColumn: tile.col,
    "--gs-duration": `${tile.duration}s`,
    "--gs-delay": `${tile.delay}s`,
    "--gs-distance": `${tile.distance}px`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`gs-tile relative flex aspect-square w-full items-center justify-center rounded-xl border lg:rounded-2xl ${variantClasses} ${
        tile.variant === "active" ? "gs-tile-active z-10" : ""
      }`}
    >
      {Icon ? (
        <Icon className={`h-auto w-[45%] ${tile.color}`} />
      ) : null}

      {tile.variant === "active" ? (
        <CursorArrow className="gs-cursor absolute -bottom-2 -right-2 z-20 h-auto w-[32%] max-w-9 drop-shadow-[0_5px_8px_rgba(0,0,0,0.4)]" />
      ) : null}
    </div>
  );
}

export default function GetStarted() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-title"
      className="relative isolate overflow-hidden bg-black px-5 py-[72px] text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 90% at 100% 0%, rgba(76,29,149,0.6) 0%, rgba(46,16,101,0.42) 36%, rgba(0,0,0,0) 76%)",
        }}
      />

      <PlusGrid />

      <div className="cp-reveal relative z-10 mx-auto grid w-full max-w-7xl items-center gap-x-16 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        <div className="max-w-[600px]">
          <h2
            id="get-started-title"
            className="text-[38px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-[64px]"
          >
            Ready to build something around your business?
          </h2>

          <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/80">
            Tell us what you need. We prepare a customized proposal with clear
            deliverables, based on your requirements. No fixed packages.
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-[60px] max-w-full items-center justify-center rounded-xl bg-white px-10 font-medium text-[#0b0714] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(124,92,232,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Request a proposal
          </a>

          <p className="mt-5 text-sm text-white/50">
            Free to ask. No obligation.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-14 w-full max-w-[760px] justify-self-end lg:mt-0"
        >
          <div className="grid w-full grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
            {tiles.map((tile) => (
              <GetStartedTile key={`${tile.row}-${tile.col}`} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
