"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/spa/App").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
        <span className="text-sm text-muted-foreground">Loading store…</span>
      </div>
    </div>
  ),
});

export default function StoreClient() {
  return <App />;
}
