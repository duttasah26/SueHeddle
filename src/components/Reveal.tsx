"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const TAGS = { div: motion.div, a: motion.a, h1: motion.h1, h2: motion.h2, h3: motion.h3, li: motion.li, p: motion.p } as const;
type Tag = keyof typeof TAGS;

/**
 * Fades (+ slides up, by default) content in once it scrolls into view.
 * Stack several with increasing `delay` (e.g. `i * 0.12`) to make a group —
 * a card grid, a list — reveal one after another instead of all at once.
 *
 * Pass `slide={false}` for elements that already have their own CSS
 * `:hover { transform }` effect — Framer Motion leaves a persistent inline
 * `transform` style after animating, which would silently override a CSS
 * hover transform on the same element.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.85,
  amount = 0.2,
  slide = true,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  slide?: boolean;
  as?: Tag;
  [key: string]: unknown;
}) {
  const MotionTag: ElementType = TAGS[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={slide ? fadeUp : fadeOnly}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
