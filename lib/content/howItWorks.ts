export type HowItWorksBullet = string;

export type HowItWorksSlide = {
  prompt: string;
  alt: string;
  badge?: string;
  media: { label: string; hint: string };
  mediaSrc?: string;
};

export type HowItWorksChip = { icon: string; label: string };

export type HowItWorksTab = {
  id: "build" | "launch" | "grow" | "manage";
  label: string;
  step: string;
  layout?: "typing-stack" | "browser-showcase";
  title: string;
  description: string;
  bullets?: HowItWorksBullet[];
  cta: {
    label: string;
    href: string;
  };
  media?: {
    label: string;
    hint: string;
  };
  chipsIntro?: string;
  chips?: HowItWorksChip[];
  slides?: HowItWorksSlide[];
};

/** Grow tab — Hostinger-style typing prompt box over a stacked image deck. */
export type GrowTypingTab = HowItWorksTab & {
  id: "grow";
  layout: "typing-stack";
  chipsIntro: string;
  chips: HowItWorksChip[];
  slides: HowItWorksSlide[];
};

export const buildTab: HowItWorksTab = {
  id: "build",
  label: "Build",
  step: "Step 1 of 4",
  title: "We understand your business, then build around it.",
  description:
    "Before any design or code, we map how your business runs: your processes, stakeholders, and bottlenecks. Then we design and develop the website, app, or system you have agreed on.",
  bullets: [
    "Business discovery, priorities and scope",
    "UX/UI design and prototype",
    "Websites, web apps and mobile apps",
    "Custom admin and user panels",
  ],
  cta: {
    label: "Explore development services",
    href: "/services/individual-services",
  },
  media: {
    label:
      "Add: 20-30s video or screen recording of ORYNTAL designing and building a website or app (MP4 1280x720, muted loop)",
    hint: "Show: UX/UI design, prototype, development.",
  },
};

export const launchTab: HowItWorksTab = {
  id: "launch",
  label: "Launch",
  step: "Step 2 of 4",
  layout: "browser-showcase",
  title: "Launch day shouldn't feel like a leap of faith.",
  description:
    "A good-looking website is not the same as a business that works. Before you go live, we connect payments, WhatsApp updates, and shipping, secure the site, and test every major workflow, so your first customer meets a system that is ready.",
  cta: {
    label: "Explore business packages",
    href: "/services/business-packages",
  },
  keywordLine:
    "Payment gateway · WhatsApp notifications · Shipping integrations · SSL/HTTPS · Pre-launch testing",
  browser: {
    url: "yourbrand.com",
  },
  toasts: [
    { icon: "CreditCard", title: "Payment received", sub: "Gateway connected" },
    {
      icon: "MessageCircle",
      title: "WhatsApp confirmation sent",
      sub: "Automated notification",
    },
    { icon: "Truck", title: "Order dispatched", sub: "Shipping partner notified" },
  ],
  media: {
    label:
      "Add: 20-30s screen recording of a live store/site: customer pays, WhatsApp confirmation arrives, shipping update (MP4 1280x720, muted loop)",
    hint: "Show: checkout, payment success, WhatsApp message, tracking update. Keep key content centred.",
  },
  videoSrc: "",
  posterSrc: "",
} as HowItWorksTab;

export const growTab: GrowTypingTab = {
  id: "grow",
  label: "Grow",
  step: "Step 3 of 4",
  layout: "typing-stack",
  title: "Growth isn't louder marketing. It's fewer missed conversations.",
  description:
    "Every unanswered message and forgotten follow-up is revenue walking away. ORYNTAL builds AI agents, chatbots, and automation that respond instantly, capture every lead, and free your team for the work only people can do.",
  cta: {
    label: "Automate my growth",
    href: "/contact?interest=ai-automation",
  },
  chipsIntro:
    "AI chatbots, WhatsApp automation, lead capture, and order workflows, scoped to your business.",
  chips: [
    { icon: "MessageCircle", label: "WhatsApp" },
    { icon: "Bot", label: "AI agents" },
    { icon: "Workflow", label: "Automation" },
    { icon: "QrCode", label: "Reviews" },
  ],
  slides: [
    {
      prompt:
        "Set up a WhatsApp chatbot that answers customer questions and captures every lead.",
      alt: "WhatsApp chatbot answering a customer enquiry and capturing a lead",
      media: {
        label:
          "Add: WhatsApp chat UI mockup, customer enquiry answered automatically (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Build an AI agent that follows up with new leads automatically.",
      alt: "AI agent following up with new business leads",
      media: {
        label:
          "Add: AI agent conversation or dashboard mockup (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt:
        "Automate order confirmations, payment updates, and shipping notifications.",
      alt: "Automated order, payment and shipping notification workflow",
      media: {
        label:
          "Add: order automation flow mockup: order, payment, shipping update (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Add a QR code so happy customers can leave a review in seconds.",
      alt: "Customer scanning a QR code to leave a review",
      badge: "QR2 Review: complimentary for eligible clients",
      media: {
        label:
          "Add: phone mockup scanning a QR code to open a review page (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Help me find suppliers and wholesale partners for my products.",
      alt: "Business sourcing suppliers and wholesale partners",
      badge: "Through ORYNTAL's available contacts, where suitable",
      media: {
        label:
          "Add: sourcing visual: packaging, products, logistics (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
  ],
};

export const manageTab: HowItWorksTab = {
  id: "manage",
  label: "Manage",
  step: "Step 4 of 4",
  title: "Run everything from one connected workflow.",
  description:
    "Dashboards, admin panels, databases, and integrations keep orders, clients, and data in one place instead of scattered across tools.",
  bullets: [
    "Centralised workflow across your tools",
    "Admin and user dashboards",
    "Databases and data sheet management",
    "Analytics and business intelligence",
    "Client database and call handling (in development)",
  ],
  cta: {
    label: "Talk about a custom system",
    href: "/services/consultation",
  },
  media: {
    label:
      "Add: 20-30s video or screenshot of an ORYNTAL admin dashboard (MP4/PNG 1280x720)",
    hint: "Show: dashboard, orders, client records.",
  },
};

export const howItWorksTabs: HowItWorksTab[] = [
  buildTab,
  launchTab,
  growTab,
  manageTab,
];
