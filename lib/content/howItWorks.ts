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
  layout?: "typing-stack" | "browser-showcase" | "accordion-bars";
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
  /** Optional muted loop shown in the stage media frame when a src exists. */
  videoSrc?: string;
  posterSrc?: string;
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

/** One tall card of the Manage tab — a "prompt + answer" example. */
export type ManageCard = {
  id: string;
  title: string;
  sub: string;
  user: string;
  assistantIntro: string;
  assistantItems: string[];
  badge?: string;
};

/** Manage tab — dark purple band with a horizontal accordion of tall cards. */
export type ManageAccordionTab = HowItWorksTab & {
  id: "manage";
  layout: "accordion-bars";
  keywordLine: string;
  disclaimer: string;
  cards: ManageCard[];
};

export const buildTab: HowItWorksTab = {
  id: "build",
  label: "Build",
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
      mediaSrc: "/grow/grow1.webp",
      media: {
        label:
          "Add: WhatsApp chat UI mockup, customer enquiry answered automatically (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Build an AI agent that follows up with new leads automatically.",
      alt: "AI agent following up with new business leads",
      mediaSrc: "/grow/grow2.webp",
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
      mediaSrc: "/grow/grow3.webp",
      media: {
        label:
          "Add: order automation flow mockup: order, payment, shipping update (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Add a QR code so happy customers can leave a review in seconds.",
      alt: "Customer scanning a QR code to leave a review",
      mediaSrc: "/grow/grow4.webp",
      media: {
        label:
          "Add: phone mockup scanning a QR code to open a review page (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
    {
      prompt: "Help me find suppliers and wholesale partners for my products.",
      alt: "Business sourcing suppliers and wholesale partners",
      mediaSrc: "/grow/grow5.webp",
      media: {
        label:
          "Add: sourcing visual: packaging, products, logistics (landscape 3:2, 1200x800)",
        hint: "Replace with a real screenshot or photo; keep the key content in the centre.",
      },
    },
  ],
};

export const manageTab: ManageAccordionTab = {
  id: "manage",
  label: "Manage",
  layout: "accordion-bars",
  title: "Scattered tools don't run a business. One system does.",
  description:
    "Orders in one app, clients in a spreadsheet, conversations on a phone. ORYNTAL connects them into dashboards, admin panels, and databases you can actually run the business from.",
  cta: {
    label: "Talk about a custom system",
    href: "/services/consultation",
  },
  keywordLine:
    "Admin dashboards · Databases · Analytics & BI · CRM integrations · Workflow automation",
  disclaimer:
    "Illustrative examples of what an ORYNTAL-built system can do. Exact capabilities are defined in your agreed scope.",
  cards: [
    {
      id: "orders",
      title: "Track every order",
      sub: "See new orders, payment status, and shipping progress in one dashboard instead of five tabs.",
      user: "Show me today's orders that are paid but not yet shipped.",
      assistantIntro: "Sure thing, I'll pull up:",
      assistantItems: [
        "Paid orders",
        "Pending dispatch",
        "Shipping updates to send",
      ],
    },
    {
      id: "clients",
      title: "Know every client",
      sub: "Keep client records, conversations, and follow-ups organised so nothing slips through the cracks.",
      badge: "Client Database & Call-Handling: in development",
      user: "Which clients haven't heard from us in a while?",
      assistantIntro: "Of course, I'd check:",
      assistantItems: [
        "Last contact date",
        "Open follow-ups",
        "Clients worth re-engaging",
      ],
    },
    {
      id: "numbers",
      title: "Read your numbers",
      sub: "Turn scattered data into analytics and reports you can use to make decisions.",
      user: "Which products are selling best this month?",
      assistantIntro: "Sure thing, I'll compare:",
      assistantItems: [
        "Sales by product",
        "Repeat customers",
        "Trends worth acting on",
      ],
    },
    {
      id: "team",
      title: "Control who sees what",
      sub: "Custom admin and user panels give every person the right view and the right permissions.",
      user: "Give my packing team access to orders only.",
      assistantIntro: "Got it, I'd set up:",
      assistantItems: [
        "A role for the packing team",
        "Access to orders only",
        "Admin-only settings",
      ],
    },
    {
      id: "connect",
      title: "Connect your tools",
      sub: "APIs, CRM, WhatsApp, payments, and databases working together as one workflow.",
      user: "Add new website leads to my CRM and alert me on WhatsApp.",
      assistantIntro: "Sure thing, the workflow would:",
      assistantItems: [
        "Capture the lead",
        "Add it to your CRM",
        "Send you a WhatsApp alert",
      ],
    },
  ],
};
