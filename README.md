# Alpha Payments — Website

Marketing website for **Alpha Payments LLP** (alphapay.co.in), built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # ESLint
npm run build      # production build
npm start          # serve the production build
```

## Configuration

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and Open Graph |
| `RESEND_API_KEY` | [Resend](https://resend.com) key for the contact and careers forms. When empty, submissions are logged to the server console and reported as successful (handy for local testing). |
| `MAIL_FROM` | Verified sender address, e.g. `Alpha Payments <website@alphapay.co.in>` |
| `CONTACT_TO_EMAIL` | Recipient for the contact form (default `info@alphapay.co.in`) |
| `HR_TO_EMAIL` | Recipient for the careers form (default `hr@alphapay.co.in`) |

## Editing content

All copy, navigation, stats, services, products, partner tiles, testimonials and open roles live in
[`src/lib/site.ts`](src/lib/site.ts). Items marked *placeholder* in that file should be replaced before go-live:

- `stats` figures
- `trustedBy` / `partnerCategories` names (and add real logos under `public/partners`)
- `testimonials`
- `openRoles`
- Leadership profiles and milestones in [`src/app/about/page.tsx`](src/app/about/page.tsx)

## Structure

```
src/
  app/                 routes (home, services, products, about, partners, careers, contact, api/*)
  components/
    layout/            Navbar, Footer, PageHero, CTASection, Logo
    home/              home page sections (Hero, TransactionFlow, ProductShowcase, ...)
    products/          in-code product UI mocks (Insight, Decipher, API Genie)
    forms/             ContactForm, CareerForm, form fields, submit hook
    ui/                design-system primitives (Button, GlassCard, Reveal, Counter, Marquee, TiltCard, Aurora)
  lib/                 site content, validation schemas, e-mail helper
```

## Deployment

Any Node host that supports Next.js server features works (Vercel, Render, Netlify, a VPS). Set the environment variables above in the host's dashboard. Bind to `0.0.0.0:$PORT` on Render (`next start -p $PORT`).
