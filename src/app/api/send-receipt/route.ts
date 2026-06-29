import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

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
const PI_RE    = /^pi_[A-Za-z0-9]{1,60}$/;

function receiptHtml(
  firstName: string,
  lastName: string,
  amount: number,
  paymentIntentId: string,
): string {
  const receiptNo  = paymentIntentId.slice(-8).toUpperCase();
  const dateStr    = new Date().toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
  const safeFirst  = esc(firstName);
  const safeLast   = esc(lastName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Donation Receipt — Sue Heddle</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;text-align:center;">
            <img src="https://sueheddle.ca/images/icons/circle_icon.png" alt="Sue Heddle" height="52"
              style="display:block;margin:0 auto;" />
            <p style="margin:10px 0 0;color:#fff;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">Sue Heddle &middot; Ward 5 Councillor</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 32px 24px;">
            <h1 style="margin:0 0 8px;font-size:26px;color:#e70685;font-weight:700;">
              Thank you, ${safeFirst}!
            </h1>
            <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
              Your donation to the Sue Heddle — Ward 5 campaign has been received.
              Every contribution helps build a better Ward 5.
            </p>

            <!-- Receipt table -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#f9f9f9;border:1px solid #e5e5e5;border-radius:4px;margin-bottom:24px;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e5e5e5;">
                  <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.05em;">Donor</span><br />
                  <span style="font-size:15px;color:#1a1a1a;font-weight:600;">${safeFirst} ${safeLast}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e5e5e5;">
                  <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.05em;">Amount</span><br />
                  <span style="font-size:22px;color:#1a1a1a;font-weight:700;">$${amount.toFixed(2)} CAD</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e5e5e5;">
                  <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.05em;">Date</span><br />
                  <span style="font-size:15px;color:#1a1a1a;">${dateStr}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.05em;">Receipt No.</span><br />
                  <span style="font-size:13px;color:#555;font-family:monospace;">${receiptNo}</span>
                </td>
              </tr>
            </table>

            <!-- Rebate callout -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#fff5fb;border-left:3px solid #e70685;border-radius:2px;margin-bottom:32px;">
              <tr>
                <td style="padding:14px 16px;">
                  <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">
                    <strong>Oakville residents:</strong> you may be eligible for a
                    <strong>50% municipal campaign contribution rebate</strong> on donations up to $1,200.
                    Keep this email as your official receipt.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:14px;color:#888;line-height:1.6;">
              Questions? Reply to this email or contact us at
              <a href="mailto:sueheddle@gmail.com" style="color:#e70685;">sueheddle@gmail.com</a>.
            </p>
          </td>
        </tr>

        <!-- Footer -->
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

  const { firstName, lastName, email, amount, paymentIntentId, oakvilleResident,
    address, unit, city, province, postal } =
    body as Record<string, unknown>;

  if (
    typeof firstName !== "string" || !firstName.trim() || firstName.length > 50 ||
    typeof lastName  !== "string" || !lastName.trim()  || lastName.length  > 50
  ) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const numAmount = Number(amount);
  if (!Number.isFinite(numAmount) || numAmount <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }
  if (typeof paymentIntentId !== "string" || !PI_RE.test(paymentIntentId)) {
    return NextResponse.json({ error: "Invalid payment reference." }, { status: 400 });
  }

  // Verify the payment actually succeeded with Stripe before recording anything
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payment service not configured." }, { status: 503 });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId as string);
    if (pi.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not confirmed." }, { status: 400 });
    }
    // Guard against amount tampering (allow 1-cent rounding tolerance)
    if (Math.abs(pi.amount - Math.round(numAmount * 100)) > 1) {
      return NextResponse.json({ error: "Amount mismatch." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Could not verify payment." }, { status: 502 });
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const resident = oakvilleResident === true ? "YES" : "NO";

  // Write to Donations sheet (fire-and-forget, non-blocking)
  const safeStr = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  appendRow("Donations", [
    timestamp,
    (firstName as string).trim(),
    (lastName as string).trim(),
    email,
    `$${numAmount.toFixed(2)}`,
    paymentIntentId,
    resident,
    safeStr(address),
    safeStr(unit),
    safeStr(city),
    safeStr(province) || "ON",
    safeStr(postal),
  ])
    .catch((err) => console.error("Sheets error (Donations):", err));

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json({ ok: true });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const fName = (firstName as string).trim();
  const lName = (lastName as string).trim();
  const receiptNo = (paymentIntentId as string).slice(-8).toUpperCase();

  const plainText = `Hi ${fName},

Your donation of $${numAmount.toFixed(2)} CAD to the Sue Heddle — Ward 5 team has been received.

Donor: ${fName} ${lName}
Amount: $${numAmount.toFixed(2)} CAD
Date: ${new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
Receipt No.: ${receiptNo}

If you are an Oakville resident, you may be eligible for a 50% municipal contribution rebate on donations up to $1,200. Keep this email as your receipt.

Questions? Reply to this email or contact us at info@sueheddle.ca.

— Sue Heddle for Ward 5 Councillor, Oakville
sueheddle.ca`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      replyTo: "sueheddle@gmail.com",
      to: email,
      subject: `Donation receipt — Sue Heddle for Ward 5`,
      html: receiptHtml(fName, lName, numAmount, paymentIntentId as string),
      text: plainText,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Receipt could not be sent." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
