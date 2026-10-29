import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ComparisonRow = {
  ours: string;
  theirs: string;
};

const ROWS: ComparisonRow[] = [
  {
    ours: "Customers scan one code and reach your review page",
    theirs: "Customers search for your profile on their own",
  },
  {
    ours: "One code for all your review profiles",
    theirs: "Separate links shared one by one",
  },
  {
    ours: "Easy for customers to leave feedback",
    theirs: "Extra steps for customers",
  },
  {
    ours: "Feedback organised in one simple process",
    theirs: "Feedback scattered across messages and platforms",
  },
  {
    ours: "Simple plan at ₹399/month",
    theirs: "Your own time spent asking for reviews",
  },
];

export default function QR2ReviewCompare() {
  const contactHref = "/contact?message=I%27d%20like%20to%20set%20up%20QR2%20Review%20for%20my%20business.";

  return (
    <section
      aria-label="QR2 Review compared with collecting reviews manually"
      style={{ backgroundColor: "#000000" }}
      className="text-white py-16 lg:py-24 px-4 lg:px-8"
    >
      <h2 className="text-center text-[34px] sm:text-[46px] lg:text-[56px] font-medium tracking-tight leading-[1.1] max-w-[820px] mx-auto">
        QR2 Review vs. collecting reviews manually
      </h2>
      <p className="text-center text-base lg:text-lg text-white/65 max-w-[720px] mx-auto mt-5 leading-relaxed">
        What is the difference? We keep it simple, so your customers can leave feedback in seconds.
      </p>

      <div className="mt-12 mx-auto max-w-[1080px] relative">
        {/* Left column outline */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 rounded-3xl pointer-events-none border-2"
          style={{ borderColor: "#8b7cf6" }}
        />
        {/* Right column outline */}
        <div className="absolute inset-y-0 right-0 w-1/2 rounded-3xl pointer-events-none border border-white/10" />

        <div className="grid grid-cols-2">
          {/* Header row */}
          <div className="flex items-center px-5 sm:px-10 py-4 border-b border-white/10 min-h-[104px]">
            <div>
              <div className="text-lg sm:text-2xl font-bold tracking-[0.2em] text-white">
                ORYNTAL
              </div>
              <div className="text-sm text-white/60">QR2 Review</div>
            </div>
          </div>
          <div className="flex items-center px-5 sm:px-10 py-4 border-b border-white/10 min-h-[104px]">
            <div className="text-sm sm:text-base font-semibold text-white">
              Collecting reviews manually
            </div>
          </div>

          {/* Data rows */}
          {ROWS.map((row, index) => (
            <div key={index} className="contents">
              <div className="flex items-center justify-between px-5 sm:px-10 py-4 border-b border-white/10 min-h-[84px]">
                <span className="text-sm sm:text-base font-semibold text-white">
                  {row.ours}
                </span>
                <CheckCircle2
                  className="h-[22px] w-[22px] text-emerald-400 shrink-0 ml-4"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center px-5 sm:px-10 py-4 border-b border-white/10 min-h-[84px]">
                <span className="text-sm sm:text-lg text-white/85 font-normal">
                  {row.theirs}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm sm:text-base text-white/75 max-w-[720px] mx-auto">
          Connect Google Business, Trustpilot, Airbnb, 99acres, Etsy and more.
        </p>
        <Link
          href={contactHref}
          className="mt-6 inline-flex items-center gap-3 bg-[#673DE6] hover:bg-[#5a33cf] text-white rounded-xl px-8 py-4 text-base font-medium transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Get QR2 Review
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
        <p className="mt-6 text-xs sm:text-sm text-white/50 max-w-[620px] mx-auto leading-relaxed">
          QR2 Review may be included as a complimentary benefit for eligible ORYNTAL clients, subject to the applicable package and terms.
        </p>
      </div>
    </section>
  );
}
