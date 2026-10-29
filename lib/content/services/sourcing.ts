import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Handshake,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";

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

export interface CompareRow {
  id: string;
  us: string;
  them: string;
}

export interface CompareCta {
  label: string;
  href: string;
}

export interface SourcingCompareContent {
  headingLine1: string;
  headingLine2: string;
  sub: string;
  usHeader: string;
  themHeader: string;
  rows: CompareRow[];
  cta: CompareCta;
  trust: string;
  footnote: string;
}

export const sourcingCompare: SourcingCompareContent = {
  headingLine1: "ORYNTAL sourcing support vs.",
  headingLine2: "going it alone",
  sub: "What's the difference between having a team beside you and working it all out yourself? We focus on getting you to the right suppliers and a smooth delivery setup, with less guesswork.",
  usHeader: "ORYNTAL",
  themHeader: "A typical go-it-alone approach",
  rows: [
    {
      id: "partners",
      us: "Sourcing partners identified for you",
      them: "Hours of searching and cold outreach",
    },
    {
      id: "suppliers",
      us: "Supplier and wholesaler connections, where suitable",
      them: "Starting from scratch with every contact",
    },
    {
      id: "packaging",
      us: "Packaging information and guidance",
      them: "Trial and error on materials and options",
    },
    {
      id: "logistics",
      us: "Delivery and logistics integration guidance",
      them: "Comparing couriers and setting up alone",
    },
    {
      id: "team",
      us: "One team across sourcing and logistics",
      them: "A different vendor for every step",
    },
    {
      id: "honest",
      us: "Clear about supplier pricing and terms",
      them: "Promises on pricing and savings can vary",
    },
  ],
  cta: {
    label: "Get started",
    href: "/contact?interest=business-operations-and-sourcing-support",
  },
  trust: "Scoped and priced in a proposal before we start",
  footnote:
    "This comparison is general and describes a typical go-it-alone approach, not any specific provider. Supplier pricing, minimum order quantities (MOQs), availability, and terms are set by the relevant supplier; specific pricing or savings cannot be guaranteed.",
};

export type TileIcon =
  | "Search"
  | "Handshake"
  | "Boxes"
  | "Package"
  | "Warehouse"
  | "Truck"
  | "MapPin";

export interface Tile {
  id: string;
  icon: TileIcon;
  label: string;
  caption: string;
  row: number;
  col: number;
}

export interface ClosingCta {
  label: string;
  href: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface SourcingClosingContent {
  heading: string;
  sub: string;
  cta: ClosingCta;
  link: Link;
  trust: string;
  note: string;
  tiles: Tile[];
  srSummary: string;
}

export const sourcingClosing: SourcingClosingContent = {
  heading: "Let's get your products from supplier to doorstep.",
  sub: "Tell us what you sell and where you're stuck. We'll help you find the right sourcing partners, understand packaging, and set up delivery, one clear step at a time.",
  cta: {
    label: "Book a consultation",
    href: "/contact?interest=business-operations-and-sourcing-support",
  },
  link: {
    label: "View all services",
    href: "/services",
  },
  trust: "Scoped and priced in a proposal before we start",
  note:
    "Supplier pricing, minimum order quantities (MOQs), availability, and terms are set by the relevant supplier. Specific pricing or savings cannot be guaranteed.",
  tiles: [
    {
      id: "partners",
      icon: "Search",
      label: "Sourcing partners",
      caption: "Partner identified",
      row: 0,
      col: 1,
    },
    {
      id: "suppliers",
      icon: "Handshake",
      label: "Supplier connections",
      caption: "Supplier connected",
      row: 0,
      col: 2,
    },
    {
      id: "wholesale",
      icon: "Boxes",
      label: "Wholesale contacts",
      caption: "Wholesale option found",
      row: 1,
      col: 2,
    },
    {
      id: "packaging",
      icon: "Package",
      label: "Packaging",
      caption: "Packaging sorted",
      row: 1,
      col: 3,
    },
    {
      id: "storage",
      icon: "Warehouse",
      label: "Storage",
      caption: "Stock location set",
      row: 1,
      col: 4,
    },
    {
      id: "delivery",
      icon: "Truck",
      label: "Delivery",
      caption: "Delivery set up",
      row: 2,
      col: 3,
    },
    {
      id: "tracking",
      icon: "MapPin",
      label: "Logistics",
      caption: "Logistics connected",
      row: 2,
      col: 4,
    },
  ],
  srSummary:
    "ORYNTAL helps with sourcing partners, supplier and wholesaler connections, packaging guidance, and delivery and logistics integrations.",
};
