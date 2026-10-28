import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface QR2ReviewHeroProps {
  href?: string;
}

export default function QR2ReviewHero({
  href = "/contact?message=I%27d%20like%20to%20set%20up%20QR2%20Review%20for%20my%20business.",
}: QR2ReviewHeroProps) {
  return (
    <section
      aria-label="QR2 Review"
      className="relative overflow-hidden isolate text-white min-h-[620px] lg:min-h-[680px] flex items-center justify-center px-4 py-20"
      style={{
        backgroundColor: "#05020f",
        background:
          "radial-gradient(ellipse 55% 65% at 0% 100%, #a58cff 0%, rgba(124,92,255,0.65) 35%, transparent 72%), radial-gradient(ellipse 55% 65% at 100% 100%, #a58cff 0%, rgba(124,92,255,0.65) 35%, transparent 72%), linear-gradient(to bottom, #05020f 0%, #120a35 55%, #3a1f8f 100%)",
      }}
    >
      {/* LEFT: QR tile */}
      <svg
        className="absolute hidden md:block left-[6%] bottom-[8%] w-[160px] md:w-[200px] lg:w-[280px] h-[160px] md:h-[200px] lg:h-[280px] pointer-events-none"
        style={{ transform: "rotate(-18deg)" }}
        viewBox="0 0 280 280"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="qrTileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5fa" />
            <stop offset="100%" stopColor="#9aa6b8" />
          </linearGradient>
          <linearGradient id="qrTileHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="10"
          width="260"
          height="260"
          rx="40"
          fill="url(#qrTileGradient)"
        />
        <rect
          x="10"
          y="10"
          width="260"
          height="260"
          rx="40"
          fill="url(#qrTileHighlight)"
        />
        {/* QR corner squares */}
        <rect x="40" y="40" width="70" height="70" rx="10" fill="#7a8595" />
        <rect x="170" y="40" width="70" height="70" rx="10" fill="#7a8595" />
        <rect x="40" y="170" width="70" height="70" rx="10" fill="#7a8595" />
        {/* Inner squares */}
        <rect x="55" y="55" width="40" height="40" rx="5" fill="#5a6575" />
        <rect x="185" y="55" width="40" height="40" rx="5" fill="#5a6575" />
        <rect x="55" y="185" width="40" height="40" rx="5" fill="#5a6575" />
        {/* Center pattern */}
        <rect x="130" y="130" width="20" height="20" rx="3" fill="#7a8595" />
        <rect x="140" y="140" width="20" height="20" rx="3" fill="#7a8595" />
        <rect x="120" y="120" width="20" height="20" rx="3" fill="#7a8595" />
        <rect x="150" y="150" width="20" height="20" rx="3" fill="#7a8595" />
        <rect x="120" y="150" width="20" height="20" rx="3" fill="#7a8595" />
        <rect x="150" y="120" width="20" height="20" rx="3" fill="#7a8595" />
      </svg>

      {/* TOP RIGHT: Purple star */}
      <svg
        className="absolute hidden md:block right-[10%] -top-[40px] w-[180px] md:w-[220px] lg:w-[300px] h-[180px] md:h-[220px] lg:h-[300px] pointer-events-none"
        style={{ transform: "rotate(15deg)" }}
        viewBox="0 0 300 300"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="purpleStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a5cf0" />
            <stop offset="100%" stopColor="#3b1a78" />
          </linearGradient>
        </defs>
        <path
          d="M150 10 L175 110 L280 110 L195 175 L225 280 L150 220 L75 280 L105 175 L20 110 L125 110 Z"
          fill="url(#purpleStarGradient)"
          stroke="#a78bfa"
          strokeWidth="2"
        />
      </svg>

      {/* BOTTOM RIGHT: Yellow speech bubble with star */}
      <svg
        className="absolute hidden md:block right-[18%] -bottom-[40px] w-[140px] md:w-[180px] lg:w-[240px] h-[140px] md:h-[180px] lg:h-[240px] pointer-events-none"
        style={{ transform: "rotate(8deg)" }}
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe86a" />
            <stop offset="100%" stopColor="#e8c72a" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="100" rx="90" ry="80" fill="url(#bubbleGradient)" />
        <path
          d="M80 170 L70 210 L110 180"
          fill="url(#bubbleGradient)"
        />
        {/* Star inside */}
        <path
          d="M120 40 L135 85 L180 85 L145 115 L160 160 L120 130 L80 160 L95 115 L60 85 L105 85 Z"
          fill="#fff8dc"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[1000px] mx-auto">
        <h1 className="text-[56px] sm:text-[88px] lg:text-[112px] font-bold tracking-tight leading-[0.95] text-white">
          QR2 Review
        </h1>

        {/* Star badge + price pill */}
        <div className="mt-4 flex items-center justify-center gap-0">
          {/* Star badge */}
          <svg
            className="hidden sm:block w-[70px] sm:w-[80px] md:w-[90px] h-[70px] sm:h-[80px] md:h-[90px]"
            style={{ transform: "rotate(-12deg)", marginRight: "-20px" }}
            viewBox="0 0 90 90"
            aria-hidden="true"
          >
            <path
              d="M45 5 L55 35 L85 35 L60 55 L70 85 L45 65 L20 85 L30 55 L5 35 L35 35 Z"
              fill="white"
            />
            <text x="45" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="black">
              ONLY
            </text>
            <text x="45" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="black">
              ₹399
            </text>
          </svg>

          {/* Price pill */}
          <div className="bg-[#ff4545] rounded-2xl px-6 py-2 sm:px-8 text-white font-bold text-[40px] sm:text-[64px] lg:text-[80px] leading-none">
            ₹399/month
          </div>
        </div>

        <p className="mt-8 text-lg sm:text-xl text-white/90 max-w-[620px] mx-auto leading-snug">
          Customers scan a QR code and land straight on your review page. More feedback, less effort.
        </p>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-3 bg-white text-[#14092e] rounded-2xl px-10 py-4 text-lg font-medium hover:bg-[#ece6ff] transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Get QR2 Review
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>

        <div className="mt-8 flex items-center justify-center gap-2 text-base sm:text-lg text-white/90">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          <span>Connect all your review profiles in one place</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-[760px] mx-auto">
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            Google Business
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            Trustpilot
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            Airbnb
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            99acres
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            Etsy
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/90">
            and more
          </span>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-white/60 max-w-[560px] mx-auto leading-relaxed">
          QR2 Review may be included as a complimentary benefit for eligible ORYNTAL clients, subject to the applicable package and terms.
        </p>
      </div>
    </section>
  );
}
