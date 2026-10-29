import type { Metadata } from "next";
import SourcingHero from "@/components/services/sourcing/Hero";
import SourcingSupportSection from "@/components/SourcingSupportSection";
import SourcingPromptGrid from "@/components/SourcingPromptGrid";
import SourcingSessionDemo from "@/components/SourcingSessionDemo";
import SourcingFinalCta from "@/components/SourcingFinalCta";
import SourcingCompare from "@/components/services/sourcing/Compare";
import ClosingCta from "@/components/services/sourcing/ClosingCta";

export const metadata: Metadata = {
  title: "Business Operations & Sourcing Support | Suppliers, Packaging & Logistics | ORYNTAL",
  description:
    "We help you find suppliers and wholesalers, understand packaging, identify sourcing partners, and set up delivery and logistics integrations, quoted on your scope.",
  alternates: {
    canonical: "/services/individual-services/business-operations-and-sourcing-support",
  },
  openGraph: {
    title: "Business Operations & Sourcing Support | Suppliers, Packaging & Logistics | ORYNTAL",
    description:
      "We help you find suppliers and wholesalers, understand packaging, identify sourcing partners, and set up delivery and logistics integrations, quoted on your scope.",
  },
  twitter: {
    title: "Business Operations & Sourcing Support | Suppliers, Packaging & Logistics | ORYNTAL",
    description:
      "We help you find suppliers and wholesalers, understand packaging, identify sourcing partners, and set up delivery and logistics integrations, quoted on your scope.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Business Operations and Sourcing Support",
      serviceType: "Business operations and sourcing support",
      provider: {
        "@type": "Organization",
        name: "ORYNTAL",
      },
      areaServed: "Worldwide",
    },
    {
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
          name: "Business Operations & Sourcing Support",
          item: "/services/individual-services/business-operations-and-sourcing-support",
        },
      ],
    },
  ],
};

export default function SourcingPage() {
  return (
    <main>
      <SourcingHero />
      <SourcingSupportSection />
      <SourcingPromptGrid />
      <SourcingSessionDemo />
      <SourcingFinalCta />
      <div id="what-we-help" className="scroll-mt-24" />
      <SourcingCompare />
      <ClosingCta />
      {/* TODO: when "what we help with", process and FAQ exist, move <ClosingCta /> to the end of the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
