"use client";

import { useI18n } from "@/spa/i18n";
import { Link } from "@/spa/router";
import { products } from "@/spa/data/products";
import { categories } from "@/spa/data/categories";
import { formatPrice } from "@/spa/utils/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Star,
} from "lucide-react";

/* Demo data */
const sales7d = [
  { day: "Mon", value: 8200 },
  { day: "Tue", value: 9100 },
  { day: "Wed", value: 7600 },
  { day: "Thu", value: 12400 },
  { day: "Fri", value: 15800 },
  { day: "Sat", value: 19200 },
  { day: "Sun", value: 14600 },
];

const recentOrders = [
  { id: "JAF-1042", customer: "Lakshmi P.", items: 3, total: 749, status: "Delivered" },
  { id: "JAF-1041", customer: "Ramakrishna", items: 2, total: 418, status: "Shipped" },
  { id: "JAF-1040", customer: "Sujatha R.", items: 5, total: 1320, status: "Processing" },
  { id: "JAF-1039", customer: "Venu G.", items: 1, total: 199, status: "Pending" },
  { id: "JAF-1038", customer: "Anitha K.", items: 4, total: 980, status: "Delivered" },
];

export function AdminView() {
  const { t, locale } = useI18n();

  const maxSale = Math.max(...sales7d.map((s) => s.value));
  const lowStock = products.filter((p) => p.stockQty <= 15);

  const kpis = [
    {
      label: t("admin.kpi.revenue"),
      value: "₹4,82,640",
      delta: "+12.4%",
      icon: TrendingUp,
      tint: "bg-brand-green text-brand-cream",
    },
    {
      label: t("admin.kpi.orders"),
      value: "1,248",
      delta: "+8.1%",
      icon: ShoppingBag,
      tint: "bg-brand-gold text-brand-ink",
    },
    {
      label: t("admin.kpi.products"),
      value: String(products.length),
      delta: `${categories.length} cats`,
      icon: Package,
      tint: "bg-brand-terracotta text-brand-cream",
    },
    {
      label: t("admin.kpi.customers"),
      value: "864",
      delta: "+5.6%",
      icon: Users,
      tint: "bg-brand-ink text-brand-cream",
    },
  ];

  const statusColor: Record<string, string> = {
    Delivered: "bg-brand-green text-brand-cream",
    Shipped: "bg-brand-gold text-brand-ink",
    Processing: "bg-brand-cream text-brand-terracotta",
    Pending: "bg-muted text-foreground",
  };

  return (
    <div className="w-full max-w-7xl overflow-x-hidden px-4 py-6 sm:mx-auto sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-medium text-brand-green sm:text-3xl">
              {t("admin.title")}
            </h1>
            <Badge className="bg-brand-terracotta text-brand-cream">{t("admin.badge")}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("admin.note")}</p>
        </div>
        <Link to="#/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            {t("nav.home")}
          </Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <span className={`flex size-9 items-center justify-center rounded-lg ${kpi.tint}`}>
                <kpi.icon className="size-5" />
              </span>
              <span className="text-xs font-medium text-brand-green">{kpi.delta}</span>
            </div>
            <p className="mt-3 text-lg font-bold text-brand-ink sm:text-2xl sm:break-normal break-all">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr] sm:gap-5">
        {/* Sales chart */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-medium text-brand-ink">
              <BarChart3 className="size-5 text-brand-green" />
              {t("admin.salesChart")}
            </h2>
          </div>
          <div className="flex h-48 items-end justify-between gap-2 sm:gap-3">
            {sales7d.map((s) => (
              <div key={s.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-green to-brand-gold transition-all hover:opacity-80"
                    style={{ height: `${(s.value / maxSale) * 100}%` }}
                    title={`₹${s.value.toLocaleString("en-IN")}`}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground">{s.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-base font-medium text-brand-ink">
            <AlertTriangle className="size-5 text-brand-terracotta" />
            {t("admin.lowStock")}
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img src={p.image} alt="" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-xs font-medium text-brand-ink">
                    {locale === "te" ? p.nameTe : p.nameEn}
                  </p>
                  <Progress value={(p.stockQty / 50) * 100} className="mt-1 h-1.5" />
                </div>
                <span className="text-xs font-semibold text-brand-terracotta">{p.stockQty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 font-display text-base font-medium text-brand-ink">
          {t("admin.recentOrders")}
        </h2>
        <div className="scrollbar-thin overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs font-medium">{o.id}</TableCell>
                  <TableCell className="text-sm">{o.customer}</TableCell>
                  <TableCell className="hidden text-sm sm:table-cell">{o.items}</TableCell>
                  <TableCell className="text-sm font-medium text-brand-green">
                    {formatPrice(o.total)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[o.status]} variant="secondary">
                      {o.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Top products / Inventory */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2 sm:gap-5">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-medium text-brand-ink">
            {t("admin.topProducts")}
          </h2>
          <ul className="flex flex-col gap-3">
            {[...products]
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 5)
              .map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-cream text-xs font-bold text-brand-green">
                    {i + 1}
                  </span>
                  <div className="size-9 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={p.image} alt="" className="size-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-medium text-brand-ink">
                      {locale === "te" ? p.nameTe : p.nameEn}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Star className="size-3 fill-brand-gold text-brand-gold" />
                      {p.rating.toFixed(1)} · {p.reviewCount} sales
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-medium text-brand-ink">
            {t("admin.inventory")}
          </h2>
          <div className="scrollbar-thin max-h-72 overflow-y-auto pr-1">
            <ul className="flex flex-col gap-2">
              {products.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-lg border border-border p-2">
                  <div className="size-9 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img src={p.image} alt="" className="size-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-medium text-brand-ink">
                      {locale === "te" ? p.nameTe : p.nameEn}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {locale === "te" ? "వర్గం" : "Cat"}:{" "}
                      {locale === "te"
                        ? categories.find((c) => c.id === p.categoryId)?.nameTe
                        : categories.find((c) => c.id === p.categoryId)?.nameEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${p.stockQty <= 15 ? "text-brand-terracotta" : "text-brand-green"}`}>
                      {p.stockQty}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{locale === "te" ? "స్టాక్" : "stock"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
