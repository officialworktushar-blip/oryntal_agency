import Image from "next/image";
import Link from "next/link";

const PROPOSAL_LINK = "/services/custom-proposal";

// Base canvas = 870 x 507 units. All positions below are in these units and are
// converted to percentages, so the whole collage scales with the screen width.
const W = 870;
const H = 507;

type Tile = {
  x: number; y: number; w: number; h: number;
  src: string; alt: string; label: string; delay: number;
  focus?: string;
};

const TILES: Tile[] = [
  { x: 130, y: 211, w: 168, h: 102, src: "/website-sampleworks/business_website.webp", alt: "Business website project", label: "Business Website", delay: 0.10, focus: "top" },
  { x: 308, y: 183, w: 151, h: 100, src: "/website-sampleworks/customer Panel.webp", alt: "Customer portal", label: "Customer Portal", delay: 0.20, focus: "top" },
  { x: 471, y: 124, w: 104, h: 159, src: "/website-sampleworks/product-page.webp", alt: "Online store product page", label: "Online Store", delay: 0.30, focus: "top" },
  { x: 585, y: 92,  w: 83,  h: 108, src: "/website-sampleworks/mobile-app-screen.webp", alt: "Mobile app screen", label: "Mobile App", delay: 0.40, focus: "top" },
  { x: 585, y: 207, w: 151, h: 76,  src: "/website-sampleworks/admin panel.webp", alt: "Admin panel dashboard", label: "Admin Panel", delay: 0.50, focus: "top" },
  { x: 744, y: 174, w: 86,  h: 109, src: "/grow/grow1.webp", alt: "Customer chat interface", label: "Customer Chat", delay: 0.60, focus: "center" },
  { x: 308, y: 291, w: 113, h: 179, src: "/website-sampleworks/SaaS Product.webp", alt: "SaaS product interface", label: "SaaS Product", delay: 0.70, focus: "top" },
  { x: 431, y: 291, w: 182, h: 143, src: "/website-sampleworks/webapp.webp", alt: "Web application interface", label: "Web Application", delay: 0.80, focus: "top" },
  { x: 622, y: 293, w: 114, h: 64,  src: "/website-sampleworks/UI.webp", alt: "UI design mockup", label: "UI/UX Design", delay: 0.90, focus: "center" },
  { x: 622, y: 367, w: 114, h: 65,  src: "/grow/grow3.webp", alt: "Order automation dashboard", label: "Order Automation", delay: 1.00, focus: "center" },
  { x: 210, y: 320, w: 88,  h: 77,  src: "/grow/grow2.webp", alt: "AI agent interface", label: "AI Agent", delay: 1.10, focus: "center" },
];

// Solid violet blocks (these replace the tan blocks of the reference)
const BLOCKS = [
  { x: 206, y: 181, w: 92, h: 24, delay: 0.05 },
  { x: 678, y: 117, w: 58, h: 83, delay: 0.35 },
];
const CTA_BLOCK = { x: 744, y: 293, w: 86, h: 65, delay: 0.95 };

// Thin connecting lines [x1, y1, x2, y2]
const LINES: [number, number, number, number][] = [
  [130, 211, 206, 181],
  [309, 183, 471, 124],
  [585, 92, 471, 124],
  [736, 432, 830, 358],
  [421, 470, 471, 440],
];

const pctX = (v: number) => `${((v / W) * 100).toFixed(3)}%`;
const pctY = (v: number) => `${((v / H) * 100).toFixed(3)}%`;
const box = (x: number, y: number, w: number, h: number) => ({
  left: pctX(x), top: pctY(y), width: pctX(w), height: pctY(h),
});

export default function ProjectCollageHero() {
  return (
    <section className="relative overflow-hidden bg-[#0c0726] px-4 pb-16 pt-28 sm:px-6 lg:pb-24 lg:pt-32">
      {/* soft violet glows */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#5b34d6]/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 h-[480px] w-[480px] rounded-full bg-[#7c5cff]/20 blur-[140px]" />

      <style>{`
        @keyframes hc-in { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes hc-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: no-preference) {
          .hc-in { animation: hc-in .8s cubic-bezier(.2,.7,.2,1) both; }
          .hc-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hc-draw 1.4s .3s ease forwards; }
        }
      `}</style>

      {/* ============ DESKTOP COLLAGE ============ */}
      <div
        className="relative mx-auto hidden w-full max-w-[1360px] lg:block"
        style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}
      >
        {/* top thin line + tiny header text */}
        <div aria-hidden className="absolute left-0 right-0 h-px bg-[#8b6cff]/30" style={{ top: pctY(32) }} />
        <p
          className="absolute right-[2.5%] font-medium tracking-wide text-white/60"
          style={{ top: pctY(14), fontSize: "max(9px, 0.9cqw)" }}
        >
          ORYNTAL | Website &amp; App Development
        </p>

        {/* connecting lines + diamond outline */}
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
          {LINES.map(([x1, y1, x2, y2], i) => (
            <path
              key={i}
              d={`M${x1} ${y1} L${x2} ${y2}`}
              pathLength={1}
              className="hc-line"
              stroke="#8b6cff"
              strokeOpacity="0.55"
              strokeWidth="0.8"
            />
          ))}
          <g transform="translate(268 128)" stroke="#8b6cff" strokeOpacity="0.8" strokeWidth="0.9" strokeLinejoin="round">
            <polygon points="20,2 62,2 80,20 41,50 2,20" />
            <polyline points="2,20 80,20" />
            <polyline points="20,2 31,20 41,50" />
            <polyline points="62,2 51,20 41,50" />
            <polyline points="31,20 41,2 51,20" />
          </g>
        </svg>

        {/* top-left title block */}
        <div className="absolute" style={{ left: pctX(48), top: pctY(88) }}>
          <p className="font-semibold leading-tight text-white" style={{ fontSize: "2.1cqw" }}>
            Digital work, crafted
            <br />
            for growing businesses
          </p>
          <p
            className="mt-[0.8cqw] font-semibold uppercase text-[#8b6cff]"
            style={{ fontSize: "max(8px, 0.82cqw)", letterSpacing: "0.42em" }}
          >
            Website &amp; App Development
          </p>
          <div className="mt-[1.6cqw] h-[2px] w-[3.6cqw] bg-[#8b6cff]" />
        </div>

        {/* big bottom-left heading (sits under the photos, like the reference) */}
        <h1
          className="absolute bg-gradient-to-b from-[#b7a9ff] to-[#7c5cff] bg-clip-text font-extrabold uppercase text-transparent"
          style={{ left: pctX(48), top: pctY(322), fontSize: "5.2cqw", lineHeight: 0.95, letterSpacing: "0.02em" }}
        >
          Web
          <br />
          &amp; App
          <br />
          Work
        </h1>

        {/* violet blocks */}
        {BLOCKS.map((b, i) => (
          <div
            key={i}
            aria-hidden
            className="hc-in absolute rounded-[3px] bg-gradient-to-br from-[#7c5cff] to-[#5b34d6] opacity-90"
            style={{ ...box(b.x, b.y, b.w, b.h), animationDelay: `${b.delay}s` }}
          />
        ))}

        {/* CTA block (the third block is a real link) */}
        <Link
          href={PROPOSAL_LINK}
          className="hc-in group absolute flex flex-col justify-end rounded-[3px] bg-gradient-to-br from-[#7c5cff] to-[#5b34d6] p-[1cqw] text-white transition-[filter] duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ ...box(CTA_BLOCK.x, CTA_BLOCK.y, CTA_BLOCK.w, CTA_BLOCK.h), animationDelay: `${CTA_BLOCK.delay}s` }}
        >
          <span className="font-semibold leading-tight" style={{ fontSize: "max(10px, 1.1cqw)" }}>
            Start a project
          </span>
          <span className="mt-[0.3cqw] transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: "max(12px, 1.4cqw)" }}>
            →
          </span>
        </Link>

        {/* photo tiles */}
        {TILES.map((t, i) => (
          <div
            key={i}
            className="hc-in group absolute overflow-hidden rounded-[3px] border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.55)] transition-colors duration-500 hover:z-20 hover:border-[#8b6cff]/80"
            style={{ ...box(t.x, t.y, t.w, t.h), animationDelay: `${t.delay}s` }}
          >
            <Image
              src={t.src}
              alt={t.alt}
              fill
              sizes="(min-width: 1360px) 260px, 20vw"
              priority={i < 4}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ objectPosition: t.focus ?? "top" }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <span
              className="absolute left-[5%] top-[6%] flex items-center gap-[0.4em] font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]"
              style={{ fontSize: "max(8px, 0.85cqw)" }}
            >
              <span aria-hidden className="text-[#a596ff]">▷</span>
              {t.label}
            </span>
          </div>
        ))}

        {/* tiny bottom-right brand text */}
        <p
          className="absolute font-bold tracking-[0.25em] text-white/50"
          style={{ right: pctX(40), top: pctY(486), fontSize: "max(8px, 0.8cqw)" }}
        >
          ORYNTAL
        </p>
      </div>

      {/* ============ MOBILE / TABLET LAYOUT ============ */}
      <div className="relative mx-auto max-w-2xl lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6cff]">
          Website &amp; App Development
        </p>
        <p className="mt-4 text-2xl font-semibold leading-snug text-white">
          Digital work, crafted for growing businesses
        </p>
        <div className="mt-5 h-[2px] w-12 bg-[#8b6cff]" />
        <h1 className="mt-6 bg-gradient-to-b from-[#b7a9ff] to-[#7c5cff] bg-clip-text text-6xl font-extrabold uppercase leading-[0.95] tracking-wide text-transparent sm:text-7xl">
          Web
          <br />
          &amp; App
          <br />
          Work
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {TILES.slice(0, 6).map((t, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border border-white/10 ${
                i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 672px) 50vw, 336px"
                priority={i === 0}
                className="object-cover"
                style={{ objectPosition: t.focus ?? "top" }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
              <span className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[11px] font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                <span aria-hidden className="text-[#a596ff]">▷</span>
                {t.label}
              </span>
            </div>
          ))}
          <Link
            href={PROPOSAL_LINK}
            className="col-span-2 flex items-center justify-between rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#5b34d6] px-6 py-5 text-lg font-semibold text-white"
          >
            Start a project <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
