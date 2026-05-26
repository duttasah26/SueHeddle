import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-photo-panel">
        <Image
          src="/sue-heddle.png"
          alt="Sue Heddle, Ward 4 Councillor Candidate"
          fill
          priority
          sizes="(max-width: 959px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div className="hero-content-panel">
        <p className="hero-eyebrow">Oakville · Ward 4 · 2026 Municipal Election</p>
        <h1 className="hero-name">Sue<br />Heddle</h1>
        <p className="hero-title">Candidate for Ward 4 Councillor</p>
        <p className="hero-bio">
          Ward 4 deserves a councillor who understands this community from the inside out.
          As a long-time Oakville resident, award-winning professional, and dedicated
          community volunteer, I bring the experience and commitment our ward needs on Council.
        </p>
        <p className="hero-bio">
          I&apos;m running because I believe in responsible growth, transparent governance,
          and a Ward 4 where every resident&apos;s voice is heard — from young families
          to long-time homeowners. Let&apos;s build something better together.
        </p>
        <div className="hero-actions">
          <a href="#platform" className="btn-primary">My Platform</a>
          <a href="#get-involved" className="btn-ghost-inv">Get Involved</a>
        </div>
      </div>
    </section>
  );
}
