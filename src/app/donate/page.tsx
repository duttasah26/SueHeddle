"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [26, 50, 100, 250, 500, 1000, 1200];
const REBATE_RATE = 0.75;
const REBATE_CAP = 1000;

function calcActualCost(amount: number): string {
  const rebate = Math.min(amount, REBATE_CAP) * REBATE_RATE;
  return (amount - rebate).toFixed(2);
}

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState("");

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
            <h1 className="donate-step-title">Make a Donation</h1>
            <p className="donate-section-label">Amount</p>
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
                placeholder="Other"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); }}
              />
            </div>

            <div className="rebate-callout">
              <span className="material-symbols-outlined">calculate</span>
              <div>
                <p className="rebate-your-donation">
                  Your donation: ${displayAmount.toFixed(2)}
                </p>
                <p className="rebate-actual-cost">
                  Actual cost: just <span>${actualCost}</span> after your rebate!
                </p>
              </div>
            </div>

            <button className="donate-next-btn" onClick={() => setStep(2)}>
              Next Step
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </section>
        )}

        {/* Step 2: Information */}
        {step === 2 && (
          <section>
            <h1 className="donate-step-title">Your information</h1>
            <div className="form-fields-row">
              <div className="form-field">
                <label className="form-field-label">First Name *</label>
                <input className="form-field-input" type="text" />
              </div>
              <div className="form-field">
                <label className="form-field-label">Last Name *</label>
                <input className="form-field-input" type="text" />
              </div>
            </div>
            <div className="form-fields-col">
              <div className="form-field">
                <label className="form-field-label">Email *</label>
                <input className="form-field-input" type="email" />
              </div>
              <div className="form-field">
                <label className="form-field-label">Phone Number</label>
                <input className="form-field-input" type="tel" />
              </div>
            </div>
            <div className="donate-btn-row">
              <button className="donate-back-btn" onClick={() => setStep(1)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button className="donate-next-btn" style={{ width: "auto", flex: "none" }} onClick={() => setStep(3)}>
                Next Step
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <section>
            <h1 className="donate-step-title">Payment Details</h1>
            <div className="form-fields-col">
              <div className="form-field">
                <label className="form-field-label">Card Number *</label>
                <input className="form-field-input" type="text" placeholder="•••• •••• •••• ••••" />
              </div>
              <div className="form-fields-row">
                <div className="form-field">
                  <label className="form-field-label">Expiry *</label>
                  <input className="form-field-input" type="text" placeholder="MM / YY" />
                </div>
                <div className="form-field">
                  <label className="form-field-label">CVV *</label>
                  <input className="form-field-input" type="text" placeholder="•••" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-field-label">Address *</label>
                <input className="form-field-input" type="text" />
              </div>
              <div className="form-fields-row">
                <div className="form-field">
                  <label className="form-field-label">City *</label>
                  <input className="form-field-input" type="text" />
                </div>
                <div className="form-field">
                  <label className="form-field-label">Postal Code *</label>
                  <input className="form-field-input" type="text" />
                </div>
              </div>
            </div>
            <div className="donate-btn-row">
              <button className="donate-back-btn" onClick={() => setStep(2)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button
                className="donate-next-btn"
                style={{ width: "auto", flex: "none" }}
                onClick={() => alert("Thank you for your donation!")}
              >
                Donate ${displayAmount.toFixed(2)}
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
