export interface ContactFormOption {
  id: string;
  label: string;
  hint: string;
}

export interface ContactFormGroup {
  title?: string;
  options: ContactFormOption[];
}

export type ContactFormIcon = "Package" | "Layers" | "Boxes" | "Compass";

export interface ContactFormDomain {
  id: string;
  label: string;
  tagline: string;
  icon: ContactFormIcon;
  interest: string;
  groups: ContactFormGroup[];
  allowMultiple: boolean;
}

export interface ContactFormFieldCopy {
  label: string;
  placeholder: string;
}

export interface ContactFormFields {
  name: ContactFormFieldCopy;
  business: ContactFormFieldCopy;
  email: ContactFormFieldCopy;
  phone: ContactFormFieldCopy;
  message: ContactFormFieldCopy;
  emi: { label: string };
  consent: { label: string };
}

export interface ContactForm {
  eyebrow: string;
  heading: string;
  sub: string;
  steps: [string, string, string];
  domains: ContactFormDomain[];
  fields: ContactFormFields;
  buttons: { next: string; back: string; send: string };
  success: { title: string; text: string };
  reassurance: string;
  srSummary: string;
}

export const contactForm: ContactForm = {
  eyebrow: "TELL US WHAT YOU NEED",
  heading: "A simple form. Three quick steps.",
  sub: "Choose what you're interested in, add your details, and we'll reply within one business day with a clear next step.",
  steps: ["What are you looking for?", "Pick what fits", "Your details"],
  domains: [
    {
      id: "packages",
      label: "Business Packages",
      tagline: "Ready-made bundles for every stage of your business",
      icon: "Package",
      interest: "business-packages",
      allowMultiple: false,
      groups: [
        {
          options: [
            {
              id: "digital-foundation",
              label: "Digital Foundation Package",
              hint: "A professional website, lead capture, WhatsApp and the essentials",
            },
            {
              id: "business-automation",
              label: "Business Automation Package",
              hint: "Payments, orders, shipping and notifications, connected",
            },
            {
              id: "premium-custom-system",
              label: "Premium Custom Business System",
              hint: "A tailored platform with advanced AI and integrations",
            },
          ],
        },
      ],
    },
    {
      id: "individual",
      label: "Individual Services",
      tagline: "Pick only the services you need",
      icon: "Layers",
      interest: "individual-services",
      allowMultiple: true,
      groups: [
        {
          title: "Website & Application Development",
          options: [
            {
              id: "websites",
              label: "Business websites & landing pages",
              hint: "A professional site for your business",
            },
            {
              id: "ecommerce",
              label: "E-commerce websites",
              hint: "An online store built around your products",
            },
            {
              id: "web-app",
              label: "Web applications",
              hint: "Software that runs in the browser",
            },
            {
              id: "mobile-app",
              label: "Android & iOS apps",
              hint: "Mobile apps for both platforms",
            },
            {
              id: "saas",
              label: "SaaS product development",
              hint: "Turn your idea into a product",
            },
            {
              id: "portals",
              label: "Portals, dashboards & admin panels",
              hint: "Secure spaces for customers and teams",
            },
            {
              id: "design",
              label: "UI/UX design & prototyping",
              hint: "Design the experience before building",
            },
          ],
        },
        {
          title: "AI Development & Automation",
          options: [
            {
              id: "chatbots",
              label: "Chatbots & chat agents",
              hint: "Answer customers instantly",
            },
            {
              id: "voice-ai",
              label: "Voice AI & voice agents",
              hint: "Handle calls in a natural voice",
            },
            {
              id: "ai-agents",
              label: "Custom AI agents & multi-agent systems",
              hint: "AI that takes on whole tasks",
            },
            {
              id: "rag",
              label: "RAG systems & custom LLMs",
              hint: "Answers from your own data",
            },
            {
              id: "vision-finetune",
              label: "Fine-tuning & computer vision",
              hint: "Models and vision tailored to you",
            },
            {
              id: "ai-automation",
              label: "AI workflow automation",
              hint: "Repetitive steps run themselves",
            },
          ],
        },
        {
          title: "Software, API & System Integration",
          options: [
            {
              id: "apis",
              label: "API development & integration",
              hint: "Connect your apps and platforms",
            },
            {
              id: "payments",
              label: "Payment gateway integration",
              hint: "Accept payments online",
            },
            {
              id: "comms",
              label: "WhatsApp & communication integrations",
              hint: "Reach customers on their channels",
            },
            {
              id: "crm",
              label: "CRM integrations",
              hint: "Keep every lead and customer in one place",
            },
            {
              id: "data",
              label: "Database & data sheet management",
              hint: "One organised home for your data",
            },
            {
              id: "insights",
              label: "Analytics & business intelligence",
              hint: "See your numbers in one view",
            },
          ],
        },
        {
          title: "Business Operations & Sourcing Support",
          options: [
            {
              id: "sourcing-partners",
              label: "Sourcing partners & supplier connections",
              hint: "Find the right partners, where suitable",
            },
            {
              id: "packaging",
              label: "Packaging guidance",
              hint: "Information and guidance on packaging",
            },
            {
              id: "logistics",
              label: "Delivery & logistics integration guidance",
              hint: "Set up delivery without the guesswork",
            },
          ],
        },
      ],
    },
    {
      id: "products",
      label: "Pre-Built Products & AI Models",
      tagline: "Ready-to-use products",
      icon: "Boxes",
      interest: "pre-built-products",
      allowMultiple: true,
      groups: [
        {
          options: [
            {
              id: "qr2-review",
              label: "QR2 Review",
              hint: "Collect customer reviews with a QR scan",
            },
            {
              id: "client-database",
              label: "Client Database & Call-Handling System",
              hint: "Organise clients and call workflows (in development)",
            },
            {
              id: "recommendation",
              label: "Industry-Specific Recommendation System",
              hint: "Recommendations built around your industry (in development)",
            },
          ],
        },
      ],
    },
    {
      id: "consultation",
      label: "Custom Consultation & Development",
      tagline: "A solution designed around your unique operations",
      icon: "Compass",
      interest: "custom-consultation",
      allowMultiple: true,
      groups: [
        {
          options: [
            {
              id: "three-month-engagement",
              label: "Three-Month Engagement",
              hint: "Understand, build, test and refine, in one plan",
            },
            {
              id: "systems-evaluation",
              label: "Business & Systems Evaluation",
              hint: "Review your workflows and systems",
            },
            {
              id: "custom-proposal",
              label: "Custom Proposal",
              hint: "Scoped and priced around your requirements",
            },
          ],
        },
      ],
    },
  ],
  fields: {
    name: { label: "Full name", placeholder: "Your full name" },
    business: { label: "Business name", placeholder: "Your business name" },
    email: { label: "Email", placeholder: "name@company.com" },
    phone: { label: "Phone number", placeholder: "+91 XXXXX XXXXX" },
    message: {
      label: "Anything else we should know? (optional)",
      placeholder: "Tell us about your goals, timeline, or current setup.",
    },
    emi: { label: "I'm interested in paying by EMI" },
    consent: { label: "I agree to be contacted about my enquiry." },
  },
  buttons: {
    next: "Continue",
    back: "Back",
    send: "Send my request",
  },
  success: {
    title: "Thank you! We've got your request.",
    text: "We'll reply within one business day with a clear next step.",
  },
  reassurance:
    "No commitment. Scope and pricing are agreed in a proposal before we start.",
  srSummary:
    "A three-step enquiry form: choose a service domain, choose the packages or services you are interested in, then share your contact details.",
};
