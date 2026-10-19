"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { domainCards } from "@/lib/content/domains";
import { cn } from "@/lib/cn";

const blockShades = [
  "var(--card-lilac-2)",
  "var(--card-lilac-3)",
  "var(--card-lilac-4)",
  "var(--card-lilac-5)",
  "var(--card-lilac-3)",
  "var(--card-lilac-2)",
];

export default function ServicesExpandingCards() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      setDesktop(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      id="services"
      className="mt-14 w-full scroll-mt-24 md:mt-20"
    >
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-white/70">
        Explore our 4 service domains
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:flex-row lg:items-stretch">
        {domainCards.map((card, i) => {
          const active = desktop && activeIndex === i;
          const Icon = card.icon;

          return (
            <m.div
              key={card.id}
              layout
              animate={{ flex: active ? 2.2 : 1 }}
              transition={
                reduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 }
              }
              className="min-w-0"
            >
              <m.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
              >
                <Link
                  href={card.href}
                  onMouseEnter={() => {
                    if (desktop) setActiveIndex(i);
                  }}
                  onMouseLeave={() => {
                    if (desktop) setActiveIndex(null);
                  }}
                  onFocus={() => {
                    if (desktop) setActiveIndex(i);
                  }}
                  onBlur={() => {
                    if (desktop) setActiveIndex(null);
                  }}
                  className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {/* Image area — light lilac so it pops on the dark hero */}
                  <div
                    className="relative h-[320px] overflow-hidden rounded-3xl lg:h-[450px]"
                    style={{ backgroundColor: "var(--card-lilac-1)" }}
                  >
                    {/* Stacked-blocks band */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 grid h-14 grid-cols-6 gap-1.5 p-1.5 opacity-70 sm:h-16"
                    >
                      {blockShades.map((shade, blockIndex) => (
                        <span
                          key={blockIndex}
                          className={cn(
                            "rounded-md",
                            blockIndex % 2 === 0 ? "self-end h-3/4" : "self-end h-full"
                          )}
                          style={{ backgroundColor: shade }}
                        />
                      ))}
                    </div>

                    {/* Image / placeholder */}
                    <m.div
                      animate={{ scale: active ? 1.05 : 1 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.6, ease: "easeOut" }
                      }
                      className="absolute inset-0"
                    >
                      <MediaPlaceholder
                        type="image"
                        label=""
                        src={card.image}
                        alt={card.title}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className={
                          card.image
                            ? "h-full w-full rounded-none border-0"
                            : "h-full w-full rounded-none border-dashed border-white/60 bg-transparent text-brand-dark [&_span:first-child]:bg-transparent"
                        }
                      />
                    </m.div>

                    {/* Icon badge */}
                    <span className="absolute bottom-4 left-4 grid size-14 place-items-center rounded-xl bg-brand text-white shadow-lg">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>

                    {/* Arrow button — appears on expand (always visible on mobile) */}
                    <m.span
                      aria-hidden
                      animate={
                        desktop
                          ? active
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                          : { opacity: 1, scale: 1 }
                      }
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
                      }
                      className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      <ArrowUpRight className="size-5" />
                    </m.span>

                    {/* Glass preview panel */}
                    <m.div
                      initial={false}
                      animate={
                        desktop
                          ? active
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 16 }
                          : { opacity: 1, y: 0 }
                      }
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
                      }
                      className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/85 p-4 text-left text-sm text-ink shadow-pop backdrop-blur-md"
                    >
                      <ul>
                        {card.preview.map((row, rowIndex) => {
                          const show = !desktop || active;
                          return (
                            <m.li
                              key={row}
                              initial={false}
                              animate={{
                                opacity: show ? 1 : 0,
                                x: show ? 0 : -6,
                              }}
                              transition={
                                reduced
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.2,
                                      delay: show ? rowIndex * 0.05 : 0,
                                    }
                              }
                              className="flex items-start gap-2 py-0.5"
                            >
                              <span
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                                aria-hidden
                              />
                              <span>{row}</span>
                            </m.li>
                          );
                        })}
                      </ul>
                    </m.div>
                  </div>

                  {/* Title + description */}
                  <div className="mt-4 lg:h-24">
                    <h3 className="text-xl font-medium text-white">
                      {card.title}
                    </h3>
                    <m.p
                      initial={false}
                      animate={
                        desktop
                          ? active
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 8 }
                          : { opacity: 1, y: 0 }
                      }
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
                      }
                      className="mt-2 text-sm leading-relaxed text-white/80"
                    >
                      {card.description}
                    </m.p>
                  </div>
                </Link>
              </m.div>
            </m.div>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/60">
        Payment gateway, API, logistics, and other third-party services may
        require separate provider subscriptions or transaction fees.
      </p>
    </div>
  );
}
