"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "oryntal-intro-seen";
const WORDMARK = "ORYNTAL";
const VISIBLE_MS = 2000;
const EXIT_MS = 600;

type Phase = "idle" | "in" | "out" | "done";

export default function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage unavailable; splash simply won't persist
    }
  }, []);

  const startExit = useCallback(() => {
    markSeen();
    setPhase("out");
  }, [markSeen]);

  useEffect(() => {
    if (reduceMotion) {
      markSeen();
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }

    setPhase("in");
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(startExit, VISIBLE_MS);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") startExit();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(exitTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [reduceMotion, markSeen, startExit]);

  useEffect(() => {
    if (phase === "done" || phase === "idle") document.body.style.overflow = "";
  }, [phase]);

  const visible = phase === "in";

  return (
    <AnimatePresence onExitComplete={() => setPhase("done")}>
      {visible ? (
        <motion.div
          key="splash"
          role="dialog"
          aria-label="Loading ORYNTAL"
          aria-live="polite"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0B0720 0%, #1A0F45 55%, #2B1A7A 100%)",
          }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 50%, rgba(103,61,230,0.45), transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative flex flex-col items-center gap-5 px-6">
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute h-[140px] w-[140px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(123,92,255,0.5) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={96}
                  height={96}
                  priority
                  className="h-20 w-20 object-contain md:h-24 md:w-24"
                />
              </motion.div>
            </div>

            <div className="sr-only">ORYNTAL</div>
            <div
              aria-hidden="true"
              className="flex text-4xl font-semibold tracking-[0.18em] text-white sm:text-5xl md:text-6xl"
            >
              {WORDMARK.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.07,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  style={
                    letter === "O"
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg,#9B8CFF,#673DE6)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }
                      : undefined
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
              className="text-sm tracking-[0.12em] text-white/70 md:text-base"
            >
              Orient Your Business.
            </motion.p>

            <div className="mt-2 h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full w-full origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #9B8CFF, #673DE6)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.4, ease: "linear" }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={startExit}
            className="absolute bottom-6 right-6 rounded text-xs text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
