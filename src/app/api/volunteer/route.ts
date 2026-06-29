import { Resend } from "resend";
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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function volunteerHtml(firstName: string): string {
  const safeFirst = esc(firstName);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Volunteer sign-up confirmed — Sue Heddle</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">

        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;text-align:center;">
            <img src="https://sueheddle.ca/images/icons/circle_icon.png" alt="Sue Heddle" height="52"
              style="display:block;margin:0 auto;" />
            <p style="margin:10px 0 0;color:#fff;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">Sue Heddle &middot; Ward 5 Councillor</p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px 32px 36px;">
            <h1 style="margin:0 0 20px;font-size:26px;color:#e70685;font-weight:700;line-height:1.2;">
              ${safeFirst}, we got your sign-up.
            </h1>
            <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.7;">
              Thank you for signing up to volunteer with the <strong>Sue Heddle — Ward 5</strong> team.
              Someone will be in touch shortly with details on next steps and upcoming opportunities.
            </p>
            <p style="margin:0 0 32px;color:#555;font-size:15px;line-height:1.7;">
              Questions in the meantime? Just reply to this email.
            </p>
            <a href="https://sueheddle.ca" style="display:inline-block;background:#e70685;color:#fff;
              padding:13px 28px;font-weight:700;font-size:14px;text-decoration:none;border-radius:2px;letter-spacing:0.03em;">
              Visit sueheddle.ca
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px;background:#f9f9f9;border-top:1px solid #e5e5e5;text-align:center;">
            <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;">
              Sue Heddle for Ward 5 Councillor &middot; Oakville, ON<br />
              <a href="https://sueheddle.ca" style="color:#e70685;text-decoration:none;">sueheddle.ca</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:info@sueheddle.ca" style="color:#aaa;text-decoration:none;">info@sueheddle.ca</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function volunteerText(firstName: string): string {
  return `Hi ${firstName},

Your volunteer sign-up for Sue Heddle — Ward 5 is confirmed.

Someone from the team will be in touch shortly with details on next steps and upcoming opportunities.

Questions? Reply to this email.

— Sue Heddle for Ward 5 Councillor, Oakville
sueheddle.ca`;
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

  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      replyTo: "sueheddle@gmail.com",
      to: email,
      subject: `${firstName}, your volunteer sign-up is confirmed — Sue Heddle`,
      html: volunteerHtml(firstName),
      text: volunteerText(firstName),
    }).catch((err) => console.error("Resend error (volunteer):", err));
  }

  return NextResponse.json({ ok: true });
}
