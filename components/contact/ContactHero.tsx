"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Headphones,
  User,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

const HERO_IMAGE_SRC = "/contact.webp";
const HERO_HAS_IMAGE = true;

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 560;

export default function ContactHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const updateScale = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) setScale(width / CANVAS_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function handleScrollToForm(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("enquiry");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative overflow-hidden pt-[calc(var(--header-h,72px)+40px)] pb-16 md:pb-24"
      style={{
        background:
          "linear-gradient(180deg, #F5F3FC 0%, #F8F7FD 55%, #FFFFFF 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-0 items-center gap-10 sm:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="text-sm text-[#1D1E20]/55">
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#1D1E20]/80"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span
                    aria-current="page"
                    className="text-[#1D1E20]/80"
                  >
                    Contact
                  </span>
                </li>
              </ol>
            </nav>

            <h1
              id="contact-hero-title"
              className="mt-6 max-w-xl text-balance text-4xl font-normal leading-[1.08] tracking-[-0.035em] text-[#1D1E20] sm:text-5xl md:text-6xl lg:text-[68px]"
            >
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: 20, opacity: 0.6 }}
                animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.5, delay: 0.05, ease: "easeOut" }
                }
              >
                Tell us about your business.
              </motion.span>
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: 20, opacity: 0.6 }}
                animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.5, delay: 0.13, ease: "easeOut" }
                }
              >
                We&apos;ll take it from there.
              </motion.span>
            </h1>

            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-[#1D1E20]/80 md:text-[19px]">
              Share a few details about what you&apos;re building or where
              you&apos;re stuck. Our team replies within one business day with a
              clear next step, no pressure and no jargon.
            </p>

            <a
              href="#enquiry"
              onClick={handleScrollToForm}
              className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#673DE6] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5025D1] hover:shadow-[0_12px_32px_rgba(99,61,230,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 focus-visible:ring-offset-2 sm:w-auto"
            >
              Send your details
              <ArrowRight
                className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <p className="mt-4 text-sm text-[#1D1E20]/60">
              No commitment. We reply within one business day.
            </p>
          </div>

          <div
            ref={wrapperRef}
            aria-hidden={HERO_HAS_IMAGE ? undefined : true}
            className="relative mx-auto aspect-[640/560] w-full max-w-[520px] lg:mx-0 lg:max-w-[640px] lg:justify-self-end"
          >
            <div
              className="absolute left-0 top-0 h-[560px] w-[640px]"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <motion.div
                className="absolute left-0 top-[60px] z-0 h-[500px] w-[560px]"
                style={{
                  filter: "drop-shadow(0 24px 50px rgba(60,40,160,0.20))",
                }}
                initial={reduceMotion ? false : { opacity: 0.6, scale: 1.03 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.7, ease: "easeOut" }
                }
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 58% 0%, 100% 40%, 100% 100%, 22% 100%, 0% 78%)",
                  }}
                >
                  {HERO_HAS_IMAGE ? (
                    <Image
                      src={HERO_IMAGE_SRC}
                      alt="A smiling person using a phone to chat with the ORYNTAL team"
                      fill
                      sizes="(min-width:1024px) 560px, 90vw"
                      className="object-cover object-[60%_20%]"
                      priority
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center"
                      style={{
                        background:
                          "linear-gradient(160deg, #BFD6F2 0%, #D9E5F7 45%, #E6DDF6 100%)",
                      }}
                    >
                      <div
                        className="absolute inset-[14px] rounded-[28px] border-[1.5px] border-dashed"
                        style={{ borderColor: "rgba(103,61,230,0.35)" }}
                      />
                      <div className="relative flex flex-col items-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <ImageIcon
                            className="h-7 w-7"
                            style={{ color: "#673DE6" }}
                            aria-hidden="true"
                          />
                        </span>
                        <p className="mt-5 max-w-[340px] text-[15px] font-semibold leading-snug text-[#2F1C6A]">
                          Add: portrait photo of a person using a phone
                          (right-aligned subject, 1200x1100, WebP)
                        </p>
                        <p className="mt-2 max-w-[320px] text-[13px] leading-snug text-[#5B4E9A]">
                          Save as /public/contact-hero.webp, then set
                          HERO_HAS_IMAGE to true.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="absolute left-[32px] top-[108px] z-20"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0.6, x: -20 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.5, delay: 0.15, ease: "easeOut" }
                }
              >
                <div className="flex h-16 items-center gap-3 rounded-full bg-white pl-5 pr-2 shadow-[0_10px_28px_rgba(60,40,160,0.18)]">
                  <Sparkles
                    className="h-[22px] w-[22px]"
                    style={{ color: "#1D1E20" }}
                    aria-hidden="true"
                  />
                  <span className="text-[28px] font-medium text-[#1D1E20]">
                    AI agent
                  </span>
                  <motion.span
                    className="ml-1 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/80"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                    animate={
                      reduceMotion ? undefined : { scale: [1, 1.05, 1] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <Headphones
                      className="h-6 w-6"
                      style={{ color: "#6B4EE6" }}
                      aria-hidden="true"
                    />
                  </motion.span>
                </div>
              </motion.div>

              <div
                className="absolute left-[40px] top-[400px] z-30 hidden w-[300px] sm:block"
                aria-hidden="true"
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 0.4, delay: 0.3, ease: "easeOut" }
                  }
                >
                  <motion.div
                    animate={
                      reduceMotion ? undefined : { y: [0, -4, 0, 4, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <div className="flex items-center gap-3 rounded-2xl bg-white px-[18px] py-[14px] shadow-[0_10px_28px_rgba(60,40,160,0.16)]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7B68FF]">
                        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
                          <Image
                            src="/logo.png"
                            alt=""
                            aria-hidden
                            width={20}
                            height={20}
                            className="h-5 w-5 object-contain"
                          />
                        </span>
                      </span>
                      <span className="text-[17px] text-[#1D1E20]">
                        Hello, how can we help you?
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div
                className="absolute left-[90px] top-[478px] z-40 hidden w-[330px] sm:block"
                aria-hidden="true"
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 0.4, delay: 0.5, ease: "easeOut" }
                  }
                >
                  <motion.div
                    animate={
                      reduceMotion ? undefined : { y: [0, -4, 0, 4, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }
                    }
                  >
                    <div className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_10px_28px_rgba(60,40,160,0.16)]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEE9FF]">
                        <User
                          className="h-4 w-4"
                          style={{ color: "#6B4EE6" }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-[17px] leading-snug text-[#1D1E20]">
                        Hi, I&apos;d like a website that brings me more
                        customers.
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
