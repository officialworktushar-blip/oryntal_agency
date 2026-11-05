import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type CollageTile = {
  id: number;
  src: string;
  alt: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  z: number;
  priority?: boolean;
};

type CollageStyle = CSSProperties & {
  "--rot": string;
  "--dx": string;
  "--dy": string;
  "--dur": string;
  "--delay": string;
  "--z": string;
};

const tiles: CollageTile[] = [
  {
    id: 1,
    src: "/website-sampleworks/business_website.webp",
    alt: "Business website homepage design",
    label: "Business Website",
    x: 0.5,
    y: 2.5,
    w: 31,
    h: 21,
    rotate: -4,
    dx: 1.2,
    dy: -1.6,
    duration: 9,
    delay: -2,
    z: 2,
    priority: true,
  },
  {
    id: 2,
    src: "/website-sampleworks/mobile-app-screen.webp",
    alt: "Mobile app screen design",
    label: "Mobile App",
    x: 35,
    y: 0.5,
    w: 23,
    h: 29,
    rotate: -1.5,
    dx: 0.8,
    dy: 1.4,
    duration: 10,
    delay: -4,
    z: 4,
  },
  {
    id: 3,
    src: "/website-sampleworks/admin panel.webp",
    alt: "Admin panel interface",
    label: "Admin Panel",
    x: 63,
    y: 2,
    w: 34,
    h: 22,
    rotate: 3,
    dx: -1.4,
    dy: -1.2,
    duration: 11,
    delay: -1,
    z: 3,
  },
  {
    id: 4,
    src: "/website-sampleworks/product-page.webp",
    alt: "Online store product page design",
    label: "Online Store",
    x: 1,
    y: 27,
    w: 23,
    h: 29,
    rotate: 3,
    dx: 1.1,
    dy: -1.3,
    duration: 12,
    delay: -3,
    z: 5,
  },
  {
    id: 5,
    src: "/website-sampleworks/customer Panel.webp",
    alt: "Customer portal interface",
    label: "Customer Portal",
    x: 0,
    y: 58,
    w: 31,
    h: 21,
    rotate: -2,
    dx: -1.2,
    dy: 1.2,
    duration: 9.5,
    delay: -5,
    z: 6,
  },
  {
    id: 6,
    src: "/website-sampleworks/webapp.webp",
    alt: "Web application dashboard interface",
    label: "Web Application",
    x: 0.5,
    y: 83,
    w: 27,
    h: 22,
    rotate: -3,
    dx: 1.4,
    dy: 1.2,
    duration: 11.5,
    delay: -1.5,
    z: 4,
  },
  {
    id: 7,
    src: "/website-sampleworks/SaaS Product.webp",
    alt: "SaaS product mobile interface",
    label: "SaaS Product",
    x: 76,
    y: 27,
    w: 23,
    h: 29,
    rotate: 4,
    dx: -1.3,
    dy: -1.5,
    duration: 10.5,
    delay: -2.5,
    z: 5,
  },
  {
    id: 8,
    src: "/grow/grow1.webp",
    alt: "WhatsApp chat interface mockup",
    label: "Customer Chat",
    x: 69,
    y: 58,
    w: 31,
    h: 21,
    rotate: -2.5,
    dx: 1.3,
    dy: 1.3,
    duration: 10,
    delay: -4.5,
    z: 3,
  },
  {
    id: 9,
    src: "/website-sampleworks/UI.webp",
    alt: "UI/UX prototype design",
    label: "UI/UX Design",
    x: 77,
    y: 83,
    w: 23,
    h: 29,
    rotate: 3,
    dx: -1.1,
    dy: 1.1,
    duration: 11,
    delay: -3.5,
    z: 4,
  },
  {
    id: 10,
    src: "/grow/grow3.webp",
    alt: "Order automation workflow mockup",
    label: "Order Automation",
    x: 29,
    y: 83,
    w: 31,
    h: 21,
    rotate: 2,
    dx: 1.2,
    dy: -1.2,
    duration: 9,
    delay: -2,
    z: 2,
  },
];

const ctaTile: CollageTile = {
  id: 11,
  src: "/grow/grow2.webp",
  alt: "",
  label: "Start a project",
  x: 37,
  y: 38,
  w: 26,
  h: 26,
  rotate: -2,
  dx: 1,
  dy: -1,
  duration: 9.5,
  delay: -3,
  z: 10,
};

function styleFor(tile: CollageTile): CollageStyle {
  return {
    top: `${tile.y}cqw`,
    left: `${tile.x}cqw`,
    width: `${tile.w}cqw`,
    height: `${tile.h}cqw`,
    "--rot": `${tile.rotate}deg`,
    "--dx": `${tile.dx}cqw`,
    "--dy": `${tile.dy}cqw`,
    "--dur": `${tile.duration}s`,
    "--delay": `${tile.delay}s`,
    "--z": `${tile.z}`,
  };
}

const tileClassName =
  "project-collage-tile group absolute overflow-hidden rounded-[14px] border border-white/10 bg-[#120A35] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow] duration-300 will-change-transform z-[var(--z)] hover:z-40 hover:border-[#8B6CFF]/60 hover:shadow-[0_24px_60px_-16px_rgba(91,52,214,0.55)] sm:rounded-[18px]";

const imageSizes = "(max-width: 640px) 34vw, 220px";

export default function ProjectCollageHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0C0726] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <h1 className="sr-only">Websites and apps, built around your business.</h1>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[43%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.26) 0%, rgba(91,52,214,0.10) 42%, transparent 70%)",
          }}
        />
        <div
          className="absolute -left-[18%] top-[6%] h-[42%] w-[42%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(91,52,214,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-[12%] bottom-[2%] h-[38%] w-[38%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,108,255,0.16) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto aspect-[100/116] w-full max-w-[600px] [container-type:inline-size]">
          <style>{`
            @keyframes project-collage-drift {
              0% { transform: translate3d(0, 0, 0) rotate(var(--rot)); }
              100% { transform: translate3d(var(--dx), var(--dy), 0) rotate(calc(var(--rot) + 0.9deg)); }
            }
            .project-collage-tile {
              transform: rotate(var(--rot));
              animation-name: project-collage-drift;
              animation-duration: var(--dur);
              animation-delay: var(--delay);
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
              animation-direction: alternate;
              backface-visibility: hidden;
            }
            @media (prefers-reduced-motion: reduce) {
              .project-collage-tile { animation: none; }
            }
          `}</style>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[43%] size-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B6CFF]/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[43%] size-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B34D6]/10 blur-2xl"
          />

          {tiles.map((tile) => (
            <div key={tile.id} className={tileClassName} style={styleFor(tile)}>
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes={imageSizes}
                priority={tile.priority}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0C0726] via-[#0C0726]/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-1.5 px-2 pb-2 sm:px-3 sm:pb-2.5">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-[#8B6CFF] shadow-[0_0_8px_rgba(139,108,255,0.9)]"
                />
                <span className="truncate text-[9px] font-medium text-white/90 sm:text-[10px] lg:text-[11px]">
                  {tile.label}
                </span>
              </div>
            </div>
          ))}

          <Link
            href="/services/custom-proposal"
            className={`${tileClassName} flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0726]`}
            style={styleFor(ctaTile)}
          >
            <Image
              src={ctaTile.src}
              alt={ctaTile.alt}
              fill
              sizes="(max-width: 640px) 26vw, 170px"
              className="object-cover opacity-30 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,92,255,0.88),rgba(91,52,214,0.92)_52%,rgba(47,28,106,0.96))]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
            />
            <div className="relative flex h-full flex-col p-2.5 sm:p-3.5">
              <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[8px]">
                Let&apos;s build
              </span>
              <span className="mt-auto block text-[12px] font-semibold leading-tight text-white sm:text-[15px]">
                Start a<br className="sm:hidden" /> project
              </span>
              <span className="mt-1 hidden text-[10px] font-medium text-white/70 sm:block">
                Tell us what you&apos;re building
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
