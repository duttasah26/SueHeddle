export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-brand">
          <img src="/images/icons/brand.png" alt="Sue Heddle" className="nav-icon" />
        </a>
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#vision" className="nav-link">Strategy</a>
          <a href="#community-support" className="nav-link">Experience</a>
        </nav>
        <a href="/donate" className="nav-cta">Donate</a>
      </div>
    </header>
  );
}
