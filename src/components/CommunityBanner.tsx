"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function CommunityBanner() {
  const { t } = useLanguage();
  return (
    <section className="quote-section">
      <span className="material-symbols-outlined quote-mark">format_quote</span>
      <h2 className="quote-text">
        {t("banner.quotePre")}
        <span className="quote-accent">{t("banner.quoteAccent")}</span>
      </h2>
    </section>
  );
}
