"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion, type Variants, AnimatePresence } from "framer-motion";
import { howItWorksTabs, type HowItWorksTab, type GrowTypingTab } from "@/lib/content/howItWorks";
import { cn } from "@/lib/cn";
import GrowTypingStack from "./GrowTypingStack";
import HowItWorksPanel from "./HowItWorksPanel";
import LaunchShowcase from "./LaunchShowcase";

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

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<HowItWorksTab["id"]>(
    howItWorksTabs[0]?.id ?? "build",
  );
  const reduced = useReducedMotion();
  const tabBarRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
      aria-labelledby="how-it-works-title"
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
            id="how-it-works-title"
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
              className="min-h-[560px] lg:min-h-[600px]"
            >
              {howItWorksTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const isGrowStack = tab.layout === "typing-stack";
                const isBrowserShowcase = tab.layout === "browser-showcase";

                return (
                  <div
                    key={tab.id}
                    id={`howitworks-panel-${tab.id}`}
                    role="tabpanel"
                    aria-labelledby={`howitworks-tab-${tab.id}`}
                    hidden={!isActive}
                  >
                    {isGrowStack ? (
                      /* Grow — typing stack panel */
                      <GrowTypingStack
                        tab={tab as GrowTypingTab}
                        isActive={isActive}
                      />
                    ) : isBrowserShowcase ? (
                      /* Launch — browser showcase panel */
                      <LaunchShowcase
                        tab={
                          tab as import("@/lib/content/howItWorks").HowItWorksTab & {
                            layout: "browser-showcase";
                            media: { label: string; hint: string };
                            keywordLine: string;
                            browser: { url: string };
                            toasts: Array<{ icon: string; title: string; sub: string }>;
                            videoSrc?: string;
                            posterSrc?: string;
                          }
                        }
                      />
                    ) : (
                      /* Build / Manage — media left, copy right */
                      <>
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <m.div
                              key={tab.id}
                              variants={panelFade}
                              initial="enter"
                              animate="center"
                              exit="exit"
                            >
                              <HowItWorksPanel tab={tab} reduced={reduced ?? false} />
                            </m.div>
                          )}
                        </AnimatePresence>
                        {/* Inactive panels stay in the DOM (hidden) for SEO/no-JS */}
                        {!isActive && (
                          <HowItWorksPanel tab={tab} reduced={reduced ?? false} />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
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
