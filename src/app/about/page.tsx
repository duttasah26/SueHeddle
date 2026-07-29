"use client";

import { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

function AwardVideo() {
  const [muted,  setMuted]  = useState(true);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else          { v.pause(); setPaused(true); }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <Reveal className="about-video-wrap" delay={0.15}>
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/aurx0hy5/video/upload/v1782869663/award_pmhpbd.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="about-video"
      />
      <div className="flow-gallery-video-controls">
        <button suppressHydrationWarning onClick={togglePlay} aria-label={paused ? "Play" : "Pause"} className="flow-gallery-video-btn">
          <span className="material-symbols-outlined">{paused ? "play_arrow" : "pause"}</span>
        </button>
        <button suppressHydrationWarning onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="flow-gallery-video-btn">
          <span className="material-symbols-outlined">{muted ? "volume_off" : "volume_up"}</span>
        </button>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <NavBar />
      <main>
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <Reveal as="h1" className="about-hero-heading">
              {t("about.heroHeading")}{" "}
              <span className="accent">{t("about.heroHeadingAccent")}</span>
            </Reveal>
            <Reveal as="p" className="about-hero-subtitle" delay={0.15}>
              {t("about.heroSubtitle")}
            </Reveal>
          </div>
        </section>

        {/* Why I'm Running */}
        <section className="about-why">
          <div className="about-why-inner">
            <Reveal className="about-why-body">
              <p>{t("about.whyP1")}</p>
              <p>{t("about.whyP2")}</p>
              <p>{t("about.whyP3")}</p>
              <p>{t("about.whyP4")}</p>
            </Reveal>
            <AwardVideo />
          </div>
        </section>

        {/* Get Involved */}
        <div className="about-involve">
          <GetInvolvedSection />
        </div>
      </main>
    </>
  );
}
