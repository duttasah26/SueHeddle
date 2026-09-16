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
      // Local images + Cloudinary + Maps tile/marker imagery
      "img-src 'self' data: blob: res.cloudinary.com *.googleapis.com *.gstatic.com",
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
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92],
    localPatterns: [
      { pathname: "/images/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
