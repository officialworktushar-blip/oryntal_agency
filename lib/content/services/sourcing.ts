import type { LucideIcon } from "lucide-react";
import { Search, Handshake, Package, Truck } from "lucide-react";

export type Pillar = {
  id: string;
  icon: LucideIcon;
  title: string;
  caption: string;
};

export interface SourcingContent {
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  sub: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  pillars: Pillar[];
  networkNote: string;
  disclaimer: string;
  trust: string;
  pricingNote: string;
  services: string[];
}

export const sourcing: SourcingContent = {
  eyebrow: "Business Operations & Sourcing Support",
  h1Line1: "From supplier to doorstep,",
  h1Line2: "sorted.",
  sub: "We help you find the right suppliers and wholesalers, understand packaging, and set up delivery and logistics, so your products reach customers without the guesswork.",
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=business-operations-and-sourcing-support",
  },
  secondaryCta: {
    label: "See how we help",
    href: "#what-we-help",
  },
  pillars: [
    {
      id: "partners",
      icon: Search,
      title: "Sourcing partners",
      caption: "Help identifying the right partners",
    },
    {
      id: "suppliers",
      icon: Handshake,
      title: "Supplier connections",
      caption: "Suppliers and wholesalers, where suitable",
    },
    {
      id: "packaging",
      icon: Package,
      title: "Packaging guidance",
      caption: "Information and guidance",
    },
    {
      id: "logistics",
      icon: Truck,
      title: "Delivery and logistics",
      caption: "Integration guidance",
    },
  ],
  networkNote: "Through ORYNTAL's available network, where suitable.",
  disclaimer:
    "Supplier pricing, minimum order quantities (MOQs), availability, and terms are determined by the relevant supplier. ORYNTAL can help connect you with suitable contacts, but specific pricing or savings cannot be guaranteed.",
  trust: "Scoped and priced in a proposal before we start",
  pricingNote: "No fixed price: every project is quoted on your scope.",
  services: [
    "Guidance on delivery and logistics integrations",
    "Packaging-related information and guidance",
    "Supplier and wholesaler connections",
    "Assistance in identifying relevant sourcing partners",
  ],
};
