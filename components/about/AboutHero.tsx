import Link from "next/link";
import AboutHeroSlides from "./AboutHeroSlides";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

const trustItems = [
  "Small, hands-on team",
  "Built around your needs",
  "Clear deliverables",
];

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-title"
      className="relative isolate flex min-h-[max(720px,100vh)] w-full items-center overflow-hidden bg-[#0d0f0e] px-5 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <style>{`
        @keyframes ah-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .ah-in {
            animation: ah-fade-up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
          }
        }
      `}</style>

      {/* stepped violet pillar bands, left and right (desktop only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div className="absolute inset-y-0 left-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
        <div className="absolute inset-y-0 left-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:left-[180px] lg:w-[240px]" />
        <div className="absolute inset-y-0 left-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:left-[360px] lg:w-[240px]" />
        <div className="absolute inset-y-0 left-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:left-[540px] lg:w-[240px]" />
        <div className="absolute inset-y-0 right-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
        <div className="absolute inset-y-0 right-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:right-[180px] lg:w-[240px]" />
        <div className="absolute inset-y-0 right-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:right-[360px] lg:w-[240px]" />
        <div className="absolute inset-y-0 right-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:right-[540px] lg:w-[240px]" />
      </div>

      {/* lit dark-violet centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 46% 46%, rgba(13,15,14,0.94) 0%, rgba(13,15,14,0.68) 55%, rgba(13,15,14,0.08) 100%)",
        }}
      />

      {/* soft violet glow behind the image card (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,232,0.40) 0%, rgba(124,92,232,0.12) 45%, rgba(124,92,232,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* soft glow at the bottom on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] md:hidden"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(124,92,232,0.5) 0%, rgba(106,63,224,0.18) 45%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p
              className="ah-in text-[15px] font-semibold uppercase tracking-[0.2em] text-[#8b7bff]"
              style={{ animationDelay: "0ms" }}
            >
              About ORYNTAL
            </p>

            <h1
              id="about-hero-title"
              className="ah-in mt-4 max-w-[620px] text-[40px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[64px]"
              style={{ animationDelay: "80ms" }}
            >
              Technology that fits
              <br />
              the way you work
            </h1>

            <p
              className="ah-in mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#d1d1d6] sm:text-[18px]"
              style={{ animationDelay: "160ms" }}
            >
              ORYNTAL helps businesses move from scattered manual work to
              organized, connected operations. We build websites, apps,
              automation, and chat and voice tools around what your business
              actually needs.
            </p>

            <p
              className="ah-in mt-4 max-w-[560px] text-[16px] leading-relaxed text-[#d1d1d6] sm:text-[18px]"
              style={{ animationDelay: "240ms" }}
            >
              We are a small, hands-on team. You work with the same people from
              the first conversation to launch.
            </p>

            <div
              className="ah-in mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                href="/services/custom-proposal"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-base font-medium text-[#0d0f0e] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(124,92,232,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
              >
                Request a proposal
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-white/30 px-8 text-base font-medium text-white transition-colors duration-200 hover:border-[#8b7bff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
              >
                See our work
              </Link>
            </div>

            <div
              className="ah-in mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-white/80"
              style={{ animationDelay: "400ms" }}
            >
              {trustItems.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="size-4 text-[#8b7bff]" />
                  <span>{item}</span>
                  {index < trustItems.length - 1 ? (
                    <span aria-hidden className="ml-1 text-white/25">
                      •
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none lg:justify-self-center">
            <AboutHeroSlides />
          </div>
        </div>
      </div>
    </section>
  );
}
