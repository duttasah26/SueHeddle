"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
  objectPosition?: string;
  caption?: string;
  type?: "image" | "video";
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const spring = { type: "spring", stiffness: 350, damping: 35, mass: 1 } as const;

// Enter uses a springy pop-in; exit is a fast plain tween so the image,
// backdrop, and controls all finish fading together instead of the
// controls (which have no motion of their own) lingering on-screen until
// the slower spring settles.
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: spring },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * Full-screen image viewer. Navigation is scoped to whatever `images` array
 * the caller passes in — each <Gallery> in CommunitySection owns its own
 * lightbox instance, so arrows only ever cycle within that section's photos.
 */
export default function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null;
  const current = open ? images[index] : null;
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && current && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            className="lightbox-backdrop"
            onClick={onClose}
          />

          <motion.figure
            key={current.src}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={imageVariants}
            className="lightbox-figure"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_e, info) => {
              if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 300) onClose();
            }}
          >
            <div className="lightbox-img-wrap">
              {current.type === "video" ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="lightbox-video"
                />
              ) : (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  quality={92}
                  sizes="90vw"
                  className="lightbox-img"
                  style={current.objectPosition ? { objectPosition: current.objectPosition } : undefined}
                  priority
                />
              )}
            </div>
            {current.caption && <figcaption className="lightbox-caption">{current.caption}</figcaption>}
          </motion.figure>

          {hasMultiple && (
            <>
              <motion.button
                type="button"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                className="lightbox-arrow lightbox-arrow--prev"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </motion.button>
              <motion.button
                type="button"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                className="lightbox-arrow lightbox-arrow--next"
                onClick={goNext}
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </motion.button>
            </>
          )}

          <motion.button
            type="button"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
