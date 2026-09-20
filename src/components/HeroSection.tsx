"use client";

import { useEffect, useState } from "react";
import { motion, type MotionStyle } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const MotionImage = motion.create(Image);

const TRANSITION = { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const };
const PHOTO_TRANSITION = { duration: 1.6, ease: [0.4, 0, 0.2, 1] as const };

const HERO_PHOTOS: { src: string; style: MotionStyle }[] = [
  { src: "/images/hero/hero_shot_3.jpg?v=2", style: { objectFit: "cover", objectPosition: "center" } },
  { src: "/images/hero/award-1.jpg",          style: { objectPosition: "center top" } },
  { src: "/images/hero/hero_shot_promo.jpg",  style: { objectPosition: "center 20%" } },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);
  const [heddleKey, setHeddleKey] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  // Only the first hero photo is rendered up front. The other two aren't shown
  // until the 5s rotation, but they previously carried loading="eager", so all
  // three ~90KB images downloaded at once and starved the LCP image of mobile
  // bandwidth — Lighthouse measured it as a 500ms LCP "resource load delay".
  // Lazy loading wouldn't help here: these are stacked in the viewport, so the
  // browser fetches them regardless of loading="lazy".
  const [loadRestOfPhotos, setLoadRestOfPhotos] = useState(false);
  useEffect(() => {
    if (document.readyState === "complete") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadRestOfPhotos(true);
      return;
    }
    const start = () => setLoadRestOfPhotos(true);
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // The rotation must NOT start until the other photos are mounted. On a
  // throttled phone the load event fired at ~6.6s, after the 5s tick — so an
  // unconditional interval advanced photoIndex to a photo that wasn't rendered
  // yet, fading photo 0 out to nothing and leaving the hero blank.
  useEffect(() => {
    if (!loadRestOfPhotos) return;
    const id = setInterval(() => {
      setPhotoIndex(i => (i + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [loadRestOfPhotos]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-brand-mark-wrap">
          <Image
            src="/images/icons/circle_icon.png"
            alt=""
            width={128}
            height={128}
            className="hero-brand-mark"
            priority
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
          <a href="/volunteer?check=volunteer" className="hero-btn hero-btn--dark">
            {t("hero.ctaJoin")}
          </a>
          <a href="/volunteer?check=sign" className="hero-btn hero-btn--white">
            {t("hero.ctaSign")}
          </a>
        </div>
      </div>

      <div className="hero-photo">
        {HERO_PHOTOS.map(({ src, style }, i) => {
          // Hold back everything but the LCP image until the page has loaded.
          // They mount with initial={false} at opacity 0, so appearing later
          // causes no flash and no layout shift.
          if (i > 0 && !loadRestOfPhotos) return null;
          return (
            <MotionImage
              key={src}
              src={src}
              alt="Sue Heddle, Ward 5 Candidate"
              fill
              sizes="(max-width: 959px) 100vw, 50vw"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? undefined : "eager"}
              quality={92}
              style={style}
              initial={false}
              animate={{
                opacity: i === photoIndex ? 1 : 0,
              }}
              transition={PHOTO_TRANSITION}
            />
          );
        })}
        <div className="hero-photo-overlay" />
        <a href="/about" className="hero-quote-box">
          <p className="hero-quote-heading">
            {t("hero.quoteWhy")} <mark className="hero-quote-mark">{t("hero.quote")}</mark>?
          </p>
        </a>
      </div>
    </section>
  );
}
