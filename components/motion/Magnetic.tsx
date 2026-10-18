"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** Max offset in px. */
  strength?: number;
};

/** Small magnetic hover pull for CTA buttons (desktop only, reduced-motion safe). */
export default function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
