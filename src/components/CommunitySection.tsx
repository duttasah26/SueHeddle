"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import ImageLightbox from "@/components/ImageLightbox";

const sliderPhotos = [
  { src: "/images/sue/award.jpg",             alt: "Sue receiving award" },
  { src: "/images/sue/award_2.jpg",           alt: "Award ceremony" },
  { src: "/images/sue/award_3.jpg",           alt: "National recognition event" },
  { src: "/images/sue/award_10.jpg",          alt: "Award event" },
  { src: "/images/sue/award_12.jpg",          alt: "Sue receiving the REALTORS Care Award" },
  { src: "/images/sue/comm_spirit.jpg",       alt: "Sue with community" },
  { src: "/images/sue/comm_spirit_3.jpg",     alt: "Sue with community" },
  { src: "/images/sue/comm_spirit_4.jpg",     alt: "Sue at community event" },
  { src: "/images/sue/comm_spirit_5.jpg",     alt: "Sue with supporters" },
  { src: "/images/sue/comm_spirit_8 (2).jpg", alt: "Sue with community members" },
  { src: "/images/sue/comm_spirit_9.jpg",     alt: "Community spirit" },
  { src: "/images/sue/comm_spirit_10.jpg",    alt: "Sue at community gathering" },
  { src: "/images/sue/comm_spirit_13.jpg",    alt: "Sue with residents" },
  { src: "/images/sue/comm_spirit_15.jpg",    alt: "Community event" },
  { src: "/images/sue/comm_spirit_x.jpg",     alt: "Sue at community event" },
  { src: "/images/sue/culture_1.jpg",         alt: "Sue with Ward 5 residents" },
  { src: "/images/sue/culture_2.jpg",         alt: "Sue at local event" },
  { src: "/images/sue/culture_3.jpg",         alt: "Cultural exchange" },
  { src: "/images/sue/culture_5.jpg",         alt: "Cultural community event" },
  { src: "/images/sue/culture_6.jpg",         alt: "Sue at cultural gathering" },
  { src: "/images/sue/culture_7.jpg",         alt: "Community culture event" },
  { src: "/images/sue/culture_10.jpg",        alt: "Cultural celebration" },
  { src: "/images/sue/culture_11.jpg",        alt: "Sue with community" },
  { src: "/images/sue/hockey_1.jpg",          alt: "Sue at Hockey Cares" },
  { src: "/images/sue/hockey_2.jpg",          alt: "Hockey Cares event" },
  { src: "/images/sue/hockey_3.jpg",          alt: "Youth hockey program" },
  { src: "/images/sue/hockey_4.jpg",          alt: "Hockey Cares community" },
  { src: "/images/sue/hockey_5.jpg",          alt: "Hockey event" },
  { src: "/images/sue/hockey_6.jpg",           alt: "Hockey Cares gathering" },
  { src: "/images/sue/fireman_1.jpg",          alt: "Sue with essential workers" },
  { src: "/images/award/award (2).jpg",        alt: "Award ceremony" },
  { src: "/images/award/award (8).jpg",        alt: "Community award" },
  { src: "/images/award/award (10).jpg",       alt: "Award event" },
  { src: "/images/award/award (13).jpg",       alt: "Community recognition" },
];

function Gallery({ images, showCaption, centerVideo }: { images: { src: string; alt: string; objectPosition?: string; caption?: string }[]; showCaption?: boolean; centerVideo?: string }) {
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div className={`flow-gallery${showCaption ? " flow-gallery--captioned" : ""}${centerVideo ? " flow-gallery--has-video" : ""}`}>
      {images.map(({ src, alt, objectPosition, caption }, i) => {
        const hasCaption = showCaption || !!caption;
        return (
          <div
            key={i}
            className={`flow-gallery-cell${hasCaption ? " flow-gallery-cell--captioned" : ""}`}
            onClick={() => setLightboxIndex(i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(i); } }}
            role="button"
            tabIndex={0}
            aria-label={`View ${alt}`}
            suppressHydrationWarning
          >
            <Image src={src} alt={alt} fill quality={92} sizes="(max-width: 743px) 50vw, 400px" className="flow-gallery-img" style={objectPosition ? { objectPosition } : undefined} />
            {hasCaption && <span className="flow-gallery-caption">{caption ?? alt}</span>}
          </div>
        );
      })}
      {centerVideo && (
        <div
          className="flow-gallery-video-wrap"
          onClick={() => setLightboxIndex(images.length)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(images.length); } }}
          role="button"
          tabIndex={0}
          aria-label="View campaign video"
          suppressHydrationWarning
        >
          <video
            ref={videoRef}
            src={centerVideo}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="flow-gallery-video"
          />
          <div className="flow-gallery-video-controls" onClick={(e) => e.stopPropagation()}>
            <button suppressHydrationWarning onClick={togglePlay} aria-label={paused ? "Play" : "Pause"} className="flow-gallery-video-btn">
              <span className="material-symbols-outlined">{paused ? "play_arrow" : "pause"}</span>
            </button>
            <button suppressHydrationWarning onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="flow-gallery-video-btn">
              <span className="material-symbols-outlined">{muted ? "volume_off" : "volume_up"}</span>
            </button>
          </div>
        </div>
      )}
      <ImageLightbox
        images={[
          ...images.map(({ src, alt, objectPosition, caption }) => ({
            src,
            alt,
            objectPosition,
            caption: (showCaption || !!caption) ? (caption ?? alt) : undefined,
          })),
          ...(centerVideo ? [{ src: centerVideo, alt: "Campaign video", type: "video" as const }] : []),
        ]}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

export default function CommunitySection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="community-section" id="community-support">
        <h2 className="community-heading">
          {t("community.heading")}
          <span style={{ color: "var(--primary)" }}>{t("community.headingAccent")}</span>
          {t("community.headingPost")}
        </h2>
        <div className="slider-container">
          <div className="slider-track">
            {[...sliderPhotos, ...sliderPhotos].map(({ src, alt }, i) => (
              <div key={i} className="slider-item">
                <Image src={src} alt={alt} fill quality={92} sizes="350px" className="slider-image" />
              </div>
            ))}
          </div>
        </div>
        <p className="community-caption">{t("community.caption")}</p>
      </section>

      <div className="flow-art-root" aria-label="Community Leadership">

        <section aria-label="Community Leadership" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#e70685", color: "#fff" }}>
            <div className="flow-text-image-row flow-row--text-first">
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s1Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>{t("community.s1Heading")}</h2>
                <hr className="flow-divider" />
                <p className="flow-body">{t("community.s1Body")}</p>
              </div>
              <div className="flow-side-img-wrap">
                <Image
                  src="/images/sue/comm_spirit_4.jpg"
                  alt="Sue with community members"
                  fill
                  quality={92}
                  sizes="(max-width: 959px) 100vw, 50vw"
                  className="flow-side-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Hockey Cares — Bridging Communities Through Sport" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#1a1c1c", color: "#fff" }}>
            <div className="flow-text-image-row">
              <Gallery images={[
                { src: "/images/sue/hockey_1.jpg",  alt: "Hockey Cares event", objectPosition: "50% 20%" },
                { src: "/images/sue/hockey_2.jpg",  alt: "Hockey Cares community" },
                { src: "/images/sue/hockey_5.jpg", alt: "Cultural exchange" },
                { src: "/images/sue/hockey_6.jpg", alt: "Cultural exchange" },

              ]} />
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s2Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>
                  {t("community.s2HeadingPre")}{"\n"}
                  <span style={{ color: "var(--primary)" }}>{t("community.s2HeadingAccent")}</span>
                  {"\n"}{t("community.s2HeadingPost")}
                </h2>
                <hr className="flow-divider" />
                <p className="flow-body">{t("community.s2Body")}</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="National Recognition" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#000", color: "#fff" }}>
            <div className="flow-text-image-row flow-row--text-first">
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s3Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading">
                  {t("community.s3HeadingPre")}<br /><span style={{ color: "var(--primary)" }}>{t("community.s3HeadingAccent")}</span><br />{t("community.s3HeadingPost")}
                </h2>
                <hr className="flow-divider" />
                <div className="flow-cols">
                  <div className="flow-col">
                    <p className="flow-col-title">{t("community.s3Col1Title")}</p>
                    <p className="flow-col-desc">{t("community.s3Col1Desc")}</p>
                  </div>
                  <div className="flow-col">
                    <p className="flow-col-title">{t("community.s3Col2Title")}</p>
                    <p className="flow-col-desc">{t("community.s3Col2Desc")}</p>
                  </div>
                </div>
              </div>
              <Gallery showCaption centerVideo="https://res.cloudinary.com/aurx0hy5/video/upload/v1782869683/sue-clip_ys7ide.mp4" images={[
                { src: "/images/sue/award_12.jpg", alt: "Sue at Attawapiskat First Nation flag raising, Oakville Town Hall", caption: t("community.capFlagRaising") },
                { src: "/images/sue/award_10.jpg", alt: "Sue with Canadian Hockey Legend, Paul Henderson", objectPosition: "50% 40%", caption: t("community.capPaulHenderson") },
                { src: "/images/sue/award_3.jpg",  alt: "Sue at King Charles III medal award ceremony", caption: t("community.capKingCharlesMedal") },
                { src: "/images/sue/award_2.jpg",  alt: "Sue with current Oakville mayor, Rob Burton", objectPosition: "50% 20%", caption: t("community.capMayorBurton") },
              ]} />
            </div>
          </div>
        </section>

        <section aria-label="Professional Roots in Oakville" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#fcf9f8", color: "#1c1b1b" }}>
            <div className="flow-text-image-row">
              <Gallery showCaption images={[
                { src: "/images/sue/comm_spirit_3.jpg", alt: "Working with indigenous women to create awareness about missing and murdered women", objectPosition: "50% 40%", caption: t("community.capIndigenousWomen") },
                { src: "/images/sue/comm_spirit.jpg",   alt: "Sue serving breakfast with RCMP in Kugaaruk, Nunavut", objectPosition: "50% 20%", caption: t("community.capRcmpBreakfast") },
                { src: "/images/sue/fireman_2.jpg",     alt: "Sue presenting a plaque to the Oakville fire department", caption: t("community.capFireDept") },
                { src: "/images/sue/culture_2.jpg",     alt: "Sue attending Chinese Lunar New Year celebration", caption: t("community.capLunarNewYear") },
              ]} />
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s4Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>
                  {t("community.s4HeadingPre")}{"\n"}
                  <span style={{ color: "var(--primary)" }}>{t("community.s4HeadingAccent")}</span>
                  {"\n"}{t("community.s4HeadingPost")}
                </h2>
                <hr className="flow-divider" />
                <p className="flow-body">{t("community.s4Body")}</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="A Voice for Ward 5" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#e70685", color: "#fff" }}>
            <div className="flow-text-image-row flow-row--text-first">
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s5Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>{t("community.s5Heading")}</h2>
                <hr className="flow-divider" />
                <p className="flow-body">{t("community.s5Body")}</p>
              </div>
              <Gallery images={[
                { src: "/images/award/award (6).jpg",  alt: "Sue Heddle at award ceremony" },
                { src: "/images/award/award (1).jpg",  alt: "Award recognition event" },
                { src: "/images/award/award (8).jpg",  alt: "Sue with Documentary Director, Mike Downie, brother of Gord Downie of Tragically Hip", caption: t("community.capMikeDownie") },
                { src: "/images/award/award (2).jpg",  alt: "Sue receiving award" },
              ]} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
