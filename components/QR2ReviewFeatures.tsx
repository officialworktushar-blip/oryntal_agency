import type { LucideIcon } from "lucide-react";
import {
  Link2,
  ListChecks,
  MessageSquareText,
  QrCode,
} from "lucide-react";

type FeatureCard = {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
  scene: "qr" | "chat" | "link" | "list";
};

const FEATURES: FeatureCard[] = [
  {
    id: "scan",
    title: "Scan and review",
    text: "Customers scan a QR code and land on your review page or flow in seconds.",
    icon: QrCode,
    scene: "qr",
  },
  {
    id: "feedback",
    title: "Easier feedback",
    text: "Makes it simple for customers to share their thoughts, right when they are happy to.",
    icon: MessageSquareText,
    scene: "chat",
  },
  {
    id: "profiles",
    title: "All your profiles",
    text: "Connect your Google Business, Trustpilot, Airbnb, 99acres and Etsy profiles, and more.",
    icon: Link2,
    scene: "link",
  },
  {
    id: "organised",
    title: "Organised reviews",
    text: "Helps you encourage and organise customer feedback in one simple process.",
    icon: ListChecks,
    scene: "list",
  },
];

export default function QR2ReviewFeatures() {
  return (
    <section
      aria-label="What QR2 Review can do"
      style={{ backgroundColor: "#000000" }}
      className="text-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <h2 className="text-center text-[36px] sm:text-[48px] lg:text-[56px] font-medium tracking-tight leading-[1.1] max-w-[820px] mx-auto">
          What QR2 Review can do for you
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            const sceneGradient =
              feature.scene === "qr"
                ? "linear-gradient(135deg, #2a2a33, #0f0f13)"
                : feature.scene === "chat"
                ? "linear-gradient(135deg, #25222e, #0f0f13)"
                : feature.scene === "link"
                ? "linear-gradient(135deg, #1f2a33, #0c0f12)"
                : "linear-gradient(135deg, #2b2830, #101013)";

            const sceneSvg =
              feature.scene === "qr" ? (
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="qrPattern"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" fill="#888" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#qrPattern)" />
                  <rect x="10" y="10" width="40" height="40" rx="4" fill="#888" />
                  <rect x="150" y="10" width="40" height="40" rx="4" fill="#888" />
                  <rect x="10" y="150" width="40" height="40" rx="4" fill="#888" />
                </svg>
              ) : feature.scene === "chat" ? (
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                >
                  <ellipse cx="60" cy="70" rx="40" ry="30" fill="#888" />
                  <ellipse cx="100" cy="50" rx="35" ry="25" fill="#888" />
                  <ellipse cx="140" cy="80" rx="38" ry="28" fill="#888" />
                  <circle cx="40" cy="120" r="3" fill="#888" />
                  <circle cx="70" cy="130" r="2" fill="#888" />
                  <circle cx="160" cy="40" r="2.5" fill="#888" />
                  <circle cx="180" cy="60" r="2" fill="#888" />
                </svg>
              ) : feature.scene === "link" ? (
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="60" r="20" fill="#888" />
                  <circle cx="140" cy="60" r="20" fill="#888" />
                  <circle cx="100" cy="140" r="20" fill="#888" />
                  <line x1="80" y1="60" x2="120" y2="60" stroke="#888" strokeWidth="2" />
                  <line x1="80" y1="60" x2="100" y2="140" stroke="#888" strokeWidth="2" />
                  <line x1="120" y1="60" x2="100" y2="140" stroke="#888" strokeWidth="2" />
                </svg>
              ) : (
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                >
                  <rect x="30" y="40" width="100" height="12" rx="3" fill="#888" />
                  <rect x="30" y="70" width="100" height="12" rx="3" fill="#888" />
                  <rect x="30" y="100" width="100" height="12" rx="3" fill="#888" />
                  <rect x="30" y="130" width="100" height="12" rx="3" fill="#888" />
                  <circle cx="15" cy="46" r="4" fill="#888" />
                  <circle cx="15" cy="76" r="4" fill="#888" />
                  <circle cx="15" cy="106" r="4" fill="#888" />
                  <circle cx="15" cy="136" r="4" fill="#888" />
                </svg>
              );

            return (
              <div
                key={feature.id}
                className="group rounded-3xl overflow-hidden border border-white/5 flex flex-col transition hover:-translate-y-1 hover:border-white/15 motion-reduce:transition-none motion-reduce:transform-none"
                style={{ backgroundColor: "#19191b" }}
              >
                {/* Scene area */}
                <div
                  className="relative h-[300px] sm:h-[340px] lg:h-[330px] overflow-hidden flex items-center justify-center"
                  style={{ background: sceneGradient }}
                >
                  {sceneSvg}
                  {/* Bottom overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #19191b, transparent)" }}
                  />

                  {/* Purple icon tile */}
                  <div
                    className="relative z-10 w-[150px] sm:w-[170px] h-[150px] sm:h-[170px] rounded-[32px] flex items-center justify-center border border-[#a99bff]/50 shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg, #7b61ff 0%, #5b3fe0 100%)",
                      boxShadow: "0 20px 50px rgba(91,63,224,0.45)",
                    }}
                  >
                    <Icon
                      className="h-[72px] w-[72px] text-white"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="p-7 lg:p-8 flex-1">
                  <h3 className="text-2xl font-normal text-white">{feature.title}</h3>
                  <p className="mt-3 text-lg text-white/70 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base sm:text-lg text-white/80">
            Just ₹399/month. Works with all your review profiles.
          </p>
          <p className="mt-3 text-xs sm:text-sm text-white/50 max-w-[620px] mx-auto leading-relaxed">
            QR2 Review may be included as a complimentary benefit for eligible ORYNTAL clients, subject to the applicable package and terms.
          </p>
        </div>
      </div>
    </section>
  );
}
