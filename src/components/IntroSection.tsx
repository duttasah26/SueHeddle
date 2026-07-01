"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import MarkerHighlight from "@/components/MarkerHighlight";

export default function IntroSection() {
  const { t } = useLanguage();
  return (
    <section className="intro-section">
      <div className="intro-inner">
        <div className="intro-body">
          <p className="intro-p">{t("intro.p1")}</p>
          <p className="intro-p">{t("intro.p1b")}</p>
          <ul className="intro-points-list">
            <li className="intro-point-item">
              <span>
                That inspired me to found{" "}
                <a href="https://truenorthaid.ca/project/hockey-cares/" target="_blank" rel="noopener noreferrer" className="intro-link">Hockey Cares</a>, an organization dedicated to helping youth and families through sport and community support. For this, I won the{" "}
                <a href="https://www.canada.ca/en/department-national-defence/services/medals/medals-chart-index/king-charles-iiis-coronation-medal.html" target="_blank" rel="noopener noreferrer" className="intro-link">King Charles III Coronation Medal</a>{" "}
                in 2025, and the{" "}
                <a href="https://www.realtorscare.ca/canadian-realtors-care-award/" target="_blank" rel="noopener noreferrer" className="intro-link">Care Award</a> in 2026.
              </span>
            </li>
            <li className="intro-point-item">
              <span>
                This commitment guided my work as{" "}
                <a href="https://www.safetynetservices.ca/" target="_blank" rel="noopener noreferrer" className="intro-link">Chair of SafetyNet</a>, where I helped bring together community partners to address important local issues like food insecurity and precarity.
              </span>
            </li>
            <li className="intro-point-item">
              <span>
                It also led me to volunteer with{" "}
                <a href="https://www.savisofhalton.org/" target="_blank" rel="noopener noreferrer" className="intro-link">SAVIS</a>, supporting individuals and families during some of life&apos;s most difficult moments.
              </span>
            </li>
          </ul>
          <p className="intro-p">{t("intro.p1d")}</p>
          <p className="intro-p">{t("intro.p2")}</p>
          <p className="intro-commitment-label">{t("intro.commitment")}</p>
          <ul className="intro-commitment-list">
            <li>
              <span className="intro-commitment-num">01</span>
              <MarkerHighlight delay={0}>{t("intro.point1")}</MarkerHighlight>
            </li>
            <li>
              <span className="intro-commitment-num">02</span>
              <MarkerHighlight delay={180}>{t("intro.point2")}</MarkerHighlight>
            </li>
            <li>
              <span className="intro-commitment-num">03</span>
              <MarkerHighlight delay={360}>{t("intro.point3")}</MarkerHighlight>
            </li>
          </ul>
          <p className="intro-p">{t("intro.p3")}</p>
        </div>
        <h2 className="intro-heading">
          {t("intro.heading")}
          <span style={{ color: "var(--primary)" }}>{t("intro.headingAccent")}</span>
          {t("intro.headingPost")}
        </h2>
      </div>
    </section>
  );
}
