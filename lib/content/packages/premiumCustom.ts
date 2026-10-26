import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bot,
  CreditCard,
  Handshake,
  LayoutDashboard,
  LayoutTemplate,
  Plug,
} from "lucide-react";

export type PremiumCustomHeroModule = {
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

export type PremiumCustomModuleItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  cta: { label: string; href: string };
  briefKey: string;
  briefLines: string[];
  note: string;
};

export type PremiumCustomModules = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  sub: string;
  items: PremiumCustomModuleItem[];
  divider: string;
  briefHelper: string;
  copyLabel: string;
  copiedLabel: string;
  closing: {
    text: string;
    link: { label: string; href: string };
  };
  footnote: string;
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

export type PremiumCustomClosingBanner = {
  heading: string;
  sub: string;
  cta: { label: string; href: string };
  trust: string;
  link: { label: string; href: string };
  footnote: string;
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
  modules: PremiumCustomModules;
  heroModules: PremiumCustomHeroModule[];
  stages: string[];
  srSummary: string;
  system: PremiumCustomSystem;
  closingBanner: PremiumCustomClosingBanner;
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
  secondaryCta: { label: "See what's included", href: "#what-you-get" },
  trustLine: "Scoped and priced in a proposal before we build",
  modules: {
    eyebrow: "WHAT YOU GET",
    headingLine1: "Built around your business,",
    headingLine2: "not squeezed into a template.",
    sub: "Six building blocks, shaped by your requirements and agreed in your proposal. Pick one to see what it gives your business.",
    items: [
      {
        id: "design",
        label: "Design & Prototype",
        icon: LayoutTemplate,
        title: "UX/UI design and a complete prototype",
        subtitle: "See the experience before full development begins.",
        description:
          "A design approach tailored to your business, its users, and your operations, followed by a structured prototype of the interface and major workflows. You approve the direction first, so what gets built is what you expected.",
        bullets: [
          "Dedicated UX/UI design for your users",
          "A complete, clickable prototype",
          "Major workflows mapped before development",
          "Feedback and approval before the build",
        ],
        cta: {
          label: "Plan my design",
          href: "/contact?interest=premium-custom-system&topic=design",
        },
        briefKey: "design-and-prototype",
        briefLines: [
          "deliverable: ux/ui design + complete prototype",
          "review: approve before full development",
          "scope: agreed in your proposal",
        ],
        note: "A prototype helps align expectations early. Final deliverables are confirmed in your proposal.",
      },
      {
        id: "app",
        label: "Custom Web & Mobile App",
        icon: AppWindow,
        title: "A platform built for how you operate",
        subtitle: "Web applications, mobile applications, or business-specific systems.",
        description:
          "We develop the agreed digital platform around your processes, so your team and customers work the way your business actually works, not the way a template forces them to.",
        bullets: [
          "Custom web application",
          "Mobile application, where it fits your needs",
          "Business-specific systems for specialised operations",
          "Development, testing, and refinement against agreed deliverables",
        ],
        cta: {
          label: "Plan my platform",
          href: "/contact?interest=premium-custom-system&topic=app",
        },
        briefKey: "custom-platform",
        briefLines: [
          "platform: web | mobile | business-specific",
          "built-for: your operations",
          "scope: agreed in your proposal",
        ],
        note: "The form of the platform depends on your requirements and the agreed scope.",
      },
      {
        id: "panels",
        label: "Admin & User Panels",
        icon: LayoutDashboard,
        title: "The right view for every role",
        subtitle: "Dedicated interfaces for the people who use your system.",
        description:
          "Administrators, employees, customers, or other users each get an interface shaped to their job, so everyone sees what they need and nothing they don't.",
        bullets: [
          "Custom admin panel for your team",
          "User panels for customers or partners",
          "Role-based views, depending on requirements",
          "One connected system behind every panel",
        ],
        cta: {
          label: "Plan my panels",
          href: "/contact?interest=premium-custom-system&topic=panels",
        },
        briefKey: "admin-and-user-panels",
        briefLines: [
          "panels: admin | employee | customer",
          "access: by role, per requirements",
          "scope: agreed in your proposal",
        ],
        note: "Panels and permissions are defined by your requirements.",
      },
      {
        id: "ai",
        label: "AI Agents & Automation",
        icon: Bot,
        title: "AI that works across your business",
        subtitle: "Custom agents and automations, where they genuinely help.",
        description:
          "Custom AI agents, multi-agent systems, and workflow automation take on repetitive work and keep processes moving, applied where it adds real value to your operations.",
        bullets: [
          "Custom AI agents for your processes",
          "Multi-agent systems, where appropriate",
          "Workflow automation across your system",
          "Applied only where it genuinely helps",
        ],
        cta: {
          label: "Plan my AI system",
          href: "/contact?interest=premium-custom-system&topic=ai",
        },
        briefKey: "ai-agents-and-automation",
        briefLines: [
          "agents: custom, per process",
          "automation: workflows across the system",
          "scope: agreed in your proposal",
        ],
        note: "AI capabilities are included where appropriate and agreed.",
      },
      {
        id: "payments",
        label: "Payments & Integrations",
        icon: Plug,
        title: "Payments and tools, connected as one",
        subtitle: "Payment providers, APIs, and your business tools in one workflow.",
        description:
          "Suitable payment providers, advanced API integrations, and system integration connect your processes, databases, applications, and services, so data moves on its own instead of being copied by hand.",
        bullets: [
          "Payment gateway integration",
          "Advanced API integrations with business tools",
          "Processes, databases, and services connected",
          "A coordinated workflow end to end",
        ],
        cta: {
          label: "Plan my integrations",
          href: "/contact?interest=premium-custom-system&topic=payments",
        },
        briefKey: "payments-and-integrations",
        briefLines: [
          "payments: suitable provider integrated",
          "integrations: APIs, tools, platforms",
          "scope: agreed in your proposal",
        ],
        note: "Payment gateway, API, logistics, and other third-party services may require separate provider subscriptions or transaction fees.",
      },
      {
        id: "network",
        label: "Business-Specific Features & Network",
        icon: Handshake,
        title: "Features only your business needs",
        subtitle: "Custom features, plus supplier and wholesale connections where suitable.",
        description:
          "We build custom features around your operations and objectives, and, where suitable, connect you to relevant supplier, wholesaler, packaging, and sourcing contacts through ORYNTAL's available network, then refine everything against agreed deliverables.",
        bullets: [
          "Custom features shaped around your objectives",
          "Supplier and wholesale connections, where suitable",
          "Packaging and sourcing contacts through ORYNTAL's network",
          "Implementation and refinement to agreed deliverables",
        ],
        cta: {
          label: "Plan my features",
          href: "/contact?interest=premium-custom-system&topic=network",
        },
        briefKey: "custom-features-and-network",
        briefLines: [
          "features: built around your operations",
          "network: suppliers, wholesalers, packaging (where suitable)",
          "scope: agreed in your proposal",
        ],
        note: "Supplier pricing, MOQs, availability, and terms are set by the relevant supplier. ORYNTAL can help connect you, but specific pricing or savings cannot be guaranteed.",
      },
    ],
    divider: "or share your build brief with us",
    briefHelper: "Copy this brief and paste it into the contact form, or let us prefill it for you.",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    closing: {
      text: "Not sure which blocks you need? We'll scope them together before anything is built.",
      link: { label: "Book a consultation", href: "/contact?interest=premium-custom-system" },
    },
    footnote:
      "Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
  },
  heroModules: [
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
  closingBanner: {
    heading: "Ready to build a system around your business?",
    sub: "Tell us how your business runs. We'll scope it together before anything is built.",
    cta: { label: "Book a consultation", href: "/contact?interest=premium-custom-system" },
    trust: "Scoped and priced in a proposal before we build",
    link: { label: "Compare all packages", href: "/services/business-packages" },
    footnote:
      "Final pricing, timeline, features, integrations, and support depend on project scope and the agreed proposal.",
  },
};
