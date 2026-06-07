"use client";

import NavBar from "@/components/NavBar";
import GetInvolvedSection from "@/components/GetInvolvedSection";

export default function RebatePage() {
  return (
    <>
      <NavBar />
      <main>

        {/* Hero */}
        <section className="rebate-hero">
          <div className="rebate-hero-content">
            <span className="rebate-hero-eyebrow">2026 Oakville Municipal Election</span>
            <h1 className="rebate-hero-heading">
              Campaign Contribution<br />
              <span className="accent">Rebate Program</span>
            </h1>
            <p className="rebate-hero-sub">
              Oakville residents who donate to Sue's campaign can receive
              50% of their contribution back — up to $600 — from the Town of Oakville.
            </p>
          </div>
        </section>

        {/* Stats cards */}
        <div className="rebate-stats">
          <div className="rebate-stats-inner">
            <div className="rebate-stat">
              <p className="rebate-stat-value">50%</p>
              <p className="rebate-stat-label">Rebate on your contribution</p>
            </div>
            <div className="rebate-stat">
              <p className="rebate-stat-value">$100</p>
              <p className="rebate-stat-label">Minimum eligible contribution</p>
            </div>
            <div className="rebate-stat">
              <p className="rebate-stat-value">$1,200</p>
              <p className="rebate-stat-label">Maximum eligible contribution</p>
            </div>
            <div className="rebate-stat">
              <p className="rebate-stat-value">Sept. 2027</p>
              <p className="rebate-stat-label">When rebates are issued</p>
            </div>
          </div>
        </div>

        {/* What is it */}
        <section className="rebate-section rebate-section--light">
          <div className="rebate-section-inner">
            <h2 className="rebate-section-heading">
              What is the <span className="accent">Rebate Program?</span>
            </h2>
            <div className="about-bio-body">
              <p>
                Town of Oakville By-law 2025-050 authorizes a <strong>Contribution Rebate Program</strong> for
                the 2026 municipal election. When you make an eligible contribution to Sue's campaign,
                the Town of Oakville will return{" "}
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>50%</span>{" "}
                of that amount directly to you — reducing your actual out-of-pocket cost by half.
              </p>
              <p>
                A contribution of $100 costs you just{" "}
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>$50</span>.
                A contribution of $500 costs just{" "}
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>$250</span>.
                At the maximum of $1,200, you receive{" "}
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>$600 back</span>{" "}
                — making this one of the most cost-effective ways to support local democracy.
              </p>
              <p>
                Cash contributions do not qualify. Contributions must be made by cheque, money order,
                electronic funds transfer, or credit card. Goods and services do not qualify for a rebate.
              </p>
            </div>
          </div>
        </section>

        {/* Who qualifies */}
        <section className="rebate-section rebate-section--dark">
          <div className="rebate-section-inner">
            <h2 className="rebate-section-heading">
              Who <span className="accent">Qualifies?</span>
            </h2>
            <div className="rebate-eligibility">
              <div className="rebate-elig-col rebate-elig-col--yes">
                <p className="rebate-elig-col-title">Eligible</p>
                <ul className="rebate-elig-list">
                  <li>Eligible elector residing in the Town of Oakville</li>
                  <li>Listed on the Oakville voters' list</li>
                  <li>Contribution of $100 or more (not cash)</li>
                  <li>Application submitted by June 28, 2027</li>
                </ul>
              </div>
              <div className="rebate-elig-col rebate-elig-col--no">
                <p className="rebate-elig-col-title">Not Eligible</p>
                <ul className="rebate-elig-list">
                  <li>Corporations and trade unions</li>
                  <li>Candidate or their family members</li>
                  <li>Cash contributions</li>
                  <li>Contributions exceeding the campaign maximum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="rebate-section rebate-section--light">
          <div className="rebate-section-inner">
            <h2 className="rebate-section-heading">
              How It <span className="accent">Works</span>
            </h2>
            <div className="rebate-steps-list">
              <div className="rebate-step">
                <span className="rebate-step-num">01</span>
                <div>
                  <p className="rebate-step-title">Make a contribution</p>
                  <p className="rebate-step-desc">
                    Donate $100 or more to Sue's campaign by cheque, money order, e-transfer, or credit card.
                    Cash contributions do not qualify. Maximum is $1,200 per candidate.
                  </p>
                </div>
              </div>
              <div className="rebate-step">
                <span className="rebate-step-num">02</span>
                <div>
                  <p className="rebate-step-title">Campaign submits the application</p>
                  <p className="rebate-step-desc">
                    The campaign registers your contribution through the Town of Oakville's online portal.
                    You'll receive an email with a personal link to complete your portion of the rebate claim.
                  </p>
                </div>
              </div>
              <div className="rebate-step">
                <span className="rebate-step-num">03</span>
                <div>
                  <p className="rebate-step-title">Complete your claim &amp; receive your rebate</p>
                  <p className="rebate-step-desc">
                    Follow the link in your email and fill out the Contributor Rebate Claim Form — takes
                    about two minutes. Once approved, the Town of Oakville issues your rebate cheque
                    by September 2027.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key dates */}
        <section className="rebate-section rebate-section--dark">
          <div className="rebate-section-inner">
            <h2 className="rebate-section-heading">
              Key <span className="accent">Dates</span>
            </h2>
            <div className="rebate-dates">
              <div className="rebate-date-row">
                <div>
                  <p className="rebate-date-label">Last day to contribute</p>
                  <p className="rebate-date-value">December 31, 2026</p>
                </div>
                <p className="rebate-date-note">
                  Contributions must be made before the campaign period ends. Rebate receipts cannot be
                  issued after this date.
                </p>
              </div>
              <div className="rebate-date-row">
                <div>
                  <p className="rebate-date-label">Rebate application deadline</p>
                  <p className="rebate-date-value">June 28, 2027</p>
                </div>
                <p className="rebate-date-note">
                  Contributor applications must be submitted to the Clerk no later than 4:30 p.m. on this date.
                  Complete your claim as soon as you receive the email.
                </p>
              </div>
              <div className="rebate-date-row">
                <div>
                  <p className="rebate-date-label">Rebates issued</p>
                  <p className="rebate-date-value">September 2027</p>
                </div>
                <p className="rebate-date-note">
                  The Town of Oakville issues rebate cheques once the candidate has filed their financial
                  statements and all eligibility conditions are confirmed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rebate-cta">
          <h2 className="rebate-cta-heading">Ready to donate?</h2>
          <p className="rebate-cta-sub">Your $100 contribution costs just $50 after your rebate.</p>
          <a href="/donate" className="rebate-cta-btn">Make a Donation →</a>
        </div>

        <GetInvolvedSection />
      </main>
    </>
  );
}
