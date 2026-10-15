#!/usr/bin/env node
/**
 * Trims the bottom off the two PORTRAIT newsletter photos so all three photos
 * in the row render at the same height.
 *
 * Why: the middle photo is landscape (1600x1200) and the outer two are
 * portrait (1200x1600). In an email you cannot crop with CSS - object-fit is
 * unsupported and Outlook ignores overflow:hidden - so the files themselves
 * have to match.
 *
 * The maths (rendered widths measured in a browser at a 1200px email width):
 *   middle:  525px wide x 1200/1600 = 394px tall   <- the target
 *   outer:   308px wide, so they need aspect 394/308
 *            -> 1200 x 1534, i.e. 66px off the bottom of 1600 (4.1%)
 *
 * Crops from the BOTTOM only (keeps the top), so faces stay untouched.
 * The middle photo is left alone.
 *
 * Output: SueHeddle/email-photos/trimmed/ -> upload to Resend, swap the URLs.
 */
import sharp from "sharp";
import https from "node:https";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://resend-attachments.s3.amazonaws.com/n3A0nmxY3St_4nG4JViVHt/";
const OUT = path.resolve("../email-photos/trimmed");

const NEW_HEIGHT = 1534; // from the calculation above

const PORTRAITS = [
  ["1-two-women", "b6925c9f-2d64-4493-ba36-8ffc3cf9cb01"],
  ["3-signing", "0359fecb-cc9e-46d0-bbe0-bbc484145aa3"],
];

const get = (url) =>
  new Promise((res, rej) => {
    https.get(url, (r) => {
      const c = [];
      r.on("data", (d) => c.push(d));
      r.on("end", () => res(Buffer.concat(c)));
    }).on("error", rej);
  });

await mkdir(OUT, { recursive: true });

for (const [name, id] of PORTRAITS) {
  const buf = await get(BASE + id);
  const m = await sharp(buf).metadata();
  const file = path.join(OUT, `${name}.jpg`);
  await sharp(buf)
    // left:0, top:0 -> keep the top of the frame, drop the bottom strip
    .extract({ left: 0, top: 0, width: m.width, height: NEW_HEIGHT })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(file);
  const out = await sharp(file).metadata();
  console.log(`  ${name}.jpg  ${m.width}x${m.height} -> ${out.width}x${out.height}  (-${m.height - out.height}px off the bottom)`);
}

console.log(`\nWrote to ${OUT}`);
