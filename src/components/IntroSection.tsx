"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import MarkerHighlight from "@/components/MarkerHighlight";
import Reveal from "@/components/Reveal";

export default function IntroSection() {
  const { t } = useLanguage();
  return (
    <section className="intro-section">
      <div className="intro-inner">
        <Reveal className="intro-body">
          <p className="intro-p">{t("intro.p1")}</p>
          <p className="intro-p">{t("intro.p1b")}</p>
          <ul className="intro-points-list">
            <li className="intro-point-item">
              <span>
                {t("intro.hockeyCaresPre")}
                <a href="https://truenorthaid.ca/project/hockey-cares/" target="_blank" rel="noopener noreferrer" className="intro-link">Hockey Cares</a>{t("intro.hockeyCaresMid1")}
                <a href="https://www.canada.ca/en/department-national-defence/services/medals/medals-chart-index/king-charles-iiis-coronation-medal.html" target="_blank" rel="noopener noreferrer" className="intro-link">{t("intro.medalLinkText")}</a>
                {t("intro.hockeyCaresMid2")}
                <a href="https://www.realtorscare.ca/canadian-realtors-care-award/" target="_blank" rel="noopener noreferrer" className="intro-link">{t("intro.awardLinkText")}</a>{t("intro.hockeyCaresPost")}
              </span>
            </li>
            <li className="intro-point-item">
              <span>
                {t("intro.safetyNetPre")}
                <a href="https://www.safetynetservices.ca/" target="_blank" rel="noopener noreferrer" className="intro-link">{t("intro.safetyNetLinkText")}</a>{t("intro.safetyNetPost")}
              </span>
            </li>
            <li className="intro-point-item">
              <span>
                {t("intro.savisPre")}
                <a href="https://www.savisofhalton.org/" target="_blank" rel="noopener noreferrer" className="intro-link">SAVIS</a>{t("intro.savisPost")}
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
        </Reveal>
        <Reveal as="h2" className="intro-heading" delay={0.15}>
          {t("intro.heading")}
          <span style={{ color: "var(--primary)" }}>{t("intro.headingAccent")}</span>
          {t("intro.headingPost")}
        </Reveal>
      </div>
    </section>
  );
}
