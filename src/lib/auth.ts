/**
 * Session handling for the hidden HR console.
 *
 * A stateless, HMAC-SHA256 signed cookie carries { user, exp }. Web Crypto only, so the same
 * code runs in proxy.ts and in Server Functions. Credentials come from env:
 *   CONSOLE_USER, CONSOLE_PASSWORD, CONSOLE_SECRET
 */

export const SESSION_COOKIE = "ap_console";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

type Payload = { u: string; exp: number };

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function secret() {
  const s = process.env.CONSOLE_SECRET;
  if (!s || s.length < 16) {
    if (process.env.NODE_ENV === "production") throw new Error("CONSOLE_SECRET must be set (16+ characters) in production");
    return "dev-only-insecure-console-secret";
  }
  return s;
}

async function key() {
  return crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSessionToken(user: string): Promise<string> {
  const payload: Payload = { u: user, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = b64url(await crypto.subtle.sign("HMAC", await key(), enc.encode(body)));
  return `${body}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<Payload | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body))) as Payload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Constant-time string comparison over SHA-256 digests (avoids length leaks). */
async function safeEqual(a: string, b: string) {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export async function checkCredentials(user: string, password: string): Promise<boolean> {
  const expectedUser = process.env.CONSOLE_USER;
  const expectedPass = process.env.CONSOLE_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  const [u, p] = await Promise.all([safeEqual(user.trim().toLowerCase(), expectedUser.toLowerCase()), safeEqual(password, expectedPass)]);
  return u && p;
}

/* ------------------------- Login attempt rate limiting ------------------------ */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function tooManyAttempts(ip: string) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) return false;
  return rec.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else rec.count += 1;
}

export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
