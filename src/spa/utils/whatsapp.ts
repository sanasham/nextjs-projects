import { siteConfig } from "@/spa/config/site";
import type { Product, WeightVariant } from "@/spa/types";
import type { CartLine } from "./cart";
import { formatPrice, getCartSubtotal, getShipping } from "./cart";

export function buildCartWhatsappMessage(
  lines: CartLine[],
  locale: "en" | "te"
): string {
  const subtotal = getCartSubtotal(lines);
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  const header =
    locale === "te"
      ? `నమస్కారం, నేను ఈ కింది ఉత్పత్తులను ఆర్డర్ చేయాలనుకుంటున్నాను (డెమో):`
      : `Hello, I would like to order the following (demo):`;

  const itemRows = lines
    .map((l, i) => {
      const name = locale === "te" ? l.product.nameTe : l.product.nameEn;
      return `${i + 1}. ${name}\n   ${l.variant.label} × ${l.quantity} = ${formatPrice(
        l.lineTotal
      )}`;
    })
    .join("\n");

  const labels =
    locale === "te"
      ? { sub: "మొత్తం", ship: "రవాణా", total: "మొత్తం" }
      : { sub: "Subtotal", ship: "Shipping", total: "Total" };

  const summary =
    locale === "te"
      ? `\n\n${labels.sub}: ${formatPrice(subtotal)}\n${labels.ship}: ${
          shipping === 0 ? "ఉచితం" : formatPrice(shipping)
        }\n${labels.total}: ${formatPrice(total)}\n\nదయచేసి నిర్ధారణ ఇవ్వండి. ధన్యవాదాలు.`
      : `\n\n${labels.sub}: ${formatPrice(subtotal)}\n${labels.ship}: ${
          shipping === 0 ? "Free" : formatPrice(shipping)
        }\n${labels.total}: ${formatPrice(total)}\n\nPlease confirm. Thank you!`;

  return `${header}\n\n${itemRows}${summary}`;
}

export function buildProductWhatsappMessage(
  product: Product,
  variant: WeightVariant,
  quantity: number,
  locale: "en" | "te"
): string {
  const name = locale === "te" ? product.nameTe : product.nameEn;
  const header =
    locale === "te"
      ? `నమస్కారం, నేను ఈ ఉత్పత్తి గురించి ప్రశ్న అడగాలనుకుంటున్నాను:`
      : `Hello, I'd like to enquire about this product:`;
  return `${header}\n\n${name}\n${variant.label} × ${quantity} = ${formatPrice(
    variant.price * quantity
  )}`;
}

export function openWhatsapp(message: string): void {
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
