"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { sourcingCompare } from "@/lib/content/services/sourcing";
import { m } from "framer-motion";

export default function SourcingCompare() {
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const headingVariants = shouldAnimate
    ? {
        initial: { y: 16, opacity: 0.6 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : { initial: {}, animate: {} };

  const rowVariants = shouldAnimate
    ? {
        initial: { y: 14, opacity: 0.6 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.4, ease: "easeOut" },
      }
    : { initial: {}, animate: {} };

  return (
    <section
      id="why-oryntal"
      aria-labelledby="so-compare-title"
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#000" }}
    >
      {/* Top fade from hero */}
      <div
        className="absolute inset-x-0 top-0 h-[200px] flex pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #7C58F0 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #5A37D1 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #4B30A8 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[25%]"
          style={{ background: "linear-gradient(180deg, #2A1F5E 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #4B30A8 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #5A37D1 0%, rgba(0,0,0,0) 100%)" }}
        />
        <div
          className="w-[12.5%]"
          style={{ background: "linear-gradient(180deg, #7C58F0 0%, rgba(0,0,0,0) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 pt-[150px] md:pt-[170px] pb-[80px] md:pb-[110px]">
        {/* Heading */}
        <div className="text-center">
          <h2
            id="so-compare-title"
            className="font-normal tracking-[-0.03em] leading-[1.1] text-4xl md:text-5xl lg:text-[58px] text-white max-w-3xl mx-auto text-balance"
          >
            <m.div {...headingVariants} transition={{ delay: 0 }}>
              {sourcingCompare.headingLine1}
            </m.div>
            <m.div {...headingVariants} transition={{ delay: 0.08 }}>
              {sourcingCompare.headingLine2}
            </m.div>
          </h2>
          <m.p
            className="mt-6 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto"
            {...headingVariants}
            transition={{ delay: 0.16 }}
          >
            {sourcingCompare.sub}
          </m.p>
        </div>

        {/* Table */}
        <div className="mt-14 md:mt-16 max-w-[1090px] mx-auto relative">
          {/* Header */}
          <div className="rounded-[28px] border border-white/10 relative z-10 hidden md:flex items-center min-h-[104px]">
            <div className="px-10 flex items-center gap-4 w-[60%]">
              <Image
                src="/logo.png"
                alt="ORYNTAL"
                width={150}
                height={36}
                priority
                className="h-9 w-auto"
              />
            </div>
            <div className="px-10 w-[40%]">
              <span className="text-base font-semibold text-white">
                {sourcingCompare.themHeader}
              </span>
            </div>
            <span className="sr-only">
              {sourcingCompare.usHeader} vs. {sourcingCompare.themHeader}
            </span>
          </div>

          {/* Logo on small screens */}
          <div className="md:hidden flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="ORYNTAL"
              width={150}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </div>

          {/* Overlay for left column (desktop) */}
          <div
            className="hidden md:block absolute left-0 top-0 w-[60%] bottom-[-76px] rounded-[28px] border border-[#8B7CFF] z-0 pointer-events-none"
            style={{
              borderWidth: "1.5px",
              background: "rgba(40,28,110,0.28)",
              boxShadow: "0 0 80px rgba(99,61,230,0.22)",
            }}
          />

          {/* Button in the overhang (desktop) */}
          <div className="hidden md:flex absolute left-0 w-[60%] bottom-0 h-[76px] items-center justify-center z-10">
            <Link
              href={sourcingCompare.cta.href}
              className="bg-white text-[#1D1E20] rounded-xl px-8 py-3 font-medium hover:-translate-y-0.5 hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 inline-flex items-center gap-3"
            >
              {sourcingCompare.cta.label}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
          </div>

          {/* Rows */}
          <ul role="list" className="relative z-10 space-y-0">
            {sourcingCompare.rows.map((row, index) => (
              <m.li
                key={row.id}
                className="grid md:grid-cols-[3fr_2fr] border-t border-white/10 min-h-[84px] mt-3 md:mt-0 rounded-2xl md:rounded-none border border-white/10 md:border-0 md:border-t hover:bg-white/[0.03] transition-colors duration-150"
                {...rowVariants}
                transition={{ delay: index * 0.08 }}
              >
                {/* Left cell */}
                <div className="px-6 md:px-10 py-6 flex items-center justify-between gap-4 border-l-2 border-[#8B7CFF] md:border-l-0 bg-[rgba(40,28,110,0.28)] md:bg-transparent">
                  <span className="md:hidden block text-[11px] uppercase tracking-widest text-white/45 px-6 pt-4 -mt-6 md:mt-0">
                    ORYNTAL
                  </span>
                  <span className="text-[16px] md:text-[17px] font-semibold text-white leading-snug">
                    {row.us}
                  </span>
                  <div className="h-[22px] w-[22px] rounded-full bg-[#2EC27E] flex items-center justify-center shrink-0 hover:scale-112 transition-transform duration-150">
                    <Check className="h-[13px] w-[13px] text-white" strokeWidth={3} aria-hidden="true" />
                  </div>
                  <span className="sr-only">Included</span>
                </div>

                {/* Right cell */}
                <div className="px-6 md:px-10 py-6 flex items-center">
                  <span className="md:hidden block text-[11px] uppercase tracking-widest text-white/45 px-6 pt-4 -mt-6 md:mt-0">
                    Going it alone
                  </span>
                  <span className="text-[16px] md:text-[17px] text-white/85 leading-snug">
                    {row.them}
                  </span>
                </div>
              </m.li>
            ))}
          </ul>

          {/* Button on small screens */}
          <div className="md:hidden mt-8 flex justify-center">
            <Link
              href={sourcingCompare.cta.href}
              className="bg-white text-[#1D1E20] rounded-xl px-8 py-3 font-medium hover:-translate-y-0.5 hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 inline-flex items-center gap-3"
            >
              {sourcingCompare.cta.label}
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Trust line */}
        <div className="mt-10 md:mt-24 flex items-center justify-center gap-2 text-sm text-white/75">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>{sourcingCompare.trust}</span>
        </div>

        {/* Footnote */}
        <p className="mt-4 text-center max-w-2xl mx-auto text-xs text-white/50 leading-relaxed">
          {sourcingCompare.footnote}
        </p>
      </div>
    </section>
  );
}
