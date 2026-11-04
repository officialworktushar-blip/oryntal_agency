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

export type EngagementMonthsTaskPoint = string;

export type EngagementMonthsTask = {
  id: string;
  label: string;
  icon: "Search" | "Users" | "Workflow" | "Gauge" | "Target" | "Hammer" | "Globe" | "Plug" | "LayoutDashboard" | "ClipboardCheck" | "Puzzle" | "FlaskConical" | "Bug" | "SlidersHorizontal" | "Rocket" | "Boxes";
  title: string;
  subtitle: string;
  description: string;
  points: EngagementMonthsTaskPoint[];
  briefKey: string;
  note: string;
};

export type EngagementMonthsMonth = {
  id: string;
  label: string;
  title: string;
  tasks: EngagementMonthsTask[];
};

export type EngagementMonthsContent = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  sub: string;
  ctaLabel: string;
  divider: string;
  briefHelper: string;
  copyLabel: string;
  copiedLabel: string;
  closing: {
    text: string;
    cta: EngagementCta;
    trust: string;
  };
  footnote: string;
  months: EngagementMonthsMonth[];
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

export const engagementMonths: EngagementMonthsContent = {
  eyebrow: "WHAT HAPPENS EACH MONTH",
  headingLine1: "Month by month,",
  headingLine2: "here is exactly what we do.",
  sub: "Pick a task to see what we do, why it matters for your business, and what you get. Every step is agreed with you.",
  ctaLabel: "Plan this with us",
  divider: "or share your build brief with us",
  briefHelper: "Copy this brief and paste it into the contact form, or let us prefill it for you.",
  copyLabel: "Copy",
  copiedLabel: "Copied",
  closing: {
    text: "Not sure where your business fits? We'll walk through it together in a consultation.",
    cta: {
      label: "Book a consultation",
      href: "/contact?interest=three-month-engagement",
    },
    trust: "Scoped and priced in a proposal before we start",
  },
  footnote: "The timeline can be adjusted to project complexity, dependencies, and your requirements. Scope, features, and pricing are agreed in your proposal.",
  months: [
    {
      id: "m1",
      label: "Month 1",
      title: "Business Understanding & Planning",
      tasks: [
        {
          id: "m1-model",
          label: "Understand your business",
          icon: "Search",
          title: "We learn how your business works and earns",
          subtitle: "Your business model and daily operations, in your words.",
          description: "Before anything is designed, we spend time understanding how your business makes money, who your customers are, and how work actually flows each day.",
          points: [
            "Your business model and revenue flow",
            "Your customers and how they reach you",
            "How work moves through your team",
            "The goals you want to reach",
          ],
          briefKey: "understand-business",
          note: "We listen first, so the solution fits your real operations.",
        },
        {
          id: "m1-people",
          label: "Meet the key people",
          icon: "Users",
          title: "We identify key stakeholders and their roles",
          subtitle: "Who decides, who uses, who is affected.",
          description: "We map the people who will use, manage, or be affected by the new system, so everyone's responsibilities are clear from the start.",
          points: [
            "Key stakeholders and decision makers",
            "Responsibilities of each role",
            "Who will use the system day to day",
            "How feedback will be shared",
          ],
          briefKey: "key-stakeholders",
          note: "Clear roles early avoid confusion later.",
        },
        {
          id: "m1-process",
          label: "Review current processes",
          icon: "Workflow",
          title: "We examine your existing processes and challenges",
          subtitle: "What works today, and what slows you down.",
          description: "We walk through how things are done now, so we can see where time is lost and which challenges matter most.",
          points: [
            "Current processes and tools",
            "Where work gets stuck",
            "Existing systems and how they connect",
            "Challenges you want solved",
          ],
          briefKey: "current-processes",
          note: "We build on what works instead of replacing everything.",
        },
        {
          id: "m1-bottleneck",
          label: "Find repetitive work",
          icon: "Gauge",
          title: "We find repetitive tasks and bottlenecks",
          subtitle: "The work that should not need a person.",
          description: "We spot the manual, repeated steps and the slow points that hold your team back, and rank them by how much they cost your business.",
          points: [
            "Repetitive manual tasks",
            "Operational bottlenecks",
            "Where delays happen",
            "What is worth fixing first",
          ],
          briefKey: "repetitive-work",
          note: "The biggest time-savers come first.",
        },
        {
          id: "m1-fit",
          label: "Choose the right technology",
          icon: "Puzzle",
          title: "We decide where technology can genuinely help",
          subtitle: "Websites, software, AI agents, automation, or integrations.",
          description: "We match each challenge to the simplest technology that solves it: a website, custom software, AI agents, automation, or integrations, only where it adds real value.",
          points: [
            "Where a website or app helps",
            "Where automation saves time",
            "Where AI agents fit",
            "Where integrations connect your tools",
          ],
          briefKey: "right-technology",
          note: "No technology for its own sake.",
        },
        {
          id: "m1-scope",
          label: "Define solution and scope",
          icon: "Target",
          title: "We define the solution, priorities, and scope",
          subtitle: "A clear plan you can agree to.",
          description: "We turn everything we learned into a proposed solution with clear priorities and scope, so you know what will be built and in what order before development starts.",
          points: [
            "The proposed solution",
            "Priorities and order of work",
            "A clear project scope",
            "Your approval before we build",
          ],
          briefKey: "solution-and-scope",
          note: "You agree to the plan before any build begins.",
        },
      ],
    },
    {
      id: "m2",
      label: "Month 2",
      title: "Development & Implementation",
      tasks: [
        {
          id: "m2-build",
          label: "Start building",
          icon: "Hammer",
          title: "We begin building the agreed systems and products",
          subtitle: "Your approved plan becomes real.",
          description: "With the scope agreed, our team starts building the systems and products from your plan, step by step and in the agreed order.",
          points: [
            "Work follows the agreed scope",
            "Built in priority order",
            "Regular progress shared with you",
            "Quality checked as we go",
          ],
          briefKey: "start-building",
          note: "Development follows what you approved.",
        },
        {
          id: "m2-develop",
          label: "Develop what you need",
          icon: "Globe",
          title: "We develop your websites, applications, AI models, or workflows",
          subtitle: "The right build for your business.",
          description: "Depending on your plan, we develop the websites, applications, AI models, or automation workflows that your business needs.",
          points: [
            "Websites and web applications",
            "Mobile or business-specific applications",
            "AI models and AI agents, where agreed",
            "Automation workflows for routine work",
          ],
          briefKey: "develop-solution",
          note: "What we build depends on your agreed plan.",
        },
        {
          id: "m2-integrate",
          label: "Connect your tools",
          icon: "Plug",
          title: "We set up the APIs and third-party integrations you need",
          subtitle: "Your tools, talking to each other.",
          description: "We connect the required APIs and third-party services, so information moves between your systems without manual copying.",
          points: [
            "Required API connections",
            "Third-party service integrations",
            "Data flowing between your tools",
            "Set up around your accounts and access",
          ],
          briefKey: "apis-integrations",
          note: "Third-party services may carry separate provider fees.",
        },
        {
          id: "m2-interfaces",
          label: "Build dashboards and panels",
          icon: "LayoutDashboard",
          title: "We develop dashboards, databases, admin panels, and interfaces",
          subtitle: "What your team and users will actually see.",
          description: "We build the agreed dashboards, databases, admin panels, or user interfaces, so each person gets a clear view shaped around their work.",
          points: [
            "Dashboards for the numbers that matter",
            "Databases for your information",
            "Admin panels for your team",
            "User interfaces for customers or partners",
          ],
          briefKey: "dashboards-panels",
          note: "Only the interfaces in your agreed scope.",
        },
        {
          id: "m2-review",
          label: "Review progress with you",
          icon: "ClipboardCheck",
          title: "We review progress against your requirements",
          subtitle: "You stay in the loop at every step.",
          description: "We check the work against the requirements you approved and review progress with you, so any change is caught early.",
          points: [
            "Progress checked against your requirements",
            "Regular reviews with you",
            "Feedback taken on board",
            "Adjustments agreed before moving on",
          ],
          briefKey: "progress-review",
          note: "You see progress, not surprises.",
        },
      ],
    },
    {
      id: "m3",
      label: "Month 3",
      title: "Integration, Testing & Refinement",
      tasks: [
        {
          id: "m3-integrate",
          label: "Bring it together",
          icon: "Boxes",
          title: "We integrate the developed components",
          subtitle: "Separate pieces become one working system.",
          description: "We join the components built in Month 2 into one connected system, so everything works together the way you planned.",
          points: [
            "Components connected into one system",
            "Workflows linked end to end",
            "Data consistent across parts",
            "Ready for full testing",
          ],
          briefKey: "integrate-components",
          note: "One connected system, not separate parts.",
        },
        {
          id: "m3-test",
          label: "Test the system",
          icon: "FlaskConical",
          title: "We test the system and its major workflows",
          subtitle: "We try it the way your business will use it.",
          description: "We test the system and its major workflows, so the things your business depends on are checked before launch.",
          points: [
            "Major workflows tested end to end",
            "Checks on how parts work together",
            "Realistic scenarios from your business",
            "Findings recorded for fixing",
          ],
          briefKey: "test-workflows",
          note: "We test what matters most to your business.",
        },
        {
          id: "m3-fix",
          label: "Resolve issues",
          icon: "Bug",
          title: "We identify and resolve issues within the agreed scope",
          subtitle: "Problems found are problems fixed.",
          description: "Anything testing uncovers is identified and resolved within the agreed scope, so you receive a system that works as intended.",
          points: [
            "Issues identified during testing",
            "Fixes made within the agreed scope",
            "Changes retested",
            "Clear communication on what was fixed",
          ],
          briefKey: "resolve-issues",
          note: "Fixes cover the agreed scope.",
        },
        {
          id: "m3-refine",
          label: "Refine with your feedback",
          icon: "SlidersHorizontal",
          title: "We refine the solution with your feedback",
          subtitle: "Shaped by the people who will use it.",
          description: "We bring your feedback and testing results together and refine the solution, so it fits your team's way of working.",
          points: [
            "Your feedback gathered",
            "Improvements prioritised with you",
            "Refinements made and rechecked",
            "The solution settled",
          ],
          briefKey: "refine-feedback",
          note: "Refinement follows your feedback and the agreed scope.",
        },
        {
          id: "m3-handover",
          label: "Deploy or hand over",
          icon: "Rocket",
          title: "We prepare for deployment or handover, as agreed",
          subtitle: "From our hands to yours, smoothly.",
          description: "We prepare the system for deployment or handover, as agreed, so your team can start using it with confidence.",
          points: [
            "System prepared for deployment",
            "Handover steps agreed with you",
            "Your team ready to use it",
            "Next steps confirmed",
          ],
          briefKey: "deploy-handover",
          note: "Deployment or handover is arranged as agreed.",
        },
      ],
    },
  ],
  srSummary: "A proposed three-month engagement. Month 1: business understanding and planning. Month 2: development and implementation. Month 3: integration, testing and refinement, then deployment or handover as agreed.",
};

// Bars describe capabilities, not claims of existing clients or results.
export type EngagementEvaluateBar = {
  id: string;
  title: string;
  description: string;
  bestFor: string;
  points: string[];
  linkLabel: string;
  href: string;
};

export type EngagementEvaluateContent = {
  heading: string;
  sub: string;
  chipLabel: string;
  defaultActive: number;
  bars: EngagementEvaluateBar[];
  closing: {
    text: string;
    cta: EngagementCta;
    trust: string;
  };
  footnote: string;
  srSummary: string;
};

export const engagementEvaluate: EngagementEvaluateContent = {
  heading: "We look at your whole business, not just the next feature",
  sub: "Beyond building, we help you see where your systems hold you back and what to improve first. Pick a topic to see how we help.",
  chipLabel: "Best for:",
  defaultActive: 1,
  bars: [
    {
      id: "evaluate",
      title: "Evaluate your systems and workflows",
      description: "We review the systems and workflows you run today, so you know what is working, what is not, and where the biggest gains are.",
      bestFor: "Teams that want a clear starting point",
      points: [
        "Existing business systems reviewed",
        "Workflows mapped end to end",
        "Clear view of what to improve first",
      ],
      linkLabel: "Review my systems",
      href: "/contact?interest=three-month-engagement&topic=evaluate-systems",
    },
    {
      id: "disconnected",
      title: "Spot disconnected systems",
      description: "We find tools and processes that do not talk to each other or are hard to maintain, and show how to bring them together.",
      bestFor: "Teams running on several disconnected tools",
      points: [
        "Disconnected or difficult-to-maintain systems identified",
        "Where information is copied by hand",
        "Simple ways to connect them",
      ],
      linkLabel: "Find the gaps",
      href: "/contact?interest=three-month-engagement&topic=disconnected-systems",
    },
    {
      id: "architecture",
      title: "Recommend better architecture",
      description: "We suggest improvements to how your systems are structured, so they are easier to run, extend, and keep reliable.",
      bestFor: "Businesses planning to grow their systems",
      points: [
        "Architecture improvements recommended",
        "Easier to maintain and extend",
        "Suited to your current and future needs",
      ],
      linkLabel: "Improve my setup",
      href: "/contact?interest=three-month-engagement&topic=architecture",
    },
    {
      id: "planning",
      title: "Plan custom software and automation",
      description: "We turn your priorities into a clear plan for custom software and automation, so you know what to build and in what order.",
      bestFor: "Businesses with specific, unique operations",
      points: [
        "Custom software planned around your operations",
        "Automation opportunities prioritised",
        "A plan you can approve before building",
      ],
      linkLabel: "Plan my build",
      href: "/contact?interest=three-month-engagement&topic=plan-build",
    },
    {
      id: "partners",
      title: "Coordinate specialists and partners",
      description: "When your project needs extra expertise, we coordinate external specialists, and connect you with suppliers or partners through our available contacts.",
      bestFor: "Projects needing outside expertise",
      points: [
        "External specialists coordinated when required",
        "Suppliers and partners connected where suitable",
        "One point of contact for it all",
      ],
      linkLabel: "Bring in the right people",
      href: "/contact?interest=three-month-engagement&topic=specialists-partners",
    },
  ],
  closing: {
    text: "Not sure where to start? Tell us how your business runs and we'll show you the simplest next step.",
    cta: {
      label: "Book a consultation",
      href: "/contact?interest=three-month-engagement",
    },
    trust: "Scoped and priced in a proposal before we start",
  },
  footnote: "Specialist and partner connections are made through ORYNTAL's available contacts, where suitable. Scope, timeline, and pricing are agreed in your proposal.",
  srSummary: "ORYNTAL evaluates existing business systems and workflows, identifies disconnected or hard-to-maintain systems, recommends architecture improvements, plans custom software and automation solutions, coordinates external specialists when required, and connects businesses with suppliers or partners through available contacts.",
};
