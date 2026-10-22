import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Compass,
  FileCheck2,
  Globe,
  Home,
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
  deliverables: DeliverablesContent;
  showcase: ShowcaseContent;
  connections: ConnectionsContent;
  comparison: ComparisonContent;
  experts: ExpertsContent;
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

/** Brand logos and lucide glyphs both render with className + style. */
export type ShowcaseIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}>;

/** One row of the illustrative dashboard sidebar. */
export type ShowcaseNavRow = {
  id: string;
  label: string;
  icon: ShowcaseIcon;
  /** Included item this row highlights. "Overview" highlights nothing. */
  includedId?: IncludedItem["id"];
  /** Trailing chevron. */
  trailingIcon?: ShowcaseIcon;
  /** Highlights together with the primary row of the same item. */
  secondary?: boolean;
};

/** Sidebar rows, split into the groups drawn in the dashboard. */
export type ShowcaseNavGroup = {
  rows: ShowcaseNavRow[];
};

/** One setup card inside the dashboard. */
export type ShowcaseStat = {
  id: string;
  icon: ShowcaseIcon;
  label: string;
  value: string;
  chip: string;
  muted: string;
};

/** Column header of the enquiries table. */
export type ShowcaseColumn = {
  label: string;
  x: number;
};

/** A floating monochrome tile beside the dashboard. */
export type ShowcaseTile = {
  id: string;
  label: string;
  icon?: ShowcaseIcon;
  /** Logo image used instead of an icon. */
  src?: string;
  /** Tile top-left, in canvas pixels. */
  x: number;
  y: number;
  /** Included item this tile belongs to. */
  includedId?: IncludedItem["id"];
};

/** A faceted rock placed in the stage background. */
export type ShowcaseRock = {
  id: string;
  /** Rock top-left, in canvas pixels. */
  x: number;
  y: number;
  /** Rock size, in canvas pixels. */
  w: number;
  h: number;
  /** Stacking order inside the stage. */
  z: number;
  /** Static rotation in degrees. */
  rotation: number;
  /** Seed for the procedural facets. */
  seed: number;
  kind: "obsidian" | "ice";
  /** Optional image instead of the procedural shape. */
  src?: string;
};

/** A small chip of stone next to a rock. */
export type ShowcaseDebris = {
  id: string;
  x: number;
  y: number;
  size: number;
};

/** Copy for the illustrative dashboard and floating card. */
export type ShowcaseCopy = {
  brand: string;
  product: string;
  ask: string;
  welcome: string;
  welcomeSub: string;
  yourWebsite: string;
  siteUrl: string;
  setupOverview: string;
  viewDetails: string;
  enquiries: string;
  cardCaption: string;
  cardImageLabel: string;
  windowLabel: string;
  canvasLabel: string;
};

/** The illustrative stage: dashboard window, product card, tiles and rocks. */
export type ShowcaseContent = {
  copy: ShowcaseCopy;
  navGroups: ShowcaseNavGroup[];
  stats: ShowcaseStat[];
  tableColumns: ShowcaseColumn[];
  tiles: ShowcaseTile[];
  card: {
    title: string;
    status: string;
    src?: string;
  };
  rocks: ShowcaseRock[];
  debris: ShowcaseDebris[];
  chart: {
    path: string;
    baselineY: number;
    endX: number;
    endY: number;
  };
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

/** Status of one side of a comparison row. */
export type ComparisonStatus = "yes" | "no" | "partial";

/** One row of the "typical setup vs. ORYNTAL" comparison. */
export type ComparisonRow = {
  id: string;
  /** Row label, shown in the left column. */
  label: string;
  /** What the ORYNTAL package covers. */
  us: string;
  usStatus: "yes";
  /** What a typical DIY or template setup looks like. */
  them: string;
  themStatus: "no" | "partial";
};

export type ComparisonContent = {
  /** Small chip above the heading. */
  pill: string;
  /** Heading, split over two centred lines. */
  headingLine1: string;
  headingLine2: string;
  sub: string;
  /** Column headers. */
  columns: { us: string; them: string };
  /** Caption under the ORYNTAL column header. */
  badge: string;
  rows: ComparisonRow[];
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  footnote: string;
};

/** Decorative mock shown at the bottom of an open consultant bar. */
export type ExpertMock = "prompt" | "leads" | "channels" | "flow" | "checklist";

/** One consultant topic in the "Talk to a consultant" section. */
export type ExpertBar = {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  mock: ExpertMock;
};

export type ExpertsContent = {
  heading: string;
  sub: string;
  bars: ExpertBar[];
  cta: {
    text: string;
    primary: { label: string; href: string };
    trust: string;
  };
};

/** How the illustrative panel of a "What you get" card is arranged. */
export type DeliverableLayout = "trio" | "wide";

/** One card of the "What you get" section. */
export type DeliverableCard = {
  id: string;
  layout: DeliverableLayout;
  title: string;
  bullets: string[];
  /** Accessible label of the illustrative panel above the card. */
  panelLabel: string;
};

export type DeliverablesContent = {
  /** Small chip above the heading. */
  pill: string;
  /** Heading, split over two centred lines. */
  headingLine1: string;
  headingLine2: string;
  sub: string;
  /** Caption under the grid. */
  footnote: string;
  cards: DeliverableCard[];
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
  },
  // Illustrations only. Keep every widget free of invented numbers, percentages
  // and guarantees — statuses and words carry the meaning.
  deliverables: {
    pill: "What you get",
    headingLine1: "What you walk away with:",
    headingLine2: "a business that's ready to be found.",
    sub: "Everything below is part of your Digital Foundation Package, set up for you and ready to use.",
    footnote:
      "Previews are illustrative. Final scope, features, and any third-party costs are confirmed in your proposal.",
    cards: [
      {
        id: "website",
        layout: "trio",
        title: "A website built around your business",
        bullets: [
          "A new website designed around your services and products",
          "Pages shaped by your requirements, not a generic layout",
          "A clear, professional first impression for every visitor",
        ],
        panelLabel:
          "Illustration showing website status, your pages and a design built around your business",
      },
      {
        id: "leads",
        layout: "wide",
        title: "Turn visitors into conversations",
        bullets: [
          "Inquiry forms and basic lead collection built in",
          "WhatsApp integration, so customers reach you where they already are",
          "Essential business links and relevant basic third-party integrations",
        ],
        panelLabel: "Illustration of an active lead capture status",
      },
      {
        id: "secure",
        layout: "trio",
        title: "Less manual work, secure from day one",
        bullets: [
          "Basic automation of selected repetitive tasks, where feasible",
          "SSL/HTTPS configuration so your site loads securely",
          "Essential security setup included",
        ],
        panelLabel:
          "Illustration of HTTPS security, an automation flow and essential security",
      },
      {
        id: "start",
        layout: "wide",
        title: "Start on solid ground",
        bullets: [
          "MSME/Udyam registration guidance, where applicable",
          "Help identifying relevant registrations and documentation",
          "Guidance on the essential digital infrastructure your business needs",
        ],
        panelLabel:
          "Illustration of registration and setup guidance checklist",
      },
    ],
  },
  showcase: {
    copy: {
      brand: "ORYNTAL",
      product: "Digital Foundation",
      ask: "Ask ORYNTAL",
      welcome: "Welcome back",
      welcomeSub: "Here is how your online presence is set up",
      yourWebsite: "Your website",
      siteUrl: "yourbusiness.com",
      setupOverview: "Setup overview",
      viewDetails: "View details",
      enquiries: "Recent enquiries",
      cardCaption:
        "Illustrative preview. Your setup is tailored to your business.",
      cardImageLabel:
        "Add: screenshot of a finished client website, homepage (4:3, 800x600)",
      windowLabel: "Illustrative preview of the ORYNTAL digital dashboard",
      canvasLabel:
        "Illustration of an ORYNTAL-built business dashboard connected to WhatsApp, Google, Instagram and Facebook",
    },
    navGroups: [
      {
        rows: [
          { id: "overview", label: "Overview", icon: Home },
          {
            id: "website",
            label: "Website",
            icon: Globe,
            includedId: "website",
          },
        ],
      },
      {
        rows: [
          {
            id: "whatsapp",
            label: "WhatsApp",
            icon: MessageCircle,
            includedId: "connect",
          },
          {
            id: "business-links",
            label: "Business links",
            icon: Link2,
            includedId: "connect",
            secondary: true,
          },
        ],
      },
      {
        rows: [
          {
            id: "automation",
            label: "Automation",
            icon: Workflow,
            includedId: "automate",
          },
          {
            id: "security",
            label: "Security",
            icon: ShieldCheck,
            includedId: "secure",
          },
        ],
      },
      {
        rows: [
          {
            id: "registrations",
            label: "Registrations",
            icon: FileCheck2,
            includedId: "register",
            trailingIcon: ChevronDown,
          },
          {
            id: "guidance",
            label: "Setup guidance",
            icon: Compass,
            includedId: "setup",
          },
        ],
      },
    ],
    stats: [
      {
        id: "website",
        icon: Globe,
        label: "Website",
        value: "Live",
        chip: "Healthy",
        muted: "from day one",
      },
      {
        id: "leads",
        icon: UserPlus,
        label: "Lead capture",
        value: "Form active",
        chip: "Ready",
        muted: "inquiry forms",
      },
      {
        id: "secure",
        icon: ShieldCheck,
        label: "Security",
        value: "HTTPS on",
        chip: "Secure",
        muted: "SSL set up",
      },
    ],
    tableColumns: [
      { label: "Source", x: 8 },
      { label: "Date", x: 50 },
      { label: "Contact", x: 107 },
      { label: "Status", x: 237 },
      { label: "Follow-up", x: 292 },
    ],
    tiles: [
      {
        id: "oryntal",
        label: "ORYNTAL",
        src: "/oryntal-logo.png",
        x: 850,
        y: 77,
      },
      { id: "google", label: "Google", icon: SiGoogle, x: 850, y: 135 },
      { id: "whatsapp", label: "WhatsApp", icon: SiWhatsapp, x: 909, y: 37 },
      { id: "instagram", label: "Instagram", icon: SiInstagram, x: 909, y: 95 },
      { id: "facebook", label: "Facebook", icon: SiFacebook, x: 909, y: 153 },
    ],
    card: {
      title: "Your business website",
      status: "Live on HTTPS",
    },
    rocks: [
      {
        id: "rock-tl-1",
        x: 10,
        y: 5,
        w: 62,
        h: 67,
        z: 5,
        rotation: -8,
        seed: 11,
        kind: "obsidian",
      },
      {
        id: "rock-tl-2",
        x: 93,
        y: 8,
        w: 79,
        h: 64,
        z: 5,
        rotation: 6,
        seed: 23,
        kind: "obsidian",
      },
      {
        id: "rock-ice",
        x: 48,
        y: 100,
        w: 47,
        h: 68,
        z: 5,
        rotation: -12,
        seed: 37,
        kind: "ice",
      },
      {
        id: "rock-bl",
        x: 78,
        y: 315,
        w: 110,
        h: 105,
        z: 30,
        rotation: 5,
        seed: 41,
        kind: "obsidian",
      },
      {
        id: "rock-rt",
        x: 772,
        y: 162,
        w: 60,
        h: 50,
        z: 5,
        rotation: 10,
        seed: 53,
        kind: "obsidian",
      },
      {
        id: "rock-rm",
        x: 825,
        y: 285,
        w: 47,
        h: 65,
        z: 5,
        rotation: -6,
        seed: 67,
        kind: "obsidian",
      },
      {
        id: "rock-rb",
        x: 798,
        y: 345,
        w: 42,
        h: 45,
        z: 5,
        rotation: 12,
        seed: 71,
        kind: "obsidian",
      },
    ],
    debris: [
      { id: "debris-1", x: 128, y: 305, size: 6 },
      { id: "debris-2", x: 96, y: 332, size: 4 },
      { id: "debris-3", x: 86, y: 412, size: 6 },
      { id: "debris-4", x: 190, y: 392, size: 5 },
      { id: "debris-5", x: 60, y: 368, size: 4 },
      { id: "debris-6", x: 205, y: 415, size: 4 },
    ],
    chart: {
      path: "M0 36 C14 36 22 40 34 40 S56 26 76 24 S106 10 124 8",
      baselineY: 36,
      endX: 124,
      endY: 8,
    },
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
  // Keep comparisons honest and generic. Do not name competitors or add unverifiable claims.
  comparison: {
    pill: "Why ORYNTAL",
    headingLine1: "A typical setup vs.",
    headingLine2: "ORYNTAL Digital Foundation",
    sub: "Same goal, a very different starting point. Here is how a professionally set up foundation compares with a typical do-it-yourself or template setup.",
    columns: {
      us: "ORYNTAL Digital Foundation",
      them: "A typical DIY or template setup",
    },
    badge:
      "Ideal for startups, local businesses, service providers, and small businesses",
    rows: [
      {
        id: "fit",
        label: "Fit for your business",
        us: "Designed around your services, products, and requirements",
        usStatus: "yes",
        them: "One-size-fits-all template",
        themStatus: "no",
      },
      {
        id: "setup",
        label: "Setting everything up",
        us: "Website, lead capture, WhatsApp, and security in one package",
        usStatus: "yes",
        them: "Pieced together from separate tools and vendors",
        themStatus: "partial",
      },
      {
        id: "pricing",
        label: "Scope and pricing",
        us: "Fixed scope and price, agreed before we start",
        usStatus: "yes",
        them: "Costs that can grow as you add things",
        themStatus: "partial",
      },
      {
        id: "start",
        label: "Getting started",
        us: "Guidance on MSME/Udyam registration and digital setup",
        usStatus: "yes",
        them: "You work out the basics yourself",
        themStatus: "no",
      },
      {
        id: "repetitive",
        label: "Repetitive work",
        us: "Basic automation of selected tasks, where feasible",
        usStatus: "yes",
        them: "Manual follow-ups and copy-paste",
        themStatus: "no",
      },
      {
        id: "growth",
        label: "Growing later",
        us: "A clear path to automation and custom systems",
        usStatus: "yes",
        them: "Often a rebuild or a switch of tools",
        themStatus: "partial",
      },
    ],
    cta: { label: "Get started", href: "/contact?interest=digital-foundation-package" },
    secondary: { label: "Compare all packages", href: "/services/business-packages" },
    footnote:
      "This comparison is general and describes typical DIY or template setups, not any specific provider. Final scope, features, and third-party costs are confirmed in your proposal.",
  },
  experts: {
    heading: "Not sure where to start? Talk to a consultant",
    sub: "Tell us about your business and we'll recommend the simplest next step. Pick a topic to see how we help.",
    bars: [
      {
        id: "website",
        title: "Website planner",
        description:
          "We'll turn your services and products into a clear, professional website plan, so visitors understand what you offer in seconds.",
        linkLabel: "Plan my website",
        href: "/contact?interest=digital-foundation-package&topic=website",
        mock: "prompt",
      },
      {
        id: "leads",
        title: "Lead capture advisor",
        description:
          "We'll set up inquiry forms and lead collection, so every interested visitor has an easy way to reach you.",
        linkLabel: "Capture more enquiries",
        href: "/contact?interest=digital-foundation-package&topic=lead-capture",
        mock: "leads",
      },
      {
        id: "connect",
        title: "WhatsApp & links",
        description:
          "We'll connect WhatsApp and your essential business links, so customers can reach you where they already are.",
        linkLabel: "Connect my channels",
        href: "/contact?interest=digital-foundation-package&topic=whatsapp-and-links",
        mock: "channels",
      },
      {
        id: "automate",
        title: "Automation guide",
        description:
          "We'll find the repetitive tasks slowing you down and automate the right ones, where feasible.",
        linkLabel: "Find my quick wins",
        href: "/contact?interest=digital-foundation-package&topic=automation",
        mock: "flow",
      },
      {
        id: "start",
        title: "Registration & setup guide",
        description:
          "We'll guide you through MSME/Udyam registration and the digital basics, where applicable, so you start on solid ground.",
        linkLabel: "Get set up right",
        href: "/contact?interest=digital-foundation-package&topic=registration-and-setup",
        mock: "checklist",
      },
    ],
    cta: {
      text: "Prefer to talk it through? Tell us about your business and we'll map the next step with you.",
      primary: {
        label: "Book a consultation",
        href: "/contact?interest=digital-foundation-package",
      },
      trust: "Clear scope and pricing before we start",
    },
  },
};
