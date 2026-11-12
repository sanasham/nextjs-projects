import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  buildCartWhatsappMessage,
  buildProductWhatsappMessage,
} from "@/spa/utils/whatsapp";
import { getCartLines } from "@/spa/utils/cart";
import { getProductById, products } from "@/spa/data/products";
import type { CartItem } from "@/spa/types";

const mango = products.find((p) => p.slug === "mango-pickle")!;
const variant = mango.variants.find((v) => v.id === mango.defaultVariantId)!;

describe("whatsapp — buildProductWhatsappMessage", () => {
  it("includes the product name, variant and quantity (EN)", () => {
    const msg = buildProductWhatsappMessage(mango, variant, 2, "en");
    expect(msg).toContain(mango.nameEn);
    expect(msg).toContain(variant.label);
    expect(msg).toContain("× 2");
  });

  it("uses the Telugu name in Telugu locale", () => {
    const msg = buildProductWhatsappMessage(mango, variant, 1, "te");
    expect(msg).toContain(mango.nameTe);
  });

  it("computes the line total correctly", () => {
    const msg = buildProductWhatsappMessage(mango, variant, 3, "en");
    expect(msg).toContain(`₹${(variant.price * 3).toLocaleString("en-IN")}`);
  });
});

describe("whatsapp — buildCartWhatsappMessage", () => {
  const items: CartItem[] = [
    { productId: mango.id, variantId: mango.defaultVariantId, quantity: 2 },
    {
      productId: "p-gongura-pickle",
      variantId: "v-500",
      quantity: 1,
    },
  ];
  const lines = getCartLines(items, getProductById);

  it("lists every cart line with name, variant and quantity (EN)", () => {
    const msg = buildCartWhatsappMessage(lines, "en");
    expect(msg).toContain(mango.nameEn);
    expect(msg).toContain("Gongura Pickle");
    expect(msg).toContain(mango.defaultVariantId ? "500 g" : "");
  });

  it("includes subtotal, shipping and total labels", () => {
    const msg = buildCartWhatsappMessage(lines, "en");
    expect(msg).toContain("Subtotal");
    expect(msg).toContain("Shipping");
    expect(msg).toContain("Total");
  });

  it("marks shipping as FREE when the threshold is met", () => {
    const bigItems: CartItem[] = [
      { productId: mango.id, variantId: "v-1000", quantity: 3 }, // 599*3 = 1797 > 999
    ];
    const bigLines = getCartLines(bigItems, getProductById);
    const msg = buildCartWhatsappMessage(bigLines, "en");
    expect(msg).toContain("Free");
  });

  it("uses Telugu labels and product names in Telugu locale", () => {
    const msg = buildCartWhatsappMessage(lines, "te");
    expect(msg).toContain(mango.nameTe);
    expect(msg).toContain("మొత్తం");
  });
});
