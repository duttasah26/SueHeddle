# Sue Heddle Campaign Site — Handoff & Context

> Internal dev reference.
> **This file IS tracked by git and pushed to the remote** (an earlier version
> of this note claimed it was gitignored — it never was; `git check-ignore`
> returns nothing). Do not put secrets, keys or live tokens in here.
> Last updated: 2026-09-19

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
| Fonts | Lexend + JetBrains Mono + Noto Sans (`next/font/google`) + Material Symbols Outlined (inline `<head>` loader script in `layout.tsx` — see Material Symbols section) |
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
│   │   ├── cloudinaryLoader.ts       # next/image custom loader — INERT until enabled in next.config.ts
│   │   ├── cloudinary-manifest.json  # Generated by scripts/upload-to-cloudinary.mjs; currently {}
│   │   └── utils.ts
│   │
│   └── styles/  (imported in this order from globals.css — later wins on cascade ties)
│       tokens.css → nav.css → hero.css → intro.css → events.css → sections.css →
│       footer.css → forms.css → donate.css → volunteer.css → story-scroll.css →
│       about.css → rebate.css → landing.css → popover.css → responsive.css
│
└── scripts/
    ├── upload-to-cloudinary.mjs      # npm run images:upload / images:plan (--dry-run)
    └── make-marker-icon.mjs          # regenerates the 160px map marker from the 1080px source
```

**Note:** `src/components/FontLoader.tsx` was **deleted** — the Material Symbols
loader is now an inline `<head>` script in `layout.tsx`. Older notes referencing
that component are out of date.

`en.json` now has **239 keys**. Parity has since drifted: **8 keys are missing
from all 12 non-English locales** (verified 2026-09-19):

```
donate.etransferImportantEmail      donate.etransferImportantLabel
donate.etransferImportantName       donate.etransferImportantResident
donate.etransferImportantWord       donate.etransferNoteLabel
donate.etransferResidentNote        donate.etransferSendTo
```

All eight are the e-transfer instruction block on `/donate`. Nothing breaks —
`t()` falls back to `en.json` — but non-English donors see that block in
English. Translate when convenient.

---

## Design System — "Vanguard Pop"

### Color Tokens (`src/styles/tokens.css`)

```css
--primary: #db0680           /* hot pink — CTAs, accents, highlights */
--on-surface: #1a1a1a        /* near-black — text, borders, button fills */
--on-surface-variant: #6b6160 /* warm grey — labels, secondary text */
--surface: #e5e2e1           /* warm off-white — input backgrounds, card bg */
--background: #f5f3f2        /* page background */
```

`--primary` was darkened from `#e70685` to `#db0680` for WCAG AA. White text on
the old pink was **4.41:1** — below the 4.5:1 bar for normal-size text, which is
why several rules still carry comments justifying a large font size to clear the
3:1 "large text" bar instead. On `#db0680` it is **4.83:1**, so those size
constraints no longer bind; the comments are stale but harmless. Note the email
template (`../resend.html`) deliberately keeps the original `#e70685`.

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

## `Reveal.tsx` — now a structural wrapper, NOT an animation

**The scroll-reveal animation was removed** (explicit request: "get rid of the
fade animations"). `Reveal` is now a pass-through that renders `children` inside
the `as` tag and forwards `className` plus any extra props.

- `delay`, `duration`, `amount` and `slide` are **still accepted and silently
  ignored**, purely so the dozens of existing call sites didn't need editing.
  Passing them does nothing — don't expect an effect.
- `as="h1" | "h2" | "h3" | "p" | "a" | "li" | "div"` still picks the underlying
  tag, so `Reveal` never injects an extra wrapping `<div>` that would break a
  CSS Grid's direct-child sizing or `:nth-child` rules.
- If you ever reinstate animation here, the original gotcha still applies: a
  Framer Motion element leaves a persistent inline `transform` even at rest,
  which silently overrides a CSS `:hover { transform }` on the same element
  (`.platform-card`, `.testimonial-card`). Animate opacity only on those.

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

- Full nav (logo + language switcher + 4 links + 2 CTAs) only shows **≥1650px**
  (`@media max-width: 1649.98px` switches to burger). The breakpoint was raised
  from 1280px after repeated overlap reports at 1280/1440/1600px.
- **Why 1650 and not something smaller:** the nav was restructured into
  `.nav-left` / `.nav-right` flex wrappers that both grow from a `flex: 1 1 0`
  basis, so they end up equal width and the links land on the true viewport
  centre with no absolute positioning. For the links to be genuinely centred
  *and* not collide, you need at least `links (534px) + 2 × right-side (467px)
  ≈ 1468px`, and longer translated labels (fr/tl) push it higher — hence 1650.
  Raising the breakpoint alone was tried repeatedly before this and could never
  work, because the geometry, not the breakpoint, was the constraint.
- The language switcher sits inside `.nav-left` beside the logo on desktop, and
  moves into the burger menu below the breakpoint.
- The desktop CTA button uses a short, nav-specific `nav.joinCta` key ("Join Team Sue" / "Équipe Sue" / "Team Sue" / etc.) instead of the longer `getInvolved.joinCampaign` string used elsewhere on the page — the longer string was what caused the French/Tagalog overlap. The mobile menu still uses the longer, more descriptive text since it has full-width rows.
- Language switcher moves into the burger menu only, below the breakpoint.

---

## Pending / Not Yet Done

| Item | Notes |
|---|---|
| **Phone number in footer** | `href="tel:+"` is still a placeholder — real number not yet provided. |
| **Google Pay / Apple Pay** | Auto-appears on production HTTPS; not visible on localhost — expected. |
| **`src/i18n/text to fix.json`** | Stray 0-byte file committed in `bad7255`, unreferenced — fine to delete whenever. Note it sits in the locale dir, so anything globbing `src/i18n/*.json` picks it up. |
| **`LandingContent.tsx` / `SiteFooter.tsx` / `_layout-full.tsx` / `_home-full.tsx`** | Dead code, not imported anywhere. `_layout-full.tsx` also carries 2 lint warnings for a font link that never loads. |
| **`api/send-receipt/route.ts`** | Dead **and** actively wrong — writes a misaligned 6-column row to the Donations sheet. Delete. |
| **8 untranslated `donate.etransfer*` keys** | English-only in all 12 non-English locales; falls back gracefully. See i18n section. |
| **`NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`** | Unset, so `EventMap` uses `DEMO_MAP_ID` (development-only). Create a real Map ID in Cloud Console. |
| **Google Maps API key restrictions** | Key is in `.env.local` (gitignored, verified). Restrict it in Cloud Console to `sueheddle.ca/*`, `www.sueheddle.ca/*`, `localhost:3000/*` and to the Maps JavaScript API. |
| **`.platform-icon` renders at 24px not 48px** | Google's Material Symbols stylesheet wins on cascade order. One-line fix. |
| **Lint is red** | ~27 pre-existing errors, mostly `<a href="/">` instead of `<Link>` (12) and unescaped apostrophes (9). `npm run lint` can't gate CI until these are cleared. `next lint` was removed in Next 16 — the script is plain `eslint`. |
| **`s2Heading`/`s3Heading` i18n values** | The pink-accent-word community headings ("Connecting Oakville Through Sport", "Sue Winning National Awards") were split into `Pre`/`Accent`/`Post` fragment keys and translated for all 13 languages — this is done, just noting it here since it was a multi-step fix (was previously hardcoded English only). |

---

## Hero Photo (`src/components/HeroSection.tsx`, `src/styles/hero.css`)

Three photos crossfade every 5s (1.6s ease transition), order:
`hero_shot_3.jpg?v=2` → `award-1.jpg` → `hero_shot_promo.jpg`.

**Only photo 0 is rendered on first paint.** Photos 1 and 2 mount after the
`load` event (`loadRestOfPhotos` state). They previously all carried
`loading="eager"`, so three ~90KB images downloaded simultaneously and starved
the LCP image of mobile bandwidth — Lighthouse measured it as a **500ms LCP
"resource load delay"**, which dropped to **60ms** once they were held back.
`loading="lazy"` does *not* help here: the photos are stacked in the viewport,
so the browser fetches them regardless.

**The rotation interval is gated on `loadRestOfPhotos`, and must stay that way.**
On a throttled phone the load event fired at ~6.6s, after the 5s tick. With an
ungated interval, `photoIndex` advanced to a photo that hadn't mounted, photo 0
faded to opacity 0, and **the hero went blank**.

Each `MotionImage` sets `initial={false}` — without it Framer Motion animates
every non-active photo from its true default (opaque) down to hidden on mount,
causing a fade-out flash on every page load.

`hero.css` also carries a plain-CSS fallback for the crossfade's initial state:

```css
.hero-photo img:first-of-type      { opacity: 1; }
.hero-photo img:not(:first-of-type){ opacity: 0; }
```

This lets the LCP photo paint the instant its bytes arrive instead of waiting on
hydration for Framer Motion to apply opacity inline. Framer Motion takes over
identically once it runs.

The old 143%-height / -14.3%-top crop is **gone** — `.hero-photo img` is now a
plain `height: 100%; top: 0; object-fit: cover`.

---

## Homepage Sections Added After the Hero (2026-09)

Order on `/` is now: `HeroSection` → **`UpcomingEventsSection`** → **`VideoSection`** → `PlatformSection` → …

`IntroSection` ("Building Ward 5's Future Together") was **removed from the page
but the file is deliberately kept** — explicit instruction that it may come back.

### `UpcomingEventsSection.tsx` + `EventMap.tsx`

- Event data is a **hand-maintained `EVENTS` array**, shaped to mirror what the
  Eventbrite API returns so swapping in a live fetch later means replacing the
  constant, not the JSX. No Eventbrite credentials exist yet.
- `lat`/`lng` are hardcoded numbers resolved once via Geocoding, so the map
  doesn't depend on the Geocoding API being enabled for the key.
- `EventMap` uses **Google's official bootstrap loader**, not a hand-rolled
  `<script>` + onload promise. Real Chrome can load its own copy of the Maps JS
  API in the background under a different key, which collides on the shared
  `window.google.maps` namespace and can leave `importLibrary` undefined
  depending on load order. Google's loader guards against exactly that. This
  cost three debugging rounds — don't "simplify" it back.
- Marker is `AdvancedMarkerElement` (`google.maps.Marker` is deprecated), whose
  content is a plain DOM `<img>` — which is also why the zoom-based resizing is
  trivial (just restyle the element).
- **Requires a Map ID.** `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` is unset, so it falls
  back to `DEMO_MAP_ID`, which is development-only. Create a real one in Cloud
  Console (Maps → Map Management → JavaScript/Vector).
- Map init is gated behind an `IntersectionObserver` with **`rootMargin: 150px`**.
  A generous 600px margin matched on first paint and loaded the map eagerly
  anyway (27 requests before any scroll) because the Events section sits
  directly below the hero.

### `VideoSection.tsx` — click-to-play facade

The plain `<iframe>` pulled **848 KiB of YouTube player JS and ~460ms of long
tasks during page load**, even with `loading="lazy"`, because the section sits
just below the hero. That was the main cause of a 2,300ms LCP "element render
delay" on mobile.

Now only a poster frame (`i.ytimg.com/vi/<id>/maxresdefault.jpg`) loads; clicking
swaps in the real iframe with `autoplay=1`. Hover/focus preconnects to
`youtube-nocookie.com` so playback still starts promptly.

- `i.ytimg.com` is in `img-src` in the CSP **and** preconnected in `layout.tsx`.
  `youtube-nocookie.com` is deliberately *not* preconnected — nothing loads from
  it until a click.
- The poster is a plain `<img>`, not `next/image`, on purpose: routing a
  third-party URL through the optimizer would add Vercel image cache writes for
  no benefit (see below).

---

## Material Symbols (`layout.tsx` + `tokens.css`)

Material Symbols is a **ligature font** — the span's actual text content is
`expand_more`, and the font is what turns it into a glyph. That single fact
drives everything here.

- **Loaded by an inline `<head>` script, not a React component.** An earlier
  `FontLoader.tsx` component injected the stylesheet after hydration; on a slow
  device the icons stayed hidden past 15s. That file is deleted.
- **The URL carries `icon_names`,** which makes Google serve a subset:
  **418,636 bytes → 4,752 bytes (99% smaller).** The full font was 56% of the
  entire mobile payload and roughly two seconds of Slow-4G bandwidth competing
  with the HTML, CSS and hero image — it was why FCP sat at 4.5s against a
  187ms critical path.
- **ADDING A NEW ICON REQUIRES ADDING ITS NAME TO `ICON_NAMES` in `layout.tsx`.**
  Otherwise it renders as the literal word. Three icons (`architecture`,
  `commute`, `campaign`) were missed on the first pass because they live in a
  data array (`icon: "..."`), not inline JSX — grep both.
- The stylesheet attaches with `media="print"`, flipped to `"all"` on load, to
  keep it off the critical render path.
- Icons are hidden by `html:not(.icons-ready) .material-symbols-outlined` in
  `tokens.css` until the font is parsed. The placeholder reserves a **1em
  square** (exactly a glyph), so revealing causes **0px layout shift** — the
  much wider word would jump.
- **`document.fonts.load()` is called from the link's `onload`, not immediately.**
  It resolves instantly when no matching `@font-face` exists yet, so calling it
  before the stylesheet lands reports success and reveals the raw word. This was
  the actual cause of a flash that survived two earlier fix attempts.
- The 10s fallback is deliberately generous (3s fired *before* the font arrived
  on a 400kbps link). It exists only so a total font failure can't leave the
  burger menu permanently invisible.
- **Known cosmetic bug:** `.platform-icon` sets `font-size: 48px`, but Google's
  stylesheet defines `.material-symbols-outlined { font-size: 24px }` and is
  injected into `<head>` *after* our CSS, so it wins on cascade order. Platform
  icons render at half their intended size. One-line fix, not yet done.

---

## Image Optimization & Vercel Cache Writes

Vercel bills **"Image Cache Writes"** per unique *image × width × quality ×
format* variant, and rewrites each one whenever it falls out of the durable
cache. This blew past the 100,000 included writes (peaked ~70k in a single day).

Current `next.config.ts` `images` block, and why each value:

| setting | value | reason |
|---|---|---|
| `minimumCacheTTL` | `2678400` (31 days) | Next 16 defaults to **4 hours**, i.e. ~6 rewrites per variant per day, forever |
| `qualities` | `[75, 92]` | `90` was used exactly once and is visually identical to 92 |
| `deviceSizes` | `[640, 828, 1200, 1920]` | was 8 defaults incl. 2048/3840, which this layout never needs |
| `imageSizes` | `[96, 256, 384]` | was 8 defaults |

Effect: variant space **6,144 → 1,792**, worst-case writes/day **~36,864 → ~57**.

**Two traps:**
1. With a 31-day TTL there is **no cache-invalidation mechanism**. Replacing an
   image file will serve the old one for up to a month unless you change the
   `src` — hence the `?v=2` on the hero photo.
2. Adding a `quality` value not present in `qualities` makes Next reject the
   request. If you change one, change the config too.

### Cloudinary escape hatch (built, NOT enabled)

`src/lib/cloudinaryLoader.ts` + `scripts/upload-to-cloudinary.mjs` exist and take
this meter to **zero** by delegating resizing to Cloudinary's CDN. They are inert
until:

1. `CLOUDINARY_CLOUD_NAME=aurx0hy5`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   are added to `.env.local`
2. `npm run images:upload` runs (`npm run images:plan` dry-runs it)
3. `loader: "custom"` / `loaderFile` are uncommented in `next.config.ts`

The loader reads the generated `src/lib/cloudinary-manifest.json` rather than
re-deriving IDs, so upload and lookup can't drift. Unknown images fall back to
`/public`, so a partial upload degrades to unoptimized rather than 404ing.

**Source images are ~153MB**, largest 9.5MB. Recompress before uploading —
Cloudinary's free tier shares one credit pool across storage, bandwidth and
transformations.

### `scripts/make-marker-icon.mjs`

Regenerates `public/images/icons/circle_icon_marker.png` (160px, 7.8KB) from the
1080px source. `EventMap` sets this on a raw `<img>` inside the Maps marker, so
`next/image` never touches it — the full **370KB** original was downloading to
draw a 48px dot. Re-run this if the source art changes.

---

## Donations → Google Sheets Column Layout

The `Donations` sheet is written **positionally** by
`api/webhooks/stripe/route.ts`. Column order matters:

| col | header | source |
|---|---|---|
| A | Timestamp | generated |
| B | First Name | `m.firstName` |
| C | Last Name | `m.lastName` |
| D | Email | `m.email` |
| E | Amount (CAD) | computed |
| F | Payment Intent ID | `pi.id` |
| G | Resident of Oakville | `m.oakvilleResident` |
| H | Address | `m.address` |
| I | *(blank header — is Unit)* | `m.unit` |
| J | City/Town | `m.city` |
| K | Province | `m.province` |
| L | Postal | `m.postal` |
| M | Phone | `m.phone` |

**Phone is appended at M on purpose.** `paymentIntentProcessed()` reads
`Donations!F:F` for duplicate-webhook detection — inserting a column earlier
would break that check *and* misalign every historical row.

The phone input existed in the `/donate` form (with all 13 translations) long
before it was wired up; the value was captured into React state and silently
discarded. The chain is: form → `/api/set-payment-metadata` → Stripe metadata →
webhook → Sheets. All four links must carry the field.

⚠️ **`api/send-receipt/route.ts` is dead code that writes a misaligned 6-column
row** (no address block, no phone). Nothing calls it. Delete it before it gets
wired up by accident.

---

## Performance Baseline (PageSpeed Insights, 2026-09-19)

| | start | end |
|---|---|---|
| Desktop | 75 | **95** |
| Mobile | 53 | **81** |
| Mobile FCP | 9.8s | 4.5s → improved again after the font subset |
| Mobile LCP | 16.6s | 6.5s → improved again after the font subset |
| Mobile TBT | 200ms | **20ms** |
| CLS | 0 | 0 |

**Still open, roughly in value order:**

- **Render-blocking CSS, 16.8 KiB and 71% unused.** The largest remaining item
  and the only one needing a real refactor (split/trim, don't inline).
- `experimental.inlineCss` was **tried and reverted** — measured, it grew the
  blocking HTML response from 14.45 KiB to 55.8 KiB gzipped (the inlined
  `<style>` is 87 KB). Next's own docs say external CSS wins at this size.
- **Legacy JavaScript (13.8 KiB) is NOT fixable via `browserslist`.** Next 16's
  default is already `chrome 111 / safari 16.4`, stricter than anything worth
  setting, and there is no nomodule polyfill chunk — it comes from a dependency.
  Setting a looser browserslist makes it *worse*; this was tried and reverted.
- Hero image compression would save ~11 KiB, but needs a new `qualities` entry,
  which creates more cache-write variants. Probably not worth it.
- **`bttrack.com` appeared in the mobile critical path at 1,593ms and is nowhere
  in this codebase.** It's gone from later traces, but the source was never
  identified. Check Vercel integrations — it's a privacy question too.

---

## Email Deliverability — `sueheddle.ca` DNS

As of 2026-09-19 the domain has **no SPF and no DKIM records at all**, and DMARC
is `v=DMARC1; p=none;`. There are no Resend records on it, meaning campaign mail
is going out under Resend's shared domain rather than `sueheddle.ca`.

To fix: Resend → Domains → Add Domain → paste the DKIM/SPF records it generates,
then send from e.g. `news@sueheddle.ca`. Once a few batches look clean, tighten
DMARC to `p=quarantine` with a `rua=` address — not straight to `p=reject`.

**The inbox sender avatar requires BIMI**, which needs all of the above *plus* a
VMC/CMC certificate (~$1,000–1,500/yr, trademark required for VMC). For a ward
campaign that is almost certainly not worth it; Gmail's coloured letter avatar is
normal for nearly every sender. The DNS records are worth it regardless, for
inbox placement.

The broadcast template lives at `../resend.html` (project root, outside this
repo). Before a real send: enable the plain-text alternative and confirm the
`List-Unsubscribe` One-Click header.

---

## Key Decisions Made

- **CardElement → CardNumberElement + CardExpiryElement + CardCvcElement** — split to avoid the Stripe Link "Save my info" popup, which can't be suppressed client-side with `PaymentElement`.
- **Deferred PaymentIntent** — created at submit time so the processing-fee checkbox can change the final amount.
- **No Stripe Customer objects** — one-time campaign donations don't need saved payment methods.
- **In-memory rate limiter** — best-effort on serverless (resets per cold start); acceptable for a campaign site.
- **`clip-path` removed from hero** — replaced with absolute positioning + `overflow: hidden` (no black areas).
- **Hover = press on shadow buttons** — a deliberate site-wide interaction choice (not per-button); see Design Rules.
- **Nav restructured to equal-basis flex columns, breakpoint 1649.98px** — this
  supersedes the earlier "just move the breakpoint" approach, which was tried
  repeatedly and could not work: centred-and-non-overlapping needs ≥1468px by
  geometry regardless of where the breakpoint sits.
- **Scroll-reveal animations removed entirely** — `Reveal` kept as a
  prop-compatible no-op rather than editing every call site.
- **YouTube embed replaced with a click-to-play facade** — 848 KiB and ~460ms of
  long tasks were loading before anyone pressed play.
- **Material Symbols subset via `icon_names`** — 419 KB → 4.7 KB, chosen over
  replacing ~28 ligature icons with inline SVG. Inline SVG remains the more
  robust end state (no font, no flash, no `ICON_NAMES` list to maintain) if the
  subset ever becomes a maintenance nuisance.
- **`experimental.inlineCss` rejected on measurement** — see Performance section.
- **`browserslist` left at Next's default** — a looser one adds polyfills rather
  than removing them.
- **Image optimization kept on Vercel for now**, with the variant space cut 3.4×
  and the TTL raised; the Cloudinary loader is built and waiting if the cache-write
  meter becomes a problem again.
