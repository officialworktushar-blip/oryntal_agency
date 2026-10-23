import type { Metadata } from "next";
import BusinessAutomationHero from "@/components/services/business-automation/Hero";

const title = "Business Automation Package | Payments, Orders & Delivery, Connected | ORYNTAL";
const description =
  "A custom website plus connected payments, order management, shipping, WhatsApp updates, and AI chatbots, so day-to-day operations run with less manual work. Fixed-scope package by ORYNTAL, ₹70,000.";
const canonical = "/services/business-packages/business-automation";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function BusinessAutomationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Automation Package",
    serviceType: "Business process automation",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "70000",
      description: "One-time package price. Third-party subscriptions and transaction fees may be separate.",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "/services/business-packages" },
      { "@type": "ListItem", position: 2, name: "Business Packages", item: "/services/business-packages" },
      { "@type": "ListItem", position: 3, name: "Business Automation Package", item: canonical },
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

      <BusinessAutomationHero />

      <div id="included" className="scroll-mt-24" />
      {/* TODO: next sections for Business Automation Package */}
    </main>
  );
}
