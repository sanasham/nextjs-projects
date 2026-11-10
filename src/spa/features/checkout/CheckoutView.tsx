"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useI18n } from "@/spa/i18n";
import { useRouter, Link } from "@/spa/router";
import { useCartStore } from "@/spa/store/cartStore";
import { getProductById } from "@/spa/data/products";
import {
  getCartLines,
  getCartSubtotal,
  getShipping,
  formatPrice,
} from "@/spa/utils/cart";
import { siteConfig } from "@/spa/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ShieldAlert,
  CheckCircle2,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Lock,
  ArrowLeft,
} from "lucide-react";

const schema = z.object({
  name: z.string().min(3),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  address: z.string().min(10),
  state: z.string().min(2),
  city: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/),
  paymentMethod: z.enum(["cod", "upi-demo", "card-demo"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const indianStates = [
  "Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala",
  "Maharashtra", "Gujarat", "Delhi", "Uttar Pradesh", "West Bengal",
  "Rajasthan", "Punjab", "Haryana", "Odisha", "Madhya Pradesh", "Other",
];

export function CheckoutView() {
  const { t, locale } = useI18n();
  const { navigate } = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "ok" | "fail">("idle");

  const lines = getCartLines(items, getProductById);
  const subtotal = getCartSubtotal(lines);
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "cod" },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" }) ?? "cod";

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-20 text-center animate-fade-in">
        <h1 className="font-display text-2xl font-medium text-brand-green">
          {t("cart.empty.title")}
        </h1>
        <Link to="#/products">
          <Button className="bg-brand-green text-white hover:bg-brand-green-dark">
            {t("common.browseProducts")}
          </Button>
        </Link>
      </div>
    );
  }

  const checkPincode = (pin: string) => {
    if (!/^\d{6}$/.test(pin)) {
      setPincodeStatus("idle");
      return;
    }
    // Sample serviceability check: demo — pincode ends with even digit = serviceable
    const last = Number(pin.charAt(5));
    setPincodeStatus(last % 2 === 0 ? "ok" : "fail");
  };

  const onSubmit = (data: FormValues) => {
    if (pincodeStatus === "fail") return;
    // Generate a demo order number
    const orderNo = `JAF-DEMO-${Date.now().toString().slice(-6)}`;
    // store order in sessionStorage for confirmation page
    try {
      sessionStorage.setItem(
        "jaf_last_order",
        JSON.stringify({ orderNo, data, total, lines: lines.length })
      );
    } catch {
      /* ignore */
    }
    clear();
    navigate(`/confirmation?orderNo=${orderNo}`);
  };

  const fieldCls = "h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";
  const errCls = "border-destructive focus:border-destructive focus:ring-destructive/20";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <Link to="#/cart" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:underline">
        <ArrowLeft className="size-4" />
        {t("common.continueShopping")}
      </Link>
      <h1 className="mb-2 font-display text-3xl font-medium text-brand-green sm:text-4xl">
        {t("checkout.title")}
      </h1>

      <Alert className="mb-6 border-brand-terracotta/30 bg-brand-terracotta/5">
        <ShieldAlert className="size-4 text-brand-terracotta" />
        <AlertTitle className="text-brand-terracotta">{t("checkout.notice")}</AlertTitle>
        <AlertDescription className="text-xs text-foreground/70">
          {locale === "te"
            ? "ఈ చెక్‌అవుట్ కేవలం డెమో. ఎలాంటి నిజమైన చెల్లింపు జరగదు, ఆర్డర్ ఉంచబడదు."
            : "This checkout is a demonstration only. No real payment is processed and no real order is placed."}
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Contact */}
          <fieldset className="rounded-2xl border border-border bg-card p-5">
            <legend className="flex items-center gap-2 px-2 font-display text-base font-medium text-brand-ink">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-cream">1</span>
              {t("checkout.contact")}
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">{t("checkout.name")} *</Label>
                <Input id="name" {...register("name")} className={`h-11 ${errors.name ? "border-destructive" : ""}`} aria-invalid={!!errors.name} />
                {errors.name ? <p className="text-xs text-destructive">{t("val.nameMin")}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="mobile">{t("checkout.mobile")} *</Label>
                <Input id="mobile" inputMode="numeric" maxLength={10} {...register("mobile")} className={`h-11 ${errors.mobile ? "border-destructive" : ""}`} aria-invalid={!!errors.mobile} />
                {errors.mobile ? <p className="text-xs text-destructive">{t("val.mobile")}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="email">{t("checkout.email")} *</Label>
                <Input id="email" type="email" {...register("email")} className={`h-11 ${errors.email ? "border-destructive" : ""}`} aria-invalid={!!errors.email} />
                {errors.email ? <p className="text-xs text-destructive">{t("val.email")}</p> : null}
              </div>
            </div>
          </fieldset>

          {/* Address */}
          <fieldset className="rounded-2xl border border-border bg-card p-5">
            <legend className="flex items-center gap-2 px-2 font-display text-base font-medium text-brand-ink">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-cream">2</span>
              <MapPin className="size-4 text-brand-green" />
              {t("checkout.address")}
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="address">{t("checkout.address")} *</Label>
                <Textarea id="address" rows={2} {...register("address")} className={errors.address ? "border-destructive" : ""} aria-invalid={!!errors.address} />
                {errors.address ? <p className="text-xs text-destructive">{t("val.address")}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="state">{t("checkout.state")} *</Label>
                <select id="state" {...register("state")} className={fieldCls} aria-invalid={!!errors.state}>
                  <option value="">{locale === "te" ? "ఎంచుకోండి" : "Select"}</option>
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state ? <p className="text-xs text-destructive">{t("val.state")}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">{t("checkout.city")} *</Label>
                <Input id="city" {...register("city")} className={`h-11 ${errors.city ? "border-destructive" : ""}`} aria-invalid={!!errors.city} />
                {errors.city ? <p className="text-xs text-destructive">{t("val.city")}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="pincode">{t("checkout.pincode")} *</Label>
                <div className="flex gap-2">
                  <Input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    {...register("pincode", {
                      onChange: (e) => checkPincode(e.target.value),
                    })}
                    className={`h-11 ${errors.pincode || pincodeStatus === "fail" ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.pincode}
                  />
                </div>
                {errors.pincode ? (
                  <p className="text-xs text-destructive">{t("val.pincode")}</p>
                ) : pincodeStatus === "ok" ? (
                  <p className="flex items-center gap-1 text-xs text-brand-green"><CheckCircle2 className="size-3.5" />{t("checkout.pincodeOk")}</p>
                ) : pincodeStatus === "fail" ? (
                  <p className="text-xs text-destructive">{t("checkout.pincodeFail")}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="notes">{t("checkout.notes")}</Label>
                <Textarea id="notes" rows={2} {...register("notes")} />
              </div>
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="rounded-2xl border border-border bg-card p-5">
            <legend className="flex items-center gap-2 px-2 font-display text-base font-medium text-brand-ink">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-cream">3</span>
              <CreditCard className="size-4 text-brand-green" />
              {t("checkout.payment")}
            </legend>
            <RadioGroup defaultValue="cod" className="mt-4 grid gap-3" value={paymentMethod}>
              {[
                { id: "cod", label: t("checkout.cod"), icon: Banknote, desc: locale === "te" ? "డెలివరీపై చెల్లించండి" : "Pay on delivery" },
                { id: "upi-demo", label: t("checkout.upiDemo"), icon: Wallet, desc: locale === "te" ? "డెమో — నిజమైన చెల్లింపు లేదు" : "Demo — no real charge" },
                { id: "card-demo", label: t("checkout.cardDemo"), icon: CreditCard, desc: locale === "te" ? "డెమో — కార్డ్ వివరాలు సేకరించబడవు" : "Demo — no card data collected" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  htmlFor={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition-colors ${
                    paymentMethod === opt.id
                      ? "border-brand-green bg-brand-cream/30"
                      : "border-border hover:border-brand-gold/40"
                  }`}
                >
                  <RadioGroupItem value={opt.id} id={opt.id} {...register("paymentMethod")} />
                  <opt.icon className="size-5 text-brand-green" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-brand-ink">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              {locale === "te"
                ? "డెమో మాత్రమే — కార్డ్/UPI వివరాలు సేకరించబడవు."
                : "Demo only — we never collect card or UPI credentials."}
            </p>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-display text-lg font-medium text-brand-ink">{t("checkout.summary")}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {lines.map((line) => {
                const name = locale === "te" ? line.product.nameTe : line.product.nameEn;
                return (
                  <li key={`${line.product.id}-${line.variant.id}`} className="flex gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img src={line.product.image} alt={name} className="size-full object-cover" loading="lazy" />
                      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand-terracotta text-[10px] font-bold text-white">
                        {line.quantity}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="line-clamp-1 text-xs font-medium text-brand-ink">{name}</span>
                      <span className="text-[11px] text-muted-foreground">{line.variant.label}</span>
                    </div>
                    <span className="text-sm font-medium text-brand-green">{formatPrice(line.lineTotal)}</span>
                  </li>
                );
              })}
            </ul>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("common.subtotal")}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("common.shipping")}</span>
                <span className={shipping === 0 ? "font-medium text-brand-green" : "font-medium"}>
                  {shipping === 0 ? t("common.free") : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t("checkout.eta")}</span>
                <span>{siteConfig.estDeliveryDays}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>{t("common.total")}</span>
                <span className="text-brand-green">{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || pincodeStatus === "fail"}
              className="mt-5 h-12 w-full bg-brand-green text-white hover:bg-brand-green-dark"
            >
              {t("checkout.placeOrder")}
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              {t("checkout.notice")}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
