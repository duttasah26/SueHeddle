"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const SPRING = { type: "spring" as const, stiffness: 72, damping: 20 };

export default function HeroSection() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);
  const [heddleKey, setHeddleKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 2), 4500);
    return () => clearInterval(id);
  }, []);

  // Remount the animated underline each time the heddle phase becomes active
  useEffect(() => {
    if (phase === 1) setHeddleKey(k => k + 1);
  }, [phase]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-brand-mark-wrap">
          <img
            src="/images/icons/circle_icon.png"
            alt=""
            className="hero-brand-mark"
          />
        </div>
        <div className="hero-heading-wrap" suppressHydrationWarning>
          {/* Both phases stay in the DOM so the grid cell always sizes to the tallest one */}
          <motion.div
            className="hero-phase hero-phase-vote"
            animate={{ opacity: phase === 0 ? 1 : 0 }}
            initial={{ opacity: 1 }}
            transition={SPRING}
            aria-hidden={phase !== 0}
            style={{ pointerEvents: phase === 0 ? "auto" : "none" }}
            suppressHydrationWarning
          >
            <h1 className="hero-heading">
              {t("hero.voteLineA")}<br />
              {t("hero.voteLineB")}
              <span className="hero-heading-black">{t("hero.voteLineAccent")}</span>
            </h1>
            <p className="hero-election-date">
              {t("hero.electionDay")} <span className="hero-election-date-accent">{t("hero.electionDate")}</span>
            </p>
          </motion.div>
          <motion.div
            className="hero-phase"
            animate={{ opacity: phase === 1 ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={SPRING}
            aria-hidden={phase !== 1}
            style={{ pointerEvents: phase === 1 ? "auto" : "none" }}
            suppressHydrationWarning
          >
            <div className="hero-elect">{t("hero.elect")}</div>
            <h1 className="hero-heading">
              Sue<br />
              <span className="hero-heading-rel">
                Heddle
                <span className="animated-underline" key={heddleKey} />
              </span>
            </h1>
            <span className="hero-ward">{t("hero.ward")}</span>
          </motion.div>
        </div>
        <div className="hero-ctas">
          <a href="/volunteer" className="hero-btn hero-btn--dark">
            {t("hero.ctaJoin")}
          </a>
          <a href="/volunteer" className="hero-btn hero-btn--white">
            {t("hero.ctaSign")}
          </a>
        </div>
      </div>

      <div className="hero-photo">
        <img src="/sue-heddle.png" alt="Sue Heddle, Ward 5 Candidate" />
        <div className="hero-photo-overlay" />
        <a href="/about" className="hero-quote-box">
          <p className="hero-quote-heading">
            Meet <mark className="hero-quote-mark">{t("hero.quote")}</mark>
          </p>
        </a>
      </div>
    </section>
  );
}
