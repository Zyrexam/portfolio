import { NextRequest, NextResponse } from "next/server";

// POST /api/contact
//
// Sends an email to Mohit via Resend's REST API (plain fetch — no SDK).
// Uses RESEND_API_KEY from the server env.
//
// IMPORTANT: the test sender onboarding@resend.dev can ONLY deliver to the
// account owner's own address. To reach arbitrary recipients, verify a custom
// sending domain in Resend (https://resend.com/domains) and set
// RESEND_FROM_EMAIL to an address on it, e.g.
//   RESEND_FROM_EMAIL="Portfolio <hello@yourdomain.com>"

const TO_EMAIL = process.env.RESEND_TO_EMAIL || "diveme18@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server not configured: RESEND_API_KEY is missing." },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const name =
      typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
    const email =
      typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
    const message =
      typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields: name, email, and message are required." },
        { status: 400 },
      );
    }
    // basic email shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend error:", errText);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}