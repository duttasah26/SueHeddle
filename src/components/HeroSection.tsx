export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-left">
        <p className="hero-label">Elect</p>
        <h1 className="hero-name">
          <span className="hero-name-first">Sue</span>
          <span className="hero-name-last">Heddle</span>
        </h1>
        <div className="hero-subtitle">
          <p className="hero-subtitle-role">Toronto City Council</p>
          <p className="hero-subtitle-ward">Oakville Ward 4</p>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="images/Sue Heddle Photo With Award.jpg"
          alt="Sue Heddle, Ward 4 Councillor Candidate"
        />
        <div className="hero-overlay">
          <p className="hero-overlay-text">
            The voice we need. The leadership we trust.
          </p>
        </div>
      </div>
    </section>
  );
}
