"use client";

import manifest from "./cloudinary-manifest.json";

/**
 * Custom next/image loader that serves images from Cloudinary instead of
 * Vercel's image optimizer.
 *
 * Why: Vercel bills "Image Cache Writes" per unique (image x width x quality x
 * format) variant, and re-writes each one every time it falls out of the
 * durable cache. Delegating to Cloudinary takes that meter to zero — Cloudinary
 * does the resizing and format negotiation on its own CDN.
 *
 * The public IDs come from src/lib/cloudinary-manifest.json, which is generated
 * by scripts/upload-to-cloudinary.mjs. Reading the manifest rather than
 * re-deriving IDs here means the upload and the loader can't disagree about
 * what a file is called.
 */

const CLOUD_NAME = "aurx0hy5";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

const ids: Record<string, string> = manifest;

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  // Already absolute, or inline data — nothing for us to rewrite.
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  // Components cache-bust with query strings (e.g. "?v=2"). Cloudinary keys on
  // the public ID, so strip the query before looking the image up.
  const clean = src.split("?")[0];
  const publicId = ids[clean];

  // Not in the manifest — serve the file straight out of /public rather than
  // pointing at a Cloudinary object that doesn't exist. A newly added image
  // then renders unoptimized instead of 404ing until the upload is re-run.
  if (!publicId) return src;

  const transforms = [
    "f_auto", // per-browser format (AVIF/WebP) — replaces images.formats
    `q_${quality ?? "auto"}`,
    `w_${width}`,
    "c_limit", // never upscale past the source's natural width
  ].join(",");

  return `${BASE}/${transforms}/${publicId}`;
}
