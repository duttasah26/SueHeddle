<p align="center">
  <img src="public/images/icons/circle_icon.png" alt="Sue Heddle" width="120" />
</p>

# Sue Heddle for Ward 5 — Campaign Site

Official campaign website for **Sue Heddle**, candidate for Ward 5 Councillor in Oakville's 2026 municipal election ([sueheddle.ca](https://sueheddle.ca)) — a production Next.js application handling live payments, transactional email, and a fully localized front end across 13 languages.

## Features

- **Donations** — Stripe Elements checkout with an optional processing-fee cover. Webhook-driven, with idempotent event handling: a fast in-memory check plus a durable lookup against the persisted donation ledger, so retried Stripe delivery attempts can never produce a duplicate receipt or double-counted donation.
- **Volunteer / lawn sign / vote pledge** — a single intake form with layered spam protection: a honeypot field plus heuristic name-pattern validation (rejecting bot-generated strings on case-transition entropy) rather than a CAPTCHA.
- **Newsletter** — opt-in signup with a branded confirmation email and one-click unsubscribe, deduplicated against existing subscribers.
- **Multi-language** — English plus 12 fully localized languages (Arabic, Spanish, French, Hindi, Korean, Punjabi, Portuguese, Russian, Tagalog, Ukrainian, Urdu, Chinese), switchable at runtime from the nav. RTL locales (Arabic, Urdu) render right-to-left text correctly without mirroring the page layout. Every language bundle is validated for full key parity against the English source, with automatic fallback to English for any untranslated string.
- **Transactional email** — branded HTML donation receipts and confirmation emails via Resend, alongside Stripe's own native receipt as a redundant delivery path.

## Tech stack

Next.js, TypeScript, Stripe, Framer Motion, GSAP.

See [`DESIGN.md`](./DESIGN.md) and [`COLORS_AND_FONTS.md`](./COLORS_AND_FONTS.md) for the visual design system.
