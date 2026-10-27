"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { aiDev } from "@/lib/content/services/aiDev";
import { cn } from "@/lib/cn";
import BuildSelector from "./BuildSelector";
import HeroVisual from "./HeroVisual";
import Marquee from "@/components/ui/Marquee";

export default function AiHero() {
  const reduced = useReducedMotion() ?? false;
  const { eyebrow, h1, sub, primaryCta, secondaryCta, build, marquee, trust, pricingNote } = aiDev;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(build[0]?.id ?? "chatbots");
  const [paused, setPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let visible = true;

    function update() {
      setPaused(!visible || document.visibilityState !== "visible" || userInteracted);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        update();
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [userInteracted]);

  useEffect(() => {
    if (!userInteracted) return;
    const t = setTimeout(() => setUserInteracted(false), 10000);
    return () => clearTimeout(t);
  }, [userInteracted]);

  function scrollToSecondary(event: React.MouseEvent<HTMLAnchorElement>) {
    const id = secondaryCta.href.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  const handleCycle = () => {
    if (userInteracted) return;
    const currentIndex = build.findIndex((item) => item.id === activeId);
    const nextIndex = (currentIndex + 1) % build.length;
    setActiveId(build[nextIndex].id);
  };

  const handleUserInteract = () => {
    setUserInteracted(true);
  };

  const breadcrumb = (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-white/45">
        <li>
          <Link
            href="/services"
            className="rounded transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Services
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="size-4" aria-hidden="true" />
          <Link
            href="/services/individual-services"
            className="rounded transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Individual Services
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="size-4" aria-hidden="true" />
          <span className="text-white/70" aria-current="page">
            AI Development &amp; Automation
          </span>
        </li>
      </ol>
    </nav>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ai-hero-title"
      className={cn("relative isolate overflow-hidden ai-hero-bg text-white", paused && "ai-paused")}
      style={{
        paddingTop: "calc(var(--header-h) + 56px)",
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: calc(var(--header-h) + 64px) !important;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 pb-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 md:pb-16">
          <div className="relative z-10 min-w-0">
            {breadcrumb}

            <div className="mt-6 flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] bg-[#8B7CFF]" aria-hidden="true" />
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#8B7CFF] md:text-sm">
                {eyebrow}
              </p>
            </div>

            <h1
              id="ai-hero-title"
              className="mt-5 max-w-[660px] text-balance text-4xl font-semibold tracking-[-0.035em] leading-[1.1] text-white sm:text-5xl lg:text-[54px] xl:text-[58px]"
            >
              {h1}
            </h1>

            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/85 md:text-[19px]">
              {sub}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-white/75">
              <ShieldCheck size={16} />
              <span>{trust}</span>
            </div>
            <p className="mt-1.5 max-w-[560px] text-[13px] text-white/50">
              {pricingNote}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="group inline-flex h-[60px] items-center justify-center gap-2 rounded-[10px] bg-[#6B43E8] px-9 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5A33D4] hover:shadow-[0_12px_32px_rgba(107,67,232,.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {primaryCta.label}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={secondaryCta.href}
                onClick={scrollToSecondary}
                className="inline-flex h-[60px] items-center justify-center rounded-[10px] border-[1.5px] border-white/90 bg-transparent px-9 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {secondaryCta.label}
              </a>
            </div>

            <BuildSelector build={build} activeId={activeId} onChange={setActiveId} onUserInteract={handleUserInteract} />
          </div>

          <div className="min-w-0">
            <HeroVisual activeId={activeId} onCycle={handleCycle} paused={paused || userInteracted} onUserInteract={handleUserInteract} onActiveChange={setActiveId} />
          </div>
        </div>
      </div>

      <Marquee phrases={marquee} />

      {/* Screen reader summaries */}
      <p className="sr-only">{aiDev.srSummary}</p>
      <ul className="sr-only" aria-label="Services included">
        {aiDev.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}
