// Real names don't chaotically alternate case (bot-generated tokens like
// "eMnFYRRrkrAWFhakXscpvtC" do) — catches that pattern while still allowing
// any script/language, hyphens, apostrophes, and normal mixed-case names.
export function looksLikeName(v: string): boolean {
  if (!v || v.length > 50) return false;
  const chaoticCaseTransitions = (v.match(/[a-z][A-Z]/g) ?? []).length;
  if (chaoticCaseTransitions >= 2) return false;
  return /^[\p{L}\p{M} .'-]+$/u.test(v);
}

// Honeypot field: real users never see or fill it, bots that auto-fill every
// input do. Treat a non-empty value as spam.
export function isHoneypotTripped(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}
