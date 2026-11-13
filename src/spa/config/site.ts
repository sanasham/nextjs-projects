export const siteConfig = {
  brandName: "Devi Pickles",
  brandNameTe: "దేవి పికల్స్",
  brandTagline: "Homemade Pickles",
  brandTaglineTe: "ఇంటిలో తయారు చేసిన ఊరగాయలు",

  proprietor: "Beena Devi",
  fssaiRegNo: "23625032001013",

  whatsappNumber: "917989225946",
  contactEmail: "hello@devipickles.com",
  contactPhone: "+91 79892 25946",
  businessHours: "Mon – Sat, 9:00 AM – 7:00 PM",
  addressLine:
    "MIG-899/6B, Beside Old Post Office, C/o. Sairam Computer Services & MeeSeva Center, KPHB Colony, 3rd Phase, Kukatpally, Telangana - 500072",
  addressShort: "KPHB Colony, 3rd Phase, Kukatpally, Telangana - 500072",
  mapLat: 17.48710453,
  mapLng: 78.39571101,
  mapEmbedQuery: "Sairam Computer Services, KPHB Colony, Hyderabad",
  mapLink:
    "https://maps.google.com/maps/search/MeeSeva%20%2C%20CSC%20Center%20%26%20Sairam%20Computer%20Services/@17.48710453,78.39571101,17z?hl=en",

  currency: "INR",
  currencySymbol: "₹",
  locale: "en" as "en" | "te",

  freeShippingThreshold: 999,
  flatShippingFee: 79,
  estDeliveryDays: "3 – 6 business days (India)",
  estDeliveryDaysIntl: "7 – 14 business days (International)",

  // International shipping — WhatsApp-based ordering for overseas customers.
  // Shipping is calculated per order based on destination and weight.
  intlShippingNote: "International shipping available — contact us on WhatsApp for a shipping quote.",

  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
