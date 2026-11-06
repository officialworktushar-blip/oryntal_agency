import Link from "next/link";
import type { CSSProperties } from "react";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const CARDS = [
  {
    tag: "Connected to your tools",
    title: "Works with the tools you already use",
    description:
      "We connect payment gateways, delivery partners, spreadsheets, chat tools and the other apps you already use, so your work flows in one place instead of many.",
    linkLabel: "See examples",
    href: "/case-studies",
    diagram: "hub",
  },
  {
    tag: "Simple to start",
    title: "Tell us what you need",
    description:
      "Share your requirement in a few lines. We prepare a customized proposal with clear deliverables, based on your needs. There are no fixed packages.",
    linkLabel: "Request a proposal",
    href: "/services/custom-proposal",
    diagram: "form",
  },
];

const TYPING_PHRASES = [
  "I need a website for my business",
  "Automate my customer replies",
  "Find me a reliable supplier",
];

const CHECK_ITEMS = ["Free to ask", "No obligation", "Clear deliverables"];

const ICON_STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#E6E0FF",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function CardIcon({ name, className }: { name: string; className?: string }) {
  if (name === "chat") {
    return (
      <svg {...ICON_STROKE} className={className}>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1L3 20l1.2-4.6A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
    );
  }
  if (name === "sheet") {
    return (
      <svg {...ICON_STROKE} className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M4 15h16M10 4v16M15 4v16" />
      </svg>
    );
  }
  if (name === "truck") {
    return (
      <svg {...ICON_STROKE} className={className}>
        <path d="M2 6h12v10H2z" />
        <path d="M14 9h4l3 3v4h-7" />
        <circle cx="6.5" cy="17.5" r="1.6" />
        <circle cx="16.5" cy="17.5" r="1.6" />
      </svg>
    );
  }
  return (
    <svg {...ICON_STROKE} className={className}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

const TILE_POSITIONS = {
  hub: { left: "50%", top: "50%" },
  tl: { left: "28.46%", top: "22.5%" },
  tr: { left: "71.54%", top: "22.5%" },
  left: { left: "12.31%", top: "50%" },
  right: { left: "87.69%", top: "50%" },
  bl: { left: "28.85%", top: "81.88%" },
  br: { left: "71.15%", top: "81.88%" },
} as const;

const DIAGRAM_LINES = [
  "M206 160 L83 160",
  "M314 160 L437 160",
  "M217 127 L196 109 L183 99",
  "M303 126 L325 110 L346 93",
  "M220 197 L195 222 L168 245",
  "M300 197 L322 222 L342 236",
];

function tileClass(extra: string) {
  return `absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 ${extra}`;
}

function HubDiagram() {
  const tiles: {
    pos: keyof typeof TILE_POSITIONS;
    size: string;
    sizeClass: string;
    icon?: string;
    iconClass?: string;
    float: string;
  }[] = [
    { pos: "tl", size: "h-[88px] w-[88px]", sizeClass: "hww-t-a", icon: "card", iconClass: "h-9 w-9", float: "7s" },
    { pos: "tr", size: "h-[66px] w-[66px]", sizeClass: "hww-t-b", icon: "chat", iconClass: "h-7 w-7", float: "6s" },
    { pos: "left", size: "h-[38px] w-[38px]", sizeClass: "hww-t-c", float: "8s" },
    { pos: "right", size: "h-[38px] w-[38px]", sizeClass: "hww-t-c", float: "5.5s" },
    { pos: "bl", size: "h-[50px] w-[50px]", sizeClass: "hww-t-d", icon: "sheet", iconClass: "h-6 w-6", float: "7.5s" },
    { pos: "br", size: "h-[76px] w-[76px]", sizeClass: "hww-t-e", icon: "truck", iconClass: "h-8 w-8", float: "6.5s" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[13/8] w-full max-w-[520px]"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 320"
        preserveAspectRatio="xMidYMid meet"
      >
        {DIAGRAM_LINES.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth="1"
          />
        ))}
        {DIAGRAM_LINES.map((d) => (
          <path
            key={`${d}-flow`}
            d={d}
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="1"
            strokeDasharray="3 9"
            className="hww-flow"
          />
        ))}
      </svg>

      <div className="absolute inset-0">
        <div
          className={tileClass(
            "left-1/2 top-1/2 flex h-[108px] w-[108px] items-center justify-center rounded-2xl border border-white/30 hww-t-hub hww-hub-pulse",
          )}
          style={{
            background:
              "linear-gradient(160deg, #5b3de0 0%, #8b7bff 100%)",
            boxShadow: "0 0 40px rgba(124,92,232,0.5)",
          }}
        >
          <span className="flex h-1/2 w-1/2 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <circle
                cx="56"
                cy="66"
                r="38"
                fill="none"
                stroke="#ffffff"
                strokeWidth="20"
              />
              <circle cx="98" cy="16" r="10" fill="#ffffff" />
            </svg>
          </span>
        </div>

        {tiles.map((tile) => (
          <div
            key={tile.pos}
            className={tileClass(
              `${tile.size} ${tile.sizeClass} hww-float flex items-center justify-center`,
            )}
            style={{
              ...TILE_POSITIONS[tile.pos],
              background:
                "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.10) 0%, rgba(58,45,120,0.6) 65%)",
              "--fd": tile.float,
              "--fdel": `${(tile.pos.length * 1.3) % 3}s`,
            } as CSSVars}
          >
            {tile.icon ? (
              <CardIcon name={tile.icon} className={tile.iconClass} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormDiagram() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[560px] pt-4"
    >
      <div className="absolute -inset-8 -z-10 rounded-full bg-[#8b7bff]/25 blur-3xl" />

      <div className="relative rounded-[28px] border-2 border-[#8b7bff] bg-[#2a2352]/70 p-6 md:p-7">
        <span className="absolute -top-3 left-6 rounded-md bg-[#6a4fe0] px-3 py-1 text-[13px] font-medium text-white">
          Proposal form
        </span>

        <span className="absolute left-1/2 top-0 h-3 w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8b7bff] bg-white" />
        <span className="absolute bottom-0 left-1/2 h-3 w-[60px] -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#8b7bff] bg-white" />
        <span className="absolute left-0 top-1/2 h-[60px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8b7bff] bg-white" />
        <span className="absolute right-0 top-1/2 h-[60px] w-3 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8b7bff] bg-white" />

        <div className="flex h-16 items-center rounded-xl border border-white/10 bg-[#1d1840] pl-4 pr-2 sm:pl-5">
          <div className="grid min-w-0 flex-1 grid-cols-1 overflow-hidden">
            {TYPING_PHRASES.map((phrase, phraseIndex) => (
              <span
                key={phrase}
                className="hww-phrase col-start-1 row-start-1 whitespace-nowrap text-[16px] text-white/80 sm:text-[19px]"
                style={
                  {
                    "--w": `${phrase.length}ch`,
                    animationDelay: `${phraseIndex * 4}s`,
                  } as CSSVars
                }
              >
                {phrase}
                <span className="ml-0.5 inline-block h-[1.05em] w-[3px] translate-y-[0.18em] bg-[#8b7bff] align-baseline hww-caret" />
              </span>
            ))}
          </div>
          <span className="ml-auto flex h-12 shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#5b3de0] to-[#8b7bff] px-3 text-[14px] font-medium text-white sm:px-[18px] sm:text-[18px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 sm:h-5 sm:w-5"
            >
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              <path d="M22 2 11 13" />
            </svg>
            Get a proposal
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-2">
          {CHECK_ITEMS.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 text-[14px] text-white/60 sm:text-[16px]"
            >
              <CheckIcon className="size-4 text-[#8b7bff]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute -bottom-3 -right-2 z-10 h-9 w-9 hww-cursor"
      >
        <path
          d="M5.5 3.5 19 11.6l-6.4 1.7-2.9 6.2-4.2-15.9Z"
          fill="#ffffff"
          stroke="#1b1b22"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function AboutHowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, #0d0820 0%, #140c33 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      <style>{`
        @keyframes hww-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes hww-float-y {
          from { translate: 0 0; }
          to { translate: 0 -5px; }
        }
        @keyframes hww-pulse {
          from { scale: 1; }
          to { scale: 1.04; }
        }
        @keyframes hww-dash {
          to { stroke-dashoffset: -12; }
        }
        @keyframes hww-type {
          0% { width: 0; opacity: 1; animation-timing-function: steps(30); }
          20% { width: var(--w); opacity: 1; }
          30% { width: var(--w); opacity: 1; }
          33.33% { width: var(--w); opacity: 0; }
          33.34%, 100% { width: 0; opacity: 0; }
        }
        @keyframes hww-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .hww-card {
              animation: hww-fade-up 0.7s ease-out both;
              animation-timeline: view();
              animation-range: entry 0% entry 40%;
            }
            .hww-card:nth-of-type(2) {
              animation-range: entry 10% entry 50%;
            }
          }
          .hww-float {
            animation: hww-float-y var(--fd, 6s) ease-in-out var(--fdel, 0s) infinite alternate;
          }
          .hww-hub-pulse {
            animation: hww-pulse 4s ease-in-out infinite alternate;
          }
          .hww-flow {
            animation: hww-dash 3s linear infinite;
          }
          .hww-phrase {
            width: 0;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            opacity: 0;
            animation: hww-type 12s linear infinite;
          }
          .hww-caret {
            animation: hww-blink 1s steps(1) infinite;
          }
          .hww-cursor {
            animation: hww-float-y 4s ease-in-out infinite alternate;
          }
        }
        @media (max-width: 480px) {
          .hww-t-hub { width: 81px !important; height: 81px !important; }
          .hww-t-a { width: 66px !important; height: 66px !important; }
          .hww-t-b { width: 50px !important; height: 50px !important; }
          .hww-t-c { width: 29px !important; height: 29px !important; }
          .hww-t-d { width: 38px !important; height: 38px !important; }
          .hww-t-e { width: 57px !important; height: 57px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hww-phrase {
            animation: none;
            width: auto;
            max-width: none;
            overflow: visible;
            opacity: 1;
          }
          .hww-phrase:nth-child(2),
          .hww-phrase:nth-child(3) {
            display: none;
          }
          .hww-caret { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#8b7bff]">
            HOW WE WORK
          </p>
          <h2 className="mt-3 text-[34px] font-light leading-[1.1] tracking-[-0.04em] text-white md:text-[56px]">
            Easy to start. Easy to connect.
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[16px] leading-relaxed text-white/70 md:text-[18px]">
            Tell us what you need, and we connect everything around it.
          </p>
        </div>

        <div className="mt-14 grid gap-[30px] md:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="hww-card group relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#1a1438] to-[#2b2060] p-6 transition-colors duration-300 hover:border-[#8b7bff]/30 md:min-h-[460px] md:p-8 lg:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background:
                    "radial-gradient(60% 90% at 50% 100%, rgba(139,123,255,0.35) 0%, rgba(139,123,255,0) 70%)",
                  filter: "blur(30px)",
                }}
              />

              <div className="relative flex h-full flex-col md:flex-row md:items-center md:gap-8 lg:gap-10">
                <div className="md:min-w-0 md:flex-1">
                  <span className="inline-flex w-fit rounded-full bg-white/10 px-3.5 py-2 text-[14px] text-white">
                    {card.tag}
                  </span>
                  <h3 className="mt-6 text-[26px] font-normal leading-tight tracking-[-0.02em] text-white md:text-[30px] lg:text-[34px]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[620px] text-[16px] leading-[1.55] text-white/75 md:text-[18px]">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="group/link mt-5 inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#c4b5fd] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1438]"
                  >
                    {card.linkLabel}
                    <ArrowIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>

                <div className="relative mt-10 md:mt-0 md:w-[44%] md:shrink-0 lg:w-[46%]">
                  {card.diagram === "hub" ? <HubDiagram /> : <FormDiagram />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
