import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://devipickles.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#/products`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${base}/#/products?cat=pickles`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/#/products?cat=spices`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/#/products?cat=snacks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${base}/#/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
