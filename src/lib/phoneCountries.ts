/**
 * Dial codes for the donation form's phone field.
 *
 * Deliberately curated rather than all ~240 countries: contributors to an
 * Ontario municipal campaign are overwhelmingly +1, and a 240-row dropdown is
 * a worse experience than a short one. Canada and the US are pinned first,
 * then the countries matching the site's 13 supported locales, then other
 * communities with a meaningful presence in Oakville.
 *
 * Options render as "CA +1" — ISO code plus dial code — which is
 * language-neutral, so this needs no translation in any of the 13 locales.
 *
 * Several countries share +1 (the North American Numbering Plan). CA and US
 * both appear because people identify with their own country; the resulting
 * E.164 value is identical either way, which is correct.
 */
export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 */
  iso: string;
  /** Dial code without the leading "+" */
  dial: string;
  /** English name — used only for the option's title attribute */
  name: string;
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: "CA", dial: "1", name: "Canada" },
  { iso: "US", dial: "1", name: "United States" },
  // Locale-matched
  { iso: "IN", dial: "91", name: "India" },
  { iso: "PK", dial: "92", name: "Pakistan" },
  { iso: "PH", dial: "63", name: "Philippines" },
  { iso: "CN", dial: "86", name: "China" },
  { iso: "HK", dial: "852", name: "Hong Kong" },
  { iso: "TW", dial: "886", name: "Taiwan" },
  { iso: "KR", dial: "82", name: "South Korea" },
  { iso: "UA", dial: "380", name: "Ukraine" },
  { iso: "RU", dial: "7", name: "Russia" },
  { iso: "FR", dial: "33", name: "France" },
  { iso: "ES", dial: "34", name: "Spain" },
  { iso: "MX", dial: "52", name: "Mexico" },
  { iso: "PT", dial: "351", name: "Portugal" },
  { iso: "BR", dial: "55", name: "Brazil" },
  { iso: "AE", dial: "971", name: "United Arab Emirates" },
  { iso: "SA", dial: "966", name: "Saudi Arabia" },
  { iso: "EG", dial: "20", name: "Egypt" },
  { iso: "LB", dial: "961", name: "Lebanon" },
  // Other communities well represented locally
  { iso: "GB", dial: "44", name: "United Kingdom" },
  { iso: "IE", dial: "353", name: "Ireland" },
  { iso: "AU", dial: "61", name: "Australia" },
  { iso: "NZ", dial: "64", name: "New Zealand" },
  { iso: "DE", dial: "49", name: "Germany" },
  { iso: "IT", dial: "39", name: "Italy" },
  { iso: "PL", dial: "48", name: "Poland" },
  { iso: "NL", dial: "31", name: "Netherlands" },
  { iso: "TR", dial: "90", name: "Turkey" },
  { iso: "IL", dial: "972", name: "Israel" },
  { iso: "IR", dial: "98", name: "Iran" },
  { iso: "VN", dial: "84", name: "Vietnam" },
  { iso: "LK", dial: "94", name: "Sri Lanka" },
  { iso: "BD", dial: "880", name: "Bangladesh" },
  { iso: "JP", dial: "81", name: "Japan" },
  { iso: "NG", dial: "234", name: "Nigeria" },
  { iso: "KE", dial: "254", name: "Kenya" },
  { iso: "ZA", dial: "27", name: "South Africa" },
];

export const DEFAULT_PHONE_ISO = "CA";

/** E.164 caps the whole number at 15 digits including the country code. */
export const E164_MAX_DIGITS = 15;

export function findCountry(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((c) => c.iso === iso) ?? PHONE_COUNTRIES[0];
}

/** Max subscriber digits allowed for a given country, to keep E.164 valid. */
export function maxSubscriberDigits(dial: string): number {
  return E164_MAX_DIGITS - dial.length;
}

/**
 * Pretty-prints North American numbers as the user types — (905) 555-0134.
 * Other countries are left as plain digits: per-country formatting rules are a
 * large surface area for very little gain when +1 dominates.
 */
export function formatSubscriber(digits: string, dial: string): string {
  if (dial !== "1") return digits;
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Is this a plausible number for the selected country?
 * NANP is exactly 10 subscriber digits; elsewhere accept 6..max, which is wide
 * enough not to reject legitimate foreign numbers we can't enumerate rules for.
 * An empty value is valid — the field is optional.
 */
export function isValidSubscriber(digits: string, dial: string): boolean {
  if (digits.length === 0) return true;
  if (dial === "1") return digits.length === 10;
  return digits.length >= 6 && digits.length <= maxSubscriberDigits(dial);
}

/** Digits + dial code as E.164 ("+19055550134"), or "" when no number given. */
export function toE164(digits: string, dial: string): string {
  return digits ? `+${dial}${digits}` : "";
}
