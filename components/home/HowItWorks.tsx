"use client";

import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { howItWorks } from "@/lib/content/home";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-brand-dark py-20 text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 size-[28rem] rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-[24rem] rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-soft">
            {howItWorks.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {howItWorks.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            {howItWorks.description}
          </p>
        </Reveal>

        <div ref={containerRef} className="relative mx-auto mt-16 max-w-5xl">
          {/* Vertical draw-line (desktop centre) */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/15 md:left-1/2 md:block">
            <m.div
              className="w-full origin-top bg-brand"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              animate={inView && !reduced ? { scaleY: 1 } : { scaleY: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {howItWorks.steps.map((step, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={step.number} delay={i * 0.05}>
                  <div
                    className={`relative grid items-center gap-6 md:grid-cols-2 md:gap-16 ${
                      flip ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className={flip ? "md:text-left" : "md:text-right md:justify-self-end"}>
                      <span className="inline-grid size-11 place-items-center rounded-full border border-white/20 bg-brand text-sm font-bold">
                        {step.number}
                      </span>
                      <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                        {step.description}
                      </p>
                    </div>

                    <MediaPlaceholder
                      type="image"
                      aspect="4/3"
                      label={step.image}
                      hint="Small supporting visual for this step."
                      dark
                      className="max-w-sm"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <Link href={howItWorks.cta.href} className="link-arrow !text-brand-soft hover:!text-white">
            {howItWorks.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
