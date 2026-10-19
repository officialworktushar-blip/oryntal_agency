// CONFIRM: keep only integrations ORYNTAL genuinely supports. Remove the rest before launch.

export type Connection = {
  id: string;
  name: string;
  /** react-icons/si export name, or a lucide fallback ("Sparkles" / "Truck"). */
  icon: string;
  /** Brand colour for the icon. */
  brand: string;
  /** Tile size relative to the centre tile (index 5 = 1). */
  size: number;
};

/** Left-to-right order. Index 5 (WhatsApp) is the centre / largest tile. */
export const connections: Connection[] = [
  { id: "google-sheets", name: "Google Sheets", icon: "SiGooglesheets", brand: "#34A853", size: 0.4 },
  { id: "stripe", name: "Stripe", icon: "SiStripe", brand: "#635BFF", size: 0.5 },
  { id: "hubspot", name: "HubSpot", icon: "SiHubspot", brand: "#FF7A59", size: 0.62 },
  { id: "n8n", name: "n8n", icon: "SiN8N", brand: "#EA4B71", size: 0.76 },
  // SiOpenai is not exported by react-icons 5.x — lucide Sparkles in white.
  { id: "openai", name: "OpenAI", icon: "Sparkles", brand: "#FFFFFF", size: 0.88 },
  { id: "whatsapp", name: "WhatsApp", icon: "SiWhatsapp", brand: "#25D366", size: 1 },
  { id: "razorpay", name: "Razorpay", icon: "SiRazorpay", brand: "#3395FF", size: 0.88 },
  { id: "gmail", name: "Gmail", icon: "SiGmail", brand: "#EA4335", size: 0.76 },
  { id: "google-calendar", name: "Google Calendar", icon: "SiGooglecalendar", brand: "#4285F4", size: 0.62 },
  { id: "airtable", name: "Airtable", icon: "SiAirtable", brand: "#FCB400", size: 0.5 },
  // Generic shipping/logistics tile (not a brand mark).
  { id: "logistics", name: "Logistics", icon: "Truck", brand: "#B9A8FF", size: 0.4 },
];
