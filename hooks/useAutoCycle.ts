"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function useAutoCycle(
  count: number,
  ms: number,
  opts: { inViewRef?: React.RefObject<Element | null> } = {}
) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const inViewRef = opts.inViewRef;
  const inView = useInView(inViewRef || { current: null }, { amount: 0.3, once: false });

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    if (paused) return;
    if (inViewRef && !inView) return;
    if (!tabVisible) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, ms);
    return () => clearInterval(interval);
  }, [count, ms, paused, inView, inViewRef, tabVisible]);

  return {
    active,
    setActive,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
