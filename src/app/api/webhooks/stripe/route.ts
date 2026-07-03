import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { appendRow, paymentIntentProcessed } from "@/lib/googleSheets";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function receiptHtml(
  firstName: string,
  lastName: string,
  amount: number,
  paymentIntentId: string,
): string {
  const receiptNo = paymentIntentId.slice(-8).toUpperCase();
  const dateStr = new Date().toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
  const safeFirst = esc(firstName);
  const safeLast  = esc(lastName);

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

        <tr>
          <td style="background:#1a1a1a;padding:24px 32px;text-align:center;">
            <img src="https://sueheddle.ca/images/icons/circle_icon.png" alt="Sue Heddle" height="48"
              style="display:block;margin:0 auto;" />
            <p style="margin:10px 0 0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#e70685;">
              Vote Sue. Vote New.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px 32px 24px;">
            <h1 style="margin:0 0 8px;font-size:26px;color:#e70685;font-weight:700;">
              Thank you, ${safeFirst}!
            </h1>
            <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
              Your donation to the Sue Heddle — Ward 5 campaign has been received.
              Every contribution helps build a better Ward 5.
            </p>

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

            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#fff5fb;border-left:3px solid #e70685;border-radius:2px;margin-bottom:32px;">
              <tr>
                <td style="padding:14px 16px;">
                  <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">
                    <strong>Oakville residents:</strong> you may be eligible for a
                    <strong>50% municipal campaign contribution rebate</strong> on donations up to $1,200.
                    Keep this email as your official receipt.
                    <a href="https://sueheddle.ca/rebate" style="display:inline-block;margin-top:8px;color:#e70685;font-size:14px;">Learn more about the rebate →</a>
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

        <tr>
          <td style="padding:20px 32px;background:#f4f4f4;border-top:1px solid #e5e5e5;text-align:center;">
            <p style="margin:0 0 10px;font-size:12px;color:#aaa;">Sue Heddle for Ward 5 — Oakville</p>
            <p style="margin:0;font-size:12px;color:#aaa;">
              You received this email because you made a donation to our campaign.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// In-memory guard: fast first-pass within the same process instance
const processedInMem = new Set<string>();

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.json({ error: "Not configured." }, { status: 503 });

  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature." }, { status: 400 });

  let event: Stripe.Event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "payment_intent.succeeded")
    return NextResponse.json({ ok: true });

  const pi = event.data.object as Stripe.PaymentIntent;

  // Fast in-memory check (same process instance)
  if (processedInMem.has(pi.id)) return NextResponse.json({ ok: true });

  // Durable check: query Sheets to guard against cold-start replays and concurrent delivery
  try {
    if (await paymentIntentProcessed(pi.id)) {
      processedInMem.add(pi.id);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    // If the check fails, proceed — a duplicate receipt is better than a missed one
    console.error("Idempotency check failed:", err);
  }

  processedInMem.add(pi.id);

  const m      = pi.metadata ?? {};
  const amount = pi.amount / 100;

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  const firstName = m.firstName || "";
  const lastName  = m.lastName  || "";
  const email     = m.email     || "";

  const sheetsWrites = Promise.allSettled([
    appendRow("Donations", [
      timestamp,
      firstName,
      lastName,
      email,
      `$${amount.toFixed(2)}`,
      pi.id,
      m.oakvilleResident || "NO",
      m.address  || "",
      m.unit     || "",
      m.city     || "",
      m.province || "ON",
      m.postal   || "",
    ]),
    ...(email
      ? [appendRow("Newsletter", [timestamp, `${firstName} ${lastName}`.trim(), email, m.postal || ""])]
      : []
    ),
  ]);

  const emailSend = (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && email)
    ? new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: `Thank you for your donation, ${firstName}!`,
        html: receiptHtml(firstName, lastName, amount, pi.id),
      }).catch((err) => console.error("Resend error:", err))
    : Promise.resolve();

  const [sheetsResults] = await Promise.all([sheetsWrites, emailSend]);
  sheetsResults.forEach((r, i) => {
    if (r.status === "rejected")
      console.error(`Sheets error (${i === 0 ? "Donations" : "Newsletter"}):`, r.reason);
  });

  return NextResponse.json({ ok: true });
}
