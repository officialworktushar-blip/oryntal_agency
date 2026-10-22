"use client";

import { m, useReducedMotion } from "framer-motion";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import DeliverableCard from "./DeliverableCard";

export default function Deliverables() {
  const { deliverables } = digitalFoundation;
  const reduced = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="deliverables"
      aria-labelledby="deliverables-title"
      className="relative scroll-mt-24 bg-white py-20 md:py-28"
    >
      {/* HEAD */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <m.span
          {...reveal(0)}
          className="inline-flex items-center rounded-full border border-[#E2DBFF] bg-[#F1EEFF] px-4 py-1.5 text-sm text-[#4A2FB8]"
        >
          {deliverables.pill}
        </m.span>

        <h2
          id="deliverables-title"
          className="mt-5 font-normal leading-[1.1] tracking-[-0.03em] text-4xl md:text-5xl lg:text-[56px]"
        >
          <m.span {...reveal(0.08)} className="block text-[#1D1E20]">
            {deliverables.headingLine1}
          </m.span>
          <m.span {...reveal(0.16)} className="block text-gradient-brand">
            {deliverables.headingLine2}
          </m.span>
        </h2>

        <m.p
          {...reveal(0.24)}
          className="mx-auto mt-5 max-w-2xl text-base text-[#6D7081] md:text-lg"
        >
          {deliverables.sub}
        </m.p>
      </div>

      {/* CARDS */}
      <div className="mx-auto mt-14 w-full max-w-[1700px] px-4 sm:px-6 md:mt-16">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {deliverables.cards.map((card, index) => (
            <DeliverableCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-[#6D7081]">
          {deliverables.footnote}
        </p>
      </div>
    </section>
  );
}
