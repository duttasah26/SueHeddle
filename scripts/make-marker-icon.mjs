#!/usr/bin/env node
/**
 * Generates a small marker asset for the Events map.
 *
 * EventMap sets `pin.src` on a Google Maps AdvancedMarkerElement, which is a
 * plain <img> — it never goes through next/image, so the full 1080x1080 /
 * 379KB source was downloading to render a 48px dot. Lighthouse flagged it as
 * 369 KiB of pure waste, the single largest first-party item on the page.
 *
 * EventMap scales the icon between 22px and 72px by zoom level, so 160px
 * covers the largest size at 2x DPR with room to spare.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";

const SRC = "public/images/icons/circle_icon.png";
const OUT = "public/images/icons/circle_icon_marker.png";
const SIZE = 160;

const before = (await stat(SRC)).size;

await sharp(SRC)
  .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
  .toFile(OUT);

const after = (await stat(OUT)).size;

console.log(`${SRC}\n  1080x1080  ${(before / 1024).toFixed(1)} KB`);
console.log(`${OUT}\n  ${SIZE}x${SIZE}    ${(after / 1024).toFixed(1)} KB`);
console.log(`\nSaved ${((before - after) / 1024).toFixed(1)} KB (${(100 - (after / before) * 100).toFixed(1)}% smaller)`);
