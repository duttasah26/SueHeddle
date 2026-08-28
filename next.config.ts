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
      // Next.js needs unsafe-inline; dev mode also needs unsafe-eval for stack reconstruction
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} js.stripe.com`,
      // Google Fonts + inline styles (used extensively for pink spans)
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      // Google Fonts glyphs + Material Symbols
      "font-src 'self' fonts.gstatic.com",
      // Stripe payment iframe + fraud detection
      "frame-src js.stripe.com",
      // Stripe API calls from client (including Stripe network telemetry)
      "connect-src 'self' api.stripe.com api.resend.com *.stripe.com *.stripe.network",
      // Local images + Cloudinary
      "img-src 'self' data: blob: res.cloudinary.com",
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
    qualities: [75, 92],
    localPatterns: [
      { pathname: "/images/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
