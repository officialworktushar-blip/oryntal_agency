import type { CSSProperties, ReactNode } from "react";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const sectionCopy = {
  heading: "Why Oryntal?",
  subtext:
    "A small, hands-on team that builds around your needs, from the first conversation to launch.",
};

const cardCopy = [
  {
    title: "Built around your business",
    description:
      "No fixed packages. We plan every solution around your requirements, then prepare a customized proposal.",
  },
  {
    title: "One team, start to finish",
    description:
      "Websites, apps, automation, chat and voice tools and integrations, all from the same people, so nothing gets lost between vendors.",
  },
  {
    title: "Replies that never sleep",
    description:
      "Chat and voice tools answer your customers on WhatsApp and your website at any hour, using your own business information.",
  },
  {
    title: "Everything in one place",
    description:
      "Orders, bookings, reports and updates in one simple dashboard your team can actually use.",
  },
] as const;

const proposalCopy = {
  panel: "Your proposal",
  tiles: [
    { label: "Scope", value: "Custom" },
    { label: "Deliverables", value: "Agreed" },
  ],
};

const proposalBars = [38, 62, 48, 82, 58] as const;

const teamCopy = {
  project: "Your project",
  status: "On track",
  action: "Launch",
  team: "Same team throughout",
};

const repliesCopy = {
  sent: "Reply sent",
  channel: "Via WhatsApp",
  speed: "Instant",
  bubble: "Your order is on its way",
};

const dashboardCopy = {
  menu: ["Home", "Orders", "Bookings", "Reports", "Customers", "Payments"],
};

function WalletIcon({ className }: { className?: string }) {
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
      <path d="M3.5 8A2.5 2.5 0 0 1 6 5.5h12a2 2 0 0 1 2 2v1" />
      <path d="M3.5 8v9A2.5 2.5 0 0 0 6 19.5h13a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 19 9.5H6A2.5 2.5 0 0 1 3.5 8Z" />
      <circle cx="16.5" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WindowIcon({ className }: { className?: string }) {
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
      <path d="M3.5 9h17" />
      <circle cx="6.5" cy="6.75" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="9" cy="6.75" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
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
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function GearsIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
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

function HomeIcon({ className }: { className?: string }) {
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
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.5Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </svg>
  );
}

function OrdersIcon({ className }: { className?: string }) {
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
      <path d="M4.5 7.5h15v12h-15z" />
      <path d="M4.5 7.5 12 3.5l7.5 4" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

function BookingsIcon({ className }: { className?: string }) {
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
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function ReportsIcon({ className }: { className?: string }) {
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
      <path d="M5 19v-8M12 19V5M19 19v-5" />
    </svg>
  );
}

function CustomersIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function PaymentsIcon({ className }: { className?: string }) {
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
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M7 14.5h3" />
    </svg>
  );
}

function CursorArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden="true" className={className}>
      <path
        d="M4.5 2.5 21 14.5l-7.2 1.4-3.3 6.6L4.5 2.5Z"
        fill="#ffffff"
        stroke="#141018"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OryntalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle
        cx="16"
        cy="16"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
    </svg>
  );
}

function DashboardMenuIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "Home":
      return <HomeIcon className={className} />;
    case "Orders":
      return <OrdersIcon className={className} />;
    case "Bookings":
      return <BookingsIcon className={className} />;
    case "Reports":
      return <ReportsIcon className={className} />;
    case "Customers":
      return <CustomersIcon className={className} />;
    case "Payments":
      return <PaymentsIcon className={className} />;
    default:
      return null;
  }
}

function CardShell({
  index,
  title,
  description,
  children,
}: {
  index: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const style: CSSVars = {
    "--aw-i": index,
    background:
      "radial-gradient(120% 55% at 50% 100%, rgba(106,79,224,0.45) 0%, rgba(106,79,224,0) 72%), linear-gradient(180deg, #0c0c0f 0%, #0c0c0f 45%, #2a1f6e 100%)",
  };

  return (
    <article
      className="aw-card group relative min-h-[380px] overflow-hidden rounded-3xl border border-white/5 p-6 transition-colors duration-300 hover:border-[#8b7bff]/30 sm:min-h-[500px] sm:p-8"
      style={style}
    >
      <div className="relative z-10">
        <h3 className="text-[24px] font-normal leading-[1.1] tracking-[-0.02em] text-white sm:text-[28px]">
          {title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.5] text-white/70 sm:text-[19px]">
          {description}
        </p>
      </div>
      {children}
    </article>
  );
}

function ProposalMockup() {
  return (
    <div
      aria-hidden="true"
      className="aw-mockup absolute inset-x-0 bottom-[-18px] flex justify-start pl-2 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 sm:pl-4"
    >
      <div className="w-[90%] max-w-[280px] rounded-2xl border border-white/10 bg-[#1c1c22] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <WalletIcon className="size-4 text-[#8b7bff]" />
          <span className="text-[12px] text-white/70 sm:text-[14px]">
            {proposalCopy.panel}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {proposalCopy.tiles.map((tile) => (
            <div key={tile.label} className="rounded-xl bg-[#2a2a31] p-3.5">
              <p className="text-[10px] text-white/45 sm:text-[11px]">
                {tile.label}
              </p>
              <p className="mt-1 text-[21px] font-medium leading-none text-white sm:text-[26px]">
                {tile.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex h-[68px] items-end gap-1.5 sm:h-[84px]">
          {proposalBars.map((height, barIndex) => {
            const style: CSSVars = {
              height: `${height}%`,
              "--aw-bar-i": barIndex,
              background:
                barIndex === 3
                  ? "linear-gradient(180deg, #b9a8ff 0%, #8b7bff 100%)"
                  : "linear-gradient(180deg, #8b7bff 0%, #6a4fe0 100%)",
            };
            return (
              <span
                key={barIndex}
                className="aw-bar flex-1 rounded-md"
                style={style}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeamMockup() {
  const ghostIcons = [WindowIcon, PhoneIcon, GearsIcon];

  return (
    <div
      aria-hidden="true"
      className="aw-mockup absolute inset-x-0 bottom-[-16px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
    >
      <div className="mx-auto w-[92%] max-w-[300px]">
        <div className="flex justify-center gap-2.5">
          {ghostIcons.map((Icon, ghostIndex) => (
            <div
              key={ghostIndex}
              className="grid size-12 place-items-center rounded-xl border border-white/5 bg-[#1a1a20] text-white/25 sm:size-14"
            >
              <Icon className="size-4 sm:size-5" />
            </div>
          ))}
        </div>

        <div className="-mt-5 rounded-2xl border border-white/10 bg-[#1c1c22] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.5)] sm:p-4">
          <div
            className="rounded-2xl"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(124,92,232,0.16) 0%, rgba(28,28,34,0) 55%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="grid size-9 shrink-0 place-items-center rounded-xl text-white sm:size-10"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
                }}
              >
                <WindowIcon className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold leading-tight text-white sm:text-[16px]">
                  {teamCopy.project}
                </p>
                <span className="mt-1 inline-flex rounded-full bg-[#10b981]/20 px-2 py-0.5 text-[10px] font-medium text-[#34d399] sm:text-[11px]">
                  {teamCopy.status}
                </span>
              </div>
              <span className="ml-auto shrink-0 rounded-lg bg-[#6a4fe0] px-2.5 py-1.5 text-[11px] font-medium text-white sm:text-[12px]">
                {teamCopy.action}
              </span>
            </div>

            <div className="mt-3.5 flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {[0, 1, 2].map((circle) => (
                  <span
                    key={circle}
                    className="size-5 rounded-full border border-[#1c1c22] bg-white/20 sm:size-6"
                  />
                ))}
              </div>
              <span className="text-[11px] text-white/50 sm:text-[13px]">
                {teamCopy.team}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RepliesMockup() {
  return (
    <div
      aria-hidden="true"
      className="aw-mockup absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
    >
      <div className="mx-auto flex w-[92%] max-w-[300px] flex-col items-center">
        <div className="aw-toast flex w-full max-w-[260px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#1c1c22] px-3 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#10b981]">
            <CheckIcon className="size-3.5 text-white" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] leading-tight text-white sm:text-[14px]">
              {repliesCopy.sent}
            </span>
            <span className="block text-[10px] leading-tight text-white/50 sm:text-[12px]">
              {repliesCopy.channel}
            </span>
          </span>
          <span className="ml-auto shrink-0 text-[12px] text-[#34d399] sm:text-[14px]">
            {repliesCopy.speed}
          </span>
        </div>

        <div className="relative mt-3 h-[130px] w-[180px] translate-y-[22px]">
          <div className="absolute inset-0 rotate-[8deg] rounded-2xl border border-white/5 bg-[#241a52]/90" />
          <div className="absolute inset-0 rotate-[-12deg]">
            <div className="aw-bubble h-full w-full rounded-2xl bg-gradient-to-br from-[#5b3de0] to-[#8b7bff] p-4 shadow-[0_24px_60px_rgba(91,61,224,0.45)]">
              <p className="text-[18px] font-bold leading-[1.15] text-white sm:text-[22px]">
                {repliesCopy.bubble}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div
      aria-hidden="true"
      className="aw-mockup absolute bottom-[-26px] right-[-10%] w-[112%] max-w-[430px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
    >
      <div style={{ perspective: "900px" }}>
        <div
          className="rounded-2xl border border-white/10 bg-[#16161b] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
          style={{ transform: "rotateY(-12deg) rotateZ(-4deg)" }}
        >
          <div className="flex gap-3">
            <div className="w-[46%] shrink-0">
              <OryntalMark className="size-5 text-white/90" />
              <ul className="mt-3.5 space-y-1">
                {dashboardCopy.menu.map((item) => {
                  const active = item === "Reports";
                  return (
                    <li
                      key={item}
                      className={`relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] sm:text-[13px] ${
                        active ? "bg-[#5b3de0] text-white" : "text-white/70"
                      }`}
                    >
                      <DashboardMenuIcon
                        name={item}
                        className="size-3.5 shrink-0"
                      />
                      <span className="truncate">{item}</span>
                      {active ? (
                        <CursorArrow className="aw-cursor absolute -bottom-1 -right-2 h-auto w-4 sm:w-5" />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="min-h-[150px] flex-1 rounded-xl bg-[#22222a] sm:min-h-[180px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutWhyOryntal() {
  return (
    <section
      id="why-oryntal"
      aria-labelledby="why-oryntal-title"
      className="relative isolate overflow-hidden border-t border-white/5 bg-[#050507] px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8"
    >
      <style>{`
        @keyframes aw-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes aw-bar-grow {
          from { transform: scaleY(0.06); }
          to { transform: scaleY(1); }
        }
        @keyframes aw-pop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes aw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes aw-cursor-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .aw-bar {
          transform-origin: bottom;
        }

        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .aw-card {
              animation: aw-fade-up linear both;
              animation-timeline: view();
              animation-range: entry calc(var(--aw-i, 0) * 6%) entry calc(55% + var(--aw-i, 0) * 6%);
            }
            .aw-bar {
              animation: aw-bar-grow linear both;
              animation-timeline: view();
              animation-range: entry calc(15% + var(--aw-bar-i, 0) * 4%) entry calc(80% + var(--aw-bar-i, 0) * 4%);
            }
            .aw-toast {
              animation: aw-pop linear both;
              animation-timeline: view();
              animation-range: entry 10% entry 60%;
            }
          }
          .aw-bubble {
            animation: aw-float 5s ease-in-out infinite;
          }
          .aw-cursor {
            animation: aw-cursor-float 4s ease-in-out infinite;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[min(760px,90vw)] -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,31,143,0.25) 0%, rgba(59,31,143,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h2
            id="why-oryntal-title"
            className="text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl sm:tracking-[-0.04em] lg:text-[64px]"
          >
            {sectionCopy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
            {sectionCopy.subtext}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <CardShell
            index={0}
            title={cardCopy[0].title}
            description={cardCopy[0].description}
          >
            <ProposalMockup />
          </CardShell>
          <CardShell
            index={1}
            title={cardCopy[1].title}
            description={cardCopy[1].description}
          >
            <TeamMockup />
          </CardShell>
          <CardShell
            index={2}
            title={cardCopy[2].title}
            description={cardCopy[2].description}
          >
            <RepliesMockup />
          </CardShell>
          <CardShell
            index={3}
            title={cardCopy[3].title}
            description={cardCopy[3].description}
          >
            <DashboardMockup />
          </CardShell>
        </div>
      </div>
    </section>
  );
}
