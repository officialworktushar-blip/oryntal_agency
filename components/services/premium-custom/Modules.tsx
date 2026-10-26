"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ModuleList from "@/components/services/premium-custom/ModuleList";
import ModulePanel from "@/components/services/premium-custom/ModulePanel";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduced = useReducedMotion() ?? false;
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const show = inView || forced || reduced;

  return (
    <m.div
      ref={ref}
      className={`pcm-reveal ${className}`}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(6px)" }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function RevealSpan({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduced = useReducedMotion() ?? false;
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const show = inView || forced || reduced;

  return (
    <m.span
      ref={ref}
      className={`pcm-reveal block ${className}`}
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: "blur(6px)" }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.span>
  );
}

export default function Modules() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const { eyebrow, headingLine1, headingLine2, sub, items, closing, footnote } =
    premiumCustom.modules;

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (reduced || !isDesktop || !inView || !tabVisible || hovered || focusWithin) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [reduced, isDesktop, inView, tabVisible, hovered, focusWithin, items.length]);

  return (
    <section
      ref={sectionRef}
      id="what-you-get"
      aria-labelledby="modules-title"
      className="relative overflow-hidden scroll-mt-24 pcm-bg text-white py-20 md:py-28 border-t border-white/[0.06]"
    >
      <noscript>
        <style>{`.pcm-reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <div aria-hidden className="pointer-events-none absolute inset-0 pcs-grain opacity-[0.03]" />

      <div className="relative mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal delay={0.02} y={16}>
            <span className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.2em] text-[#8B7CFF]">
              <span className="h-[9px] w-[9px] bg-[#8B7CFF]" aria-hidden="true" />
              {eyebrow}
            </span>
          </Reveal>
          <h2
            id="modules-title"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.025em] md:text-5xl lg:text-[52px]"
          >
            <RevealSpan delay={0.1} className="text-white">
              {headingLine1}
            </RevealSpan>
            <RevealSpan delay={0.18} className="text-white/75">
              {headingLine2}
            </RevealSpan>
          </h2>
          <Reveal delay={0.26} y={24}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 md:text-lg">{sub}</p>
          </Reveal>
        </div>

        <ul className="sr-only" aria-label="What the Premium Custom Business System includes">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>: {item.description}
            </li>
          ))}
        </ul>

        <div
          className="mt-12 hidden items-start gap-7 md:mt-14 lg:grid lg:grid-cols-[340px_1fr] xl:grid-cols-[410px_1fr]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusWithin(false);
            }
          }}
        >
          <ModuleList
            items={items}
            active={active}
            onSelect={setActive}
            idBase="pcm-desktop"
          />
          <div className="min-w-0">
            {items.map((item, i) => (
              <ModulePanel
                key={item.id}
                item={item}
                isActive={active === i}
                idBase="pcm-desktop"
                variant="tab"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isOpen = active === i;
            return (
              <div key={item.id} className="mb-2.5 last:mb-0">
                <button
                  type="button"
                  id={`pcm-mobile-accordion-button-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`pcm-mobile-panel-${item.id}`}
                  onClick={() => setActive(i)}
                  className={`group flex h-14 w-full items-center gap-3 rounded-[14px] border px-4 text-left text-[15.5px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] ${
                    isOpen
                      ? "border-[#8B7CFF] bg-[#232327] text-white"
                      : "border-white/[0.08] bg-[#17171A] text-white/90"
                  }`}
                >
                  <Icon
                    size={20}
                    style={{ color: isOpen ? "#8B7CFF" : "rgba(255,255,255,0.7)" }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">{item.label}</span>
                  <ArrowRight
                    size={18}
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-90 text-white/80" : "text-white/40"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`pcm-mobile-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`pcm-mobile-accordion-button-${item.id}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ModulePanel
                      item={item}
                      isActive={isOpen}
                      idBase="pcm-mobile"
                      variant="accordion"
                      compact
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Reveal delay={0.06} y={20}>
            <p className="mx-auto max-w-xl text-lg text-white/75">{closing.text}</p>
            <Link
              href={closing.link.href}
              className="group mt-4 inline-flex items-center gap-2 text-white underline underline-offset-4 transition-colors hover:text-[#B9A8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
            >
              {closing.link.label}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
          <Reveal delay={0.12} y={16}>
            <p className="mx-auto mt-6 max-w-2xl text-xs text-white/40">{footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
