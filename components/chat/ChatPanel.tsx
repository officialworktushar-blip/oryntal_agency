"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, X } from "lucide-react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

type Props = {
  isOpen: boolean;
  messages: ChatMessage[];
  isStreaming: boolean;
  onClose: () => void;
  onClear: () => void;
  onRetry: () => void;
};

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="size-1.5 rounded-full bg-white/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

export default function ChatPanel({
  isOpen,
  messages,
  isStreaming,
  onClose,
  onClear,
  onRetry,
}: Props) {
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const lastUser = [...messages].reverse().find((m2) => m2.role === "user");
  const summary = lastUser
    ? lastUser.content.slice(0, 120).replace(/\s+/g, " ").trim()
    : "";
  const contactHref = `/contact?message=${encodeURIComponent(summary)}`;

  const hasAssistant = messages.some((m2) => m2.role === "assistant" && !m2.error);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile dim backdrop */}
          <m.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            aria-hidden
          />

          <m.div
            role="dialog"
            aria-label="ORYNTAL assistant"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={
              "absolute inset-x-0 z-30 mx-auto flex max-h-[460px] w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#140C38]/90 shadow-2xl backdrop-blur-xl " +
              "max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:z-50 max-md:max-h-[75vh] max-md:rounded-b-none max-md:rounded-t-3xl"
            }
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-400" />
                </span>
                <span className="text-xs font-medium text-white/85">
                  ORYNTAL assistant
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close assistant"
                  className="rounded p-1 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-white/15 px-4 py-2.5 text-[15px] leading-relaxed text-white whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ) : msg.error ? (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[15px] leading-relaxed text-white/90">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-300" />
                        <div>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <button
                            type="button"
                            onClick={onRetry}
                            className="mt-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-[15px] leading-relaxed text-white whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ),
              )}

              {isStreaming &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}
            </div>

            {/* Footer */}
            {hasAssistant && (
              <div className="shrink-0 border-t border-white/10 px-4 py-3">
                <a
                  href={contactHref}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Talk to the team
                  <ArrowRight className="size-3.5" />
                </a>
                <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                  AI assistant. Answers may be incomplete; scope and pricing are
                  confirmed by the ORYNTAL team.
                </p>
              </div>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
