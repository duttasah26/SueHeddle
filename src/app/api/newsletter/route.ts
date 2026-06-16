import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { appendRow, emailExistsInSheet } from "@/lib/googleSheets";

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

function newsletterHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the list! — Sue Heddle</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">

        <tr>
          <td style="background:#1a1a1a;padding:24px 32px;text-align:center;">
            <img src="https://sueheddle.ca/images/icons/circle_icon.png" alt="Sue Heddle" height="48"
              style="display:block;margin:0 auto;" />
          </td>
        </tr>

        <tr>
          <td style="padding:40px 32px 32px;">
            <h1 style="margin:0 0 16px;font-size:26px;color:#e70685;font-weight:700;">
              You're on the list, ${name}!
            </h1>
            <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">
              Thanks for signing up to receive updates from the <strong>Sue Heddle — Ward 5</strong> campaign.
              We'll keep you in the loop on events, announcements, and ways to get involved.
            </p>
            <p style="margin:0 0 32px;color:#555;font-size:15px;line-height:1.6;">
              Want to do more? Volunteer with us or make a contribution to help build a better Ward 5.
            </p>
            <a href="https://sueheddle.ca/volunteer" style="display:inline-block;background:#e70685;color:#fff;
              padding:14px 28px;font-weight:700;font-size:15px;text-decoration:none;border-radius:2px;margin-right:12px;">
              Volunteer
            </a>
            <a href="https://sueheddle.ca/donate" style="display:inline-block;background:#1a1a1a;color:#fff;
              padding:14px 28px;font-weight:700;font-size:15px;text-decoration:none;border-radius:2px;">
              Donate
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px;background:#f4f4f4;border-top:1px solid #e5e5e5;text-align:center;">
            <p style="margin:0;font-size:12px;color:#aaa;">
              Sue Heddle for Ward 5 Councillor &middot; Oakville, ON<br />
              <a href="https://sueheddle.ca" style="color:#e70685;">sueheddle.ca</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
  const name   = typeof b.name   === "string" ? b.name.trim().slice(0, 100)  : "";
  const email  = typeof b.email  === "string" ? b.email.trim().slice(0, 100) : "";
  const postal = typeof b.postal === "string" ? b.postal.trim().slice(0, 10) : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  // Silently succeed if already subscribed — no duplicate rows
  try {
    const exists = await emailExistsInSheet("Newsletter", "C", email);
    if (exists) return NextResponse.json({ ok: true });
  } catch {
    // If the check fails, proceed anyway rather than blocking the sign-up
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

  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: "You're on the list — Sue Heddle for Ward 5",
      html: newsletterHtml(name),
    }).catch((err) => console.error("Resend error (newsletter):", err));
  }

  return NextResponse.json({ ok: true });
}
