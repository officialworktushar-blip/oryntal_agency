"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Bot,
  LayoutDashboard,
  LayoutTemplate,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const line1 = ["Orient", "your", "business."];
const line2 = ["Automate", "what", "slows", "it", "down."];

const chips = [
  {
    label: "CRM Dashboard",
    icon: LayoutDashboard,
    className: "left-[-3%] top-[12%] sm:left-[-6%]",
    duration: 4.5,
    delay: 0,
    range: [40, -80] as [number, number],
    mobile: true,
  },
  {
    label: "Landing Page",
    icon: LayoutTemplate,
    className: "right-[-3%] top-[6%] sm:right-[-7%]",
    duration: 5.2,
    delay: 0.7,
    range: [55, -110] as [number, number],
    mobile: true,
  },
  {
    label: "AI Assistant",
    icon: Bot,
    className: "left-[-4%] bottom-[14%] sm:left-[-8%]",
    duration: 5.8,
    delay: 1.4,
    range: [30, -60] as [number, number],
    mobile: false,
  },
  {
    label: "WhatsApp Automation",
    icon: MessageCircle,
    className: "right-[-4%] bottom-[9%] sm:right-[-9%]",
    duration: 6,
    delay: 2.1,
    range: [65, -130] as [number, number],
    mobile: false,
  },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/contact?message=${encodeURIComponent(message.trim())}`);
  }

  return (
    <section className="hero-gradient relative -mt-[72px] min-h-[640px] pt-[72px] text-white md:min-h-[760px]">
      {/* Decorative layer: drifting blobs + grain (clipped to the hero) */}
      <div className="hero-noise pointer-events-none absolute inset-0 overflow-hidden">
        <m.div
          aria-hidden
          className="absolute -left-24 bottom-[-15%] size-[520px] rounded-full bg-brand opacity-[0.35] blur-3xl"
          animate={
            reduced ? undefined : { x: [0, 40, 0], y: [0, -40, 0] }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <m.div
          aria-hidden
          className="absolute -right-16 bottom-[-25%] size-[440px] rounded-full bg-[#9678ff] opacity-[0.35] blur-3xl"
          animate={
            reduced ? undefined : { x: [0, -40, 0], y: [0, -36, 0] }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center pb-0 pt-10 text-center md:pt-14">
        {/* Glass search pill + pricing note */}
        <div className="mt-6 flex w-full max-w-4xl flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-6">
          <form
            onSubmit={handleSubmit}
            role="search"
            className="flex h-16 w-full min-w-0 items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-5 pr-2 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] backdrop-blur-md"
          >
            <label htmlFor="hero-search" className="sr-only">
              Tell us what you want to build or automate
            </label>
            <Search className="size-5 shrink-0 text-white" aria-hidden />
            <input
              id="hero-search"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you want to build or automate"
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60 sm:text-base"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-200 hover:scale-[1.03]"
            >
              Get started
            </button>
          </form>

          <div className="hidden shrink-0 text-left lg:block">
            <p className="text-sm font-bold text-white">Packages from ₹30,000</p>
            <p className="mt-0.5 text-xs text-white/75">
              Custom proposals for complex needs ·{" "}
              <Link
                href="/services/business-packages"
                className="font-medium text-white underline underline-offset-2 hover:text-white/85"
              >
                See packages
              </Link>
            </p>
          </div>

          {/* Stacked under the pill on mobile */}
          <div className="text-center lg:hidden">
            <p className="text-sm font-bold text-white">Packages from ₹30,000</p>
            <p className="mt-0.5 text-xs text-white/75">
              Custom proposals for complex needs ·{" "}
              <Link
                href="/services/business-packages"
                className="font-medium text-white underline underline-offset-2"
              >
                See packages
              </Link>
            </p>
          </div>
        </div>

        {/* Headline */}
        <m.h1
          initial={reduced ? "show" : "hidden"}
          animate="show"
          variants={headline}
          className="mt-12 max-w-5xl text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[88px]"
        >
          <span className="block">
            {line1.map((w) => (
              <m.span key={w} variants={reduced ? undefined : word} className="inline-block">
                {w}&nbsp;
              </m.span>
            ))}
          </span>
          <span className="block">
            {line2.map((w) => (
              <m.span key={w} variants={reduced ? undefined : word} className="inline-block">
                {w}&nbsp;
              </m.span>
            ))}
          </span>
        </m.h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
          ORYNTAL builds websites, AI systems, and business automation around
          the way your business actually works, so your team spends less time
          on repetitive tasks and more time on growth.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-7 py-3.5 text-base font-medium text-ink shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(255,255,255,0.65)]"
          >
            Get started
          </Link>
          <Link
            href="#services"
            className="rounded-lg border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="size-4 shrink-0" aria-hidden />
          Clear scope and pricing before we start
        </p>

        {/* Browser-frame hero visual — overlaps into the next section */}
        <div ref={frameRef} className="relative z-10 mt-14 -mb-20 w-full max-w-5xl px-2 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 h-4 flex-1 rounded bg-white/10" />
            </div>
            <MediaPlaceholder
              type="image"
              aspect="16/9"
              dark
              label="Add: ORYNTAL hero visual, dashboard + website + AI assistant composite (1600x900)"
              className="rounded-none border-white/30"
            />
          </div>

          {/* Floating chips */}
          {chips.map((chip) => (
            <Chip key={chip.label} chip={chip} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ChipProps = {
  chip: (typeof chips)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function Chip({ chip, progress }: ChipProps) {
  const reduced = useReducedMotion();
  const Icon = chip.icon;
  const y = useTransform(progress, [0, 1], reduced ? [0, 0] : chip.range);

  return (
    <m.span
      style={{ y }}
      className={cn(
        "absolute items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md",
        chip.mobile ? "flex" : "hidden lg:flex",
        chip.className
      )}
    >
      <m.span
        className="flex items-center gap-2"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: chip.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: chip.delay,
        }}
      >
        <Icon className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
        {chip.label}
      </m.span>
    </m.span>
  );
}
