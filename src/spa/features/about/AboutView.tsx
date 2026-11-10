"use client";

import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/spa/components/common/SectionHeading";
import {
  Leaf,
  Sun,
  ShieldCheck,
  Heart,
  ArrowRight,
  Quote,
} from "lucide-react";

export function AboutView() {
  const { t, locale } = useI18n();

  const values = [
    { icon: Leaf, title: t("about.value.1.title"), desc: t("about.value.1.desc") },
    { icon: Sun, title: t("about.value.2.title"), desc: t("about.value.2.desc") },
    { icon: ShieldCheck, title: t("about.value.3.title"), desc: t("about.value.3.desc") },
    { icon: Heart, title: t("about.value.4.title"), desc: t("about.value.4.desc") },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-green-dark text-brand-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              {t("about.hero")}
            </span>
            <h1 className="font-display text-4xl font-medium leading-tight sm:text-5xl text-balance">
              {t("about.title")}
            </h1>
            <p className="max-w-xl text-brand-cream/80 text-balance">{t("about.subtitle")}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border-4 border-brand-gold/30 shadow-xl">
            <img
              src="/products/about-story.png"
              alt={t("about.title")}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 text-center">
          <Quote className="mx-auto size-9 text-brand-gold/50" />
          <p className="text-lg leading-relaxed text-foreground/85 sm:text-xl text-balance">
            {t("about.body1")}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
            {t("about.body2")}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={locale === "te" ? "మా విలువలు" : "What we stand for"}
            title={t("about.subtitle")}
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-cream text-brand-green">
                  <v.icon className="size-6" />
                </span>
                <h3 className="font-display text-base font-medium text-brand-ink">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-brand-green px-6 py-12 text-center text-brand-cream sm:px-12">
          <h2 className="font-display text-2xl font-medium sm:text-3xl text-balance">
            {locale === "te" ? "మా వంటకాలను రుచి చూడండి" : "Taste our tradition today"}
          </h2>
          <Link to="#/products">
            <Button className="bg-brand-gold text-brand-ink hover:bg-brand-gold/90">
              {t("about.cta")}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      <p className="mx-auto max-w-7xl px-4 pb-10 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        {t("about.note")}
      </p>
    </div>
  );
}
