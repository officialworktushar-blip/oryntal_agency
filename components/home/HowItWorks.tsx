"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "framer-motion";
import {
  buildTab,
  growTab,
  launchTab,
  manageTab,
} from "@/lib/content/howItWorks";
import GrowTypingStack from "./GrowTypingStack";
import HowItWorksPanel from "./HowItWorksPanel";
import LaunchShowcase, { type LaunchShowcaseTab } from "./LaunchShowcase";
import ManageBars from "./ManageBars";

export default function HowItWorks() {
  const reduced = useReducedMotion() ?? false;

  const headGroup: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const headItem: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="scroll-mt-24 overflow-hidden bg-white"
    >
      {/* Lavender to white fade at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-[linear-gradient(180deg,rgba(239,235,255,1)_0%,rgba(255,255,255,0)_100%)] -translate-y-20"
      />

      <div className="container-x relative">
        <m.div
          variants={headGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="pt-20 pb-10 text-center md:pt-28 md:pb-14"
        >
          <m.h2
            id="how-it-works-title"
            variants={headItem}
            className="text-center text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl"
          >
            How our business works
          </m.h2>

          <m.p
            variants={headItem}
            className="mx-auto mt-5 max-w-2xl text-center text-base text-muted md:text-lg"
          >
            Four stages, one connected system. We start by understanding your
            business, then build, launch, grow, and manage the technology around
            it.
          </m.p>
        </m.div>

        {/* ---------------------------------------------------------- BUILD */}
        <section
          id="how-build"
          aria-labelledby="how-build-title"
          className="scroll-mt-24 pt-4 pb-16 md:pt-8 md:pb-24"
        >
          <HowItWorksPanel tab={buildTab} headingId="how-build-title" />
        </section>

        {/* --------------------------------------------------------- LAUNCH */}
        <section
          id="how-launch"
          aria-labelledby="how-launch-title"
          className="scroll-mt-24 border-t border-line py-16 md:py-24"
        >
          <LaunchShowcase
            tab={launchTab as LaunchShowcaseTab}
            headingId="how-launch-title"
          />
        </section>

        {/* ----------------------------------------------------------- GROW */}
        <section
          id="how-grow"
          aria-labelledby="how-grow-title"
          className="scroll-mt-24 border-t border-line py-16 md:py-24"
        >
          <GrowTypingStack tab={growTab} headingId="how-grow-title" />
        </section>

        {/* --------------------------------------------------------- MANAGE */}
        <section
          id="how-manage"
          aria-labelledby="how-manage-title"
          className="scroll-mt-24 py-16 md:py-24"
        >
          <ManageBars tab={manageTab} headingId="how-manage-title" />
        </section>

        <div className="pb-20 text-center text-sm text-muted md:pb-28">
          Scope, timelines, and support are confirmed in your proposal. For
          custom engagements we typically plan a three-month engagement.{" "}
          <Link
            href="/services/consultation"
            className="underline decoration-muted underline-offset-4 transition-colors hover:text-brand"
          >
            See the 3-month engagement
          </Link>
        </div>
      </div>
    </section>
  );
}
