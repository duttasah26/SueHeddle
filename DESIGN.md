---
name: Vanguard Pop
colors:
  primary: '#e70685'
  dark-bg: '#1a1c1c'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5a3f48'
  surface: '#fcf9f8'
  secondary: '#5e5e5e'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 88px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  mono-data:
    fontFamily: JetBrains Mono
    fontWeight: '500'
    note: Used for receipt numbers, dates, and other numeric/data displays
rounded:
  sm: 2px
  DEFAULT: 8px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1280px
---

> **Note:** This spec has been updated to match the site as actually built (see `src/styles/tokens.css` and `src/app/layout.tsx`). The original Material-3-style token set (surface-container tiers, tertiary/error roles, purple secondary, etc.) was part of the initial AI-generated scaffold but was never carried into implementation — it's been removed here to avoid confusing designers with values the live site doesn't use. See the companion `COLORS_AND_FONTS.md` for a full reference with usage notes and font links.

## Brand & Style

This design system is engineered for high-impact political mobilization. It rejects the traditional "red and blue" establishment aesthetic in favor of a vibrant, energetic "POP" movement. The brand personality is unapologetic, forward-thinking, and urgent, designed to stand out in a saturated digital landscape.

The visual style is **High-Contrast / Bold**, utilizing massive typography and saturated blocks of color to create a sense of scale and momentum. It draws inspiration from modern editorial design and street activism, emphasizing clarity, strength, and an unmistakable presence. The emotional goal is to inspire confidence and collective action through a sharp, contemporary lens.

## Colors

The palette is anchored by **Vibrant Fuchsia** (`#e70685`), used as the primary signal color to demand attention. The originally-planned "Deep Purple" secondary was dropped during implementation and never shipped; the current `secondary` role is a plain neutral gray (`#5e5e5e`), used sparingly.

**Solid Black** (near-black `#1a1c1c`/`#1c1b1b`) is used for maximum contrast against fuchsia backgrounds, ensuring that calls to action and critical messaging are impossible to miss. The background strategy relies on heavy color-blocking—swapping between full-bleed fuchsia sections, near-black sections, and a clean off-white surface (`#fcf9f8`) to maintain high energy without causing visual fatigue.

## Typography

The typography is the core of the identity. **Lexend** is used for every display, headline, and body role site-wide — its geometric clarity and heavy weights provide a modern, athletic feel that suggests "progress," and using it for body copy too (rather than a separate humanist body face) keeps the whole page reading as one dense, confident voice. Headline tracking is tightened to create a dense, powerful "wall of text" effect.

**JetBrains Mono** is used as a secondary accent face specifically for numeric/data displays — receipt numbers, dates, timestamps — giving those details a technical, precise feel that contrasts with the bold display type. **Noto Sans** is loaded as a fallback for the multi-language i18n system, covering scripts Lexend doesn't support. For mobile, headline sizes scale aggressively to ensure messaging remains the primary focal point on smaller screens.

## Layout & Spacing

The design system utilizes a **fluid grid** with high-density margins to create a focused content "corridor." On desktop, a 12-column system is used with generous gutters to allow for large-scale typography to breathe. 

Spacing is governed by an 8px base unit. Vertical rhythm should be exaggerated—use larger-than-standard gaps between sections (120px+) to emphasize the transition between color blocks. On mobile, margins tighten to 20px, and the grid collapses to a single column, prioritizing a vertical stack of high-impact visuals and large-type statements.

## Elevation & Depth

This design system avoids soft, blurred depth markers. Instead, it uses **Bold Borders**, **Tonal Layering**, and **hard-edged offset shadows** (solid color, zero blur — e.g. `6px 6px 0 #000`) to create hierarchy, most visibly on the hero CTAs. 

Depth is achieved through "stark stacking": placing solid black elements directly on top of fuchsia surfaces, reinforced by a flat drop-shadow that reads as a graphic outline rather than a light source. To suggest interactable elements, use high-contrast color shifts (e.g., a fuchsia button turning black on hover) combined with the offset shadow compressing on click. This maintains the "flat, pop" aesthetic while providing clear functional feedback.

## Shapes

The shape language is structured and architectural. A "Soft" roundedness (`0.25rem`) is applied to standard components like inputs and small buttons to keep them approachable, but larger container elements and primary "hero" buttons should remain sharp or utilize very minimal rounding to maintain a serious, decisive edge. 

Avoid circles or organic, fluid shapes; stick to rectangles and hard diagonals to reinforce the theme of "building" and "structure."

## Components

### Buttons
Primary buttons are Solid Black with White or Fuchsia text, using `Lexend Bold`. They feature no shadows and use a sharp 4px corner radius. On hover, they invert to Fuchsia with Black text.

### Inputs
Input fields use a thick 2px black border with a neutral background. Focus states utilize a bright Fuchsia border to guide the user. Labels always sit above the field in `label-bold` Lexend.

### Cards
Cards do not use shadows. They are defined by solid 2px borders or high-contrast background fills (e.g., a Purple card on a Fuchsia section). Content within cards should have aggressive internal padding (32px) to maintain the premium, spacious feel.

### Chips/Badges
Used for status or category tags. These are always Solid Black with White text, using `label-bold` typography, and are entirely rectangular with 0px roundedness to distinguish them from buttons.

### Lists
Lists should be separated by heavy 2px dividers rather than soft lines. Use custom fuchsia arrow icons for list item indicators to drive the eye forward.
