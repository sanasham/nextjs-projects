"use client";

import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { useCartStore } from "@/spa/store/cartStore";
import { getProductById } from "@/spa/data/products";
import {
  getCartLines,
  getCartSubtotal,
  getShipping,
  formatPrice,
} from "@/spa/utils/cart";
import { siteConfig } from "@/spa/config/site";
import { openWhatsapp, buildCartWhatsappMessage } from "@/spa/utils/whatsapp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";

export function CartView() {
  const { t, locale } = useI18n();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  const lines = getCartLines(items, getProductById);
  const subtotal = getCartSubtotal(lines);
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;
  const remaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-20 text-center animate-fade-in">
        <div className="flex size-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-medium text-brand-green sm:text-3xl">
            {t("cart.empty.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("cart.empty.desc")}</p>
        </div>
        <Link to="#/products">
          <Button className="bg-brand-green text-white hover:bg-brand-green-dark">
            {t("common.browseProducts")}
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <h1 className="mb-6 font-display text-3xl font-medium text-brand-green sm:text-4xl">
        {t("cart.title")}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="flex flex-col gap-3">
          {/* Free shipping progress */}
          <div className="rounded-xl border border-border bg-brand-cream/30 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="size-4 text-brand-green" />
              {remaining > 0 ? (
                <span>
                  {t("cart.freeShippingNote", { amt: formatPrice(remaining) })}
                </span>
              ) : (
                <span className="font-medium text-brand-green">
                  {t("cart.freeShippingEarned")}
                </span>
              )}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/60">
              <div
                className="h-full rounded-full bg-brand-green transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotal / siteConfig.freeShippingThreshold) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {lines.map((line) => {
              const name = locale === "te" ? line.product.nameTe : line.product.nameEn;
              return (
                <li
                  key={`${line.product.id}-${line.variant.id}`}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4"
                >
                  <Link
                    to={`/product/${line.product.slug}`}
                    className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24"
                  >
                    <img src={line.product.image} alt={name} className="size-full object-cover" loading="lazy" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${line.product.slug}`}
                        className="line-clamp-2 font-medium text-brand-ink hover:text-brand-green"
                      >
                        {name}
                      </Link>
                      <button
                        onClick={() => remove(line.product.id, line.variant.id)}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
                        aria-label={t("cart.remove")}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <span className="mt-0.5 text-xs text-muted-foreground">{line.variant.label}</span>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex items-center gap-1 rounded-lg border border-border">
                        <button
                          onClick={() => setQuantity(line.product.id, line.variant.id, line.quantity - 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-brand-green"
                          aria-label="decrease"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                        <button
                          onClick={() => setQuantity(line.product.id, line.variant.id, line.quantity + 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-brand-green"
                          aria-label="increase"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-brand-green">
                          {formatPrice(line.lineTotal)}
                        </span>
                        <p className="text-[11px] text-muted-foreground">
                          {formatPrice(line.variant.price)} × {line.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link to="#/products" className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-green hover:underline">
            ← {t("common.continueShopping")}
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-display text-lg font-medium text-brand-ink">{t("cart.summary")}</h2>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("common.subtotal")}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("common.shipping")}</span>
                <span className={shipping === 0 ? "font-medium text-brand-green" : "font-medium"}>
                  {shipping === 0 ? t("common.free") : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t("checkout.eta")}</span>
                <span>{siteConfig.estDeliveryDays}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>{t("common.total")}</span>
                <span className="text-brand-green">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Link to="#/checkout">
                <Button className="h-11 w-full bg-brand-green text-white hover:bg-brand-green-dark">
                  {t("cart.checkout")}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button
                onClick={() => openWhatsapp(buildCartWhatsappMessage(lines, locale))}
                variant="outline"
                className="h-11 w-full border-brand-green text-brand-green hover:bg-brand-cream"
              >
                <WhatsAppIcon className="size-4" />
                {t("cart.whatsapp")}
              </Button>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              {t("checkout.notice")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
