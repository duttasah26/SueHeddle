#!/usr/bin/env node
/**
 * Uploads everything under public/images to Cloudinary and writes a manifest
 * mapping the local `src` strings used in components to Cloudinary public IDs.
 *
 * The manifest is the single source of truth: src/lib/cloudinaryLoader.ts reads
 * it rather than re-deriving IDs, so the two can never drift apart.
 *
 *   node scripts/upload-to-cloudinary.mjs           # upload what's missing
 *   node scripts/upload-to-cloudinary.mjs --force   # re-upload everything
 *   node scripts/upload-to-cloudinary.mjs --dry-run # show the plan only
 *
 * Needs these in .env.local (get them from the Cloudinary dashboard):
 *   CLOUDINARY_CLOUD_NAME=aurx0hy5
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "lib", "cloudinary-manifest.json");

// Everything lands under this Cloudinary folder so the campaign's assets stay
// separate from the two videos already uploaded by hand.
const FOLDER = "sue-heddle";

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const DRY_RUN = args.has("--dry-run");

/** Minimal .env.local reader — avoids adding a dotenv dependency. */
async function loadEnv() {
  try {
    const raw = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = v;
    }
  } catch {
    /* no .env.local — rely on the real environment */
  }
}

/**
 * Local path -> Cloudinary public ID.
 * Cloudinary allows a lot in a public_id, but spaces and parens have to be
 * URL-encoded at request time, which is a needless source of bugs. Normalising
 * to lowercase-and-hyphens keeps generated URLs clean.
 *   "award/award (1).jpg"  ->  "sue-heddle/award/award-1"
 */
function toPublicId(relPath) {
  const noExt = relPath.replace(/\.[^./\\]+$/, "");
  return [FOLDER, ...noExt.split(/[/\\]/)]
    .join("/")
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, "-")
    .split("/")
    .map((seg) => seg.replace(/^-+|-+$/g, ""))
    .filter(Boolean)
    .join("/");
}

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full, base)));
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(path.relative(base, full));
    }
  }
  return out;
}

async function main() {
  await loadEnv();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // --dry-run only prints the planned ID mapping, so it needs no credentials.
  if (!DRY_RUN && (!cloudName || !apiKey || !apiSecret)) {
    console.error(
      "Missing Cloudinary credentials. Add these to .env.local:\n" +
        "  CLOUDINARY_CLOUD_NAME=aurx0hy5\n" +
        "  CLOUDINARY_API_KEY=...\n" +
        "  CLOUDINARY_API_SECRET=...\n\n" +
        "Find them at https://console.cloudinary.com/settings/api-keys"
    );
    process.exit(1);
  }

  const files = (await walk(IMAGES_DIR)).sort();
  console.log(`Found ${files.length} images under public/images\n`);

  // Report total bytes up front — Cloudinary's free tier shares one credit pool
  // across storage, bandwidth and transformations, so size matters.
  let totalBytes = 0;
  for (const rel of files) totalBytes += (await stat(path.join(IMAGES_DIR, rel))).size;
  console.log(`Total source size: ${(totalBytes / 1048576).toFixed(1)} MB\n`);

  if (DRY_RUN) {
    for (const rel of files) {
      console.log(`  ${rel.replace(/\\/g, "/")}\n    -> ${toPublicId(rel)}`);
    }
    console.log("\n(dry run — nothing uploaded)");
    return;
  }

  const { v2: cloudinary } = await import("cloudinary");
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });

  const manifest = {};
  let uploaded = 0;
  let failed = 0;

  for (const rel of files) {
    const posix = rel.replace(/\\/g, "/");
    const srcKey = `/images/${posix}`;
    const publicId = toPublicId(rel);

    try {
      await cloudinary.uploader.upload(path.join(IMAGES_DIR, rel), {
        public_id: publicId,
        overwrite: FORCE,
        // Don't let Cloudinary append a random suffix — the manifest and the
        // loader both depend on the ID being exactly what we asked for.
        unique_filename: false,
        use_filename: false,
        resource_type: "image",
      });
      manifest[srcKey] = publicId;
      uploaded++;
      process.stdout.write(`  [${uploaded}/${files.length}] ${posix}\n`);
    } catch (err) {
      failed++;
      console.error(`  FAILED ${posix}: ${err.message}`);
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(`\nUploaded ${uploaded}, failed ${failed}`);
  console.log(`Manifest written: ${path.relative(ROOT, MANIFEST)} (${Object.keys(manifest).length} entries)`);
  if (failed === 0) {
    console.log("\nNext: set images.loader to 'custom' in next.config.ts (see the comment there).");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
