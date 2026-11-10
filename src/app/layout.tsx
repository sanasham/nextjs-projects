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

export const metadata: Metadata = {
  title: "Jampani Andhra Foods — Traditional Telugu Pickles, Snacks & Sweets",
  description:
    "Premium homemade Andhra pickles, traditional snacks, sweets and spice powders crafted with authentic Telugu recipes. Order online across India. Prototype demo.",
  keywords: [
    "Andhra pickles",
    "Telugu food",
    "avakaya",
    "gongura pickle",
    "traditional snacks",
    "homemade pickles",
    "Indian sweets",
  ],
  authors: [{ name: "Jampani Andhra Foods" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Jampani Andhra Foods",
    description: "Traditional Telugu pickles, snacks & sweets, crafted with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Noto Sans Telugu loaded via Google Fonts <link> (next/font google has
            a unicode-range conflict with the Telugu subset). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
