import Link from "next/link";
import { ArrowUpRight, Briefcase, Contact, Mail, MapPin, Phone } from "lucide-react";
import { getContent } from "@/lib/content";

export default async function ConsoleOverview() {
  const content = await getContent();
  const { contact, careers } = content;
  const active = careers.jobs.filter((j) => j.active).length;
  const smtpReady = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Overview</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Welcome back.</h1>
        <p className="mt-2 max-w-2xl text-ink-800/60">
          Everything you save here is published to the website immediately. Last update:{" "}
          {new Date(content.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card href="/console/contact" icon={Contact} title="Contact & address" cta="Edit contact info">
          <ul className="mt-4 space-y-2 text-sm text-ink-800/75">
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 text-brand-600" /> {contact.email} · HR: {contact.hrEmail}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 text-brand-600" /> {contact.phone}
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 text-brand-600" />
              <span>{[contact.address.line1, contact.address.line2, contact.address.line3].filter(Boolean).join(", ")}</span>
            </li>
          </ul>
        </Card>

        <Card href="/console/jobs" icon={Briefcase} title="Job openings" cta="Manage jobs">
          <div className="mt-4 flex items-end gap-6">
            <div>
              <div className="font-display text-4xl font-bold text-ink-800">{active}</div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-ink-800/50">Published</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-ink-800/40">{careers.jobs.length - active}</div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-ink-800/50">Drafts</div>
            </div>
          </div>
        </Card>
      </div>

      <section className="rounded-3xl border border-ink-800/8 bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-lg font-bold tracking-tight">Form notifications</h2>
        <p className="mt-1 text-sm text-ink-800/55">
          Contact enquiries and job applications are e-mailed to <strong className="text-ink-800">{process.env.MAIL_TO || contact.hrEmail}</strong>
          {process.env.MAIL_TO && <> (override set by the server administrator; the console HR e-mail is {contact.hrEmail})</>}.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
          style={smtpReady ? { borderColor: "#a7f3d0", background: "#ecfdf5", color: "#047857" } : { borderColor: "#fde68a", background: "#fffbeb", color: "#b45309" }}>
          <span className="size-2 rounded-full bg-current" />
          {smtpReady ? `SMTP configured (${process.env.SMTP_USER})` : "SMTP not configured — submissions are only logged on the server"}
        </div>
      </section>
    </div>
  );
}

function Card({ href, icon: Icon, title, cta, children }: { href: string; icon: typeof Contact; title: string; cta: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col rounded-3xl border border-ink-800/8 bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="size-5" />
        </span>
        <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      </div>
      <div className="flex-1">{children}</div>
      <Link href={href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
        {cta} <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
