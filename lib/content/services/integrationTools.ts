// Examples only. Keep only tools ORYNTAL can genuinely integrate. Not partners/endorsements.

export type IntegrationToolKind = "icon" | "monogram";

export type IntegrationTool = {
  id: string;
  name: string;
  /** react-icons/si export name; null for monogram tiles. */
  icon: string | null;
  /** Brand hex used for the glyph. */
  color: string;
  kind: IntegrationToolKind;
  /** Monogram text; defaults to the first letter of the name. */
  letter?: string;
};

export const integrationRowA: IntegrationTool[] = [
  { id: "whatsapp-business", name: "WhatsApp Business", icon: "SiWhatsapp", color: "#25D366", kind: "icon" },
  { id: "gmail", name: "Gmail", icon: "SiGmail", color: "#EA4335", kind: "icon" },
  { id: "google-calendar", name: "Google Calendar", icon: "SiGooglecalendar", color: "#4285F4", kind: "icon" },
  { id: "slack", name: "Slack", icon: "SiSlack", color: "#4A154B", kind: "icon" },
  { id: "google-sheets", name: "Google Sheets", icon: "SiGooglesheets", color: "#34A853", kind: "icon" },
  { id: "microsoft-excel", name: "Microsoft Excel", icon: null, color: "#217346", kind: "monogram", letter: "X" },
  { id: "shopify", name: "Shopify", icon: "SiShopify", color: "#7AB55C", kind: "icon" },
  { id: "woocommerce", name: "WooCommerce", icon: "SiWoocommerce", color: "#96588A", kind: "icon" },
  { id: "wordpress", name: "WordPress", icon: "SiWordpress", color: "#21759B", kind: "icon" },
  { id: "wix", name: "Wix", icon: "SiWix", color: "#0C6EFC", kind: "icon" },
  { id: "razorpay", name: "Razorpay", icon: "SiRazorpay", color: "#3395FF", kind: "icon" },
  { id: "stripe", name: "Stripe", icon: "SiStripe", color: "#635BFF", kind: "icon" },
  { id: "paypal", name: "PayPal", icon: "SiPaypal", color: "#003087", kind: "icon" },
  { id: "cashfree", name: "Cashfree", icon: null, color: "#00C2A8", kind: "monogram", letter: "C" },
  { id: "shiprocket", name: "Shiprocket", icon: null, color: "#5B3BE0", kind: "monogram", letter: "S" },
  { id: "delhivery", name: "Delhivery", icon: null, color: "#E4262B", kind: "monogram", letter: "D" },
  { id: "tally", name: "Tally", icon: null, color: "#2E7D32", kind: "monogram", letter: "T" },
  { id: "quickbooks", name: "QuickBooks", icon: "SiQuickbooks", color: "#2CA01C", kind: "icon" },
  { id: "twilio", name: "Twilio", icon: null, color: "#F22F46", kind: "monogram", letter: "T" },
  { id: "telegram", name: "Telegram", icon: "SiTelegram", color: "#26A5E4", kind: "icon" },
];

export const integrationRowB: IntegrationTool[] = [
  { id: "hubspot", name: "HubSpot", icon: "SiHubspot", color: "#FF7A59", kind: "icon" },
  { id: "salesforce", name: "Salesforce", icon: "SiSalesforce", color: "#00A1E0", kind: "icon" },
  { id: "zoho", name: "Zoho", icon: "SiZoho", color: "#E42527", kind: "icon" },
  { id: "pipedrive", name: "Pipedrive", icon: null, color: "#1A1A1A", kind: "monogram", letter: "P" },
  { id: "airtable", name: "Airtable", icon: "SiAirtable", color: "#FCB400", kind: "icon" },
  { id: "notion", name: "Notion", icon: "SiNotion", color: "#111111", kind: "icon" },
  { id: "google-analytics", name: "Google Analytics", icon: "SiGoogleanalytics", color: "#E37400", kind: "icon" },
  { id: "power-bi", name: "Power BI", icon: "SiPowerbi", color: "#F2C811", kind: "icon" },
  { id: "looker-studio", name: "Looker Studio", icon: "SiLooker", color: "#4285F4", kind: "icon" },
  { id: "metabase", name: "Metabase", icon: "SiMetabase", color: "#509EE3", kind: "icon" },
  { id: "postgresql", name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1", kind: "icon" },
  { id: "mysql", name: "MySQL", icon: "SiMysql", color: "#4479A1", kind: "icon" },
  { id: "mongodb", name: "MongoDB", icon: "SiMongodb", color: "#47A248", kind: "icon" },
  { id: "supabase", name: "Supabase", icon: "SiSupabase", color: "#3ECF8E", kind: "icon" },
  { id: "firebase", name: "Firebase", icon: "SiFirebase", color: "#FFCA28", kind: "icon" },
  { id: "zapier", name: "Zapier", icon: "SiZapier", color: "#FF4F00", kind: "icon" },
  { id: "make", name: "Make", icon: null, color: "#6D00CC", kind: "monogram", letter: "M" },
  { id: "n8n", name: "n8n", icon: "SiN8N", color: "#EA4B71", kind: "icon" },
  { id: "graphql", name: "GraphQL", icon: "SiGraphql", color: "#E10098", kind: "icon" },
  { id: "postman", name: "Postman", icon: "SiPostman", color: "#FF6C37", kind: "icon" },
];

export const integrationTools: IntegrationTool[] = [...integrationRowA, ...integrationRowB];
