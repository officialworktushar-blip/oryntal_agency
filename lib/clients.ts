export type ClientLogo = {
  name: string;
  logo: string;
  href?: string;
};

// TODO: replace with real client logos (SVG or PNG, 180×72 or larger) once supplied.
export const clientLogos: ClientLogo[] = [
  { name: "Client logo", logo: "" },
  { name: "Client logo", logo: "" },
  { name: "Client logo", logo: "" },
  { name: "Client logo", logo: "" },
  { name: "Client logo", logo: "" },
  { name: "Client logo", logo: "" },
];

// TODO: add verified client testimonials here; the landing page hides this section when empty.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [];

// Only integrations ORYNTAL actually supports. Anything else is omitted until confirmed.
export const integrations = [
  { name: "WhatsApp", note: "Business messaging" },
  { name: "Razorpay", note: "Payments" },
  { name: "n8n", note: "Automation" },
  { name: "OpenAI", note: "AI models" },
] as const;
