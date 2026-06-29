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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function newsletterHtml(name: string): string {
  const safeName = esc(name);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the list — Sue Heddle</title>
</head>
<body style="margin:0;padding:0;background:#111;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:32px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#1a1a1a;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:36px 40px 28px;text-align:center;border-bottom:3px solid #e70685;">
            <img src="https://sueheddle.ca/images/icons/circle_icon.png" alt="Sue Heddle" height="64"
              style="display:block;margin:0 auto 14px;" />
            <p style="margin:0;color:#e70685;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Ward 5 Councillor &middot; Oakville, ON &middot; 2026</p>
          </td>
        </tr>

        <!-- Hero band -->
        <tr>
          <td style="background:#e70685;padding:22px 40px;">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">You&rsquo;re on the list</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 36px;">
            <h1 style="margin:0 0 20px;font-size:32px;color:#fff;font-weight:800;line-height:1.15;letter-spacing:-0.01em;">
              Welcome, ${safeName}.
            </h1>
            <p style="margin:0 0 14px;color:#bbb;font-size:15px;line-height:1.75;">
              You&rsquo;ll hear directly from Sue with updates on Ward 5 events, announcements,
              and ways to get involved in the <strong style="color:#fff;">2026 Oakville municipal election.</strong>
            </p>
            <p style="margin:0 0 36px;color:#888;font-size:14px;line-height:1.7;">
              Questions? Just reply to this email &mdash; Sue reads every one.
            </p>

            <!-- CTAs -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="https://sueheddle.ca/donate" style="display:inline-block;background:#e70685;color:#fff;
                    padding:14px 28px;font-weight:800;font-size:14px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase;">
                    Donate
                  </a>
                </td>
                <td>
                  <a href="https://sueheddle.ca" style="display:inline-block;background:transparent;color:#fff;
                    border:2px solid #444;padding:12px 24px;font-weight:700;font-size:14px;text-decoration:none;letter-spacing:0.03em;">
                    Visit sueheddle.ca
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 40px 24px;background:#111;border-top:1px solid #2a2a2a;text-align:center;">

            <!-- Social links -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://www.instagram.com/sueheddle/" style="color:#e70685;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">Instagram</a>
                </td>
                <td style="color:#333;font-size:12px;">&middot;</td>
                <td style="padding:0 8px;">
                  <a href="https://www.linkedin.com/in/sue-heddle-8aa9a910/" style="color:#e70685;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">LinkedIn</a>
                </td>
                <td style="color:#333;font-size:12px;">&middot;</td>
                <td style="padding:0 8px;">
                  <a href="https://www.facebook.com/SueHeddleElwick" style="color:#e70685;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">Facebook</a>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:12px;color:#555;line-height:1.6;">
              Sue Heddle for Ward 5 Councillor &middot; Oakville, ON<br />
              <a href="https://sueheddle.ca" style="color:#e70685;text-decoration:none;">sueheddle.ca</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:info@sueheddle.ca" style="color:#555;text-decoration:none;">info@sueheddle.ca</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function newsletterText(name: string): string {
  return `Hi ${name},

You're confirmed on the Sue Heddle mailing list.

You'll hear directly from Sue with updates on Ward 5 events, announcements, and ways to get involved in the 2026 Oakville municipal election.

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
      replyTo: "sueheddle@gmail.com",
      to: email,
      subject: `${name}, you're on the list — Sue Heddle for Ward 5`,
      html: newsletterHtml(name),
      text: newsletterText(name),
    }).catch((err) => console.error("Resend error (newsletter):", err));

    if (process.env.RESEND_AUDIENCE_ID) {
      resend.contacts.create({
        audienceId: process.env.RESEND_AUDIENCE_ID,
        email,
        firstName: name,
        unsubscribed: false,
      }).catch((err) => console.error("Resend contacts error:", err));
    }
  }

  return NextResponse.json({ ok: true });
}
