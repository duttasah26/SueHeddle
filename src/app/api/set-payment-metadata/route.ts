import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const PI_RE = /^pi_[A-Za-z0-9]{1,60}$/;

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY)
    return NextResponse.json({ error: "Not configured." }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid body." }, { status: 400 }); }

  const { paymentIntentId, firstName, lastName, email,
    oakvilleResident, address, unit, city, province, postal } = body;

  if (typeof paymentIntentId !== "string" || !PI_RE.test(paymentIntentId))
    return NextResponse.json({ error: "Invalid payment reference." }, { status: 400 });

  const str = (v: unknown, max = 500) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    await stripe.paymentIntents.update(paymentIntentId as string, {
      metadata: {
        firstName:        str(firstName, 50),
        lastName:         str(lastName,  50),
        email:            str(email,    100),
        oakvilleResident: oakvilleResident === true ? "YES" : "NO",
        address:          str(address,  200),
        unit:             str(unit,      20),
        city:             str(city,      60),
        province:         str(province,  10) || "ON",
        postal:           str(postal,    10).toUpperCase(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not update payment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
