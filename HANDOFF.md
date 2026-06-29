# Sue Heddle Campaign Site — Handoff & Context

> Internal dev reference. Gitignored — never pushed to remote.
> Last updated: 2026-06-08

---

## Project Overview

**Client:** Sue Heddle — Ward 5 Councillor candidate, Oakville 2026 Municipal Election
**Repo:** `C:\Users\SahilDutta\Documents\PROJECTS\SueHeddle\sue-heddle-site`
**Live:** Deployed on Vercel (auto-deploys from `main` branch)
**Contact:** sue@sueheddle.ca

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6, App Router, TypeScript |
| Styling | Plain CSS custom properties — no Tailwind, no CSS Modules |
| Payments | Stripe (stripe@22, @stripe/stripe-js, @stripe/react-stripe-js) |
| Animations | GSAP (@gsap/react) |
| Fonts | Lexend + JetBrains Mono (next/font/google) + Material Symbols Outlined (CDN) |
| i18n | Custom React Context — JSON files per locale, client-side |
| Deployment | Vercel (main branch = production) |

---

## Directory Structure

```
sue-heddle-site/
├── public/
│   ├── fonts/                        # Self-hosted: gill-sans-nova, itc-avant-garde-gothic-pro
│   ├── images/
│   │   ├── icons/
│   │   │   ├── brand.png             # Horizontal wordmark used in nav + donate card
│   │   │   └── circle_icon.png       # Circular icon used in splash/hero
│   │   ├── sue/
│   │   │   ├── hero_shot.png         # Hero section photo (right panel)
│   │   │   ├── award*.jpg            # Award photos (community photo slider)
│   │   │   ├── comm_spirit_*.jpg     # Community event photos (slider)
│   │   │   ├── culture_*.jpg         # Cultural event photos (slider)
│   │   │   └── hockey_*.jpg          # Hockey Cares event photos (slider)
│   │   ├── testimonial/
│   │   │   ├── anita-anand.jpg       # MP Oakville East testimonial photo
│   │   │   ├── hailey_chum.png       # Youth Outreach testimonial photo
│   │   │   └── safetynet.png         # Bill Shields / SafetyNet testimonial photo
│   │   ├── oakville-downtown.jpg
│   │   ├── oakville-lake.jpg
│   │   └── oakville-park.jpg
│   └── videos/
│       └── promo.mp4                 # Used in splash/landing video section
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout: fonts, LanguageProvider, NavBar, SiteFooter
│   │   ├── page.tsx                  # Landing page (LandingContent)
│   │   ├── _home-full.tsx            # Archived full home (pre-splash version)
│   │   ├── _layout-full.tsx          # Archived full layout
│   │   ├── about/page.tsx            # /about — bio + timeline
│   │   ├── donate/page.tsx           # /donate — 3-step donation flow + Stripe
│   │   ├── volunteer/page.tsx        # /volunteer — volunteer sign-up form
│   │   ├── rebate/page.tsx           # /rebate — Ontario rebate explainer
│   │   ├── globals.css               # CSS imports (all stylesheets imported here)
│   │   └── api/
│   │       └── create-payment-intent/
│   │           └── route.ts          # POST — creates Stripe PaymentIntent
│   │
│   ├── components/
│   │   ├── NavBar.tsx                # Sticky nav: logo | lang | nav-links | Join CTA | Donate CTA
│   │   ├── SiteFooter.tsx            # Footer: brand icon + email/phone/share icons
│   │   ├── HeroSection.tsx           # Split layout: pink left panel + hero_shot.png right
│   │   ├── IntroSection.tsx          # "Building Ward 5's Future Together" + commitment list
│   │   ├── LandingContent.tsx        # Assembles all homepage sections
│   │   ├── PlatformSection.tsx       # "The Blueprint" — 4 policy cards
│   │   ├── CommunitySection.tsx      # Auto-scrolling photo slider + community leadership flow
│   │   ├── CommunityBanner.tsx       # Full-bleed quote banner
│   │   ├── TestimonialsSection.tsx   # 3 testimonial cards (Anita Anand, Hailey Chum, Bill Shields)
│   │   ├── GetInvolvedSection.tsx    # Volunteer + sign CTA tiles
│   │   ├── LanguageSwitcher.tsx      # Dropdown: EN/FR/中文/ਪੰਜਾਬੀ/Latina/فارسی/العربية
│   │   ├── MarkerHighlight.tsx       # Animated underline highlight component
│   │   ├── PageTransition.tsx        # Route transition animation
│   │   └── ui/
│   │       ├── popover.tsx
│   │       ├── scroll-arrow.tsx
│   │       └── smooth-scroll.tsx
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx       # useLanguage() hook + t(key) translator + localStorage
│   │
│   ├── i18n/
│   │   ├── config.ts                 # Language registry (code, name, dir)
│   │   ├── en.json                   # SOURCE OF TRUTH — all string keys defined here
│   │   ├── fr.json                   # French (partially filled)
│   │   ├── zh.json                   # Mandarin (partially filled)
│   │   ├── pa.json                   # Punjabi (partially filled)
│   │   ├── la.json                   # Latin (partially filled)
│   │   ├── fa.json                   # Persian/RTL (partially filled)
│   │   └── ar.json                   # Arabic/RTL (partially filled)
│   │
│   ├── styles/
│   │   ├── tokens.css                # CSS custom properties (colors, fonts, spacing)
│   │   ├── nav.css                   # NavBar styles incl. lang switcher
│   │   ├── hero.css                  # Hero section + photo crop
│   │   ├── intro.css                 # Intro section
│   │   ├── landing.css               # Platform, community, testimonials, get-involved
│   │   ├── sections.css              # Shared section patterns
│   │   ├── donate.css                # Full donate page styles
│   │   ├── volunteer.css             # Volunteer page
│   │   ├── about.css                 # About page
│   │   ├── rebate.css                # Rebate page
│   │   ├── footer.css                # Footer
│   │   ├── forms.css                 # Shared form field styles
│   │   ├── splash.css                # Splash/video landing page
│   │   ├── story-scroll.css          # Scroll-driven story section
│   │   ├── popover.css               # Popover component
│   │   └── responsive.css            # All @media breakpoints (≤959px tablet, ≤744px phone)
│   │
│   └── lib/
│       └── utils.ts
```

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
| Step headings (donate) | Lexend | 900 | `clamp(32px, 5vw, 44px)` |
| Nav links | Lexend | 700 | 18px |
| Labels / tags | JetBrains Mono (`--font-mono`) | 700 | 11px uppercase |
| Body | Lexend | 400 | 16px |
| Icons | Material Symbols Outlined | — | varies |

### Key Design Rules

- **No transparent/glass backgrounds** — all section/card backgrounds are solid palette colors
- **Bold, punchy display-font headings** — large clamp() sizes, weight 900
- **4px shadow offset** — `box-shadow: 4px 4px 0 #000` on buttons/cards (neo-brutalist)
- **0px border-radius** — sharp corners throughout (aesthetic choice)
- **Primary accent color** used for: CTA buttons, link hovers, step dots, highlighted text spans

---

## Pages

### `/` — Landing
Sections (in order): HeroSection → IntroSection → PlatformSection → CommunitySection → CommunityBanner → TestimonialsSection → GetInvolvedSection → SiteFooter

### `/donate` — 3-Step Donation Flow
- **Step 1:** Amount selection (preset buttons + custom input), Ontario rebate calculator (50% back on first $1,200, min $100, max $10,000)
- **Step 2:** Donor info (name, email, phone)
- **Step 3:** Payment — Stripe `CardNumberElement` + `CardExpiryElement` + `CardCvcElement` (separate fields, no Link popup), billing address, certification checkbox (required), processing fee opt-in checkbox

**Architecture note:** Uses deferred intent flow — PaymentIntent is created at submit time (not on step mount) so fee opt-in can change the final amount. Uses `confirmCardPayment` (not `confirmPayment`).

### `/volunteer` — Volunteer Sign-Up
Form: name, email, phone, availability checkboxes. Submits to sue@sueheddle.ca (currently using mailto or placeholder — RESEND integration pending).

### `/rebate` — Ontario Rebate Explainer
Static explainer page for the 50% rebate on contributions up to $1,200.

### `/about` — Bio
Sue's biography, timeline, and community leadership history.

---

## Stripe Integration

### Environment Variables (`.env.local` — never committed)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### API Route: `POST /api/create-payment-intent`
- In-memory rate limiter: 5 requests/IP/60s
- Validates amount: $1–$10,000, must be finite
- Creates PaymentIntent in CAD, returns `clientSecret`
- `automatic_payment_methods: { enabled: true }` (Google Pay / Apple Pay auto-activate on HTTPS prod)

### Stripe Fee Calculation
`fee = Math.round((amount * 0.029 + 0.30) * 100) / 100` (2.9% + $0.30 CAD)

### Test Cards
| Scenario | Number |
|---|---|
| Success | 4242 4242 4242 4242 |
| Declined | 4000 0000 0000 0002 |
| Insufficient funds | 4000 0000 0000 9995 |
| 3D Secure | 4000 0025 0000 3155 |
Use any future expiry (e.g. 12/34), any 3-digit CVC, any Canadian postal code (e.g. L6H 4K9).

---

## Navbar

Desktop (left → right):
`[brand logo] [EN ▾] ←space→ [About] [Strategy] [Experience] [Join Us] ←space→ [Join The Campaign] [Donate]`

- Language switcher sits right beside the logo
- "Join The Campaign" → `/volunteer` (pink, same style as Donate)
- "Donate" → `/donate`
- On mobile (≤959px): both CTAs collapse into burger menu; only Donate stays visible in top bar (`margin-left: auto`)

---

## i18n

- `t("key.subkey")` resolves against the active locale JSON
- Falls back to `en.json` if key is empty or missing
- RTL languages (Arabic `ar`, Persian `fa`) set `document.dir = "rtl"` automatically
- Stored in `localStorage` — persists across page loads
- **Only `en.json` is fully populated.** Other locales have structure but empty values — client will fill in.

---

## Testimonials

| Slot | Person | Photo |
|---|---|---|
| t1 | Anita Anand — MP Oakville East | `/images/testimonial/anita-anand.jpg` |
| t2 | Hailey Chum — Youth Outreach Coordinator, Constance Lake First Nation | `/images/testimonial/hailey_chum.png` |
| t3 | Bill Shields — Executive Director, SafetyNet Children's & Youth Charities | `/images/testimonial/safetynet.png` |

---

## Pending / Not Yet Done

| Item | Notes |
|---|---|
| **RESEND email receipts** | Donation receipt email + volunteer confirmation email. Do together since both need email infra. |
| **Webhook → DB** | `payment_intent.succeeded` webhook to write donor records to a database (Supabase recommended). Needed for campaign finance reporting. |
| **Volunteer form submission** | Currently no backend — needs RESEND or a form handler. |
| **Non-English translations** | `fr.json`, `zh.json`, `pa.json`, `la.json`, `fa.json`, `ar.json` all have empty strings. Client fills these in. |
| **Phone number in footer** | `href="tel:+"` is a placeholder — real number not yet provided. |
| **Google Pay / Apple Pay** | Will auto-appear on production HTTPS. Not visible on localhost — this is expected. |

---

## Hero Photo Crop (`src/styles/hero.css`)

```css
.hero-photo img {
  position: absolute;
  left: 0;
  width: 100%;
  height: 143%;      /* 100 / (1 - cropTop - cropBottom) = 100/0.70 */
  top: -14.3%;       /* cropTop / (1 - cropTop - cropBottom) * -1 */
  object-fit: cover;
}
```
Currently crops 10% top + 20% bottom. To adjust: recalculate `height = 100/(1-top%-bot%)` and `top = -topCrop%/(1-top%-bot%)`.

---

## Key Decisions Made

- **CardElement → CardNumberElement + CardExpiryElement + CardCvcElement** — split to avoid Stripe Link "Save my info" popup which can't be suppressed with `PaymentElement` client-side
- **Deferred PaymentIntent** — created at submit time so processing fee checkbox can change the final amount
- **No Stripe Customer objects** — one-time campaign donations don't need saved payment methods; donor records go in own DB later
- **In-memory rate limiter** — best-effort on serverless (resets per cold start); acceptable for a campaign site
- **clip-path removed** — replaced with absolute positioning + overflow:hidden for hero crop (no black areas)
