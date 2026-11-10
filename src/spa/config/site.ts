/**
 * Centralized site configuration.
 * Replace placeholder values with real client information after approval.
 */
export const siteConfig = {
  brandName: "Devi Pickles",
  brandNameTe: "దేవి పికల్స్",
  brandTagline: "Every Product A1",
  brandTaglineTe: "ప్రతి ప్రొడక్ట్ A1",

  /** WhatsApp business number — sourced from client brand poster. */
  whatsappNumber: "917989225946",
  contactEmail: "hello@devipickles.com", // placeholder
  contactPhone: "+91 79892 25946",
  businessHours: "Mon – Sat, 9:00 AM – 7:00 PM", // placeholder
  addressLine: "Patelguda, Hyderabad, Telangana 502319",
  // Exact business location (decoded from the client's Google Maps plus code G7RM+432).
  mapLat: 17.5402625,
  mapLng: 78.2826406,
  // Google Maps embed query — sourced from the client's Maps link.
  mapEmbedQuery: "Patelguda, Hyderabad, Telangana 502319",
  mapLink: "https://maps.app.goo.gl/sKYTuFhqvK9CKYsN8?g_st=aw",

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
