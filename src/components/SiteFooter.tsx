export default function SiteFooter() {
  return (
    <footer className="footer">
      <img src="/images/icons/brand.png" alt="Sue Heddle" className="footer-brand-icon" />
      <div className="footer-icons">
        <a href="mailto:sue@sueheddle.ca" className="footer-icon-btn" aria-label="Email">
          <span className="material-symbols-outlined">mail</span>
        </a>
        <a href="tel:+" className="footer-icon-btn" aria-label="Phone">
          <span className="material-symbols-outlined">phone</span>
        </a>
        <button className="footer-icon-btn" aria-label="Share">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </footer>
  );
}
