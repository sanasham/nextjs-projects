/**
 * Structured-data (JSON-LD) generators for SEO.
 *
 * Because this is a hash-routed SPA, Google cannot reliably crawl individual
 * product or recipe pages as separate URLs. To compensate, we inject rich
 * structured data into the root layout so every product is represented in
 * the page source with full Product schema (price, availability, rating,
 * image) — this is what produces the rich results (stars + price) in Google
 * Search and is the single highest-impact SEO action for this site.
 */
import { products } from "@/spa/data/products";
import { recipeVideos } from "@/spa/data/recipes";
import { categories } from "@/spa/data/categories";
import { siteConfig } from "@/spa/config/site";

export const SITE_URL = "https://devipickles.com";

/** LocalBusiness / Store schema for the homepage. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "FoodEstablishment"],
    "@id": `${SITE_URL}/#store`,
    name: "Devi Pickles",
    alternateName: siteConfig.brandNameTe,
    description:
      "Homemade Andhra veg & non-veg pickles, spice powders, traditional snacks and festive sweets. Made with groundnut oil & organic mirchi. FSSAI certified. Pan-India delivery.",
    image: `${SITE_URL}/products/hero.png`,
    logo: `${SITE_URL}/favicon.svg`,
    url: SITE_URL,
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "MIG-899/6B, Beside Old Post Office, C/o. Sairam Computer Services & MeeSeva Center, KPHB Colony, 3rd Phase",
      addressLocality: "Kukatpally, Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500072",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.mapLat,
      longitude: siteConfig.mapLng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    founder: { "@type": "Person", name: siteConfig.proprietor },
    funder: { "@type": "Person", name: siteConfig.proprietor },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.youtube],
    hasMenu: `${SITE_URL}/#/products`,
    makesOffer: products.map(productOfferSchema),
  };
}

/** WebSite schema with SearchAction (enables Google sitelinks search box). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Devi Pickles",
    alternateName: siteConfig.brandNameTe,
    publisher: { "@id": `${SITE_URL}/#store` },
    inLanguage: ["en", "te"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/#/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization schema. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Devi Pickles",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    founder: { "@type": "Person", name: siteConfig.proprietor },
    foundingLocation: {
      "@type": "Place",
      name: "KPHB Colony, Kukatpally, Hyderabad, Telangana",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine,
      addressLocality: "Kukatpally, Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500072",
      addressCountry: "IN",
    },
  };
}

/** Product schema for a single product (gives rich results with price + stars). */
export function productOfferSchema(p: (typeof products)[number]) {
  const minPrice = Math.min(...p.variants.map((v) => v.price));
  const minMrp = Math.min(...p.variants.map((v) => v.mrp));
  return {
    "@type": "Offer",
    priceCurrency: "INR",
    price: String(minPrice),
    priceSpecification: {
      "@type": "PriceSpecification",
      price: String(minPrice),
      priceCurrency: "INR",
      maxPrice: minMrp,
    },
    availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    url: `${SITE_URL}/#/product/${p.slug}`,
    itemOffered: {
      "@type": "Product",
      name: p.nameEn,
      alternateName: p.nameTe,
      description: p.descEn,
      image: `${SITE_URL}${p.image}`,
      category: p.categoryId,
      brand: { "@type": "Brand", name: "Devi Pickles" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(p.rating),
        reviewCount: String(p.reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
      offers: p.variants.map((v) => ({
        "@type": "Offer",
        priceCurrency: "INR",
        price: String(v.price),
        availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: `${SITE_URL}/#/product/${p.slug}`,
      })),
    },
  };
}

/** BreadcrumbList schema for the homepage navigation. */
export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/#/products` },
      { "@type": "ListItem", position: 3, name: "How do we make?", item: `${SITE_URL}/#/recipes` },
      { "@type": "ListItem", position: 4, name: "About", item: `${SITE_URL}/#/about` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${SITE_URL}/#/contact` },
    ],
  };
}

/** VideoObject schema for each recipe video (enables video rich results). */
export function recipeVideoSchemas() {
  return recipeVideos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.titleEn,
    description: v.descEn,
    thumbnailUrl: `${SITE_URL}${v.poster}`,
    contentUrl: v.videoUrl,
    uploadDate: "2025-11-12",
    duration: `PT${v.durationLabel.replace(":", "M")}S`,
  }));
}

/** FAQPage schema — targets "People Also Ask" snippets. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are Devi Pickles homemade?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All pickles, spice powders, snacks and sweets are homemade in small batches using traditional Telugu recipes, groundnut oil and organic mirchi powder. No preservatives are used.",
        },
      },
      {
        "@type": "Question",
        name: "Which types of pickles are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 25 pickles including veg pickles (mango/avakaya, tomato, gongura, amla, ginger, lemon, coriander, cauliflower, drumstick, bitter gourd, tamarind, mixed veg), and non-veg pickles (chicken boneless, chicken with bone, gongura chicken, prawns, fish, mutton boneless, mutton with bone). Non-veg pickles are made to order with a 2-3 day lead time.",
        },
      },
      {
        "@type": "Question",
        name: "Do you deliver across India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we ship pan-India. Free shipping on orders above ₹999; a flat ₹79 shipping fee applies below that. Estimated delivery is 3-6 business days. You can also order via WhatsApp on +91 79892 25946.",
        },
      },
      {
        "@type": "Question",
        name: "What is the FSSAI registration number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our FSSAI Reg. No. is 23625032001013. Proprietor: Beena Devi. We are located at KPHB Colony, 3rd Phase, Kukatpally, Hyderabad, Telangana - 500072.",
        },
      },
      {
        "@type": "Question",
        name: "How are the pickles packaged and stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pickles are packed in clean, airtight jars. Store in a cool, dry place and use a dry spoon. Most veg pickles last 4-6 months; non-veg pickles 3 months (refrigerate after opening). Sweets last 1-4 weeks depending on the type.",
        },
      },
      {
        "@type": "Question",
        name: "Do you sell spice powders and snacks too?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We sell 10 spice powders (sambar, garam masala, idli karam, rasam, curry leaf, groundnut, sesame, mint chilli, coriander chilli, drumstick leaves), 8 traditional snacks (mixture, murukulu, chakkilu, chegodilu, karapusa, borugula mixture, atukula mixture, kakarakaya vadiyalu), and 14 festive sweets (laddus, ariselu, kajjikayalu, kalakand and more).",
        },
      },
    ],
  };
}

/** ItemList schema for each category (helps category pages rank). */
export function categoryListSchemas() {
  return categories.map((c) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.nameEn,
    description: c.taglineEn,
    itemListElement: products
      .filter((p) => p.categoryId === c.id)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.nameEn,
        url: `${SITE_URL}/#/product/${p.slug}`,
      })),
  }));
}

/** All schemas combined into a single array for the layout's JSON-LD. */
export function allSchemas() {
  return [
    localBusinessSchema(),
    websiteSchema(),
    organizationSchema(),
    breadcrumbSchema(),
    faqSchema(),
    ...categoryListSchemas(),
    ...recipeVideoSchemas(),
  ];
}
