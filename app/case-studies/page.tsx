import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Case Studies | ORYNTAL";
const description =
  "See how ORYNTAL turns a business requirement into a website, app or automated workflow.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title, description, url: "/case-studies" },
  twitter: { card: "summary_large_image", title, description },
};

const FEATURED = {
  label: "FEATURED CASE STUDY",
  businessType: "Retail business",
  title: "An online store with payments and WhatsApp order updates",
  summary:
    "From a simple requirement to a working store, built around how the business sells.",
  chips: ["Website", "WhatsApp updates", "Online payments"],
  href: "#case-studies",
};

const CASE_STUDIES = [
  { date: "Add date", businessType: "Retail business", thumbTitle: "Online store with payments and WhatsApp updates", title: "An online store with payments and WhatsApp order updates", excerpt: "From a simple requirement to a working store, built around how the business sells.", icon: "store", image: "", href: "" },
  { date: "Add date", businessType: "Clinic", thumbTitle: "Bookings and reminders on autopilot", title: "Clinic bookings and automatic reminders", excerpt: "Fewer missed appointments and faster replies to patient enquiries.", icon: "calendar", image: "", href: "" },
  { date: "Add date", businessType: "Wholesale business", thumbTitle: "Orders and sourcing without spreadsheets", title: "Order tracking and supplier sourcing for a wholesale business", excerpt: "One place to track orders, chase payments and find the right suppliers.", icon: "truck", image: "", href: "" },
];

const DEMOS_HREF = "#website-demos";

const DEMOS = [
  { title: "Jewellery store", category: "Online store", image: "", href: "" },
  { title: "Resin art studio", category: "Online store", image: "", href: "" },
  { title: "Candle shop", category: "Online store", image: "", href: "" },
  { title: "Clinic", category: "Bookings and replies", image: "", href: "" },
  { title: "Salon", category: "Bookings and reviews", image: "", href: "" },
  { title: "Real estate broker", category: "Listings and enquiries", image: "", href: "" },
  { title: "Cafe and restaurant", category: "Menu and orders", image: "", href: "" },
  { title: "Personal portfolio", category: "Portfolio", image: "", href: "" },
];

const STUDY_GRADIENTS = [
  "linear-gradient(135deg, #5b3de0 0%, #7c5ce8 100%)",
  "linear-gradient(135deg, #3b2a9e 0%, #6a4fe0 100%)",
  "linear-gradient(135deg, #4c1d95 0%, #8b7bff 100%)",
];

const DEMO_ACCENTS = [
  "#7c5ce8",
  "#3b82f6",
  "#e8a317",
  "#10b981",
  "#ec4899",
  "#14b8a6",
  "#ef4444",
  "#6366f1",
];

// PLACEHOLDER: replace with real client quotes, with the client's permission, before publishing.
const TESTIMONIALS = [
  { businessType: "Online store", quote: "Add a real client quote here about their website or online store, in their own words.", name: "Client name", initials: "CN", role: "Owner, retail business", href: "" },
  { businessType: "Clinic", quote: "Add a real client quote here about bookings, reminders or WhatsApp replies.", name: "Client name", initials: "CN", role: "Clinic owner", href: "" },
  { businessType: "Wholesale business", quote: "Add a real client quote here about order tracking or supplier sourcing.", name: "Client name", initials: "CN", role: "Founder, wholesale business", href: "" },
  { businessType: "Working with ORYNTAL", quote: "Add a real client quote here about the process: the clear proposal, the updates and the delivery.", name: "Client name", initials: "CN", role: "Business owner", href: "" },
];

// To add photos, put transparent PNG or WebP cut-outs in /public/testimonials/ and set src, for example "/testimonials/client-left.png".
const LEFT_PHOTO = { src: "", alt: "" };
const RIGHT_PHOTO = { src: "", alt: "" };

const AVATAR_COLORS = ["#c9b8ff", "#a5e3dc", "#a9d8f5", "#fbd5b5"];

const chipIcons = [
  // monitor / website
  <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  // chat bubble
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.1A8 8 0 1 1 21 12Z" />
  </svg>,
  // card / payments
  <svg key="card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
  </svg>,
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}

function StudyIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className: "h-7 w-7",
  } as const;

  if (name === "calendar") {
    return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
      </svg>
    );
  }

  if (name === "truck") {
    return (
      <svg {...props}>
        <path d="M2 6h12v10H2z" />
        <path d="M14 9h4l3 3v4h-7" />
        <circle cx="6.5" cy="17.5" r="1.6" />
        <circle cx="16.5" cy="17.5" r="1.6" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M5.5 8h13l-1.2 12.2a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4L5.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function CaseStudyThumb({
  item,
  index,
}: {
  item: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  return (
    <div className="relative aspect-[2/1] overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-1">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 90vw"
          className="object-cover object-top"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              STUDY_GRADIENTS[index % STUDY_GRADIENTS.length],
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.5px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            aria-hidden
            className="absolute -right-8 -top-10 h-44 w-60 rotate-12 bg-white/[0.08]"
          />
          <span className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <StudyIcon name={item.icon} />
          </span>
          <p className="absolute inset-x-4 bottom-4 line-clamp-3 text-[22px] font-medium leading-tight text-white sm:text-[26px]">
            {item.thumbTitle}
          </p>
        </div>
      )}
    </div>
  );
}

function DemoPreview({
  item,
  index,
}: {
  item: (typeof DEMOS)[number];
  index: number;
}) {
  const accent = DEMO_ACCENTS[index % DEMO_ACCENTS.length];

  return (
    <div className="relative aspect-[8/5] overflow-hidden rounded-2xl border border-white/10 bg-[#15151a] transition-colors duration-300 group-hover:border-[#8b7bff]/70">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full flex-col p-4" aria-hidden>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-1.5 w-8 rounded-full bg-white/20" />
            <span className="h-1.5 w-6 rounded-full bg-white/20" />
            <span className="h-1.5 w-7 rounded-full bg-white/20" />
          </div>
          <div className="mt-4 flex min-h-0 flex-1 items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="h-3 w-4/5 rounded bg-white/75" />
              <div className="mt-2 h-3 w-3/5 rounded bg-white/75" />
              <div
                className="mt-3 h-6 w-16 rounded-md"
                style={{ background: accent }}
              />
            </div>
            <div
              className="h-full w-[38%] shrink-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accent}66 100%)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  return (
    <article className="cxf-reveal rounded-[20px] bg-white p-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(124,92,232,0.30)]">
      <span className="inline-flex rounded-full bg-[#f1edff] px-3.5 py-1 text-[13px] font-semibold text-[#5b3de0]">
        {item.businessType}
      </span>
      <p className="mt-4 text-[18px] font-light leading-[1.5] text-[#0d0d0f] md:text-[20px]">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[14px] font-medium text-[#0d0d0f]"
          style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
        >
          {item.initials}
        </span>
        <div className="min-w-0">
          <p className="text-[18px] font-bold text-[#0d0d0f]">{item.name}</p>
          <p className="text-[14px] text-[#6b6b76]">{item.role}</p>
        </div>
        {item.href ? (
          <Link
            href={item.href}
            className="ml-auto inline-flex shrink-0 items-center gap-1 text-[15px] font-semibold text-[#5b3de0] underline-offset-4 transition-colors hover:text-[#3b2a9e] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b3de0]/50"
          >
            Read the case study
            <ArrowRightIcon className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function FeedbackStack() {
  return (
    <div className="flex flex-col gap-5">
      {TESTIMONIALS.map((item, index) => (
        <TestimonialCard key={index} item={item} index={index} />
      ))}
      <p className="mt-10 text-center text-[16px] text-white/80">
        Want to be our next case study?{" "}
        <Link
          href="/services/custom-proposal"
          className="rounded-sm font-medium text-[#c4b5fd] underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff]"
        >
          Request a proposal
        </Link>
      </p>
    </div>
  );
}

function PhotoSpace({
  photo,
  side,
}: {
  photo: { src: string; alt: string };
  side: "left" | "right";
}) {
  return (
    <div className="relative min-h-[560px]">
      {!photo.src && (
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#7c5ce8]/25 blur-3xl"
        />
      )}
      {photo.src && (
        <div
          aria-hidden={photo.alt ? undefined : true}
          className={`pointer-events-none absolute bottom-0 h-[640px] w-[560px] ${
            side === "left" ? "right-[-48px]" : "left-[-48px]"
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="560px"
            className="object-contain object-bottom"
          />
        </div>
      )}
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#0d0f0e] text-white">
      <section
        id="case-studies-hero"
        aria-labelledby="case-studies-title"
        className="relative isolate flex min-h-[max(720px,100vh)] w-full flex-col items-center justify-center overflow-hidden bg-[#0d0f0e] px-5 pb-20 pt-28 text-center sm:px-6 lg:px-8"
      >
        <style>{`
          @keyframes cs-fade-up {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes cs-glow-pulse {
            0%, 100% { box-shadow: 0 0 60px rgba(124,92,232,0.35); }
            50% { box-shadow: 0 0 95px rgba(124,92,232,0.55); }
          }
          @keyframes cs-shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.82; }
          }
          @keyframes cs-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .cs-in { animation: cs-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both; }
            .cs-glow { animation: cs-glow-pulse 4s ease-in-out infinite; }
            .cs-pillars { animation: cs-shimmer 7s ease-in-out infinite; }
            .cs-bob { animation: cs-bob 2.4s ease-in-out infinite; }
          }
        `}</style>

        {/* stepped violet pillar bands, left and right (desktop only) */}
        <div aria-hidden className="cs-pillars pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute inset-y-0 left-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:left-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:left-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 left-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:left-[540px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-0 h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/25 to-[#6a3fe0] opacity-[0.65] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[130px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/20 to-[#7c5ce8] opacity-50 lg:right-[180px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[260px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/15 to-[#6a3fe0] opacity-40 lg:right-[360px] lg:w-[240px]" />
          <div className="absolute inset-y-0 right-[390px] h-full w-[180px] bg-gradient-to-b from-transparent via-[#7c5ce8]/10 to-[#7c5ce8] opacity-30 lg:right-[540px] lg:w-[240px]" />
        </div>

        {/* wide centered pillar — the lit stage behind the text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[640px] max-w-[88vw] -translate-x-1/2 bg-gradient-to-b from-[#2a1f5c]/0 via-[#2a1f5c]/70 to-[#2a1f5c]/80"
        />

        {/* strong violet glow rising from the bottom edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] blur-[70px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 100%, rgba(124,92,232,0.55) 0%, rgba(106,63,224,0.22) 45%, transparent 72%)",
          }}
        />

        {/* vignette so the text stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(13,15,14,0.94) 0%, rgba(13,15,14,0.68) 55%, rgba(13,15,14,0.08) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <h1
            id="case-studies-title"
            className="cs-in text-[40px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]"
            style={{ animationDelay: "0.05s" }}
          >
            See what we&apos;ve built
            <br />
            for real businesses
          </h1>

          <p
            className="cs-in mx-auto mt-6 max-w-[880px] text-base leading-relaxed text-[#d1d1d6] sm:text-lg"
            style={{ animationDelay: "0.15s" }}
          >
            Browse case studies that show how ORYNTAL turns a business
            requirement into a website, an app or an automated workflow.
          </p>

          {/* featured case study card */}
          <div className="cs-in mt-12" style={{ animationDelay: "0.25s" }}>
            <article className="cs-glow rounded-3xl border-2 border-[#6a4fe0] bg-white p-7 text-left sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6a3fe0]">
                  {FEATURED.label}
                </span>
                <span className="rounded-full bg-[#f1edff] px-3.5 py-1 text-[13px] font-medium text-[#5b3de0]">
                  {FEATURED.businessType}
                </span>
              </div>

              <h2 className="mt-4 max-w-[640px] text-[22px] font-medium leading-snug text-[#0d0d0f] sm:text-[28px]">
                {FEATURED.title}
              </h2>
              <p className="mt-2 text-[17px] text-[#4b4b55]">{FEATURED.summary}</p>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap gap-2">
                  {FEATURED.chips.map((chip, i) => (
                    <li
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f4f6] px-3.5 py-1.5 text-sm text-[#26262b]"
                    >
                      <span className="text-[#7c5ce8]">{chipIcons[i]}</span>
                      {chip}
                    </li>
                  ))}
                </ul>
                <a
                  href={FEATURED.href}
                  className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#111113] px-7 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d1d20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5ce8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e] sm:w-auto"
                >
                  View case study
                  <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </div>

          <a
            href="#case-studies"
            className="cs-in cs-bob mt-8 inline-flex items-center gap-2 text-[15px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f0e]"
            style={{ animationDelay: "0.4s" }}
          >
            Scroll to browse all case studies
            <ArrowDownIcon className="size-4" />
          </a>
        </div>
      </section>

      <section
        id="case-studies"
        aria-labelledby="case-studies-heading"
        className="bg-white px-5 py-16 text-[#0d0d0f] sm:px-6 sm:py-24 lg:px-8"
      >
        <style>{`
          @keyframes csx-reveal {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: none; }
          }
          @media (prefers-reduced-motion: no-preference) {
            @supports (animation-timeline: view()) {
              .csx-reveal {
                animation: csx-reveal linear both;
                animation-timeline: view();
                animation-range: entry 0% entry 45%;
              }
              .csx-reveal:nth-child(2) { animation-range: entry 8% entry 52%; }
              .csx-reveal:nth-child(3) { animation-range: entry 16% entry 60%; }
              .csx-reveal:nth-child(4) { animation-range: entry 24% entry 68%; }
            }
          }
        `}</style>

        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center sm:text-left">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#6a3fe0]">
              CASE STUDIES
            </p>
            <h2
              id="case-studies-heading"
              className="mt-3 text-[32px] font-light leading-[1.1] tracking-[-0.04em] sm:text-[40px] lg:text-[48px]"
            >
              From requirement to working solution
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-relaxed text-[#4b4b55] sm:mx-0 sm:text-[18px]">
              A few examples of how ORYNTAL plans and builds around what a
              business actually needs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((item, index) => {
              const cardClass =
                "group csx-reveal block rounded-3xl p-4 transition-colors duration-300 hover:bg-[#f4f4f6]";
              const body = (
                <>
                  <CaseStudyThumb item={item} index={index} />
                  <p className="mt-5 text-[16px] text-[#26262b]">
                    {item.date} · {item.businessType}
                  </p>
                  <h3 className="mt-3 line-clamp-2 text-[20px] font-medium leading-snug sm:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[16px] leading-relaxed text-[#4b4b55]">
                    {item.excerpt}
                  </p>
                </>
              );
              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`${cardClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a3fe0] focus-visible:ring-offset-2`}
                >
                  {body}
                </Link>
              ) : (
                <article key={item.title} className={cardClass}>
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="website-demos"
        aria-labelledby="website-demos-heading"
        className="border-t border-white/5 bg-[#0d0d0f] px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[640px] text-center sm:text-left">
              <p className="text-[13px] font-semibold uppercase tracking-widest text-[#8b7bff]">
                WEBSITE DEMOS
              </p>
              <h2
                id="website-demos-heading"
                className="mt-3 text-[32px] font-light leading-[1.1] tracking-[-0.04em] sm:text-[40px] lg:text-[48px]"
              >
                Websites we can build for your business
              </h2>
              <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-relaxed text-white/70 sm:mx-0 sm:text-[18px]">
                Sample websites for different kinds of business. Each one is
                customized around your needs.
              </p>
            </div>
            <Link
              href={DEMOS_HREF}
              className="group inline-flex items-center gap-2 self-center text-[16px] font-semibold text-[#8b7bff] transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f] sm:self-auto"
            >
              View all demos
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEMOS.map((item, index) => {
              const cardClass =
                "group csx-reveal block transition-all duration-300 hover:-translate-y-1";
              const body = (
                <>
                  <DemoPreview item={item} index={index} />
                  <h3 className="mt-4 truncate text-[20px] font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[16px] text-white/60">
                    {item.category}
                  </p>
                </>
              );
              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`${cardClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f]`}
                >
                  {body}
                </Link>
              ) : (
                <article key={item.title} className={cardClass}>
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="client-feedback"
        aria-labelledby="client-feedback-heading"
        className="relative overflow-hidden pb-16 pt-16 text-white md:pt-24 lg:pb-0"
        style={{
          background:
            "linear-gradient(180deg, #0d0d0f 0%, #120a2e 25%, #2a1f6e 60%, #5b3de0 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 45% 80% at 50% 100%, rgba(155,135,224,0.35) 0%, rgba(155,135,224,0) 70%)",
          }}
        />
        <style>{`
          @keyframes cxf-reveal {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: none; }
          }
          @media (prefers-reduced-motion: no-preference) {
            @supports (animation-timeline: view()) {
              .cxf-reveal {
                animation: cxf-reveal linear both;
                animation-timeline: view();
                animation-range: entry 0% entry 45%;
              }
              .cxf-reveal:nth-of-type(2) { animation-range: entry 8% entry 52%; }
              .cxf-reveal:nth-of-type(3) { animation-range: entry 16% entry 60%; }
              .cxf-reveal:nth-of-type(4) { animation-range: entry 24% entry 68%; }
            }
          }
        `}</style>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px] text-center">
            <h2
              id="client-feedback-heading"
              className="text-[40px] font-light leading-[1.05] tracking-[-0.04em] md:text-[56px] lg:text-[72px]"
            >
              What our clients say
              <br />
              about working with us
            </h2>
            <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              Real feedback from businesses we have built websites, apps and
              workflows for.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,490px)_1fr] lg:items-end">
            <div className="hidden lg:block">
              <PhotoSpace photo={LEFT_PHOTO} side="left" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[560px] lg:max-w-none lg:pb-24">
              <FeedbackStack />
            </div>
            <div className="hidden lg:block">
              <PhotoSpace photo={RIGHT_PHOTO} side="right" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
