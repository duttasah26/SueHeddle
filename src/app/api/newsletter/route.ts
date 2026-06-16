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
  const name   = typeof b.name   === "string" ? b.name.trim().slice(0, 100)  : "";
  const email  = typeof b.email  === "string" ? b.email.trim().slice(0, 100) : "";
  const postal = typeof b.postal === "string" ? b.postal.trim().slice(0, 10) : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
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
    await appendRow("Newsletter", [timestamp, name, email, postal]);
  } catch (err) {
    console.error("Sheets error (newsletter):", err);
    return NextResponse.json(
      { error: "Sign-up could not be saved. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
