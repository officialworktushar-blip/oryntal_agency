import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CalendarRange,
  FileText,
  Globe,
  LineChart,
  Plug,
  QrCode,
  Rocket,
  Users,
  Workflow,
} from "lucide-react";

export type NavMenuItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavMenuDomain = {
  id: string;
  number: string;
  label: string;
  items: NavMenuItem[];
};

export const menuDomains: NavMenuDomain[] = [
  {
    id: "business-packages",
    number: "01",
    label: "Business Packages",
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
        href: "/services/individual-services/business-operations-and-sourcing-support",
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
    items: [
      {
        href: "/services/individual-services/qr2-review",
        label: "QR2 Review",
        description: "Review collection and reputation system.",
        icon: QrCode,
      },
    ],
  },
  {
    id: "consultation",
    number: "04",
    label: "Custom Business Consultation & Development",
    items: [
      {
        href: "/services/consultation/three-month-engagement",
        label: "Three-Month Engagement",
        description: "Discovery to launch with one dedicated team.",
        icon: CalendarRange,
      },
      {
        href: "/services/custom-proposal",
        label: "Custom Proposal",
        description: "Scope and price around your requirements.",
        icon: FileText,
      },
    ],
  },
];
