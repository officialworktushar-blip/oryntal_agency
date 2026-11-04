import type { Metadata } from "next";
import EngagementHero from "@/components/services/engagement/Hero";
import PlanBanner from "@/components/services/engagement/PlanBanner";
import MonthsSelector from "@/components/services/engagement/MonthsSelector";
import EvaluateBars from "@/components/services/engagement/EvaluateBars";

export const metadata: Metadata = {
  title: "Three-Month Engagement | Custom Business Consultation & Development | ORYNTAL",
  description: "A clear three-month plan: we understand your business, build and integrate the right systems, then test and refine them with you. Custom proposal based on your scope.",
  alternates: {
    canonical: "/services/consultation/three-month-engagement",
  },
  openGraph: {
    title: "Three-Month Engagement | Custom Business Consultation & Development | ORYNTAL",
    description: "A clear three-month plan: we understand your business, build and integrate the right systems, then test and refine them with you. Custom proposal based on your scope.",
    url: "/services/consultation/three-month-engagement",
  },
  twitter: {
    card: "summary_large_image",
    title: "Three-Month Engagement | Custom Business Consultation & Development | ORYNTAL",
    description: "A clear three-month plan: we understand your business, build and integrate the right systems, then test and refine them with you. Custom proposal based on your scope.",
  },
};

export default function ThreeMonthEngagementPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Three-Month Engagement",
        serviceType: "Business consultation and custom development",
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
            item: "https://oryntal.com/services",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Custom Consultation & Development",
            item: "https://oryntal.com/services/consultation",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Three-Month Engagement",
            item: "https://oryntal.com/services/consultation/three-month-engagement",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <EngagementHero />
        <PlanBanner />
        <MonthsSelector />
        <EvaluateBars />
        {/* TODO next: FAQ, closing CTA. Next section's top should be #2B1A7A or fade from it */}
      </main>
    </>
  );
}
