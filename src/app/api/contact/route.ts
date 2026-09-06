import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { renderEmail, renderTable, resolveRecipient, sendMail } from "@/lib/email";
import { getContent } from "@/lib/content";

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

  const fullName = `${d.firstName} ${d.lastName}`.trim();

  const { text, html } = renderTable([
    ["Name", fullName],
    ["First name", d.firstName],
    ["Last name", d.lastName],
    ["E-mail", d.email],
    ["Company", d.company],
    ["Phone", d.phone],
    ["Topic", d.topic],
    ["Message", d.message],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ]);

  const { contact } = await getContent();

  try {
    const result = await sendMail({
      to: resolveRecipient(contact.hrEmail),
      replyTo: d.email,
      subject: `[Website] ${d.topic} enquiry from ${fullName}`,
      text: `New enquiry from the website contact form\n\n${text}`,
      html: renderEmail("New website enquiry", "Submitted via the Contact page. Reply to this e-mail to respond to the sender.", html),
    });
    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { ok: false, error: `We could not send your message. Please e-mail us directly at ${contact.email}.` },
      { status: 502 },
    );
  }
}
