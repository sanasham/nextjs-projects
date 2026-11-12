import { describe, it, expect } from "vitest";
import {
  products,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getBestsellers,
  getNewArrivals,
  getFeaturedProducts,
  getRelatedProducts,
  searchProducts,
} from "@/spa/data/products";
import { categories } from "@/spa/data/categories";

describe("products data — integrity", () => {
  it("every product has a unique id and slug", () => {
    const ids = products.map((p) => p.id);
    const slugs = products.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every product has at least one variant with price > 0", () => {
    for (const p of products) {
      expect(p.variants.length).toBeGreaterThan(0);
      for (const v of p.variants) {
        expect(v.price).toBeGreaterThan(0);
        expect(v.mrp).toBeGreaterThanOrEqual(v.price);
      }
    }
  });

  it("every product references a valid category", () => {
    const catIds = categories.map((c) => c.id);
    for (const p of products) {
      expect(catIds).toContain(p.categoryId);
    }
  });

  it("every product has both English and Telugu names", () => {
    for (const p of products) {
      expect(p.nameEn.trim().length).toBeGreaterThan(0);
      expect(p.nameTe.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("products data — accessors", () => {
  it("getProductBySlug returns the matching product", () => {
    const p = getProductBySlug("mango-pickle");
    expect(p).toBeDefined();
    expect(p?.nameEn).toContain("Mango");
  });

  it("getProductBySlug returns undefined for unknown slug", () => {
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });

  it("getProductById returns the matching product", () => {
    const p = getProductById("p-mango-pickle");
    expect(p).toBeDefined();
    expect(p?.id).toBe("p-mango-pickle");
  });

  it("getProductsByCategory filters by category", () => {
    const pickles = getProductsByCategory("pickles");
    expect(pickles.length).toBeGreaterThan(0);
    expect(pickles.every((p) => p.categoryId === "pickles")).toBe(true);
  });

  it("getBestsellers returns only bestseller-flagged products", () => {
    const best = getBestsellers();
    expect(best.length).toBeGreaterThan(0);
    expect(best.every((p) => p.bestseller)).toBe(true);
  });

  it("getNewArrivals returns only new-flagged products", () => {
    const fresh = getNewArrivals();
    expect(fresh.every((p) => p.isNew)).toBe(true);
  });

  it("getFeaturedProducts respects the limit", () => {
    expect(getFeaturedProducts(3)).toHaveLength(3);
    expect(getFeaturedProducts(100).length).toBeLessThanOrEqual(products.length);
  });

  it("getRelatedProducts excludes the current product and respects the category", () => {
    const mango = getProductBySlug("mango-pickle")!;
    const related = getRelatedProducts(mango, 10);
    expect(related.every((r) => r.id !== mango.id)).toBe(true);
    expect(related.every((r) => r.categoryId === mango.categoryId)).toBe(true);
  });
});

describe("products data — search", () => {
  it("returns all products for an empty query", () => {
    expect(searchProducts("").length).toBe(products.length);
    expect(searchProducts("   ").length).toBe(products.length);
  });

  it("matches by English name (case-insensitive)", () => {
    const res = searchProducts("mango");
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.nameEn.toLowerCase().includes("mango"))).toBe(true);
  });

  it("matches by Telugu name", () => {
    const res = searchProducts("గోంగూర");
    expect(res.length).toBeGreaterThan(0);
    expect(res.some((p) => p.nameTe.includes("గోంగూర"))).toBe(true);
  });

  it("matches by category id", () => {
    const res = searchProducts("pickles");
    expect(res.every((p) => p.categoryId === "pickles")).toBe(true);
  });

  it("returns empty array for a nonsense query", () => {
    expect(searchProducts("zzzznotfound")).toEqual([]);
  });
});
