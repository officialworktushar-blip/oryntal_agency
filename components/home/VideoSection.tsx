"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Play, X } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { videoSection } from "@/lib/content/home";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const reveal = reduced ? itemReduced : item;
  const hasVideo = Boolean(videoSection.videoSrc);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <section className="video-gradient video-grain relative overflow-hidden pt-20 md:pt-28">
      {/* 120px fade into the section above (white) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0)_100%)]"
      />

      <div className="container-x relative pb-0">
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo + wordmark */}
          <m.div
            variants={reveal}
            className="flex items-center justify-center gap-3"
          >
            <Image
              src="/oryntal-logo.png"
              alt="Oryntal"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-semibold tracking-tight text-ink">
              Oryntal
            </span>
          </m.div>

          {/* Headline — the two lines reveal separately */}
          <h2 className="mx-auto mt-6 max-w-4xl text-center text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
            <m.span variants={reveal} className="block text-ink">
              {videoSection.headingTop}
            </m.span>
            <m.span variants={reveal} className="text-gradient-brand block">
              {videoSection.headingGradient}
            </m.span>
          </h2>

          <m.p
            variants={reveal}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {videoSection.description}
          </m.p>

          {/* Video frame */}
          <m.div variants={reveal} className="relative mx-auto mt-12 max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/60 shadow-[0_20px_60px_rgba(103,61,230,0.18)] backdrop-blur">
              <MediaPlaceholder
                type="video"
                aspect="16/9"
                label={videoSection.placeholderLabel}
                hint={videoSection.placeholderHint}
                className="justify-end rounded-3xl border-brand/40 bg-transparent pb-12 text-brand-dark [&>span:first-child]:hidden"
              />

              <button
                ref={triggerRef}
                type="button"
                aria-label="Play ORYNTAL demo video"
                onClick={() => {
                  if (hasVideo) setOpen(true);
                }}
                className="group absolute inset-0 grid place-items-center focus-visible:outline-none"
              >
                <span className="relative grid size-20 place-items-center rounded-full bg-brand text-white shadow-lift transition-transform duration-200 group-hover:scale-[1.06] group-focus-visible:ring-4 group-focus-visible:ring-brand/40">
                  <span
                    aria-hidden
                    className="play-pulse absolute inset-0 rounded-full bg-brand"
                  />
                  <Play
                    className="relative size-8 translate-x-0.5"
                    fill="currentColor"
                  />
                </span>
              </button>
            </div>
          </m.div>
        </m.div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="ORYNTAL demo video"
            tabIndex={-1}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 p-4 outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <m.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <video
                src={videoSection.videoSrc}
                poster={videoSection.posterSrc || undefined}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full rounded-3xl border border-white/10 bg-black object-cover"
              />
              <button
                type="button"
                aria-label="Close ORYNTAL demo video"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="absolute -top-11 right-0 rounded-lg p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="size-6" />
              </button>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
