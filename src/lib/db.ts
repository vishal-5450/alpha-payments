import "server-only";
import { Pool, type QueryResultRow } from "pg";

/**
 * Shared Postgres pool for server-side code.
 * Requires DATABASE_URL (e.g. Supabase / Render / local Postgres).
 */
let pool: Pool | null = null;

function isLocalHost(connectionString: string) {
  try {
    const host = new URL(connectionString).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return /localhost|127\.0\.0\.1/.test(connectionString);
  }
}

export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add a Postgres connection string to .env.local (see .env.example).",
    );
  }
  if (!pool) {
    const local = isLocalHost(connectionString);
    // Avoid pg treating sslmode=require as verify-full (breaks Supabase TLS in Node).
    const cleanUrl = connectionString
      .replace(/[?&]sslmode=[^&]*/gi, "")
      .replace(/\?&/, "?")
      .replace(/[?&]$/, "");
    pool = new Pool({
      connectionString: cleanUrl,
      ssl: local ? undefined : { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params);
}
