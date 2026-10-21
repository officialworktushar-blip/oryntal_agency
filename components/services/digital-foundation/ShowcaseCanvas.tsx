"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ShowcaseContent } from "@/lib/content/packages/digitalFoundation";
import Connectors from "./Connectors";
import DashboardWindow from "./DashboardWindow";
import ProductCard from "./ProductCard";
import RockField from "./RockField";
import TileColumns from "./TileColumns";

const DESIGN_W = 980;
const DESIGN_H = 430;

type ShowcaseCanvasProps = {
  showcase: ShowcaseContent;
  activeId: string | null;
  onSelect: (id: string) => void;
  /** Pulses only run while the stage is on screen and the tab is visible. */
  playing: boolean;
};

export default function ShowcaseCanvas({
  showcase,
  activeId,
  onSelect,
  playing,
}: ShowcaseCanvasProps) {
  const reduced = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [measured, setMeasured] = useState(false);
  const inView = useInView(wrapRef, { amount: 0.25 });

  useLayoutEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      if (!width) return;
      setScale(width / DESIGN_W);
      setMeasured(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pointer parallax, only for real pointing devices.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.6 });

  const hoverCapable = useRef(false);
  useEffect(() => {
    hoverCapable.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || !hoverCapable.current) return;
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY, reduced],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const tiltX = useTransform(smoothY, (v) => v * 4);
  const tiltY = useTransform(smoothX, (v) => -v * 5);

  const connectActive = activeId === "connect";

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[1156px]"
      style={{ aspectRatio: `${DESIGN_W}/${DESIGN_H}` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        role="img"
        aria-label={showcase.copy.canvasLabel}
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          visibility: measured ? "visible" : "hidden",
          perspective: 1600,
        }}
      >
        <RockField
          rocks={showcase.rocks}
          debris={showcase.debris}
          parallaxX={smoothX}
          parallaxY={smoothY}
          reduced={reduced}
          visible={inView}
        />

        <DashboardWindow
          showcase={showcase}
          activeId={activeId}
          onSelect={onSelect}
          parallaxX={smoothX}
          parallaxY={smoothY}
          tiltX={tiltX}
          tiltY={tiltY}
          reduced={reduced}
          visible={inView}
        />

        <Connectors reduced={reduced} visible={inView} playing={playing} />

        <ProductCard
          showcase={showcase}
          parallaxX={smoothX}
          parallaxY={smoothY}
          reduced={reduced}
          visible={inView}
          pulsing={connectActive}
        />

        <TileColumns
          tiles={showcase.tiles}
          parallaxX={smoothX}
          parallaxY={smoothY}
          reduced={reduced}
          visible={inView}
          pulsing={connectActive}
        />
      </div>
    </div>
  );
}
