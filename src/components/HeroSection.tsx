"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSITION = { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const };

export default function HeroSection() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);
  const [heddleKey, setHeddleKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase(p => {
        const next = (p + 1) % 2;
        if (next === 1) setHeddleKey(k => k + 1);
        return next;
      });
    }, 4500);
    return () => clearInterval(id);
  }, []);

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
        <div className="hero-heading-wrap">
          <motion.div
            className="hero-phase hero-phase-vote"
            animate={{ y: phase === 0 ? 0 : "-100%" }}
            transition={TRANSITION}
            aria-hidden={phase !== 0}
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
            initial={{ y: "100%" }}
            animate={{ y: phase === 1 ? 0 : "100%" }}
            transition={TRANSITION}
            aria-hidden={phase !== 1}
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
