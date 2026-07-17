"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { LANGUAGES, type LangCode } from "@/i18n/config";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";
import zh from "@/i18n/zh.json";
import pa from "@/i18n/pa.json";
import es from "@/i18n/es.json";
import ar from "@/i18n/ar.json";
import ur from "@/i18n/ur.json";
import tl from "@/i18n/tl.json";
import pt from "@/i18n/pt.json";
import ru from "@/i18n/ru.json";
import uk from "@/i18n/uk.json";
import ko from "@/i18n/ko.json";
import hi from "@/i18n/hi.json";

type Dict = Record<string, unknown>;
const bundles: Record<LangCode, Dict> = {
  en: en as Dict, fr: fr as Dict, zh: zh as Dict,
  pa: pa as Dict, es: es as Dict, ar: ar as Dict,
  ur: ur as Dict, tl: tl as Dict, pt: pt as Dict,
  ru: ru as Dict, uk: uk as Dict, ko: ko as Dict, hi: hi as Dict,
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
    // Deliberately never flips document.documentElement.dir to "rtl": this site's
    // flex/grid layouts assume LTR almost everywhere, and only a handful of
    // components (nav-links, hero-ctas, etc.) have RTL counter-overrides — a
    // real dir="rtl" would mirror those few correctly while silently flipping
    // everything else. Arabic/Urdu text still renders right-to-left on its own
    // via the Unicode bidi algorithm regardless of the container's dir.
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
