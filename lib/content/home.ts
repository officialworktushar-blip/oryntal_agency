export type LandingStats = {
  value: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  label: string;
};

export const hero = {
  pill: "Technology · AI · Automation · Business Systems",
  heading: "Orient your business. Automate what slows it down.",
  subheading:
    "ORYNTAL builds websites, AI systems, and automation for growing businesses — fixed-scope packages, or custom development when your process is complex.",
  primaryCta: { href: "/packages", label: "View packages" },
  secondaryCta: { href: "/contact", label: "Book a consultation" },
  microTrust: "Fixed-scope packages from ₹30,000 · Custom proposals for complex needs",
  image: {
    label: "Hero browser mockup · 1600×1000",
    hint: "Screenshot of a client dashboard or ORYNTAL-built system in use.",
  },
};

export const socialProof = {
  eyebrow: "Trusted by growing businesses",
  stats: [
    { value: 4, label: "service domains" },
    { value: 3, label: "packages, from ₹30,000" },
    { value: 3, label: "months, discovery to handover" },
  ] as LandingStats[],
};
export const videoSection = {
  eyebrow: "Watch the transformation",
  heading: "From scattered manual work to one connected system",
  description:
    "See how ORYNTAL takes a business from disconnected tools and manual processes to a single connected system — website, CRM, automation, and AI working together.",
  // TODO: drop the real product demo video here (MP4/WebM, or an external URL).
  videoSrc: undefined as string | undefined,
  posterLabel: "Product demo poster frame · 1600×900",
};

export const servicesSection = {
  eyebrow: "Full-stack services",
  heading: "Everything you need to go digital, automate, and scale",
  description:
    "Four service domains, one team. Start with a ready-made package, hire us for a single capability, or bring us a problem worth solving properly.",
  footnote: "Pricing and timelines are confirmed after a short scoping call.",
};

export const howItWorks = {
  eyebrow: "How we work",
  heading: "A clear process, from first conversation to launch",
  description:
    "Every engagement follows the same transparent path, whether it is a two-week website or a three-month custom build.",
  cta: { href: "/services/consultation", label: "See the 3-month engagement" },
  steps: [
    {
      number: "01",
      title: "Discover",
      description:
        "A short call to understand your business, constraints, and what is actually slowing you down.",
      image: "Workshop and requirements sketch · 1200×800",
    },
    {
      number: "02",
      title: "Plan & scope",
      description:
        "Fixed scope, timeline, and price. You know exactly what you are getting before work begins.",
      image: "Scope document and project timeline · 1200×800",
    },
    {
      number: "03",
      title: "Build & integrate",
      description:
        "We build, connect your tools, and keep you updated with regular progress demos.",
      image: "Build progress and integration diagram · 1200×800",
    },
    {
      number: "04",
      title: "Test, refine & launch",
      description:
        "We test with your team, refine the details, and hand over with documentation and training.",
      image: "Launch checklist and training session · 1200×800",
    },
  ],
};

export const finalCta = {
  heading: "Ready to orient your business?",
  description:
    "Tell us what is slowing you down. We will show you what to build, automate, or buy first — and what it costs.",
  primary: { href: "/contact", label: "Book a free consultation" },
  secondary: { href: "/packages", label: "See packages" },
  image: {
    label: "Team collaboration photo · 1200×900",
    hint: "Optional: a real photo of the team or a client workshop.",
  },
};
