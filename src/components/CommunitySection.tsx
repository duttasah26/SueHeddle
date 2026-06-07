"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const sliderPhotos = [
  { src: "/images/sue/award.jpg",             alt: "Sue receiving award" },
  { src: "/images/sue/award_2.jpg",           alt: "Award ceremony" },
  { src: "/images/sue/award_3.jpg",           alt: "National recognition event" },
  { src: "/images/sue/award_10.jpg",          alt: "Award event" },
  { src: "/images/sue/award_12.jpg",          alt: "Sue receiving the REALTORS Care Award" },
  { src: "/images/sue/comm_spirit_3.jpg",     alt: "Sue with community" },
  { src: "/images/sue/comm_spirit_4.jpg",     alt: "Sue at community event" },
  { src: "/images/sue/comm_spirit_5.jpg",     alt: "Sue with supporters" },
  { src: "/images/sue/comm_spirit_8 (2).jpg", alt: "Sue with community members" },
  { src: "/images/sue/comm_spirit_9.jpg",     alt: "Community spirit" },
  { src: "/images/sue/comm_spirit_10.jpg",    alt: "Sue at community gathering" },
  { src: "/images/sue/comm_spirit_13.jpg",    alt: "Sue with residents" },
  { src: "/images/sue/comm_spirit_15.jpg",    alt: "Community event" },
  { src: "/images/sue/culture_1.jpg",         alt: "Sue with Ward 5 residents" },
  { src: "/images/sue/culture_2.jpg",         alt: "Sue at local event" },
  { src: "/images/sue/culture_3.jpg",         alt: "Cultural exchange" },
  { src: "/images/sue/culture_4.jpg",         alt: "Sue with local supporters" },
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
  { src: "/images/sue/hockey_6.jpg",          alt: "Hockey Cares gathering" },
];

function Gallery({ images, showCaption }: { images: { src: string; alt: string; objectPosition?: string }[]; showCaption?: boolean }) {
  return (
    <div className={`flow-gallery${showCaption ? " flow-gallery--captioned" : ""}`}>
      {images.map(({ src, alt, objectPosition }, i) => (
        <div key={i} className="flow-gallery-cell">
          <img src={src} alt={alt} className="flow-gallery-img" style={objectPosition ? { objectPosition } : undefined} />
          {showCaption && <span className="flow-gallery-caption">{alt}</span>}
        </div>
      ))}
    </div>
  );
}

export default function CommunitySection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="community-section" id="community-support">
        <h2 className="community-heading">{t("community.heading")}</h2>
        <div className="slider-container">
          <div className="slider-track">
            {[...sliderPhotos, ...sliderPhotos].map(({ src, alt }, i) => (
              <div key={i} className="slider-item">
                <img src={src} alt={alt} className="slider-image" />
              </div>
            ))}
          </div>
        </div>
        <p className="community-caption">{t("community.caption")}</p>
      </section>

      <div className="flow-art-root" aria-label="Community Leadership">

        <section aria-label="Community Leadership" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#e70685", color: "#fff" }}>
            <div className="flow-text-image-row">
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s1Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>{t("community.s1Heading")}</h2>
                <hr className="flow-divider" />
                <p className="flow-body">{t("community.s1Body")}</p>
              </div>
              <div className="flow-side-img-wrap">
                <img
                  src="/images/sue/comm_spirit_4.jpg"
                  alt="Sue with community members"
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
                  {"Bridging\n"}
                  <span style={{ color: "var(--primary)" }}>{"Communities"}</span>
                  {"\nThrough\nSport"}
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
                  Canadian<br />REALTORS<br /><span style={{ color: "var(--primary)" }}>Care</span><br />Award
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
              <Gallery showCaption images={[
                { src: "/images/sue/award_12.jpg",   alt: "Sue receiving the REALTORS Care Award"},
                { src: "/images/sue/award_10.jpg", alt: "Sue with Canadian Hockey Legend, Paul Henderson", objectPosition: "50% 40%" },
                { src: "/images/sue/award_3.jpg", alt: "National recognition event" },
                { src: "/images/sue/award_2.jpg", alt: "Sue with current Oakville mayor, Rob Burton", objectPosition: "50% 20%" },
              ]} />
            </div>
          </div>
        </section>

        <section aria-label="Professional Roots in Oakville" className="flow-section">
          <div className="flow-art-container" style={{ backgroundColor: "#fcf9f8", color: "#1c1b1b" }}>
            <div className="flow-text-image-row">
              <Gallery images={[
                { src: "/images/sue/comm_spirit_3.jpg", alt: "Sue in the Oakville community", objectPosition: "50% 40%" },
                { src: "/images/sue/comm_spirit_5.jpg", alt: "Sue connecting with residents", objectPosition: "50% 20%" },
                { src: "/images/sue/culture_1.jpg",     alt: "Community engagement" },
                { src: "/images/sue/culture_2.jpg",     alt: "Sue at a local event" },
              ]} />
              <div className="flow-text-col">
                <p className="flow-eyebrow">{t("community.s4Eyebrow")}</p>
                <hr className="flow-divider" />
                <h2 className="flow-heading" style={{ whiteSpace: "pre-line" }}>{t("community.s4Heading")}</h2>
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
                { src: "/images/sue/comm_spirit_13.jpg", alt: "Sue at a Ward 5 event" },
                { src: "/images/sue/comm_spirit_15.jpg", alt: "Community event" },
                { src: "/images/sue/comm_spirit_8 (2).jpg", alt: "Community gathering" },
                { src: "/images/sue/comm_spirit_9.jpg", alt: "Sue with local supporters" },
              ]} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
