import Link from "next/link";
import { Briefcase, Contact, ExternalLink, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { requireSession } from "@/lib/session";
import { logout } from "../actions";

const links = [
  { href: "/console", label: "Overview", icon: LayoutDashboard },
  { href: "/console/contact", label: "Contact info", icon: Contact },
  { href: "/console/jobs", label: "Jobs", icon: Briefcase },
];

export default async function ConsoleAppLayout({ children }: LayoutProps<"/console">) {
  const session = await requireSession();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-800/8 bg-white/80 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/console" aria-label="Console home">
              <Logo id="console-nav" className="scale-90" />
            </Link>
            <span className="hidden rounded-full bg-ink-800 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white sm:inline-block">
              Console
            </span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-800/70 transition hover:bg-ink-800/5 hover:text-ink-800"
              >
                <l.icon className="size-4" />
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-ink-800/10 px-3.5 py-2 text-sm font-medium text-ink-800/70 transition hover:border-brand-500/50 hover:text-ink-800 sm:inline-flex"
            >
              View site <ExternalLink className="size-3.5" />
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-800 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
                title={`Signed in as ${session.u}`}
              >
                <LogOut className="size-3.5" /> Sign out
              </button>
            </form>
          </div>
        </div>
        <nav className="container-x flex gap-1 overflow-x-auto pb-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-800/5 px-3.5 py-1.5 text-sm font-medium text-ink-800/80">
              <l.icon className="size-4" /> {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="container-x flex-1 py-10">{children}</div>
      <footer className="container-x py-6 text-xs text-ink-800/40">Alpha Payments master console · Changes are live immediately.</footer>
    </>
  );
}
