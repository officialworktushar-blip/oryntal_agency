"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ShowcaseSlide = { src: string; alt: string; caption: string };

const SLIDES: ShowcaseSlide[] = [
  {
    src: "/build-showcase/slide-1.webp",
    alt: "Website preview for a local business",
    caption: "Create a website that matches my brand and brings in more enquiries.",
  },
  {
    src: "/build-showcase/slide-2.webp",
    alt: "Online shop preview for a small business",
    caption: "Help customers browse my products and place orders online.",
  },
  {
    src: "/build-showcase/slide-3.webp",
    alt: "Booking page preview for a service business",
    caption: "Let customers book a time that works for them.",
  },
  {
    src: "/build-showcase/slide-4.webp",
    alt: "Business dashboard preview",
    caption: "Bring my daily sales and customer details into one clear view.",
  },
];

const QUICK_INTERVAL = 1400;
const HOLD_DURATION = 5000;
const SLIDE_DURATION = 600;
const TYPING_INTERVAL = 25;
const PILL_FADE_DURATION = 300;

type Position = "center" | "left" | "right" | "hidden";

function getPosition(index: number, current: number): Position {
  const delta = (index - current + SLIDES.length) % SLIDES.length;
  if (delta === 0) return "center";
  if (delta === SLIDES.length - 1) return "left";
  if (delta === 1) return "right";
  return "hidden";
}

const positionStyles: Record<Position, { left: string; top: string; width: string; opacity: number; zIndex: number }> = {
  center: { left: "27%", top: "0%", width: "46%", opacity: 1, zIndex: 3 },
  left: { left: "0%", top: "11%", width: "40%", opacity: 0.62, zIndex: 1 },
  right: { left: "60%", top: "11%", width: "40%", opacity: 0.62, zIndex: 1 },
  hidden: { left: "27%", top: "0%", width: "46%", opacity: 0, zIndex: 0 },
};

export default function BuildShowcase() {
  const reducedMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [current, setCurrent] = useState(0);
  const [quickSteps, setQuickSteps] = useState(0);
  const [holding, setHolding] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    SLIDES.forEach(({ src }) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible || !pageVisible) return;
    const timeout = window.setTimeout(() => {
      if (holding) {
        setHolding(false);
        setTypedLength(0);
        setCurrent((index) => (index + 1) % SLIDES.length);
        setQuickSteps(0);
      } else if (quickSteps < 3) {
        setCurrent((index) => (index + 1) % SLIDES.length);
        setQuickSteps((steps) => steps + 1);
      } else {
        setHolding(true);
        setTypedLength(0);
      }
    }, holding ? HOLD_DURATION : QUICK_INTERVAL);
    return () => window.clearTimeout(timeout);
  }, [holding, pageVisible, quickSteps, reducedMotion, visible]);

  useEffect(() => {
    if (reducedMotion || !holding || !visible || !pageVisible) return;
    const captionLength = SLIDES[current].caption.length;
    if (typedLength >= captionLength) return;
    const timeout = window.setTimeout(
      () => setTypedLength((length) => Math.min(length + 1, captionLength)),
      TYPING_INTERVAL,
    );
    return () => window.clearTimeout(timeout);
  }, [current, holding, pageVisible, reducedMotion, typedLength, visible]);

  const caption = SLIDES[current].caption;
  const showCaption = reducedMotion || holding;
  const typedCaption = reducedMotion ? caption : caption.slice(0, typedLength);

  return (
    <div
      ref={rootRef}
      aria-label="Examples of business websites and tools"
      className="relative aspect-[7/5] w-full max-w-[560px] overflow-visible bg-transparent"
    >
      <div className="absolute inset-0 overflow-visible">
        {SLIDES.map((slide, index) => {
          const position = reducedMotion
            ? index === current ? "center" : "hidden"
            : getPosition(index, current);
          return (
            <motion.div
              key={slide.src}
              aria-hidden={position === "hidden"}
              initial={false}
              animate={positionStyles[position]}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: SLIDE_DURATION / 1000, ease: "easeInOut" }
              }
              className="absolute aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-[0_14px_35px_rgba(37,24,70,0.2)] ring-1 ring-black/5"
            >
              {failedImages.has(slide.src) ? (
                <div className="h-full w-full bg-[linear-gradient(145deg,#e8defe,#f9d9e8_55%,#d9e9ff)]" />
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 48vw, 32vw"
                  className="object-cover"
                  priority
                  onError={() =>
                    setFailedImages((images) => new Set(images).add(slide.src))
                  }
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="absolute left-[14%] bottom-3 z-10 flex min-h-12 w-[72%] items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] p-[1.5px] shadow-[0_8px_24px_rgba(103,61,230,0.2)] sm:bottom-4 sm:min-h-14"
      >
        <div className="flex min-h-[42px] flex-1 items-center rounded-[14px] bg-white px-3 text-xs leading-snug text-ink sm:min-h-[50px] sm:px-4 sm:text-sm">
          <span className="line-clamp-2">{showCaption ? typedCaption : ""}</span>
        </div>
        <motion.span
          animate={holding && !reducedMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 1.6, repeat: holding && !reducedMotion ? Infinity : 0, ease: "easeInOut" }}
          className={`mr-1 grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white sm:mr-1.5 sm:size-10 ${showCaption ? "opacity-100" : "opacity-0"}`}
          style={{ transition: `opacity ${PILL_FADE_DURATION}ms ease` }}
          aria-hidden="true"
        >
          <ArrowRight className="size-4" />
        </motion.span>
      </div>
    </div>
  );
}
