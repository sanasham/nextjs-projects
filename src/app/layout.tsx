import type { Metadata } from "next";
import { Poppins, Marcellus } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { allSchemas, SITE_URL } from "./seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Devi Pickles — Homemade Andhra Pickles, Spice Powders, Snacks & Sweets",
    template: "%s | Devi Pickles",
  },
  description:
    "Buy homemade Andhra veg & non-veg pickles (avakaya, gongura, chicken, mutton, prawns), spice powders, traditional snacks & festive sweets online. Made with groundnut oil & organic mirchi. FSSAI certified. KPHB Colony, Hyderabad. Free shipping over ₹999. Pan-India delivery.",
  keywords: [
    "homemade pickles online",
    "Andhra pickles",
    "avakaya pickle online",
    "gongura pickle",
    "chicken pickle online",
    "mutton pickle",
    "prawns pickle",
    "fish pickle",
    "non-veg pickles Hyderabad",
    "spice powders online",
    "karam podi",
    "idli karam powder",
    "sambar powder",
    "traditional snacks online",
    "murukulu online",
    "Andhra mixture",
    "festive sweets online",
    "boondi laddu",
    "ariselu",
    "Devi Pickles",
    "Beena Devi pickles",
    "KPHB Colony Hyderabad pickles",
    "Telugu pickles",
    "buy pickles online India",
    "FSSAI certified pickles",
  ],
  authors: [{ name: "Devi Pickles", url: SITE_URL }],
  creator: "Devi Pickles",
  publisher: "Devi Pickles",
  applicationName: "Devi Pickles",
  category: "Food",
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
    title: "Devi Pickles — Homemade Andhra Pickles, Spice Powders, Snacks & Sweets",
    description:
      "Buy homemade veg & non-veg pickles, spice powders, traditional snacks and festive sweets. Made with groundnut oil & organic mirchi. FSSAI certified. Pan-India delivery.",
    images: [
      {
        url: "/products/hero.png",
        width: 1152,
        height: 864,
        alt: "Assorted homemade Andhra pickles, snacks, spice powders and sweets by Devi Pickles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devipickles",
    title: "Devi Pickles — Homemade Andhra Pickles, Snacks & Sweets",
    description:
      "Buy homemade veg & non-veg pickles, spice powders, snacks and sweets. FSSAI certified. Pan-India delivery. Free shipping over ₹999.",
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
  verification: {
    google: "google-site-verification-token",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas()) }}
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
