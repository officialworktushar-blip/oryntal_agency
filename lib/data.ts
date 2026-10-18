import type { LucideIcon } from "lucide-react";
import {
  Search,
  Palette,
  Code2,
  Megaphone,
  Globe,
  LifeBuoy,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "strategy",
    title: "Brand & Growth Strategy",
    description:
      "Positioning, messaging, and a roadmap that points every decision in the same direction.",
    icon: Search,
    features: ["Market & competitor research", "Positioning workshops", "90-day growth roadmap"],
  },
  {
    slug: "design",
    title: "Brand Identity & Design",
    description:
      "A high-contrast, memorable identity system built to feel premium and convert.",
    icon: Palette,
    features: ["Logo & visual system", "Design guidelines", "Marketing collateral"],
  },
  {
    slug: "web",
    title: "Web & Product Development",
    description:
      "Fast, accessible websites and products engineered for performance and scale.",
    icon: Code2,
    features: ["Next.js websites", "Landing pages", "E-commerce builds"],
  },
  {
    slug: "marketing",
    title: "Performance Marketing",
    description:
      "Paid and organic campaigns tuned to acquisition cost and real revenue.",
    icon: Megaphone,
    features: ["Paid search & social", "SEO foundations", "Conversion tracking"],
  },
  {
    slug: "domains",
    title: "Domains, Hosting & Email",
    description:
      "Registration, migration, DNS, and managed hosting handled end to end.",
    icon: Globe,
    features: ["Domain registration & transfer", "DNS & email setup", "Managed hosting"],
  },
  {
    slug: "support",
    title: "Ongoing Care & Support",
    description:
      "A responsive team keeping your site, campaigns, and infrastructure healthy.",
    icon: LifeBuoy,
    features: ["Maintenance plans", "Monitoring & backups", "Priority support"],
  },
];

export type Package = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  includes: string[];
  features: string[];
  highlighted?: boolean;
  idealFor: string;
};

export const packages: Package[] = [
  {
    id: "digital-foundation",
    name: "Digital Foundation Package",
    price: "₹30,000",
    cadence: "one-time",
    tagline: "A credible, conversion-ready digital presence for growing businesses.",
    idealFor: "Local businesses, service providers, and new ventures",
    includes: [
      "Pro Website",
      "Lead Generation Setup",
      "WhatsApp Integration",
    ],
    features: [
      "Fully responsive website with modern UX",
      "SEO-friendly structure & technical basics",
      "Lead capture & enquiry routing",
      "WhatsApp automation-ready setup",
    ],
  },
  {
    id: "automation",
    name: "Business Automation Package",
    price: "₹70,000",
    cadence: "one-time",
    tagline: "Automate everyday workflows so your team can focus on growth.",
    idealFor: "Businesses handling orders, enquiries, or bookings at scale",
    includes: [
      "Custom Web",
      "UX/UI Design",
      "Payment Gateway",
      "Order Automation",
      "AI Chatbots",
    ],
    features: [
      "Custom web platform tailored to your workflow",
      "Streamlined UX/UI across all screens",
      "Secure payment gateway integration",
      "Order & enquiry automation",
      "AI chatbot trained on your business FAQs",
      "Testing & handover documentation",
    ],
    highlighted: true,
  },
  {
    id: "premium-custom",
    name: "Premium Custom System",
    price: "₹3,00,000 – ₹4,00,000",
    cadence: "project-based",
    tagline: "Fully custom applications and multi-agent AI systems built around your operations.",
    idealFor: "Teams with complex workflows that need tailored software",
    includes: ["Custom Apps", "Multi-Agent Systems"],
    features: [
      "End-to-end custom application development",
      "Multi-agent AI (RAG, voice, and workflow agents)",
      "Role-based access & data workflows",
      "System integrations & secure APIs",
      "Extensive testing & phased rollout",
      "Post-launch support plan tailored to scope",
    ],
  },
];

export type Product = {
  name: string;
  category: string;
  description: string;
  price: string;
};

export const products: Product[] = [
  {
    name: "OrynSite",
    category: "Website Template",
    description:
      "A conversion-ready Next.js marketing template with editable sections and CMS hooks.",
    price: "$149",
  },
  {
    name: "BrandGrid",
    category: "Design Kit",
    description:
      "A Figma design system with tokens, components, and 40+ ready-made sections.",
    price: "$89",
  },
  {
    name: "LocalRank",
    category: "SEO Toolkit",
    description:
      "Audit, track, and prioritize local search opportunities from a single dashboard.",
    price: "$29/mo",
  },
  {
    name: "CampaignPilot",
    category: "Ad Automation",
    description:
      "Automated budget pacing and creative rotation across paid channels.",
    price: "$59/mo",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We learn your business, audience, and goals, then audit what already works.",
  },
  {
    step: "02",
    title: "Orient",
    description:
      "We define positioning, priorities, and a roadmap that everyone agrees on.",
  },
  {
    step: "03",
    title: "Create",
    description:
      "Design, development, and campaigns ship in focused, reviewable sprints.",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "We measure results, iterate quickly, and scale what performs best.",
  },
];
