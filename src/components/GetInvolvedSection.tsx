"use client";

export default function GetInvolvedSection() {
  return (
    <section id="get-involved" className="involve">
      <div className="involve-inner">
        <div>
          <h2 className="involve-heading">
            Join the{" "}
            <span className="accent">Movement.</span>
          </h2>
          <p className="involve-lead">
            Winning requires more than a vote. It requires a movement. Join the
            team that&apos;s bringing common sense back to Town Hall.
          </p>
          <div className="involve-tiles">
            <a
              href="mailto:sue@sueheddle.ca?subject=Volunteer"
              className="action-tile action-tile--primary"
            >
              <span className="material-symbols-outlined">person_add</span>
              <p className="action-tile-title">Volunteer</p>
              <p className="action-tile-sub">Lend your voice</p>
            </a>
            <a
              href="mailto:sue@sueheddle.ca?subject=Lawn%20Sign%20Request"
              className="action-tile action-tile--white"
            >
              <span className="material-symbols-outlined">signpost</span>
              <p className="action-tile-title">Get a Sign</p>
              <p className="action-tile-sub">Paint the Ward Fuchsia</p>
            </a>
          </div>
        </div>

        <div className="form-card">
          <h3 className="form-card-title">Command Center Registration</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fname">First Name</label>
                <input
                  id="fname"
                  className="form-input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lname">Last Name</label>
                <input
                  id="lname"
                  className="form-input"
                  type="text"
                  placeholder="Surname"
                />
              </div>
            </div>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="You@email.com"
            />
            <button type="submit" className="form-submit">
              Sign up
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
