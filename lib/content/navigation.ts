import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  CalendarRange,
  ClipboardCheck,
  Database,
  FileText,
  Globe,
  LineChart,
  Plug,
  QrCode,
  Rocket,
  Users,
  Workflow,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavDomain = {
  id: "business-packages" | "individual-services" | "products" | "consultation";
  number: string;
  label: string;
  /** Domain-level page; only for the domain title / "View all" links. */
  href: string;
  summary: string;
  items: NavItem[];
};

export const domains: NavDomain[] = [
  {
    id: "business-packages",
    number: "01",
    label: "Business Packages",
    href: "/services/business-packages",
    summary:
      "Fixed-scope, ready-to-launch packages for the most common business needs.",
    items: [
      {
        href: "/services/business-packages/digital-foundation",
        label: "Digital Foundation Package",
        description: "₹30,000",
        icon: Rocket,
      },
      {
        href: "/services/business-packages/business-automation",
        label: "Business Automation Package",
        description: "₹70,000",
        icon: Workflow,
      },
      {
        href: "/services/business-packages/premium-custom-system",
        label: "Premium Custom Business System",
        description: "₹3,00,000–₹4,00,000",
        icon: LineChart,
      },
    ],
  },
  {
    id: "individual-services",
    number: "02",
    label: "Individual Technology Services",
    href: "/services/individual-services",
    summary:
      "Hire ORYNTAL for a single capability instead of a full engagement.",
    items: [
      {
        href: "/services/individual-services/website-and-app-development",
        label: "Website & Application Development",
        description: "Landing pages, company sites, portals, and apps.",
        icon: Globe,
      },
      {
        href: "/services/individual-services/ai-development-and-automation",
        label: "AI Development & Automation",
        description: "Assistants, document AI, and workflow automation.",
        icon: Bot,
      },
      {
        href: "/services/individual-services/software-api-and-system-integration",
        label: "Software, API & System Integration",
        description: "Connect CRM, payments, WhatsApp, and internal tools.",
        icon: Plug,
      },
      {
        // TODO: its own page is not built yet
        href: "/services/individual-services",
        label: "Business Operations & Sourcing Support",
        description: "Vetted engineers and back-office operations support.",
        icon: Users,
      },
    ],
  },
  {
    id: "products",
    number: "03",
    label: "Pre-Built Products & AI Models",
    href: "/services/products",
    summary:
      "Ready-made systems we can adapt to your business instead of building from scratch.",
    items: [
      {
        href: "/services/products",
        label: "QR2 Review",
        description: "Review collection and reputation system.",
        icon: QrCode,
      },
      {
        href: "/services/products",
        label: "Client Database & Call-Handling System",
        description: "Shared inbox, call logging, and client records.",
        icon: Database,
      },
      {
        href: "/services/products",
        label: "Industry-Specific Recommendation System",
        description: "A recommendation engine tuned to your catalogue.",
        icon: Brain,
      },
    ],
  },
  {
    id: "consultation",
    number: "04",
    label: "Custom Business Consultation & Development",
    href: "/services/consultation",
    summary:
      "When your problem is not a package: a 3-month engagement, discovery to launch.",
    items: [
      {
        href: "/services/consultation",
        label: "Three-Month Engagement",
        description: "Discovery to launch with one dedicated team.",
        icon: CalendarRange,
      },
      {
        href: "/services/consultation",
        label: "Business & Systems Evaluation",
        description: "Audit of processes, tools, and opportunities.",
        icon: ClipboardCheck,
      },
      {
        href: "/services/consultation",
        label: "Custom Proposal",
        description: "Scope and price after a free consultation.",
        icon: FileText,
      },
    ],
  },
];
