"use client";

import { useEffect, useRef, useState } from "react";

export default function MarkerHighlight({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`mh-wrap${active ? " mh-active" : ""}`}
      style={{ "--mh-delay": `${delay}ms` } as React.CSSProperties}
    >
      <span className="mh-text">{children}</span>
    </span>
  );
}
