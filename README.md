# Alpha Payments — company website

Next.js 16 (App Router) · Tailwind CSS v4 · Motion · TypeScript.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` runs the production server. `npm run lint` runs ESLint.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for metadata, sitemap and Open Graph. |
| `RESEND_API_KEY` | **Preferred for production (esp. Render free).** Sends form mail over HTTPS via [Resend](https://resend.com). When set, SMTP is ignored. |
| `SMTP_USER`, `SMTP_PASS` | Optional Gmail SMTP fallback (local / paid hosts). Blocked on Render free. |
| `SMTP_HOST`, `SMTP_PORT` | Default `smtp.gmail.com` / `465`. |
| `MAIL_FROM` | From header. With Resend, must be a verified domain sender (or `onboarding@resend.dev` for tests). |
| `MAIL_TO` | Optional recipient override (testing). Leave empty in production so the HR e-mail managed in the console is used. |
| `CONSOLE_USER`, `CONSOLE_PASSWORD` | Credentials for the hidden HR console. Quote the password if it contains `#` or spaces. |
| `CONSOLE_SECRET` | 32+ random characters used to sign the login cookie. `openssl rand -hex 32` |
| `DATABASE_URL` | Postgres pooler URL for editable contact / careers content (IPv4; see `.env.example`). |

Test the mail setup at any time with `npm run mail:test` (optionally `npm run mail:test -- someone@example.com`).
Seed / re-seed console content from `data/content.json` with `npm run db:seed`.

## E-mail flow

Both public forms post to route handlers (`/api/contact`, `/api/careers`), which validate with Zod and send one
notification e-mail via **Resend** (or SMTP fallback) from `MAIL_FROM` to the HR address (`MAIL_TO` override,
otherwise the HR e-mail saved in the console). The visitor's address is set as `Reply-To`, so HR can answer
directly from their inbox.

## HR master console

A hidden, unlinked admin area lives at **`/console`** (`/console/login` to sign in). It is excluded from `robots.txt`,
sent with `X-Robots-Tag: noindex` and protected by `src/proxy.ts` plus per-action session checks.

What HR can manage:

- **Contact info** — general e-mail, HR e-mail (form recipient), phone, office hours, three address lines, Google Maps
  query, LinkedIn / X links. Changes appear immediately in the navigation, footer and Contact page.
- **Jobs** — create, edit, publish/unpublish and delete openings with a full description and requirements list. Published
  roles render on `/careers` with an expandable description and a pre-filled application form.
- **Careers intro text** — the sentence shown above the roles list.

Security: HMAC-SHA256 signed, `httpOnly` cookie scoped to `/console`, 8-hour expiry, constant-time credential
comparison, 5 failed attempts per IP per 15 minutes. Change `CONSOLE_PASSWORD` and `CONSOLE_SECRET` before going live.

Content is stored in Postgres (`site_content` JSONB row) via `DATABASE_URL`. If the row is empty the defaults from
`src/lib/site.ts` are seeded automatically so the site always renders.

## Project layout

```
src/app/(site)        public pages (share Navbar + Footer)
src/app/console       HR console: login, overview, contact info, jobs
src/app/api           form route handlers
src/components        UI, layout, home sections, forms, console forms
src/lib/site.ts       static copy & defaults
src/lib/content.ts    editable content store (Postgres)
src/lib/db.ts         Postgres pool
src/lib/email.ts      Resend (HTTPS) + optional SMTP mailer
src/lib/auth.ts       session signing & rate limiting
src/proxy.ts          console route guard
supabase/migrations   SQL schema for site_content
```

Brand assets: the logo is a vector trace of `public/logo.png` (`src/components/layout/logo-paths.ts`), used for the
navigation lockup, footer, favicon (`src/app/icon.png`), Open Graph image and background watermarks.
