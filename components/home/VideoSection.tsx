"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Play, X } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { videoSection } from "@/lib/content/home";

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(videoSection.videoSrc);

  return (
    <section className="bg-brand-wash py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{videoSection.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {videoSection.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {videoSection.description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-12 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-pop">
            <MediaPlaceholder
              type="video"
              aspect="16/9"
              label={videoSection.posterLabel}
              hint="Product walkthrough — short (60–90s) screen recording with captions."
            />
            <button
              type="button"
              aria-label="Play product demo"
              onClick={() => setOpen(true)}
              className="absolute inset-0 grid place-items-center"
            >
                <span className="relative grid size-20 place-items-center rounded-full bg-brand text-white shadow-lift transition-transform duration-200 hover:scale-105">
                  <span className="absolute inset-0 rounded-full bg-brand animate-pulse-ring" />
                  <Play className="relative size-8 translate-x-0.5" fill="currentColor" />
                </span>
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 p-4"
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
              onClick={(e) => e.stopPropagation()}
            >
              {hasVideo ? (
                <video
                  src={videoSection.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="aspect-video w-full rounded-3xl border border-white/10 object-cover"
                />
              ) : (
                <MediaPlaceholder
                  type="video"
                  aspect="16/9"
                  label={videoSection.posterLabel}
                  hint="Drop the demo video at lib/content/home.ts → videoSection.videoSrc."
                  dark
                  className="border-white/20 bg-ink/60"
                />
              )}
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setOpen(false)}
                className="absolute -top-11 right-0 rounded-lg p-2 text-white/80 transition-colors hover:text-white"
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
