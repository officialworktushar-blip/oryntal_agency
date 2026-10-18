import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import { QrCode, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ORYNTAL products: QR2 Review, Client Database and Call-Handling System, and Industry-Specific Recommendation System.",
};

const products = [
  {
    title: "QR2 Review",
    tagline: "Turn every customer into a verified review in seconds.",
    description:
      "QR2 Review helps businesses capture authentic feedback at the point of interaction and route happy customers to the platforms that matter most.",
    icon: QrCode,
    features: [
      "Scan-to-review in under 30 seconds",
      "Smart routing to Google, social, and review platforms",
      "Verified feedback tags",
      "Real-time dashboard & analytics",
      "Branded QR codes for tables, receipts & packaging",
    ],
    assetTitle: "QR2Review live interface",
    assetDesc:
      "Clean mockup of the QR2Review scan page, review submission flow, and admin dashboard.",
  },
  {
    title: "Client Database and Call-Handling System",
    tagline: "A single place to manage leads, clients, and every conversation.",
    description:
      "Keep your entire pipeline organised with a central client database, smart call logging, follow-ups, and team visibility — all in one secure system.",
    icon: Users,
    features: [
      "Centralised lead & client database",
      "Call tracking, notes & disposition codes",
      "Automated follow-up reminders",
      "Team assignments & activity logs",
      "Filters, tags & pipeline views",
      "Integrates with WhatsApp, CRM & telephony tools",
    ],
    assetTitle: "Client database & call-handling dashboard",
    assetDesc:
      "Mockup of the client list, call history panel, lead pipeline, and follow-up calendar.",
  },
  {
    title: "Industry-Specific Recommendation System",
    tagline: "Personalised recommendations powered by your data and goals.",
    description:
      "Deliver the right product, service, or partner at the right time. Our recommendation engine adapts to your industry, data sources, and business rules.",
    icon: Sparkles,
    features: [
      "Industry-specific rule sets & scoring",
      "Data ingestion from your systems",
      "Real-time or batch recommendations",
      "Explainable results with filters",
      "API-first for easy embedding",
      "Dashboards to track conversions & performance",
    ],
    assetTitle: "Recommendation engine dashboard",
    assetDesc:
      "Clean interface showing recommendation cards, filters, performance metrics, and user insights.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Purpose-built tools to scale your business"
        description="Own, operate, or integrate these products into your workflow — each is built from real deployments and refined for usability."
      >
        <Link href="/contact" className="btn-primary">
          Book Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section className="container-x py-16 lg:py-20">
        <div className="space-y-12">
          {products.map((product, i) => (
            <Reveal key={product.title} delay={i * 0.05}>
              <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <product.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 text-xl font-bold text-ink">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {product.tagline}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
                    {product.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-primary">
                      Get Access / Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/services" className="btn-secondary">
                      See How It Connects
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <AssetPlaceholder
                    title={product.assetTitle}
                    description={product.assetDesc}
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
