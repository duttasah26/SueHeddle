export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            Sue <span>Heddle</span>
          </a>
          <p className="footer-desc">
            Radical transparency. Proven leadership. Ready for Oakville Ward 4.
          </p>
          <div className="footer-share">
            <a href="#" className="footer-share-btn" aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="mailto:sue@sueheddle.ca" className="footer-share-btn" aria-label="Email">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>

        <nav className="footer-nav">
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Contact Us</a></li>
            <li><a href="#" className="footer-link">Press Kit</a></li>
            <li><a href="#" className="footer-link">Donation Rules</a></li>
          </ul>
        </nav>

        <div className="footer-legal">
          <div className="footer-legal-box">
            <p className="footer-legal-text">
              Authorized by the Official Agent for Sue Heddle.{" "}
              &copy; {new Date().getFullYear()} Sue Heddle Campaign.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
