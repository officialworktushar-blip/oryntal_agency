"use client";

import { m } from "framer-motion";
import { Check, FileText, Lock, Send, Sparkles } from "lucide-react";

export type VisualId =
  | "website"
  | "leads"
  | "connect"
  | "automate"
  | "secure"
  | "register"
  | "setup";

type VisualProps = {
  active: boolean;
  reduced: boolean;
};

const FRAME =
  "relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5";

function fade(i: number, active: boolean, reduced: boolean) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : 4 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 4 },
    transition: {
      duration: reduced ? 0.15 : 0.34,
      delay: reduced ? 0 : i * 0.09,
      ease: "easeOut" as const,
    },
  };
}

/** A browser window that assembles itself, piece by piece. */
function WebsiteVisual({ active, reduced }: VisualProps) {
  return (
    <div className={FRAME} aria-hidden="true">
      <m.div
        {...fade(0, active, reduced)}
        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1"
      >
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="ml-1.5 h-1.5 flex-1 rounded-full bg-white/10" />
      </m.div>

      <m.div {...fade(1, active, reduced)} className="mt-2 flex h-[calc(100%-34px)] gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="h-2 w-3/5 rounded-full bg-white/45" />
          <span className="h-1.5 w-4/5 rounded-full bg-white/20" />
          <span className="h-1.5 w-2/3 rounded-full bg-white/20" />
          <span className="mt-1 h-4 w-14 rounded-md bg-[#7B4DFF]/80" />
          <span className="mt-auto grid grid-cols-2 gap-1.5">
            <span className="h-6 rounded-md bg-white/10" />
            <span className="h-6 rounded-md bg-white/10" />
          </span>
        </div>
        <div className="grid w-2/5 grid-rows-2 gap-1.5">
          <span className="rounded-md bg-white/10" />
          <span className="rounded-md bg-white/10" />
        </div>
      </m.div>
    </div>
  );
}

/** A short lead form that fills itself, submits, and drops a new enquiry. */
function LeadsVisual({ active, reduced }: VisualProps) {
  return (
    <div className={FRAME} aria-hidden="true">
      <m.span
        {...fade(0, active, reduced)}
        className="block h-1.5 w-16 rounded-full bg-white/30"
      />
      <m.div
        {...fade(1, active, reduced)}
        className="mt-1.5 flex h-6 items-center rounded-md border border-white/10 bg-white/[0.04] px-2"
      >
        <m.span
          animate={active && !reduced ? { width: ["0%", "62%"] } : { width: "62%" }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="block h-1.5 rounded-full bg-[#9B95FF]/70"
        />
      </m.div>
      <m.div
        {...fade(2, active, reduced)}
        className="mt-1.5 flex h-6 items-center rounded-md border border-white/10 bg-white/[0.04] px-2"
      >
        <span className="block h-1.5 w-2/5 rounded-full bg-white/20" />
      </m.div>
      <m.div
        {...fade(3, active, reduced)}
        className="mt-2 flex items-center justify-between"
      >
        <m.span
          animate={active && !reduced ? { scale: [1, 0.94, 1] } : { scale: 1 }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#673DE6] px-2.5 py-1 text-[9px] font-medium text-white"
        >
          <Send className="size-2.5" strokeWidth={2} />
          Send
        </m.span>
        <m.span
          {...fade(4, active, reduced)}
          className="inline-flex items-center gap-1 rounded-full border border-[#2EC27E]/30 bg-[#2EC27E]/10 px-2 py-0.5 text-[9px] text-[#7BE0AE]"
        >
          <Check className="size-2.5" strokeWidth={2.5} />
          New enquiry
        </m.span>
      </m.div>
    </div>
  );
}

/** A WhatsApp-style thread with the business links attached. */
function ConnectVisual({ active, reduced }: VisualProps) {
  return (
    <div className={FRAME} aria-hidden="true">
      <m.div
        {...fade(0, active, reduced)}
        className="max-w-[78%] rounded-lg rounded-bl-sm bg-white/10 px-2 py-1.5"
      >
        <span className="block h-1.5 w-24 rounded-full bg-white/35" />
      </m.div>
      <m.div
        {...fade(1, active, reduced)}
        className="ml-auto mt-1.5 max-w-[72%] rounded-lg rounded-br-sm bg-[#25D366]/25 px-2 py-1.5"
      >
        <span className="block h-1.5 w-16 rounded-full bg-[#7BE0AE]/70" />
      </m.div>
      <m.div {...fade(2, active, reduced)} className="mt-2 flex flex-wrap gap-1">
        {["Website", "Instagram", "Google"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/12 bg-white/[0.06] px-2 py-0.5 text-[9px] text-white/70"
          >
            {label}
          </span>
        ))}
      </m.div>
    </div>
  );
}

/** Three nodes wired together, with a pulse travelling the connection. */
function AutomateVisual({ active, reduced }: VisualProps) {
  const nodes = ["Enquiry", "Route", "Reply"];

  return (
    <div className={FRAME} aria-hidden="true">
      <div className="relative flex h-full items-center justify-between">
        <svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M40 30 H160"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <m.path
            d="M40 30 H160"
            fill="none"
            stroke="#9B95FF"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.12 1"
            initial={{ strokeDashoffset: 0 }}
            animate={active && !reduced ? { strokeDashoffset: -1 } : { strokeDashoffset: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {nodes.map((label, i) => (
          <m.div
            key={label}
            {...fade(i, active, reduced)}
            className="relative flex w-[30%] flex-col items-center gap-1"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-[#16202C]">
              {i < 2 ? (
                <Sparkles className="size-3 text-[#9B95FF]" strokeWidth={1.75} />
              ) : (
                <Check className="size-3 text-[#7BE0AE]" strokeWidth={2.5} />
              )}
            </span>
            <span className="text-[9px] text-white/55">{label}</span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/** A padlock in a green ring with an https address and a ticking checklist. */
function SecureVisual({ active, reduced }: VisualProps) {
  return (
    <div className={FRAME} aria-hidden="true">
      <m.div {...fade(0, active, reduced)} className="flex items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#2EC27E]/40 bg-[#2EC27E]/10">
          <Lock className="size-3.5 text-[#7BE0AE]" strokeWidth={2} />
        </span>
        <span className="truncate rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] text-white/60">
          https://yourbusiness.com
        </span>
      </m.div>
      <m.div {...fade(1, active, reduced)} className="mt-2 space-y-1.5">
        {["Certificate issued", "Traffic encrypted", "Backups configured"].map(
          (label, i) => (
            <m.div
              key={label}
              {...fade(i + 2, active, reduced)}
              className="flex items-center gap-1.5"
            >
              <span className="grid size-3.5 place-items-center rounded-full bg-[#2EC27E]/20">
                <Check className="size-2.5 text-[#7BE0AE]" strokeWidth={3} />
              </span>
              <span className="h-1.5 w-28 rounded-full bg-white/20" />
            </m.div>
          )
        )}
      </m.div>
    </div>
  );
}

/** Paperwork rows, each tagged as guided. */
function RegisterVisual({ active, reduced }: VisualProps) {
  return (
    <div className={FRAME} aria-hidden="true">
      <m.div {...fade(0, active, reduced)} className="space-y-1.5">
        {["MSME", "Udyam", "GST"].map((label, i) => (
          <m.div
            key={label}
            {...fade(i + 1, active, reduced)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5"
          >
            <FileText className="size-3 shrink-0 text-white/45" strokeWidth={1.75} />
            <span className="flex-1 truncate text-[9px] text-white/60">{label}</span>
            <span className="rounded-full border border-[#9B95FF]/30 bg-[#9B95FF]/10 px-1.5 py-0.5 text-[8px] text-[#C4BFFF]">
              Guided
            </span>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}

/** A four-step roadmap whose spine draws itself downward. */
function SetupVisual({ active, reduced }: VisualProps) {
  const steps = ["Domains", "Accounts", "Content", "Handover"];

  return (
    <div className={FRAME} aria-hidden="true">
      <div className="relative flex h-full items-center justify-between pl-1">
        <svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M14 6 V54"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />
          <m.path
            d="M14 6 V54"
            fill="none"
            stroke="#9B95FF"
            strokeWidth="1.8"
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: reduced ? 0.2 : 1.1, ease: "easeInOut" }}
          />
        </svg>

        {steps.map((label, i) => (
          <m.div
            key={label}
            {...fade(i, active, reduced)}
            className="relative flex w-1/4 flex-col items-center gap-1"
          >
            <span className="grid size-5 place-items-center rounded-full border border-white/15 bg-[#16202C] text-[8px] text-white/70">
              {i + 1}
            </span>
            <span className="text-[9px] text-white/55">{label}</span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Decorative mini illustration for each deliverable.
 * Purely visual — every bit of meaning lives in the text next to it.
 */
export default function MiniVisual({
  id,
  active,
  reduced,
}: VisualProps & { id: VisualId }) {
  switch (id) {
    case "website":
      return <WebsiteVisual active={active} reduced={reduced} />;
    case "leads":
      return <LeadsVisual active={active} reduced={reduced} />;
    case "connect":
      return <ConnectVisual active={active} reduced={reduced} />;
    case "automate":
      return <AutomateVisual active={active} reduced={reduced} />;
    case "secure":
      return <SecureVisual active={active} reduced={reduced} />;
    case "register":
      return <RegisterVisual active={active} reduced={reduced} />;
    case "setup":
      return <SetupVisual active={active} reduced={reduced} />;
    default:
      return null;
  }
}
