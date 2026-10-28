"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SessionStep = {
  kind: "user" | "action" | "ok" | "badge";
  text?: string;
  name?: string;
  detail?: string;
};

const SESSION_SCRIPT: SessionStep[] = [
  {
    kind: "user",
    text: "I sell handmade candles online. Help me with delivery and suppliers.",
  },
  {
    kind: "action",
    name: "delivery guidance",
    detail: "{ products: \"candles\" }",
  },
  {
    kind: "ok",
    text: "delivery options explained",
  },
  {
    kind: "action",
    name: "packaging advice",
    detail: "{ type: \"glass jars, safe packing\" }",
  },
  {
    kind: "ok",
    text: "packaging guidance ready",
  },
  {
    kind: "action",
    name: "supplier connections",
    detail: "{ needs: \"wax, jars, wicks\" }",
  },
  {
    kind: "ok",
    text: "suitable supplier contacts shared",
  },
  {
    kind: "badge",
    text: "Next step: compare terms with the supplier",
  },
];

const TYPING_SPEED = 35;
const ACTION_DELAY = 600;
const OK_DELAY = 700;
const BADGE_DELAY = 800;
const PAUSE_AFTER_LAST = 3000;
const SCRIPT_LENGTH = SESSION_SCRIPT.length;

export default function SourcingSessionDemo() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      return;
    }

    const clearAllTimers = () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };

    clearAllTimers();

    let stepIndex = 0;
    let charIndex = 0;

    const animate = () => {
      if (stepIndex >= SCRIPT_LENGTH) {
        const pauseTimer = setTimeout(() => {
          setCompletedSteps(0);
          setTypedChars(0);
          stepIndex = 0;
          charIndex = 0;
          animate();
        }, PAUSE_AFTER_LAST);
        timersRef.current.push(pauseTimer);
        return;
      }

      const step = SESSION_SCRIPT[stepIndex];

      if (step.kind === "user") {
        if (charIndex < (step.text?.length || 0)) {
          const typeTimer = setTimeout(() => {
            setTypedChars(charIndex + 1);
            charIndex++;
            animate();
          }, TYPING_SPEED);
          timersRef.current.push(typeTimer);
        } else {
          const nextStepTimer = setTimeout(() => {
            setCompletedSteps(stepIndex + 1);
            setTypedChars(0);
            stepIndex++;
            charIndex = 0;
            animate();
          }, 400);
          timersRef.current.push(nextStepTimer);
        }
      } else {
        const delay =
          step.kind === "action"
            ? ACTION_DELAY
            : step.kind === "ok"
            ? OK_DELAY
            : BADGE_DELAY;

        const stepTimer = setTimeout(() => {
          setCompletedSteps(stepIndex + 1);
          stepIndex++;
          animate();
        }, delay);
        timersRef.current.push(stepTimer);
      }
    };

    animate();

    return () => {
      clearAllTimers();
    };
  }, [isVisible, prefersReducedMotion]);

  const contactHref = "/contact?interest=business-operations-and-sourcing-support";

  return (
    <section
      aria-label="How a sourcing request works"
      style={{
        background: "linear-gradient(to bottom, #0d0d0f 0%, #140f2a 50%, #0d0d0f 100%)",
      }}
      className="text-white py-16 lg:py-24"
      ref={containerRef}
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-[34px] sm:text-[52px] font-semibold tracking-tight leading-[1.1]">
            We do the groundwork for you
          </h2>
          <p className="mt-5 text-base lg:text-lg text-white/60 max-w-[720px] mx-auto leading-relaxed">
            Tell us what you sell in plain words. We guide you on delivery and packaging and connect you with suitable suppliers. Watch how a typical request goes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr] items-center lg:gap-12 max-w-[1200px] mx-auto">
          {/* LEFT: Session window */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ backgroundColor: "#0a0a0c" }}>
            {/* Top bar */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10" style={{ backgroundColor: "#161618" }}>
              <div className="flex items-center">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </div>
                <span className="text-sm text-white/50 ml-4">request session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-emerald-400">Connected</span>
              </div>
            </div>

            {/* Body */}
            <div
              role="img"
              aria-label="Example of a sourcing request being handled step by step"
              className="px-6 py-6 h-[400px] flex flex-col justify-end text-[15px] leading-relaxed overflow-hidden"
              style={{ backgroundColor: "#000000" }}
            >
              {prefersReducedMotion ? (
                SESSION_SCRIPT.map((step, index) => (
                  <div key={index} className="mb-2" aria-hidden="true">
                    {step.kind === "user" && (
                      <div>
                        <span className="text-white/40">› </span>
                        <span className="text-white">{step.text}</span>
                      </div>
                    )}
                    {step.kind === "action" && (
                      <div>
                        <span className="text-white/40">→ </span>
                        <span className="text-[#8b7cf6]">{step.name}</span>
                        <span className="text-white/50 text-sm ml-2">{step.detail}</span>
                      </div>
                    )}
                    {step.kind === "ok" && (
                      <div>
                        <span className="text-emerald-400">✓ </span>
                        <span className="text-emerald-400">{step.text}</span>
                      </div>
                    )}
                    {step.kind === "badge" && (
                      <div
                        className="inline-block rounded-lg px-4 py-2 border border-emerald-500/40"
                        style={{ backgroundColor: "rgba(16,185,129,0.12)" }}
                      >
                        <span className="text-emerald-400">▸ {step.text}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  {SESSION_SCRIPT.slice(0, completedSteps).map((step, index) => (
                    <div key={index} className="mb-2" aria-hidden="true">
                      {step.kind === "user" && (
                        <div>
                          <span className="text-white/40">› </span>
                          <span className="text-white">{step.text}</span>
                        </div>
                      )}
                      {step.kind === "action" && (
                        <div>
                          <span className="text-white/40">→ </span>
                          <span className="text-[#8b7cf6]">{step.name}</span>
                          <span className="text-white/50 text-sm ml-2">{step.detail}</span>
                        </div>
                      )}
                      {step.kind === "ok" && (
                        <div>
                          <span className="text-emerald-400">✓ </span>
                          <span className="text-emerald-400">{step.text}</span>
                        </div>
                      )}
                      {step.kind === "badge" && (
                        <div
                          className="inline-block rounded-lg px-4 py-2 border border-emerald-500/40"
                          style={{ backgroundColor: "rgba(16,185,129,0.12)" }}
                        >
                          <span className="text-emerald-400">▸ {step.text}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {completedSteps < SESSION_SCRIPT.length && SESSION_SCRIPT[completedSteps].kind === "user" && (
                    <div className="mb-2" aria-hidden="true">
                      <span className="text-white/40">› </span>
                      <span className="text-white">
                        {SESSION_SCRIPT[completedSteps].text?.slice(0, typedChars)}
                      </span>
                      <span className="inline-block w-2 h-4 bg-[#8b7cf6] animate-pulse ml-0.5" />
                    </div>
                  )}

                  {completedSteps === SESSION_SCRIPT.length && (
                    <div className="mb-2" aria-hidden="true">
                      <span className="text-[#8b7cf6]">› </span>
                      <span className="inline-block w-2 h-4 bg-[#8b7cf6] animate-pulse ml-0.5" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            <p className="text-2xl lg:text-[28px] leading-snug text-white">
              Behind every request is real, <span style={{ color: "#8b7cf6" }}>hands-on support</span>: we guide, connect and follow up while you review the options and decide.
            </p>
            <p className="mt-10 text-sm text-white/40">What we can help you with</p>
            <ul className="mt-3 space-y-2 text-base text-white/90">
              <li>Delivery and logistics guidance</li>
              <li>Packaging information and advice</li>
              <li>Supplier and wholesaler connections</li>
              <li>Sourcing partner search</li>
              <li>Wholesale contacts and opportunities</li>
            </ul>
            <Link
              href={contactHref}
              className="mt-8 inline-flex items-center gap-3 border border-white/25 rounded-full px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
            >
              Talk to us
              <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-sm text-white/40 leading-relaxed">
              Pricing, minimum order quantities, availability and terms are decided by each supplier. We cannot guarantee specific prices or savings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
