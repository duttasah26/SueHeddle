"use client";

export default function VolunteerPage() {
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

        <h1 className="donate-step-title">Sign up to Volunteer</h1>
        <p className="volunteer-subtitle">Will you volunteer?</p>

        <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for volunteering!"); }}>
          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">First Name</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">Last Name</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="form-fields-row">
            <div className="form-field">
              <label className="form-field-label">Email *</label>
              <input className="form-field-input" type="email" required />
            </div>
            <div className="form-field">
              <label className="form-field-label">Cell Phone</label>
              <input className="form-field-input" type="tel" />
            </div>
          </div>

          <div className="form-fields-addr">
            <div className="form-field">
              <label className="form-field-label">Address</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">Unit</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="form-fields-3">
            <div className="form-field">
              <label className="form-field-label">City</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">Province</label>
              <input className="form-field-input" type="text" />
            </div>
            <div className="form-field">
              <label className="form-field-label">Postal Code</label>
              <input className="form-field-input" type="text" />
            </div>
          </div>

          <div className="volunteer-checks">
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              Sue can count on my vote!
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              I&rsquo;d like a lawn sign
            </label>
            <label className="volunteer-check-label">
              <input type="checkbox" className="volunteer-check" />
              I want to volunteer
            </label>
          </div>

          <button className="donate-next-btn" type="submit">
            Save volunteer info
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
