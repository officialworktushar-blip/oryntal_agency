import type { Metadata } from "next";
import AiHero from "@/components/services/ai-dev/Hero";
import Tools from "@/components/services/ai-dev/Tools";
import Assistants from "@/components/services/ai-dev/Assistants";
import { aiDev } from "@/lib/content/services/aiDev";
import { aiTools } from "@/lib/content/services/aiTools";

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

  const toolList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tools AI can connect with",
    itemListElement: aiTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
    })),
  };

  const assistantList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI assistants",
    itemListElement: aiDev.assistants.items.map((assistant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: assistant.name,
      description: assistant.outcome,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assistantList) }}
      />

      <AiHero />

      <Tools />

      <Assistants />

      <div id="what-we-build" className="scroll-mt-24" />

      {/* TODO: Add next sections */}
    </main>
  );
}
