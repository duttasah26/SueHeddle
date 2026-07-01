"use client";

import { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import GetInvolvedSection from "@/components/GetInvolvedSection";
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
    <div className="about-video-wrap">
      <video
        ref={videoRef}
        src="/videos/award.mp4"
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
    </div>
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
            <h1 className="about-hero-heading">
              {t("about.heroHeading")}{" "}
              <span className="accent">{t("about.heroHeadingAccent")}</span>
            </h1>
            <p className="about-hero-subtitle">
              Building Ward 5's <span style={{ color: "var(--primary)" }}>Future</span> Together
            </p>
          </div>
        </section>

        {/* Why I'm Running */}
        <section className="about-why">
          <div className="about-why-inner">
            <div className="about-why-body">
              <p>{t("about.whyP1")}</p>
              <p>{t("about.whyP2")}</p>
              <p>{t("about.whyP3")}</p>
              <p>{t("about.whyP4")}</p>
            </div>
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
