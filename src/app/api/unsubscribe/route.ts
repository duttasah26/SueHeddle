import { NextRequest, NextResponse } from "next/server";
import { deleteRowsByEmail } from "@/lib/googleSheets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const email      = typeof b.email      === "string" ? b.email.trim().toLowerCase() : "";
  const newsletter = b.newsletter === true;
  const volunteer  = b.volunteer  === true;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!newsletter && !volunteer) {
    return NextResponse.json({ error: "Select at least one list to unsubscribe from." }, { status: 400 });
  }

  const tasks: Promise<void>[] = [];
  if (newsletter) tasks.push(deleteRowsByEmail("Newsletter", "C", email));
  if (volunteer)  tasks.push(deleteRowsByEmail("Volunteers", "C", email));

  await Promise.allSettled(tasks);

  return NextResponse.json({ ok: true });
}
