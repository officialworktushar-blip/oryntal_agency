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
  /** Parallax depth — higher moves further with scroll. */
  depth: number;
  /** One rock carries a pale icy facet. */
  icy?: boolean;
  /** Hidden on small screens (< md). */
  desktopOnly?: boolean;
  /** Optional image instead of the procedural shape. */
  src?: string;
};

export type IncludedContent = {
  eyebrow: string;
  title: string;
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
    title: "Everything in the Digital Foundation Package",
    intro:
      "Seven pieces that work together as one foundation — a credible website, a way to capture leads, the connections customers expect, and the groundwork that keeps it all running.",
    items: [
      {
        id: "website",
        label: "Website",
        title: "A professional website, built around your business",
        description:
          "Clean, responsive pages that explain what you do and look credible on any screen, ready for the traffic you send them.",
        bullet: "A professional website designed around your business.",
        icon: Globe,
      },
      {
        id: "leads",
        label: "Leads",
        title: "Lead capture that turns visitors into enquiries",
        description:
          "Forms placed where people are ready to act, collecting the details you need to follow up and a clear next step.",
        bullet: "Lead capture forms that turn visitors into enquiries.",
        icon: UserPlus,
      },
      {
        id: "connect",
        label: "Connect",
        title: "WhatsApp and business links, built in",
        description:
          "One-tap messaging, click-to-call and links to your Google, Instagram and Facebook presence, all in one place.",
        bullet: "WhatsApp and essential business links built in.",
        icon: MessageCircle,
      },
      {
        id: "automate",
        label: "Automate",
        title: "Basic automation for repetitive tasks",
        description:
          "Practical automations for the follow-ups and hand-offs that used to eat up your time, where feasible.",
        bullet: "Basic automation for repetitive tasks, where feasible.",
        icon: Workflow,
      },
      {
        id: "secure",
        label: "Secure",
        title: "SSL, HTTPS and everyday security",
        description:
          "Certificates, secure connections and sensible defaults configured from day one, so visitors browse with confidence.",
        bullet: "SSL/HTTPS and essential security set up from day one.",
        icon: ShieldCheck,
      },
      {
        id: "register",
        label: "Register",
        title: "MSME and Udyam registration guidance",
        description:
          "Step-by-step guidance for the registrations your business may need, and what to prepare before you apply.",
        bullet: "MSME/Udyam registration guidance, where applicable.",
        icon: FileCheck2,
      },
      {
        id: "setup",
        label: "Setup",
        title: "Digital setup guidance, so you start right",
        description:
          "A walkthrough of the tools, logins and habits that keep your business online and up to date without guesswork.",
        bullet: "Digital setup guidance to get your business online right.",
        icon: Compass,
      },
    ],
    footer: {
      ideal:
        "Every business deserves a solid digital foundation. We build one that looks credible, works hard, and is ready to grow with you.",
      cta: { label: "Get started", href: "/contact?interest=digital-foundation-package" },
      secondary: { label: "View all packages", href: "/services/business-packages" },
      feeNote: "Third-party services, if any, may carry separate provider fees.",
    },
    rocks: [
      { id: "rock-1", x: -2, y: 2, w: 14, depth: 0.5 },
      { id: "rock-2", x: 4, y: 22, w: 8, depth: 0.8, desktopOnly: true },
      { id: "rock-3", x: 14, y: 56, w: 13, depth: 1.2, icy: true },
      { id: "rock-4", x: 72, y: 58, w: 10, depth: 0.9, desktopOnly: true },
    ],
  },
};
