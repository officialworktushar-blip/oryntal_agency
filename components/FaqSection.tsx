import Link from "next/link";
import FaqList from "@/components/FaqList";

type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  id?: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export default function FaqSection({
  id,
  title,
  subtitle,
  items,
}: FaqSectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  const jsonLd = JSON.stringify(faqSchema).replace(/</g, "\\u003c");

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-black px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8"
    >
      <style>{`
        @keyframes fs-faq-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .fs-faq-rise {
              animation: fs-faq-fade-up linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 40%;
            }
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 31, 143, 0.2) 0%, rgba(59, 31, 143, 0) 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mx-auto w-full max-w-[1170px]">
          <div className="fs-faq-rise text-center">
            <h2
              id={headingId}
              className="text-[34px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]"
            >
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[18px] leading-relaxed text-white/70">
              {subtitle}
            </p>
          </div>

          <div className="fs-faq-rise mt-14">
            <FaqList items={items} />
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 text-center">
            <p className="text-[18px] text-white/70">Still have a question?</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center justify-center rounded-xl bg-white px-7 text-[15px] font-semibold text-[#0d0d0f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Talk to our team
              </Link>
              <Link
                href="/services/custom-proposal"
                className="inline-flex h-[52px] items-center justify-center rounded-xl border border-white/30 bg-transparent px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8b7bff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Request a proposal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </section>
  );
}
