"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Plus, Check } from "lucide-react";
import type { Product } from "@/spa/types";
import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { Picture } from "@/spa/components/common/Picture";
import { getDiscountPct, getVariant, formatPrice } from "@/spa/utils/cart";
import { useCartStore } from "@/spa/store/cartStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { t, locale } = useI18n();
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  const variant = getVariant(product, product.defaultVariantId);
  const discount = getDiscountPct(variant.price, variant.mrp);
  const name = locale === "te" ? product.nameTe : product.nameEn;
  const lowStock = product.inStock && product.stockQty <= 10;

  // Per-kg rate shown on the card (matches the client's per-kg price list).
  const kgVariant = product.variants.find((v) => v.grams === 1000);
  const perKgPrice = kgVariant
    ? kgVariant.price
    : Math.round((variant.price / variant.grams) * 1000);

  const handleAdd = () => {
    add(product.id, product.defaultVariantId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-gold/40",
        className
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
        ariaLabel={name}
      >
        <Picture
          src={product.image}
          alt={name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestseller ? (
            <Badge className="bg-brand-gold text-white shadow-sm">
              {t("common.bestSeller")}
            </Badge>
          ) : null}
          {product.isNew ? (
            <Badge className="bg-brand-terracotta text-white shadow-sm">
              {t("common.new")}
            </Badge>
          ) : null}
        </div>
        {discount > 0 ? (
          <Badge className="absolute right-3 top-3 bg-brand-green text-white shadow-sm">
            {t("common.off", { pct: discount })}
          </Badge>
        ) : null}
        {!product.inStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[1px]">
            <span className="rounded-full bg-foreground/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-background">
              {t("common.outOfStock")}
            </span>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-brand-gold text-brand-gold" aria-hidden />
          <span className="font-medium text-foreground">
            {product.rating.toFixed(1)}
          </span>
          <span aria-hidden>·</span>
          <span>
            {product.reviewCount} {locale === "te" ? "సమీక్షలు" : "reviews"}
          </span>
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="font-display text-base font-medium leading-snug text-brand-ink transition-colors hover:text-brand-green line-clamp-2"
        >
          {name}
        </Link>

        <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
          {locale === "te" ? product.descTe : product.descEn}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-brand-green">
                {formatPrice(perKgPrice)}
                <span className="text-xs font-medium">/kg</span>
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {variant.label} — {formatPrice(variant.price)}
              {discount > 0 ? (
                <span className="ml-1 line-through">{formatPrice(variant.mrp)}</span>
              ) : null}
              {lowStock ? (
                <span className="ml-1 text-brand-terracotta">
                  · {t("common.onlyLeft", { count: product.stockQty })}
                </span>
              ) : null}
            </span>
          </div>
          <Button
            size="icon"
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={t("common.addToCart")}
            className="size-10 rounded-full bg-brand-green text-white hover:bg-brand-green-dark"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          </Button>
        </div>
      </div>
    </article>
  );
}
