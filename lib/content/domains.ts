import type { LucideIcon } from "lucide-react";
import { Boxes, Compass, Layers, Package } from "lucide-react";

export type DomainCard = {
  id: string;
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  /** Real image for the card frame; placeholder shows when missing. */
  image?: string;
  preview: string[];
};

export const domainCards: DomainCard[] = [
  {
    id: "business-packages",
    title: "Business Packages",
    href: "/services/business-packages",
    description:
      "Fixed-scope packages from ₹30,000, built for every stage of your business.",
    icon: Package,
    image: "/domain1.webp",
    preview: [
      "Digital Foundation, ₹30,000",
      "Business Automation, ₹70,000",
      "Premium Custom System, ₹3,00,000-₹4,00,000",
    ],
  },
  {
    id: "individual-services",
    title: "Individual Technology Services",
    href: "/services/individual-services",
    description:
      "Pick only what you need: web and apps, AI, integrations, sourcing support.",
    icon: Layers,
    image: "/domain2.webp",
    preview: [
      "Websites & Apps",
      "AI & Automation",
      "APIs & Integrations",
      "Sourcing Support",
    ],
  },
  {
    id: "products",
    title: "Pre-Built Products & AI Models",
    href: "/services/individual-services/qr2-review",
    description:
      "Ready-to-use products like QR2 Review, built for real business workflows.",
    icon: Boxes,
    image: "/domain3.webp",
    preview: [
      "QR2 Review: Complimentary for eligible clients",
    ],
  },
];
