/**
 * Centralized site configuration.
 * Replace placeholder values with real client information after approval.
 */
export const siteConfig = {
  brandName: "Jampani Andhra Foods",
  brandNameTe: "జంపని ఆంధ్ర ఫుడ్స్",
  brandTagline: "Tradition in Every Jar",
  brandTaglineTe: "ప్రతి జాడీలో సంప్రదాయం",

  /** WhatsApp business number — PLACEHOLDER. Replace after client approval. */
  whatsappNumber: "919000000000",
  contactEmail: "hello@example.com", // placeholder
  contactPhone: "+91 90000 00000", // placeholder
  businessHours: "Mon – Sat, 9:00 AM – 7:00 PM", // placeholder
  addressLine: "Plot 12, Sample Road, Hyderabad, Telangana — 500001", // placeholder
  mapEmbedQuery: "Hyderabad, Telangana, India",

  currency: "INR",
  currencySymbol: "₹",
  locale: "en" as "en" | "te",

  /** Free shipping threshold (INR). Sample value only. */
  freeShippingThreshold: 999,
  flatShippingFee: 79,
  estDeliveryDays: "3 – 6 business days", // sample

  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
