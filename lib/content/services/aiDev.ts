import type { LucideIcon } from "lucide-react";
import {
  MessagesSquare,
  Mic,
  BookOpen,
  BookOpenCheck,
  Brain,
  Eye,
  PackageCheck,
  PenTool,
  Target,
  Workflow,
} from "lucide-react";

export type AiDevStat = {
  caption: string;
  value: number | string;
  valueType: "count" | "text";
  label: string;
};

export type AiDevCta = {
  label: string;
  href: string;
};

export type AiDevBuildItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  caption: string;
  topic: string;
};

export type AiDevVisual = {
  idleCaption: string;
  centreLabel: string;
  srCaption: string;
};

export type AiDevTools = {
  headingLine1: string;
  headingLine2: string;
  sub: string;
  rowALabel: string;
  rowBLabel: string;
  note: string;
  cta: AiDevCta;
  trust: string;
};

export type AiDevAssistant = {
  id: string;
  name: string;
  outcome: string;
  tags: [string, string];
  bg: string;
  shotLabel: string;
  alt: string;
  icon: LucideIcon;
  link: string;
  /** Real 1:1 image; the designed placeholder renders until this is set. */
  src?: string;
};

export type AiDevAssistants = {
  subscription: { enabled: boolean; chip: string; availabilityTag: string };
  eyebrow: string;
  eyebrowCustom: string;
  heading: string;
  headingCustom: string;
  sub: string;
  subCustom: string;
  note: string;
  noteCustom: string;
  linkCustom: string;
  shotHint: string;
  cta: AiDevCta;
  trust: string;
  items: AiDevAssistant[];
};

export type AiDevContent = {
  eyebrow: string;
  h1: string;
  sub: string;
  primaryCta: AiDevCta;
  secondaryCta: AiDevCta;
  trust: string;
  pricingNote: string;
  build: AiDevBuildItem[];
  services: string[];
  marquee: string[];
  visual: AiDevVisual;
  footnote: string;
  srSummary: string;
  tools: AiDevTools;
  assistants: AiDevAssistants;
};

const build: AiDevBuildItem[] = [
  {
    id: "chatbots",
    label: "Chatbots and chat agents",
    icon: MessagesSquare,
    title: "Chatbots",
    caption: "Answers your customers instantly, around the clock.",
    topic: "chatbots",
  },
  {
    id: "voice",
    label: "Voice AI and voice agents",
    icon: Mic,
    title: "Voice AI",
    caption: "Talks to your customers on the phone, in a natural voice.",
    topic: "voice-ai",
  },
  {
    id: "rag",
    label: "RAG systems",
    icon: BookOpen,
    title: "RAG",
    caption: "Answers from your own documents and data, not guesses.",
    topic: "rag",
  },
  {
    id: "llm",
    label: "Custom LLM solutions",
    icon: Brain,
    title: "Custom LLMs",
    caption: "Language models shaped around your business and tasks.",
    topic: "custom-llm",
  },
  {
    id: "vision",
    label: "Computer vision solutions",
    icon: Eye,
    title: "Computer vision",
    caption: "Software that understands images and video for you.",
    topic: "computer-vision",
  },
  {
    id: "workflow",
    label: "AI workflow automation",
    icon: Workflow,
    title: "Automation",
    caption: "Repetitive steps run themselves, with AI making the calls.",
    topic: "ai-automation",
  },
];

const services = [
  "AI workflow automation",
  "Custom AI agents and business multi-agent systems",
  "Chatbots and chat agents",
  "Voice AI and voice agents",
  "Retrieval-Augmented Generation (RAG) systems",
  "Custom LLM solutions",
  "Model fine-tuning",
  "Computer vision solutions",
  "AI-powered business workflows",
];

const marquee = [
  "Answer customers with an AI chatbot",
  "Handle calls with a voice agent",
  "Automate a workflow",
  "Build a custom AI agent",
  "Search your own documents with RAG",
  "Create a custom LLM",
  "Fine-tune a model on your data",
  "Add computer vision to your product",
  "Power your business with AI workflows",
];

// Replace each placeholder with a real 1:1 image via src. Do not invent client names, results, or prices.
const assistantItems: AiDevAssistant[] = [
  {
    id: "support",
    name: "Customer Support Assistant",
    outcome: "Answers customer questions instantly on your website and WhatsApp.",
    tags: ["Chatbot", "Always on"],
    bg: "#EDE9FF",
    shotLabel: "Add: 1:1 illustration or UI of a support chat answering a customer (1000x1000)",
    alt: "Customer support AI assistant",
    icon: MessagesSquare,
    link: "Ask about this assistant",
  },
  {
    id: "sales",
    name: "Sales & Lead Assistant",
    outcome: "Greets new leads, asks the right questions, and follows up for you.",
    tags: ["AI agent", "Lead follow-up"],
    bg: "#E3F1FF",
    shotLabel: "Add: 1:1 illustration or UI of a lead being qualified in chat (1000x1000)",
    alt: "Sales and lead AI assistant",
    icon: Target,
    link: "Ask about this assistant",
  },
  {
    id: "voice",
    name: "Voice Receptionist",
    outcome: "Picks up calls, answers common questions, and passes on what matters.",
    tags: ["Voice AI", "Phone"],
    bg: "#FFEFE3",
    shotLabel: "Add: 1:1 illustration or UI of a voice assistant answering a call (1000x1000)",
    alt: "Voice AI receptionist",
    icon: Mic,
    link: "Ask about this assistant",
  },
  {
    id: "knowledge",
    name: "Knowledge Assistant",
    outcome: "Answers from your own documents and data, so replies match your business.",
    tags: ["RAG", "Your data"],
    bg: "#E6F6EC",
    shotLabel: "Add: 1:1 illustration or UI of an assistant citing a company document (1000x1000)",
    alt: "Knowledge AI assistant using your documents",
    icon: BookOpenCheck,
    link: "Ask about this assistant",
  },
  {
    id: "orders",
    name: "Order & Delivery Assistant",
    outcome: "Keeps customers updated on orders, payments, and shipping automatically.",
    tags: ["Automation", "Updates"],
    bg: "#FFF4D6",
    shotLabel: "Add: 1:1 illustration or UI of order and shipping updates (1000x1000)",
    alt: "Order and delivery AI assistant",
    icon: PackageCheck,
    link: "Ask about this assistant",
  },
  {
    id: "marketing",
    name: "Content & Marketing Assistant",
    outcome: "Drafts posts, emails, and replies in your brand's voice, ready for your review.",
    tags: ["Custom LLM", "Brand voice"],
    bg: "#FCE7F3",
    shotLabel: "Add: 1:1 illustration or UI of an assistant drafting content (1000x1000)",
    alt: "Content and marketing AI assistant",
    icon: PenTool,
    link: "Ask about this assistant",
  },
  {
    id: "operations",
    name: "Operations Assistant",
    outcome: "Handles routine admin steps and keeps your workflows moving.",
    tags: ["AI workflows", "Back office"],
    bg: "#E8EAF0",
    shotLabel: "Add: 1:1 illustration or UI of an assistant handling routine tasks (1000x1000)",
    alt: "Operations AI assistant",
    icon: Workflow,
    link: "Ask about this assistant",
  },
];

export const aiDev: AiDevContent = {
  eyebrow: "AI Development & Automation",
  h1: "AI that works for your business, not the other way around.",
  sub: "From chatbots and voice agents to custom AI systems and automated workflows, we build AI around your business and the way your team works.",
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=ai-development-and-automation",
  },
  secondaryCta: {
    label: "See what we build",
    href: "#what-we-build",
  },
  trust: "Scoped and priced in a proposal before we build",
  pricingNote: "No fixed price: every AI project is quoted on your scope.",
  build,
  services,
  marquee,
  visual: {
    idleCaption: "Pick a capability",
    centreLabel: "Your business",
    srCaption: "Illustrative diagram of AI capabilities connected to your business.",
  },
  footnote: "Scope, features, timeline, and pricing are agreed in your proposal. Third-party AI and API usage, if any, may carry separate provider fees.",
  srSummary: "ORYNTAL builds AI workflow automation, custom AI agents and multi-agent systems, chatbots, voice agents, retrieval-augmented generation systems, custom LLM solutions, model fine-tuning, computer vision solutions, and AI-powered business workflows.",
  tools: {
    headingLine1: "AI that works with",
    headingLine2: "the tools your business already uses",
    sub: "We connect AI agents, chatbots, and workflows to your messaging, payments, CRM, data, and AI platforms, so every step can use them.",
    rowALabel: "Apps your business runs on",
    rowBLabel: "AI and automation platforms",
    note: "Examples of tools AI agents commonly connect with. Specific integrations depend on the agreed scope, compatibility, account access, and service availability. Third-party and API usage fees may be separate. Logos belong to their respective owners and do not imply endorsement.",
    cta: {
      label: "Ask about your tools",
      href: "/contact?interest=ai-development-and-automation&topic=integrations",
    },
    trust: "Tell us your stack and we'll map what can connect",
  },
  assistants: {
    // CONFIRM: monthly subscription is not in the service document. Keep enabled only if it is genuinely offered.
    subscription: {
      enabled: true,
      chip: "Monthly subscription",
      availabilityTag: "Availability on request",
    },
    eyebrow: "AI ASSISTANTS",
    eyebrowCustom: "AI ASSISTANTS, BUILT FOR YOU",
    heading: "Ready-to-run AI assistants, on a monthly plan",
    headingCustom: "AI assistants, tailored to how you work",
    sub: "Pick the assistant your business needs and we tailor it to how you work. Billed monthly.",
    subCustom: "Tell us which assistant your business needs and we build and tailor it around how you work.",
    note: "Monthly plans, pricing, and availability are confirmed with the ORYNTAL team and set out in your proposal. Specific features and integrations depend on the agreed scope. Third-party and AI usage fees, if any, may be separate.",
    noteCustom: "Pricing and availability are confirmed with the ORYNTAL team and set out in your proposal. Specific features and integrations depend on the agreed scope. Third-party and AI usage fees, if any, may be separate.",
    linkCustom: "Talk about this assistant",
    shotHint: "Replace with a real 1:1 image. Keep key content centred.",
    cta: {
      label: "Talk to us about an assistant",
      href: "/contact?interest=ai-development-and-automation&topic=assistant",
    },
    trust: "Scoped and priced in a proposal before we start",
    items: assistantItems,
  },
};

export function getAssistantHref(id: string): string {
  return `${aiDev.assistants.cta.href}&assistant=${encodeURIComponent(id)}`;
}

export function getAiDevTopicLabel(topic: string): string {
  switch (topic) {
    case "chatbots":
      return "a chatbot or chat agent";
    case "voice-ai":
      return "a voice AI agent";
    case "rag":
      return "a RAG system on my own data";
    case "custom-llm":
      return "a custom LLM solution";
    case "computer-vision":
      return "a computer vision solution";
    case "ai-automation":
      return "AI workflow automation";
    default:
      return null as unknown as string;
  }
}
