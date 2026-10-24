import type { Metadata } from "next";
import PremiumHero from "@/components/services/premium-custom/Hero";
import System from "@/components/services/premium-custom/System";
import { premiumCustom } from "@/lib/content/packages/premiumCustom";

const title = "Premium Custom Business System | Custom Web, App & AI Platform | ORYNTAL";
const description =
  "A comprehensive, custom-built business platform: tailored UX/UI, a complete prototype, custom web or mobile app, admin and user panels, advanced AI and automation, payments, and integrations. Indicative investment ₹3,00,000–₹4,00,000, agreed in a proposal.";
const canonical = "/services/business-packages/premium-custom-system";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function PremiumCustomSystemPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Premium Custom Business System",
    serviceType: "Custom software and business systems development",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        minPrice: 300000,
        maxPrice: 400000,
        description:
          "Indicative investment. Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
      },
      description:
        "Indicative investment. Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "/services/business-packages" },
      { "@type": "ListItem", position: 2, name: "Business Packages", item: "/services/business-packages" },
      { "@type": "ListItem", position: 3, name: "Premium Custom Business System", item: canonical },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Premium Custom Business System — what's included",
    numberOfItems: premiumCustom.allIncluded.length,
    itemListElement: premiumCustom.allIncluded.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <PremiumHero />
      <System />
      <div id="included" className="scroll-mt-24" />
      {/* TODO: next sections for Premium Custom Business System */}
    </main>
  );
}
