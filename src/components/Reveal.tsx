import { createElement } from "react";
import type { ElementType, ReactNode } from "react";

type Tag = "div" | "a" | "h1" | "h2" | "h3" | "li" | "p";

/**
 * Structural wrapper: renders `children` inside `as` (default <div>) and
 * forwards `className` plus any extra props (onClick, role, aria-*, …).
 *
 * This used to do a scroll-triggered fade/slide reveal via Framer Motion.
 * That was removed — sections now just appear. The animation-related props
 * (`delay`, `duration`, `amount`, `slide`) are still accepted so existing
 * call sites don't need to change; they're simply ignored.
 */
export default function Reveal({
  children,
  className,
  as = "div",
  // accepted-and-ignored (kept for call-site compatibility)
  delay: _delay,
  duration: _duration,
  amount: _amount,
  slide: _slide,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  duration?: number;
  amount?: number;
  slide?: boolean;
  [key: string]: unknown;
}) {
  const Tag: ElementType = as;
  return createElement(Tag, { className, ...rest }, children);
}
