import type { CSSProperties } from "react";
import Link from "next/link";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const copy = {
  eyebrow: "From idea to launch",
  title: "One clear path from requirement to launch",
  description:
    "We start with what you need, prepare a customized proposal, build it, connect the tools around it and launch it with you. The same team stays with you at every step.",
  cta: "Request a proposal",
  ctaHref: "/services/custom-proposal",
};

const steps = [
  { id: "requirement", label: "Requirement", icon: "requirement" },
  { id: "proposal", label: "Proposal", icon: "proposal" },
  { id: "build", label: "Build", icon: "build" },
  { id: "connect", label: "Connect", icon: "connect" },
  { id: "launch", label: "Launch", icon: "launch" },
] as const;

type Step = (typeof steps)[number];
type StepIconName = Step["icon"];

const ghostStyles: CSSVars[] = [
  {
    width: "var(--ap-ghost)",
    height: "var(--ap-ghost)",
    "--ap-float-dur": "5.5s",
    "--ap-float-delay": "0.2s",
    "--ap-float-dist": "-4px",
  },
  {
    width: "var(--ap-ghost)",
    height: "var(--ap-ghost)",
    "--ap-float-dur": "6.5s",
    "--ap-float-delay": "0.8s",
    "--ap-float-dist": "-5px",
  },
];

const spreadsheetStyle: CSSVars = {
  width: "var(--ap-sat)",
  height: "var(--ap-sat)",
  "--ap-float-dur": "6s",
  "--ap-float-delay": "0.3s",
  "--ap-float-dist": "-5px",
};

const paymentStyle: CSSVars = {
  width: "var(--ap-sat)",
  height: "var(--ap-sat)",
  "--ap-float-dur": "7s",
  "--ap-float-delay": "0.9s",
  "--ap-float-dist": "-4px",
};

function StepGlyph({
  name,
  className,
}: {
  name: StepIconName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "requirement":
      return (
        <svg {...common}>
          <path d="M8 7h9M8 12h9M8 17h5" />
          <path d="m4 7 1 1 2-2M4 12l1 1 2-2M4 17l1 1 2-2" />
        </svg>
      );
    case "proposal":
      return (
        <svg {...common}>
          <path d="M6 3.5h8l4 4v13H6z" />
          <path d="M14 3.5v4h4M9 12h6M9 16h5" />
        </svg>
      );
    case "build":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
    case "connect":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="m8 11 8-4M8 13l8 4" />
        </svg>
      );
    case "launch":
      return (
        <svg {...common}>
          <path d="M6 18 18 6M9 6h9v9" />
        </svg>
      );
    default:
      return null;
  }
}

function SpreadsheetIcon({ className }: { className?: string }) {
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
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 9h16M9 5v14M15 5v14" />
    </svg>
  );
}

function PaymentIcon({ className }: { className?: string }) {
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
      <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
      <path d="M3.5 10h17M7 14.5h3" />
    </svg>
  );
}

function OryntalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle
        cx="23"
        cy="25"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <circle cx="23" cy="25" r="3.5" fill="currentColor" />
      <circle cx="37" cy="11" r="3" fill="currentColor" />
    </svg>
  );
}

function CursorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden="true" className={className}>
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#ffffff"
        stroke="#140c33"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function DesktopNode({ step, index }: { step: Step; index: number }) {
  const isHub = step.id === "build";
  const style: CSSVars = {
    width: isHub ? "var(--ap-hub)" : "var(--ap-tile)",
    height: isHub ? "var(--ap-hub)" : "var(--ap-tile)",
    "--ap-lit-delay": `${index * 0.75}s`,
  };

  return (
    <div
      className={`ap-node ${
        isHub ? "ap-hub" : "ap-step"
      } relative z-10 flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl ${
        isHub ? "text-white" : "text-white/80"
      }`}
      style={style}
    >
      {isHub ? (
        <>
          <OryntalMark className="size-8" />
          <span className="text-[11px] font-medium leading-none">
            {step.label}
          </span>
        </>
      ) : (
        <>
          <StepGlyph name={step.icon} className="size-4 text-[#c4b5fd]" />
          <span className="text-[10px] font-medium leading-none">
            {step.label}
          </span>
        </>
      )}
    </div>
  );
}

function MobileNode({ step, index }: { step: Step; index: number }) {
  const isHub = step.id === "build";
  const style: CSSVars = {
    width: isHub ? "72px" : "56px",
    height: isHub ? "72px" : "56px",
    "--ap-lit-delay": `${index * 0.75}s`,
  };

  return (
    <span
      className={`ap-node ${
        isHub ? "ap-hub" : "ap-step"
      } grid place-items-center rounded-2xl`}
      style={style}
    >
      {isHub ? (
        <OryntalMark className="size-7 text-white" />
      ) : (
        <StepGlyph name={step.icon} className="size-5 text-[#c4b5fd]" />
      )}
    </span>
  );
}

export default function AboutProcess() {
  return (
    <section
      id="our-process"
      aria-labelledby="our-process-title"
      className="relative overflow-hidden bg-[#140c33] px-5 pb-16 pt-0 text-white sm:px-6 md:pb-24 lg:px-8"
    >
      <style>{`
        @keyframes ap-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ap-dash-x {
          to { background-position: 12px 0; }
        }
        @keyframes ap-dash-y {
          to { background-position: 0 12px; }
        }
        @keyframes ap-lit {
          0%, 8%, 100% {
            border-color: rgba(255, 255, 255, 0.12);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 rgba(139, 123, 255, 0);
          }
          12%, 20% {
            border-color: rgba(196, 181, 253, 0.8);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 0 28px rgba(139, 123, 255, 0.55);
          }
        }
        @keyframes ap-hub-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes ap-hub-glow {
          0%, 10%, 26%, 100% {
            box-shadow: 0 0 30px rgba(139, 123, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          }
          14%, 22% {
            box-shadow: 0 0 50px rgba(139, 123, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }
        @keyframes ap-travel {
          0% { left: 0%; opacity: 0; }
          6% { opacity: 1; }
          94% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes ap-travel-y {
          0% { top: 0%; opacity: 0; }
          6% { opacity: 1; }
          94% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ap-float {
          from { transform: translateY(0); }
          to { transform: translateY(var(--ap-float-dist, -5px)); }
        }
        @keyframes ap-cursor-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .ap-diagram {
          --ap-tile: 76px;
          --ap-hub: 112px;
          --ap-ghost: 38px;
          --ap-sat: 52px;
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .ap-diagram {
            --ap-tile: 61px;
            --ap-hub: 90px;
            --ap-ghost: 30px;
            --ap-sat: 42px;
          }
        }

        .ap-node {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .ap-hub {
          border-color: rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, #5b3de0 0%, #8b7bff 100%);
          box-shadow: 0 0 30px rgba(139, 123, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .ap-flow {
          background-image: repeating-linear-gradient(to right, rgba(196, 181, 253, 0.85) 0 3px, transparent 3px 12px);
          background-size: 12px 1px;
          background-repeat: repeat-x;
        }

        .ap-mobile-flow {
          background-image: repeating-linear-gradient(to bottom, rgba(196, 181, 253, 0.85) 0 3px, transparent 3px 12px);
          background-size: 1px 12px;
          background-repeat: repeat-y;
        }

        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .ap-card {
              animation: ap-fade-up linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 45%;
            }
          }

          .ap-flow {
            animation: ap-dash-x 3s linear infinite;
          }
          .ap-mobile-flow {
            animation: ap-dash-y 3s linear infinite;
          }
          .ap-step {
            animation: ap-lit 6s linear var(--ap-lit-delay, 0s) infinite;
          }
          .ap-hub {
            animation: ap-hub-pulse 4s ease-in-out infinite, ap-hub-glow 6s linear 1.5s infinite;
          }
          .ap-dot {
            animation: ap-travel 6s linear infinite;
          }
          .ap-mobile-dot {
            animation: ap-travel-y 6s linear infinite;
          }
          .ap-ghost,
          .ap-satellite {
            animation: ap-float var(--ap-float-dur, 6s) ease-in-out var(--ap-float-delay, 0s) infinite alternate;
          }
          .ap-cursor {
            animation: ap-cursor-float 4s ease-in-out infinite;
          }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-7xl">
        <div
          className="ap-card relative overflow-hidden rounded-3xl border border-white/5 p-6 transition-colors duration-300 hover:border-[#8b7bff]/30 sm:p-8 md:min-h-[480px] lg:p-11"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 100%, rgba(139, 123, 255, 0.35) 0%, rgba(139, 123, 255, 0) 72%), linear-gradient(180deg, #1a1438 0%, #2b2060 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-[320px] w-[320px] rounded-full bg-[#8b7bff]/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[720px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c4b5fd]">
                {copy.eyebrow}
              </p>
              <h2
                id="our-process-title"
                className="mt-4 text-[32px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-[42px] lg:text-[48px]"
              >
                {copy.title}
              </h2>
              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.6] text-white/65 sm:text-[18px]">
                {copy.description}
              </p>
            </div>

            <Link
              href={copy.ctaHref}
              className="group/link inline-flex w-fit shrink-0 items-center gap-2 text-[15px] font-semibold text-[#c4b5fd] underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1a1438] sm:text-base"
            >
              {copy.cta}
              <ArrowIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="ap-diagram relative mt-14 hidden h-[260px] w-full max-w-[1040px] items-center justify-between md:mx-auto md:flex"
          >
            <div className="ap-track absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
            <div className="ap-flow absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-60" />

            <div
              className="ap-ghost rounded-xl border border-dashed border-white/10 bg-white/[0.02]"
              style={ghostStyles[0]}
            />

            {steps.map((step, index) => (
              <DesktopNode key={step.id} step={step} index={index} />
            ))}

            <div
              className="ap-ghost rounded-xl border border-dashed border-white/10 bg-white/[0.02]"
              style={ghostStyles[1]}
            />

            <span className="ap-dot absolute left-0 top-1/2 z-20 size-2.5 -translate-y-1/2 rounded-full bg-[#c4b5fd] shadow-[0_0_16px_rgba(196,181,253,0.9)]" />

            <svg
              viewBox="0 0 1000 260"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <path
                d="M400 62 L455 100 L492 124"
                fill="none"
                stroke="rgba(196, 181, 253, 0.35)"
                strokeWidth="1"
                strokeDasharray="3 7"
              />
              <path
                d="M600 198 L545 160 L508 136"
                fill="none"
                stroke="rgba(196, 181, 253, 0.35)"
                strokeWidth="1"
                strokeDasharray="3 7"
              />
            </svg>

            <div className="absolute left-[40%] top-[4%] z-20 -translate-x-1/2">
              <div
                className="ap-satellite grid place-items-center rounded-2xl border border-white/10 bg-[#241a52] text-[#c4b5fd] shadow-[0_14px_30px_rgba(8,4,28,0.4)]"
                style={spreadsheetStyle}
              >
                <SpreadsheetIcon className="size-5" />
              </div>
            </div>

            <div className="absolute bottom-[4%] left-[60%] z-20 -translate-x-1/2">
              <div
                className="ap-satellite grid place-items-center rounded-2xl border border-white/10 bg-[#241a52] text-[#c4b5fd] shadow-[0_14px_30px_rgba(8,4,28,0.4)]"
                style={paymentStyle}
              >
                <PaymentIcon className="size-5" />
              </div>
            </div>

            <CursorIcon className="ap-cursor absolute left-[54%] top-[58%] z-30 hidden h-auto w-5 lg:block" />
          </div>

          <div aria-hidden="true" className="relative mt-10 md:hidden">
            <div className="ap-mobile-track absolute bottom-7 left-9 top-7 w-px -translate-x-1/2 bg-white/25">
              <span className="ap-mobile-flow absolute inset-0 opacity-60" />
              <span className="ap-mobile-dot absolute left-1/2 top-0 z-20 size-2 -translate-x-1/2 rounded-full bg-[#c4b5fd] shadow-[0_0_14px_rgba(196,181,253,0.9)]" />
            </div>

            <ul className="relative space-y-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center gap-4">
                  <span className="flex w-[72px] shrink-0 justify-center">
                    <MobileNode step={step} index={index} />
                  </span>
                  <span className="text-[15px] font-medium text-white/80 sm:text-base">
                    {step.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
