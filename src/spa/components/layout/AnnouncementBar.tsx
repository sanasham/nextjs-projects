"use client";

import { useI18n } from "@/spa/i18n";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden bg-brand-green text-brand-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <Truck className="hidden size-3.5 shrink-0 sm:block" aria-hidden />
        <p className="text-[11px] font-medium tracking-wide sm:text-xs">
          {t("announcement")}
        </p>
        <ShieldCheck className="hidden size-3.5 shrink-0 sm:block" aria-hidden />
      </div>
      <Sparkles
        className="pointer-events-none absolute -right-2 top-1/2 size-6 -translate-y-1/2 text-brand-cream/20"
        aria-hidden
      />
    </div>
  );
}
