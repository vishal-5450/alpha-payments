/**
 * Sends one test e-mail using the SMTP settings in .env.local (or the environment).
 *
 *   npm run mail:test
 *   npm run mail:test -- someone@example.com     (override recipient)
 */
import { readFileSync, existsSync } from "node:fs";
import nodemailer from "nodemailer";

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

const { SMTP_USER, SMTP_PASS, SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465", MAIL_FROM, MAIL_TO } = process.env;
const to = process.argv[2] || MAIL_TO;

if (!SMTP_USER || !SMTP_PASS) {
  console.error("SMTP_USER / SMTP_PASS are not set. Add them to .env.local first.");
  process.exit(1);
}
if (!to) {
  console.error("No recipient. Set MAIL_TO in .env.local or pass an address: npm run mail:test -- you@example.com");
  process.exit(1);
}

const port = Number(SMTP_PORT);
const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });

console.log(`Connecting to ${SMTP_HOST}:${port} as ${SMTP_USER} …`);
await transporter.verify();
console.log("SMTP login OK. Sending test message …");

const info = await transporter.sendMail({
  from: MAIL_FROM || SMTP_USER,
  to,
  subject: "[Alpha Payments website] SMTP test",
  text: `This is a test message from the Alpha Payments website mailer.\n\nSent ${new Date().toISOString()} via ${SMTP_HOST} as ${SMTP_USER}.`,
});
console.log(`Sent to ${to}. Message id: ${info.messageId}`);
if (info.accepted?.length) console.log("Accepted:", info.accepted.join(", "));
