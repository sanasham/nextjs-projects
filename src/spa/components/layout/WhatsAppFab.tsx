"use client";

import { siteConfig } from "@/spa/config/site";
import { useI18n } from "@/spa/i18n";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";

/** Persistent floating WhatsApp enquiry button. */
export function WhatsAppFab() {
  const { t, locale } = useI18n();
  const msg =
    locale === "te"
      ? "నమస్కారం, నేను మీ ఉత్పత్తుల గురించి సమాచారం కావాలనుకుంటున్నాను."
      : "Hello, I'd like to know more about your products.";
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contact.whatsappCta")}
      className="group fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-8" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-brand-ink px-3 py-1.5 text-xs font-medium text-brand-cream opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        {t("contact.whatsappCta")}
      </span>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}
