import type { Metadata } from "next";
import { Poppins, Marcellus } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const SITE_URL = "https://devipickles.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Devi Pickles — Homemade Andhra Pickles, Spice Powders & Snacks",
    template: "%s | Devi Pickles",
  },
  description:
    "Buy homemade Andhra veg & non-veg pickles, spice powders and traditional snacks online. Devi Pickles — made with groundnut oil & organic mirchi. FSSAI certified. KPHB Colony, Hyderabad. Pan-India delivery.",
  keywords: [
    "homemade pickles online",
    "Andhra pickles",
    "avakaya pickle online",
    "gongura pickle",
    "chicken pickle",
    "mutton pickle",
    "non-veg pickles",
    "spice powders",
    "karam podi",
    "idli karam",
    "traditional snacks",
    "murukulu",
    "mixture",
    "Devi Pickles",
    "KPHB Colony Hyderabad",
    "Telugu pickles",
    "buy pickles online India",
  ],
  authors: [{ name: "Devi Pickles", url: SITE_URL }],
  creator: "Devi Pickles",
  publisher: "Devi Pickles",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "te": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["te_IN"],
    url: SITE_URL,
    siteName: "Devi Pickles",
    title: "Devi Pickles — Homemade Andhra Pickles, Spice Powders & Snacks",
    description:
      "Buy homemade Andhra veg & non-veg pickles, spice powders and traditional snacks. Made with groundnut oil & organic mirchi. FSSAI certified. Pan-India delivery.",
    images: [
      {
        url: "/products/hero.png",
        width: 1152,
        height: 864,
        alt: "Assorted homemade Andhra pickles, snacks and spice powders by Devi Pickles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devi Pickles — Homemade Andhra Pickles & Snacks",
    description:
      "Buy homemade veg & non-veg pickles, spice powders and traditional snacks. FSSAI certified. Pan-India delivery.",
    images: ["/products/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Food",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Devi Pickles",
  description:
    "Homemade Andhra veg & non-veg pickles, spice powders and traditional snacks. Made with groundnut oil & organic mirchi.",
  image: `${SITE_URL}/products/hero.png`,
  url: SITE_URL,
  telephone: "+91-7989225946",
  priceRange: "₹₹",
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
    latitude: 17.48710453,
    longitude: 78.39571101,
  },
  openingHours: "Mo-Sa 09:00-19:00",
  founder: { "@type": "Person", name: "Beena Devi" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pickles, Spice Powders & Snacks",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mango Pickle (Avakaya)" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gongura Pickle" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Chicken Pickle" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mutton Pickle" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Prawns Pickle" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Idli Karam Powder" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sambar Powder" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Andhra Mixture" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Murukulu" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${marcellus.variable} font-sans antialiased bg-background text-foreground`}
        style={{ "--font-telugu": "'Noto Sans Telugu', sans-serif" } as React.CSSProperties}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
