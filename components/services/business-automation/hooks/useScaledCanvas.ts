"use client";

import { useLayoutEffect, useRef, useState } from "react";

export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 280;
const MIN_SCALE = 0.7;

/**
 * Scales a fixed design canvas to the width of its aspect-ratio wrapper.
 * The canvas is never hidden while measuring: it starts at scale 1 and is
 * corrected on the first layout pass.
 */
export function useScaledCanvas(designWidth = CANVAS_WIDTH, minScale = MIN_SCALE) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const width = wrapper.getBoundingClientRect().width;
      if (width <= 0) return;
      setScale(Math.min(1, Math.max(minScale, width / designWidth)));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [designWidth, minScale]);

  return { wrapperRef, scale };
}
