"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** The design canvas the widgets are drawn on. */
export const CANVAS_WIDTH = 840;
export const CANVAS_HEIGHT = 307;

/** Below this scale the widget text would get too small to read. */
const MIN_SCALE = 0.62;

export type WidgetMotion = {
  /** True once the owning card has scrolled into view. */
  inView: boolean;
  /** True when the visitor asked for less motion. */
  reduced: boolean;
};

export const WidgetMotionContext = createContext<WidgetMotion>({
  inView: false,
  reduced: false,
});

export function useWidgetMotion(): WidgetMotion {
  return useContext(WidgetMotionContext);
}

type WidgetCanvasProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fixed-size design canvas (840 x 307) scaled to the width of the card that
 * holds it. The widgets inside are positioned in canvas pixels.
 */
export default function WidgetCanvas({ children, className }: WidgetCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(0);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const update = () => {
      const width = host.clientWidth;
      if (!width) return;

      const raw = width / CANVAS_WIDTH;
      const next = Math.min(1, Math.max(MIN_SCALE, raw));

      setScale(next);
      // When the scale is clamped, crop the canvas equally on both sides.
      setOffset(next >= raw ? 0 : (width - CANVAS_WIDTH * next) / 2);
      setReady(true);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={`relative aspect-[840/307] w-full overflow-visible ${className ?? ""}`}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `translateX(${offset}px) scale(${scale})`,
          visibility: ready ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
