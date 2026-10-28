import Link from "next/link";
import {
  Check,
  Handshake,
  ListChecks,
  Package,
  Search,
  Store,
  Truck,
} from "lucide-react";

export default function SourcingSupportSection() {
  return (
    <section aria-label="Sourcing and operations support" className="bg-white py-16 lg:py-24">
      <style jsx>{`
        @keyframes ssp-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .ssp-float {
          animation: ssp-float 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ssp-float {
            animation: none;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* LEFT: Visual card */}
          <div className="relative overflow-hidden rounded-[28px] aspect-[4/3.3] w-full">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #241a5a 0%, #241a5a 38%, #8f78f2 62%, #cdbfff 85%, #e4dcff 100%)",
              }}
            />
            {/* Soft light swoosh */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 75%, rgba(255,255,255,0.55), transparent 60%)",
                filter: "blur(30px)",
              }}
            />

            {/* Row 1 pills */}
            <div
              className="absolute top-[12%] left-[8%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "0s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#8b7cf6" }}
              >
                <Truck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Delivery and logistics</span>
            </div>
            <div
              className="absolute top-[18%] right-[5%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "0.6s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#e8a317" }}
              >
                <Package className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Packaging guidance</span>
            </div>

            {/* Row 2 pills (shifted left, first pill partly cropped) */}
            <div
              className="absolute top-[42%] -left-[4%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "1.2s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#5b3fe0" }}
              >
                <Handshake className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Supplier connections</span>
            </div>
            <div
              className="absolute top-[50%] left-[45%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "1.8s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#1f1f1f" }}
              >
                <Search className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Sourcing partners</span>
            </div>

            {/* Row 3 pills */}
            <div
              className="absolute bottom-[12%] left-[10%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "2.4s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#3b6cf5" }}
              >
                <Store className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Wholesale contacts</span>
            </div>
            <div
              className="absolute bottom-[8%] right-[8%] ssp-float inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 text-base sm:text-xl text-neutral-900 shadow-md whitespace-nowrap"
              style={{ animationDelay: "3s" }}
            >
              <div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#c4161c" }}
              >
                <ListChecks className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span>Minimum order quantities</span>
            </div>

            {/* Mouse cursor */}
            <svg
              className="absolute top-[52%] left-[32%] w-6 h-6 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* RIGHT: Content */}
          <div>
            <h2 className="text-[36px] sm:text-[52px] font-medium tracking-tight leading-[1.1] text-neutral-900">
              Source smarter. Deliver better.
            </h2>
            <p className="mt-6 text-base lg:text-lg text-neutral-700 leading-relaxed max-w-[560px]">
              We help your business with the parts that happen behind the scenes. Get guidance on delivery and logistics setups, packaging, and finding the right suppliers and wholesalers, so you spend less time searching and more time selling.
            </p>
            <ul className="mt-5 space-y-2 text-neutral-700">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#673DE6]/10 text-[#673DE6]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>Guidance on delivery and logistics connections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#673DE6]/10 text-[#673DE6]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>Packaging information and practical advice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#673DE6]/10 text-[#673DE6]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>Introductions to suppliers and wholesalers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#673DE6]/10 text-[#673DE6]">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>Help finding suitable sourcing partners</span>
              </li>
            </ul>
            <Link
              href="/contact?interest=business-operations-and-sourcing-support"
              className="mt-8 inline-flex items-center border border-[#673DE6] text-[#673DE6] bg-transparent rounded-xl px-8 py-4 text-base font-medium hover:bg-[#673DE6]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6]/50"
            >
              Talk about sourcing
            </Link>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-[560px]">
              Supplier pricing, minimum order quantities (MOQs), availability and terms are decided by each supplier. ORYNTAL can connect you with suitable contacts, but specific prices or savings cannot be guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
