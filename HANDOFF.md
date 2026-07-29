# Sue Heddle Campaign Site — Handoff & Context

> Internal dev reference. Gitignored — never pushed to remote.
> Last updated: 2026-07-21

---

## Project Overview

**Client:** Sue Heddle — Ward 5 Councillor candidate, Oakville 2026 Municipal Election
**Repo:** `C:\Users\SahilDutta\Documents\PROJECTS\SueHeddle\sue-heddle-site`
**Live:** sueheddle.ca — deployed on Vercel (auto-deploys from `main`)
**Contact:** sueheddle@gmail.com

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6, App Router, TypeScript |
| Styling | Plain CSS custom properties — no Tailwind, no CSS Modules |
| Payments | Stripe (`stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`) |
| Email | Resend (donation receipts, volunteer/newsletter confirmations) |
| Data | Google Sheets via `googleapis` (volunteer + newsletter signups, donor records) |
| Animation | Framer Motion (hero crossfade, lightbox, scroll-reveal). `gsap`/`@gsap/react`/`lenis` are installed but currently unused. |
| Fonts | Lexend + JetBrains Mono + Noto Sans (`next/font/google`) + Material Symbols Outlined (CDN link in `layout.tsx`) |
| i18n | Custom React Context — JSON files per locale, client-side, `localStorage`-persisted |
| Deployment | Vercel (`main` = production) |

---

## Directory Structure

```
sue-heddle-site/
├── public/
│   └── images/, videos/ — see components below for what's referenced where
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout: fonts, LanguageProvider, PageTransition, FooterSection
│   │   ├── page.tsx                  # Homepage — assembles all sections directly (NOT via LandingContent)
│   │   ├── about/page.tsx            # /about — hero, "Why I'm Running", award video, GetInvolvedSection
│   │   ├── donate/page.tsx           # /donate — 3-step donation flow + Stripe
│   │   ├── volunteer/page.tsx        # /volunteer — volunteer sign-up form
│   │   ├── rebate/page.tsx           # /rebate — Ontario rebate explainer
│   │   ├── unsubscribe/page.tsx      # /unsubscribe — newsletter unsubscribe confirmation
│   │   ├── globals.css               # All stylesheet @imports, in cascade order (responsive.css last)
│   │   ├── _home-full.tsx            # Archived, unused
│   │   ├── _layout-full.tsx          # Archived, unused
│   │   └── api/
│   │       ├── create-payment-intent/route.ts
│   │       ├── set-payment-metadata/route.ts
│   │       ├── webhooks/stripe/route.ts     # payment_intent.succeeded → Sheets + Resend receipt
│   │       ├── send-receipt/route.ts
│   │       ├── volunteer/route.ts           # → Google Sheets, honeypot + name-heuristic spam check
│   │       ├── newsletter/route.ts          # → Google Sheets, same spam checks
│   │       └── unsubscribe/route.ts
│   │
│   ├── components/
│   │   ├── NavBar.tsx                # Sticky nav; full nav only ≥1280px, burger below that (see Navbar section)
│   │   ├── FooterSection.tsx         # ACTUAL footer used in layout.tsx
│   │   ├── SiteFooter.tsx            # Dead code — not imported anywhere, do not edit expecting effect
│   │   ├── HeroSection.tsx           # Split hero, crossfading photo panel (award→hero_shot→promo)
│   │   ├── IntroSection.tsx          # "Building Ward 5's Future Together" + Hockey Cares/SafetyNet/SAVIS + commitment list
│   │   ├── LandingContent.tsx        # Dead code — leftover from an earlier splash-page layout, not imported
│   │   ├── PlatformSection.tsx       # Ward 5 Priorities — 3 policy cards, staggered scroll-reveal
│   │   ├── CommunitySection.tsx      # Auto-scrolling photo marquee + 5 "flow" story sections + Gallery/lightbox
│   │   ├── ImageLightbox.tsx         # Full-screen photo/video viewer: arrows, captions, drag-to-dismiss
│   │   ├── Reveal.tsx                # Scroll-triggered fade(+slide) reveal wrapper — see Animation section
│   │   ├── BannerSection.tsx         # Full-bleed quote banner
│   │   ├── TestimonialsSection.tsx   # 3 testimonial cards — quotes always render in English (see i18n)
│   │   ├── GetInvolvedSection.tsx    # Take Action / Connect / Sign-up+Donate rows
│   │   ├── LanguageSwitcher.tsx      # Dropdown — 13 languages, see i18n section
│   │   ├── MarkerHighlight.tsx       # IntersectionObserver-based animated underline
│   │   ├── PageTransition.tsx        # Route transition animation
│   │   ├── LoadingDots.tsx
│   │   └── ui/
│   │       ├── popover.tsx
│   │       ├── scroll-arrow.tsx
│   │       └── smooth-scroll.tsx
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx       # useLanguage() → { t(key), locale, setLocale }; localStorage persisted
│   │
│   ├── i18n/
│   │   ├── config.ts                 # LANGUAGES registry — code/name/dir, English first then alphabetical
│   │   ├── en.json                   # SOURCE OF TRUTH — every key originates here
│   │   ├── ar.json / ur.json         # RTL
│   │   ├── es.json, fr.json, hi.json, ko.json, pa.json, pt.json, ru.json, tl.json, uk.json, zh.json
│   │   └── text to fix.json          # Stray empty file, not referenced anywhere — safe to delete, just hasn't been
│   │
│   ├── lib/
│   │   ├── antiSpam.ts               # looksLikeName() heuristic + isHoneypotTripped()
│   │   ├── googleSheets.ts           # Sheets client + append helpers
│   │   ├── provinces.ts              # Province dropdown data
│   │   └── utils.ts
│   │
│   └── styles/  (imported in this order from globals.css — later wins on cascade ties)
│       tokens.css → nav.css → hero.css → intro.css → sections.css → footer.css →
│       forms.css → donate.css → volunteer.css → story-scroll.css → about.css →
│       rebate.css → landing.css → popover.css → responsive.css
```

All 13 language JSON files are **fully populated** and validated for exact key parity against `en.json` (219 keys, zero missing/orphan across all files).

---

## Design System — "Vanguard Pop"

### Color Tokens (`src/styles/tokens.css`)

```css
--primary: #e70685           /* hot pink — CTAs, accents, highlights */
--on-surface: #1a1a1a        /* near-black — text, borders, button fills */
--on-surface-variant: #6b6160 /* warm grey — labels, secondary text */
--surface: #e5e2e1           /* warm off-white — input backgrounds, card bg */
--background: #f5f3f2        /* page background */
```

### Typography

| Use | Font | Weight | Size |
|---|---|---|---|
| Section headings | Lexend (`--font-display`) | 900 | `clamp(40px, 6vw, 72px)` |
| Labels / tags | JetBrains Mono (`--font-mono`) | 700 | 11px uppercase |
| Body | Lexend | 400 | 16px |
| Non-Latin scripts | Noto Sans (`--font-noto`) fallback in `lang-option` etc. | — | — |
| Icons | Material Symbols Outlined | — | varies |

### Key Design Rules

- **No transparent/glass backgrounds** — all section/card backgrounds are solid palette colors
- **Bold, punchy display-font headings** — large `clamp()` sizes, weight 900
- **Two distinct corner treatments**: CTA/icon buttons are **square** (`border-radius: 0`) with a hard offset `box-shadow`; photo cards/frames use a soft `10px` radius
- **Shadow buttons**: every hard-shadow button (`.nav-cta`, `.hero-btn--*`, `.donate-next-btn`, `.rebate-cta-btn`, `.lightbox-close/-arrow`, `.flow-gallery-video-btn`, etc.) shares one interaction pattern — **`:hover` plays the same press-down transform as `:active`** (translate toward the shadow + shadow shrinks by half), not just a color swap. When adding a new shadow button, follow this pattern rather than a plain color-only `:hover`.
- **Primary accent color** used for: CTA buttons, link hovers, step dots, highlighted text spans

---

## Pages

### `/` — Landing
`HeroSection` → `IntroSection` → `PlatformSection` → `CommunitySection` → `TestimonialsSection` → `BannerSection` → `GetInvolvedSection`, wrapped by `NavBar` (in layout via each page) and `FooterSection` (in root layout).

### `/donate` — 3-Step Donation Flow
- **Step 1:** Amount selection + Ontario rebate calculator (50% back on first $1,200, min $100) + e-transfer banner (sueheddle@gmail.com) + Oakville-residency checkbox
- **Step 2:** Donor info
- **Step 3:** Payment — Stripe split `CardNumberElement`/`CardExpiryElement`/`CardCvcElement` (avoids the Link "save my info" popup)

**Architecture note:** PaymentIntent is created at submit time (not on step mount) so the fee opt-in can change the final amount. Uses `confirmCardPayment`.

### `/volunteer` — Volunteer Sign-Up
Posts to `/api/volunteer` → Google Sheets, guarded by honeypot field + `looksLikeName()` heuristic (`src/lib/antiSpam.ts`).

### `/rebate` — Ontario Rebate Explainer

### `/about` — Bio
Hero heading/subtitle, "Why I'm Running" body + award video, then reuses `GetInvolvedSection`.

### `/unsubscribe`
Confirms newsletter unsubscribe via `/api/unsubscribe`.

---

## Stripe Integration

### Environment Variables (`.env.local` — never committed)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_SHEETS_ID=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
```

### Flow
1. `/api/create-payment-intent` — rate-limited (5 req/IP/60s), validates $1–$10,000, creates PaymentIntent in CAD.
2. `/api/set-payment-metadata` — attaches donor info to the intent before confirmation.
3. Stripe fires `payment_intent.succeeded` → `/api/webhooks/stripe` — **must hit the exact webhook URL configured in the Stripe Dashboard, not a URL that 307-redirects** (apex vs `www` bit us once already; Stripe does not follow redirects). Writes the donor row to Google Sheets and sends the receipt via Resend. Both writes are `await`ed before the handler returns (a prior bug let the serverless function terminate before fire-and-forget writes completed).
4. Idempotency: an in-memory `Set` plus a durable lookup against the existing Sheets rows, so a retried webhook delivery doesn't double-write.

### Stripe Fee Calculation
`fee = Math.round((amount * 0.029 + 0.30) * 100) / 100` (2.9% + $0.30 CAD)

### Test Cards
| Scenario | Number |
|---|---|
| Success | 4242 4242 4242 4242 |
| Declined | 4000 0000 0000 0002 |
| Insufficient funds | 4000 0000 0000 9995 |
| 3D Secure | 4000 0025 0000 3155 |
Any future expiry, any 3-digit CVC, any Canadian postal code (e.g. L6H 4K9).

---

## Google Sheets Integration

`src/lib/googleSheets.ts` wraps a service-account `googleapis` client. Used by the Stripe webhook (donor records), `/api/volunteer`, and `/api/newsletter`. Each row write includes a timestamp — a prior bug omitted it from the row array, which silently shifted every other column left by one; the timestamp is now always the first element.

---

## Anti-Spam

`src/lib/antiSpam.ts`:
- `isHoneypotTripped(value)` — a hidden field (`tabIndex={-1}`, visually hidden, `aria-hidden`) that only bots fill in.
- `looksLikeName(value)` — Unicode-aware heuristic that flags chaotic case-transition patterns (e.g. `qWeRtY`) typical of bot-generated names, without false-positiving on real names in any script.

Used on `/volunteer` and the newsletter signup form.

---

## i18n

- `t("key.subkey")` resolves against the active locale JSON, falling back to `en.json` on missing/empty values.
- 13 languages, all fully populated with exact key parity: `en` (source), `ar`, `es`, `fr`, `hi`, `ko`, `pa`, `pt`, `ru`, `tl`, `uk`, `ur`, `zh`.
- **RTL** (`ar`, `ur`): only `document.documentElement.lang` is set on locale change — deliberately **not** `document.dir`. The site's CSS assumes LTR flex layout throughout; toggling `dir="rtl"` mirrors `flex-direction: row` and breaks the nav/layout. Arabic/Urdu script renders correctly regardless of container `dir` (Unicode bidi algorithm), so this is safe.
- **What stays in English in every locale, deliberately:**
  - Place names (Oakville, Trafalgar, Ward 5, Oak Park, Queens Avenue)
  - Personal names (Sue, Bill Shields, Hailey Chum, Bridget Coughlin, etc.)
  - Testimonial quotes (`TestimonialsSection.tsx` imports `en.json` directly for `quote`/`name`/`role`, bypassing `t()` entirely) — these are direct quotes attributed to real named people and must not be paraphrased into other languages.
- Translating text that already contains an embedded English proper noun requires care per language — naive substring replacement broke Russian/Ukrainian grammatical case endings and Chinese/Korean word spacing at least once each; if you add new strings containing "Oakville" or a name, check the surrounding grammar in non-Latin/inflected languages before shipping.
- `LanguageSwitcher.tsx` renders the dropdown; `config.ts` orders English first, then alphabetically by ISO code.

---

## Image Lightbox / Gallery (`CommunitySection.tsx`, `ImageLightbox.tsx`)

Each "flow" story section's photo grid (and the National Recognition section's embedded video) opens in a shared full-screen `ImageLightbox` on click: centered image/video, blurred+darkened backdrop, arrow navigation **scoped to that section's own photos** (each `Gallery` instance owns its own lightbox state — arrows never cross into another section), bottom caption shown only for images that already have a caption on hover in the grid. Buttons use the same boxy shadow-button treatment as the rest of the site (see Design Rules).

**Gotcha if you touch this again:** `ImageLightbox` uses `position: fixed` for its full-viewport overlay. Never wrap its container in a Framer Motion element (or anything with a CSS `transform`) — a non-`none` transform on an ancestor makes that ancestor the containing block for `position: fixed` descendants, which would shrink the lightbox down to the size of whatever small element it's nested in instead of covering the screen. This is why `Gallery`'s scroll-reveal animation (see below) is applied per-cell, not to the gallery's outer wrapper.

---

## Scroll-Reveal Animations (`Reveal.tsx`)

Framer Motion `whileInView` wrapper, fires once per element. Used across the homepage and about page so sections fade (and by default slide up) into view instead of appearing static — platform/testimonial cards stagger in via an index-based `delay` prop.

- `slide={false}` — use for anything with its own CSS `:hover { transform }` effect (e.g. `.platform-card`, `.testimonial-card` lift on hover). Framer Motion leaves a persistent inline `transform` style after animating in, even at rest, which silently overrides a CSS hover-transform on the same element if both animate `y`/`transform`. `slide={false}` animates opacity only, leaving `transform` free for CSS.
- `as="h1" | "h2" | "h3" | "p" | "a" | "li" | "div"` — picks the underlying tag via Framer Motion's per-element components, so `Reveal` never adds an extra wrapping `<div>` that would break a CSS Grid's direct-child sizing/`:nth-child` rules or change heading semantics. Add more tags to the `TAGS` map in `Reveal.tsx` if a new case needs one.
- Default duration `0.85s`, `ease: [0.16, 1, 0.3, 1]`, triggers at `20%` of the element in view.

---

## Testimonials

| Slot | Person | Photo |
|---|---|---|
| t1 | Bill Shields — SafetyNet | `/images/testimonial/safetynet.png` |
| t2 | Hailey Chum | `/images/testimonial/hailey_chum.png` |
| t3 | Bridget Coughlin | `/images/testimonial/bridget.jpg` |

Always rendered in English regardless of locale — see i18n section.

---

## Navbar

Desktop (left → right):
`[brand logo] [nav-links] [lang switcher] [Join Team Sue] [Donate]`

- Full nav (logo + 4 links + language switcher + 2 CTAs) only shows **≥1280px** (`@media max-width: 1279.98px` switches to burger) — the full set needs real breathing room and was overlapping at narrower "PC-ish" widths (e.g. 960–1279px, and specifically broke on longer translated CTA text in French/Tagalog).
- The desktop CTA button uses a short, nav-specific `nav.joinCta` key ("Join Team Sue" / "Équipe Sue" / "Team Sue" / etc.) instead of the longer `getInvolved.joinCampaign` string used elsewhere on the page — the longer string was what caused the French/Tagalog overlap. The mobile menu still uses the longer, more descriptive text since it has full-width rows.
- Language switcher moves into the burger menu only, below the breakpoint.

---

## Pending / Not Yet Done

| Item | Notes |
|---|---|
| **Phone number in footer** | `href="tel:+"` is still a placeholder — real number not yet provided. |
| **Google Pay / Apple Pay** | Auto-appears on production HTTPS; not visible on localhost — expected. |
| **`src/i18n/text to fix.json`** | Stray empty file, unreferenced anywhere — fine to delete whenever. |
| **`LandingContent.tsx` / `SiteFooter.tsx`** | Dead code from an earlier splash-page layout — not imported anywhere. Safe to delete if confirmed unneeded, otherwise harmless to leave. |
| **`s2Heading`/`s3Heading` i18n values** | The pink-accent-word community headings ("Connecting Oakville Through Sport", "Sue Winning National Awards") were split into `Pre`/`Accent`/`Post` fragment keys and translated for all 13 languages — this is done, just noting it here since it was a multi-step fix (was previously hardcoded English only). |

---

## Hero Photo (`src/components/HeroSection.tsx`, `src/styles/hero.css`)

Three photos crossfade every 5s (1.6s ease transition), order: `award (1).jpg` → `hero_shot.png` → `hero_shot_promo.jpg`. Only the first gets `priority`; the other two use `loading="eager"` (not `priority`) so they don't compete with the LCP image for preload bandwidth but are still fully loaded before their turn in the rotation. Each `MotionImage` sets `initial={false}` — without it, Framer Motion animates every non-active photo from its true default (opaque, `scale: 1`) down to hidden on first mount, causing a visible fade-out flash on every page load.

```css
.hero-photo img {
  position: absolute;
  left: 0;
  width: 100%;
  height: 143%;      /* 100 / (1 - cropTop - cropBottom) = 100/0.70 */
  top: -14.3%;
  object-fit: cover;
}
```
Currently crops 10% top + 20% bottom. To adjust: recalculate `height = 100/(1-top%-bot%)` and `top = -topCrop%/(1-top%-bot%)`.

---

## Key Decisions Made

- **CardElement → CardNumberElement + CardExpiryElement + CardCvcElement** — split to avoid the Stripe Link "Save my info" popup, which can't be suppressed client-side with `PaymentElement`.
- **Deferred PaymentIntent** — created at submit time so the processing-fee checkbox can change the final amount.
- **No Stripe Customer objects** — one-time campaign donations don't need saved payment methods.
- **In-memory rate limiter** — best-effort on serverless (resets per cold start); acceptable for a campaign site.
- **`clip-path` removed from hero** — replaced with absolute positioning + `overflow: hidden` (no black areas).
- **Hover = press on shadow buttons** — a deliberate site-wide interaction choice (not per-button); see Design Rules.
- **Nav breakpoint raised to 1279.98px** — chosen over restructuring the nav to CSS Grid; a grid-based fix was tried and reverted per explicit direction to keep the original flex+absolute nav architecture and just move the breakpoint instead.
