"use client";

import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  digitalFoundation,
  includedFooter,
} from "@/lib/content/packages/digitalFoundation";
import { cn } from "@/lib/cn";
import ShowcaseCanvas from "./ShowcaseCanvas";
import FeatureCaption from "./FeatureCaption";

const AUTOPLAY_MS = 3800;
const OVERVIEW_DWELL_MS = 1200;
const MANUAL_PAUSE_MS = 10000;

export default function Included() {
  const reduced = useReducedMotion() ?? false;
  const { included, showcase } = digitalFoundation;
  const [titleLead, titleTail] = included.titleLines;

  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { amount: 0.35 });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [pausedUntil, setPausedUntil] = useState(0);

  const nextAt = useRef<number | null>(null);
  const cycle = useRef(included.items.map((item) => item.id));

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // The cycle only runs while the stage is on screen, the tab is visible and
  // the visitor is not pointing at (or focused inside) the illustration.
  useEffect(() => {
    if (reduced || !stageInView || !pageVisible || interacting) return;

    const now = Date.now();
    if (nextAt.current === null) nextAt.current = now + OVERVIEW_DWELL_MS;

    const target = Math.max(nextAt.current, pausedUntil);
    const wait = Math.max(0, target - now);

    const timer = window.setTimeout(() => {
      nextAt.current = Date.now() + AUTOPLAY_MS;
      setActiveId((current) => {
        const index = current ? cycle.current.indexOf(current) : -1;
        return cycle.current[(index + 1) % cycle.current.length];
      });
    }, wait);

    return () => window.clearTimeout(timer);
  }, [reduced, stageInView, pageVisible, interacting, pausedUntil, activeId]);

  const select = (id: string) => {
    setActiveId(id);
    const until = Date.now() + MANUAL_PAUSE_MS;
    setPausedUntil(until);
    nextAt.current = until;
  };

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduced ? 0 : 24,
      filter: reduced ? "blur(0px)" : "blur(6px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* HEAD */}
      <div className="df-incl-head-bg relative pt-24 pb-10 md:pt-32">
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <m.span
              {...reveal(0)}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white"
            >
              {included.eyebrow}
            </m.span>

            <m.h2
              id="included-title"
              className="mt-6 font-normal leading-[1.08] tracking-[-0.03em] text-4xl text-white md:text-5xl lg:text-[60px]"
            >
              <m.span {...reveal(0.08)} className="block text-[#9B95FF]">
                {titleLead}
              </m.span>
              <m.span {...reveal(0.16)} className="block text-white">
                {titleTail}
              </m.span>
            </m.h2>

            <m.p
              {...reveal(0.24)}
              className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/75"
            >
              {included.intro}
            </m.p>
          </div>

          {/* Every deliverable, spelled out for screen readers and crawlers */}
          <ul
            className="sr-only"
            aria-label="What's included in the Digital Foundation Package"
          >
            {included.items.map((item) => (
              <li key={item.id}>
                {item.title} — {item.description} {item.bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* STAGE */}
      <div className="df-incl-stage-bg df-incl-grain relative overflow-hidden pb-6">
        <div
          aria-hidden="true"
          className="df-incl-stage-vignette pointer-events-none absolute inset-0"
        />

        <div
          ref={stageRef}
          className="container-x relative"
          onPointerEnter={() => setInteracting(true)}
          onPointerLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={(event) => {
            const next = event.relatedTarget as Node | null;
            if (!next || !event.currentTarget.contains(next)) {
              setInteracting(false);
            }
          }}
        >
          <ShowcaseCanvas
            showcase={showcase}
            activeId={activeId}
            onSelect={select}
            playing={stageInView && pageVisible && !reduced}
          />
        </div>
      </div>

      {/* FOOT */}
      <div className="df-incl-foot-bg relative pt-10 pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="df-included-fade pointer-events-none absolute inset-x-0 bottom-0 h-14"
        />

        <div className="container-x relative">
          {/* Caption for the highlighted deliverable */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="df-incl-foot-wash pointer-events-none absolute -inset-x-10 -inset-y-12"
            />
            <FeatureCaption
              items={included.items}
              activeId={activeId}
              onSelect={select}
            />
          </div>
          {/* Mobile: every deliverable as a card */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {included.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => select(item.id)}
                    className={cn(
                      "rounded-2xl border border-white bg-[rgba(255,255,255,0.7)] p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673DE6]",
                      index === included.items.length - 1 && "col-span-2",
                    )}
                  >
                    <span className="grid size-9 place-items-center rounded-xl bg-white/85">
                      <Icon className="size-4 text-[#673DE6]" strokeWidth={1.8} />
                    </span>
                    <p className="mt-3 text-sm font-semibold leading-snug text-[#0F1B2B]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#2B3F55]">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Closing block, sitting in the pale zone at the bottom */}
          <div className="relative mt-10 md:mt-14">
            <div
              aria-hidden="true"
              className="df-incl-foot-wash pointer-events-none absolute -inset-x-8 -inset-y-10"
            />

            <m.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto max-w-2xl text-center"
            >
              <p className="text-base leading-relaxed text-[#2B3F55] md:text-lg">
                {includedFooter.ideal}
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={includedFooter.cta.href}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#673DE6] px-10 py-4 text-lg font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(103,61,230,0.45)] focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2"
                >
                  {includedFooter.cta.label}
                </Link>
                <Link
                  href={includedFooter.secondary.href}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#2B3F55]/25 px-7 py-4 text-lg text-[#2B3F55] transition-colors duration-200 hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2"
                >
                  {includedFooter.secondary.label}
                </Link>
              </div>

              <p className="mt-4 text-xs text-[#3E5266]">
                {included.footer.feeNote}
              </p>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
