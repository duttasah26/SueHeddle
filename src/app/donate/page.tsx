"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import type { PaymentRequest as StripePaymentRequest } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLanguage } from "@/contexts/LanguageContext";
import LoadingDots from "@/components/LoadingDots";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const stripeAppearance: StripeElementsOptions["appearance"] = {
  theme: "stripe",
  variables: {
    colorPrimary: "#e70685",
    colorBackground: "#e5e2e1",
    colorText: "#1a1a1a",
    colorDanger: "#c0392b",
    fontFamily: "Lexend, system-ui, sans-serif",
    borderRadius: "0px",
  },
};

const CARD_STYLE = {
  style: {
    base: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "14px",
      color: "#1a1a1a",
      "::placeholder": { color: "#a09898" },
    },
    invalid: { color: "#c0392b" },
  },
};

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000, 1200];
const REBATE_RATE = 0.50;
const REBATE_MIN = 100;
const REBATE_CAP = 1200;
const MAX_DONATION = 10_000;
const STRIPE_PCT = 0.029;
const STRIPE_FLAT = 0.30;

// Canadian postal code: A1A 1A1 or A1A1A1
const CA_POSTAL_RE = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;

function calcActualCost(amount: number): number {
  if (amount < REBATE_MIN) return amount;
  return amount - Math.min(amount, REBATE_CAP) * REBATE_RATE;
}

// Returns the gross amount to charge so the campaign nets exactly `amount` after Stripe fees.
// Formula: gross = (amount + STRIPE_FLAT) / (1 - STRIPE_PCT)
function calcEffectiveWithFee(amount: number): number {
  return Math.round(((amount + STRIPE_FLAT) / (1 - STRIPE_PCT)) * 100) / 100;
}

interface PaymentFormProps {
  effectiveAmount: number;
  stripeFee: number;
  coverFee: boolean;
  setCoverFee: (v: boolean) => void;
  firstName: string;
  lastName: string;
  email: string;
  isOakvilleResident: boolean;
  onBack: () => void;
  onSuccess: () => void;
  t: (key: string) => string;
}

function PaymentForm({
  effectiveAmount, stripeFee, coverFee, setCoverFee,
  firstName, lastName, email, isOakvilleResident, onBack, onSuccess, t,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [certified, setCertified] = useState(false);

  // Per-field focus state for separate card elements
  const [numFocused, setNumFocused]     = useState(false);
  const [expFocused, setExpFocused]     = useState(false);
  const [cvcFocused, setCvcFocused]     = useState(false);

  // Apple Pay / Google Pay
  const [paymentRequest, setPaymentRequest] = useState<StripePaymentRequest | null>(null);

  // Refs to keep event handler current without re-registering it
  const effectiveAmountRef = useRef(effectiveAmount);
  const certifiedRef       = useRef(certified);
  const onSuccessRef       = useRef(onSuccess);
  useEffect(() => { effectiveAmountRef.current = effectiveAmount; }, [effectiveAmount]);
  useEffect(() => { certifiedRef.current = certified; }, [certified]);
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);

  // Create payment request once when Stripe loads
  useEffect(() => {
    if (!stripe) return;
    const pr = stripe.paymentRequest({
      country: "CA",
      currency: "cad",
      total: {
        label: "Donation to Sue Heddle – Ward 5",
        amount: Math.round(effectiveAmountRef.current * 100),
      },
      requestPayerName: false,
      requestPayerEmail: false,
    });
    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });
    pr.on("paymentmethod", async (event) => {
      if (!certifiedRef.current) {
        event.complete("fail");
        setPaymentError("Please confirm the certification checkbox before donating.");
        return;
      }
      setProcessing(true);
      setPaymentError("");
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: effectiveAmountRef.current }),
        });
        const data = await res.json();
        if (data.error) { event.complete("fail"); setPaymentError(data.error); return; }
        const piId = data.clientSecret.split("_secret_")[0];
        await fetch("/api/set-payment-metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: piId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email,
            isOakvilleResident,
            address: "", unit: "", city: "", province: "ON", postal: "",
          }),
        }).catch(() => {});
        const { error } = await stripe.confirmCardPayment(
          data.clientSecret,
          { payment_method: event.paymentMethod.id },
          { handleActions: false }
        );
        if (error) {
          event.complete("fail");
          setPaymentError(error.message ?? "Payment failed. Please try again.");
        } else {
          event.complete("success");
          onSuccessRef.current();
        }
      } catch {
        event.complete("fail");
        setPaymentError("Something went wrong. Please try again.");
      } finally {
        setProcessing(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe]);

  // Keep payment sheet amount in sync when fee toggle changes
  useEffect(() => {
    if (!paymentRequest) return;
    paymentRequest.update({
      total: {
        label: "Donation to Sue Heddle – Ward 5",
        amount: Math.round(effectiveAmount * 100),
      },
    });
  }, [paymentRequest, effectiveAmount]);

  const [address, setAddress] = useState("");
  const [unit, setUnit]       = useState("");
  const [city, setCity]       = useState("");
  const [province]            = useState("ON");
  const [postal, setPostal]   = useState("");

  const handleDonate = useCallback(async () => {
    if (!stripe || !elements) return;

    // — frontend guards —
    if (!certified) {
      setPaymentError("Please certify the above statements before donating.");
      return;
    }
    if (!address.trim()) {
      setPaymentError("Billing address is required.");
      return;
    }
    if (!city.trim()) {
      setPaymentError("City is required.");
      return;
    }
    if (!CA_POSTAL_RE.test(postal.trim())) {
      setPaymentError("Please enter a valid Canadian postal code (e.g. L6H 4K9).");
      return;
    }

    setProcessing(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: effectiveAmount }),
      });
      const data = await res.json();
      if (data.error) { setPaymentError(data.error); return; }

      const piId = data.clientSecret.split("_secret_")[0];
      await fetch("/api/set-payment-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: piId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email,
          isOakvilleResident,
          address: address.trim(),
          unit: unit.trim(),
          city: city.trim(),
          province,
          postal: postal.trim().toUpperCase(),
        }),
      }).catch(() => {});

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${firstName.trim()} ${lastName.trim()}`,
            address: {
              line1: address.trim(),
              line2: unit.trim() || undefined,
              city: city.trim(),
              state: province,
              postal_code: postal.trim().toUpperCase(),
              country: "CA",
            },
          },
        },
      });

      if (error) {
        setPaymentError(error.message ?? "Payment failed. Please try again.");
      } else if (paymentIntent?.status === "succeeded") {
        onSuccess();
      }
    } catch {
      setPaymentError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [stripe, elements, certified, effectiveAmount, firstName, lastName, address, unit, city, province, postal, onSuccess]);

  return (
    <section>
      <h1 className="donate-step-title">{t("donate.heading3")}</h1>

      {/* — Apple Pay / Google Pay — */}
      {paymentRequest && (
        <div className="donate-wallet-section">
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: { type: "donate", theme: "dark", height: "48px" },
              },
            }}
          />
          <div className="donate-wallet-divider"><span>or pay with card</span></div>
        </div>
      )}

      {/* — Split card fields — */}
      <div className="form-fields-col" style={{ marginBottom: 24 }}>
        <div className="form-field">
          <label className="form-field-label">{t("donate.labelCard")} *</label>
          <div className={`stripe-card-element${numFocused ? " stripe-card-element--focus" : ""}`}>
            <CardNumberElement
              options={CARD_STYLE}
              onFocus={() => setNumFocused(true)}
              onBlur={() => setNumFocused(false)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div className="form-field">
            <label className="form-field-label">{t("donate.labelExpiry")} *</label>
            <div className={`stripe-card-element${expFocused ? " stripe-card-element--focus" : ""}`}>
              <CardExpiryElement
                options={CARD_STYLE}
                onFocus={() => setExpFocused(true)}
                onBlur={() => setExpFocused(false)}
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-field-label">{t("donate.labelCvv")} *</label>
            <div className={`stripe-card-element${cvcFocused ? " stripe-card-element--focus" : ""}`}>
              <CardCvcElement
                options={CARD_STYLE}
                onFocus={() => setCvcFocused(true)}
                onBlur={() => setCvcFocused(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {paymentError && <p className="donate-payment-error">{paymentError}</p>}

      {/* — Billing address — */}
      <p className="donate-section-label" style={{ marginBottom: 12 }}>Billing Address</p>
      <div className="form-fields-col">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
          <div className="form-field">
            <label className="form-field-label">{t("donate.labelAddress")} *</label>
            <input className="form-field-input" type="text" autoComplete="street-address"
              maxLength={100} value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-field">
            <label className="form-field-label">Unit</label>
            <input className="form-field-input" type="text" autoComplete="address-line2"
              maxLength={20} value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr", gap: 8 }}>
          <div className="form-field">
            <label className="form-field-label">{t("donate.labelCity")} *</label>
            <input className="form-field-input" type="text" autoComplete="address-level2"
              maxLength={50} value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="form-field">
            <label className="form-field-label">Province</label>
            <input className="form-field-input" type="text" value={province} readOnly
              style={{ color: "var(--on-surface-variant)", cursor: "default" }} />
          </div>
          <div className="form-field">
            <label className="form-field-label">{t("donate.labelPostal")} *</label>
            <input className="form-field-input" type="text" autoComplete="postal-code"
              maxLength={7} value={postal}
              onChange={(e) => setPostal(e.target.value.toUpperCase())} />
          </div>
        </div>
      </div>

      {/* — Certification (required) — */}
      <label className="donate-cert-box">
        <p className="donate-cert-text">
          I certify this contribution is made from my own funds, and I am a resident of Ontario.
        </p>
        <span className="donate-cert-check">
          <input
            type="checkbox"
            checked={certified}
            onChange={(e) => { setCertified(e.target.checked); setPaymentError(""); }}
            style={{ width: 18, height: 18, accentColor: "#fff", flexShrink: 0, cursor: "pointer" }}
          />
          <span>I confirm that the above statements are true and accurate.</span>
        </span>
      </label>

      {/* — Processing fee opt-in — */}
      <label className="donate-fee-check">
        <input
          type="checkbox"
          checked={coverFee}
          onChange={(e) => setCoverFee(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "var(--primary)", flexShrink: 0, cursor: "pointer" }}
        />
        <span>
          I&apos;ll cover the processing fee — add <strong>${stripeFee.toFixed(2)}</strong> to my donation.
        </span>
      </label>

      <div className="donate-btn-row">
        <button className="donate-back-btn" onClick={onBack} disabled={processing}>
          <span className="material-symbols-outlined">arrow_back</span>
          {t("donate.back")}
        </button>
        <button
          className="donate-next-btn"
          style={{ width: "auto", flex: "none" }}
          onClick={handleDonate}
          disabled={!stripe || processing || !certified}
        >
          {processing
            ? <LoadingDots label="Processing" />
            : t("donate.donateBtnLabel").replace("${amount}", effectiveAmount.toFixed(2))}
          {!processing && <span className="material-symbols-outlined">favorite</span>}
        </button>
      </div>
    </section>
  );
}

export default function DonatePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [donated, setDonated] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState("");
  const [isOakvilleResident, setIsOakvilleResident] = useState(false);
  const [coverFee, setCoverFee] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [step1Error, setStep1Error] = useState("");
  const [step2Error, setStep2Error] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amt = parseFloat(params.get("amount") ?? "");
    if (amt && PRESET_AMOUNTS.includes(amt)) setSelectedAmount(amt);
  }, []);

  useEffect(() => { if (step !== 3) setCoverFee(false); }, [step]);

  const displayAmount          = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const actualCost             = calcActualCost(displayAmount);
  const effectiveAmountWithFee = calcEffectiveWithFee(displayAmount);
  const stripeFee              = Math.round((effectiveAmountWithFee - displayAmount) * 100) / 100;
  const effectiveAmount        = coverFee ? effectiveAmountWithFee : displayAmount;

  if (donated) {
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
            <h1 className="donate-step-title" style={{ textAlign: "center", marginTop: 16 }}>{t("donate.thankYou")}</h1>
            <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>
              Your donation of ${displayAmount.toFixed(2)} has been processed.
            </p>
            <a href="/" style={{ display: "inline-block", marginTop: 32 }} className="donate-next-btn">Return Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="donate-page">
      <div className="donate-card" suppressHydrationWarning>
        <div className="donate-card-corner-tl" />
        <div className="donate-card-corner-br" />

        <div className="donate-logo-wrap">
          <a href="/"><img src="/images/icons/brand.png" alt="Sue Heddle" className="donate-logo-img" /></a>
        </div>

        {/* Step indicator */}
        <div className="donate-steps">
          {[1, 2, 3].map((n, i) => (
            <div key={`step-group-${n}`} style={{ display: "contents" }}>
              <div className={`donate-step-dot ${step > n ? "done" : step === n ? "active" : "inactive"}`}>
                {step > n
                  ? <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
                  : n}
              </div>
              {i < 2 && <div className="donate-step-line" />}
            </div>
          ))}
        </div>

        {/* Step 1 — Amount */}
        {step === 1 && (
          <section>
            <h1 className="donate-step-title">{t("donate.heading1")}</h1>
            <div className="donate-etransfer-banner">
              <span className="material-symbols-outlined" style={{ fontSize: 18, flexShrink: 0 }}>email</span>
              <p>Prefer e-transfer? Send to{" "}
                <a href="mailto:sueheddle@gmail.com" className="donate-etransfer-email">sueheddle@gmail.com</a>
              </p>
            </div>
            <div className="rebate-intro">
              <span className="rebate-intro-badge">50% BACK</span>
              <p>Oakville residents receive a <strong>50% rebate</strong> on contributions up to $1,200.{" "}
                <a href="/rebate" className="rebate-intro-link">Learn more →</a>
              </p>
            </div>
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
                inputMode="decimal"
                placeholder={t("donate.otherPlaceholder")}
                value={customAmount}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || /^\d{0,6}(\.\d{0,2})?$/.test(v)) { setCustomAmount(v); setStep1Error(""); }
                }}
              />
            </div>
            <div className="rebate-callout">
              <span className="material-symbols-outlined">calculate</span>
              <div>
                <p className="rebate-your-donation">
                  {t("donate.yourDonation").replace("${amount}", displayAmount.toFixed(2))}
                </p>
                {displayAmount < REBATE_MIN ? (
                  <p className="rebate-actual-cost">Minimum <span>$100</span> required for the 50% rebate</p>
                ) : displayAmount <= REBATE_CAP ? (
                  <p className="rebate-actual-cost">{t("donate.actualCost").replace("${cost}", actualCost.toFixed(2))}</p>
                ) : (
                  <p className="rebate-actual-cost">50% off up to $1,200 — you save <span>$600.00</span></p>
                )}
              </div>
            </div>
            <label className="residency-check">
              <input type="checkbox" checked={isOakvilleResident}
                onChange={(e) => setIsOakvilleResident(e.target.checked)} />
              <p className="residency-check-title">I AM A RESIDENT OF OAKVILLE</p>
            </label>
            {step1Error && <p className="donate-payment-error">{step1Error}</p>}
            <button
              className="donate-next-btn"
              onClick={() => {
                if (displayAmount < 1 || displayAmount > MAX_DONATION) {
                  setStep1Error(`Please enter an amount between $1 and $${MAX_DONATION.toLocaleString()}.`);
                  return;
                }
                setStep1Error("");
                setStep(2);
              }}
            >
              {t("donate.nextStep")}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </section>
        )}

        {/* Step 2 — Information */}
        {step === 2 && (
          <section>
            <h1 className="donate-step-title">{t("donate.heading2")}</h1>
            <div className="form-fields-row">
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelFirstName")}</label>
                <input className="form-field-input" type="text" autoComplete="given-name"
                  maxLength={50} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelLastName")}</label>
                <input className="form-field-input" type="text" autoComplete="family-name"
                  maxLength={50} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="form-fields-col">
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelEmail")}</label>
                <input className="form-field-input" type="email" autoComplete="email"
                  maxLength={100} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-field-label">{t("donate.labelPhone")}</label>
                <input className="form-field-input" type="tel" autoComplete="tel"
                  maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            {step2Error && <p className="donate-payment-error">{step2Error}</p>}
            <div className="donate-btn-row">
              <button className="donate-back-btn" onClick={() => { setStep2Error(""); setStep(1); }}>
                <span className="material-symbols-outlined">arrow_back</span>
                {t("donate.back")}
              </button>
              <button
                className="donate-next-btn"
                style={{ width: "auto", flex: "none" }}
                onClick={() => {
                  if (!firstName.trim() || !lastName.trim()) {
                    setStep2Error("First and last name are required."); return;
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                    setStep2Error("Please enter a valid email address."); return;
                  }
                  setStep2Error("");
                  setStep(3);
                }}
              >
                {t("donate.nextStep")}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <Elements stripe={stripePromise} options={{ appearance: stripeAppearance }}>
            <PaymentForm
              effectiveAmount={effectiveAmount}
              stripeFee={stripeFee}
              coverFee={coverFee}
              setCoverFee={setCoverFee}
              firstName={firstName}
              lastName={lastName}
              email={email}
              isOakvilleResident={isOakvilleResident}
              onBack={() => setStep(2)}
              onSuccess={() => setDonated(true)}
              t={t}
            />
          </Elements>
        )}

      </div>
    </div>
  );
}
