import type { ReactNode } from "react";

function BuildCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="cp-reveal group flex h-full flex-col rounded-3xl border border-white/5 bg-gradient-to-b from-[#17122e] to-[#2b2060] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7c5ce8]/40 hover:shadow-[0_24px_70px_rgba(106,79,224,0.22)]">
      <h3 className="text-[28px] font-light leading-tight tracking-[-0.02em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-[18px] leading-relaxed text-white/70">
        {description}
      </p>
      <div className="mt-8 flex flex-1 items-end justify-center">{children}</div>
    </article>
  );
}

function SolutionDiagram() {
  return (
    <svg
      viewBox="0 0 360 260"
      role="img"
      aria-label="A custom solution connected to a website, mobile app, payments and dashboard"
      className="h-auto w-full max-w-[360px] font-sans"
    >
      <rect
        x="24"
        y="87"
        width="76"
        height="76"
        rx="20"
        fill="#181334"
        stroke="#6a4fe0"
        strokeWidth="1.5"
      />
      <circle
        cx="62"
        cy="125"
        r="17"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="2"
      />
      <path
        d="M62 116v18M53 125h18"
        stroke="#9b8cff"
        strokeWidth="1"
        opacity="0.28"
      />

      <path
        d="M100 125 C145 125 155 53 216 53"
        fill="none"
        stroke="#6a4fe0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 125 C145 125 165 101 216 101"
        fill="none"
        stroke="#6a4fe0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 125 C150 125 165 149 216 149"
        fill="none"
        stroke="#6a4fe0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 125 C145 125 155 197 216 197"
        fill="none"
        stroke="#6a4fe0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle cx="216" cy="53" r="2.4" fill="#6a4fe0" />
      <circle cx="216" cy="101" r="2.4" fill="#6a4fe0" />
      <circle cx="216" cy="149" r="2.4" fill="#6a4fe0" />
      <circle cx="216" cy="197" r="2.4" fill="#6a4fe0" />

      <g>
        <rect
          x="216"
          y="34"
          width="120"
          height="38"
          rx="19"
          fill="#0f0b21"
          stroke="#2b2354"
        />
        <circle
          cx="238"
          cy="53"
          r="7"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="1.3"
        />
        <path
          d="M231 53h14M238 46c3.4 4 3.4 10 0 14M238 46c-3.4 4-3.4 10 0 14"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <text x="256" y="57.5" fill="#d9d7e8" fontSize="12.5" fontWeight="500">
          Website
        </text>
      </g>

      <g>
        <rect
          x="216"
          y="82"
          width="120"
          height="38"
          rx="19"
          fill="#0f0b21"
          stroke="#2b2354"
        />
        <rect
          x="233"
          y="94"
          width="10"
          height="14"
          rx="2"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <path d="M236 105h4" stroke="#9b8cff" strokeWidth="1.2" />
        <text x="256" y="105.5" fill="#d9d7e8" fontSize="12.5" fontWeight="500">
          Mobile app
        </text>
      </g>

      <g>
        <rect
          x="216"
          y="130"
          width="120"
          height="38"
          rx="19"
          fill="#0f0b21"
          stroke="#2b2354"
        />
        <rect
          x="231"
          y="143.5"
          width="14"
          height="11"
          rx="2"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <path
          d="M231 147h14M234 151h4"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <text x="256" y="153.5" fill="#d9d7e8" fontSize="12.5" fontWeight="500">
          Payments
        </text>
      </g>

      <g>
        <rect
          x="216"
          y="178"
          width="120"
          height="38"
          rx="19"
          fill="#0f0b21"
          stroke="#2b2354"
        />
        <rect
          x="232"
          y="191"
          width="12"
          height="12"
          rx="2"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <path
          d="M235 194h3M235 197.5h3M235 201h3M241 194v7"
          stroke="#9b8cff"
          strokeWidth="1.2"
        />
        <text x="256" y="201.5" fill="#d9d7e8" fontSize="12.5" fontWeight="500">
          Dashboard
        </text>
      </g>
    </svg>
  );
}

function AutomationDiagram() {
  return (
    <svg
      viewBox="0 0 360 260"
      role="img"
      aria-label="A workflow branching into email, payment, report and delivery actions"
      className="h-auto w-full max-w-[360px] font-sans"
    >
      <rect
        x="142"
        y="16"
        width="76"
        height="62"
        rx="18"
        fill="#181334"
        stroke="#6a4fe0"
        strokeWidth="1.5"
      />
      <circle cx="168" cy="47" r="4" fill="#9b8cff" />
      <circle cx="192" cy="37" r="4" fill="#9b8cff" />
      <circle cx="192" cy="57" r="4" fill="#9b8cff" />
      <path
        d="m172 45 8-6M172 49l8 6"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M180 78v24M55 102h250M55 102v50M138 102v50M221 102v50M304 102v50"
        fill="none"
        stroke="#6a4fe0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle cx="55" cy="174" r="23" fill="#0f0b21" stroke="#2b2354" />
      <rect
        x="46"
        y="167"
        width="18"
        height="14"
        rx="2.5"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
      />
      <path
        d="m47 169 8 6 8-6"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      <circle cx="138" cy="174" r="23" fill="#0f0b21" stroke="#2b2354" />
      <rect
        x="129"
        y="168"
        width="18"
        height="12"
        rx="2.5"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
      />
      <path
        d="M129 172h18M132 176h4"
        stroke="#9b8cff"
        strokeWidth="1.3"
      />

      <circle cx="221" cy="174" r="23" fill="#0f0b21" stroke="#2b2354" />
      <rect
        x="212"
        y="166"
        width="18"
        height="16"
        rx="2.5"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
      />
      <path
        d="M216 179v-5M221 179v-8M226 179v-3"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <circle cx="304" cy="174" r="23" fill="#0f0b21" stroke="#2b2354" />
      <path
        d="M294 168h12v12h-12zM306 171h5l3 4v5h-8z"
        fill="none"
        stroke="#9b8cff"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="298" cy="182" r="2.5" fill="#0f0b21" stroke="#9b8cff" />
      <circle cx="309" cy="182" r="2.5" fill="#0f0b21" stroke="#9b8cff" />
    </svg>
  );
}

function ChatDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      role="img"
      aria-label="A chat and voice interface with WhatsApp"
      className="h-auto w-full max-w-[360px] font-sans"
    >
      <rect
        x="24"
        y="46"
        width="312"
        height="98"
        rx="30"
        fill="#17122e"
        stroke="#6a4fe0"
        strokeWidth="1.5"
      />

      <circle cx="112" cy="95" r="23" fill="#241a50" stroke="#6a4fe0" />
      <path
        d="M104 87h16a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-8l-5 4v-4h-3a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Z"
        fill="none"
        stroke="#d9d7e8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <circle cx="180" cy="95" r="23" fill="#25D366" />
      <path
        d="M172 86c0 11 9 20 20 20l3.5-4-6-6-4.5 2.5c-4-2-7-5-9-9l2.5-4.5-6-6-4 3.5Z"
        fill="#ffffff"
      />

      <circle cx="248" cy="95" r="23" fill="#241a50" stroke="#6a4fe0" />
      <rect
        x="244"
        y="84"
        width="8"
        height="14"
        rx="4"
        fill="none"
        stroke="#d9d7e8"
        strokeWidth="1.6"
      />
      <path
        d="M240 95a8 8 0 0 0 16 0M248 103v4M244 107h8"
        fill="none"
        stroke="#d9d7e8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M286 132l46 17-20 5-6 19-20-41Z"
        fill="#2b2060"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="relative overflow-hidden px-5 py-20 sm:px-6 md:py-28 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #120d26 0%, #1d1544 58%, #2a1f5c 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(124,92,232,0.34) 0%, rgba(124,92,232,0.09) 46%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <h2 className="cp-reveal mx-auto max-w-3xl text-center text-4xl font-light tracking-[-0.03em] text-white sm:text-5xl">
          What ORYNTAL can build for you
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <BuildCard
            title="Build your own solution"
            description="Tell us the task in plain language, and we plan and build a custom tool around it."
          >
            <SolutionDiagram />
          </BuildCard>

          <BuildCard
            title="Automate repetitive work"
            description="Set it once, and keep work moving even while you sleep."
          >
            <AutomationDiagram />
          </BuildCard>

          <BuildCard
            title="Turn chats into a business tool"
            description="Use WhatsApp or voice to trigger real actions and workflows."
          >
            <ChatDiagram />
          </BuildCard>
        </div>
      </div>
    </section>
  );
}
