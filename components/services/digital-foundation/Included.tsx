"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";
import ShowcaseCanvas from "./ShowcaseCanvas";

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
      <div className="df-incl-stage-bg df-incl-grain relative overflow-hidden pb-16 md:pb-24">
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

    </section>
  );
}
