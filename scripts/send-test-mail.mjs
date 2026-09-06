/**
 * Sends one test e-mail using Resend (preferred) or SMTP from .env.local.
 *
 *   npm run mail:test
 *   npm run mail:test -- someone@example.com     (override recipient)
 */
import { readFileSync, existsSync } from "node:fs";
import nodemailer from "nodemailer";
import { Resend } from "resend";

for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m || process.env[m[1]]) continue;
    let v = m[2].trim();
    if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
    else v = v.replace(/\s+#.*$/, "");
    process.env[m[1]] = v;
  }
}

const {
  RESEND_API_KEY,
  SMTP_USER,
  SMTP_PASS,
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "465",
  MAIL_FROM,
  MAIL_TO,
} = process.env;
const to = process.argv[2] || MAIL_TO;

if (!to) {
  console.error("No recipient. Set MAIL_TO in .env.local or pass an address: npm run mail:test -- you@example.com");
  process.exit(1);
}

const from = MAIL_FROM || SMTP_USER || "onboarding@resend.dev";
const text = `This is a test message from the Alpha Payments website mailer.\n\nSent ${new Date().toISOString()}.`;

if (RESEND_API_KEY) {
  console.log(`Sending via Resend from ${from} → ${to} …`);
  const resend = new Resend(RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: "[Alpha Payments website] Resend test",
    text,
  });
  if (error) {
    console.error("Resend error:", error);
    process.exit(1);
  }
  console.log(`Sent to ${to}. Id: ${data?.id ?? "(unknown)"}`);
  process.exit(0);
}

if (!SMTP_USER || !SMTP_PASS) {
  console.error("Set RESEND_API_KEY (preferred) or SMTP_USER / SMTP_PASS in .env.local.");
  process.exit(1);
}

const port = Number(SMTP_PORT);
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

console.log(`Connecting to ${SMTP_HOST}:${port} as ${SMTP_USER} …`);
await transporter.verify();
console.log("SMTP login OK. Sending test message …");

const info = await transporter.sendMail({
  from,
  to,
  subject: "[Alpha Payments website] SMTP test",
  text: `${text}\nVia ${SMTP_HOST} as ${SMTP_USER}.`,
});
console.log(`Sent to ${to}. Message id: ${info.messageId}`);
if (info.accepted?.length) console.log("Accepted:", info.accepted.join(", "));
