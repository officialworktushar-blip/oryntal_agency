import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const PHOTOS = [
  { src: "", alt: "", from: "#7aa7ff", mid: "#a99bff", to: "#6a3fe0" },
  { src: "", alt: "", from: "#5b3de0", mid: "#8b7bff", to: "#c4b5fd" },
  { src: "", alt: "", from: "#3b2a9e", mid: "#6a4fe0", to: "#a99bff" },
];

const SLIDE_DELAYS = ["-0.8s", "4.2s", "9.2s"] as const;

const LEADERS = [
  { role: "Founders", image: "" },
  { role: "CEO", image: "" },
  { role: "CMO", image: "" },
  { role: "CBO", image: "" },
  { role: "Team leads", image: "" },
];

const LEADER_POSITIONS = [
  { top: "7%", left: "6%" },
  { top: "19%", left: "30%" },
  { top: "31%", left: "8%" },
  { top: "43%", left: "34%" },
  { top: "55%", left: "10%" },
] as const;

const copy = {
  eyebrow: "How ORYNTAL is built",
  heading: "Built step by step,\naround real business needs",
  paragraphOne:
    "ORYNTAL is built on a simple idea: businesses should not have to juggle scattered tools and manual work. We build websites, apps, automation and chat tools one step at a time, around what each business actually needs, and keep improving them as the business grows.",
  paragraphTwo:
    "Our founders and leads stay hands-on, from the first conversation to launch.",
  cta: "Talk to our team",
  ctaHref: "/contact",
  bubbleOne: "Start with what you need",
  bubbleTwo: "Grow it one step at a time",
};

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2.5c.7 3.9 2.6 5.8 6.5 6.5-3.9.7-5.8 2.6-6.5 6.5-.7-3.9-2.6-5.8-6.5-6.5 3.9-.7 5.8-2.6 6.5-6.5Z" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function LeaderAvatar({ image }: { image: string }) {
  return (
    <span className="relative grid size-[30px] shrink-0 place-items-center overflow-hidden rounded-full min-[480px]:size-9">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="36px"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-full w-full place-items-center text-white"
          style={{
            background: "linear-gradient(135deg, #5b3de0 0%, #8b7bff 100%)",
          }}
        >
          <PersonIcon className="size-4" />
        </span>
      )}
    </span>
  );
}

function PhotoSlide({
  photo,
  index,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
}) {
  return (
    <div
      className="ab-slide absolute inset-0"
      style={{ animationDelay: SLIDE_DELAYS[index] }}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 620px, (min-width: 640px) 520px, 90vw"
          className="object-cover object-top"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${photo.from} 0%, ${photo.mid} 55%, ${photo.to} 100%)`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -left-6 top-[12%] h-[42%] w-[52%] rounded-full bg-white/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 bottom-[8%] h-[38%] w-[46%] rounded-full bg-white/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function AboutBuildup() {
  const hasPhotoAlt = PHOTOS.some((photo) => photo.alt.trim().length > 0);

  return (
    <section
      id="about-buildup"
      aria-labelledby="about-buildup-title"
      className="relative overflow-hidden border-y border-black/5 bg-[#f6f5fb] px-5 pt-16 pb-[30px] text-[#0d0d0f] sm:px-6 md:pt-24 md:pb-[30px] lg:px-8"
    >
      <style>{`
        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ab-slide-fade {
          0% { opacity: 0; transform: scale(1.05); }
          5% { opacity: 1; transform: scale(1.02); }
          33.33% { opacity: 1; transform: scale(1); }
          38.33% { opacity: 0; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        @keyframes ab-float {
          from { transform: translateY(0); }
          to { transform: translateY(var(--ab-float-dist, -5px)); }
        }
        @keyframes ab-pop {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ab-bubble-float {
          from { transform: translateY(0); }
          to { transform: translateY(-3px); }
        }

        .ab-slide {
          opacity: 0;
        }
        .ab-slide:first-child {
          opacity: 1;
        }

        @media (prefers-reduced-motion: no-preference) {
          .ab-in {
            animation: ab-fade-up 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
          }
          .ab-slide {
            animation: ab-slide-fade 15s linear infinite both;
          }
          .ab-frame:hover .ab-slide,
          .ab-visual:hover .ab-slide {
            animation-play-state: paused;
          }
          .ab-pill {
            animation: ab-float var(--ab-float-dur, 6s) ease-in-out var(--ab-float-delay, 0s) infinite alternate;
          }
          .ab-bubble {
            animation: ab-pop 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both, ab-bubble-float 6s ease-in-out infinite alternate;
          }
          .ab-bubble-1 {
            animation-delay: 0s, 0.6s;
          }
          .ab-bubble-2 {
            animation-delay: 0.1s, 0.8s;
            animation-duration: 0.5s, 7s;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[46fr_54fr] lg:gap-16">
          <div>
            <p
              className="ab-in text-[14px] font-semibold uppercase tracking-widest text-[#6a3fe0]"
              style={{ animationDelay: "0ms" }}
            >
              {copy.eyebrow}
            </p>

            <h2
              id="about-buildup-title"
              className="ab-in mt-4 whitespace-pre-line text-[38px] font-light leading-[1.05] tracking-[-0.04em] text-[#0d0d0f] sm:text-5xl lg:text-[64px]"
              style={{ animationDelay: "80ms" }}
            >
              {copy.heading}
            </h2>

            <p
              className="ab-in mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[#26262b] sm:text-[18px]"
              style={{ animationDelay: "160ms" }}
            >
              {copy.paragraphOne}
            </p>

            <p
              className="ab-in mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#26262b] sm:text-[18px]"
              style={{ animationDelay: "240ms" }}
            >
              {copy.paragraphTwo}
            </p>

            <Link
              href={copy.ctaHref}
              className="ab-in mt-8 inline-flex h-[60px] items-center justify-center rounded-xl bg-[#6a3fe0] px-9 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5b32d0] hover:shadow-[0_16px_40px_rgba(91,61,224,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a3fe0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f5fb]"
              style={{ animationDelay: "320ms" }}
            >
              {copy.cta}
            </Link>
          </div>

          <div className="ab-visual relative mx-auto aspect-[1/1.02] w-full max-w-[520px] lg:ml-auto lg:mr-0 lg:max-w-[620px]">
            <div
              className="ab-frame absolute inset-0 overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, 78% 0, 100% 22%, 100% 100%, 14% 100%, 0 86%)",
              }}
              role={hasPhotoAlt ? undefined : "img"}
              aria-label={
                hasPhotoAlt ? undefined : "Photos of the ORYNTAL team"
              }
            >
              {PHOTOS.map((photo, index) => (
                <PhotoSlide key={index} photo={photo} index={index} />
              ))}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              />
            </div>

            <ul aria-label="Leadership roles" className="absolute inset-0 z-20">
              {LEADERS.map((leader, index) => {
                const position = LEADER_POSITIONS[index];
                const duration = 5 + (index % 4);
                const delay = index * 0.45;
                const distance = 4 + (index % 3);

                return (
                  <li
                    key={leader.role}
                    className="ab-pill absolute flex items-center gap-2.5 rounded-full bg-white p-1.5 pr-5 shadow-[0_8px_24px_rgba(20,10,60,0.18)]"
                    style={
                      {
                        top: position.top,
                        left: position.left,
                        "--ab-float-dur": `${duration}s`,
                        "--ab-float-delay": `${delay}s`,
                        "--ab-float-dist": `-${distance}px`,
                      } as CSSVars
                    }
                  >
                    <LeaderAvatar image={leader.image} />
                    <span className="whitespace-nowrap text-[14px] font-semibold leading-none text-[#0d0d0f] min-[480px]:text-[15px] lg:text-[20px]">
                      {leader.role}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="ab-bubble ab-bubble-1 absolute bottom-[20%] left-[3%] z-30 flex max-w-[82%] items-center gap-3 rounded-2xl bg-white px-[22px] py-4 shadow-[0_14px_40px_rgba(20,10,60,0.16)]">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#6a3fe0] text-white">
                <SparkleIcon className="size-4" />
              </span>
              <span className="text-[15px] font-medium leading-tight text-[#0d0d0f] sm:text-[17px]">
                {copy.bubbleOne}
              </span>
            </div>

            <div className="ab-bubble ab-bubble-2 absolute bottom-[5%] left-[13%] z-30 flex max-w-[82%] items-center gap-3 rounded-2xl bg-white px-[22px] py-4 shadow-[0_14px_40px_rgba(20,10,60,0.16)]">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e9e3ff] text-[#5b3de0]">
                <PersonIcon className="size-4" />
              </span>
              <span className="text-[15px] font-medium leading-tight text-[#0d0d0f] sm:text-[17px]">
                {copy.bubbleTwo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
