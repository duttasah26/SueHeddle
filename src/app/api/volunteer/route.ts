import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  ipLog.set(ip, timestamps);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(v: unknown, maxLen = 100): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const firstName = sanitize(b.firstName, 50);
  const lastName  = sanitize(b.lastName,  50);
  const email     = sanitize(b.email,    100);
  const phone     = sanitize(b.phone,     30);
  const address   = sanitize(b.address,  150);
  const unit      = sanitize(b.unit,      20);
  const city      = sanitize(b.city,      80);
  const province  = sanitize(b.province,  50);
  const postal    = sanitize(b.postal,    10);
  const vote      = b.vote      === true ? "TRUE" : "FALSE";
  const sign      = b.sign      === true ? "TRUE" : "FALSE";
  const volunteer = b.volunteer === true ? "TRUE" : "FALSE";

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  try {
    await appendRow("Volunteers", [
      timestamp, firstName, lastName, email, phone,
      address, unit, city, province, postal,
      vote, sign, volunteer,
    ]);
  } catch (err) {
    console.error("Sheets error (volunteer):", err);
    return NextResponse.json(
      { error: "Submission could not be saved. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
