"use client";

import { useEffect } from "react";

const HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0&display=swap";

/**
 * Loads the Material Symbols icon stylesheet after mount instead of via a
 * blocking <link rel="stylesheet"> in <head>. That link was on the critical
 * render path (~750ms round-trip to fonts.googleapis.com, mostly latency
 * since the file itself is ~1KB) even though none of the above-the-fold
 * content (hero section) uses an icon — every icon on the page is below
 * the fold or inside interactive UI, so a brief pop-in after hydration is
 * an easy trade for not blocking first paint.
 */
export default function FontLoader() {
  useEffect(() => {
    if (document.querySelector(`link[href="${HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}
