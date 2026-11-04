"use client";

import { useState } from "react";
import type { ReactNode } from "react";

function RocketIcon({ className }: { className?: string }) {
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
      <path d="M13.5 4.5c2-2 4.5-2.5 6-2.5 0 1.5-.5 4-2.5 6l-5.6 5.6-4.5-4.5L13.5 4.5Z" />
      <circle cx="15.5" cy="7.5" r="1.4" />
      <path d="M8.5 13.5 5 14.5 3.5 20.5 9.5 19l1-3.5" />
      <path d="m7.5 16.5-2 2" />
    </svg>
  );
}

function WindowIcon({ className }: { className?: string }) {
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
      <rect x="7" y="12" width="4" height="4" rx="1" />
      <path d="M14 12h3M14 15h3" />
    </svg>
  );
}

function LoopIcon({ className }: { className?: string }) {
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
      <path d="M20 11a8 8 0 0 0-14.9-3.9L3 9" />
      <path d="M3 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.9 3.9L21 15" />
      <path d="M21 20v-5h-5" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
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
      <circle cx="8.5" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlugIcon({ className }: { className?: string }) {
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
      <path d="M9 7V3M15 7V3" />
      <path d="M6 7h12v3a6 6 0 0 1-12 0V7Z" />
      <path d="M12 16v5" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="m10.4 10.4-3.7-3.7M13.6 10.4l3.7-3.7M10.4 13.6l-3.7 3.7M13.6 13.6l3.7 3.7" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.5c.5 5.3 4.2 9 9.5 9.5-5.3.5-9 4.2-9.5 9.5-.5-5.3-4.2-9-9.5-9.5 5.3-.5 9-4.2 9.5-9.5Z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
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
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5H4a1 1 0 0 0-1 1v11" />
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

const sampleRequests: Array<{
  icon: ReactNode;
  title: string;
  description: string;
  sample: string;
}> = [
  {
    icon: <RocketIcon className="size-6" />,
    title: "Websites",
    description:
      "A fast, clean website that brings in enquiries and works well on every phone.",
    sample:
      "I need a website for my jewellery business with a product catalogue",
  },
  {
    icon: <WindowIcon className="size-6" />,
    title: "Apps and dashboards",
    description:
      "Custom applications and business interfaces built around the way you work.",
    sample:
      "I want a booking app for my salon with reminders for customers",
  },
  {
    icon: <LoopIcon className="size-6" />,
    title: "Automation",
    description:
      "Cut repetitive work and keep things moving without doing it by hand.",
    sample:
      "Send every new order to my sheet and notify my team automatically",
  },
  {
    icon: <ChatIcon className="size-6" />,
    title: "WhatsApp and chat replies",
    description:
      "Answer customers instantly on WhatsApp and your website, at any hour.",
    sample: "Set up automatic WhatsApp replies for my clinic enquiries",
  },
  {
    icon: <PlugIcon className="size-6" />,
    title: "Payments and integrations",
    description:
      "Connect payment gateways, delivery partners and the tools you already use.",
    sample: "Connect online payments and my courier to my store",
  },
  {
    icon: <NetworkIcon className="size-6" />,
    title: "Suppliers and sourcing",
    description:
      "Get connected to suppliers, wholesalers and sourcing contacts through our network.",
    sample: "Help me find a wholesaler for resin art materials",
  },
];

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  try {
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    document.execCommand("copy");
  } catch {
    return;
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function SampleRequests() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  async function copySample(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
    } catch {
      fallbackCopy(text);
    }

    setCopiedText(text);
    window.setTimeout(() => {
      setCopiedText((current) => (current === text ? null : current));
    }, 2000);
  }

  return (
    <section
      id="sample-requests"
      className="relative bg-[#0d0d0f] px-5 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="cp-reveal mx-auto max-w-4xl text-center text-[34px] font-light leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]">
          Everything your business needs,
          <br />
          one conversation away
        </h2>

        <p className="mx-auto mt-5 max-w-[700px] text-center text-[18px] leading-relaxed text-white/70">
          ORYNTAL covers much more than a website. Copy a sample request and
          send it to us on WhatsApp or email.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {sampleRequests.map((item) => {
            const isCopied = copiedText === item.sample;

            return (
              <article
                key={item.title}
                className="cp-reveal group flex h-full flex-col rounded-3xl border border-white/5 bg-[#1a1a1d] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8b7bff]/30 hover:shadow-[0_24px_70px_rgba(124,92,232,0.16)]"
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-xl bg-[#2a2a30] text-[#8b7bff]">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-[26px] font-light leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[18px] leading-relaxed text-white/70">
                  {item.description}
                </p>

                <div className="mt-auto pt-8">
                  <div
                    title={item.sample}
                    className="flex w-full items-center justify-between gap-3 rounded-xl bg-[#26262b] p-4"
                  >
                    <div className="flex min-w-0 items-start gap-2.5">
                      <SparkleIcon className="mt-0.5 size-4 shrink-0 text-white" />
                      <p className="text-[16px] leading-snug text-white">
                        {item.sample}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => copySample(item.sample)}
                      aria-label={`Copy sample request: ${item.sample}`}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#8b7bff] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#26262b]"
                    >
                      {isCopied ? (
                        <CheckIcon className="size-4" />
                      ) : (
                        <CopyIcon className="size-4" />
                      )}
                      <span aria-live="polite">
                        {isCopied ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
