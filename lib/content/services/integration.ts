import type { LucideIcon } from "lucide-react";
import {
  Cable,
  CreditCard,
  MessageCircle,
  Contact,
  Database,
  BarChart3,
} from "lucide-react";

export type IntegrationBuildItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  caption: string;
  topic: string;
};

export type IntegrationVisual = {
  idleCaption: string;
  centreLabel: string;
  srCaption: string;
};

export type IntegrationCta = {
  label: string;
  href: string;
};

export type IntegrationContent = {
  eyebrow: string;
  h1: string;
  sub: string;
  primaryCta: IntegrationCta;
  secondaryCta: IntegrationCta;
  trust: string;
  pricingNote: string;
  build: IntegrationBuildItem[];
  services: string[];
  marquee: string[];
  visual: IntegrationVisual;
  footnote: string;
  srSummary: string;
};

const build: IntegrationBuildItem[] = [
  {
    id: "apis",
    label: "API development and integration",
    icon: Cable,
    title: "APIs",
    caption: "Your apps and platforms share information on their own.",
    topic: "apis",
  },
  {
    id: "payments",
    label: "Payment gateway integration",
    icon: CreditCard,
    title: "Payments",
    caption: "Customers pay online and your records update instantly.",
    topic: "payments",
  },
  {
    id: "comms",
    label: "WhatsApp and communication integrations",
    icon: MessageCircle,
    title: "WhatsApp",
    caption: "Customers hear from you on the channels they already use.",
    topic: "comms",
  },
  {
    id: "crm",
    label: "CRM integrations",
    icon: Contact,
    title: "CRM",
    caption: "Every lead and customer lands where your team can act on it.",
    topic: "crm",
  },
  {
    id: "data",
    label: "Database development and data sheets",
    icon: Database,
    title: "Data",
    caption: "One organised home for your business information.",
    topic: "data",
  },
  {
    id: "insights",
    label: "Analytics and business intelligence",
    icon: BarChart3,
    title: "Insights",
    caption: "See what is happening in your business, in one view.",
    topic: "insights",
  },
];

const services = [
  "API development and integration",
  "Payment gateway integration",
  "WhatsApp and communication integrations",
  "CRM integrations",
  "Third-party platform integrations",
  "Database development and management",
  "Data sheet management",
  "Analytics and business intelligence",
  "Workflow and process automation",
];

const marquee = [
  "Connect your apps with an API",
  "Accept payments online",
  "Message customers on WhatsApp",
  "Sync your CRM automatically",
  "Link your third-party platforms",
  "Keep your data in one database",
  "Keep your data sheets up to date",
  "See your numbers in one dashboard",
  "Automate your daily processes",
];

export const integration: IntegrationContent = {
  eyebrow: "Software, API & System Integration",
  h1: "Your business tools, working as one system.",
  sub: "We connect your payments, WhatsApp, CRM, data, and the platforms you already use, so information flows on its own and your team stops copying details between apps.",
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=software-api-and-system-integration",
  },
  secondaryCta: {
    label: "See what we build",
    href: "#what-we-build",
  },
  trust: "Scoped and priced in a proposal before we build",
  pricingNote: "No fixed price: every integration project is quoted on your scope.",
  build,
  services,
  marquee,
  visual: {
    idleCaption: "Pick a connection",
    centreLabel: "Your business",
    srCaption: "Illustrative diagram of systems connected to your business.",
  },
  footnote: "Scope, features, timeline, and pricing are agreed in your proposal. Third-party services, if any, may carry separate provider fees.",
  srSummary: "ORYNTAL builds API development and integrations, payment gateway integrations, WhatsApp and communication integrations, CRM integrations, third-party platform integrations, database development and management, data sheet management, analytics and business intelligence, and workflow and process automation.",
  tools: {
    headingLine1: "Everything you already use,",
    headingLine2: "connected as one system",
    sub: "We join your payments, messaging, CRM, data, and platforms together, so information flows on its own instead of being copied from app to app.",
    rowALabel: "Apps and platforms your business runs on",
    rowBLabel: "CRM, data, and automation tools",
    note: "Examples of tools and platforms businesses commonly connect. Specific integrations depend on the agreed scope, compatibility, account access, and service availability. Third-party fees may be separate. Logos belong to their respective owners and do not imply endorsement.",
    cta: {
      label: "Ask about your tools",
      href: "/contact?interest=software-api-and-system-integration&topic=integrations",
    },
    trust: "Tell us your stack and we'll map what can connect",
  },
} as IntegrationContent & {
  tools: {
    headingLine1: string;
    headingLine2: string;
    sub: string;
    rowALabel: string;
    rowBLabel: string;
    note: string;
    cta: { label: string; href: string };
    trust: string;
  };
};

