export type ClientLogo = {
  name: string;
  logo: string;
  /** Intrinsic pixel size of the source image. */
  width: number;
  height: number;
  href?: string;
};

// TODO: replace the placeholder names with the real client names.
export const clientLogos: ClientLogo[] = [
  { name: "Client logo 1", logo: "/logo/logo1.webp", width: 307, height: 121 },
  { name: "Client logo 2", logo: "/logo/logo2.webp", width: 597, height: 367 },
  { name: "Client logo 3", logo: "/logo/logo3.webp", width: 700, height: 662 },
  { name: "Client logo 4", logo: "/logo/logo4.webp", width: 520, height: 720 },
  { name: "Client logo 5", logo: "/logo/logo5.webp", width: 1227, height: 292 },
  { name: "Client logo 6", logo: "/logo/logo6.webp", width: 301, height: 252 },
  { name: "Client logo 7", logo: "/logo/logo7.webp", width: 938, height: 718 },
  { name: "Client logo 8", logo: "/logo/logo8.webp", width: 662, height: 240 },
  { name: "Client logo 9", logo: "/logo/logo9.webp", width: 752, height: 355 },
  { name: "Client logo 10", logo: "/logo/logo10.webp", width: 596, height: 582 },
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
