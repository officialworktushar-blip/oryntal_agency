// CONFIRM: show only tools ORYNTAL actually integrates.

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Check,
  CreditCard,
  LayoutDashboard,
  MapPin,
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
