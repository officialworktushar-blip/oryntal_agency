"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between children. */
  stagger?: number;
  delay?: number;
};

/** Container: wrap each child in <Stagger.Item>. */
export default function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </m.div>
  );
}

function Item({ children, className, y = 14 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </m.div>
  );
}

Stagger.Item = Item;
