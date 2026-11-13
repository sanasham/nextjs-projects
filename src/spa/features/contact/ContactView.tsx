"use client";

import { useState } from "react";
import { useI18n } from "@/spa/i18n";
import { siteConfig } from "@/spa/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";

export function ContactView() {
  const { t, locale } = useI18n();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: t("contact.success") });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const info = [
    { icon: User, label: "Proprietor", value: siteConfig.proprietor },
    { icon: Phone, label: t("contact.phone"), value: siteConfig.contactPhone },
    { icon: Mail, label: t("contact.emailLabel"), value: siteConfig.contactEmail },
    { icon: MapPin, label: t("contact.addressLabel"), value: siteConfig.addressLine },
    { icon: Clock, label: t("contact.hours"), value: siteConfig.businessHours },
    { icon: ShieldCheck, label: "FSSAI Reg. No.", value: siteConfig.fssaiRegNo },
  ];

  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    locale === "te"
      ? "నమస్కారం, నాకు ఒక ప్రశ్న ఉంది."
      : "Hello, I have an enquiry."
  )}`;

  return (
    <div className="animate-fade-in">
      <section className="bg-brand-green-dark text-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
            {t("contact.subtitle")}
          </span>
          <h1 className="mt-2 font-display text-3xl font-medium sm:text-4xl text-balance">
            {t("contact.title")}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-display text-lg font-medium text-brand-ink">
                {t("contact.infoTitle")}
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {info.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-cream text-brand-green">
                      <item.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-brand-ink break-words">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-white hover:brightness-105"
              >
                <WhatsAppIcon className="size-5" monochrome />
                {t("contact.whatsappCta")}
              </a>

              {/* FSSAI badge */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-brand-green/20 bg-brand-cream/40 p-3">
                <img
                  src="/fssai-logo.svg"
                  alt="FSSAI Certified"
                  className="h-12 w-auto shrink-0"
                />
                <div className="text-xs">
                  <p className="font-semibold text-brand-green">
                    {locale === "te" ? "FSSAI ధృవీకృతం" : "FSSAI Certified"}
                  </p>
                  <p className="text-muted-foreground">
                    {locale === "te" ? "రెజి. నం" : "Reg. No."}: {siteConfig.fssaiRegNo}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <iframe
                  title={t("contact.addressLabel")}
                  src={`https://maps.google.com/maps?q=${siteConfig.mapLat},${siteConfig.mapLng}&z=16&output=embed`}
                  className="size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={siteConfig.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-border bg-brand-green px-4 py-3 text-sm font-medium text-brand-cream transition-colors hover:bg-brand-green-dark"
              >
                <MapPin className="size-4" />
                {locale === "te" ? "దిశలు పొందండి" : "Get Directions"}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="font-display text-lg font-medium text-brand-ink">
              {t("contact.formTitle")}
            </h2>
            <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-name">{t("contact.name")} *</Label>
                <Input id="c-name" required className="h-11" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-email">{t("contact.email")} *</Label>
                <Input id="c-email" type="email" required className="h-11" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="c-subject">{t("contact.subject")}</Label>
                <Input id="c-subject" className="h-11" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="c-message">{t("contact.message")} *</Label>
                <Textarea id="c-message" required rows={5} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="h-11 w-full bg-brand-green text-white hover:bg-brand-green-dark">
                  {submitted ? <CheckCircle2 className="size-4" /> : <Send className="size-4" />}
                  {t("contact.send")}
                </Button>
              </div>
            </form>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              {t("contact.note")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
