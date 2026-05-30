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
        <h2 className="intro-heading">{t("intro.heading")}</h2>
      </div>
    </section>
  );
}
