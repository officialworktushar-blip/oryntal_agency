"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import TagChip from "@/components/ui/TagChip";
import StatsRow from "@/components/services/website-app/StatsRow";
import { websiteApp } from "@/lib/content/services/websiteApp";
import { cn } from "@/lib/cn";

export default function WebAppHero() {
  const reduced = useReducedMotion() ?? false;
  const {
    eyebrow,
    h1Line1,
    h1Line2,
    sub,
    emi,
    primaryCta,
    secondaryCta,
  } = websiteApp;
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let visible = true;

    function update() {
      setPaused(!visible || document.visibilityState !== "visible");
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
  }, []);

  useEffect(() => {
    if (reduced) return;

    const node = sectionRef.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;

    function onMove(event: PointerEvent) {
      if (!node) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * -24;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -16;
        node.style.setProperty("--ws-px", `${x.toFixed(2)}px`);
        node.style.setProperty("--ws-py", `${y.toFixed(2)}px`);
      });
    }

    function onLeave() {
      if (!node) return;
      cancelAnimationFrame(frame);
      node.style.setProperty("--ws-px", "0px");
      node.style.setProperty("--ws-py", "0px");
    }

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ws-hero-title"
      className={cn(
        "ws-hero-bg relative isolate -mt-[72px] overflow-hidden pb-16 pt-[calc(var(--header-h)+64px)] text-white md:pb-24 md:pt-[calc(var(--header-h)+72px)]",
        paused && "ws-paused"
      )}
    >
      <div aria-hidden="true" className="ws-hero-dome ws-ambient" />
      <div aria-hidden="true" className="ws-hero-rim ws-ambient" />

      <div aria-hidden="true" className="ws-glow-side ws-glow-side-left">
        <div className="ws-glow-inner ws-ambient" />
      </div>
      <div aria-hidden="true" className="ws-glow-side ws-glow-side-right">
        <div className="ws-glow-inner ws-ambient" />
      </div>

      <div aria-hidden="true" className="ws-hero-grain" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
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
              <span className="text-white/80" aria-current="page">
                Website &amp; Application Development
              </span>
            </li>
          </ol>
        </nav>

        <p className="mt-6 text-[15px] font-medium tracking-wide text-[#9B95FF] md:text-base">
          {eyebrow}
        </p>

        <h1
          id="ws-hero-title"
          className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[72px]"
        >
          <span className="ws-reveal block" style={{ animationDelay: "80ms" }}>
            {h1Line1}
          </span>
          <span className="ws-reveal block" style={{ animationDelay: "160ms" }}>
            {h1Line2}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
          {sub}
        </p>

        {emi.enabled ? (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-3 text-lg md:text-xl">
              <span className="text-white">{emi.lead}</span>
              <TagChip tone="offer" sheen className="text-lg md:text-xl">
                {emi.tag}
              </TagChip>
            </div>
            <p className="mt-3 text-sm text-white/60">
              {emi.note} {emi.pricingNote}
            </p>
          </div>
        ) : (
          <p className="mt-8 text-sm text-white/65">{emi.pricingNote}</p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-12 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_12px_32px_rgba(99,61,230,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
          >
            {primaryCta.label}
          </Link>
          <a
            href={secondaryCta.href}
            onClick={scrollToSecondary}
            className="inline-flex w-full items-center justify-center rounded-xl border-[1.5px] border-white/90 bg-transparent px-9 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <StatsRow />
      </div>
    </section>
  );
}
