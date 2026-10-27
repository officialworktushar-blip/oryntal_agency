"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";

// Font configuration
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Flag pin data with positions (as percentage of map area)
type FlagPin = {
  code: string;
  name: string;
  top: number;
  left: number;
  delay: number;
};

const flagPins: FlagPin[] = [
  { code: "us", name: "USA", top: 28, left: 18, delay: 0 },
  { code: "br", name: "Brazil", top: 62, left: 25, delay: 0.5 },
  { code: "gb", name: "UK", top: 22, left: 46, delay: 1 },
  { code: "fr", name: "France", top: 32, left: 48, delay: 1.5 },
  { code: "de", name: "Germany", top: 26, left: 52, delay: 2 },
  { code: "lt", name: "Lithuania", top: 24, left: 56, delay: 2.5 },
  { code: "in", name: "India", top: 48, left: 68, delay: 3 },
  { code: "my", name: "Malaysia", top: 54, left: 76, delay: 3.5 },
  { code: "id", name: "Indonesia", top: 64, left: 78, delay: 4 },
];

type CtaSectionProps = {
  label?: string;
  pillFlag?: string;
  pillCountry?: string;
  pillText?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  showMap?: boolean;
};

export default function CtaSection({
  label = "Built for your business:",
  pillFlag = "in",
  pillCountry = "India",
  pillText = "Clients served worldwide",
  heading = "Your idea. Our solution.",
  description = "From a simple business website to a complete custom solution, we design and build everything your business needs to grow online. Websites and landing pages, online stores, web and mobile apps, ready-to-launch software products, custom dashboards, admin panels and user management, all backed by clean, user-friendly design.",
  buttonText = "Start your project",
  buttonHref = "/contact",
  showMap = true,
}: CtaSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const section = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`${dmSans.className} bg-black py-16 md:py-24`}
    >
      {/* Centered card */}
      <div className="mx-auto max-w-[1700px] w-[calc(100%-2rem)] rounded-[28px] bg-[#111111] overflow-hidden relative min-h-[560px]">
        <div className="flex flex-col lg:flex-row min-h-[560px]">
          {/* Left column - content */}
          <div className="lg:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-[60px] py-12 lg:py-0 z-10">
            {/* Fade-in animation wrapper */}
            <div
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Small label */}
              <p className="text-white text-base mb-4">{label}</p>

              {/* Pill/chip with flag */}
              <div className="inline-flex items-center gap-3 bg-[#1c1c1c] rounded-xl px-5 py-3 mb-8 w-fit">
                <div className="relative w-9 h-6 rounded-sm overflow-hidden">
                  <Image
                    src={`/cta/flags/${pillFlag}.svg`}
                    alt={pillCountry}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white">{pillCountry}</span>
                <div className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/80">{pillText}</span>
              </div>

              {/* Heading */}
              <h2 className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-medium tracking-tight leading-[1.1] mb-6">
                {heading}
              </h2>

              {/* Description */}
              <p className="text-white/85 text-lg leading-relaxed max-w-[680px] mb-8">
                {description}
              </p>

              {/* CTA button */}
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center bg-[#673DE6] hover:bg-[#5a33cf] text-white font-medium text-lg px-10 py-4 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                {buttonText}
              </Link>
            </div>
          </div>

          {/* Right column - map with flag pins */}
          {showMap && (
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[560px] overflow-hidden">
              {/* Dotted world map */}
              <div
                className="absolute inset-0 right-0 w-full lg:w-auto lg:h-full"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 30%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 30%)",
                }}
              >
                <Image
                  src="/cta/world-dots.svg"
                  alt="World map"
                  fill
                  className="object-cover opacity-60"
                  priority
                />
              </div>

              {/* Flag pins */}
              {flagPins.map((pin) => (
                <div
                  key={pin.code}
                  className="absolute"
                  style={{
                    top: `${pin.top}%`,
                    left: `${pin.left}%`,
                    animation: `float 5s ease-in-out infinite`,
                    animationDelay: `${pin.delay}s`,
                  }}
                >
                  {/* Flag tile */}
                  <div
                    className="relative w-16 h-11 bg-[#14122b] rounded-sm border border-[rgba(120,100,255,0.35)] flex items-center justify-center shadow-[0_8px_24px_rgba(120,100,255,0.25)]"
                    style={{
                      transform: "perspective(300px) rotateY(-8deg)",
                    }}
                  >
                    {/* Teal pin dot */}
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#19d3a2] shadow-[0_0_8px_rgba(25,211,162,0.6)]" />

                    {/* Flag */}
                    <div className="relative w-10 h-[26px] rounded-sm overflow-hidden">
                      <Image
                        src={`/cta/flags/${pin.code}.svg`}
                        alt={pin.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
