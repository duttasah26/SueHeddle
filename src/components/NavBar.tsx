"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NavBar({ slim = false }: { slim?: boolean }) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  if (slim) {
    return (
      <header className="nav nav--slim">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <img src="/images/icons/circle_icon.png" alt="Sue Heddle" className="nav-icon" />
          </Link>
          <Link href="/donate" className="nav-cta" style={{ marginLeft: "auto" }}>{t("nav.donate")}</Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link href="/" className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/images/icons/brand.png" alt="Sue Heddle" className="nav-icon" />
          </Link>
          <nav className="nav-links">
            <Link href="/about" className="nav-link">{t("nav.about")}</Link>
            <Link href="/#vision" className="nav-link">{t("nav.strategy")}</Link>
            <Link href="/#community-support" className="nav-link">{t("nav.experience")}</Link>
            <Link href="/#get-involved" className="nav-link">{t("nav.joinUs")}</Link>
          </nav>
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
          </nav>
          <div className="mobile-menu-footer">
            <Link href="/donate" className="mobile-menu-donate" onClick={close}>{t("nav.donate")}</Link>
          </div>
        </div>
      )}
    </>
  );
}
