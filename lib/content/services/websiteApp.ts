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
  sub: "From business websites and online stores to web apps, mobile apps, and SaaS products, we design, prototype, and build the digital product your business needs, shaped around how you work.",
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
};
