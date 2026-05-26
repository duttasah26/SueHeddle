export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          Sue Heddle <span>· Ward 4</span>
        </a>
        <div className="nav-links">
          <a href="#about" className="nav-link active">About</a>
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#background" className="nav-link">Background</a>
          <a href="#get-involved" className="nav-link">Get Involved</a>
        </div>
        <a href="#get-involved" className="nav-cta">Support Sue →</a>
      </div>
    </header>
  );
}
