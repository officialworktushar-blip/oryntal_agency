import {
  Brain,
  Bot,
  Box,
  Cloud,
  Cpu,
  Database,
  Globe,
  Handshake,
  Layers,
  MessageCircle,
  Package,
  Plug,
  QrCode,
  Rocket,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { LogoItem } from "@/components/LogoTile";

export const partnerLogos: LogoItem[] = [
  { name: "NovaRetail", icon: ShoppingBag, accent: "#7C3AED" },
  { name: "BrightCart", icon: Package, accent: "#8B5CF6" },
  { name: "Vertex Foods", icon: Box, accent: "#6D28D9" },
  { name: "Lumina Clinics", icon: Sparkles, accent: "#A78BFA" },
  { name: "Arcline Logistics", icon: Rocket, accent: "#5B21B6" },
  { name: "Sundara Exports", icon: Handshake, accent: "#7C3AED" },
];

export const integrationLogos: LogoItem[] = [
  { name: "WhatsApp API", icon: MessageCircle, accent: "#25D366" },
  { name: "Stripe", icon: Zap, accent: "#635BFF" },
  { name: "Razorpay", icon: Package, accent: "#0C2451" },
  { name: "HubSpot CRM", icon: Users, accent: "#FF7A59" },
  { name: "Meta Ads", icon: Globe, accent: "#0668E1" },
  { name: "n8n", icon: Workflow, accent: "#EA4B71" },
  { name: "OpenAI", icon: Brain, accent: "#10A37F" },
  { name: "AWS", icon: Cloud, accent: "#FF9900" },
];

export const techServices = [
  {
    title: "Web & App Dev",
    icon: Layers,
    description:
      "Fast, accessible web and mobile products built on modern foundations.",
    features: ["React", "Next.js", "Mobile Apps"],
  },
  {
    title: "Advanced AI & Automation",
    icon: Bot,
    description:
      "Intelligent systems that retrieve, reason, and act across your workflows.",
    features: [
      "Custom LLM Fine-tuning",
      "Retrieval-Augmented Generation (RAG) Systems",
      "Multi-Agent Workflows",
      "Voice AI (Hindi / English / Telugu)",
      "n8n Automated Workflows",
    ],
  },
  {
    title: "API & Integrations",
    icon: Plug,
    description:
      "Connect the tools you already use into one reliable, automated system.",
    features: [
      "GraphQL / RESTful APIs",
      "Custom Webhooks",
      "Advanced CRM Sync",
      "Database Architecture",
    ],
  },
  {
    title: "Business Sourcing",
    icon: Database,
    description:
      "Operational support to streamline sourcing and fulfilment workflows.",
    features: ["Logistics integrations", "Packaging contacts"],
  },
];

export const productsSpotlight = [
  {
    title: "QR2 Review",
    tagline: "QR-code review collection",
    icon: QrCode,
    description:
      "Capture verified reviews in seconds. Complimentary for eligible clients.",
    complimentary: true,
  },
  {
    title: "Client Database & Call-Handling System",
    tagline: "Centralised pipeline",
    icon: Users,
    description:
      "Manage leads, clients, and every conversation from one secure system.",
    complimentary: false,
  },
  {
    title: "Industry-Specific Recommendation Engine",
    tagline: "Personalised recommendations",
    icon: Cpu,
    description:
      "Deliver the right product, service, or partner at the right time.",
    complimentary: false,
  },
];

export const engagementMonths = [
  {
    month: "Month 1",
    title: "Understanding & Planning",
    points: [
      "Business Understanding",
      "Bottleneck Identification",
      "Architecture Planning",
    ],
  },
  {
    month: "Month 2",
    title: "Development & Build",
    points: [
      "Custom AI Models",
      "Web Apps",
      "Admin Dashboards",
    ],
  },
  {
    month: "Month 3",
    title: "Testing & Deployment",
    points: ["Testing", "Integration", "Final Deployment"],
  },
];
