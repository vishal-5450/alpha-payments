import "server-only";
import nodemailer from "nodemailer";
import { site } from "./site";

type Mail = {
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
};

/**
 * Sends e-mail over SMTP (Gmail / Google Workspace by default).
 *
 * Required env:  SMTP_USER, SMTP_PASS   (a Google *App Password*, not the account password)
 * Optional env:  SMTP_HOST (smtp.gmail.com), SMTP_PORT (465), MAIL_FROM, MAIL_TO
 *
 * Gmail only lets the authenticated mailbox — or one of its verified "Send mail as"
 * aliases — appear in From. MAIL_FROM therefore defaults to SMTP_USER.
 *
 * Without SMTP_USER/SMTP_PASS (local development) the message is logged to the
 * server console and reported as sent, so forms stay fully testable.
 */
export async function sendMail(mail: Mail): Promise<{ ok: true; mode: "sent" | "logged" }> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.info("[mail:logged]", { to: mail.to, subject: mail.subject, replyTo: mail.replyTo });
    console.info(mail.text);
    return { ok: true, mode: "logged" };
  }

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const fromAddress = process.env.MAIL_FROM ?? user;
  const from = fromAddress.includes("<") ? fromAddress : `"${site.name} Website" <${fromAddress}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
  return { ok: true, mode: "sent" };
}

/** Recipient for all form notifications. MAIL_TO overrides the console-managed HR address (handy for testing). */
export function resolveRecipient(hrEmail: string) {
  return process.env.MAIL_TO || hrEmail;
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

/** Branded wrapper for notification e-mails. */
export function renderEmail(heading: string, intro: string, tableHtml: string) {
  return `
  <div style="background:#f6f9fd;padding:32px 16px;font-family:Inter,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4ecf7">
      <div style="background:#070c1a;padding:20px 28px;color:#ffffff;font-weight:800;letter-spacing:0.14em;font-size:14px">ALPHA <span style="color:#bcdbff;font-weight:600;letter-spacing:0.3em">PAYMENTS</span></div>
      <div style="padding:28px">
        <h2 style="margin:0 0 6px;color:#0a1224;font-size:20px">${escapeHtml(heading)}</h2>
        <p style="margin:0 0 20px;color:#64748b;font-size:14px">${escapeHtml(intro)}</p>
        ${tableHtml}
      </div>
      <div style="padding:16px 28px;border-top:1px solid #e4ecf7;color:#94a3b8;font-size:12px">Sent automatically by the ${escapeHtml(site.name)} website.</div>
    </div>
  </div>`;
}
