import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardList,
  Compass,
  FileCheck2,
  Globe,
  Link2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserPlus,
  Workflow,
} from "lucide-react";
import {
  SiFacebook,
  SiGmail,
  SiGoogle,
  SiGoogleanalytics,
  SiGooglemaps,
  SiGooglesheets,
  SiInstagram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { FaBuilding, FaLinkedin } from "react-icons/fa";
import type { ComponentType, CSSProperties } from "react";

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
  connections: ConnectionsContent;
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

/** Groups used by the "What we connect" filter chips. */
export type ConnectionCategory = "Messaging" | "Social" | "Google" | "Contact";

/** Filter chips, including the "All" reset. */
export const connectionCategories = [
  "All",
  "Messaging",
  "Social",
  "Google",
  "Contact",
] as const;

export type ConnectionFilter = (typeof connectionCategories)[number];

/** Brand logos and lucide glyphs both render with className + style. */
export type ConnectionIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

/** One tool ORYNTAL can connect to a business. */
export type ConnectionItem = {
  id: string;
  name: string;
  /** One-line summary under the name. */
  sub: string;
  category: ConnectionCategory;
  icon: ConnectionIcon;
  /** Brand colour of the icon. */
  color: string;
};

export type ConnectionsContent = {
  eyebrow: string;
  /** Heading, split over two centred lines. */
  titleLines: [string, string];
  intro: string;
  panelLabel: string;
  note: string;
  upsell: { text: string; linkLabel: string; href: string };
  items: ConnectionItem[];
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
  connections: {
    eyebrow: "Connections",
    titleLines: ["Be where your customers", "already are."],
    intro:
      "WhatsApp, social profiles, maps, and basic third-party tools, connected during setup so people can find and reach your business easily.",
    panelLabel: "Connected during setup",
    note: "Connections are chosen to fit your business. Specific integrations depend on your requirements, compatibility, and account access. Third-party fees, if any, are separate. Logos belong to their respective owners and do not imply endorsement.",
    upsell: {
      text: "Need payments, shipping, or CRM connections?",
      linkLabel: "See the Business Automation Package",
      href: "/services/business-packages",
    },
    // CONFIRM: keep only connections ORYNTAL actually sets up in this package. "Relevant basic third-party integrations" are chosen per business.
    items: [
      {
        id: "whatsapp",
        name: "WhatsApp",
        sub: "Chat button",
        category: "Messaging",
        icon: SiWhatsapp,
        color: "#25D366",
      },
      {
        id: "instagram",
        name: "Instagram",
        sub: "Profile link",
        category: "Social",
        icon: SiInstagram,
        color: "#E4405F",
      },
      {
        id: "facebook",
        name: "Facebook",
        sub: "Page link",
        category: "Social",
        icon: SiFacebook,
        color: "#1877F2",
      },
      {
        id: "youtube",
        name: "YouTube",
        sub: "Channel link",
        category: "Social",
        icon: SiYoutube,
        color: "#FF0000",
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        sub: "Company link",
        category: "Social",
        icon: FaLinkedin,
        color: "#0A66C2",
      },
      {
        id: "x",
        name: "X (Twitter)",
        sub: "Profile link",
        category: "Social",
        icon: SiX,
        color: "#000000",
      },
      {
        id: "google-maps",
        name: "Google Maps",
        sub: "Location and directions",
        category: "Google",
        icon: SiGooglemaps,
        color: "#34A853",
      },
      {
        id: "google-business",
        name: "Google Business Profile",
        sub: "Business listing link",
        category: "Google",
        icon: FaBuilding,
        color: "#4285F4",
      },
      {
        id: "google-analytics",
        name: "Google Analytics",
        sub: "Basic visitor tracking",
        category: "Google",
        icon: SiGoogleanalytics,
        color: "#E37400",
      },
      {
        id: "gmail",
        name: "Gmail",
        sub: "Enquiry email alerts",
        category: "Messaging",
        icon: SiGmail,
        color: "#EA4335",
      },
      {
        id: "google-sheets",
        name: "Google Sheets",
        sub: "Lead collection sheet",
        category: "Google",
        icon: SiGooglesheets,
        color: "#34A853",
      },
      {
        id: "booking",
        name: "Booking link",
        sub: "Calendar or booking page",
        category: "Contact",
        icon: CalendarCheck,
        color: "#673DE6",
      },
      {
        id: "click-to-call",
        name: "Click-to-call",
        sub: "Tap to call",
        category: "Contact",
        icon: Phone,
        color: "#673DE6",
      },
      {
        id: "email",
        name: "Email",
        sub: "Direct contact",
        category: "Contact",
        icon: Mail,
        color: "#673DE6",
      },
      {
        id: "contact-form",
        name: "Contact form",
        sub: "Lead capture",
        category: "Contact",
        icon: ClipboardList,
        color: "#673DE6",
      },
      {
        id: "business-links",
        name: "Business links",
        sub: "Essential links in one place",
        category: "Contact",
        icon: Link2,
        color: "#673DE6",
      },
    ],
  },
};
