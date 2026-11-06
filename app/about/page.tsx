import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutWhyOryntal from "@/components/about/AboutWhyOryntal";
import AboutBuildup from "@/components/about/AboutBuildup";
import AboutGlobe from "@/components/about/AboutGlobe";
import FaqSection from "@/components/FaqSection";
import { ABOUT_FAQS } from "@/components/about/aboutFaqs";

const title = "About | ORYNTAL";
const description =
  "ORYNTAL is a small, hands-on team that builds websites, apps, automation and chat tools around what your business actually needs.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutPage() {
  return (
    <main className="bg-[#0d0f0e] text-white">
      <AboutHero />
      <AboutWhyOryntal />
      <AboutBuildup />
      <AboutGlobe />
      <FaqSection
        id="faq"
        title="ORYNTAL FAQs"
        subtitle="Get answers to the most common questions about working with ORYNTAL."
        items={ABOUT_FAQS}
      />
    </main>
  );
}
