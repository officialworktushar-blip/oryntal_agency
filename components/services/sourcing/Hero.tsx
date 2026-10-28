"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { sourcing } from "@/lib/content/services/sourcing";
import { motion, useReducedMotion } from "framer-motion";

export default function SourcingHero() {
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const columnVariants = shouldAnimate
    ? {
        initial: { opacity: 0.92 },
        animate: {
          opacity: [0.92, 1, 0.92],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      }
    : {};

  const textVariants = shouldAnimate
    ? {
        initial: { y: 20, opacity: 0.6 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
      }
    : { initial: {}, animate: {} };

  const pillarVariants = shouldAnimate
    ? {
        initial: { y: 12, opacity: 0.6 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : { initial: {}, animate: {} };

  return (
    <section
      aria-labelledby="so-hero-title"
      className="relative isolate overflow-hidden text-center text-white"
      style={{ backgroundColor: "#0C0D0D" }}
    >
      {/* Background columns */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Column 1 */}
        <motion.div
          className="absolute top-[12%] left-0 w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #15122A 0%, #7C58F0 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 0 }}
        />
        {/* Column 2 */}
        <motion.div
          className="absolute top-[12%] left-[12.5%] w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #14122A 0%, #5A37D1 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 1 }}
        />
        {/* Column 3 */}
        <motion.div
          className="absolute top-[30%] left-[25%] w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #121022 0%, #4B30A8 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 2 }}
        />
        {/* Column 4 (center) */}
        <motion.div
          className="absolute top-[54%] left-[37.5%] w-[25%] h-full"
          style={{
            background: "linear-gradient(180deg, #0E0E12 0%, #2A1F5E 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 3 }}
        />
        {/* Column 5 */}
        <motion.div
          className="absolute top-[30%] left-[62.5%] w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #121022 0%, #4B30A8 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 4 }}
        />
        {/* Column 6 */}
        <motion.div
          className="absolute top-[12%] left-[75%] w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #14122A 0%, #5A37D1 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 5 }}
        />
        {/* Column 7 */}
        <motion.div
          className="absolute top-[12%] left-[87.5%] w-[12.5%] h-full"
          style={{
            background: "linear-gradient(180deg, #15122A 0%, #7C58F0 100%)",
          }}
          {...columnVariants}
          transition={{ delay: 6 }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 38%, rgba(12,13,13,0.85), rgba(12,13,13,0) 75%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="min-h-[680px] flex flex-col items-center justify-center"
          style={{
            paddingTop: "calc(var(--header-h, 72px) + 64px)",
            paddingBottom: "64px",
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-white/55">
            <ol className="flex items-center justify-center gap-2">
              <li>Services</li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>Individual Services</li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li
                className="text-white/80"
                aria-current="page"
              >
                Business Operations & Sourcing Support
              </li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <motion.p
            className="mt-6 text-[15px] md:text-base font-medium"
            style={{ color: "#9B95FF" }}
            {...textVariants}
          >
            {sourcing.eyebrow}
          </motion.p>

          {/* H1 */}
          <h1
            id="so-hero-title"
            className="mt-5 font-normal tracking-[-0.035em] leading-[1.08] text-white text-5xl sm:text-6xl lg:text-[68px] max-w-4xl mx-auto text-balance"
          >
            <motion.div {...textVariants} transition={{ delay: 0.08 }}>
              {sourcing.h1Line1}
            </motion.div>
            <motion.div {...textVariants} transition={{ delay: 0.16 }}>
              {sourcing.h1Line2}
            </motion.div>
          </h1>

          {/* Sub */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto"
            {...textVariants}
            transition={{ delay: 0.24 }}
          >
            {sourcing.sub}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            {...textVariants}
            transition={{ delay: 0.32 }}
          >
            <Link
              href={sourcing.primaryCta.href}
              className="rounded-xl bg-white px-12 py-4 text-lg font-medium text-[#1D1E20] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {sourcing.primaryCta.label}
            </Link>
            <a
              href={sourcing.secondaryCta.href}
              className="rounded-xl border border-white/30 px-8 py-4 text-lg font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 flex items-center gap-2"
            >
              {sourcing.secondaryCta.label}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Pricing line */}
          <motion.div
            className="mt-5 flex flex-col items-center justify-center gap-1"
            {...textVariants}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/75">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>{sourcing.trust}</span>
            </div>
            <p className="text-xs text-white/55">{sourcing.pricingNote}</p>
          </motion.div>

          {/* Pillars */}
          <motion.div
            className="mt-12 md:mt-14 max-w-[920px] mx-auto grid grid-cols-2 lg:grid-cols-4"
            initial="initial"
            animate="animate"
            style={{ textShadow: "0 1px 12px rgba(10,6,30,0.6)" }}
          >
            {sourcing.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  className="py-3 px-4 flex flex-col items-center text-center gap-2 lg:border-l lg:border-white/15 border-t border-white/15 first:border-t-0 first:lg:border-l-0"
                  {...pillarVariants}
                  transition={{ delay: index * 0.07 }}
                >
                  <div className="h-11 w-11 flex items-center justify-center rounded-full bg-white/8 border border-white/12 transition hover:bg-white/16 hover:scale-[1.06]">
                    <Icon className="h-[22px] w-[22px]" style={{ color: "#B9A8FF" }} aria-hidden="true" />
                  </div>
                  <span className="text-[15px] font-semibold text-white">
                    {pillar.title}
                  </span>
                  <span className="text-[13px] text-white/70">
                    {pillar.caption}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Network note + disclaimer */}
          <motion.div
            className="mt-8 text-center max-w-2xl mx-auto"
            {...textVariants}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-white/80">{sourcing.networkNote}</p>
            <p className="mt-2 text-xs text-white/55 leading-relaxed">
              {sourcing.disclaimer}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Screen reader services list */}
      <ul
        aria-label="What we help with"
        className="sr-only"
      >
        {sourcing.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}
