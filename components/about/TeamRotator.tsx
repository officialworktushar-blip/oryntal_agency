"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const PEOPLE = [
  {
    src: "/Tushar_Purple.webp",
    alt: "Tushar Srivastav, CEO of ORYNTAL",
    caption: "Tushar Srivastav, CEO",
    dot: "Show Tushar Srivastav",
  },
  {
    src: "/Dipesh_Purple.webp",
    alt: "Dipesh Mayla, CBO of ORYNTAL",
    caption: "Dipesh Mayla, CBO",
    dot: "Show Dipesh Mayla",
  },
  {
    src: "/Parth_Purple.webp",
    alt: "Parth Srivastav, CMO of ORYNTAL",
    caption: "Parth Srivastav, CMO",
    dot: "Show Parth Srivastav",
  },
];

const INTERVAL_MS = 4000;

export default function TeamRotator({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !inView || !pageVisible || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PEOPLE.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [ready, inView, pageVisible, reducedMotion, index, resetKey]);

  function goTo(next: number) {
    setIndex(next);
    setResetKey((key) => key + 1);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative aspect-[4/5] w-full">
        {PEOPLE.map((person, personIndex) => {
          const active = personIndex === index;
          return (
            <Image
              key={person.src}
              src={person.src}
              alt={person.alt}
              fill
              sizes="(min-width:1024px) 620px, (min-width:640px) 520px, 90vw"
              priority={personIndex === 0}
              onLoad={personIndex === 0 ? () => setReady(true) : undefined}
              className={`object-contain object-bottom transition-all duration-[600ms] ease-out ${
                active
                  ? "z-10 scale-100 opacity-100"
                  : "pointer-events-none z-0 scale-[1.03] opacity-0"
              }`}
              style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.25))" }}
            />
          );
        })}

        {children}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2.5">
        {PEOPLE.map((person, personIndex) => {
          const active = personIndex === index;
          return (
            <button
              key={person.src}
              type="button"
              aria-label={person.dot}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(personIndex)}
              className="flex h-11 items-center rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f5fb] sm:h-4"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  active ? "w-6 bg-[#673DE6]" : "w-1.5 bg-black/25"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        className="relative mt-3 h-5 text-center text-sm text-[#26262b]"
        aria-live="off"
      >
        {PEOPLE.map((person, personIndex) => {
          const active = personIndex === index;
          return (
            <span
              key={person.src}
              aria-hidden={active ? undefined : true}
              className={`absolute inset-0 transition-opacity duration-500 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {person.caption}
            </span>
          );
        })}
      </div>
    </div>
  );
}
