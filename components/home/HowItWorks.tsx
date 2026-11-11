"use client";

import Link from "next/link";
import Image from "next/image";
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

const STAGE_IMAGES = [
  {
    src: "/build/build1.webp",
    alt: "Build stage: understanding a business and designing its website or app",
    label: "Build",
    href: "#how-build",
  },
  {
    src: "/build/build2.webp",
    alt: "Launch stage: connecting payments, WhatsApp updates and shipping",
    label: "Launch",
    href: "#how-launch",
  },
  {
    src: "/build/build3.webp",
    alt: "Grow stage: AI agents and automation capturing every lead",
    label: "Grow",
    href: "#how-grow",
  },
  {
    src: "/build/build4.webp",
    alt: "Manage stage: one dashboard for orders, clients and reports",
    label: "Manage",
    href: "#how-manage",
  },
];

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

        <m.div
          variants={headGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 pb-14 sm:gap-4 md:pb-20 lg:grid-cols-4"
        >
          {STAGE_IMAGES.map((stage) => (
            <m.a
              key={stage.label}
              href={stage.href}
              variants={headItem}
              className="group relative overflow-hidden rounded-2xl border border-line bg-brand-wash shadow-card outline-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold uppercase tracking-[0.18em] text-white sm:p-4">
                  {stage.label}
                </span>
              </div>
            </m.a>
          ))}
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
            href="/services"
            className="underline decoration-muted underline-offset-4 transition-colors hover:text-brand"
          >
            See the 3-month engagement
          </Link>
        </div>
      </div>
    </section>
  );
}
