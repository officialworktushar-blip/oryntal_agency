import type { LucideIcon } from "lucide-react";
import { AppWindow, Bot, CreditCard, Handshake, LayoutDashboard } from "lucide-react";

export type PremiumCustomModule = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  color: string;
};

export type PremiumCustomAllIncluded = {
  title: string;
  description: string;
};

export type PremiumCustomSystem = {
  pill: string;
  headingLine1: string;
  headingLine2: string;
  sub: string;
  cards: {
    platform: {
      title: string;
      text: string;
      rows: { label: string; icon: string }[];
    };
    workflow: {
      title: string;
      text: string;
      header: string;
      feed: [string, string][];
    };
    prototype: {
      title: string;
      text: string;
      layers: { label: string; icon: string }[];
    };
    modules: {
      title: string;
      text: string;
      items: { label: string; icon: string }[];
    };
  };
  closing: {
    ideal: string;
    cta: { label: string; href: string };
    trust: string;
    note: string;
  };
};

export type PremiumCustomContent = {
  packageName: string;
  priceLabel: string;
  priceCaption: string;
  priceNote: string;
  heroLine: string;
  heroChecklist: string[];
  allIncluded: PremiumCustomAllIncluded[];
  idealFor: string;
  scopeNote: string;
  feeNote: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
  modules: PremiumCustomModule[];
  stages: string[];
  srSummary: string;
  system: PremiumCustomSystem;
};

export const premiumCustom: PremiumCustomContent = {
  packageName: "Premium Custom Business System",
  priceLabel: "₹3,00,000 – ₹4,00,000",
  priceCaption: "Indicative investment",
  priceNote: "Final price agreed in your proposal",
  heroLine: "A platform built around how your business actually runs.",
  heroChecklist: [
    "A custom web or mobile platform designed around your operations",
    "A complete prototype to approve before full development",
    "AI agents, payments, and integrations working as one system",
  ],
  allIncluded: [
    {
      title: "Dedicated UX/UI design",
      description:
        "A design approach tailored to your business, its users, and its operational requirements.",
    },
    {
      title: "Complete prototype",
      description:
        "A structured prototype of the experience, interface, and major workflows before full development.",
    },
    {
      title: "Custom website or application",
      description:
        "The agreed digital platform: web applications, mobile applications, or business-specific systems.",
    },
    {
      title: "Custom admin and user panels",
      description:
        "Dedicated interfaces for administrators, employees, customers, or other users, depending on requirements.",
    },
    {
      title: "Advanced AI and automation",
      description:
        "Custom AI agents, multi-agent systems, workflow automation, or other AI capabilities where appropriate.",
    },
    {
      title: "Payment gateway integration",
      description: "Suitable payment providers integrated into your business system.",
    },
    {
      title: "Advanced API integrations",
      description:
        "Connections with relevant third-party services, business tools, and supported platforms.",
    },
    {
      title: "System integration",
      description:
        "Business processes, databases, applications, and services connected into a coordinated workflow.",
    },
    {
      title: "Business-specific features",
      description: "Custom features developed around your operations and objectives.",
    },
    {
      title: "Supplier and wholesale connections",
      description:
        "Access to relevant supplier, wholesaler, packaging, and sourcing contacts through ORYNTAL's available network, where suitable.",
    },
    {
      title: "Implementation and refinement",
      description:
        "Development, testing, integration, and refinement based on agreed deliverables.",
    },
  ],
  idealFor:
    "Ideal for businesses seeking a customized digital platform, advanced automation, or technology built around specialized requirements.",
  scopeNote: "Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
  feeNote: "Payment gateway, API, logistics, and other third-party services may require separate provider subscriptions or transaction fees.",
  primaryCta: { label: "Book a consultation", href: "/contact?interest=premium-custom-system" },
  // TODO: point back to #included when the detailed What's included section exists
  secondaryCta: { label: "See what's included", href: "#system" },
  trustLine: "Scoped and priced in a proposal before we build",
  modules: [
    {
      id: "app",
      label: "Custom web & mobile app",
      sub: "Built around your operations",
      icon: AppWindow,
      color: "#7B8CFF",
    },
    {
      id: "panels",
      label: "Admin & user panels",
      sub: "For your team and customers",
      icon: LayoutDashboard,
      color: "#34C77B",
    },
    {
      id: "ai",
      label: "AI agents & automation",
      sub: "Working across your business",
      icon: Bot,
      color: "#B9A8FF",
    },
    {
      id: "payments",
      label: "Payments & integrations",
      sub: "Connected into one system",
      icon: CreditCard,
      color: "#FFB84D",
    },
    {
      id: "network",
      label: "Supplier & wholesale network",
      sub: "Where suitable",
      icon: Handshake,
      color: "#FF7AB6",
    },
  ],
  stages: ["Understand", "Prototype", "Build", "Refine"],
  srSummary:
    "A custom business system combining a tailored web or mobile app, admin and user panels, AI agents and automation, payments and integrations, and supplier connections where suitable.",
  system: {
    pill: "What's included",
    headingLine1: "Everything your business needs,",
    headingLine2: "designed as one system.",
    sub: "Designed for businesses that require a comprehensive, customized technology solution rather than a standard website or automation setup.",
    cards: {
      platform: {
        title: "A platform shaped around your operations",
        text: "Choose the form that fits: a custom web application, a mobile app, or a business-specific system. Then add AI agents that work across your processes, payments, and data, wherever they genuinely help.",
        rows: [
          { label: "Custom web application", icon: "AppWindow" },
          { label: "Custom mobile application", icon: "Smartphone" },
          { label: "Business-specific system", icon: "Boxes" },
        ],
      },
      workflow: {
        title: "The right view for every role",
        text: "Custom admin and user panels give your team, your customers, and your partners exactly what they need to see, in one connected system.",
        header: "Business workflow",
        feed: [
          ["Order intake", "Orders"],
          ["Payment check", "Payments"],
          ["Stock update", "Inventory"],
          ["Customer update", "Messaging"],
          ["Report builder", "Reports"],
          ["Supplier order", "Suppliers"],
          ["Invoice created", "Billing"],
          ["Delivery booked", "Shipping"],
        ],
      },
      prototype: {
        title: "See it before it's built",
        text: "A complete prototype shows your interface and major workflows first, so you can approve the direction before full development begins.",
        layers: [
          { label: "Prototype", icon: "LayoutTemplate" },
          { label: "Build", icon: "Hammer" },
          { label: "Refine", icon: "SlidersHorizontal" },
        ],
      },
      modules: {
        title: "Features only your business needs",
        text: "Custom modules developed around your operations and objectives: supplier and wholesale connections (where suitable), payments, order flows, and system integrations, shaped to your agreed scope.",
        items: [
          { label: "Supplier Network", icon: "Handshake" },
          { label: "Payments", icon: "CreditCard" },
          { label: "Order Management", icon: "PackageCheck" },
          { label: "Customer Support", icon: "Headset" },
          { label: "Reporting", icon: "ChartColumn" },
        ],
      },
    },
    closing: {
      ideal: "Ideal for businesses seeking a customized digital platform, advanced automation, or technology built around specialized requirements.",
      cta: { label: "Book a consultation", href: "/contact?interest=premium-custom-system" },
      trust: "Scoped and priced in a proposal before we build",
      note: "Illustrative previews. Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
    },
  },
};
