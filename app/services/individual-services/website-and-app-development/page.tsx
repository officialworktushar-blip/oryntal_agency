import type { Metadata } from "next";
import WebAppHero from "@/components/services/website-app/Hero";
import { websiteApp } from "@/lib/content/services/websiteApp";

const title =
  "Website & Application Development | Websites, Apps, SaaS & Portals | ORYNTAL";
const description =
  "Business websites, e-commerce stores, web apps, Android and iOS apps, SaaS products, portals, admin panels, and UI/UX design, built around your business and quoted on your scope.";
const canonical = "/services/individual-services/website-and-app-development";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function WebsiteAndAppDevelopmentPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website and Application Development",
    serviceType: "Web and mobile application development",
    provider: {
      "@type": "Organization",
      name: "ORYNTAL",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website and Application Development services",
      itemListElement: websiteApp.services.map((name) => ({
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
        name: "Website & Application Development",
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

      <WebAppHero />

      <div id="what-we-build" className="scroll-mt-24" />

      {/* TODO: next sections. The next section's expected top colour should be #000 / #06030F to blend with the hero's bottom edge. */}
    </main>
  );
}
