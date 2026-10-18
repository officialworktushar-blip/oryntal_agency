import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import { Brain, Code2, Network, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Detailed services: Web/App Development, AI Automation (RAG, Chatbots, Voice AI), API Integrations, and Business Sourcing Support.",
};

const servicesList = [
  {
    title: "Web/App Development",
    description:
      "Custom websites and scalable web applications built for performance, accessibility, and future growth.",
    icon: Code2,
    features: [
      "Custom web portals and SaaS apps",
      "Responsive UX/UI with design systems",
      "Performance optimization & accessibility",
      "Admin dashboards & role-based access",
    ],
    assetTitle: "Web/App architecture & tech stack",
    assetDesc:
      "Visual of frontend, backend, database, and deployment layers with the technology stack for your solution.",
  },
  {
    title: "AI Automation (RAG, Chatbots, Voice AI)",
    description:
      "Deploy intelligent agents that retrieve context, converse naturally, and handle calls across languages.",
    icon: Brain,
    features: [
      "Retrieval-Augmented Generation (RAG) pipelines",
      "AI chatbots trained on your knowledge base",
      "Voice AI agents (inbound/outbound)",
      "Multi-lingual support (Hindi, English, Telugu)",
      "Human-in-the-loop & guardrails",
    ],
    assetTitle: "RAG model flow & AI agent architecture",
    assetDesc:
      "Diagram showing ingestion, embeddings, vector store, retrieval, LLM orchestration, and Voice AI call flow.",
  },
  {
    title: "API Integrations",
    description:
      "Connect CRMs, ERPs, payment gateways, messaging, and custom systems into one reliable, automated workflow.",
    icon: Network,
    features: [
      "Third-party API integration & orchestration",
      "Webhook handling & event-driven flows",
      "Authentication, retries & error handling",
      "Data mapping, sync jobs & monitoring",
    ],
    assetTitle: "API connection map",
    assetDesc:
      "Architecture diagram showing endpoints, connectors, middleware, and data flow between integrated systems.",
  },
  {
    title: "Business Sourcing Support",
    description:
      "Operational support to help you identify, qualify, and streamline sourcing workflows and processes.",
    icon: Search,
    features: [
      "Process mapping & SOP documentation",
      "Lead qualification & workflow automation",
      "CRM setup, tracking & reporting",
      "Vendor/onboarding workflow design",
    ],
    assetTitle: "Business sourcing process map",
    assetDesc:
      "Flow diagram showing intake, qualification, routing, and tracking for your sourcing operations.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Technology that fits how your business actually works"
        description="From development to AI automation and integrations, each service is designed to connect seamlessly with the rest of your stack."
      >
        <Link href="/contact" className="btn-primary">
          Book Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/packages" className="btn-secondary">
          View Packages
        </Link>
      </PageHeader>

      <section className="container-x py-16 lg:py-20">
        <div className="space-y-12">
          {servicesList.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-wash text-brand">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 text-xl font-bold text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-primary">
                      Discuss This Service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/packages" className="btn-secondary">
                      See Relevant Package
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <AssetPlaceholder
                    title={service.assetTitle}
                    description={service.assetDesc}
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
