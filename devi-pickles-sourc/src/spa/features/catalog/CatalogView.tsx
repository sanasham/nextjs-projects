"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/spa/i18n";
import { useRouter } from "@/spa/router";
import { products } from "@/spa/data/products";
import { categories } from "@/spa/data/categories";
import { ProductCard } from "@/spa/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, PackageX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/spa/types";

type SortKey = "popular" | "priceAsc" | "priceDesc" | "rating";

export function CatalogView() {
  const { t, locale } = useI18n();
  const { route } = useRouter();

  // Derive category & query directly from route params (single source of truth).
  const activeCat: CategoryId | "all" =
    (route.params.cat as CategoryId | undefined) ?? "all";
  const routeQuery = route.params.q ?? "";

  // Local input state for the search box. The actual filter uses routeQuery
  // (from the URL) as the single source of truth; typing updates the hash.
  const [sort, setSort] = useState<SortKey>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const navigateWith = (cat: CategoryId | "all" | null, q: string | null) => {
    const params = new URLSearchParams();
    const nextCat = cat === null ? activeCat : cat;
    const nextQ = q === null ? routeQuery : q;
    if (nextCat !== "all") params.set("cat", nextCat);
    if (nextQ.trim()) params.set("q", nextQ.trim());
    const qs = params.toString();
    window.location.hash = qs ? `#/products?${qs}` : "#/products";
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = activeCat === "all" || p.categoryId === activeCat;
      const q = routeQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTe.includes(q) ||
        p.descEn.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    switch (sort) {
      case "priceAsc":
        list = [...list].sort(
          (a, b) =>
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price))
        );
        break;
      case "priceDesc":
        list = [...list].sort(
          (a, b) =>
            Math.min(...b.variants.map((v) => v.price)) -
            Math.min(...a.variants.map((v) => v.price))
        );
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviewCount - a.reviewCount
        );
    }
    return list;
  }, [activeCat, routeQuery, sort]);

  const clearFilters = () => {
    setSort("popular");
    window.location.hash = "#/products";
  };

  const catTabs: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: t("catalog.allCategories") },
    ...categories.map((c) => ({
      id: c.id,
      label: locale === "te" ? c.nameTe : c.nameEn,
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-medium text-brand-green sm:text-4xl">
          {t("catalog.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("catalog.results", { count: filtered.length })}
        </p>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-20 -mx-4 mb-6 border-y border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              key={routeQuery}
              defaultValue={routeQuery}
              onChange={(e) => navigateWith(null, e.target.value)}
              placeholder={t("catalog.search")}
              className="h-10 rounded-full border-border pl-10 pr-4"
              aria-label={t("catalog.search")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 lg:hidden"
              onClick={() => setShowFilters((s) => !s)}
            >
              <SlidersHorizontal className="size-4" />
              {t("catalog.filter")}
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-10 w-full min-w-[180px] rounded-full border-border bg-background sm:w-[210px]">
                <SelectValue placeholder={t("catalog.sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t("catalog.sort.popular")}</SelectItem>
                <SelectItem value="priceAsc">{t("catalog.sort.priceAsc")}</SelectItem>
                <SelectItem value="priceDesc">{t("catalog.sort.priceDesc")}</SelectItem>
                <SelectItem value="rating">{t("catalog.sort.rating")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category tabs */}
        <div className={cn("mt-3 flex flex-wrap gap-2", !showFilters && "hidden lg:flex")}>
          {catTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigateWith(tab.id, null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCat === tab.id
                  ? "bg-brand-green text-brand-cream"
                  : "border border-border bg-background text-foreground hover:bg-brand-cream"
              )}
              aria-pressed={activeCat === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-muted">
            <PackageX className="size-9 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">{t("catalog.empty")}</p>
          <Button onClick={clearFilters} variant="outline" className="border-brand-green text-brand-green">
            <X className="size-4" />
            {t("catalog.clear")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
