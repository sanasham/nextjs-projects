"use client";

import { RouterProvider, useRouter } from "@/spa/router";
import { I18nProvider } from "@/spa/i18n";
import { AnnouncementBar } from "@/spa/components/layout/AnnouncementBar";
import { Header } from "@/spa/components/layout/Header";
import { Footer } from "@/spa/components/layout/Footer";
import { WhatsAppFab } from "@/spa/components/layout/WhatsAppFab";
import { HomeView } from "@/spa/features/home/HomeView";
import { CatalogView } from "@/spa/features/catalog/CatalogView";
import { ProductView } from "@/spa/features/product/ProductView";
import { CartView } from "@/spa/features/cart/CartView";
import { CheckoutView } from "@/spa/features/checkout/CheckoutView";
import { ConfirmationView } from "@/spa/features/checkout/ConfirmationView";
import { AboutView } from "@/spa/features/about/AboutView";
import { ContactView } from "@/spa/features/contact/ContactView";
import { AdminView } from "@/spa/features/admin/AdminView";
import { RecipesView } from "@/spa/features/recipes/RecipesView";

function RouteOutlet() {
  const { route } = useRouter();
  switch (route.name) {
    case "catalog":
      return <CatalogView />;
    case "product":
      return <ProductView />;
    case "cart":
      return <CartView />;
    case "checkout":
      return <CheckoutView />;
    case "confirmation":
      return <ConfirmationView />;
    case "about":
      return <AboutView />;
    case "contact":
      return <ContactView />;
    case "admin":
      return <AdminView />;
    case "recipes":
      return <RecipesView />;
    default:
      return <HomeView />;
  }
}

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <AnnouncementBar />
          <Header />
          <main className="flex flex-1 flex-col">
            <RouteOutlet />
          </main>
          <Footer />
          <WhatsAppFab />
        </div>
      </RouterProvider>
    </I18nProvider>
  );
}
