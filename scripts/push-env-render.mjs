/**
 * Push .env.local keys to an existing Render web service.
 *
 * Usage:
 *   set RENDER_API_KEY=rnd_...
 *   set RENDER_SERVICE_ID=srv-...
 *   node scripts/push-env-render.mjs
 *
 * Reads AlphaPayments/.env.local (never commits it) and PUTs env vars via Render API.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.local");
const apiKey = process.env.RENDER_API_KEY;
const serviceId = process.env.RENDER_SERVICE_ID;

if (!apiKey) {
  console.error("Missing RENDER_API_KEY. Create one at https://dashboard.render.com/u/settings#api-keys");
  process.exit(1);
}
if (!serviceId) {
  console.error("Missing RENDER_SERVICE_ID (e.g. srv-xxxx from the service URL).");
  process.exit(1);
}
if (!fs.existsSync(envPath)) {
  console.error("No .env.local found at", envPath);
  process.exit(1);
}

function parseEnv(text) {
  const out = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const local = parseEnv(fs.readFileSync(envPath, "utf8"));

// Never push a localhost public URL to production.
if (!local.NEXT_PUBLIC_SITE_URL || /localhost|127\.0\.0\.1/.test(local.NEXT_PUBLIC_SITE_URL)) {
  if (process.env.RENDER_PUBLIC_URL) {
    local.NEXT_PUBLIC_SITE_URL = process.env.RENDER_PUBLIC_URL.replace(/\/$/, "");
  } else {
    console.warn(
      "Skipping NEXT_PUBLIC_SITE_URL (local is localhost). After deploy, set RENDER_PUBLIC_URL=https://YOUR-SERVICE.onrender.com and re-run, or set it in the Dashboard.",
    );
    delete local.NEXT_PUBLIC_SITE_URL;
  }
}

const keys = [
  "NEXT_PUBLIC_SITE_URL",
  "RESEND_API_KEY",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_HOST",
  "SMTP_PORT",
  "MAIL_FROM",
  "MAIL_TO",
  "CONSOLE_USER",
  "CONSOLE_PASSWORD",
  "CONSOLE_SECRET",
  "DATABASE_URL",
];

const envVars = [
  { key: "NODE_VERSION", value: "20" },
  { key: "NODE_ENV", value: "production" },
  ...keys
    .filter((k) => local[k] !== undefined)
    .map((k) => ({ key: k, value: local[k] })),
];

console.log(`Updating ${envVars.length} env vars on ${serviceId} (values not printed)…`);

const res = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // PUT replaces the full set — include platform defaults carefully by merging first
  body: JSON.stringify(envVars),
});

if (!res.ok) {
  const body = await res.text();
  console.error("Render API error", res.status, body);
  process.exit(1);
}

console.log("Env vars updated. Trigger a deploy from the Render Dashboard if the service does not auto-redeploy.");
