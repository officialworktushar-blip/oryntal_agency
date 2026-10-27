import type { Metadata } from "next";
import AiHero from "@/components/services/ai-dev/Hero";
import { aiDev } from "@/lib/content/services/aiDev";

const title =
  "AI Development & Automation | Chatbots, Voice AI, RAG & Custom AI Agents | ORYNTAL";
const description =
  "Custom AI agents, chatbots, voice agents, RAG systems, custom LLM solutions, model fine-tuning, computer vision, and AI-powered workflows, built around your business and quoted on your scope.";
const canonical = "/services/individual-services/ai-development-and-automation";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function AiDevelopmentAndAutomationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Development and Automation",
    serviceType: "AI development and business automation",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Development and Automation services",
      itemListElement: aiDev.services.map((name) => ({
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
        name: "AI Development & Automation",
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

      <AiHero />

      <div id="what-we-build" className="scroll-mt-24" />

      {/* TODO: Add next sections */}
    </main>
  );
}
