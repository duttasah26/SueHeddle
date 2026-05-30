"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const PHASE_EXIT = { opacity: 0, y: -56, transition: { duration: 0.28, ease: "easeIn" as const } };
const PHASE_SPRING = { type: "spring" as const, stiffness: 72, damping: 20 };

export default function HeroSection() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 2), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <img
          src="/images/icons/circle_icon.png"
          alt=""
          className="hero-brand-mark"
        />
        <div className="hero-heading-wrap" suppressHydrationWarning>
          {/* initial={false}: first render appears immediately, no opening gap */}
          <AnimatePresence mode="wait" initial={false}>
            {phase === 0 ? (
              <motion.div
                key="vote"
                className="hero-phase hero-phase-vote"
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                exit={PHASE_EXIT}
                transition={PHASE_SPRING}
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
            ) : (
              <motion.div
                key="heddle"
                className="hero-phase"
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                exit={PHASE_EXIT}
                transition={PHASE_SPRING}
                suppressHydrationWarning
              >
                <div className="hero-elect">{t("hero.elect")}</div>
                <h1 className="hero-heading">
                  Sue<br />
                  <span className="hero-heading-rel">
                    Heddle
                    <span className="animated-underline" />
                  </span>
                </h1>
                <span className="hero-ward">{t("hero.ward")}</span>
              </motion.div>
            )}
          </AnimatePresence>
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
