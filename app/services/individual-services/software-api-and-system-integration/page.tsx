import type { Metadata } from "next";
import IntegrationHero from "@/components/services/integration/Hero";
import Tools from "@/components/services/integration/Tools";
import Setups from "@/components/services/integration/Setups";
import { integration } from "@/lib/content/services/integration";

const title = "Software, API & System Integration | Payments, WhatsApp, CRM & Data | ORYNTAL";
const description =
  "We connect your payments, WhatsApp, CRM, databases, analytics, and the platforms you already use into one system, with custom APIs and workflow automation, quoted on your scope.";
const canonical = "/services/individual-services/software-api-and-system-integration";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function SoftwareApiAndSystemIntegrationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Software, API and System Integration",
    serviceType: "Software and system integration",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software, API and System Integration services",
      itemListElement: integration.services.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Services",
        item: "/services",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Individual Services",
        item: "/services/individual-services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Software, API & System Integration",
        item: canonical,
      },
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

      <IntegrationHero />

      <Tools />

      <Setups />

      {/* TODO: Add next sections (tools rails, typical setups rail, what we build bars) */}
    </main>
  );
}
