import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { nav, products, services, site } from "@/lib/site";

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-5.4-7.06L3.9 22H.64l8.02-9.17L.5 2h7.08l4.88 6.45L18.244 2Zm-1.21 18h1.8L7.04 3.9H5.1L17.034 20Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />

      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" id="footer" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              {site.tagline}. Payments technology, switching expertise and 24×7×365 support for banks and
              financial institutions.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="glass-dark inline-flex size-10 items-center justify-center rounded-full text-white/80 transition hover:text-white hover:bg-white/15"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X (formerly Twitter)"
                className="glass-dark inline-flex size-10 items-center justify-center rounded-full text-white/80 transition hover:text-white hover:bg-white/15"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Company</h3>
              <ul className="mt-5 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-[0.95rem] text-white/75 transition hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Expertise</h3>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="text-[0.95rem] text-white/75 transition hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products#${p.slug}`} className="text-[0.95rem] text-white/75 transition hover:text-white">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</h3>
              <ul className="mt-5 space-y-4 text-[0.95rem] text-white/75">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>
                    {site.address.line1}, {site.address.line2}, {site.address.line3}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <a href={site.phoneHref} className="transition hover:text-white">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <a href={`mailto:${site.email}`} className="transition hover:text-white">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Designed &amp; developed by{" "}
            <span className="text-white/70">{site.legalName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
