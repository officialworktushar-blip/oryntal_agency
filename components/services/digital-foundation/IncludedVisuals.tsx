"use client";

import { m } from "framer-motion";
import {
  Check,
  FileText,
  Lock,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

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

/** Block that fades and scales in, one after the other. */
function build(i: number, active: boolean, reduced: boolean) {
  return {
    initial: { opacity: 0, scale: reduced ? 1 : 0.9 },
    animate: active
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: reduced ? 1 : 0.9 },
    transition: {
      duration: reduced ? 0.15 : 0.34,
      delay: reduced ? 0 : i * 0.12,
      ease: "easeOut" as const,
    },
  };
}

/** Slide-in used by the chat bubbles and list rows. */
function slide(i: number, active: boolean, reduced: boolean) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : 8 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 8 },
    transition: {
      duration: reduced ? 0.15 : 0.3,
      delay: reduced ? 0 : i * 0.14,
      ease: "easeOut" as const,
    },
  };
}

/** A lilac browser window that assembles itself, block by block. */
function WebsiteVisual({ active, reduced }: VisualProps) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#EFE9FF]"
      aria-hidden="true"
    >
      <m.div
        {...build(0, active, reduced)}
        className="flex shrink-0 items-center gap-1 bg-[#CFC7FF] px-2 py-1.5"
      >
        <span className="size-1.5 rounded-full bg-[#7B68FF]" />
        <span className="size-1.5 rounded-full bg-[#7B68FF]" />
        <span className="size-1.5 rounded-full bg-[#7B68FF]" />
      </m.div>

      <m.div {...build(1, active, reduced)} className="flex items-center px-2.5 pt-2">
        <span className="grid size-3.5 place-items-center rounded-[4px] bg-[#673DE6]">
          <span className="size-1.5 rounded-full bg-white" />
        </span>
      </m.div>

      <m.div
        {...build(2, active, reduced)}
        className="mx-2.5 mt-1.5 h-1.5 w-3/5 rounded-full bg-[#4A35B8]/70"
      />
      <m.div
        {...build(3, active, reduced)}
        className="mx-2.5 mt-1 h-1.5 w-2/5 rounded-full bg-[#4A35B8]/45"
      />
      <m.div
        {...build(4, active, reduced)}
        className="mx-2.5 mt-2 h-4 w-14 rounded bg-[#673DE6]"
      />
      <m.div
        {...build(5, active, reduced)}
        className="mt-auto grid grid-cols-2 gap-1.5 p-2.5"
      >
        <span className="h-6 rounded-md bg-[#A99BFF]/60" />
        <span className="h-6 rounded-md bg-[#A99BFF]/60" />
      </m.div>
    </div>
  );
}

/** A short enquiry form that fills itself, sends, and drops a new enquiry. */
function LeadsVisual({ active, reduced }: VisualProps) {
  const fields = [
    { label: "Name", width: "58%" },
    { label: "Email", width: "72%" },
    { label: "Message", width: "86%" },
  ];

  return (
    <div className="flex h-full w-full flex-col" aria-hidden="true">
      {fields.map((field, i) => (
        <m.div
          key={field.label}
          {...slide(i, active, reduced)}
          className="flex items-center rounded-md border border-[#E3E4E8] bg-white px-2 py-1"
        >
          <span className="text-[9px] text-[#6D7081]">{field.label}</span>
          <m.span
            animate={
              active && !reduced
                ? { width: ["0%", field.width] }
                : { width: active ? field.width : "0%" }
            }
            transition={{
              duration: 1.4,
              repeat: active && !reduced ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="ml-2 h-1.5 rounded-full bg-[#C9BFFF]"
          />
        </m.div>
      ))}

      <m.div
        {...slide(3, active, reduced)}
        className="mt-1.5 flex items-center justify-between"
      >
        <m.span
          animate={active && !reduced ? { scale: [1, 0.94, 1] } : { scale: 1 }}
          transition={{
            duration: 0.9,
            repeat: active && !reduced ? Infinity : 0,
            repeatDelay: 1.4,
            ease: "easeOut",
          }}
          className="inline-flex items-center gap-1 rounded-md bg-[#673DE6] px-2.5 py-1 text-[9px] font-medium text-white"
        >
          <Send className="size-2.5" strokeWidth={2} />
          Send
        </m.span>
      </m.div>

      <m.div
        {...slide(4, active, reduced)}
        className="mt-auto flex items-center gap-1.5 rounded-md border border-[#E3E4E8] bg-white px-2 py-1.5"
      >
        <span className="size-1.5 rounded-full bg-[#2EC27E]" />
        <span className="text-[10px] text-[#1D1E20]">New enquiry</span>
      </m.div>
    </div>
  );
}

/** A WhatsApp-style thread with the business links attached. */
function ConnectVisual({ active, reduced }: VisualProps) {
  return (
    <div className="flex h-full w-full gap-2" aria-hidden="true">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#E3E4E8] bg-white">
        <m.div
          {...slide(0, active, reduced)}
          className="flex shrink-0 items-center gap-1.5 bg-[#25D366] px-2 py-1"
        >
          <MessageCircle className="size-2.5 text-white" strokeWidth={2} />
          <span className="text-[9px] font-medium text-white">Business</span>
        </m.div>

        <m.div
          {...slide(1, active, reduced)}
          className="mt-1.5 max-w-[86%] rounded-md rounded-bl-sm bg-[#F1F3F6] px-2 py-1"
        >
          <span className="block text-[9px] leading-tight text-[#1D1E20]">
            Hi, I&apos;d like to know more.
          </span>
        </m.div>

        <m.div
          {...slide(2, active, reduced)}
          className="ml-auto mt-1 max-w-[86%] rounded-md rounded-br-sm bg-[#DCF8C6] px-2 py-1"
        >
          <span className="block text-[9px] leading-tight text-[#1D1E20]">
            Thanks for reaching out!
          </span>
        </m.div>
      </div>

      <div className="flex w-[86px] shrink-0 flex-col justify-center gap-1.5">
        {["Website", "Instagram", "Google"].map((label, i) => (
          <m.span
            key={label}
            {...slide(i + 1, active, reduced)}
            className="rounded-full border border-[#E3E4E8] bg-white px-2 py-1 text-center text-[9px] text-[#4A5568]"
          >
            {label}
          </m.span>
        ))}
      </div>
    </div>
  );
}

/** Three nodes wired together, with a pulse travelling the connection. */
function AutomateVisual({ active, reduced }: VisualProps) {
  const nodes = ["Form submitted", "WhatsApp alert", "Saved to records"];

  return (
    <div className="flex h-full w-full flex-col justify-center" aria-hidden="true">
      <div className="relative flex items-center justify-between">
        <svg
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="presentation"
        >
          <path
            d="M32 20 H168"
            fill="none"
            stroke="rgba(74,85,104,0.28)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <m.path
            d="M32 20 H168"
            fill="none"
            stroke="#673DE6"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.12 1"
            initial={{ strokeDashoffset: 0 }}
            animate={
              active && !reduced ? { strokeDashoffset: -1 } : { strokeDashoffset: 0 }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {nodes.map((label, i) => (
          <m.div
            key={label}
            {...build(i, active, reduced)}
            className="relative flex w-[30%] flex-col items-center gap-1"
          >
            <span className="grid size-7 place-items-center rounded-lg border border-[#E3E4E8] bg-white">
              {i < 2 ? (
                <Sparkles className="size-3 text-[#673DE6]" strokeWidth={1.75} />
              ) : (
                <Check className="size-3 text-[#2EC27E]" strokeWidth={2.5} />
              )}
            </span>
            <span className="text-center text-[9px] leading-tight text-[#4A5568]">
              {label}
            </span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/** A padlock in a green ring with an https address and a ticking checklist. */
function SecureVisual({ active, reduced }: VisualProps) {
  const rows = ["SSL certificate active", "HTTPS enabled", "Essential security set up"];

  return (
    <div className="flex h-full w-full flex-col" aria-hidden="true">
      <m.div {...build(0, active, reduced)} className="flex items-center gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#2EC27E]/40 bg-[#E6F7EE]">
          <Lock className="size-3.5 text-[#12805C]" strokeWidth={2} />
        </span>
        <span className="flex min-w-0 items-center gap-1.5 rounded-full border border-[#E3E4E8] bg-white px-2 py-1">
          <Lock className="size-2.5 shrink-0 text-[#2EC27E]" strokeWidth={2} />
          <span className="truncate text-[9px] text-[#4A5568]">
            https://yourbusiness.com
          </span>
        </span>
      </m.div>

      <m.div {...build(1, active, reduced)} className="mt-2 space-y-1.5">
        {rows.map((label, i) => (
          <m.div
            key={label}
            {...build(i + 2, active, reduced)}
            className="flex items-center gap-1.5"
          >
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-[#E6F7EE]">
              <Check className="size-2.5 text-[#12805C]" strokeWidth={3} />
            </span>
            <span className="text-[9px] text-[#4A5568]">{label}</span>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}

/** Paperwork rows, each tagged as guided. */
function RegisterVisual({ active, reduced }: VisualProps) {
  const rows = ["MSME / Udyam guidance", "Relevant registrations", "Documentation help"];

  return (
    <div className="flex h-full w-full flex-col justify-center gap-1.5" aria-hidden="true">
      {rows.map((label, i) => (
        <m.div
          key={label}
          {...slide(i, active, reduced)}
          className="flex items-center gap-2 rounded-md border border-[#E3E4E8] bg-white px-2 py-1.5"
        >
          <FileText className="size-3 shrink-0 text-[#6D7081]" strokeWidth={1.75} />
          <span className="min-w-0 flex-1 truncate text-[9px] text-[#1D1E20]">
            {label}
          </span>
          <span className="shrink-0 rounded-full bg-[#EEE9FF] px-1.5 py-0.5 text-[8px] text-[#4A2FB8]">
            Guided
          </span>
        </m.div>
      ))}
    </div>
  );
}

/** A four-step roadmap whose spine draws itself downward. */
function SetupVisual({ active, reduced }: VisualProps) {
  const steps = ["Online presence", "Contact channels", "Lead collection", "Business links"];

  return (
    <div className="flex h-full w-full flex-col justify-center" aria-hidden="true">
      <div className="relative flex flex-col gap-1.5 pl-4">
        <svg
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-[5px] h-full w-[2px]"
          role="presentation"
        >
          <path
            d="M5 0 V100"
            fill="none"
            stroke="rgba(74,85,104,0.22)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            d="M5 0 V100"
            fill="none"
            stroke="#673DE6"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: reduced ? 0.2 : 1.2, ease: "easeInOut" }}
          />
        </svg>

        {steps.map((label, i) => (
          <m.div
            key={label}
            {...slide(i, active, reduced)}
            className="relative flex items-center gap-2"
          >
            <span className="absolute -left-4 grid size-2.5 place-items-center rounded-full border-2 border-[#673DE6] bg-white" />
            <span className="text-[9px] text-[#4A5568]">{label}</span>
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
