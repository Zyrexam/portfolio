import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_SENDS = 5;
const sendCounts = new Map<string, { count: number; resetAt: number }>();

// Best-effort per-instance protection; use a shared store if this endpoint needs a global limit.
function takeSendSlot(address: string, now = Date.now()) {
  if (sendCounts.size >= 5000) {
    for (const [key, value] of sendCounts) {
      if (value.resetAt <= now) sendCounts.delete(key);
    }
    if (sendCounts.size >= 5000) {
      const oldestKey = sendCounts.keys().next().value;
      if (oldestKey !== undefined) sendCounts.delete(oldestKey);
    }
  }

  const current = sendCounts.get(address);
  if (!current || current.resetAt <= now) {
    sendCounts.set(address, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return 0;
  }

  if (current.count >= RATE_LIMIT_MAX_SENDS) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }

  current.count += 1;
  return 0;
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;

  // Silently accept filled honeypots so automated senders don't learn the trap worked.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().replace(/[\r\n]+/g, " ") : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const address =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown";
  const retryAfter = takeSendSlot(address);
  if (retryAfter > 0) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: "Unable to send your message." }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
