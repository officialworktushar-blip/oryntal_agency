// Example usage of CtaSection component
// Import and use in any page:

import CtaSection from "@/components/CtaSection";

export default function ExamplePage() {
  return (
    <main>
      {/* Your page content */}

      {/* CTA Section */}
      <CtaSection
        label="Built for your business:"
        pillFlag="in"
        pillCountry="India"
        pillText="Clients served worldwide"
        heading="Your idea. Our solution."
        description="From a simple business website to a complete custom solution, we design and build everything your business needs to grow online. Websites and landing pages, online stores, web and mobile apps, ready-to-launch software products, custom dashboards, admin panels and user management, all backed by clean, user-friendly design."
        buttonText="Start your project"
        buttonHref="/contact"
        showMap={true}
      />
    </main>
  );
}

// Minimal usage with defaults:
// <CtaSection />

// WhatsApp link example:
// <CtaSection buttonHref="https://wa.me/1234567890" />
