"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  websiteApp,
  type WebsiteAppStat,
} from "@/lib/content/services/websiteApp";
import { cn } from "@/lib/cn";

function StatValue({ stat }: { stat: WebsiteAppStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion() ?? false;
  const finalText = String(stat.value);
  const isCount = stat.valueType === "count" && typeof stat.value === "number";
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    if (!inView || reduced) {
      setActive(false);
      setDisplay(finalText);
      return;
    }

    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    setActive(true);

    if (isCount) {
      const target = stat.value as number;
      const start = performance.now();
      setDisplay("0");

      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(String(Math.round(target * eased)));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setActive(false);
        }
      };

      frame = requestAnimationFrame(tick);
    } else {
      setDisplay("");
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplay(finalText.slice(0, index));
        if (index >= finalText.length) {
          if (interval) clearInterval(interval);
          setActive(false);
        }
      }, 90);
    }

    return () => {
      cancelAnimationFrame(frame);
      if (interval) clearInterval(interval);
    };
  }, [finalText, inView, isCount, reduced, stat.value]);

  return (
    <div ref={ref} className="relative mt-6 inline-flex justify-center">
      <span
        className={cn(
          "ws-stat-value block font-light leading-none tracking-[-0.03em] tabular-nums text-[#9B95FF] text-6xl md:text-[72px] lg:text-[96px]",
          active && "invisible"
        )}
        style={{ minWidth: `${Math.max(1, finalText.length)}ch` }}
      >
        {finalText}
      </span>
      {active ? (
        <span
          aria-hidden="true"
          className="ws-stat-value absolute inset-0 flex items-center justify-center font-light leading-none tracking-[-0.03em] tabular-nums text-[#9B95FF] text-6xl md:text-[72px] lg:text-[96px]"
        >
          {display}
        </span>
      ) : null}
    </div>
  );
}

export default function StatsRow() {
  const { stats, services, srSummary, footnote } = websiteApp;

  return (
    <div className="relative isolate mx-auto mt-16 w-full max-w-[1500px] md:mt-20 lg:mt-24">
      <div aria-hidden="true" className="ws-stats-vignette" />
      <p className="sr-only">{srSummary}</p>
      <ul className="sr-only" aria-label="Services included">
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>

      <ul
        aria-label="Website and application development highlights"
        className="grid w-full grid-cols-2 md:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <li
            key={stat.label}
            className="ws-stat-cell group relative flex min-h-[200px] flex-col items-center justify-between px-6 py-2 text-center md:min-h-[240px] lg:min-h-[285px]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "ws-divider-v absolute bottom-0 left-0 top-0 w-px bg-white/10",
                index % 2 === 1 ? "block" : "hidden",
                index > 0 && "md:block"
              )}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            />
            {index >= 2 ? (
              <span
                aria-hidden="true"
                className="ws-divider-h absolute left-4 right-4 top-0 h-px bg-white/10 md:hidden"
                style={{ animationDelay: `${100 + index * 100}ms` }}
              />
            ) : null}

            <p className="max-w-[16rem] text-sm leading-snug text-white/90 md:text-[15px] lg:text-[17px]">
              {stat.caption}
            </p>

            <StatValue stat={stat} />

            <p className="mt-3 text-sm text-white/75 md:text-base">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-2xl px-4 text-center text-xs text-white/40">
        {footnote}
      </p>
    </div>
  );
}
