import { 
  AppWindow, 
  Boxes, 
  Globe, 
  LayoutDashboard, 
  ShoppingCart, 
  Smartphone,
  type LucideIcon
} from "lucide-react";

export type WebsiteAppStat = {
  caption: string;
  value: number | string;
  valueType: "count" | "text";
  label: string;
};

export type WebsiteAppCta = {
  label: string;
  href: string;
};

export type WebsiteAppBuildItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  topic: string;
};

export type WebsiteAppVisual = {
  idleStatus: string;
  idleSub: (title: string) => string;
  doneStatus: string;
  doneSub: (title: string) => string;
  button: string;
  buttonDone: string;
  caption: string;
};

export type WebsiteAppContent = {
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  sub: string;
  emi: {
    enabled: boolean;
    lead: string;
    tag: string;
    note: string;
    pricingNote: string;
  };
  primaryCta: WebsiteAppCta;
  secondaryCta: WebsiteAppCta;
  stats: WebsiteAppStat[];
  services: string[];
  footnote: string;
  srSummary: string;
  build: WebsiteAppBuildItem[];
  visual: WebsiteAppVisual;
  marquee: string[];
};

const emiEnabled = true;

const emi = {
  enabled: emiEnabled,
  lead: "Purchase your website on",
  tag: "EMI basis",
  note: "EMI availability and terms are confirmed in your proposal.",
  pricingNote: "No fixed price: every project is quoted on your scope.",
};

const services = [
  "Business websites and landing pages",
  "E-commerce websites",
  "Web applications",
  "Android and iOS applications",
  "SaaS product development",
  "Custom portals and dashboards",
  "Admin panels and user management systems",
  "UI/UX design and prototyping",
];

const stats: WebsiteAppStat[] = [
  {
    caption: "Websites, stores, apps, and platforms, all under one roof.",
    value: 8,
    valueType: "count",
    label: "Services to choose from",
  },
  {
    caption: "Apps for both major mobile platforms.",
    value: 2,
    valueType: "count",
    label: "Mobile platforms: Android and iOS",
  },
  {
    caption: "Design and development working as one team.",
    value: 1,
    valueType: "count",
    label: "Team, from prototype to launch",
  },
  emiEnabled
    ? {
        caption: "Spread the cost of your website over time.",
        value: "EMI",
        valueType: "text",
        label: "Purchase on EMI basis",
      }
    : {
        caption: "Priced on what your project actually needs.",
        value: 1,
        valueType: "count",
        label: "Proposal before we build",
      },
];

export const websiteApp: WebsiteAppContent = {
  eyebrow: "Website & Application Development",
  h1Line1: "Websites and apps,",
  h1Line2: "built around your business.",
  sub: "From business websites and online stores to web apps, mobile apps, and SaaS products, we design, prototype, and build around how you work.",
  emi,
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=website-and-app-development",
  },
  secondaryCta: {
    label: "See what we build",
    href: "#what-we-build",
  },
  stats,
  services,
  footnote:
    "Scope, features, timeline, and pricing are agreed in your proposal. Third-party services, if any, may carry separate provider fees.",
  srSummary:
    "ORYNTAL designs and builds business websites and landing pages, e-commerce websites, web applications, Android and iOS applications, SaaS products, custom portals and dashboards, admin panels and user management systems, with UI/UX design and prototyping.",
  build: [
    { id: "websites", label: "Business websites and landing pages", icon: Globe, title: "Business website", topic: "websites" },
    { id: "ecommerce", label: "E-commerce websites", icon: ShoppingCart, title: "Online store", topic: "ecommerce" },
    { id: "webapp", label: "Web applications", icon: AppWindow, title: "Web application", topic: "web-app" },
    { id: "mobile", label: "Android and iOS applications", icon: Smartphone, title: "Mobile app", topic: "mobile-app" },
    { id: "saas", label: "SaaS product development", icon: Boxes, title: "SaaS product", topic: "saas" },
    { id: "portals", label: "Portals, dashboards and admin panels", icon: LayoutDashboard, title: "Portal or dashboard", topic: "portals" },
  ],
  visual: {
    idleStatus: "Your idea",
    idleSub: (title: string) => `${title} · tell us what you need`,
    doneStatus: "Scoped with you",
    doneSub: (title: string) => `${title} · design, build, launch ✓`,
    button: "Start your project",
    buttonDone: "Next: your proposal",
    caption: "Illustrative preview of how a project starts with ORYNTAL.",
  },
  marquee: [
    "Launch a business website",
    "Open an online store",
    "Build a web application",
    "Ship an Android and iOS app",
    "Launch a SaaS product",
    "Create a customer portal",
    "Build an admin panel",
    "Design and prototype your UI/UX",
  ],
};

export function getWebsiteAppTopicLabel(topic: string): string {
  switch (topic) {
    case "websites":
      return "a business website or landing page";
    case "ecommerce":
      return "an e-commerce website";
    case "web-app":
      return "a web application";
    case "mobile-app":
      return "an Android and iOS app";
    case "saas":
      return "a SaaS product";
    case "portals":
      return "a portal, dashboard, or admin panel";
    default:
      return null as unknown as string;
  }
}
