export const socialProof = {
  eyebrow: "Trusted by growing businesses",
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
