"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LoadingDots from "@/components/LoadingDots";

export default function GetInvolvedSection() {
  const { t } = useLanguage();

  const [newsName,       setNewsName]       = useState("");
  const [newsEmail,      setNewsEmail]      = useState("");
  const [newsPostal,     setNewsPostal]     = useState("");
  const [newsSubmitting, setNewsSubmitting] = useState(false);
  const [newsSubmitted,  setNewsSubmitted]  = useState(false);
  const [newsError,      setNewsError]      = useState("");
  const [newsCompany,    setNewsCompany]    = useState("");

  async function handleNewsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newsName.trim()) { setNewsError("Name is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail.trim())) {
      setNewsError("Please enter a valid email address."); return;
    }
    setNewsSubmitting(true);
    setNewsError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newsName, email: newsEmail, postal: newsPostal, company: newsCompany }),
      });
      const data = await res.json();
      if (data.error) { setNewsError(data.error); return; }
      setNewsSubmitted(true);
    } catch {
      setNewsError("Something went wrong. Please try again.");
    } finally {
      setNewsSubmitting(false);
    }
  }
  return (
    <div id="get-involved">
      {/* Row 1: Take Action */}
      <div className="involve-row-action">
        <div className="involve-row-inner">
          <p className="involve-section-label">{t("getInvolved.takeAction")}</p>
          <div className="action-grid">
            <a href="/volunteer" className="action-btn">
              {t("getInvolved.volunteer")}
            </a>
            <a href="/volunteer?check=sign" className="action-btn">
              {t("getInvolved.getSign")}
            </a>
            <a href="/volunteer?check=volunteer" className="action-btn">
              {t("getInvolved.joinCampaign")}
            </a>
            <a href="/donate" className="action-btn">
              {t("getInvolved.makeDonation")}
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: Connect with Sue */}
      <div className="involve-row-connect">
        <div className="involve-row-inner">
          <p className="involve-section-label">{t("getInvolved.connectWithSue")}</p>
          <div className="social-grid">
            <a href="mailto:sueheddle@gmail.com" className="social-btn social-btn--email">
              <span className="material-symbols-outlined">mail</span>
              {t("getInvolved.emailLabel")}
            </a>
            <a href="https://www.linkedin.com/in/sue-heddle-8aa9a910/" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/sueheddle/" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a href="https://www.facebook.com/SueHeddleElwick" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Row 3: Sign Up + Donate */}
      <div className="involve-row-signup">
        <div className="involve-row-inner">
          <div className="involve-signup-grid">
            <div>
              <h3 className="signup-form-title">{t("getInvolved.signUpHeading")}</h3>
              {newsSubmitted ? (
                <p style={{ marginTop: 16, color: "#fff", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>favorite</span>
                  Thanks for signing up!
                </p>
              ) : (
                <form onSubmit={handleNewsSubmit}>
                  <input
                    type="text"
                    name="company"
                    value={newsCompany}
                    onChange={(e) => setNewsCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
                  />
                  <div className="signup-fields-row">
                    <input className="signup-input" type="text" placeholder={t("getInvolved.namePlaceholder")}
                      value={newsName} onChange={(e) => setNewsName(e.target.value)} suppressHydrationWarning />
                    <input className="signup-input" type="email" placeholder={t("getInvolved.emailPlaceholder")}
                      value={newsEmail} onChange={(e) => setNewsEmail(e.target.value)} suppressHydrationWarning />
                  </div>
                  <div className="signup-fields-row">
                    <input className="signup-input" type="text" placeholder={t("getInvolved.postalPlaceholder")}
                      value={newsPostal} onChange={(e) => setNewsPostal(e.target.value.toUpperCase())} suppressHydrationWarning />
                    <button type="submit" className="signup-submit" disabled={newsSubmitting} suppressHydrationWarning>
                      {newsSubmitting ? <LoadingDots label="Saving" /> : t("getInvolved.signUpBtn")}
                      {!newsSubmitting && <span className="material-symbols-outlined">arrow_forward</span>}
                    </button>
                  </div>
                  {newsError && (
                    <p style={{ color: "#c0392b", fontSize: 13, fontWeight: 600, marginTop: 8 }}>{newsError}</p>
                  )}
                </form>
              )}
            </div>

            <div>
              <h3 className="donation-form-title">{t("getInvolved.donationHeading")}</h3>
              <div className="donation-grid">
                <a href="/donate?amount=25" className="donation-btn">$25 →</a>
                <a href="/donate?amount=50" className="donation-btn">$50 →</a>
                <a href="/donate?amount=100" className="donation-btn">$100 →</a>
                <a href="/donate?amount=250" className="donation-btn">$250 →</a>
                <a href="/donate?amount=500" className="donation-btn">$500 →</a>
                <a href="/donate" className="donation-btn">Other →</a>
              </div>
              <div className="donation-rebate-note">
                <span className="material-symbols-outlined">email</span>
                <p>{t("donate.etransferPre")}{" "}
                  <a href="mailto:sueheddle@gmail.com" style={{ color: "#fff", fontWeight: 700 }}>sueheddle@gmail.com</a>
                </p>
              </div>
              <div className="donation-rebate-note">
                <span className="material-symbols-outlined">info</span>
                <p>
                  {t("donate.rebateInfoPre")} <strong>{t("donate.rebateInfoBold")}</strong> {t("donate.rebateInfoPost")}{" "}
                  <a href="/rebate" className="donation-rebate-link">
                    {t("donate.rebateLearnMore")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
