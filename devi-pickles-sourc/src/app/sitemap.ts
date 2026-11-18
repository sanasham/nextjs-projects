import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import { products } from "@/spa/data/products";
import { categories } from "@/spa/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const lastModified = new Date();

  // Static top-level routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#/products`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#/recipes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Category filter routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/#/products?cat=${c.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Individual product pages — highest priority for long-tail search traffic
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/#/product/${p.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
