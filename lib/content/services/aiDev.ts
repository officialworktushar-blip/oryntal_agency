import type { LucideIcon } from "lucide-react";
import {
  MessagesSquare,
  Mic,
  BookOpen,
  Brain,
  Eye,
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
};

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
