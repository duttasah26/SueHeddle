"use client";

import NavBar from "@/components/NavBar";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <NavBar />
      <main>
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <h1 className="about-hero-heading">
              {t("about.heroHeading")}
              <span className="accent">{t("about.heroHeadingAccent")}</span>
            </h1>
            <p className="about-hero-subtitle">{t("about.heroSubtitle")}</p>
          </div>
        </section>

        {/* Bio */}
        <section className="about-bio">
          <div className="about-section-inner">
            <div className="about-bio-body">
              <p>{t("about.bioP1")}</p>
              <p>{t("about.bioP2")}</p>
              <p>
                {t("about.bioP3Pre")}
                <strong className="about-bio-highlight">Hockey Cares</strong>
                {t("about.bioP3Mid1")}
                <strong className="about-bio-highlight">SafetyNet</strong>
                {t("about.bioP3Mid2")}
                <strong className="about-bio-highlight">SAVIS</strong>
                {t("about.bioP3Post")}
              </p>
              <p>{t("about.bioP4")}</p>
              <p>{t("about.bioP5")}</p>
            </div>
          </div>
        </section>

        {/* Why I'm Running */}
        <section className="about-why">
          <div className="about-section-inner">
            <h2 className="about-section-heading">{t("about.whyHeading")}</h2>
            <div className="about-why-body">
              <p>{t("about.whyP1")}</p>
              <p>{t("about.whyP2")}</p>
              <p>{t("about.whyP3")}</p>
              <p>{t("about.whyP4")}</p>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <GetInvolvedSection />
      </main>
    </>
  );
}
