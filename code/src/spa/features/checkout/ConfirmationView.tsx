"use client";

import { useState } from "react";
import { useI18n } from "@/spa/i18n";
import { useRouter, Link } from "@/spa/router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { siteConfig } from "@/spa/config/site";
import { openWhatsapp } from "@/spa/utils/whatsapp";
import { WhatsAppIcon } from "@/spa/components/common/WhatsAppIcon";

interface OrderInfo {
  orderNo: string;
  total: number;
  lines: number;
}

export function ConfirmationView() {
  const { t, locale } = useI18n();
  const { route } = useRouter();
  const [orderInfo] = useState<OrderInfo | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem("devi_last_order");
      return raw ? (JSON.parse(raw) as OrderInfo) : null;
    } catch {
      return null;
    }
  });

  const orderNo = route.params.orderNo || orderInfo?.orderNo || "DP-DEMO-000000";

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center animate-fade-in sm:py-20">
      <div className="flex size-24 items-center justify-center rounded-full bg-brand-green/10">
        <CheckCircle2 className="size-14 text-brand-green" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-terracotta">
          {t("checkout.notice")}
        </span>
        <h1 className="font-display text-3xl font-medium text-brand-green sm:text-4xl">
          {t("checkout.success.title")}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          {t("checkout.success.desc")}
        </p>
      </div>

      <div className="w-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-cream text-brand-green">
              <Package className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{t("checkout.success.orderNo")}</p>
              <p className="font-mono text-sm font-semibold text-brand-ink">{orderNo}</p>
            </div>
          </div>
          {orderInfo ? (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{t("common.total")}</p>
              <p className="text-sm font-semibold text-brand-green">
                ₹{orderInfo.total.toLocaleString("en-IN")}
              </p>
            </div>
          ) : null}
        </div>
        {orderInfo ? (
          <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
            {orderInfo.lines} {locale === "te" ? "ఉత్పత్తులు ·" : "items ·"} {siteConfig.estDeliveryDays}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Link to="#/products">
          <Button className="h-11 w-full bg-brand-green text-white hover:bg-brand-green-dark sm:w-auto">
            {t("checkout.success.continue")}
            <ArrowRight className="size-4" />
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-11 w-full border-brand-green text-brand-green hover:bg-brand-cream sm:w-auto"
          onClick={() =>
            openWhatsapp(
              locale === "te"
                ? `నమస్కారం, నేను డెమో ఆర్డర్ ఉంచాను — ${orderNo}. దయచేసి నిర్ధారించండి.`
                : `Hello, I just placed a demo order — ${orderNo}. Please confirm.`
            )
          }
        >
          <WhatsAppIcon className="size-5" />
          {t("contact.whatsappCta")}
        </Button>
      </div>
    </div>
  );
}
