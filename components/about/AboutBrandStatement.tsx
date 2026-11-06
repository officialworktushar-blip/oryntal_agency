"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

const ROTATING_WORDS = [
  "websites",
  "apps",
  "automation",
  "chat and voice tools",
  "connected systems",
  "supplier connections",
];

const ROTATE_MS = 2400;

const STRIP_WORDS = [
  "Websites",
  "Apps",
  "Automation",
  "Chat tools",
  "Voice tools",
  "Integrations",
  "Supplier connections",
  "Custom proposals",
];

const SUPPORTING_TEXT =
  "Our job is simple: make your business easier to run, and your customers easier to serve.";

const STATIC_SENTENCE = `We build ${ROTATING_WORDS.slice(0, -1).join(", ")} and ${ROTATING_WORDS[ROTATING_WORDS.length - 1]}.`;

const LETTERS = "ryntal".split("");

export default function AboutBrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isIn, setIsIn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible || tabHidden) return;
    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % ROTATING_WORDS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, visible, tabHidden]);

  const prevWordIndex =
    (wordIndex - 1 + ROTATING_WORDS.length) % ROTATING_WORDS.length;

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      className={`relative overflow-hidden border-t border-black/5 py-[72px] md:py-28 ${
        isIn ? "is-in" : ""
      }`}
      style={{ background: "#ecebf2" }}
    >
      {/* soft white light from the top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[4%] h-[560px] w-[700px] blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <style>{`
        @keyframes bs-mark-in {
          from { opacity: 0; transform: scale(0.6) rotate(-25deg); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bs-dot-in {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bs-dot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bs-letter-in {
          from { opacity: 0; transform: translateY(0.5em); filter: blur(8px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes bs-tail-shimmer {
          from { opacity: 0.55; }
          to { opacity: 1; }
        }
        @keyframes bs-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bs-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .bs-mark-g, .bs-dot, .bs-letter { opacity: 0; }
          .bs-mark-g { transform-box: fill-box; transform-origin: center; }
          .is-in .bs-mark-g {
            animation: bs-mark-in 0.9s cubic-bezier(0.2, 1.4, 0.4, 1) both;
          }
          .is-in .bs-dot {
            animation:
              bs-dot-in 0.55s cubic-bezier(0.2, 1.4, 0.4, 1) 0.5s both,
              bs-dot-float 4s ease-in-out 2.2s infinite;
          }
          .is-in .bs-letter {
            animation: bs-letter-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
            animation-delay: calc(0.3s + var(--i, 0) * 70ms);
          }
          .is-in .bs-tail {
            animation: bs-tail-shimmer 3.2s ease-in-out 2.4s infinite alternate;
          }
          .bs-fade { opacity: 0; }
          .is-in .bs-fade {
            animation: bs-fade-up 0.7s ease-out both;
          }
          .bs-marquee-track {
            animation: bs-marquee 35s linear infinite;
          }
          .bs-strip:hover .bs-marquee-track {
            animation-play-state: paused;
          }
        }
        .bs-strip-static { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .bs-marquee-track { display: none; }
          .bs-strip-static { display: flex; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* wordmark */}
        <div className="text-center">
          <h2 className="sr-only">ORYNTAL</h2>
          <div
            role="img"
            aria-label="ORYNTAL"
            className="inline-flex items-end gap-[0.06em] font-bold leading-[1] tracking-[-0.02em] text-[#1b1b22]"
            style={{ fontSize: "clamp(88px, 17vw, 240px)" }}
          >
            {/* Approximate mark. Replace with the real logo file. */}
            <svg
              viewBox="0 0 120 120"
              aria-hidden="true"
              className="h-[0.95em] w-[0.95em] shrink-0"
            >
              <defs>
                <linearGradient
                  id="bs-mark-gradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#5b3de0" />
                  <stop offset="100%" stopColor="#8b7bff" />
                </linearGradient>
              </defs>
              <g className="bs-mark-g">
                <circle
                  cx="56"
                  cy="66"
                  r="38"
                  fill="none"
                  stroke="url(#bs-mark-gradient)"
                  strokeWidth="20"
                />
                <path
                  className="bs-tail"
                  d="M66 74 L98 104 L80 112 L58 88 Z"
                  fill="#c4b5fd"
                  strokeLinejoin="round"
                />
              </g>
              <circle
                className="bs-dot"
                cx="98"
                cy="16"
                r="10"
                fill="url(#bs-mark-gradient)"
              />
            </svg>
            {LETTERS.map((letter, letterIndex) => (
              <span
                key={letterIndex}
                aria-hidden="true"
                className="bs-letter inline-block"
                style={{ "--i": letterIndex } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* rotating word line */}
        {reducedMotion ? (
          <p className="mt-10 text-center text-[26px] font-light tracking-[-0.02em] text-[#1b1b22] md:text-[40px]">
            {STATIC_SENTENCE}
          </p>
        ) : (
          <p className="mt-10 text-center text-[26px] font-light tracking-[-0.02em] text-[#1b1b22] md:text-[40px]">
            We build{" "}
            <span className="relative inline-grid overflow-hidden align-bottom">
              {ROTATING_WORDS.map((word, wordIdx) => {
                const active = wordIdx === wordIndex;
                const leaving = wordIdx === prevWordIndex;
                return (
                  <span
                    key={word}
                    aria-hidden={active ? undefined : true}
                    className={`col-start-1 row-start-1 bg-gradient-to-r from-[#5b3de0] to-[#8b7bff] bg-clip-text font-bold text-transparent underline decoration-[#5b3de0] decoration-2 underline-offset-4 transition-all duration-500 ${
                      active
                        ? "translate-y-0 opacity-100"
                        : leaving
                          ? "-translate-y-full opacity-0"
                          : "translate-y-full opacity-0"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </p>
        )}

        {/* supporting text */}
        <div className="mt-8 text-center">
          <p
            className="bs-fade mx-auto max-w-[560px] text-[18px] leading-relaxed text-[#4b4b55] md:text-[20px]"
            style={{ animationDelay: "1.45s" }}
          >
            {SUPPORTING_TEXT}
          </p>
          <Link
            href="/case-studies"
            className="bs-fade group mt-5 inline-flex items-center gap-2 text-[16px] font-semibold text-[#5b3de0] underline-offset-4 transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b3de0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ecebf2]"
            style={{ animationDelay: "1.53s" }}
          >
            See how we work
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* scrolling text strip */}
      <div className="bs-strip relative mt-20 overflow-hidden border-y border-black/10 py-5">
        <ul className="sr-only">
          {STRIP_WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>

        {/* static fallback for reduced motion */}
        <div
          aria-hidden="true"
          className="bs-strip-static flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-[20px] font-medium uppercase tracking-widest text-[#1b1b22]/70"
        >
          {STRIP_WORDS.map((word) => (
            <span key={word} className="inline-flex items-center gap-6">
              {word}
              <span className="size-2 rounded-full bg-[#7c5ce8]" />
            </span>
          ))}
        </div>

        {/* animated marquee */}
        <div
          aria-hidden="true"
          className="bs-marquee-track flex w-max items-center"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 pr-8">
              {STRIP_WORDS.map((word) => (
                <span
                  key={word}
                  className="flex items-center gap-8 text-[20px] font-medium uppercase tracking-widest text-[#1b1b22]/70"
                >
                  {word}
                  <span className="size-2 rounded-full bg-[#7c5ce8]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
