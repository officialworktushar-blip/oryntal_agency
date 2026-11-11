"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/Tushar_Oryntal.webp", alt: "Tushar Srivastav, CEO of ORYNTAL" },
  { src: "/Dipesh_Oryntal.webp", alt: "Dipesh Mayla, CBO of ORYNTAL" },
  { src: "/Parth_Oryntal.webp", alt: "Parth Srivastav, CMO of ORYNTAL" },
];

const DURATION_MS = 5000;
const TICK_MS = 100;

export default function AboutHeroSlides() {
  const [index, setIndex] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [inView, setInView] = useState(true);
  const [docHidden, setDocHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(0);

  const autoPaused =
    hoverPause || focusPause || !inView || docHidden || reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    elapsedRef.current = 0;
    lastTickRef.current = 0;
    if (autoPaused) return;

    const id = window.setInterval(() => {
      const now = Date.now();
      const delta = lastTickRef.current ? now - lastTickRef.current : 0;
      lastTickRef.current = now;
      elapsedRef.current += delta;
      if (elapsedRef.current >= DURATION_MS) {
        elapsedRef.current = 0;
        setIndex((current) => (current + 1) % SLIDES.length);
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [index, autoPaused]);

  function goToSlide(next: number) {
    elapsedRef.current = 0;
    lastTickRef.current = 0;
    setIndex(next);
  }

  return (
    <div>
      <div
        ref={cardRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Our work in different businesses"
        onPointerEnter={() => setHoverPause(true)}
        onPointerLeave={() => setHoverPause(false)}
        onFocus={() => setFocusPause(true)}
        onBlur={() => setFocusPause(false)}
        className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(124,92,232,0.28)]"
      >
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slideIndex}
              aria-hidden={active ? undefined : true}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width:1024px) 360px, 90vw"
                priority={slideIndex === 0}
                className={`object-cover object-top transition-transform duration-700 ${
                  active ? "scale-100" : "scale-[1.04]"
                }`}
              />

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[55%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2.5">
        {SLIDES.map((_, slideIndex) => {
          const active = slideIndex === index;
          return (
            <button
              key={slideIndex}
              type="button"
              aria-label={`Show slide ${slideIndex + 1} of ${SLIDES.length}`}
              aria-current={active ? "true" : undefined}
              onClick={() => goToSlide(slideIndex)}
              className="flex h-11 w-12 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e] sm:h-4"
            >
              <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/20">
                {active ? (
                  <span
                    key={index}
                    className="ah-progress-fill absolute inset-y-0 left-0 w-full rounded-full bg-white"
                    style={{
                      animationPlayState: autoPaused ? "paused" : "running",
                    }}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes ah-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .ah-progress-fill {
          transform-origin: left center;
          animation: ah-progress 5000ms linear both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ah-progress-fill {
            animation: none;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
