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
<body style="margin:0;padding:0;background:#f4f4f4;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="overflow:hidden;">

        <!-- Header: dark bg, large display name -->
        <tr>
          <td style="background:#1a1a1a;padding:48px 40px 40px;text-align:center;">
            <p style="margin:0 0 16px;color:#e70685;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Elect</p>
            <p style="margin:0;color:#fff;font-size:72px;font-weight:900;line-height:0.88;letter-spacing:-0.02em;text-transform:uppercase;">SUE</p>
            <p style="margin:0 0 18px;color:#e70685;font-size:72px;font-weight:900;line-height:0.88;letter-spacing:-0.02em;text-transform:uppercase;">HEDDLE</p>
            <p style="margin:0;color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">For Ward 5 Councillor &middot; Oakville</p>
          </td>
        </tr>

        <!-- Body: white bg, personal message -->
        <tr>
          <td style="background:#fff;padding:40px 40px 36px;">
            <p style="margin:0 0 16px;color:#1a1a1a;font-size:16px;line-height:1.7;">Dear ${safeName},</p>
            <p style="margin:0 0 14px;color:#333;font-size:15px;line-height:1.75;">
              The response to this campaign has been incredible. Ward 5 deserves experienced, dedicated leadership &mdash; and I&rsquo;m grateful to have your support.
            </p>
            <p style="margin:0 0 14px;color:#333;font-size:15px;line-height:1.75;">
              You&rsquo;ll hear from me with updates on events, announcements, and ways to get involved in the <strong>2026 Oakville municipal election.</strong>
            </p>
            <p style="margin:0 0 14px;color:#333;font-size:15px;line-height:1.75;">
              If you&rsquo;d like to get more involved, reply to this email or use the links below.
            </p>
            <p style="margin:0 0 4px;color:#333;font-size:15px;line-height:1.75;">Thanks for your support,</p>
            <p style="margin:0;color:#1a1a1a;font-size:15px;font-weight:700;">Sue Heddle</p>
          </td>
        </tr>

        <!-- CTA section: pink bg, 3 white cards -->
        <tr>
          <td style="background:#e70685;padding:32px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="padding:0 6px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;">
                    <tr>
                      <td style="padding:24px 14px;text-align:center;">
                        <p style="margin:0 0 8px;font-size:15px;font-weight:800;color:#1a1a1a;">Donate</p>
                        <p style="margin:0 0 16px;font-size:12px;color:#666;line-height:1.5;">Support our campaign today.</p>
                        <a href="https://sueheddle.ca/donate" style="display:inline-block;background:#1a1a1a;color:#fff;padding:9px 18px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.03em;">Donate Now</a>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="33%" style="padding:0 6px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;">
                    <tr>
                      <td style="padding:24px 14px;text-align:center;">
                        <p style="margin:0 0 8px;font-size:15px;font-weight:800;color:#1a1a1a;">Volunteer</p>
                        <p style="margin:0 0 16px;font-size:12px;color:#666;line-height:1.5;">Join our team of volunteers.</p>
                        <a href="https://sueheddle.ca/#get-involved" style="display:inline-block;background:#1a1a1a;color:#fff;padding:9px 18px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.03em;">Sign Up</a>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="33%" style="padding:0 6px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;">
                    <tr>
                      <td style="padding:24px 14px;text-align:center;">
                        <p style="margin:0 0 8px;font-size:15px;font-weight:800;color:#1a1a1a;">Share</p>
                        <p style="margin:0 0 16px;font-size:12px;color:#666;line-height:1.5;">Spread the word to friends.</p>
                        <a href="https://sueheddle.ca" style="display:inline-block;background:#1a1a1a;color:#fff;padding:9px 18px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.03em;">Share Now</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer: dark bg -->
        <tr>
          <td style="background:#1a1a1a;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">Sue Heddle for Ward 5 Councillor</p>
            <p style="margin:0 0 16px;font-size:12px;color:#888;">Oakville, Ontario</p>
            <p style="margin:0;font-size:11px;color:#555;line-height:1.7;">
              You received this email because you signed up at
              <a href="https://sueheddle.ca" style="color:#888;text-decoration:none;">sueheddle.ca</a>.<br />
              <a href="mailto:info@sueheddle.ca?subject=Unsubscribe" style="color:#555;text-decoration:none;">Unsubscribe</a>
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

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  // Only write to sheet if not already there — but always send email + create contact
  let alreadyInSheet = false;
  try {
    alreadyInSheet = await emailExistsInSheet("Newsletter", "C", email);
  } catch {
    // check failed — proceed, attempt the write
  }

  if (!alreadyInSheet) {
    try {
      await appendRow("Newsletter", [timestamp, name, email, postal]);
    } catch (err) {
      console.error("Sheets error (newsletter):", err);
      return NextResponse.json(
        { error: "Sign-up could not be saved. Please try again." },
        { status: 502 }
      );
    }
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
