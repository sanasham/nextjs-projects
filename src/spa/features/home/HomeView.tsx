"use client";

import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { categories } from "@/spa/data/categories";
import { getBestsellers, getNewArrivals, getProductsByCategory } from "@/spa/data/products";
import { ProductCard } from "@/spa/components/common/ProductCard";
import { SectionHeading } from "@/spa/components/common/SectionHeading";
import { siteConfig } from "@/spa/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Sun,
  Truck,
  Leaf,
  ShieldCheck,
  Star,
  Quote,
  Gift,
  Heart,
} from "lucide-react";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";
import { Picture } from "@/spa/components/common/Picture";

export function HomeView() {
  const { t, locale } = useI18n();
  const bestsellers = getBestsellers();
  const snacks = getProductsByCategory("snacks");
  const spicePowders = getProductsByCategory("spices");
  const newArrivals = getNewArrivals();

  const why = [
    { icon: Leaf, title: t("section.why.1.title"), desc: t("section.why.1.desc") },
    { icon: Sun, title: t("section.why.2.title"), desc: t("section.why.2.desc") },
    { icon: Truck, title: t("section.why.3.title"), desc: t("section.why.3.desc") },
    { icon: ShieldCheck, title: t("section.why.4.title"), desc: t("section.why.4.desc") },
  ];

  const testimonials = [
    {
      name: locale === "te" ? "లక్ష్మి ప్రసాద్" : "Lakshmi Prasad",
      city: locale === "te" ? "హైదరాబాద్" : "Hyderabad",
      rating: 5,
      text:
        locale === "te"
          ? "అవకాయ రుచు మా అమ్మ చేసినట్లుగా ఉంది. ప్యాకింగ్ చాలా బాగుంది."
          : "The Avakaya tastes just like my mother makes it. Beautifully packed and delivered fresh!",
    },
    {
      name: locale === "te" ? "రామకృష్ణ" : "Ramakrishna",
      city: locale === "te" ? "బెంగళూరు" : "Bengaluru",
      rating: 5,
      text:
        locale === "te"
          ? "మిక్సర్ చాలా రుచిగా ఉంది. కుటుంబం అందరూ ఇష్టపడ్డారు."
          : "The mixture is exceptional — my whole family loved it. Will definitely reorder.",
    },
    {
      name: locale === "te" ? "సుజాత" : "Sujatha",
      city: locale === "te" ? "చెన్నై" : "Chennai",
      rating: 4,
      text:
        locale === "te"
          ? "గోంగూర ఊరగాయ రుచి అద్భుతం. వేగంగా డెలివరీ అయింది."
          : "Gongura pickle is outstanding and delivery was quick. Authentic Andhra taste!",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden bg-pattern-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-5 text-center md:text-left">
            <Badge className="mx-auto w-fit gap-1.5 rounded-full bg-brand-cream px-3 py-1.5 text-xs font-semibold text-brand-terracotta md:mx-0">
              <Sparkles className="size-3.5" />
              {t("hero.badge")}
            </Badge>
            <h1 className="font-display text-4xl font-medium leading-[1.05] text-brand-green sm:text-5xl lg:text-6xl text-balance">
              {t("hero.title")}
            </h1>
            <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg md:mx-0 text-balance">
              {t("hero.subtitle")}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link to="#/products">
                <Button size="lg" className="h-12 w-full bg-brand-green px-7 text-white hover:bg-brand-green-dark sm:w-auto">
                  {t("hero.cta1")}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="#/products">
                <Button size="lg" variant="outline" className="h-12 w-full border-brand-green bg-transparent px-7 text-brand-green hover:bg-brand-cream sm:w-auto">
                  {t("hero.cta2")}
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground md:justify-start">
              <span className="flex items-center gap-1.5"><Leaf className="size-4 text-brand-green" />{t("hero.stat1")}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-brand-green" />{t("hero.stat2")}</span>
              <span className="flex items-center gap-1.5"><Truck className="size-4 text-brand-green" />{t("hero.stat3")}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-gold/20 via-brand-cream/40 to-brand-green/10 blur-2xl" aria-hidden />
            <div className="overflow-hidden rounded-[1.75rem] border-4 border-white shadow-2xl shadow-brand-green/20">
              <Picture
                src="/products/hero"
                alt={t("hero.title")}
                className="aspect-[16/10] w-full object-cover"
                priority
                fetchPriorityHigh
              />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-card p-3 shadow-lg sm:flex sm:items-center sm:gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-green text-brand-cream">
                <Heart className="size-5" />
              </div>
              <div className="pr-2">
                <p className="text-xs text-muted-foreground">{locale === "te" ? "సంతృప్తి" : "Happy"}</p>
                <p className="text-sm font-semibold text-brand-green">5,000+ {locale === "te" ? "కుటుంబాలు" : "families"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("section.categories.subtitle")}
          title={t("section.categories.title")}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`#/products?cat=${c.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-square w-full overflow-hidden bg-muted">
                <Picture
                  src={c.image}
                  alt={locale === "te" ? c.nameTe : c.nameEn}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 p-3 pb-4 pt-12 text-center" style={{ background: "linear-gradient(to top, rgba(56,33,15,0.98) 30%, rgba(56,33,15,0.6) 80%, transparent 100%)" }}>
                <span className="font-display text-sm font-bold text-brand-cream sm:text-base" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
                  {locale === "te" ? c.nameTe : c.nameEn}
                </span>
                <span className="line-clamp-1 text-[10px] font-medium text-brand-cream sm:text-xs" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
                  {locale === "te" ? c.taglineTe : c.taglineEn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={t("section.bestsellers.subtitle")}
              title={t("section.bestsellers.title")}
              align="left"
            />
            <Link to="#/products" className="text-sm font-medium text-brand-green hover:underline">
              {t("common.viewAll")} →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("section.why.subtitle")}
          title={t("section.why.title")}
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {why.map((w, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-cream text-brand-green">
                <w.icon className="size-6" />
              </span>
              <h3 className="font-display text-base font-medium text-brand-ink">{w.title}</h3>
              <p className="text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="relative overflow-hidden bg-brand-green text-brand-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8">
          <div className="order-2 flex flex-col gap-5 md:order-1">
            <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              {t("section.story.subtitle")}
            </span>
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl text-balance">
              {t("section.story.title")}
            </h2>
            <p className="max-w-xl text-brand-cream/95 text-balance">{t("section.story.body")}</p>
            <div className="mt-2">
              <Link to="#/about">
                <Button variant="outline" className="border-brand-gold bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-green-dark">
                  {t("section.story.cta")}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="overflow-hidden rounded-2xl border-4 border-brand-gold/30 shadow-xl">
              <Picture
                src="/products/about-story"
                alt={t("section.story.title")}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRADITIONAL SNACKS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={locale === "te" ? "కరకరని" : "Crunchy & fresh"}
          title={t("section.snacks.title")}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {snacks.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-terracotta to-[#5a1f10] px-6 py-10 text-brand-cream shadow-lg sm:px-12 sm:py-14">
          <Gift className="absolute -right-6 -top-6 size-32 text-brand-cream/10" aria-hidden />
          <div className="relative flex flex-col items-start gap-4">
            <Badge className="bg-brand-gold text-brand-ink">{t("section.promo.cta")}</Badge>
            <h2 className="font-display text-2xl font-medium sm:text-3xl text-balance drop-shadow-sm">
              {t("section.promo.title")}
            </h2>
            <p className="max-w-lg text-sm text-brand-cream/95 sm:text-base">{t("section.promo.subtitle")}</p>
            <Link to="#/products">
              <Button className="bg-brand-cream text-brand-terracotta hover:bg-brand-cream/90">
                {t("section.promo.cta")}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SPICE POWDERS + NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={locale === "te" ? "రోలుతో నూరినవి" : "Stone-ground"}
          title={t("section.spices.title")}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {[...spicePowders, ...newArrivals.filter((p) => !spicePowders.includes(p))]
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("section.testimonials.subtitle")}
            title={t("section.testimonials.title")}
          />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <figure
                key={i}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="size-7 text-brand-gold/40" aria-hidden />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={s < tm.rating ? "fill-brand-gold text-brand-gold" : "text-border"}
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/90 text-balance">“{tm.text}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-cream font-display text-sm font-medium text-brand-green">
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-ink">{tm.name}</p>
                    <p className="text-xs text-muted-foreground">{tm.city}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {locale === "te" ? "నమూనా సాక్ష్యాలు — డెమో కంటెంట్." : "Sample testimonials — demo content only."}
          </p>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-green/20 bg-brand-cream/40 p-8 text-center shadow-sm sm:p-12">
          <span className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
            <WhatsAppIcon className="size-9" monochrome />
          </span>
          <h2 className="font-display text-2xl font-medium text-brand-green sm:text-3xl text-balance">
            {locale === "te" ? "వాట్సాప్‌లో ఆర్డర్ చేయండి" : "Prefer to order on WhatsApp?"}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base text-balance">
            {locale === "te"
              ? "మీ కార్ట్‌ను వాట్సాప్‌లో పంపండి — మేము సహాయం చేస్తాము. (ప్రిఫిల్డ్ సందేశం ఆర్డర్ నిర్ధారణ కాదు.)"
              : "Send your cart directly to us on WhatsApp and we'll help you complete the order. (A prefilled message is not a confirmed order.)"}
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white shadow-md hover:brightness-105"
          >
            <WhatsAppIcon className="size-5" monochrome />
            {t("contact.whatsappCta")}
          </a>
        </div>
      </section>
    </div>
  );
}
