"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { src: "", alt: "", label: "Retail business", videoHref: "", from: "#5b3de0", to: "#8b7bff" },
  { src: "", alt: "", label: "Clinic", videoHref: "", from: "#3b2a9e", to: "#7c5ce8" },
  { src: "", alt: "", label: "Wholesale business", videoHref: "", from: "#4c1d95", to: "#6a4fe0" },
];

// To add images: put portrait photos (about 4:5, for example 900x1125) in /public/about/ and set src, for example "/about/slide-1.jpg". The label is the text shown at the bottom left.

const DURATION_MS = 5000;
const TICK_MS = 100;

export default function AboutHeroSlides() {
  const [index, setIndex] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [inView, setInView] = useState(true);
  const [docHidden, setDocHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announce, setAnnounce] = useState<string | null>(null);

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
    setAnnounce(`Slide ${next + 1}: ${SLIDES[next].label}`);
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
        {announce ? (
          <p className="sr-only" aria-live="polite">
            {announce}
          </p>
        ) : null}

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
              {slide.src ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width:1024px) 460px, 90vw"
                  priority={slideIndex === 0}
                  className={`object-cover object-top transition-transform duration-700 ${
                    active ? "scale-100" : "scale-[1.04]"
                  }`}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(165deg, ${slide.from} 0%, ${slide.to} 100%)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60% 45% at 50% 22%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 70%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.5px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                </div>
              )}

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[55%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
                }}
              />

              <p
                className={`absolute bottom-6 left-6 max-w-[9rem] text-[22px] font-medium leading-[1.25] text-white transition-all duration-700 md:text-[26px] ${
                  active
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                {slide.label}
              </p>

              {slide.videoHref ? (
                <Link
                  href={slide.videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Play video: ${slide.label}`}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-0.5 h-4 w-4 text-white"
                  >
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </Link>
              ) : null}
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
              className="flex h-4 w-12 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
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
