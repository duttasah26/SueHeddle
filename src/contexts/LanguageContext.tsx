"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { LANGUAGES, type LangCode } from "@/i18n/config";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";
import zh from "@/i18n/zh.json";
import pa from "@/i18n/pa.json";
import la from "@/i18n/la.json";
import fa from "@/i18n/fa.json";
import ar from "@/i18n/ar.json";

type Dict = Record<string, unknown>;
const bundles: Record<LangCode, Dict> = {
  en: en as Dict, fr: fr as Dict, zh: zh as Dict,
  pa: pa as Dict, la: la as Dict, fa: fa as Dict, ar: ar as Dict,
};

function lookup(dict: Dict, key: string): string {
  const parts = key.split(".");
  let node: unknown = dict;
  for (const part of parts) {
    if (typeof node !== "object" || node === null) return "";
    node = (node as Dict)[part];
  }
  return typeof node === "string" ? node : "";
}

interface LangCtx {
  locale: LangCode;
  setLocale: (code: LangCode) => void;
  t: (key: string) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sue-locale") as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === locale);
    document.documentElement.dir = lang?.dir ?? "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (code: LangCode) => {
    setLocaleState(code);
    localStorage.setItem("sue-locale", code);
  };

  const t = (key: string): string =>
    lookup(bundles[locale], key) || lookup(bundles.en, key) || key;

  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}

export function useLanguage(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
