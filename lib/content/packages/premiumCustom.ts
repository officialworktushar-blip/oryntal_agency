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
  secondaryCta: { label: "See what's included", href: "#included" },
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
};
