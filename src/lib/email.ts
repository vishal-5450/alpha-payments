import "server-only";
import { Resend } from "resend";
import { site } from "./site";

type Mail = {
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
};

/**
 * Sends an e-mail via Resend when RESEND_API_KEY is configured.
 * Without a key (local development) the message is logged and treated as sent,
 * so forms remain fully testable.
 */
export async function sendMail(mail: Mail): Promise<{ ok: true; mode: "sent" | "logged" }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? `${site.name} Website <onboarding@resend.dev>`;

  if (!key) {
    console.info("[mail:logged]", { to: mail.to, subject: mail.subject, replyTo: mail.replyTo });
    console.info(mail.text);
    return { ok: true, mode: "logged" };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [mail.to],
    subject: mail.subject,
    replyTo: mail.replyTo,
    text: mail.text,
    html: mail.html,
  });
  if (error) throw new Error(error.message);
  return { ok: true, mode: "sent" };
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function renderTable(rows: Array<[string, string | undefined]>) {
  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const html = `
    <table style="font-family:Inter,Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#0a1224;white-space:pre-wrap">${escapeHtml(v ?? "")}</td></tr>`,
        )
        .join("")}
    </table>`;
  return { text, html };
}
