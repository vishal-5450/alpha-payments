import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/validation";
import { renderTable, sendMail } from "@/lib/email";
import { site } from "@/lib/site";

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
    ["Experience", d.experience],
    ["LinkedIn", d.linkedin],
    ["CV link", d.cvLink],
    ["Message", d.message],
  ]);

  try {
    const result = await sendMail({
      to: process.env.HR_TO_EMAIL ?? site.hrEmail,
      replyTo: d.email,
      subject: `[Careers] ${d.role} — ${d.name}`,
      text: `New application from the website\n\n${text}`,
      html: `<h2 style="font-family:Inter,Arial,sans-serif;color:#0a1224">New application</h2>${html}`,
    });
    return NextResponse.json({ ok: true, mode: result.mode });
  } catch (err) {
    console.error("[careers] send failed", err);
    return NextResponse.json({ ok: false, error: `We could not send your application. Please e-mail ${site.hrEmail} directly.` }, { status: 502 });
  }
}
