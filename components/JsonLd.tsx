import { site } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/real_logo.png`,
        description: site.description,
        sameAs: [site.social.linkedin, site.social.twitter, site.social.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          email: site.email,
          telephone: site.phone,
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Service",
        name: "Custom Business Consultation",
        provider: { "@id": `${site.url}/#organization` },
        description:
          "A 3-month engagement covering business understanding, development of custom AI models, web apps, and admin dashboards, and final deployment.",
        areaServed: "IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
