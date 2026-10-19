import { useCallback, useEffect, useRef, useState } from "react";

export type TypewriterOptions = {
  text: string;
  /** ms per character (before jitter). */
  typingSpeedMs?: number;
  /** ± jitter applied to every character delay. */
  typingJitterMs?: number;
  /** how long the finished line stays on screen before the next slide. */
  holdMs?: number;
  /** card-transition grace period before the first character appears. */
  startDelayMs?: number;
  isPaused?: boolean;
  isActive?: boolean;
  isVisible?: boolean;
  onCycleComplete?: () => void;
  mode?: "reduced" | "normal";
};

type Phase = "delay" | "typing" | "hold";

function jitter(base: number, amount: number): number {
  if (amount <= 0) return base;
  return base + Math.random() * amount - amount / 2;
}

export function useTypewriter({
  text,
  typingSpeedMs = 32,
  typingJitterMs = 12,
  holdMs = 2200,
  startDelayMs = 450,
  isPaused = false,
  isActive = true,
  isVisible = true,
  onCycleComplete,
  mode = "normal",
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [tick, setTick] = useState(0);

  const phaseRef = useRef<Phase>("delay");
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<(() => void) | undefined>(onCycleComplete);

  const reduced = mode === "reduced";

  useEffect(() => {
    cycleRef.current = onCycleComplete;
  }, [onCycleComplete]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const restart = useCallback(() => {
    clearTimer();
    indexRef.current = 0;
    phaseRef.current = "delay";
    setDisplayed("");
    setTick((value) => value + 1);
  }, [clearTimer]);

  // Unmount cleanup.
  useEffect(() => clearTimer, [clearTimer]);

  // New slide: clear the line instantly, then wait out the card transition.
  useEffect(() => {
    restart();
  }, [text, restart]);

  // Engine — a single timeout chain driven by refs so pausing/resuming
  // always picks up exactly where it left off.
  useEffect(() => {
    clearTimer();

    if (reduced) {
      setDisplayed((prev) => (prev === text ? prev : text));
      return;
    }

    if (!isActive || !isVisible) return;

    if (isPaused) {
      // Never leave the prompt box empty while paused.
      if (indexRef.current === 0) {
        setDisplayed((prev) => (prev === "" ? text : prev));
      }
      return;
    }

    if (phaseRef.current === "delay") {
      timerRef.current = setTimeout(() => {
        phaseRef.current = "typing";
        indexRef.current = 0;
        setDisplayed("");
        setTick((value) => value + 1);
      }, startDelayMs);
      return;
    }

    if (indexRef.current < text.length) {
      timerRef.current = setTimeout(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        setTick((value) => value + 1);
      }, jitter(typingSpeedMs, typingJitterMs));
      return;
    }

    phaseRef.current = "hold";
    timerRef.current = setTimeout(() => {
      cycleRef.current?.();
    }, holdMs);
  }, [
    text,
    reduced,
    isActive,
    isVisible,
    isPaused,
    tick,
    startDelayMs,
    typingSpeedMs,
    typingJitterMs,
    holdMs,
    clearTimer,
  ]);

  return {
    displayed,
    fullText: text,
    restart,
  };
}
