import { describe, it, expect } from "vitest";
import {
  formatPrice,
  getVariant,
  getDiscountPct,
  getCartLines,
  getCartSubtotal,
  getShipping,
  getCartCount,
} from "@/spa/utils/cart";
import { products, getProductById } from "@/spa/data/products";
import { siteConfig } from "@/spa/config/site";
import type { CartItem } from "@/spa/types";

const mango = products[0]; // Andhra Mango Pickle

describe("cart utils — formatPrice", () => {
  it("formats INR with the rupee symbol", () => {
    expect(formatPrice(199)).toBe("₹199");
    expect(formatPrice(1499)).toBe("₹1,499");
    expect(formatPrice(0)).toBe("₹0");
  });

  it("uses Indian grouping for large amounts", () => {
    expect(formatPrice(100000)).toBe("₹1,00,000");
  });
});

describe("cart utils — getVariant", () => {
  it("returns the matching variant", () => {
    const v = getVariant(mango, "v-250");
    expect(v).toBeDefined();
    expect(v?.label).toBe("250 g");
    expect(v?.price).toBe(199);
  });

  it("falls back to the default variant when id is unknown", () => {
    const v = getVariant(mango, "does-not-exist");
    expect(v.id).toBe(mango.defaultVariantId);
  });

  it("falls back to first variant when default is missing", () => {
    const minimal = { ...mango, defaultVariantId: "missing" } as typeof mango;
    const v = getVariant(minimal, "missing");
    expect(v.id).toBe(minimal.variants[0].id);
  });
});

describe("cart utils — getDiscountPct", () => {
  it("computes the rounded discount percentage", () => {
    expect(getDiscountPct(349, 449)).toBe(22); // (100/449)*100 ≈ 22.27 → 22
  });

  it("returns 0 when there is no discount", () => {
    expect(getDiscountPct(199, 199)).toBe(0);
  });

  it("returns 0 when mrp is invalid or below price", () => {
    expect(getDiscountPct(199, 0)).toBe(0);
    expect(getDiscountPct(300, 200)).toBe(0);
  });
});

describe("cart utils — getCartLines", () => {
  it("resolves cart items to full product + variant + line total", () => {
    const items: CartItem[] = [
      { productId: mango.id, variantId: "v-500", quantity: 2 },
    ];
    const lines = getCartLines(items, getProductById);
    expect(lines).toHaveLength(1);
    expect(lines[0].product.id).toBe(mango.id);
    expect(lines[0].variant.label).toBe("500 g");
    expect(lines[0].lineTotal).toBe(349 * 2); // 698
  });

  it("skips items whose product no longer exists", () => {
    const items: CartItem[] = [
      { productId: "ghost-product", variantId: "v-500", quantity: 1 },
      { productId: mango.id, variantId: "v-500", quantity: 1 },
    ];
    const lines = getCartLines(items, getProductById);
    expect(lines).toHaveLength(1);
    expect(lines[0].product.id).toBe(mango.id);
  });
});

describe("cart utils — getCartSubtotal", () => {
  it("sums the line totals", () => {
    const items: CartItem[] = [
      { productId: mango.id, variantId: "v-500", quantity: 2 }, // 698
      { productId: mango.id, variantId: "v-250", quantity: 1 }, // 199
    ];
    const lines = getCartLines(items, getProductById);
    expect(getCartSubtotal(lines)).toBe(698 + 199);
  });

  it("returns 0 for an empty cart", () => {
    expect(getCartSubtotal([])).toBe(0);
  });
});

describe("cart utils — getShipping", () => {
  it("charges the flat fee below the free-shipping threshold", () => {
    expect(getShipping(100)).toBe(siteConfig.flatShippingFee);
    expect(getShipping(siteConfig.freeShippingThreshold - 1)).toBe(
      siteConfig.flatShippingFee
    );
  });

  it("is free at or above the threshold", () => {
    expect(getShipping(siteConfig.freeShippingThreshold)).toBe(0);
    expect(getShipping(5000)).toBe(0);
  });

  it("is 0 for an empty cart", () => {
    expect(getShipping(0)).toBe(0);
  });
});

describe("cart utils — getCartCount", () => {
  it("sums the quantities of all items", () => {
    const items: CartItem[] = [
      { productId: "a", variantId: "v1", quantity: 3 },
      { productId: "b", variantId: "v1", quantity: 2 },
    ];
    expect(getCartCount(items)).toBe(5);
  });

  it("returns 0 for an empty cart", () => {
    expect(getCartCount([])).toBe(0);
  });
});
