"use client";

import { useI18n } from "@/spa/i18n";
import { Link, routeToHash } from "@/spa/router";
import { categories } from "@/spa/data/categories";
import { siteConfig } from "@/spa/config/site";
import { useState } from "react";
import { Leaf, Instagram, Facebook, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";

export function Footer() {
  const { t, locale } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  const year = new Date().getFullYear();
  const brandName = locale === "te" ? siteConfig.brandNameTe : siteConfig.brandName;

  return (
    <footer className="mt-auto bg-brand-green-dark text-brand-cream">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-10 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
            <Send className="size-4" />
            {t("section.newsletter.title")}
          </span>
          <p className="max-w-xl text-sm text-brand-cream/80">{t("section.newsletter.subtitle")}</p>
          <form onSubmit={onSubscribe} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("section.newsletter.placeholder")}
              className="h-11 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-brand-cream placeholder:text-brand-cream/50 outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-brand-gold px-6 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-gold/90"
            >
              {t("section.newsletter.cta")}
            </button>
          </form>
          {done ? (
            <p className="text-xs text-brand-gold">
              {locale === "te" ? "ధన్యవాదాలు! మీరు చేరారు." : "Thank you! You're subscribed."}
            </p>
          ) : (
            <p className="text-[11px] text-brand-cream/50">{t("section.newsletter.note")}</p>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3">
          <Link to="#/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-gold text-brand-green-dark">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-xl text-brand-cream">{brandName}</span>
          </Link>
          <p className="max-w-xs text-sm text-brand-cream/85">{t("footer.about")}</p>
          <div className="mt-2 flex gap-2">
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full bg-white/15 text-brand-cream transition-colors hover:bg-brand-gold hover:text-brand-green-dark">
              <Instagram className="size-4" />
            </a>
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full bg-white/15 text-brand-cream transition-colors hover:bg-brand-gold hover:text-brand-green-dark">
              <Facebook className="size-4" />
            </a>
            <a href={siteConfig.social.youtube} aria-label="Youtube" className="flex size-9 items-center justify-center rounded-full bg-white/15 text-brand-cream transition-colors hover:bg-brand-gold hover:text-brand-green-dark">
              <Youtube className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-medium uppercase tracking-wide text-brand-gold">
            {t("footer.quickLinks")}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-cream/90">
            <li><Link to={routeToHash({ name: "home" })} className="hover:text-brand-gold">{t("nav.home")}</Link></li>
            <li><Link to={routeToHash({ name: "catalog" })} className="hover:text-brand-gold">{t("nav.products")}</Link></li>
            <li><Link to={routeToHash({ name: "recipes" })} className="hover:text-brand-gold">{t("nav.recipes")}</Link></li>
            <li><Link to={routeToHash({ name: "about" })} className="hover:text-brand-gold">{t("nav.about")}</Link></li>
            <li><Link to={routeToHash({ name: "contact" })} className="hover:text-brand-gold">{t("nav.contact")}</Link></li>
            <li><Link to={routeToHash({ name: "admin" })} className="hover:text-brand-gold">{t("nav.admin")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-medium uppercase tracking-wide text-brand-gold">
            {t("footer.categories")}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-cream/90">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`#/products?cat=${c.id}`} className="hover:text-brand-gold">
                  {locale === "te" ? c.nameTe : c.nameEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-medium uppercase tracking-wide text-brand-gold">
            {t("footer.contact")}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-cream/90">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <span>{siteConfig.contactPhone}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <span>{siteConfig.contactEmail}</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <span>{siteConfig.addressLine}</span>
            </li>
            <li className="flex gap-2 pt-1 text-xs text-brand-cream/70">
              <span>Prop: {siteConfig.proprietor}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FSSAI Certification badge */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <img
            src="/fssai-logo.svg"
            alt="FSSAI Certified"
            className="h-16 w-auto shrink-0"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-brand-cream">
              {locale === "te" ? "FSSAI ధృవీకృతం" : "FSSAI Certified"}
            </p>
            <p className="text-xs text-brand-cream/70">
              {locale === "te" ? "రెజి. నం" : "Reg. No."}: {siteConfig.fssaiRegNo}
            </p>
            <p className="text-[10px] text-brand-cream/50">
              {locale === "te" ? "14-02-2027 వరకు చెల్లుతుంది" : "Valid until 14-02-2027"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-brand-cream/75 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {year} {brandName}. {t("footer.rights")}</p>
          <p className="max-w-md">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
