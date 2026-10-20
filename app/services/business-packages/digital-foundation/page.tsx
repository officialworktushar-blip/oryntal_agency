import type { Metadata } from "next";
import DigitalFoundationHero from "@/components/services/digital-foundation/Hero";
import { digitalFoundation } from "@/lib/content/packages/digitalFoundation";

const title =
  "Digital Foundation Package | Website, Lead Capture & WhatsApp Setup | ORYNTAL";
const description =
  "A professional website, lead capture, WhatsApp integration, SSL security, and registration guidance, set up properly from day one. Fixed-scope package by ORYNTAL, \u20B930,000.";
const canonical = "/services/business-packages/digital-foundation";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function DigitalFoundationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { packageName, price } = digitalFoundation;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: packageName,
    serviceType: "Website development and digital setup",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(price),
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "one-time package price",
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "/services/business-packages" },
      { "@type": "ListItem", position: 2, name: "Business Packages", item: "/services/business-packages" },
      { "@type": "ListItem", position: 3, name: "Digital Foundation Package", item: canonical },
    ],
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

      <DigitalFoundationHero />

      {/* TODO next sections: #included, #who-its-for, #process, #faq, CTA */}
      <div id="included" className="scroll-mt-24" />
    </main>
  );
}
