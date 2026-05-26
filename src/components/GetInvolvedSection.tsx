const involvCards = [
  {
    title: "Volunteer",
    desc: "Join our team of dedicated volunteers. From canvassing and phone banking to event support — every hour makes a difference.",
    btnLabel: "Sign Up to Volunteer",
    mailto: "mailto:sue@sueheddle.ca?subject=Volunteer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Donate",
    desc: "Support the campaign financially. Your contribution goes directly to reaching more Ward 4 residents with Sue's message.",
    btnLabel: "Contribute Today",
    mailto: "mailto:sue@sueheddle.ca?subject=Donation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Lawn Sign",
    desc: "Show your support across Ward 4 by hosting a lawn sign. Together, let's make our momentum visible across the neighbourhood.",
    btnLabel: "Request a Sign",
    mailto: "mailto:sue@sueheddle.ca?subject=Lawn%20Sign%20Request",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M3 3h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M12 16v5" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
];

export default function GetInvolvedSection() {
  return (
    <section id="get-involved" className="involve">
      <div className="involve-inner">
        <div className="involve-header">
          <p className="involve-eyebrow">Join the Campaign</p>
          <h2 className="involve-title">Make Ward 4 Better Together</h2>
          <p className="involve-subtitle">
            Every volunteer, every conversation, and every lawn sign helps bring positive
            change to our community. Here&apos;s how you can be part of it.
          </p>
        </div>

        <div className="involve-cards">
          {involvCards.map(({ title, desc, btnLabel, mailto, icon }) => (
            <div className="involve-card" key={title}>
              <div className="involve-card-icon">{icon}</div>
              <div className="involve-card-title">{title}</div>
              <p className="involve-card-desc">{desc}</p>
              <a href={mailto} className="involve-card-btn">{btnLabel}</a>
            </div>
          ))}
        </div>

        <hr className="involve-divider" />

        <div className="involve-contact">
          <p className="involve-contact-text">Have questions or want to reach Sue directly?</p>
          <div className="involve-actions">
            <a href="tel:+1-905-000-0000" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Sue
            </a>
            <a href="mailto:sue@sueheddle.ca" className="btn-ghost-inv">Email the Campaign</a>
          </div>
          <div className="involve-social">
            <a href="#" className="social-btn-inv" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="social-btn-inv" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="social-btn-inv" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
