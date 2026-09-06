import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/validation";
import { renderEmail, renderTable, resolveRecipient, sendMail } from "@/lib/email";
import { getContent } from "@/lib/content";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = careerSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      if (!fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true });

  const { text, html } = renderTable([
    ["Name", d.name],
    ["E-mail", d.email],
    ["Phone", d.phone],
    ["Role", d.role],
    ["Experience", d.experience ? `${d.experience} years` : undefined],
    ["LinkedIn", d.linkedin],
    ["CV link", d.cvLink],
    ["Message", d.message],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ]);

  const { contact } = await getContent();

  try {
    const result = await sendMail({
      to: resolveRecipient(contact.hrEmail),
      replyTo: d.email,
      subject: `[Careers] ${d.role} — ${d.name}`,
      text: `New application from the website careers form\n\n${text}`,
      html: renderEmail("New job application", "Submitted via the Careers page. Reply to this e-mail to contact the candidate.", html),
    });
    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (err) {
    console.error("[careers] send failed", err);
    return NextResponse.json(
      { ok: false, error: `We could not send your application. Please e-mail ${contact.hrEmail} directly.` },
      { status: 502 },
    );
  }
}
