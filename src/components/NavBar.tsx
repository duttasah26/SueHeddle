export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          Sue <span>Heddle</span>
        </a>
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#get-involved" className="nav-link">Volunteer</a>
        </nav>
        <a href="mailto:sue@sueheddle.ca?subject=Donation" className="nav-cta">Donate</a>
      </div>
    </header>
  );
}
