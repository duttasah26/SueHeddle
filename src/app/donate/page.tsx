"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000, 1200];
const REBATE_RATE = 0.75;
const REBATE_CAP = 1000;

function calcActualCost(amount: number): string {
  const rebate = Math.min(amount, REBATE_CAP) * REBATE_RATE;
  return (amount - rebate).toFixed(2);
}

export default function DonatePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState("");
  const [isOakvilleResident, setIsOakvilleResident] = useState(false);

  const displayAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const actualCost = calcActualCost(displayAmount);

  return (
    <div className="donate-page">
      <div className="donate-card">
        <div className="donate-card-corner-tl" />
        <div className="donate-card-corner-br" />

        {/* Logo */}
        <div className="donate-logo-wrap">
          <a href="/">
            <img src="/images/icons/brand.png" alt="Sue Heddle" className="donate-logo-img" />
          </a>
        </div>

        {/* Step indicator */}
        <div className="donate-steps">
          <div className={`donate-step-dot ${step >= 1 ? "active" : "inactive"}`}>1</div>
          <div className="donate-step-line" />
          <div className={`donate-step-dot ${step >= 2 ? "active" : "inactive"}`}>2</div>
          <div className="donate-step-line" />
          <div className={`donate-step-dot ${step >= 3 ? "active" : "inactive"}`}>3</div>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <section>
            <h1 className="donate-step-title">{t("donate.heading1")}</h1>
            <p className="donate-section-label">{t("donate.labelAmount")}</p>
            <div className="amount-grid">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  className={`amount-btn${selectedAmount === amt && !customAmount ? " selected" : ""}`}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                >
                  ${amt}
                </button>
              ))}
              <input
                className="amount-input"
                type="text"
                placeholder={t("donate.otherPlaceholder")}
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); }}
              />
            </div>

            <div className="rebate-callout">
              <span className="material-symbols-outlined">calculate</span>
              <div>
                <p className="rebate-your-donation">
                  {t("donate.yourDonation").replace("${amount}", displayAmount.toFixed(2))}
                </p>
                <p className="rebate-actual-cost">
                  {t("donate.actualCost").replace("${cost}", actualCost)}
                </p>
              </div>
            </div>

            {/* Oakville residency checkbox */}
            <label className="residency-check">
              <input
                type="checkbox"
                checked={isOakvilleResident}
                onChange={(e) => setIsOakvilleResident(e.target.checked)}
              />
              <div className="residency-check-body">
                <p className="residency-check-title">I AM A RESIDENT OF OAKVILLE</p>
                <p className="residency-check-desc">
                  To be eligible for the 50% Campaign Contribution Rebate, contributors must be eligible electors residing in Oakville with a minimum contribution of $100.{" "}
                  <a
                    href="https://www.oakville.ca/town-hall/elections/candidates/campaign-contribution-rebate-program/"
                    className="residency-check-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </p>
              </div>
            </label>

            <button className="donate-next-btn" onClick={() => setStep(2)}>
              {t("donate.nextStep")}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </section>
        )}

        {/* Step 2: Information */}
        {step === 2 && (
          <section>
            <h1 className="donate-step-title">{t("donate.heading2")}</h1>
            <div className="form-fields-row">
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelFirstName")}</label>
                <input className="form-field-input" type="text" />
              </div>
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelLastName")}</label>
                <input className="form-field-input" type="text" />
              </div>
            </div>
            <div className="form-fields-col">
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelEmail")}</label>
                <input className="form-field-input" type="email" />
              </div>
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelPhone")}</label>
                <input className="form-field-input" type="tel" />
              </div>
            </div>
            <div className="donate-btn-row">
              <button className="donate-back-btn" onClick={() => setStep(1)}>
                <span className="material-symbols-outlined">arrow_back</span>
                {t("donate.back")}
              </button>
              <button className="donate-next-btn" style={{ width: "auto", flex: "none" }} onClick={() => setStep(3)}>
                {t("donate.nextStep")}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <section>
            <h1 className="donate-step-title">{t("donate.heading3")}</h1>
            <div className="form-fields-col">
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelCard")}</label>
                <input className="form-field-input" type="text" placeholder="•••• •••• •••• ••••" />
              </div>
              <div className="form-fields-row">
                <div className="form-field">
                  <label className="form-field-label">{t("donate.labelExpiry")}</label>
                  <input className="form-field-input" type="text" placeholder="MM / YY" />
                </div>
                <div className="form-field">
                  <label className="form-field-label">{t("donate.labelCvv")}</label>
                  <input className="form-field-input" type="text" placeholder="•••" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelAddress")}</label>
                <input className="form-field-input" type="text" />
              </div>
              <div className="form-fields-row">
                <div className="form-field">
                  <label className="form-field-label">{t("donate.labelCity")}</label>
                  <input className="form-field-input" type="text" />
                </div>
                <div className="form-field">
                  <label className="form-field-label">{t("donate.labelPostal")}</label>
                  <input className="form-field-input" type="text" />
                </div>
              </div>
            </div>
            <div className="donate-btn-row">
              <button className="donate-back-btn" onClick={() => setStep(2)}>
                <span className="material-symbols-outlined">arrow_back</span>
                {t("donate.back")}
              </button>
              <button
                className="donate-next-btn"
                style={{ width: "auto", flex: "none" }}
                onClick={() => alert(t("donate.thankYou"))}
              >
                {t("donate.donateBtnLabel").replace("${amount}", displayAmount.toFixed(2))}
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
