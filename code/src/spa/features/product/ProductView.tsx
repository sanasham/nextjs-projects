"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/spa/i18n";
import { useRouter, Link } from "@/spa/router";
import { getProductBySlug, getRelatedProducts } from "@/spa/data/products";
import { getCategoryById } from "@/spa/data/categories";
import type { Product } from "@/spa/types";
import {
  getDiscountPct,
  getVariant,
  formatPrice,
} from "@/spa/utils/cart";
import { useCartStore } from "@/spa/store/cartStore";
import { openWhatsapp, buildProductWhatsappMessage } from "@/spa/utils/whatsapp";
import { ProductCard } from "@/spa/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ChevronRight,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  Snowflake,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/spa/config/site";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";
import { Picture } from "@/spa/components/common/Picture";

export function ProductView() {
  const { route, navigate } = useRouter();
  const { t } = useI18n();
  const slug = route.params.slug;

  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-brand-green">Product not found</h1>
        <Button onClick={() => navigate("/products")} className="bg-brand-green hover:bg-brand-green-dark">
          {t("common.browseProducts")}
        </Button>
      </div>
    );
  }

  // `key` resets all internal state cleanly when navigating between products.
  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const { navigate } = useRouter();
  const { toast } = useToast();
  const add = useCartStore((s) => s.add);

  const [variantId, setVariantId] = useState<string>(product.defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const variant = getVariant(product, variantId);
  const discount = getDiscountPct(variant.price, variant.mrp);
  const name = locale === "te" ? product.nameTe : product.nameEn;
  const desc = locale === "te" ? product.descTe : product.descEn;
  const category = getCategoryById(product.categoryId);
  const ingredients = locale === "te" ? product.ingredientsTe : product.ingredientsEn;
  const allergen = locale === "te" ? product.allergenTe : product.allergenEn;
  const shelfLife = locale === "te" ? product.shelfLifeTe : product.shelfLifeEn;
  const storage = locale === "te" ? product.storageTe : product.storageEn;
  const related = getRelatedProducts(product, 4);

  const kgVariant = product.variants.find((v) => v.grams === 1000);
  const perKgPrice = kgVariant
    ? kgVariant.price
    : Math.round((variant.price / variant.grams) * 1000);

  const handleAdd = () => {
    add(product.id, variant.id, quantity);
    setAdded(true);
    toast({ title: t("common.added"), description: name });
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsapp = () => {
    openWhatsapp(buildProductWhatsappMessage(product, variant, quantity, locale));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link to="#/" className="hover:text-brand-green">{t("nav.home")}</Link>
        <ChevronRight className="size-3" />
        <Link to="#/products" className="hover:text-brand-green">{t("nav.products")}</Link>
        <ChevronRight className="size-3" />
        {category ? (
          <>
            <Link to={`#/products?cat=${category.id}`} className="hover:text-brand-green">
              {locale === "te" ? category.nameTe : category.nameEn}
            </Link>
            <ChevronRight className="size-3" />
          </>
        ) : null}
        <span className="text-foreground">{name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Picture
              src={product.gallery[activeImg] ?? product.image}
              alt={name}
              className="size-full object-cover"
              priority
              fetchPriorityHigh
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.bestseller ? (
                <Badge className="bg-brand-gold text-white">{t("common.bestSeller")}</Badge>
              ) : null}
              {product.isNew ? (
                <Badge className="bg-brand-terracotta text-white">{t("common.new")}</Badge>
              ) : null}
            </div>
            {discount > 0 ? (
              <Badge className="absolute right-3 top-3 bg-brand-green text-white">
                {t("common.off", { pct: discount })}
              </Badge>
            ) : null}
          </div>
          {product.gallery.length > 1 ? (
            <div className="flex gap-2">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "size-16 overflow-hidden rounded-lg border-2 bg-muted transition-colors sm:size-20",
                    activeImg === i ? "border-brand-green" : "border-transparent hover:border-border"
                  )}
                  aria-label={`image ${i + 1}`}
                >
                  <Picture src={g} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {category ? (
              <Link
                to={`#/products?cat=${category.id}`}
                className="text-xs font-semibold uppercase tracking-wide text-brand-gold hover:underline"
              >
                {locale === "te" ? category.nameTe : category.nameEn}
              </Link>
            ) : null}
            <h1 className="font-display text-2xl font-medium leading-tight text-brand-ink sm:text-3xl text-balance">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-brand-gold text-brand-gold" />
                <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  · {product.reviewCount} {t("product.reviews")}
                </span>
              </span>
              <span className={cn("flex items-center gap-1.5 text-xs font-medium", product.inStock ? "text-brand-green" : "text-destructive")}>
                <span className={cn("size-2 rounded-full", product.inStock ? "bg-brand-green" : "bg-destructive")} />
                {product.inStock ? t("common.inStock") : t("common.outOfStock")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-3xl font-bold text-brand-green">{formatPrice(variant.price)}</span>
            <span className="pb-1.5 text-sm text-muted-foreground">/ {variant.label}</span>
            {discount > 0 ? (
              <span className="pb-1 text-base text-muted-foreground line-through">
                {formatPrice(variant.mrp)}
              </span>
            ) : null}
            {discount > 0 ? (
              <Badge className="mb-1 bg-brand-cream text-brand-terracotta">
                {t("common.off", { pct: discount })}
              </Badge>
            ) : null}
            <span className="w-full text-sm font-medium text-brand-green/80 sm:w-auto sm:pb-1">
              {formatPrice(perKgPrice)}/kg
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{desc}</p>

          {/* Variant selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">{t("common.weight")}</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "flex flex-col items-center rounded-xl border-2 px-4 py-2.5 text-sm transition-all",
                    variantId === v.id
                      ? "border-brand-green bg-brand-cream/40"
                      : "border-border bg-background hover:border-brand-gold/50"
                  )}
                  aria-pressed={variantId === v.id}
                >
                  <span className="font-medium text-brand-ink">{v.label}</span>
                  <span className="text-xs text-muted-foreground">{formatPrice(v.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-12 items-center gap-1 rounded-xl border border-border bg-card px-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand-green"
                aria-label="decrease"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-base font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand-green"
                aria-label="increase"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="h-12 flex-1 bg-brand-green text-white hover:bg-brand-green-dark"
            >
              {added ? <Check className="size-5" /> : <ShoppingBag className="size-5" />}
              {t("common.addToCart")}
            </Button>
          </div>
          <Button
            onClick={handleWhatsapp}
            variant="outline"
            className="h-12 border-brand-green bg-transparent text-brand-green hover:bg-brand-cream"
          >
            <WhatsAppIcon className="size-5" />
            {t("common.buyNow")}
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/30 p-3 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck className="size-5 text-brand-green" />
              <span className="text-[11px] text-muted-foreground">{t("hero.stat3")}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Leaf className="size-5 text-brand-green" />
              <span className="text-[11px] text-muted-foreground">{t("hero.stat1")}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck className="size-5 text-brand-green" />
              <span className="text-[11px] text-muted-foreground">{t("hero.stat2")}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Clock className="size-5 text-brand-green" />
              <span className="text-[11px] text-muted-foreground">{siteConfig.estDeliveryDays}</span>
            </div>
          </div>

          {/* FSSAI trust badge */}
          <div className="flex items-center gap-3 rounded-xl border border-brand-green/20 bg-brand-cream/40 p-3">
            <img
              src="/fssai-logo.svg"
              alt="FSSAI Certified"
              className="h-12 w-auto shrink-0"
            />
            <div className="text-xs">
              <p className="font-semibold text-brand-green">
                {locale === "te" ? "FSSAI ధృవీకృత ఆహారం" : "FSSAI Certified Food"}
              </p>
              <p className="text-muted-foreground">
                {locale === "te" ? "రెజి. నం" : "Reg. No."}: {siteConfig.fssaiRegNo}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="mt-2">
            <TabsList className="w-full justify-start gap-1 bg-muted/40">
              <TabsTrigger value="details">{t("product.description")}</TabsTrigger>
              <TabsTrigger value="info">{t("product.ingredients")}</TabsTrigger>
              <TabsTrigger value="storage">{t("product.storage")}</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-3 text-sm leading-relaxed text-foreground/80">
              {desc}
            </TabsContent>
            <TabsContent value="info" className="mt-3 space-y-3 text-sm">
              <div>
                <h4 className="mb-2 font-medium text-brand-ink">{t("product.ingredients")}</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {ingredients.map((ing) => (
                    <li key={ing} className="rounded-full bg-brand-cream/50 px-2.5 py-1 text-xs text-brand-ink">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div className="flex gap-2">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-brand-terracotta" />
                <div>
                  <h4 className="font-medium text-brand-ink">{t("product.allergen")}</h4>
                  <p className="text-muted-foreground">{allergen}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-green" />
                <div>
                  <h4 className="font-medium text-brand-ink">{t("product.shelfLife")}</h4>
                  <p className="text-muted-foreground">{shelfLife}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="storage" className="mt-3 space-y-3 text-sm">
              <div className="flex gap-2">
                <Snowflake className="mt-0.5 size-4 shrink-0 text-brand-green" />
                <div>
                  <h4 className="font-medium text-brand-ink">{t("product.storage")}</h4>
                  <p className="text-muted-foreground">{storage}</p>
                </div>
              </div>
              <p className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                {locale === "te"
                  ? "గమనిక: పదార్థాలు మరియు సమాచారం నమూనా మాత్రమే. ఉత్పత్తి ప్యాకేజీని చూడండి."
                  : "Note: Ingredients and info are sample data. Refer to the product package."}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium text-brand-green sm:text-3xl">
              {t("common.relatedProducts")}
            </h2>
            <Link to="#/products" className="text-sm font-medium text-brand-green hover:underline">
              {t("common.viewAll")} →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

