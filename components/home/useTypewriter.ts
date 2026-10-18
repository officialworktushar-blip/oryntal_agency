import { useCallback, useEffect, useRef, useState } from "react";

export type TypewriterOptions = {
  text: string;
  typingSpeedMs?: number;
  typingJitterMs?: number;
  holdMs?: number;
  pauseBeforeClearMs?: number;
  isPaused?: boolean;
  isActive?: boolean;
  isVisible?: boolean;
  onCycleComplete?: () => void;
  disabled?: boolean;
  mode?: "reduced" | "normal";
};

type Phase = "typing" | "hold" | "waiting";

function nextJitter(base: number, jitter: number): number {
  if (jitter <= 0) return base;
  const half = jitter / 2;
  return base + (Math.random() * jitter - half);
}

export function useTypewriter({
  text,
  typingSpeedMs = 32,
  typingJitterMs = 12,
  holdMs = 2200,
  pauseBeforeClearMs = 0,
  isPaused = false,
  isActive = true,
  isVisible = true,
  onCycleComplete,
  disabled = false,
  mode = "normal",
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("waiting");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  const clearTimeoutSafe = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimeoutSafe();
    indexRef.current = 0;
    setDisplayed("");
    setPhase("typing");
  }, [clearTimeoutSafe]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeoutSafe();
    };
  }, [clearTimeoutSafe]);

  useEffect(() => {
    if (mode === "reduced" || disabled) {
      clearTimeoutSafe();
      indexRef.current = text.length;
      setDisplayed(text);
      setPhase("hold");
      return;
    }

    if (!isActive || !isVisible) {
      return;
    }

    if (isPaused) {
      clearTimeoutSafe();
      return;
    }

    // start typing fresh if empty and waiting
    if (phase === "waiting") {
      indexRef.current = 0;
      setDisplayed("");
      setPhase("typing");
      return;
    }

    if (phase === "typing") {
      if (indexRef.current >= text.length) {
        setPhase("hold");
        return;
      }
      const char = text.charAt(indexRef.current);
      indexRef.current += 1;
      setDisplayed((prev) => prev + char);
      const delay = nextJitter(typingSpeedMs, typingJitterMs);
      timeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setPhase("typing");
        }
      }, delay);
      return;
    }

    if (phase === "hold") {
      clearTimeoutSafe();
      const delayHold = Math.max(0, pauseBeforeClearMs + holdMs);
      timeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          onCycleComplete?.();
        }
      }, delayHold);
      return;
    }
  }, [
    text,
    typingSpeedMs,
    typingJitterMs,
    holdMs,
    pauseBeforeClearMs,
    isPaused,
    isActive,
    isVisible,
    onCycleComplete,
    disabled,
    mode,
    phase,
    clearTimeoutSafe,
  ]);

  useEffect(() => {
    // Reset when text changes (new slide)
    clearTimeoutSafe();
    indexRef.current = 0;
    setDisplayed("");
    setPhase("typing");
  }, [text, clearTimeoutSafe]);

  const restart = useCallback(() => {
    clearTimeoutSafe();
    indexRef.current = 0;
    setDisplayed("");
    setPhase("typing");
  }, [clearTimeoutSafe]);

  return {
    displayed,
    fullText: text,
    isTyping: phase === "typing",
    isHolding: phase === "hold",
    restart,
  };
}
