"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/spa/i18n";
import { Link, useRouter, routeToHash } from "@/spa/router";
import { useCartStore } from "@/spa/store/cartStore";
import { categories } from "@/spa/data/categories";
import { siteConfig } from "@/spa/config/site";
import { getCartCount } from "@/spa/utils/cart";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  ShoppingBag,
  X,
  Globe,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { route } = useRouter();
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const openCart = useCartStore((s) => s.openCart);
  const count = getCartCount(items);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (name: string) => route.name === name;

  const navLinks = [
    { label: t("nav.home"), to: routeToHash({ name: "home" }), name: "home" },
    { label: t("nav.products"), to: routeToHash({ name: "catalog" }), name: "catalog" },
    { label: t("nav.recipes"), to: routeToHash({ name: "recipes" }), name: "recipes" },
    { label: t("nav.about"), to: routeToHash({ name: "about" }), name: "about" },
    { label: t("nav.contact"), to: routeToHash({ name: "contact" }), name: "contact" },
  ];

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    setSearchOpen(false);
    window.location.hash = q
      ? `#/products?q=${encodeURIComponent(q)}`
      : `#/products`;
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-18 lg:px-8">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t("nav.menu")}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 max-w-[85vw] p-0">
              <SheetHeader className="border-b bg-brand-green px-5 py-4">
                <SheetTitle className="flex items-center gap-2 text-brand-cream">
                  <Leaf className="size-5" />
                  {locale === "te" ? siteConfig.brandNameTe : siteConfig.brandName}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((l) => (
                  <Link
                    key={l.name}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      isActive(l.name)
                        ? "bg-brand-cream text-brand-green"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("footer.categories")}
                </p>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`#/products?cat=${c.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                  >
                    {locale === "te" ? c.nameTe : c.nameEn}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="#/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-green text-brand-cream lg:size-10">
              <Leaf className="size-5 lg:size-5.5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-medium text-brand-green lg:text-xl">
                {locale === "te" ? siteConfig.brandNameTe : siteConfig.brandName}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold lg:text-[11px]">
                {locale === "te" ? siteConfig.brandTaglineTe : siteConfig.brandTagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(l.name)
                    ? "text-brand-green"
                    : "text-foreground/80 hover:text-brand-green"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            {/* Search */}
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t("nav.search")}>
                  <Search className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="rounded-b-2xl p-0">
                <SheetHeader className="px-5 pt-5">
                  <SheetTitle className="sr-only">{t("nav.search")}</SheetTitle>
                </SheetHeader>
                <form onSubmit={onSubmitSearch} className="px-5 pb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      autoFocus
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={t("nav.search")}
                      className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-4 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["mango", "gongura", "mixture", "sweet"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSearchValue(s)}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-brand-cream"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            {/* Language selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocale(locale === "en" ? "te" : "en")}
                className="flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                aria-label={t("common.language")}
              >
                <Globe className="size-4" />
                <span className="font-telugu">{locale === "en" ? "EN" : "తె"}</span>
                <ChevronDown className="size-3" />
              </button>
            </div>
            {/* Mobile language toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setLocale(locale === "en" ? "te" : "en")}
              aria-label={t("common.language")}
            >
              <span className="font-telugu text-sm font-semibold">
                {locale === "en" ? "తె" : "EN"}
              </span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              aria-label={t("nav.cart")}
            >
              <ShoppingBag className="size-5" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-brand-terracotta px-1 text-[10px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer open={isCartOpen} onOpenChange={(v) => { if (!v) closeCart(); }} />
    </>
  );
}
