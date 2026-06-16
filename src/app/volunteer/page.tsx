"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VolunteerPage() {
  const { t } = useLanguage();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [address,   setAddress]   = useState("");
  const [unit,      setUnit]      = useState("");
  const [city,      setCity]      = useState("");
  const [province,  setProvince]  = useState("");
  const [postal,    setPostal]    = useState("");
  const [vote,      setVote]      = useState(false);
  const [sign,      setSign]      = useState(false);
  const [volunteer, setVolunteer] = useState(false);

  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState("");
  const [submitted,    setSubmitted]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError("First and last name are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName, lastName, email, phone,
          address, unit, city, province, postal,
          vote, sign, volunteer,
        }),
      });
      const data = await res.json();
      if (data.error) { setSubmitError(data.error); return; }
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="donate-page">
        <div className="donate-card" suppressHydrationWarning>
          <div className="donate-card-corner-tl" />
          <div className="donate-card-corner-br" />
          <div className="donate-logo-wrap">
            <a href="/"><img src="/images/icons/brand.png" alt="Sue Heddle" className="donate-logo-img" /></a>
          </div>
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: "var(--primary)" }}>favorite</span>
            <h1 className="donate-step-title" style={{ textAlign: "center", marginTop: 16 }}>{t("volunteer.thankYou")}</h1>
            <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>
              We&apos;ll be in touch soon.
            </p>
            <a href="/" style={{ display: "inline-block", marginTop: 32 }} className="donate-next-btn">Return Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="donate-page">
      <div className="donate-card">
        <div className="donate-card-corner-tl" />
        <div className="donate-card-corner-br" />

        <div className="donate-logo-wrap">
          <a href="/">
            <img src="/images/icons/brand.png" alt="Sue Heddle" className="donate-logo-img" />
          </a>
        </div>

        <h1 className="donate-step-title">{t("volunteer.heading")}</h1>
        <p className="volunteer-subtitle">{t("volunteer.subtitle")}</p>

        <form onSubmit={handleSubmit} suppressHydrationWarning>
          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelFirstName")}</label>
              <input className="form-field-input" type="text" autoComplete="given-name"
                maxLength={50} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelLastName")}</label>
              <input className="form-field-input" type="text" autoComplete="family-name"
                maxLength={50} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelEmail")}</label>
              <input className="form-field-input" type="email" autoComplete="email"
                maxLength={100} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelPhone")}</label>
              <input className="form-field-input" type="tel" autoComplete="tel"
                maxLength={30} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="form-fields-addr">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelAddress")}</label>
              <input className="form-field-input" type="text" autoComplete="street-address"
                maxLength={150} value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelUnit")}</label>
              <input className="form-field-input" type="text" autoComplete="address-line2"
                maxLength={20} value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
          </div>

          <div className="form-fields-3">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelCity")}</label>
              <input className="form-field-input" type="text" autoComplete="address-level2"
                maxLength={80} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelProvince")}</label>
              <input className="form-field-input" type="text" autoComplete="address-level1"
                maxLength={50} value={province} onChange={(e) => setProvince(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelPostal")}</label>
              <input className="form-field-input" type="text" autoComplete="postal-code"
                maxLength={10} value={postal} onChange={(e) => setPostal(e.target.value.toUpperCase())} />
            </div>
          </div>

          <div className="volunteer-checks">
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check"
                checked={vote} onChange={(e) => setVote(e.target.checked)} />
              {t("volunteer.checkVote")}
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check"
                checked={sign} onChange={(e) => setSign(e.target.checked)} />
              {t("volunteer.checkSign")}
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check"
                checked={volunteer} onChange={(e) => setVolunteer(e.target.checked)} />
              {t("volunteer.checkVolunteer")}
            </label>
          </div>

          {submitError && (
            <p className="donate-payment-error" style={{ marginTop: 12 }}>{submitError}</p>
          )}

          <button className="donate-next-btn" type="submit" disabled={submitting}>
            {submitting ? "Saving…" : t("volunteer.saveBtn")}
            {!submitting && <span className="material-symbols-outlined">arrow_forward</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
