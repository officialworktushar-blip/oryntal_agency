"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCheck, Copy } from "lucide-react";
import type { PremiumCustomModuleItem } from "@/lib/content/packages/premiumCustom";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

type CodeBriefProps = {
  item: PremiumCustomModuleItem;
  isActive: boolean;
};

export default function CodeBrief({ item, isActive }: CodeBriefProps) {
  const { copyLabel, copiedLabel } = premiumCustom.modules;
  const command = `brief --module ${item.briefKey}`;
  const [typed, setTyped] = useState(command);
  const [lineCount, setLineCount] = useState(item.briefLines.length);
  const [copied, setCopied] = useState(false);
  const mounted = useRef(false);
  const copiedTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isActive || reduced) {
      setTyped(command);
      setLineCount(item.briefLines.length);
      return;
    }

    setTyped("");
    setLineCount(0);
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTyped(command.slice(0, index));
      if (index >= command.length) window.clearInterval(interval);
    }, 18);

    const lineTimers = item.briefLines.map((_, i) =>
      window.setTimeout(() => setLineCount(i + 1), 160 + i * 120)
    );

    return () => {
      window.clearInterval(interval);
      lineTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [command, isActive, item.briefLines]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    };
  }, []);

  async function copyBrief() {
    const text = [
      "ORYNTAL — Premium Custom Business System",
      `Module: ${item.label}`,
      ...item.briefLines,
      "What I want to achieve: ",
    ].join("\n");

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.setAttribute("readonly", "");
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-[#18181B] p-4 sm:px-5 sm:py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2 overflow-x-auto whitespace-nowrap pb-0.5 font-mono text-[12.5px] sm:text-[14px]">
            <span style={{ color: "#8B7CFF" }} aria-hidden="true">
              $
            </span>
            <span className="text-white/90">
              {typed}
              {typed.length < command.length && isActive && (
                <span className="ml-0.5 inline-block h-[14px] w-[1px] animate-pulse bg-white/70 align-middle" />
              )}
            </span>
          </div>
          <div className="mt-2 space-y-1 font-mono text-[12.5px] text-white/50">
            {item.briefLines.map((line, i) => (
              <div
                key={line}
                style={{
                  opacity: i < lineCount ? 1 : 0,
                  transition: "opacity 180ms ease",
                }}
              >
                # {line}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={copyBrief}
          aria-label="Copy build brief"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg px-2 py-1 text-[14px] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF]"
        >
          {copied ? (
            <CheckCheck className="size-[18px]" style={{ color: "#34C77B" }} aria-hidden="true" />
          ) : (
            <Copy className="size-[18px]" aria-hidden="true" />
          )}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
