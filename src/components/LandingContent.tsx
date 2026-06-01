'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MarkerHighlight from '@/components/MarkerHighlight';
import '@/styles/landing.css';

const PRIORITIES = [
  {
    num: '01',
    title: 'Smart Growth.',
    icon: 'trending_up',
    desc: "Responsible development that preserves Oakville's character while planning thoughtfully for a growing community.",
  },
  {
    num: '02',
    title: 'Better Transit.',
    icon: 'commute',
    desc: 'Improved public transit options that connect Ward 5 to the rest of Oakville and the Greater Toronto Area.',
  },
  {
    num: '03',
    title: 'Strong Leadership.',
    icon: 'groups',
    desc: 'A councillor who listens, who shows up, and who fights every day for what Ward 5 residents deserve.',
  },
];

export default function LandingContent() {
  const commitRef = useRef<HTMLDivElement>(null);
  const inView = useInView(commitRef, { once: true, margin: '-6%' });

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
                src="/sue-heddle.png"
                alt="Sue Heddle"
                className="landing-bio-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT SECTION (black) ───────────────────────────── */}
      <section className="landing-commit-section" ref={commitRef}>
        <div className="landing-commit-inner">
          <motion.p
            className="landing-commit-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            My commitment is simple:
          </motion.p>

          <div className="landing-commit-list">
            {PRIORITIES.map((p, i) => (
              <motion.div
                key={p.num}
                className="lp-item"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
              >
                <div className="lp-top-row">
                  <motion.span
                    className="material-symbols-outlined lp-icon"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 18,
                      delay: 0.15 + i * 0.12,
                    }}
                  >
                    {p.icon}
                  </motion.span>
                  <span className="lp-num">{p.num}</span>
                </div>
                <div className="lp-title-wrap">
                  <span className="lp-title-base">{p.title}</span>
                  <span
                    className={`lp-title-overlay${inView ? ' is-swept' : ''}`}
                    style={{ '--sweep-delay': `${0.18 + i * 0.14}s` } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {p.title}
                  </span>
                </div>
                <p className="lp-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
