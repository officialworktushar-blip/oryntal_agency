"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { howItWorksTabs, type HowItWorksTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";

const tabList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const tabItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionReveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const panelFade: Variants = {
  enter: { opacity: 0, y: 16, scale: 0.98 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.25 } },
};

const bulletItem: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

const bulletContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<HowItWorksTab["id"]>(
    howItWorksTabs[0]?.id ?? "build",
  );
  const reduced = useReducedMotion();
  const tabBarRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeTabData = howItWorksTabs.find((tab) => tab.id === activeTab);
  // mediaSrc optional; not used yet, but keep for future reuse
  // const hasVideoSrc = Boolean(activeTabData?.media && (activeTabData.media as { src?: string }).src);
  const currentIndex = howItWorksTabs.findIndex((t) => t.id === activeTab);

  const scrollActiveTabIntoView = useCallback(() => {
    if (activeTabRef.current && tabBarRef.current) {
      const container = tabBarRef.current;
      const element = activeTabRef.current;
      const containerWidth = container.offsetWidth;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;

      container.scrollTo({
        left: elementLeft - (containerWidth - elementWidth) / 2,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollActiveTabIntoView();
  }, [activeTab, scrollActiveTabIntoView]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (howItWorksTabs.length === 0) return;

    const current = currentIndex;
    let nextIndex = current;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (current + 1) % howItWorksTabs.length;
        event.preventDefault();
        break;
      case "ArrowLeft":
        nextIndex = (current - 1 + howItWorksTabs.length) % howItWorksTabs.length;
        event.preventDefault();
        break;
      case "Home":
        nextIndex = 0;
        event.preventDefault();
        break;
      case "End":
        nextIndex = howItWorksTabs.length - 1;
        event.preventDefault();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        return;
      default:
        return;
    }

    setActiveTab(howItWorksTabs[nextIndex].id);
  };

  const sectionVariants = reduced ? sectionReveal : sectionReveal;
  const headVariants = reduced ? fadeOnly : fadeUp;
  const barVariants = reduced ? fadeOnly : tabItem;
  const panelContainerVariants = reduced ? fadeOnly : fadeUp;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-white py-20 md:py-28"
    >
      {/* Lavender to white fade at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-[linear-gradient(180deg,rgba(239,235,255,1)_0%,rgba(255,255,255,0)_100%)] -translate-y-20"
      />

      <div className="container-x relative">
        <m.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <m.h2
            variants={headVariants}
            className="text-center text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl"
          >
            How our business works
          </m.h2>

          <m.p
            variants={headVariants}
            className="mx-auto mt-5 max-w-2xl text-center text-base text-muted md:text-lg"
          >
            Four stages, one connected system. We start by understanding your
            business, then build, launch, grow, and manage the technology around
            it.
          </m.p>

          {/* Tab bar */}
          <m.div
            variants={barVariants}
            className="mt-10 flex justify-center"
          >
            <div
              ref={tabBarRef}
              role="tablist"
              aria-label="How our business works stages"
              onKeyDown={handleKeyDown}
              className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-white p-1.5 shadow-[0_6px_24px_rgba(20,12,56,0.08)] no-scrollbar snap-x"
            >
              {howItWorksTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} className="relative snap-start">
                    {isActive && (
                      <m.span
                        layoutId="howTabPill"
                        className="absolute inset-0 rounded-full bg-[#1D1E20]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <button
                      ref={isActive ? activeTabRef : undefined}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls={`howitworks-panel-${tab.id}`}
                      id={`howitworks-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative z-10 inline-flex items-center rounded-full px-5 py-3 text-[15px] font-semibold text-ink outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-brand sm:px-7",
                        isActive ? "text-white" : "hover:bg-black/5",
                        !reduced && "hover:scale-[1.02]",
                      )}
                    >
                      {tab.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </m.div>

          {/* Panel */}
          <m.div
            variants={panelContainerVariants}
            className="mt-10 md:mt-14"
          >
            <div
              ref={panelRef}
              className="min-h-[420px] overflow-hidden rounded-[32px] border border-white bg-brand-wash p-4 md:p-6 lg:min-h-[440px]"
            >
              <AnimatePresence mode="wait">
                {activeTabData && (
                  <m.div
                    key={activeTabData.id}
                    id={`howitworks-panel-${activeTabData.id}`}
                    role="tabpanel"
                    aria-labelledby={`howitworks-tab-${activeTabData.id}`}
                    variants={panelFade}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
                      {/* Left: Media */}
                      <div className="relative aspect-video rounded-3xl bg-white/70 shadow-[0_20px_60px_rgba(103,61,230,0.12)] ring-1 ring-white/70">
                        <MediaPlaceholder
                          type="video"
                          aspect="16/9"
                          label={activeTabData.media.label}
                          hint={activeTabData.media.hint}
                          className="h-full w-full justify-end rounded-3xl border-[#673DE6]/40 bg-transparent pb-12 text-[#2F1C6A] [&>span:first-child]:hidden"
                        />

                        {/* Glass chip */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur">
                          <span className="size-1.5 rounded-full bg-[#673DE6]" />
                          {activeTabData.step.includes(" · ") ? (
                            <span>
                              {activeTabData.step.split(" · ")[0].trim()} ·{" "}
                              {activeTabData.step.split(" · ")[1].trim()}
                            </span>
                          ) : (
                            <span>{activeTabData.step}</span>
                          )}
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex flex-col p-4 md:p-6 lg:p-8">
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
                          {activeTabData.step.split(" of")[0]}
                        </span>
                        <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl md:leading-[1.15]">
                          {activeTabData.title}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                          {activeTabData.description}
                        </p>

                        <m.ul
                          variants={bulletContainer}
                          initial="hidden"
                          animate="show"
                          className="mt-6 space-y-3"
                        >
                          {activeTabData.bullets.map((bullet) => (
                            <m.li
                              key={bullet}
                              variants={bulletItem}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-[#673DE6]/10">
                                <Check
                                  className="size-3.5 text-[#673DE6]"
                                  strokeWidth={2.75}
                                />
                              </span>
                              <span className="text-ink">{bullet}</span>
                            </m.li>
                          ))}
                        </m.ul>

                        <div className="mt-8">
                          <Link
                            href={activeTabData.cta.href}
                            className={cn(
                              "group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-base font-medium text-white shadow-cta outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand ring-offset-2 ring-offset-white",
                              !reduced && "hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lift",
                            )}
                          >
                            {activeTabData.cta.label}
                            <ArrowRight
                              className={cn(
                                "size-5 transition-transform duration-200",
                                !reduced && "group-hover:translate-x-1",
                              )}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-center text-sm text-muted">
              Scope, timelines, and support are confirmed in your proposal. For
              custom engagements we typically plan a three-month engagement.{" "}
              <Link
                href="/services/consultation"
                className="underline decoration-muted underline-offset-4 transition-colors hover:text-brand"
              >
                See the 3-month engagement
              </Link>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
