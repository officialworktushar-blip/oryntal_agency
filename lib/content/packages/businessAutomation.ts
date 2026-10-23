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
  SiGooglesheets,
  SiRazorpay,
  SiWhatsapp,
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
  secondaryCta: { label: "See what's included", href: "#included" },
  trustLine: "Clear scope and pricing before we start",
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
