"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "@/i18n/config";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === locale);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        suppressHydrationWarning
      >
        {current?.name}
        <span className="material-symbols-outlined lang-chevron">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <ul className="lang-dropdown" role="listbox">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              className={`lang-option${lang.code === locale ? " lang-option--active" : ""}`}
              onClick={() => { setLocale(lang.code); setOpen(false); }}
            >
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
