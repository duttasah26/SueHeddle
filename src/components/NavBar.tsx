"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
            <Image src="/images/icons/brand.png" alt="Sue Heddle" width={1080} height={1080} className="nav-icon" priority />
          </Link>
          <nav className="nav-links">
            <Link href="/about" className="nav-link">{t("nav.about")}</Link>
            <Link href="/#vision" className="nav-link">{t("nav.strategy")}</Link>
            <Link href="/#community-support" className="nav-link">{t("nav.experience")}</Link>
            <Link href="/#experience" className="nav-link">{t("nav.joinUs")}</Link>
          </nav>
          <LanguageSwitcher />
          <Link href="/volunteer" className="nav-cta nav-cta--join">{t("getInvolved.joinCampaign")}</Link>
          <Link href="/donate" className="nav-cta">{t("nav.donate")}</Link>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link href="/" className="nav-brand" onClick={close}>
              <Image src="/images/icons/brand.png" alt="Sue Heddle" width={1080} height={1080} className="nav-icon" priority />
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
            <Link href="/volunteer" className="mobile-menu-link" onClick={close}>{t("getInvolved.joinCampaign")}</Link>
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
