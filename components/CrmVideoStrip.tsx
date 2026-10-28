"use client";

import { useEffect, useRef } from "react";

const VIDEOS = [
  { src: "/videos/crm-1.mp4", label: "CRM demo 1" },
  { src: "/videos/crm-2.mp4", label: "CRM demo 2" },
  { src: "/videos/crm-3.mp4", label: "CRM demo 3" },
  { src: "/videos/crm-4.mp4", label: "CRM demo 4" },
  { src: "/videos/crm-5.mp4", label: "CRM demo 5" },
];

export default function CrmVideoStrip() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    if (prefersReducedMotion.current) {
      videos.forEach((video) => {
        video.setAttribute("controls", "");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            video.play().catch(() => {
              // Autoplay might be blocked; ignore
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.4] }
    );

    videos.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section aria-label="CRM demo videos" className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {VIDEOS.map((video, index) => (
            <div
              key={video.src}
              className="relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-200 shadow-sm sm:w-[260px] lg:w-auto"
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={video.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
