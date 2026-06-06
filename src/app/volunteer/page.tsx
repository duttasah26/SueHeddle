"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function VolunteerPage() {
  const { t } = useLanguage();
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

        <form onSubmit={(e) => { e.preventDefault(); alert(t("volunteer.thankYou")); }} suppressHydrationWarning>
          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelFirstName")}</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelLastName")}</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelEmail")}</label>
              <input className="form-field-input" type="email" required />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelPhone")}</label>
              <input className="form-field-input" type="tel" />
            </div>
          </div>

          <div className="form-fields-addr">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelAddress")}</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelUnit")}</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="form-fields-3">
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelCity")}</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelProvince")}</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">{t("volunteer.labelPostal")}</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="volunteer-checks">
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              {t("volunteer.checkVote")}
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              {t("volunteer.checkSign")}
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              {t("volunteer.checkVolunteer")}
            </label>
          </div>

          <button className="donate-next-btn" type="submit">
            {t("volunteer.saveBtn")}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
