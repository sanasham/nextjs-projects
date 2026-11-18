import { siteConfig } from "@/spa/config/site";
import type { CartItem, Product, WeightVariant } from "@/spa/types";

export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toLocaleString("en-IN")}`;
}

export function getVariant(
  product: Product,
  variantId: string
): WeightVariant {
  return (
    product.variants.find((v) => v.id === variantId) ??
    product.variants.find((v) => v.id === product.defaultVariantId) ??
    product.variants[0]
  );
}

export function getDiscountPct(price: number, mrp: number): number {
  if (mrp <= 0 || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export interface CartLine {
  product: Product;
  variant: WeightVariant;
  quantity: number;
  lineTotal: number;
}

export function getCartLines(
  items: CartItem[],
  resolver: (id: string) => Product | undefined
): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = resolver(item.productId);
    if (!product) continue;
    const variant = getVariant(product, item.variantId);
    lines.push({
      product,
      variant,
      quantity: item.quantity,
      lineTotal: variant.price * item.quantity,
    });
  }
  return lines;
}

export function getCartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}

export function getShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= siteConfig.freeShippingThreshold) return 0;
  return siteConfig.flatShippingFee;
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
