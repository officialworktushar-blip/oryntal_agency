export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "January 2026",
    intro:
      "These terms govern your use of ORYNTAL's website and services. By engaging us, you agree to the terms below.",
    sections: [
      {
        heading: "Scope of work",
        body: "Deliverables, timelines, and fees for each engagement are defined in a written proposal or statement of work. Anything not listed there is out of scope and may require a change order.",
      },
      {
        heading: "Client responsibilities",
        body: "You agree to provide accurate information, timely feedback, and any access or assets needed to deliver the work. Delays in providing these may shift agreed timelines.",
      },
      {
        heading: "Intellectual property",
        body: "Upon full payment, final deliverables created specifically for you are yours to use. Our pre-existing tools, frameworks, and templates remain our property and may be licensed to you.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "January 2026",
    intro:
      "We collect only what we need to respond to you and deliver our services, and we never sell your personal data.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you submit through forms (such as name, email, company, and project details) and basic analytics about how our site is used.",
      },
      {
        heading: "How we use it",
        body: "We use your information to respond to enquiries, deliver services, and improve our website. We may contact you about your enquiry or relevant services.",
      },
      {
        heading: "Your choices",
        body: "You can request access to, correction of, or deletion of your personal data at any time by emailing us. We will respond within a reasonable period.",
      },
    ],
  },
  {
    slug: "third-party-fees",
    title: "Third-Party Fees & Disclaimers",
    updated: "January 2026",
    intro:
      "Some services rely on third-party providers whose fees are separate from ours. This page explains what to expect.",
    sections: [
      {
        heading: "Separate providers, separate charges",
        body: "Domain registrars, hosting providers, SSL issuers, payment processors, and advertising platforms set and charge their own fees. These are billed directly by those providers and are not included in ORYNTAL's service fees unless explicitly stated.",
      },
      {
        heading: "Examples of third-party fees",
        body: "Common examples include domain registration and renewal, third-party hosting or CDN plans, email and CRM subscriptions, premium plugins or fonts, and paid media spend on search, social, and display platforms.",
      },
      {
        heading: "No control over pricing or policies",
        body: "We do not control third-party pricing, availability, or policies, and we are not responsible for changes to them. We will always confirm expected third-party costs with you before purchasing anything on your behalf.",
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    updated: "January 2026",
    intro:
      "We aim to make every engagement a success. This policy sets out how refunds are handled.",
    sections: [
      {
        heading: "Deposits",
        body: "Deposits reserve your slot in our schedule and cover initial discovery and setup. Deposits are generally non-refundable once work has begun.",
      },
      {
        heading: "Completed work",
        body: "Fees for work already delivered are non-refundable. If an engagement is cancelled mid-project, you are billed for work completed up to the cancellation date.",
      },
      {
        heading: "Third-party costs",
        body: "Third-party fees paid to registrars, hosting providers, platforms, or ad networks are non-refundable and are handled under those providers' own policies.",
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((doc) => doc.slug === slug);
}
