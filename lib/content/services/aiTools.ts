// Examples of tools AI agents commonly connect with. CONFIRM before launch: keep only tools ORYNTAL can genuinely integrate. Not partners/endorsements.

export type AiToolKind = "icon" | "monogram";

export type AiTool = {
  id: string;
  name: string;
  /** react-icons/si export name; null for monogram tiles. */
  icon: string | null;
  /** Brand hex used for the glyph. */
  color: string;
  kind: AiToolKind;
  /** Monogram text; defaults to the first letter of the name. */
  letter?: string;
};

export const rowA: AiTool[] = [
  { id: "whatsapp-business", name: "WhatsApp Business", icon: "SiWhatsapp", color: "#25D366", kind: "icon" },
  { id: "gmail", name: "Gmail", icon: "SiGmail", color: "#EA4335", kind: "icon" },
  { id: "slack", name: "Slack", icon: "SiSlack", color: "#4A154B", kind: "icon" },
  { id: "microsoft-teams", name: "Microsoft Teams", icon: null, color: "#5059C9", kind: "monogram", letter: "T" },
  { id: "google-calendar", name: "Google Calendar", icon: "SiGooglecalendar", color: "#4285F4", kind: "icon" },
  { id: "google-sheets", name: "Google Sheets", icon: "SiGooglesheets", color: "#34A853", kind: "icon" },
  { id: "google-drive", name: "Google Drive", icon: "SiGoogledrive", color: "#1FA463", kind: "icon" },
  { id: "notion", name: "Notion", icon: "SiNotion", color: "#000000", kind: "icon" },
  { id: "airtable", name: "Airtable", icon: "SiAirtable", color: "#FCB400", kind: "icon" },
  { id: "hubspot", name: "HubSpot", icon: "SiHubspot", color: "#FF7A59", kind: "icon" },
  { id: "zoho", name: "Zoho", icon: "SiZoho", color: "#E42527", kind: "icon" },
  { id: "salesforce", name: "Salesforce", icon: "SiSalesforce", color: "#00A1E0", kind: "icon" },
  { id: "shopify", name: "Shopify", icon: "SiShopify", color: "#7AB55C", kind: "icon" },
  { id: "woocommerce", name: "WooCommerce", icon: "SiWoocommerce", color: "#96588A", kind: "icon" },
  { id: "razorpay", name: "Razorpay", icon: "SiRazorpay", color: "#3395FF", kind: "icon" },
  { id: "stripe", name: "Stripe", icon: "SiStripe", color: "#635BFF", kind: "icon" },
  { id: "paypal", name: "PayPal", icon: "SiPaypal", color: "#003087", kind: "icon" },
  { id: "mailchimp", name: "Mailchimp", icon: "SiMailchimp", color: "#FFB000", kind: "icon" },
  { id: "instagram", name: "Instagram", icon: "SiInstagram", color: "#E4405F", kind: "icon" },
  { id: "meta", name: "Meta (Facebook)", icon: "SiMeta", color: "#0866FF", kind: "icon" },
];

export const rowB: AiTool[] = [
  { id: "openai", name: "OpenAI", icon: "SiOpenai", color: "#10A37F", kind: "icon" },
  { id: "anthropic", name: "Anthropic", icon: "SiAnthropic", color: "#D97757", kind: "icon" },
  { id: "google-gemini", name: "Google Gemini", icon: "SiGooglegemini", color: "#8E75B2", kind: "icon" },
  { id: "mistral-ai", name: "Mistral AI", icon: "SiMistralai", color: "#FA520F", kind: "icon" },
  { id: "meta-llama", name: "Meta Llama", icon: null, color: "#0866FF", kind: "monogram", letter: "L" },
  { id: "hugging-face", name: "Hugging Face", icon: "SiHuggingface", color: "#FFD21E", kind: "icon" },
  { id: "langchain", name: "LangChain", icon: "SiLangchain", color: "#1C3C3C", kind: "icon" },
  { id: "llamaindex", name: "LlamaIndex", icon: null, color: "#6C47FF", kind: "monogram", letter: "LI" },
  { id: "pinecone", name: "Pinecone", icon: "SiPinecone", color: "#1B1B1F", kind: "icon" },
  { id: "supabase", name: "Supabase", icon: "SiSupabase", color: "#3ECF8E", kind: "icon" },
  { id: "postgresql", name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", kind: "icon" },
  { id: "mongodb", name: "MongoDB", icon: "SiMongodb", color: "#47A248", kind: "icon" },
  { id: "redis", name: "Redis", icon: "SiRedis", color: "#DC382D", kind: "icon" },
  { id: "zapier", name: "Zapier", icon: "SiZapier", color: "#FF4F00", kind: "icon" },
  { id: "n8n", name: "n8n", icon: "SiN8N", color: "#EA4B71", kind: "icon" },
  { id: "make", name: "Make", icon: null, color: "#6D00CC", kind: "monogram", letter: "M" },
  { id: "twilio", name: "Twilio", icon: "SiTwilio", color: "#F22F46", kind: "icon" },
  { id: "elevenlabs", name: "ElevenLabs", icon: null, color: "#1D1E20", kind: "monogram", letter: "II" },
  { id: "vercel", name: "Vercel", icon: "SiVercel", color: "#000000", kind: "icon" },
  { id: "github", name: "GitHub", icon: "SiGithub", color: "#181717", kind: "icon" },
];

export const aiTools: AiTool[] = [...rowA, ...rowB];
