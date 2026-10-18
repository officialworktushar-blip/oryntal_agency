export type HowItWorksBullet = string;

export type HowItWorksTab = {
  id: "build" | "launch" | "grow" | "manage";
  label: string;
  step: string;
  title: string;
  description: string;
  bullets: HowItWorksBullet[];
  cta: {
    label: string;
    href: string;
  };
  media: {
    label: string;
    hint: string;
  };
};

export const howItWorksTabs: HowItWorksTab[] = [
  {
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
  },
  {
    id: "launch",
    label: "Launch",
    step: "Step 2 of 4",
    title: "Go live with payments, messaging, and logistics connected.",
    description:
      "We connect the services your business depends on, test the major workflows, and prepare everything for deployment or handover.",
    bullets: [
      "Payment gateway integration",
      "WhatsApp and automated notifications",
      "Shipping and delivery integrations",
      "SSL/HTTPS and essential security",
      "Testing and refinement before handover",
    ],
    cta: {
      label: "View business packages",
      href: "/services/business-packages",
    },
    media: {
      label:
        "Add: 20-30s video of a live order flow: payment, WhatsApp confirmation, shipping update (MP4 1280x720, muted loop)",
      hint: "Show: checkout, notification, dispatch.",
    },
  },
  {
    id: "grow",
    label: "Grow",
    step: "Step 3 of 4",
    title: "Capture leads and cut the repetitive work.",
    description:
      "Lead capture, AI agents, chatbots, and workflow automation handle routine tasks so your team can focus on customers and growth.",
    bullets: [
      "Lead capture forms and WhatsApp integration",
      "AI agents and chatbots",
      "Order and workflow automation",
      "QR2 Review for customer feedback (for eligible clients)",
      "Supplier and sourcing connections where suitable",
    ],
    cta: {
      label: "Explore AI and automation",
      href: "/services/individual-services",
    },
    media: {
      label:
        "Add: 20-30s video of an AI chatbot or agent handling a customer enquiry (MP4 1280x720, muted loop)",
      hint: "Show: chatbot conversation, lead captured, automation running.",
    },
  },
  {
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
  },
];
