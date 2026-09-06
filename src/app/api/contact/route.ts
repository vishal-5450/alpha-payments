import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { renderTable, sendMail } from "@/lib/email";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      if (!fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const d = parsed.data;
  // Honeypot filled: silently accept, do nothing.
  if (d.website) return NextResponse.json({ ok: true });

  const { text, html } = renderTable([
    ["Name", d.name],
    ["E-mail", d.email],
    ["Company", d.company],
    ["Phone", d.phone],
    ["Topic", d.topic],
    ["Message", d.message],
  ]);

  try {
    const result = await sendMail({
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      replyTo: d.email,
      subject: `[Website] ${d.topic} enquiry from ${d.name}`,
      text: `New enquiry from the website\n\n${text}`,
      html: `<h2 style="font-family:Inter,Arial,sans-serif;color:#0a1224">New website enquiry</h2>${html}`,
    });
    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ ok: false, error: "We could not send your message. Please e-mail us directly." }, { status: 502 });
  }
}
