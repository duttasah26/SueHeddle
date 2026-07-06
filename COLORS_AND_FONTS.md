# Sue Heddle Campaign Site — Colors & Fonts Reference

Source of truth for these values: `src/styles/tokens.css` (colors) and `src/app/layout.tsx` (fonts). This doc reflects what's actually live on the site, not the original design brief.

---

## Colors

| Role | Hex | CSS variable | Usage |
|---|---|---|---|
| Primary | `#e70685` | `--primary` | Brand fuchsia — CTAs, links, highlights, section backgrounds |
| Dark background | `#1a1c1c` | `--dark-bg` | Full-bleed dark sections (hero, footer, some flow sections) |
| On-surface (text) | `#1c1b1b` | `--on-surface` | Default body text color |
| On-surface variant | `#5a3f48` | `--on-surface-variant` | Muted/secondary text |
| Surface | `#fcf9f8` | `--surface` | Off-white background for light sections/cards |
| Secondary | `#5e5e5e` | `--secondary` | Neutral gray, used sparingly (one usage in the codebase) |

**Third-party brand colors** (used only for social share icons/buttons, not part of the core palette):

| Platform | Hex |
|---|---|
| Facebook | `#1877F2` |
| LinkedIn | `#0A66C2` |
| Instagram (gradient) | `#e1306c` → `#d6249f` → `#fdf497` |
| Gmail (email icon) | `#EA4335` |
| WhatsApp / WeChat | `#25D366` / `#07C160` |

**Utility colors** used for form states: success `#4ade80`, error `#f87171` / `#c0392b`.

---

## Fonts

All fonts except Material Symbols are loaded via `next/font/google`, which self-hosts them at build time (no runtime request to Google Fonts) — but the canonical Google Fonts pages are linked below for designers who want to browse specimens, weights, and license info.

### Lexend — primary typeface
Used for **everything**: display headlines, body copy, buttons, labels. This is a deliberate choice — the whole site reads in one voice rather than pairing a display face with a separate body face.
- Specimen: https://fonts.google.com/specimen/Lexend
- Weights loaded: 400, 500, 600, 700, 800
- CSS variable: `--font-display`

### JetBrains Mono — data/numeric accent
Used for receipt numbers, dates, timestamps, and other numeric/technical displays — gives a precise, technical contrast against the bold display type.
- Specimen: https://fonts.google.com/specimen/JetBrains+Mono
- Weights loaded: 500, 700
- CSS variable: `--font-mono`

### Noto Sans — i18n fallback
Not visually part of the brand identity — loaded as a fallback so the multi-language version of the site (i18n system covers EN/FR/ZH/PA/AR/FA) can render scripts Lexend doesn't support.
- Specimen: https://fonts.google.com/noto/specimen/Noto+Sans
- Weights loaded: 400, 500, 600, 700
- CSS variable: `--font-noto`

### Material Symbols Outlined — icon font
Used for all inline UI icons (mail, share, menu, arrows, etc.) throughout the site.
- Specimen/browser: https://fonts.google.com/icons
- Loaded directly via stylesheet link (not `next/font`): `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0&display=block`
- Style: Outlined, filled (`FILL 1`), weight 400, optical size 48

---

## Notes for designers

- The original design brief called for a Manrope body font and a "Deep Purple" secondary color — **neither made it into the live implementation**. Lexend covers body text too, and purple isn't used anywhere on the site today. Design new material against the palette/fonts above, not the original brief.
- Buttons and interactive elements use **hard-edged offset shadows** (e.g. `6px 6px 0 #000`, zero blur) rather than soft drop shadows — keep this flat, graphic quality if designing new components.
