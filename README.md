# Jampani Andhra Foods — Telugu Food Ecommerce (Client Demo Prototype)

A premium, mobile-first ecommerce prototype for a traditional Telugu/Andhra food
brand. Built as a client demonstration project for design approval — **not** the
production platform.

> ⚠️ **Prototype notice:** All products, prices, testimonials, contact details,
> order data and dashboard figures are **sample / placeholder data**. No real
> payment is processed, no real orders are placed, and no customer data is
> collected.

---

## ✨ Features

- **Premium, original design** inspired by traditional Andhra food branding
  (deep green, terracotta, cream, gold palette).
- **Mobile-first responsive layout** tested from 320px → 1440px+.
- **English ↔ Telugu (తెలుగు)** full UI localization with persistent language
  preference and Noto Sans Telugu typography.
- **Home page** — hero, shop-by-category, bestsellers, why-choose-us, brand
  story, testimonials (sample), promo banner, WhatsApp CTA, newsletter (demo).
- **Product catalogue** — grid (2/3/4 cols), category filters, live search,
  sorting (popularity / price / rating), badges, availability.
- **Product detail** — image gallery, weight variant selector, quantity,
  add-to-cart, WhatsApp enquiry, ingredients/allergen/shelf-life/storage,
  related products.
- **Cart** — Zustand + `localStorage` persistence, quantity controls, remove,
  free-shipping progress, subtotal/shipping/total, empty state.
- **Checkout demo** — React Hook Form + Zod validation, contact + address,
  pincode serviceability check (demo), payment method selector (demo),
  simulated order confirmation with demo order number. Clearly labelled
  "Demo only — No real payment will be processed."
- **WhatsApp ordering** — prefilled enquiry message for cart or single product
  (a prefilled message is **not** a confirmed order).
- **About & Contact** pages with placeholder copy clearly marked.
- **Optional admin dashboard preview** with "Demo Data" indicator (KPIs, sales
  chart, recent orders, low-stock alerts, inventory).
- **Floating WhatsApp button** site-wide.

---

## 🧱 Technology stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) — see note below |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| State (cart) | Zustand + `localStorage` persistence |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| i18n | Custom lightweight context (EN/TE) |
| Routing | Hash-based client router on a single `/` route |

> **Note on framework:** The original brief requested React + Vite. This sandbox
> environment ships a pre-initialized Next.js 16 runtime whose dev server and
> gateway are wired to port 3000, so the prototype is delivered on Next.js
> while preserving the requested architecture (feature-based folders, Zustand,
> RHF+Zod, i18n, Lucide, Tailwind). The storefront itself is a fully
> client-side SPA with hash routing — functionally equivalent to a Vite SPA.

---

## 🚀 Getting started

### Prerequisites
- Node.js 20+ / Bun
- npm (or bun)

### Installation & development
```bash
bun install          # install dependencies
bun run dev          # start dev server on http://localhost:3000
```

### Other commands
```bash
bun run lint         # ESLint
bun run build        # production build (Next.js)
bun run db:push      # (not used by the prototype storefront)
```

> The storefront is visible only on the `/` route. All "pages" (catalog,
> product, cart, checkout, about, contact, admin) are client-side views
> switched via hash routing (`#/products`, `#/product/:slug`, `#/cart`, …) and
> work on direct navigation, refresh, and back/forward.

---

## 📁 Project structure

```
src/
├── app/                      # Next.js app shell (layout, page entry, fonts)
│   ├── layout.tsx            # fonts (Poppins, Marcellus, Noto Sans Telugu)
│   ├── page.tsx              # lazy-loads the client SPA
│   └── globals.css           # design tokens + brand palette
├── spa/                      # the storefront SPA (client-side)
│   ├── App.tsx               # providers + route outlet
│   ├── router/               # hash router + <Link>
│   ├── i18n/                 # EN/TE dictionaries + provider
│   ├── store/                # Zustand cart store
│   ├── data/                 # mock products + categories
│   ├── config/               # site config (WhatsApp #, shipping, etc.)
│   ├── types/                # shared TS types
│   ├── utils/                # cart + whatsapp helpers
│   ├── components/
│   │   ├── common/           # ProductCard, SectionHeading
│   │   └── layout/           # Header, Footer, CartDrawer, AnnouncementBar, FAB
│   └── features/             # home, catalog, product, cart, checkout, about, contact, admin
├── components/ui/             # shadcn/ui primitives
└── lib/utils.ts               # cn() helper
```

---

## 🛠️ How to customize

### Update mock products / categories
Edit `src/spa/data/products.ts` and `src/spa/data/categories.ts`.
Each product supports: id, slug, EN/TE name & description, category, images,
gallery, weight variants (price + MRP), ingredients (EN/TE), allergen,
shelf-life, storage, stock, bestseller/new flags, rating, reviewCount.

### Update translations
Edit `src/spa/i18n/locales.ts` (`en` and `te` dictionaries). Keys are dotted
strings; interpolation uses `{{param}}`.

### Change the WhatsApp number
Edit `src/spa/config/site.ts` → `whatsappNumber` (currently a placeholder
`919000000000`). Replace with the client's official business number after
approval. The same file holds contact email/phone/address placeholders and
shipping thresholds.

### Replace images
Drop images into `public/products/`. Filenames are referenced from
`src/spa/data/products.ts` and `categories.ts`.

---

## ☁️ Deployment (Cloudflare Pages / static hosting)

This prototype is a static frontend with no backend dependency.

1. Build:
   ```bash
   bun run build
   ```
2. Deploy the output to Cloudflare Pages (or any static host).
3. SPA routing: the storefront uses hash-based routing on a single `/` route,
   so **no special SPA fallback / `_redirects` is required** — every view lives
   under `/` and is resolved client-side via the URL hash.

> No environment variables or secrets are required. The WhatsApp number and all
> content are sample/placeholder values.

---

## ⚠️ What is intentionally NOT real

- **Payments:** No Razorpay / gateway. The checkout only simulates a flow.
- **Orders:** No order is actually placed or stored on a server.
- **Inventory / stock:** Mock figures only.
- **Authentication / accounts:** Not implemented.
- **Courier / delivery serviceability:** Pincode check uses demo logic.
- **Email / SMS notifications:** None sent (newsletter form is a no-op).
- **Admin dashboard:** Illustrative sample data only.

These belong to a separately-approved production phase.

---

## ✅ Acceptance checklist

- [x] Premium, original Telugu food ecommerce design
- [x] Responsive across mobile / tablet / desktop
- [x] English ↔ Telugu switching works app-wide
- [x] Product browsing, filters, sorting, search
- [x] Product detail with variants, ingredients, related items
- [x] Cart: add / remove / quantity / persistence
- [x] Checkout: validation + simulated confirmation (clearly demo)
- [x] WhatsApp enquiry (configurable placeholder number)
- [x] Clean, modular, typed architecture
- [x] Lint passes, dev server runs, browser-verified interactions
- [x] Static-host ready

---

© Jampani Andhra Foods (demo). All product data, prices, testimonials and
business contact details are sample placeholders for client demonstration.
