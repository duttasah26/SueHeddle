import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-XSS-Protection",          value: "1; mode=block" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js needs unsafe-inline; dev mode also needs unsafe-eval for stack reconstruction.
      // maps.googleapis.com loads the Maps JavaScript SDK for the Events section's venue map.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} js.stripe.com maps.googleapis.com`,
      // Google Fonts + inline styles (used extensively for pink spans) + Maps SDK's own injected styles
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      // Google Fonts glyphs + Material Symbols
      "font-src 'self' fonts.gstatic.com",
      // Stripe payment iframe + fraud detection, Google Maps fallback embed on
      // the Events section, YouTube embed in the video section
      "frame-src js.stripe.com www.google.com www.youtube-nocookie.com www.youtube.com",
      // Stripe API calls (incl. telemetry) + Maps SDK's own XHR calls for tiles/places data
      "connect-src 'self' api.stripe.com api.resend.com *.stripe.com *.stripe.network *.googleapis.com",
      // Local images + Cloudinary + Maps tile/marker imagery.
      // i.ytimg.com serves the video poster frame for the click-to-play
      // facade in VideoSection — without it the facade renders black.
      "img-src 'self' data: blob: res.cloudinary.com *.googleapis.com *.gstatic.com i.ytimg.com",
      // Cloudinary video streaming
      "media-src 'self' res.cloudinary.com",
      // Block plugins entirely
      "object-src 'none'",
      // Prevent base tag hijacking
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    // ── SERVE IMAGES FROM CLOUDINARY, NOT VERCEL ──────────────────────────
    // Vercel bills "Image Cache Writes" per unique (image x width x quality x
    // format) variant, and rewrites each one whenever it falls out of the
    // durable cache (minimumCacheTTL defaults to 4h in Next 16). That blew
    // past the 100,000 included writes. A custom loader hands resizing and
    // format negotiation to Cloudinary's CDN instead, taking that meter to 0.
    //
    // TO ENABLE — only after `node scripts/upload-to-cloudinary.mjs` has run
    // and src/lib/cloudinary-manifest.json has 64 entries. Uncomment these:
    //
    //   loader: "custom",
    //   loaderFile: "./src/lib/cloudinaryLoader.ts",
    //
    // The loader falls back to serving straight from /public for any image
    // missing from the manifest, so a partial upload degrades to unoptimized
    // rather than 404ing.

    // formats/qualities are ignored once the custom loader is active
    // (Cloudinary's f_auto and q_ handle both), but they still apply while
    // Vercel optimization is in use.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92],

    // Was 4 hours by default, which meant every variant was rewritten ~6x a
    // day forever. 31 days is the value Next's own docs suggest. NOTE: there
    // is no cache-invalidation mechanism, so a replaced image file needs a
    // changed src (the "?v=2" trick already used in HeroSection) to show up.
    minimumCacheTTL: 2678400,

    // Trimmed from Next's defaults (8 + 8 = 16 widths) to the widths this
    // layout actually requests — fewer srcset entries, fewer variants.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],

    localPatterns: [
      { pathname: "/images/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
