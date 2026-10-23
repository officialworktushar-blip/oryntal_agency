// CONFIRM: show only tools ORYNTAL actually integrates.

import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  Bot,
  Check,
  CreditCard,
  Globe,
  LayoutDashboard,
  MapPin,
  PackageCheck,
  Receipt,
  SendHorizontal,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  SiAirtable,
  SiGmail,
  SiGoogleanalytics,
  SiGooglecalendar,
  SiGooglesheets,
  SiHubspot,
  SiMailchimp,
  SiMeta,
  SiN8N,
  SiNotion,
  SiPaypal,
  SiRazorpay,
  SiShopify,
  SiStripe,
  SiSupabase,
  SiWhatsapp,
  SiWoocommerce,
  SiZapier,
  SiZoho,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type BusinessAutomationChip = {
  icon: IconType | LucideIcon;
  label: string;
  color: string;
};

export type BusinessAutomationSlide = {
  id: string;
  prompt: string;
  alt: string;
  chips: BusinessAutomationChip[];
  chipLayout: "row" | "tree";
  media: {
    label: string;
    hint: string;
  };
};

export type BusinessAutomationOverviewCard = {
  id: "orders" | "repeat" | "chats";
  title: string;
  description: string;
};

export type BusinessAutomationOverview = {
  heading: string;
  sub: string;
  cards: BusinessAutomationOverviewCard[];
  closing: {
    text: string;
    cta: { label: string; href: string };
    link: { label: string; href: string };
  };
  footnote: string;
};

export type BusinessAutomationConnectTool = {
  id: string;
  name: string;
  sub: string;
  icon: IconType | "monogram";
  color: string;
};

export type BusinessAutomationConnect = {
  pill: string;
  headingLine1: string;
  headingLine2: string;
  sub: string;
  panelLabel: string;
  collapsedRows: number;
  showMore: string;
  showLess: string;
  askLine: string;
  askCta: { label: string; href: string };
  note: string;
  tools: BusinessAutomationConnectTool[];
};

export type BusinessAutomationComparisonStatus = "yes" | "no" | "partial";

export type BusinessAutomationComparisonRow = {
  id: string;
  problem: string;
  us: string;
  them: string;
  themStatus: Exclude<BusinessAutomationComparisonStatus, "yes">;
};

export type BusinessAutomationComparison = {
  pill: string;
  headingLine1: string;
  headingLine2: string;
  sub: string;
  columns: { problem: string; us: string; them: string };
  badge: string;
  rows: BusinessAutomationComparisonRow[];
  chipLabel: string;
  chipLabelSelected: string;
  helper: string;
  cta: {
    default: { label: string; href: string };
    selected: {
      label: (count: number) => string;
      hrefBase: string;
    };
  };
  secondary: { label: string; href: string };
  footnote: string;
};

export type BusinessAutomationClosingTile = {
  id: string;
  row: number;
  col: number;
  kind: "icon" | "empty";
  label?: string;
  caption?: string;
  icon?: IconType | LucideIcon;
  style?: {
    variant: "glyph" | "filled";
    color?: string;
    background?: string;
  };
};

export type BusinessAutomationClosing = {
  heading: string;
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  trustLine: string;
  feeNote: string;
  tiles: BusinessAutomationClosingTile[];
};

export type BusinessAutomationContent = {
  packageName: string;
  price: number;
  priceLabel: string;
  priceNote: string;
  heroLine: string;
  heroChecklist: string[];
  allIncluded: Array<{ title: string; description: string }>;
  idealFor: string;
  scopeNote: string;
  feeNote: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
  slides: BusinessAutomationSlide[];
  overview: BusinessAutomationOverview;
  connect: BusinessAutomationConnect;
  comparison: BusinessAutomationComparison;
  closing: BusinessAutomationClosing;
};

export const businessAutomation: BusinessAutomationContent = {
  packageName: "Business Automation Package",
  price: 70000,
  priceLabel: "₹70,000",
  priceNote: "one-time",
  heroLine: "Your daily operations, running on their own.",
  heroChecklist: [
    "Payments, orders, and delivery connected in one workflow",
    "Automatic order, payment, and shipping updates on WhatsApp",
    "A custom website designed around how your business runs",
  ],
  allIncluded: [
    {
      title: "Custom website",
      description: "A business website designed according to your requirements.",
    },
    {
      title: "Dedicated UX/UI design",
      description: "A UX/UI designer shaping an experience around your business, customers, and workflows.",
    },
    {
      title: "Payment gateway integration",
      description: "A compatible payment gateway so customers can pay online.",
    },
    {
      title: "API integrations",
      description: "Suitable third-party APIs and platforms connected to automate data exchange.",
    },
    {
      title: "Order management automation",
      description: "Relevant order-processing steps automated, depending on your business model.",
    },
    {
      title: "Shipping and delivery integration",
      description: "Compatible logistics or shipping providers connected for dispatch and delivery.",
    },
    {
      title: "Automated notifications",
      description: "Order confirmations, payment updates, shipping notifications, and other relevant updates through supported channels.",
    },
    {
      title: "WhatsApp integration",
      description: "Business communication and notifications through WhatsApp, where supported.",
    },
    {
      title: "AI agents and chatbots",
      description: "AI-powered customer interaction or task automation, when required and included in the agreed scope.",
    },
    {
      title: "Centralized workflow",
      description: "A more connected way to manage operations without switching between multiple platforms.",
    },
    {
      title: "Trending and supported integrations",
      description: "Relevant, widely used third-party tools, subject to compatibility, access, and availability.",
    },
  ],
  idealFor: "Ideal for e-commerce businesses, product-based companies, online sellers, and businesses looking to automate multiple operational processes.",
  scopeNote: "Specific integrations and automation capabilities depend on the agreed scope.",
  feeNote: "Third-party subscriptions and transaction fees may be separate.",
  primaryCta: { label: "Get started", href: "/contact?interest=business-automation-package" },
  // TODO: point back to #included when that section exists
  secondaryCta: { label: "See what's included", href: "#automation" },
  trustLine: "Clear scope and pricing before we start",
  overview: {
    heading: "What your business can do on its own",
    sub: "Connect payments, orders, delivery, and customer updates once, and let them keep moving without you.",
    cards: [
      {
        id: "orders",
        title: "Every order, handled end to end",
        description:
          "Payment, order, courier, and customer update. Each step triggers the next, so nothing waits on you.",
      },
      {
        id: "repeat",
        title: "Repetitive work, done for you",
        description:
          "Set it once, and keep orders, payments, and updates moving even while you sleep.",
      },
      {
        id: "chats",
        title: "Chats that close the loop",
        description:
          "Customers message you on WhatsApp. Confirmations, answers, and order updates go out automatically.",
      },
    ],
    closing: {
      text: "Ready to see what this looks like for your business?",
      cta: {
        label: "Book a consultation",
        href: "/contact?interest=business-automation-package",
      },
      link: { label: "See what's included", href: "#included" },
    },
    footnote:
      "Illustrative examples. Specific integrations and automation capabilities depend on the agreed scope. AI assistants are included when required and agreed. Third-party subscriptions and transaction fees may be separate.",
  },
  connect: {
    // CONFIRM: keep only tools ORYNTAL can genuinely connect in this package. Remove the rest before launch.
    pill: "Integrations",
    headingLine1: "Connect your entire business",
    headingLine2: "in one place.",
    sub: "From everyday basics to advanced systems, we connect the tools you already use, so payments, orders, delivery, and customer updates work together instead of apart.",
    panelLabel: "Tools businesses really use",
    collapsedRows: 3,
    showMore: "Show more tools",
    showLess: "Show fewer tools",
    askLine: "Don't see your tool? If it offers an API, we can often connect it, subject to compatibility, access, and availability.",
    askCta: {
      label: "Ask about your tools",
      href: "/contact?interest=business-automation-package&topic=integrations",
    },
    note: "Examples of tools businesses commonly use. Specific integrations depend on the agreed scope, compatibility, account access, and service availability. Third-party subscriptions and transaction fees may be separate. Logos belong to their respective owners and do not imply endorsement.",
    tools: [
      { id: "whatsapp", name: "WhatsApp Business", sub: "Customer chat", icon: SiWhatsapp, color: "#25D366" },
      { id: "gmail", name: "Gmail", sub: "Email", icon: SiGmail, color: "#EA4335" },
      { id: "sheets", name: "Google Sheets", sub: "Spreadsheets", icon: SiGooglesheets, color: "#34A853" },
      { id: "razorpay", name: "Razorpay", sub: "Payments", icon: SiRazorpay, color: "#3395FF" },
      { id: "stripe", name: "Stripe", sub: "Payments", icon: SiStripe, color: "#635BFF" },
      { id: "paypal", name: "PayPal", sub: "Payments", icon: SiPaypal, color: "#003087" },
      { id: "shopify", name: "Shopify", sub: "Online store", icon: SiShopify, color: "#7AB55C" },
      { id: "woocommerce", name: "WooCommerce", sub: "Online store", icon: SiWoocommerce, color: "#96588A" },
      { id: "shiprocket", name: "Shiprocket", sub: "Shipping", icon: "monogram", color: "#5B3BE0" },
      { id: "delhivery", name: "Delhivery", sub: "Logistics", icon: "monogram", color: "#E4262B" },
      { id: "gcal", name: "Google Calendar", sub: "Scheduling", icon: SiGooglecalendar, color: "#4285F4" },
      { id: "ga", name: "Google Analytics", sub: "Website insights", icon: SiGoogleanalytics, color: "#E37400" },
      { id: "meta", name: "Meta", sub: "Facebook & Instagram", icon: SiMeta, color: "#0866FF" },
      { id: "mailchimp", name: "Mailchimp", sub: "Email marketing", icon: SiMailchimp, color: "#FFB000" },
      { id: "hubspot", name: "HubSpot", sub: "CRM", icon: SiHubspot, color: "#FF7A59" },
      { id: "zoho", name: "Zoho", sub: "CRM & business apps", icon: SiZoho, color: "#E42527" },
      { id: "tally", name: "Tally", sub: "Accounting", icon: "monogram", color: "#2E7D32" },
      { id: "slack", name: "Slack", sub: "Team chat", icon: "monogram", color: "#4A154B" },
      { id: "notion", name: "Notion", sub: "Docs & wikis", icon: SiNotion, color: "#000000" },
      { id: "airtable", name: "Airtable", sub: "Databases", icon: SiAirtable, color: "#FCB400" },
      { id: "zapier", name: "Zapier", sub: "Workflows", icon: SiZapier, color: "#FF4F00" },
      { id: "n8n", name: "n8n", sub: "Workflow automation", icon: SiN8N, color: "#EA4B71" },
      { id: "twilio", name: "Twilio", sub: "SMS & voice", icon: "monogram", color: "#F22F46" },
      { id: "openai", name: "OpenAI", sub: "AI", icon: "monogram", color: "#10A37F" },
      { id: "supabase", name: "Supabase", sub: "Databases & backend", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  // Keep comparisons honest and generic. Do not name competitors or add unverifiable claims.
  comparison: {
    pill: "Why ORYNTAL",
    headingLine1: "Manual busywork vs.",
    headingLine2: "ORYNTAL Business Automation",
    sub: "Spot the daily problem you recognise, and see how a connected setup handles it instead.",
    columns: {
      problem: "Your daily problem",
      us: "ORYNTAL Business Automation",
      them: "A typical manual or DIY setup",
    },
    badge:
      "Ideal for e-commerce businesses, product-based companies, and online sellers",
    rows: [
      {
        id: "scattered",
        problem: "Orders scattered across apps",
        us: "Payments, orders, and delivery connected in one workflow",
        them: "Separate tools you stitch together yourself",
        themStatus: "partial",
      },
      {
        id: "whereis",
        problem: "Customers asking “where's my order?”",
        us: "Automatic order, payment, and shipping updates on WhatsApp",
        them: "Manual updates, one message at a time",
        themStatus: "no",
      },
      {
        id: "missed",
        problem: "Missed messages after hours",
        us: "AI chatbot answers routine questions, where included in scope",
        them: "Replies wait until you're free",
        themStatus: "no",
      },
      {
        id: "payments",
        problem: "Checking payments by hand",
        us: "Payment gateway connected, so orders update as payments clear",
        them: "Matching payments to orders manually",
        themStatus: "no",
      },
      {
        id: "dispatch",
        problem: "Courier booking and dispatch hassle",
        us: "Shipping integration with compatible logistics providers",
        them: "Booking couriers and copying details by hand",
        themStatus: "no",
      },
      {
        id: "website",
        problem: "A website that doesn't fit how you sell",
        us: "Custom website with dedicated UX/UI design around your workflow",
        them: "A generic template",
        themStatus: "partial",
      },
      {
        id: "scale",
        problem: "More orders, more busywork",
        us: "A connected workflow that grows with your business",
        them: "Every new order adds manual work",
        themStatus: "partial",
      },
    ],
    chipLabel: "That's me",
    chipLabelSelected: "Selected",
    helper: "Tap “That's me” on the problems you recognise.",
    cta: {
      default: {
        label: "Get started",
        href: "/contact?interest=business-automation-package",
      },
      selected: {
        label: (count: number) =>
          `Fix ${count} ${count === 1 ? "problem" : "problems"}`,
        hrefBase:
          "/contact?interest=business-automation-package&topic=problems&problems=",
      },
    },
    secondary: {
      label: "Compare all packages",
      href: "/services/business-packages",
    },
    footnote:
      "This comparison is general and describes typical manual or DIY setups, not any specific provider. Specific integrations and automation capabilities depend on the agreed scope. AI chatbots are included when required and agreed. Third-party subscriptions and transaction fees may be separate.",
  },
  closing: {
    heading: "Put the busywork on autopilot.",
    sub: "Start with one connected workflow. Payments, orders, delivery, and customer updates handled without you.",
    primary: {
      label: "Book a consultation",
      href: "/contact?interest=business-automation-package",
    },
    secondary: {
      label: "See what's included",
      href: "#included",
    },
    trustLine: "Clear scope and pricing before we start.",
    feeNote: "Third-party subscriptions and transaction fees may be separate.",
    tiles: [
      {
        id: "website",
        row: 0,
        col: 0,
        kind: "icon",
        label: "Website",
        caption: "Website live",
        icon: Globe,
        style: { variant: "glyph", color: "#B9A8FF" },
      },
      {
        id: "payments",
        row: 0,
        col: 1,
        kind: "icon",
        label: "Payments",
        caption: "Payment confirmed",
        icon: CreditCard,
        style: { variant: "filled", background: "linear-gradient(150deg,#3B82F6,#1D4ED8)" },
      },
      { id: "empty-1", row: 0, col: 2, kind: "empty" },
      {
        id: "orders",
        row: 1,
        col: 1,
        kind: "icon",
        label: "Orders",
        caption: "Order created",
        icon: PackageCheck,
        style: { variant: "filled", background: "linear-gradient(150deg,#34C77B,#1E8A4C)" },
      },
      {
        id: "whatsapp",
        row: 1,
        col: 2,
        kind: "icon",
        label: "WhatsApp",
        caption: "WhatsApp update sent",
        icon: SiWhatsapp,
        style: { variant: "glyph", color: "#25D366" },
      },
      {
        id: "shipping",
        row: 1,
        col: 3,
        kind: "icon",
        label: "Shipping",
        caption: "Shipment booked",
        icon: Truck,
        style: { variant: "filled", background: "linear-gradient(150deg,#FB923C,#EA580C)" },
      },
      {
        id: "ai",
        row: 2,
        col: 2,
        kind: "icon",
        label: "AI assistant",
        caption: "AI assistant replied",
        icon: Bot,
        style: { variant: "glyph", color: "#9B95FF" },
      },
      {
        id: "notify",
        row: 2,
        col: 3,
        kind: "icon",
        label: "Notifications",
        caption: "Customer notified",
        icon: BellRing,
        style: { variant: "filled", background: "linear-gradient(150deg,#F472B6,#DB2777)" },
      },
      { id: "empty-2", row: 2, col: 4, kind: "empty" },
    ],
  },
  slides: [
    {
      id: "orders",
      prompt: "When a customer places an order, confirm the payment, send a WhatsApp update, and book the courier.",
      alt: "Business owner receiving an automatic order confirmation on a phone",
      chips: [
        { icon: SiRazorpay, label: "Razorpay", color: "#3395FF" },
        { icon: SiWhatsapp, label: "WhatsApp", color: "#25D366" },
        { icon: Truck, label: "Shipping", color: "#673DE6" },
      ],
      chipLayout: "row",
      media: {
        label: "Add: photo of a shop owner smiling at an order notification on a phone (portrait 11:12, 1200x1310)",
        hint: "Real photo, natural light, warm and authentic; keep faces away from the bottom 30% (the prompt box covers it).",
      },
    },
    {
      id: "payments",
      prompt: "Accept online payments securely, and update the order the moment they clear.",
      alt: "Customer paying online from a phone",
      chips: [
        { icon: CreditCard, label: "Payments", color: "#673DE6" },
        { icon: SiRazorpay, label: "Razorpay", color: "#3395FF" },
        { icon: Receipt, label: "Receipts", color: "#673DE6" },
      ],
      chipLayout: "row",
      media: {
        label: "Add: photo of a customer paying online with a phone, relaxed, in a cafe or at home (portrait 11:12, 1200x1310)",
        hint: "Real photo, natural light, warm and authentic; keep faces away from the bottom 30% (the prompt box covers it).",
      },
    },
    {
      id: "chat",
      prompt: "Answer customer questions instantly on WhatsApp, even while I'm asleep.",
      alt: "Business owner sleeping peacefully while the business keeps responding",
      chips: [
        { icon: SiWhatsapp, label: "WhatsApp", color: "#25D366" },
        { icon: Bot, label: "AI chatbot", color: "#673DE6" },
        { icon: SiGmail, label: "Email", color: "#EA4335" },
      ],
      chipLayout: "row",
      media: {
        label: "Add: photo of a business owner sleeping calmly at night with a phone on the bedside (portrait 11:12, 1200x1310)",
        hint: "Real photo, natural light, warm and authentic; keep faces away from the bottom 30% (the prompt box covers it).",
      },
    },
    {
      id: "delivery",
      prompt: "Keep customers updated at every step, from dispatch to their doorstep.",
      alt: "Delivery parcel handed to a happy customer",
      chips: [
        { icon: Truck, label: "Shipping", color: "#673DE6" },
        { icon: SiWhatsapp, label: "WhatsApp", color: "#25D366" },
        { icon: MapPin, label: "Tracking", color: "#673DE6" },
      ],
      chipLayout: "row",
      media: {
        label: "Add: photo of a courier handing a parcel to a smiling customer (portrait 11:12, 1200x1310)",
        hint: "Real photo, natural light, warm and authentic; keep faces away from the bottom 30% (the prompt box covers it).",
      },
    },
    {
      id: "workflow",
      prompt: "See orders, payments, and customers in one place, with no more switching between apps.",
      alt: "Business owner reviewing a single dashboard on a laptop",
      chips: [
        { icon: SiGooglesheets, label: "Sheets", color: "#34A853" },
        { icon: SiAirtable, label: "Data", color: "#FCB400" },
        { icon: LayoutDashboard, label: "Dashboard", color: "#673DE6" },
      ],
      chipLayout: "tree",
      media: {
        label: "Add: photo of a business owner calmly working at a laptop with a clean dashboard (portrait 11:12, 1200x1310)",
        hint: "Real photo, natural light, warm and authentic; keep faces away from the bottom 30% (the prompt box covers it).",
      },
    },
  ],
};

export const CheckIcon = Check;
export { SendHorizontal, ShieldCheck };
