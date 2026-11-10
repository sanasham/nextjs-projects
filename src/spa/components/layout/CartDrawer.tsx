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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, X, MessageCircle } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { t, locale } = useI18n();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  const lines = getCartLines(items, getProductById);
  const subtotal = getCartSubtotal(lines);
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  const remainingForFreeShip = Math.max(
    0,
    siteConfig.freeShippingThreshold - subtotal
  );

  const goCheckout = () => {
    onOpenChange(false);
    window.location.hash = "#/checkout";
  };

  const goShop = () => {
    onOpenChange(false);
    window.location.hash = "#/products";
  };

  const onWhatsapp = () => {
    if (lines.length === 0) return;
    openWhatsapp(buildCartWhatsappMessage(lines, locale));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg text-brand-green">
            <ShoppingBag className="size-5" />
            {t("cart.title")}
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">{t("cart.title")}</SheetDescription>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-9 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("cart.empty.title")}</p>
              <p className="text-sm text-muted-foreground">{t("cart.empty.desc")}</p>
            </div>
            <Button onClick={goShop} className="bg-brand-green hover:bg-brand-green-dark">
              {t("common.browseProducts")}
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b bg-brand-cream/40 px-5 py-3">
              {remainingForFreeShip > 0 ? (
                <p className="text-xs text-brand-ink">
                  {t("cart.freeShippingNote", {
                    amt: formatPrice(remainingForFreeShip),
                  })}
                </p>
              ) : (
                <p className="text-xs font-medium text-brand-green">
                  {t("cart.freeShippingEarned")}
                </p>
              )}
            </div>

            <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-3">
              <ul className="flex flex-col gap-3">
                {lines.map((line) => {
                  const name =
                    locale === "te" ? line.product.nameTe : line.product.nameEn;
                  return (
                    <li
                      key={`${line.product.id}-${line.variant.id}`}
                      className="flex gap-3 rounded-xl border border-border bg-card p-2.5"
                    >
                      <Link
                        to={`/product/${line.product.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted"
                      >
                        <img
                          src={line.product.image}
                          alt={name}
                          className="size-full object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${line.product.slug}`}
                            onClick={() => onOpenChange(false)}
                            className="line-clamp-2 text-sm font-medium text-brand-ink hover:text-brand-green"
                          >
                            {name}
                          </Link>
                          <button
                            onClick={() => remove(line.product.id, line.variant.id)}
                            className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                            aria-label={t("cart.remove")}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {line.variant.label}
                        </span>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-lg border border-border">
                            <button
                              onClick={() =>
                                setQuantity(
                                  line.product.id,
                                  line.variant.id,
                                  line.quantity - 1
                                )
                              }
                              className="flex size-7 items-center justify-center text-muted-foreground hover:text-brand-green"
                              aria-label="decrease"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(
                                  line.product.id,
                                  line.variant.id,
                                  line.quantity + 1
                                )
                              }
                              className="flex size-7 items-center justify-center text-muted-foreground hover:text-brand-green"
                              aria-label="increase"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-brand-green">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t bg-card px-5 py-4">
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("common.subtotal")}</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("common.shipping")}</span>
                  <span className={shipping === 0 ? "text-brand-green" : "text-foreground"}>
                    {shipping === 0 ? t("common.free") : formatPrice(shipping)}
                  </span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-base font-semibold">
                  <span>{t("common.total")}</span>
                  <span className="text-brand-green">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <Button
                  onClick={goCheckout}
                  className="h-11 w-full bg-brand-green text-white hover:bg-brand-green-dark"
                >
                  {t("cart.checkout")}
                </Button>
                <Button
                  onClick={onWhatsapp}
                  variant="outline"
                  className="h-11 w-full border-brand-green text-brand-green hover:bg-brand-cream"
                >
                  <MessageCircle className="size-4" />
                  {t("cart.whatsapp")}
                </Button>
                <Link
                  to="#/products"
                  onClick={() => onOpenChange(false)}
                  className="text-center text-xs text-muted-foreground hover:text-brand-green"
                >
                  {t("common.continueShopping")}
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
