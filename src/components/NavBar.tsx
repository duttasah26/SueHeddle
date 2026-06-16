"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NavBar() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu" suppressHydrationWarning>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link href="/" className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/images/icons/brand.png" alt="Sue Heddle" className="nav-icon" />
          </Link>
          <LanguageSwitcher />
          <nav className="nav-links">
            <Link href="/about" className="nav-link">{t("nav.about")}</Link>
            <Link href="/#vision" className="nav-link">{t("nav.strategy")}</Link>
            <Link href="/#community-support" className="nav-link">{t("nav.experience")}</Link>
            <Link href="/#experience" className="nav-link">{t("nav.joinUs")}</Link>
          </nav>
          <Link href="/volunteer" className="nav-cta nav-cta--join">Join The Campaign</Link>
          <Link href="/donate" className="nav-cta">{t("nav.donate")}</Link>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link href="/" className="nav-brand" onClick={close}>
              <img src="/images/icons/brand.png" alt="Sue Heddle" className="nav-icon" />
            </Link>
            <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="mobile-menu-links">
            <Link href="/about" className="mobile-menu-link" onClick={close}>{t("nav.about")}</Link>
            <Link href="/#vision" className="mobile-menu-link" onClick={close}>{t("nav.strategy")}</Link>
            <Link href="/#community-support" className="mobile-menu-link" onClick={close}>{t("nav.experience")}</Link>
            <Link href="/#get-involved" className="mobile-menu-link" onClick={close}>{t("nav.joinUs")}</Link>
            <Link href="/volunteer" className="mobile-menu-link" onClick={close}>Join The Campaign</Link>
          </nav>
          <div className="mobile-menu-footer">
            <LanguageSwitcher />
            <Link href="/donate" className="mobile-menu-donate" onClick={close}>{t("nav.donate")}</Link>
          </div>
        </div>
      )}
    </>
  );
}
