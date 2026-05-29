export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <img
          src="/images/icons/circle_icon.png"
          alt=""
          className="hero-brand-mark"
        />
        <div className="hero-elect">Elect</div>
        <div className="hero-heading-wrap">
          <div className="heading-one">
            <h1 className="hero-heading">
              Vote Sue.<br />
              Vote <span className="hero-heading-black">New.</span>
            </h1>
          </div>
          <div className="heading-two">
            <h1 className="hero-heading">
              Sue
              <br />
              <span className="hero-heading-rel">
                Heddle
                <span className="animated-underline" />
              </span>
            </h1>
          </div>
        </div>
        <span className="hero-ward">Ward 5 Oakville</span>
        <div className="hero-ctas">
          <a href="#get-involved" className="hero-btn hero-btn--dark">
            Join the Movement
          </a>
          <a
            href="mailto:sue@sueheddle.ca?subject=Lawn%20Sign%20Request"
            className="hero-btn hero-btn--white"
          >
            Get a Sign
          </a>
        </div>
      </div>

      <div className="hero-photo">
        <img src="/sue-heddle.png" alt="Sue Heddle, Ward 5 Candidate" />
        <div className="hero-photo-overlay" />
        <div className="hero-quote-box">
          <p>&ldquo;The voice we need. The leadership we trust.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}
