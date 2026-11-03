export type EngagementCta = {
  label: string;
  href: string;
};

export type EngagementStage = {
  id: string;
  month: string;
  title: string;
  caption: string;
  icon: "Search" | "Hammer" | "Rocket";
};

export type EngagementPlanMonth = {
  id: string;
  label: string;
  title: string;
  icon: "Search" | "Hammer" | "Rocket";
  tasks: string[];
};

export type EngagementPlanContent = {
  heading: string;
  sub: string;
  cta: EngagementCta;
  link: EngagementCta;
  trust: string;
  note: string;
  windowTitle: string;
  months: EngagementPlanMonth[];
  srSummary: string;
};

export type EngagementContent = {
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  sub: string;
  primaryCta: EngagementCta;
  secondaryCta: EngagementCta;
  trust: string;
  pricingNote: string;
  timelineNote: string;
  stages: EngagementStage[];
  srSummary: string;
};

export const engagement: EngagementContent = {
  eyebrow: "Three-Month Engagement",
  h1Line1: "From first conversation",
  h1Line2: "to a working system.",
  sub: "For businesses with unique operations, we start by understanding how you work, then design, build, test, and refine the technology around it, in one clear three-month plan.",
  primaryCta: {
    label: "Book a consultation",
    href: "/contact?interest=three-month-engagement",
  },
  secondaryCta: {
    label: "See the plan",
    href: "#plan",
  },
  trust: "Scoped and priced in a proposal before we start",
  pricingNote: "No fixed price: we prepare a customised proposal based on your requirements, complexity, integrations, and deliverables.",
  timelineNote: "The timeline can be adjusted to project complexity, dependencies, and your requirements.",
  stages: [
    {
      id: "m1",
      month: "Month 1",
      title: "Business Understanding & Planning",
      caption: "We learn how your business works and define the solution.",
      icon: "Search",
    },
    {
      id: "m2",
      month: "Month 2",
      title: "Development & Implementation",
      caption: "We build the agreed systems and set up integrations.",
      icon: "Hammer",
    },
    {
      id: "m3",
      month: "Month 3",
      title: "Integration, Testing & Refinement",
      caption: "We bring it together, test it, and prepare handover.",
      icon: "Rocket",
    },
  ],
  srSummary: "A proposed three-month engagement: Month 1 business understanding and planning, Month 2 development and implementation, Month 3 integration, testing and refinement, then deployment or handover as agreed.",
};

export const engagementPlan: EngagementPlanContent = {
  heading: "One team, one plan, from discovery to handover.",
  sub: "We start by understanding your business, then build, integrate, and refine the solution with you. You always know what is happening and what comes next.",
  cta: {
    label: "Book a consultation",
    href: "/contact?interest=three-month-engagement",
  },
  link: {
    label: "Compare all services",
    href: "/services",
  },
  trust: "Scoped and priced in a proposal before we start",
  note: "The timeline can be adjusted to project complexity, dependencies, and your requirements. Scope, features, and pricing are agreed in your proposal.",
  windowTitle: "Engagement workspace",
  months: [
    {
      id: "m1",
      label: "Month 1",
      title: "Business Understanding & Planning",
      icon: "Search",
      tasks: [
        "Understand your business model and operations",
        "Identify key stakeholders and their responsibilities",
        "Examine existing processes and challenges",
        "Find repetitive tasks and operational bottlenecks",
        "Define the solution, priorities, and project scope",
      ],
    },
    {
      id: "m2",
      label: "Month 2",
      title: "Development & Implementation",
      icon: "Hammer",
      tasks: [
        "Begin building the agreed systems and products",
        "Develop websites, applications, AI models, or automation workflows",
        "Set up required APIs and third-party integrations",
        "Develop agreed dashboards, databases, admin panels, or interfaces",
        "Review progress against the agreed requirements",
      ],
    },
    {
      id: "m3",
      label: "Month 3",
      title: "Integration, Testing & Refinement",
      icon: "Rocket",
      tasks: [
        "Integrate the developed components",
        "Test the system and its major workflows",
        "Identify and resolve issues within the agreed scope",
        "Refine the solution with your feedback",
        "Prepare for deployment or handover, as agreed",
      ],
    },
  ],
  srSummary: "A proposed three-month engagement: Month 1 business understanding and planning, Month 2 development and implementation, Month 3 integration, testing and refinement, then deployment or handover as agreed.",
};
