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

export default function CredentialsSection() {
  return (
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
  );
}
