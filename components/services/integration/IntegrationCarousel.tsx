"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Database,
  MessageCircle,
  Plug,
  Table,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/cn";

const CARDS = [
  {
    title: "API and custom connections",
    text: "Connect your software so information moves between your systems on its own.",
    icon: Webhook,
    topic: "apis",
  },
  {
    title: "Payment gateway setup",
    text: "Accept online payments safely with Razorpay, Stripe, PayPal and other gateways your customers trust.",
    icon: CreditCard,
    topic: "payments",
  },
  {
    title: "WhatsApp and messaging",
    text: "Send order updates, reminders and replies on WhatsApp, SMS and email automatically.",
    icon: MessageCircle,
    topic: "comms",
  },
  {
    title: "CRM connections",
    text: "Every enquiry lands in your CRM by itself, so no lead gets missed.",
    icon: Users,
    topic: "crm",
  },
  {
    title: "Connect your other platforms",
    text: "Link your website, store, accounts and everyday tools into one smooth setup.",
    icon: Plug,
    topic: "integrations",
  },
  {
    title: "Business database",
    text: "A clean, secure home for your customer, order and product data.",
    icon: Database,
    topic: "data",
  },
  {
    title: "Data sheets that stay current",
    text: "Google Sheets and Excel files that update themselves and stay accurate.",
    icon: Table,
    topic: "data",
  },
  {
    title: "Reports and insights",
    text: "Live dashboards that show what is selling, what is slow and where to improve.",
    icon: BarChart3,
    topic: "insights",
  },
  {
    title: "Workflow automation",
    text: "Repeated tasks, follow-ups and approvals run on their own, so your team saves hours.",
    icon: Workflow,
    topic: "automation",
  },
] as const;

export default function IntegrationCarousel() {
  const rowRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!row || !prev || !next) return;

    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      if (row.scrollLeft <= 0) {
        prev.classList.add("opacity-40");
        prev.setAttribute("aria-disabled", "true");
      } else {
        prev.classList.remove("opacity-40");
        prev.removeAttribute("aria-disabled");
      }
      if (row.scrollLeft >= max - 1) {
        next.classList.add("opacity-40");
        next.setAttribute("aria-disabled", "true");
      } else {
        next.classList.remove("opacity-40");
        next.removeAttribute("aria-disabled");
      }
    };

    const scrollByCard = (dir: number) => {
      const first = row.querySelector<HTMLElement>(".integration-card");
      const cardWidth = first ? first.offsetWidth + 20 : 370;
      row.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
    };

    const onPrev = () => scrollByCard(-1);
    const onNext = () => scrollByCard(1);

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    row.addEventListener("scroll", update, { passive: true });
    update();
    window.addEventListener("resize", update);

    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      aria-label="Everything connected. Nothing manual."
      className="relative overflow-hidden py-16 text-white"
      style={{
        background:
          "linear-gradient(to bottom, #0a0516 0%, #1c0d45 45%, #6a3fdc 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_110%,#8b5cf6_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-[70px]">
          <h2 className="text-[40px] font-medium tracking-tight md:text-5xl lg:text-5xl">
            Everything connected. Nothing manual.
          </h2>
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:transition-none"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:transition-none"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          ref={rowRef}
          className="mt-10 flex gap-5 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:px-[70px]"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={`/contact?interest=software-api-and-system-integration&topic=${card.topic}`}
                className={cn(
                  "integration-card group relative flex w-[300px] shrink-0 snap-start flex-col rounded-3xl p-8 transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:transition-none motion-reduce:transform-none sm:w-[370px] min-h-[405px]",
                  "bg-[linear-gradient(to_bottom,#0b0615_0%,#1a1038_55%,rgba(106,63,220,0.55)_100%)] border border-white/10 hover:border-white/25"
                )}
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-9 w-9 text-[#8b6cff]" aria-hidden="true" />
                  <ArrowUpRight className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="mt-8">
                  <h3 className="text-[24px] font-normal leading-tight">{card.title}</h3>
                  <p className="mt-3 text-[17px] leading-snug text-white/70">{card.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
