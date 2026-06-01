"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/splash.css";
import SmoothScroll from "@/components/ui/smooth-scroll";
import LandingContent from "@/components/LandingContent";
import SiteFooter from "@/components/SiteFooter";

const PHASE_EXIT = { opacity: 0, y: -56, transition: { duration: 0.28, ease: "easeIn" as const } };
const PHASE_SPRING = { type: "spring" as const, stiffness: 72, damping: 20 };

export default function SplashPage() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!videoEnded) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 2), 4500);
    return () => clearInterval(id);
  }, [videoEnded]);

  return (
    <SmoothScroll>
      {/* ── SPLASH ──────────────────────────────────────────────── */}
      <div className="splash-root">
        <video
          className={`splash-video${videoEnded ? " splash-video--out" : ""}`}
          autoPlay
          muted
          playsInline
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 8) setVideoEnded(true);
          }}
          onEnded={() => setVideoEnded(true)}
        >
          <source src="/videos/promo.mp4#t=1.2" type="video/mp4" />
        </video>

        <div className={`splash-bg${videoEnded ? " splash-bg--on" : ""}`} />

        <div className={`splash-content${videoEnded ? " splash-content--in" : ""}`}>
          <div className="splash-icon-wrap">
            <img
              src="/images/icons/circle_icon.png"
              alt="Sue Heddle"
              className="splash-icon"
            />
          </div>

          <div className="splash-heading-wrap" suppressHydrationWarning>
            <AnimatePresence mode="wait" initial={false}>
              {phase === 0 ? (
                <motion.div
                  key="vote"
                  className="splash-phase"
                  initial={{ opacity: 0, y: 56 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={PHASE_EXIT}
                  transition={PHASE_SPRING}
                  suppressHydrationWarning
                  style={{ paddingTop: "clamp(14px, 2.25vw, 28px)" }}
                >
                  <div className="splash-name">Vote Sue.</div>
                  <div className="splash-name">
                    Vote <span className="splash-pink">New.</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="elect"
                  className="splash-phase"
                  initial={{ opacity: 0, y: 56 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={PHASE_EXIT}
                  transition={PHASE_SPRING}
                  suppressHydrationWarning
                >
                  <div className="splash-elect">Elect</div>
                  <div className="splash-name">Sue</div>
                  <div className="splash-name">
                    <span className="splash-name-rel">
                      <span className="splash-pink">Heddle</span>
                      <span className="splash-underline" />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="splash-ward">Ward 5 Councillor &middot; Oakville</p>
          <p className="splash-date">Election Day &middot; October 26, 2026</p>
        </div>
      </div>

      {/* ── LANDING SECTIONS ────────────────────────────────────── */}
      <LandingContent />
      <SiteFooter />
    </SmoothScroll>
  );
}
