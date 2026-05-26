export default function SiteFooter() {
  return (
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
  );
}
