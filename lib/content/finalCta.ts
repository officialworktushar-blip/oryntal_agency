export type FinalCtaTabId =
  | "websites"
  | "ai"
  | "automation"
  | "integrations"
  | "sourcing";

export type FinalCtaTab = {
  id: FinalCtaTabId;
  label: string;
  /** Back card -> middle card -> front card. */
  prompts: [string, string, string];
};

export const finalCtaContent = {
  eyebrow: "Book a consultation",
  heading: "Your business is unique. Your system should be too.",
  description:
    "Whether you need a website, an AI agent, or a fully connected system, ORYNTAL starts by understanding how your business runs, then recommends the simplest solution that fits. Tell us where time is being lost, and we'll map the next step with you.",
  primary: { href: "/contact?interest=consultation", label: "Book a consultation" },
  secondary: {
    href: "/services/business-packages",
    label: "View packages",
  },
  secondaryPrefix: "Prefer to compare first? ",
  frontCardLabel: "Services",
  badgeLabel: "Book a consultant, opens the contact page",
};

export const finalCtaTabs: FinalCtaTab[] = [
  {
    id: "websites",
    label: "Websites",
    prompts: [
      "Build a professional website with lead capture",
      "Design an online store for my products",
      "Launch my business online with WhatsApp built in",
    ],
  },
  {
    id: "ai",
    label: "AI",
    prompts: [
      "Answer customer questions with an AI chatbot",
      "Create an AI agent that follows up with new leads",
      "Add a voice agent to handle incoming calls",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    prompts: [
      "Send order and payment updates automatically",
      "Cut the repetitive work in my daily operations",
      "Connect my orders, payments and delivery in one workflow",
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    prompts: [
      "Connect a payment gateway to my website",
      "Sync my leads with my CRM",
      "Link my shipping partner and notify customers on WhatsApp",
    ],
  },
  {
    id: "sourcing",
    label: "Sourcing",
    prompts: [
      "Find suppliers and wholesalers for my products",
      "Get packaging guidance for my business",
      "Set up delivery and logistics for my orders",
    ],
  },
];
