import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SourcingFinalCtaProps {
  href?: string;
}

export default function SourcingFinalCta({
  href = "/contact?interest=business-operations-and-sourcing-support",
}: SourcingFinalCtaProps) {
  return (
    <section
      aria-label="Start your sourcing request"
      style={{ backgroundColor: "#000000" }}
      className="py-12 lg:py-16 px-4 lg:px-8"
    >
      <div
        className="mx-auto max-w-[1700px] relative overflow-hidden rounded-[28px] border border-white/15 px-6 py-20 lg:py-28 text-center text-white isolate"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 105%, #b7a3f7 0%, #7a5cf5 28%, #4a2bc0 55%, #1a0f4a 80%, #0a0618 100%)",
          backgroundColor: "#0a0618",
        }}
      >
        {/* Left edge shade */}
        <div
          className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(5,3,15,0.85), transparent)",
          }}
        />
        {/* Right edge shade */}
        <div
          className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(5,3,15,0.85), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="font-medium tracking-tight leading-[1.1] text-white text-[32px] sm:text-[44px] lg:text-[56px] max-w-[900px] mx-auto">
            Ready to simplify your sourcing? Let's find the right partners.
          </h2>
          <Link
            href={href}
            className="mt-10 inline-flex items-center gap-3 bg-white text-[#14092e] rounded-xl px-12 py-4 text-lg font-semibold hover:bg-[#ece6ff] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Start your sourcing request
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <p className="mt-4 text-sm text-white/85">
            Tell us what you sell and we will guide your next step.
          </p>
          <p className="mt-6 text-xs sm:text-sm text-white/60 max-w-[620px] mx-auto leading-relaxed">
            Supplier pricing, minimum order quantities, availability and terms are decided by each supplier. We cannot guarantee specific prices or savings.
          </p>
        </div>
      </div>
    </section>
  );
}
