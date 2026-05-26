import Image from "next/image";

const credentials = [
  { year: "2022", text: "Centurion Producer", highlight: true },
  { year: "2022", text: "Top 10 Producing Agent — November 2022", highlight: false },
  { year: "2022", text: "Outstanding Achievement Award of Excellence — Q1 2022", highlight: false },
  { year: "2021", text: "Selected as HGTV Scott McGillivray's Trusted Agent", highlight: true },
  { year: "2021", text: "Centurion Producer", highlight: true },
  { year: "2020", text: "Top 1.6% of Sales in OMDREB", highlight: false },
  { year: "2020", text: "Centurion Producer", highlight: true },
  { year: "2018", text: "Award of Excellence", highlight: false },
  { year: "2018", text: "Named One of Real Estate Magazine's 25 Top Elite Women in Real Estate", highlight: true },
  { year: "2017", text: "Award of Excellence", highlight: false },
];

export default function Home() {
  return (
    <>
      {/* ── Navigation ─────────────────────────────────────────── */}
      <header>
        <nav className="nav">
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              Sue Heddle <span>· Ward 4</span>
            </a>
            <div className="nav-links">
              <a href="#about" className="nav-link active">About</a>
              <a href="#platform" className="nav-link">Platform</a>
              <a href="#background" className="nav-link">Background</a>
              <a href="#get-involved" className="nav-link">Get Involved</a>
            </div>
            <a href="#get-involved" className="nav-cta">Support Sue →</a>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section id="home">
          <div className="hero">
            <div className="hero-content">
              <p className="hero-eyebrow">Oakville · Ward 4 · 2026 Municipal Election</p>
              <h1 className="hero-name">Sue<br />Heddle</h1>
              <p className="hero-title">Candidate for Ward 4 Councillor</p>
              <p className="hero-bio">
                Ward 4 deserves a councillor who understands this community from the inside out.
                As a long-time Oakville resident, award-winning professional, and dedicated
                community volunteer, I bring the experience and commitment our ward needs on Council.
              </p>
              <p className="hero-bio">
                I&apos;m running because I believe in responsible growth, transparent governance,
                and a Ward 4 where every resident&apos;s voice is heard — from young families
                to long-time homeowners. Let&apos;s build something better together.
              </p>
              <div className="hero-actions">
                <a href="#platform" className="btn-primary">My Platform</a>
                <a href="#get-involved" className="btn-ghost">Get Involved</a>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-img-frame">
                <Image
                  src="/sue-heddle.png"
                  alt="Sue Heddle, Ward 4 Councillor Candidate"
                  fill
                  priority
                  sizes="(max-width: 959px) 360px, 420px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <div className="hero-badge">
                <div className="hero-badge-info">
                  <span className="hero-badge-label">2026 Election</span>
                  <span className="hero-badge-value">Ward 4 Councillor Candidate</span>
                </div>
                <div className="hero-badge-dot" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ────────────────────────────────────────── */}
        <div className="stats">
          <div className="stats-inner">
            {[
              { value: "20+ Years", label: "Oakville Resident" },
              { value: "3× Centurion", label: "Award-Winning Professional" },
              { value: "Top 1.6%", label: "OMDREB Sales Performance" },
              { value: "Hockey Cares", label: "Community Initiative" },
            ].map(({ value, label }) => (
              <div className="stat-item" key={label}>
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── About ──────────────────────────────────────────────── */}
        <section id="about" className="about-section">
          <div className="about-inner">
            <div>
              <div className="about-header">
                <span className="section-eyebrow">About Sue</span>
                <h2 className="section-title">A Neighbour Who<br />Knows Ward 4</h2>
              </div>
              <p className="about-bio">
                If you are looking for a Ward 4 councillor who truly understands Oakville — its
                neighbourhoods, its families, and its future — look no further. I have spent over
                two decades building my life and career in this community, and I know firsthand
                what makes it exceptional and what needs to improve.
              </p>
              <p className="about-bio">
                My background in real estate has given me a deep, practical understanding of
                development, infrastructure, and the issues that matter most to homeowners and
                families. I have worked with clients across Oakville, Burlington, Milton and
                Mississauga, and I have seen the direct impact that local governance has on
                the communities we call home.
              </p>
              <p className="about-bio">
                Recognized by HGTV&apos;s Scott McGillivray as a trusted expert and named one
                of Canada&apos;s 25 Top Elite Women in Real Estate, I have a proven track record
                of delivering results for the people I serve. I bring that same dedication,
                expertise, and tireless commitment to my campaign for Ward 4 Councillor.
              </p>
            </div>

            <div className="about-quote-card">
              <p className="about-quote-title">Why I&apos;m Running</p>
              <div className="about-points">
                {[
                  "A lifelong commitment to the Oakville community and the residents of Ward 4",
                  "Real expertise in property, development, and what makes neighbourhoods thrive",
                  "A proven record of delivering results for the people I serve",
                  "A passion for giving back — through Hockey Cares and years of community involvement",
                  "Belief that Ward 4 deserves transparent, accountable, and accessible representation",
                ].map((point) => (
                  <div className="about-point" key={point}>
                    <div className="about-point-marker" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Platform / Vision ──────────────────────────────────── */}
        <section id="platform" className="platform">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">My Platform</span>
                <h2 className="section-title">A Vision for Ward 4</h2>
              </div>
            </div>

            <div className="platform-grid">
              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="platform-name">Safer Neighbourhoods</div>
                <p className="platform-desc">
                  Working with community partners, Halton Police, and residents to ensure Ward 4
                  remains safe, welcoming, and well-lit — from parks and pathways to our streets.
                </p>
              </div>

              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="platform-name">Infrastructure &amp; Roads</div>
                <p className="platform-desc">
                  Prioritizing the maintenance and improvement of Ward 4&apos;s roads, sidewalks, and
                  transit connections — because your daily commute and walkability matter.
                </p>
              </div>

              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="platform-name">Fiscal Accountability</div>
                <p className="platform-desc">
                  Championing responsible spending, evidence-based decisions, and full transparency
                  in how Oakville&apos;s tax dollars are put to work in Ward 4.
                </p>
              </div>

              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="platform-name">Environmental Stewardship</div>
                <p className="platform-desc">
                  Protecting Ward 4&apos;s green spaces, tree canopy, and natural heritage — advocating
                  for sustainable, responsible development in every planning decision.
                </p>
              </div>

              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="platform-name">Community Voice</div>
                <p className="platform-desc">
                  Regular town halls, an open-door policy, and accessible representation for
                  every resident — because good governance starts with listening.
                </p>
              </div>

              <div className="platform-card">
                <div className="platform-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="platform-name">Families &amp; Youth</div>
                <p className="platform-desc">
                  Supporting recreation programs, youth sports, and the services that help Ward 4
                  families thrive — from early childhood and through the teenage years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Background / Credentials ───────────────────────────── */}
        <section id="background" className="credentials-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">Background</span>
                <h2 className="section-title">Credentials &amp; Community</h2>
              </div>
            </div>

            <div className="credentials-grid">
              {credentials.map(({ year, text, highlight }, i) => (
                <div className="credential-row" key={i}>
                  <span className="credential-year">{year}</span>
                  <span className="credential-name">
                    {text}
                    {highlight && <span className="credential-tag">Notable</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Community / Hockey Cares ───────────────────────────── */}
        <div className="community">
          <div className="community-inner">
            <div className="community-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div>
              <p className="community-label">Community Initiative</p>
              <p className="community-title">Hockey Cares</p>
              <p className="community-desc">
                Sue is proud to give back through Hockey Cares — a community initiative close to
                her heart that supports local families and youth through the sport she loves.
              </p>
            </div>
            <a href="#get-involved" className="btn-ghost community-cta">Learn More</a>
          </div>
        </div>

        {/* ── Get Involved ───────────────────────────────────────── */}
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
              <div className="involve-card">
                <div className="involve-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="involve-card-title">Volunteer</div>
                <p className="involve-card-desc">
                  Join our team of dedicated volunteers. From canvassing and phone banking
                  to event support — every hour makes a difference.
                </p>
                <a href="mailto:sue@sueheddle.ca?subject=Volunteer" className="involve-card-btn">
                  Sign Up to Volunteer
                </a>
              </div>

              <div className="involve-card">
                <div className="involve-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="involve-card-title">Donate</div>
                <p className="involve-card-desc">
                  Support the campaign financially. Your contribution goes directly to reaching
                  more Ward 4 residents with Sue&apos;s message.
                </p>
                <a href="mailto:sue@sueheddle.ca?subject=Donation" className="involve-card-btn">
                  Contribute Today
                </a>
              </div>

              <div className="involve-card">
                <div className="involve-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    <path d="M12 16v5" />
                    <path d="M9 21h6" />
                  </svg>
                </div>
                <div className="involve-card-title">Lawn Sign</div>
                <p className="involve-card-desc">
                  Show your support across Ward 4 by hosting a lawn sign. Together, let&apos;s
                  make our momentum visible across the neighbourhood.
                </p>
                <a
                  href="mailto:sue@sueheddle.ca?subject=Lawn%20Sign%20Request"
                  className="involve-card-btn"
                >
                  Request a Sign
                </a>
              </div>
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
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">
            Sue Heddle <span>· Ward 4 · Oakville 2026</span>
          </span>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Sue Heddle. Authorized by the Official Agent for Sue Heddle.
          </p>
          <nav className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#platform" className="footer-link">Platform</a>
            <a href="#background" className="footer-link">Background</a>
            <a href="#get-involved" className="footer-link">Get Involved</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
