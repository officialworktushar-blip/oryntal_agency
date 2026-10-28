"use client";

import { useEffect, useRef } from "react";

const VIDEOS = [
  { src: "/videos/crm-real-estate.mp4", label: "Real Estate" },
  { src: "/videos/crm-healthcare.mp4", label: "Healthcare Management" },
  { src: "/videos/crm-hotel.mp4", label: "Hotel Management" },
  { src: "/videos/crm-fintech.mp4", label: "Fintech" },
  { src: "/videos/crm-edtech.mp4", label: "EdTech Team" },
];

export default function CrmVideoStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    const section = sectionRef.current;
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0 || !section) return;

    if (prefersReducedMotion.current) {
      videos.forEach((video) => {
        video.setAttribute("controls", "");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== section) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            videos.forEach((video) => {
              video.play().catch(() => {
                // Autoplay might be blocked; ignore
              });
            });
          } else {
            videos.forEach((video) => {
              video.pause();
            });
          }
        });
      },
      { threshold: [0.2] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="CRM demos for different industries"
      className="overflow-hidden bg-white py-16 lg:py-20"
    >
      <style jsx>{`
        @keyframes crm-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .crm-marquee-track {
          animation: crm-marquee 45s linear infinite;
        }
        .crm-marquee-wrap:hover .crm-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .crm-marquee-track {
            animation: none;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1400px] px-4 text-center lg:px-8">
        <h2 className="text-[32px] font-semibold tracking-tight text-neutral-900 md:text-[44px]">
          One system. Built around your industry.
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-base text-neutral-600 lg:text-lg">
          See how our custom business system adapts to real estate, healthcare, hotels, fintech and education teams, so your work runs smoother every day.
        </p>
      </div>
      <div
        className="crm-marquee-wrap mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] lg:mt-12 motion-reduce:overflow-x-auto"
      >
        <div className="crm-marquee-track flex w-max">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 gap-5 pr-5"
              aria-hidden={group === 1 ? true : undefined}
            >
              {VIDEOS.map((video, index) => (
                <div
                  key={`${group}-${video.src}`}
                  className="relative aspect-[3/2] w-[300px] shrink-0 overflow-hidden rounded-2xl bg-neutral-200 shadow-md sm:w-[420px] lg:w-[480px]"
                >
                  <video
                    ref={(el) => {
                      if (group === 0) {
                        videoRefs.current[index] = el;
                      }
                    }}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    tabIndex={group === 1 ? -1 : undefined}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-900 sm:text-sm">
                    {video.label}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
