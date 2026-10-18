"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import ChatPanel, { type ChatMessage } from "@/components/chat/ChatPanel";

const MAX_CHARS = 500;

const PLACEHOLDERS = [
  "How Oryntal orients your business",
  "Ask Oryntal about your business pain points",
  "Connect with Oryntal for tech consultancy",
  "Ask Oryntal: what do you want to build or automate?",
];

export default function HeroChat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Cycle the placeholder text every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll while the mobile bottom sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;
      const content = trimmed.slice(0, MAX_CHARS);

      setError(null);
      setIsOpen(true);
      setInput("");

      const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages.slice(-8) }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          throw new Error(
            "Too many questions right now, please try again in a minute or use the contact form.",
          );
        }
        if (!res.ok || !res.body) {
          throw new Error(
            "Something went wrong. Please try again or use the contact form.",
          );
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }

        if (!acc.trim()) {
          throw new Error("I did not get a response. Please try again.");
        }
      } catch (err) {
        if (controller.signal.aborted) {
          // User closed / cleared — drop the pending assistant bubble
          setMessages((prev) => {
            const copy = [...prev];
            if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
              copy.pop();
            }
            return copy;
          });
        } else {
          const message =
            err instanceof Error && err.message
              ? err.message
              : "Something went wrong. Please try again.";
          setError(message);
          setMessages((prev) => {
            const copy = [...prev];
            if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
              copy.pop();
            }
            return copy;
          });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [isStreaming, messages],
  );

  // When an error string is set, surface it as an assistant-style notice
  useEffect(() => {
    if (!error) return;
    setMessages((prev) => [...prev, { role: "assistant", content: error, error: true }]);
    setError(null);
  }, [error]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void send(input);
  }

  function handleRetry() {
    // Remove trailing error message and retry the last user question
    const withoutError = messages.filter((m2, i) => !(i === messages.length - 1 && m2.error));
    const lastUser = [...withoutError].reverse().find((m2) => m2.role === "user");
    setMessages(withoutError.filter((m2) => !m2.error));
    if (lastUser) void send(lastUser.content);
  }

  function handleClear() {
    abortRef.current?.abort();
    setMessages([]);
    setIsOpen(false);
    setError(null);
    inputRef.current?.focus();
  }

  function handleClose() {
    abortRef.current?.abort();
    setIsOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div className="relative w-full lg:min-w-0 lg:flex-1">
      {/* Glass pill */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Ask Oryntal assistant"
        className="flex h-16 w-full min-w-0 items-center gap-3 rounded-full border border-white/25 py-2 pl-4 pr-2 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.12),inset_0_0_20px_rgba(255,255,255,0.06)]"
      >
        <label htmlFor="hero-chat-input" className="sr-only">
          Ask Oryntal what you want to build or automate
        </label>
        <Image
          src="/oryntal-logo.png"
          alt=""
          width={28}
          height={28}
          className="size-7 shrink-0 object-contain"
          aria-hidden
        />
        <input
          id="hero-chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
          placeholder={PLACEHOLDERS[placeholderIndex]}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60 sm:text-base focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-60 disabled:hover:scale-100"
        >
          {isStreaming ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : null}
          Ask
        </button>
      </form>

      {/* Chat panel overlay */}
      <ChatPanel
        isOpen={isOpen}
        messages={messages}
        isStreaming={isStreaming}
        onClose={handleClose}
        onClear={handleClear}
        onRetry={handleRetry}
      />
    </div>
  );
}

/* Right-side note rendered beside the pill on desktop (exported for Hero layout) */
export function HeroChatNote() {
  return (
    <>
      <div className="hidden shrink-0 text-left lg:block">
        <p className="text-sm font-bold text-white">Solutions, not just software</p>
        <p className="mt-0.5 text-sm text-white/85">
          from your first website to custom AI systems.{" "}
          <Link
            href="#services"
            className="font-medium text-white underline underline-offset-2 hover:text-white/85"
          >
            Explore solutions
          </Link>
        </p>
      </div>

      {/* Stacked under the pill on mobile */}
      <div className="text-center lg:hidden">
        <p className="text-sm font-bold text-white">Solutions, not just software</p>
        <p className="mt-0.5 text-sm text-white/85">
          from your first website to custom AI systems.{" "}
          <Link
            href="#services"
            className="font-medium text-white underline underline-offset-2"
          >
            Explore solutions
          </Link>
        </p>
      </div>
    </>
  );
}
