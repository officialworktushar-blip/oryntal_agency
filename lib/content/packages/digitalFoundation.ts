import type { LucideIcon } from "lucide-react";
import {
  FileCheck2,
  Globe,
  Home,
  MessageCircle,
  Plug,
  Settings,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

export type SetupStatusIcon =
  | "globe"
  | "userPlus"
  | "messageCircle";

export type SetupStatus = {
  label: string;
  value: string;
  icon: SetupStatusIcon;
  status: string;
  /** Decorative mini-chart shape (normalised 0..1 points). */
  chart: number[];
};

export type EnquiryRow = {
  source: string;
  type: string;
  status: string;
};

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type SocialTileKind =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "google"
  | "links";

export type SocialTile = {
  kind: SocialTileKind;
  /** Column centre, % of the 1000-wide composition. */
  columnX: number;
  /** Tile centre, % of the 620-tall composition. */
  top: number;
  label: string;
  /** Float phase offset in radians. */
  phase: number;
};

export type Rock = {
  src?: string;
  alt: "";
  /** Left / top / width, all % of the composition box. */
  left: number;
  top: number;
  width: number;
  /** Layer ordering, e.g. "z-0" or "z-20". */
  z: string;
};

export type DigitalFoundationContent = {
  slug: string;
  packageName: string;
  price: number;
  priceLabel: string;
  priceNote: string;
  heroLine: string;
  checklist: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
  feeNote: string;
  crumbs: { label: string; href?: string }[];
  dashboard: {
    brand: string;
    greeting: string;
    greetingSub: string;
    websiteLabel: string;
    websiteValue: string;
    sidebar: SidebarItem[];
    overviewTitle: string;
    overviewLink: string;
    statuses: SetupStatus[];
    tableTitle: string;
    tableColumns: string[];
    rows: EnquiryRow[];
    caption: string;
  };
  productCard: {
    title: string;
    sub: string;
    media: { label: string; hint: string; aspect: string };
  };
  tiles: SocialTile[];
  tilesLabel: string;
  rocks: Rock[];
};

export const digitalFoundation: DigitalFoundationContent = {
  slug: "digital-foundation",
  packageName: "Digital Foundation Package",
  price: 30000,
  priceLabel: "₹30,000",
  priceNote: "one-time",
  heroLine: "",
  checklist: [
    "A professional website designed around your business",
    "Lead capture forms that turn visitors into enquiries",
    "WhatsApp and essential business links built in",
    "Basic automation for repetitive tasks, where feasible",
    "SSL/HTTPS and essential security set up from day one",
    "MSME/Udyam registration guidance, where applicable",
    "Digital setup guidance to get your business online",
  ],
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=digital-foundation-package",
  },
  secondaryCta: { label: "See what's included", href: "#included" },
  trustLine: "Clear scope and pricing before we start",
  feeNote: "Third-party services, if any, may carry separate provider fees.",
  crumbs: [
    { label: "Services", href: "/services/business-packages" },
    { label: "Business Packages", href: "/services/business-packages" },
    { label: "Digital Foundation" },
  ],
  dashboard: {
    brand: "Digital Foundation",
    greeting: "Welcome back",
    greetingSub: "Here's an overview of your online presence",
    websiteLabel: "Your website",
    websiteValue: "yourbusiness.com",
    sidebar: [
      { label: "Home", icon: Home, active: true },
      { label: "Website", icon: Globe },
      { label: "Lead capture", icon: UserPlus },
      { label: "WhatsApp", icon: MessageCircle },
      { label: "Security", icon: ShieldCheck },
      { label: "Registrations", icon: FileCheck2 },
      { label: "Settings", icon: Settings },
      { label: "Integrations", icon: Plug },
    ],
    overviewTitle: "Setup overview",
    overviewLink: "View details →",
    statuses: [
      {
        label: "Website",
        value: "Live",
        icon: "globe",
        status: "Healthy",
        chart: [0.28, 0.42, 0.34, 0.58, 0.5, 0.72, 0.66, 0.88],
      },
      {
        label: "Lead capture",
        value: "Form active",
        icon: "userPlus",
        status: "Healthy",
        chart: [0.2, 0.32, 0.5, 0.44, 0.62, 0.55, 0.7, 0.82],
      },
      {
        label: "WhatsApp",
        value: "Connected",
        icon: "messageCircle",
        status: "Healthy",
        chart: [0.35, 0.3, 0.46, 0.52, 0.48, 0.68, 0.6, 0.86],
      },
    ],
    tableTitle: "Recent enquiries",
    tableColumns: ["Source", "Type", "Status"],
    rows: [
      { source: "Website form", type: "New enquiry", status: "New" },
      { source: "WhatsApp", type: "Message", status: "Replied" },
      { source: "Website form", type: "Quote request", status: "New" },
    ],
    caption: "Illustrative preview of an ORYNTAL-built setup.",
  },
  productCard: {
    title: "Your business website",
    sub: "Live on HTTPS",
    media: {
      label: "Add: screenshot of a finished client website, homepage (4:3, 800x600)",
      hint: "Use a real ORYNTAL-built site or a clean mockup.",
      aspect: "4/3",
    },
  },
  tiles: [
    { kind: "whatsapp", columnX: 94.5, top: 10, label: "WhatsApp", phase: 0 },
    { kind: "instagram", columnX: 94.5, top: 26, label: "Instagram", phase: 1.1 },
    { kind: "google", columnX: 86, top: 34, label: "Google", phase: 2.2 },
    { kind: "facebook", columnX: 94.5, top: 42, label: "Facebook", phase: 3.3 },
    {
      kind: "links",
      columnX: 86,
      top: 50,
      label: "Business links",
      phase: 4.4,
    },
  ],
  tilesLabel:
    "Social and integration connections: WhatsApp, Instagram, Google, Facebook and essential business links",
  rocks: [
    { alt: "", left: -4, top: 4, width: 20, z: "z-0" },
    { alt: "", left: -2, top: 60, width: 17, z: "z-20" },
  ],
};
