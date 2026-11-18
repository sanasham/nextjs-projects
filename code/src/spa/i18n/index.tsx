"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/spa/types";
import { dictionaries } from "./locales";
import { siteConfig } from "@/spa/config/site";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "devi_locale";

function interpolate(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, k: string) =>
    params[k] !== undefined ? String(params[k]) : `{{${k}}}`
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return siteConfig.locale;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "te") return stored;
    } catch {
      /* ignore */
    }
    return siteConfig.locale;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dataset.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "te" : "en");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const dict = dictionaries[locale];
      const value = dict[key] ?? dictionaries.en[key] ?? key;
      return interpolate(value, params);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
