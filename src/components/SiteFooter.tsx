export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/icons/brand.png" alt="" className="footer-icon" />
          <span className="footer-logo">Sue Heddle</span>
        </div>

        <nav className="footer-nav-links">
          <a href="#vision" className="footer-link">Vision</a>
          <a href="#strategy" className="footer-link">Strategy</a>
          <a href="#experience" className="footer-link">Experience</a>
          <a href="#get-involved" className="footer-link">Volunteer</a>
          <a href="mailto:sue@sueheddle.ca" className="footer-link">Contact</a>
        </nav>

        <div>
          <p className="footer-legal-text">
            Authorized by the Official Agent for Sue Heddle Ward 5 Campaign.{" "}
            &copy; {new Date().getFullYear()}
          </p>
          <div className="footer-icons">
            <button className="footer-icon-btn" aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
            <a href="mailto:sue@sueheddle.ca" className="footer-icon-btn" aria-label="Email">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <button className="footer-icon-btn" aria-label="Phone">
              <span className="material-symbols-outlined">phone</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
