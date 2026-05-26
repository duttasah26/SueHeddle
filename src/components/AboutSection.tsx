const whyPoints = [
  "A lifelong commitment to the Oakville community and the residents of Ward 4",
  "Real expertise in property, development, and what makes neighbourhoods thrive",
  "A proven record of delivering results for the people I serve",
  "A passion for giving back — through Hockey Cares and years of community involvement",
  "Belief that Ward 4 deserves transparent, accountable, and accessible representation",
];

export default function AboutSection() {
  return (
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
            {whyPoints.map((point) => (
              <div className="about-point" key={point}>
                <div className="about-point-marker" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
