'use client';
import '@/styles/landing.css';

export default function LandingContent() {
  return (
    <article>
      {/* ── TAGLINE SECTION ─────────────────────────────────────── */}
      <section className="landing-tagline-section">
        <div className="landing-tagline-inner">
          <span className="landing-eyebrow">Ward 5 · Oakville 2026</span>
          <h2 className="landing-tagline-heading">
            Building Ward 5&apos;s
            <br />
            <span className="lh-pink">Future</span> Together.
          </h2>
        </div>
      </section>

      {/* ── BIO SECTION ─────────────────────────────────────────── */}
      <section className="landing-bio-section">
        <div className="landing-bio-inner">
          <div className="landing-bio-text">
            <span className="landing-eyebrow landing-eyebrow--dark">About Sue</span>
            <h2 className="landing-bio-heading">I&apos;m Sue Heddle.</h2>
            <p className="landing-bio-copy">
              <span className="landing-pink">I&apos;m the right choice for your new Ward 5 Town Councillor</span>
              {' '}because I have a proven track record of bringing people together to strengthen our community.
            </p>
            <p className="landing-bio-copy">
              I&apos;ve been awarded the{' '}
              <span className="landing-pink">King Charles III Coronation Medal</span> for my
              contributions to Oakville and to reconciliation efforts across Canada. In 2017, I created
              and led <span className="landing-pink">Hockey Cares</span> — a program that brings
              Oakville and Indigenous youth together through hockey, both here and in northern First
              Nations communities such as Constance Lake First Nation and Attawapiskat First Nation.
              Youth and their parents build lasting relationships and help advance meaningful
              reconciliation.
            </p>
            <p className="landing-bio-copy">
              I have also served as <span className="landing-pink">Chair of Safetynet</span>, the only
              free clothing bank and tutoring service in the GTA. When I joined in 2014, I brought
              together the right people, strengthened its operations, and helped transform it into a
              vital service supporting unhoused and underserved residents in Oakville.
            </p>
          </div>

          <div className="landing-bio-img-col">
            <div className="landing-bio-img-wrap">
              <img
                src="/images/sue/hero_shot.png"
                alt="Sue Heddle"
                className="landing-bio-img"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
