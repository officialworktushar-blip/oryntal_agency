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
};

export const domainCards: DomainCard[] = [
  {
    id: "business-packages",
    title: "Business Packages",
    href: "/services",
    description:
      "Fixed-scope packages from ₹30,000, built for every stage of your business.",
    icon: Package,
    image: "/domain1.webp",
  },
  {
    id: "individual-services",
    title: "Individual Technology Services",
    href: "/services",
    description:
      "Pick only what you need: web and apps, AI, integrations, sourcing support.",
    icon: Layers,
    image: "/domain2.webp",
  },
  {
    id: "products",
    title: "Pre-Built Products & AI Models",
    href: "/services",
    description:
      "Ready-to-use products like QR2 Review, built for real business workflows.",
    icon: Boxes,
    image: "/domain3.webp",
  },
  {
    id: "consultation",
    title: "Custom Consultation & Development",
    href: "/services",
    description:
      "A three-month engagement designed around your operations.",
    icon: Compass,
    image: "/domain4.webp",
  },
];
