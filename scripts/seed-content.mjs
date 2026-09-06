import fs from "node:fs";
import pg from "pg";

const env = fs.readFileSync(".env.local", "utf8");
const match = env.match(/^DATABASE_URL=(.+)$/m);
if (!match) throw new Error("DATABASE_URL missing from .env.local");

const connectionString = match[1].trim();
const data = JSON.parse(fs.readFileSync("data/content.json", "utf8"));

// Strip sslmode from the URL so our explicit ssl option is not overridden by pg v8.
const cleanUrl = connectionString.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");
const client = new pg.Client({
  connectionString: cleanUrl,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
await client.query(
  `INSERT INTO site_content (id, data, updated_at)
   VALUES (1, $1::jsonb, now())
   ON CONFLICT (id) DO UPDATE
     SET data = EXCLUDED.data,
         updated_at = now()`,
  [JSON.stringify(data)],
);

const { rows } = await client.query(
  `SELECT id,
          data->'contact'->>'email' AS email,
          jsonb_array_length(data->'careers'->'jobs') AS jobs,
          updated_at
   FROM site_content
   WHERE id = 1`,
);
console.log(JSON.stringify(rows[0], null, 2));
await client.end();
