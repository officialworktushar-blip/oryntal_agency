import type { LucideIcon } from "lucide-react";
import {
  Compass,
  FileCheck2,
  Globe,
  Link2,
  MessageCircle,
  ShieldCheck,
  UserPlus,
  Workflow,
} from "lucide-react";
import { SiFacebook, SiGoogle, SiInstagram, SiWhatsapp } from "react-icons/si";

export type OrbitTile = {
  id: string;
  label: string;
  icon: LucideIcon | typeof SiWhatsapp;
  color: string;
  /** Tile centre, % of the stage. */
  x: number;
  y: number;
  /** Individual tilt in degrees, on top of the stage tilt. */
  tilt: number;
  /** Hidden on small screens (< md). */
  desktopOnly?: boolean;
};

export type DigitalFoundationContent = {
  slug: string;
  packageName: string;
  heroLine: string;
  price: number;
  priceLabel: string;
  priceNote: string;
  checklist: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
  feeNote: string;
  orbit: {
    centreSrc?: string;
    tiles: OrbitTile[];
  };
  included: IncludedContent;
};

/** One deliverable shown in the "What's included" stage. */
export type IncludedItem = {
  id: string;
  /** Short label used in the tab list. */
  label: string;
  /** Panel heading. */
  title: string;
  /** Panel body copy. */
  description: string;
  /** One-line summary for the screen-reader list. */
  bullet: string;
  icon: LucideIcon;
};

/** A faceted rock placed in the stage background. */
export type RockSpec = {
  id: string;
  /** Left edge, % of the design box width. */
  x: number;
  /** Top edge, % of the design box height. */
  y: number;
  /** Width, % of the design box width. */
  w: number;
  /** Stacking order inside the stage. */
  z?: number;
  /** Static rotation in degrees. */
  tilt?: number;
  /** One rock carries a pale icy facet. */
  icy?: boolean;
  /** Shown from the large breakpoint up only. */
  lgOnly?: boolean;
  /** Optional image instead of the procedural shape. */
  src?: string;
};

export type IncludedContent = {
  eyebrow: string;
  /** Heading, split over two centred lines. */
  titleLines: [string, string];
  intro: string;
  items: IncludedItem[];
  footer: {
    ideal: string;
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
    feeNote: string;
  };
  rocks: RockSpec[];
};

/** Closing block of the "What's included" section. */
export const includedFooter = {
  ideal:
    "Ideal for startups, local businesses, service providers, and small businesses looking to establish their online presence.",
  cta: { label: "Get started", href: "/contact?interest=digital-foundation-package" },
  secondary: { label: "View all packages", href: "/services/business-packages" },
};

export const digitalFoundation: DigitalFoundationContent = {
  slug: "digital-foundation",
  packageName: "Digital Foundation Package",
  heroLine: "Everything you need to get online, live and connected.",
  price: 30000,
  priceLabel: "₹30,000",
  priceNote: "one-time",
  checklist: [
    "A professional website designed around your business",
    "Lead capture forms that turn visitors into enquiries",
    "WhatsApp and essential business links built in",
    "Basic automation for repetitive tasks, where feasible",
    "SSL/HTTPS and essential security set up from day one",
    "MSME/Udyam registration guidance, where applicable",
    "Digital setup guidance to get your business online right",
  ],
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=digital-foundation-package",
  },
  secondaryCta: { label: "See what's included", href: "#included" },
  trustLine: "Clear scope and pricing before we start",
  feeNote: "Third-party services, if any, may carry separate provider fees.",
  orbit: {
    tiles: [
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: SiWhatsapp,
        color: "#25D366",
        x: 19,
        y: 52,
        tilt: -5,
      },
      {
        id: "google",
        label: "Google",
        icon: SiGoogle,
        color: "#4285F4",
        x: 27,
        y: 22,
        tilt: 6,
      },
      {
        id: "leads",
        label: "Lead capture",
        icon: UserPlus,
        color: "#B9A8FF",
        x: 50,
        y: 12,
        tilt: -4,
      },
      {
        id: "security",
        label: "SSL security",
        icon: ShieldCheck,
        color: "#2EC27E",
        x: 82,
        y: 17,
        tilt: 5,
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: SiInstagram,
        color: "#E4405F",
        x: 75,
        y: 38,
        tilt: -6,
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: SiFacebook,
        color: "#1877F2",
        x: 88,
        y: 66,
        tilt: 4,
      },
      {
        id: "register",
        label: "MSME/Udyam guidance",
        icon: FileCheck2,
        color: "#FCB400",
        x: 13,
        y: 82,
        tilt: 6,
        desktopOnly: true,
      },
      {
        id: "links",
        label: "Business links",
        icon: Link2,
        color: "#B9A8FF",
        x: 64,
        y: 90,
        tilt: -5,
        desktopOnly: true,
      },
    ],
  },
  included: {
    eyebrow: "What's included",
    titleLines: ["Everything you need to go online,", "set up right from day one."],
    intro:
      "Designed for businesses that want to establish a professional online presence and build the essential digital systems needed to operate online.",
    items: [
      {
        id: "website",
        label: "Website",
        title: "A professional website",
        description: "Designed around your services, products, and requirements.",
        bullet: "A professional website designed around your business",
        icon: Globe,
      },
      {
        id: "leads",
        label: "Lead capture",
        title: "Lead capture, built in",
        description: "Inquiry forms and basic lead collection, ready from day one.",
        bullet: "Lead capture forms that turn visitors into enquiries",
        icon: UserPlus,
      },
      {
        id: "connect",
        label: "Integrations",
        title: "WhatsApp and business links",
        description:
          "WhatsApp, essential business links, and relevant basic third-party integrations.",
        bullet: "WhatsApp and essential business links built in",
        icon: MessageCircle,
      },
      {
        id: "automate",
        label: "Automation",
        title: "Less repetitive work",
        description: "Selected repetitive tasks automated, where feasible.",
        bullet: "Basic automation for repetitive tasks, where feasible",
        icon: Workflow,
      },
      {
        id: "secure",
        label: "Security",
        title: "Secure from day one",
        description: "SSL/HTTPS configuration and essential security setup.",
        bullet: "SSL/HTTPS and essential security set up from day one",
        icon: ShieldCheck,
      },
      {
        id: "register",
        label: "Registrations",
        title: "Registration guidance",
        description:
          "Guidance on MSME/Udyam registration and relevant documentation, where applicable.",
        bullet: "MSME/Udyam registration guidance, where applicable",
        icon: FileCheck2,
      },
      {
        id: "setup",
        label: "Setup guidance",
        title: "Set up right",
        description:
          "Assistance in establishing the essential digital infrastructure your business needs.",
        bullet: "Digital setup guidance to get your business online right",
        icon: Compass,
      },
    ],
    footer: {
      ...includedFooter,
      feeNote: "Third-party services, if any, may carry separate provider fees.",
    },
    rocks: [
      { id: "rock-1", x: -1, y: 4, w: 13, z: 0, tilt: -6 },
      { id: "rock-2", x: 7, y: 6, w: 8, z: 0, tilt: 8, lgOnly: true },
      { id: "rock-3", x: 3, y: 60, w: 12, z: 15, tilt: -4, icy: true },
      { id: "rock-4", x: 74, y: 62, w: 9, z: 10, tilt: 5, lgOnly: true },
    ],
  },
};
