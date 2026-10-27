import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Boxes,
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
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

export type WebsiteAppPill = {
  id: string;
  label: string;
  icon: string;
  color: string;
  caption: string;
  topic: string;
};

export type WebsiteAppWhatWeBuild = {
  headingLine1: string;
  headingLine2: string;
  body: string;
  cta: WebsiteAppCta;
  secondary: WebsiteAppCta;
  note: string;
  pills: WebsiteAppPill[];
  srSummary: string;
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
  whatWeBuild: WebsiteAppWhatWeBuild;
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
  whatWeBuild: {
    headingLine1: "Whatever you're building,",
    headingLine2: "we build it around your business.",
    body: "Tell us what you're building. We design, prototype, and develop it around how your business works, so you launch something that fits, not something you have to work around.",
    cta: {
      label: "Start your project",
      href: "/contact?interest=website-and-app-development",
    },
    secondary: {
      label: "Talk to our team",
      href: "/contact?interest=website-and-app-development",
    },
    note: "Scope, features, timeline, and pricing are agreed in your proposal. Third-party services, if any, may carry separate provider fees.",
    pills: [
      { id: "website", label: "Business Website", icon: "Globe", color: "#7B8CFF", caption: "A professional website that presents your business clearly.", topic: "websites" },
      { id: "store", label: "Online Store", icon: "ShoppingCart", color: "#F5A623", caption: "Sell online, with products, payments, and orders built in.", topic: "ecommerce" },
      { id: "webapp", label: "Web App", icon: "AppWindow", color: "#6D45EE", caption: "Software your team and customers use right in the browser.", topic: "web-app" },
      { id: "mobile", label: "Mobile App", icon: "Smartphone", color: "#2F7BFF", caption: "Android and iOS apps that put your business in every pocket.", topic: "mobile-app" },
      { id: "saas", label: "SaaS Product", icon: "Boxes", color: "#D33A3A", caption: "Turn your idea into a product people subscribe to.", topic: "saas" },
      { id: "portal", label: "Customer Portal", icon: "LayoutDashboard", color: "#1E1E22", caption: "A secure space where customers manage everything themselves.", topic: "portals" },
      { id: "admin", label: "Admin Panel", icon: "ShieldCheck", color: "#14B889", caption: "Manage users, data, and operations from one place.", topic: "portals" },
      { id: "design", label: "UI/UX Design", icon: "PenTool", color: "#E0509B", caption: "Interfaces designed and prototyped before development begins.", topic: "websites" },
    ],
    srSummary: "ORYNTAL builds business websites, online stores, web apps, mobile apps for Android and iOS, SaaS products, customer portals, admin panels, and UI/UX design with prototyping.",
  },
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
