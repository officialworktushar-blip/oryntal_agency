import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  Bot,
  Workflow,
  Plug,
  Package,
  Boxes,
  Search,
  ShieldCheck,
  Database,
  LineChart,
  Users,
  Hammer,
  MessageSquare,
  Rocket,
  FileScan,
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
        href: "/services/business-packages#digital-foundation",
        label: "Digital Foundation",
        description: "Business site with lead capture, live in about 2 weeks.",
        icon: Rocket,
      },
      {
        href: "/services/business-packages#automation",
        label: "Business Automation",
        description: "We connect your tools and automate manual back-office work.",
        icon: Workflow,
      },
      {
        href: "/services/business-packages#premium-custom",
        label: "Premium Custom System",
        description: "Multi-agent AI and custom apps around your operations.",
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
        href: "/services/individual-services#websites",
        label: "Websites & Web Apps",
        description: "Landing pages, company sites, portals, and dashboards.",
        icon: Globe,
      },
      {
        href: "/services/individual-services#ai",
        label: "AI Systems & Assistants",
        description: "Chat assistants, document AI, and workflow copilots.",
        icon: Bot,
      },
      {
        href: "/services/individual-services#automation",
        label: "Automation & Integrations",
        description: "Connect forms, CRM, WhatsApp, email, and billing.",
        icon: Plug,
      },
      {
        href: "/services/individual-services#mobile",
        label: "Mobile Apps",
        description: "Cross-platform apps for Android and iOS.",
        icon: Smartphone,
      },
      {
        href: "/services/individual-services#cloud",
        label: "Cloud & DevOps",
        description: "Cloud deployment, environments, and monitoring.",
        icon: Cloud,
      },
      {
        href: "/services/individual-services#sourcing",
        label: "IT Staff Sourcing",
        description: "Vetted engineers embedded in your team.",
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
        href: "/services/products#crm",
        label: "CRM & Client Management",
        description: "Leads, pipelines, and client records in one place.",
        icon: Database,
      },
      {
        href: "/services/products#erp",
        label: "ERP & Operations",
        description: "Orders, inventory, and team workflows.",
        icon: Boxes,
      },
      {
        href: "/services/products#document-ai",
        label: "AI Document Processing",
        description: "Extract data from invoices, forms, and PDFs.",
        icon: FileScan,
      },
      {
        href: "/services/products#voice-ai",
        label: "Voice AI Reception",
        description: "Answers calls, qualifies leads, books appointments.",
        icon: Cpu,
      },
      {
        href: "/services/products#website-kit",
        label: "Website & E-commerce Kit",
        description: "Storefront, catalogue, and payment-ready site.",
        icon: Package,
      },
      {
        href: "/services/products#custom",
        label: "Custom Model Adaptation",
        description: "We adapt an existing model to your data and process.",
        icon: Hammer,
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
        href: "/services/consultation#discovery",
        label: "Discovery Workshops",
        description: "Map processes, constraints, and opportunities.",
        icon: Search,
      },
      {
        href: "/services/consultation#strategy",
        label: "Technology Strategy",
        description: "What to build, buy, or automate first.",
        icon: LineChart,
      },
      {
        href: "/services/consultation#build",
        label: "Custom Development",
        description: "Bespoke systems built to your process.",
        icon: Hammer,
      },
      {
        href: "/services/consultation#security",
        label: "Security & Compliance Review",
        description: "Access, data handling, and vendor review.",
        icon: ShieldCheck,
      },
      {
        href: "/services/consultation#support",
        label: "Ongoing Support & Improvement",
        description: "Post-launch iteration and maintenance.",
        icon: MessageSquare,
      },
    ],
  },
];
