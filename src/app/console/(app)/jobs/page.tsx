import Link from "next/link";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { CareersIntroForm } from "@/components/console/forms";
import { ConfirmSubmit, Notice } from "@/components/console/ui";
import { getContent } from "@/lib/content";
import { deleteJob, toggleJob } from "../../actions";

export default async function ConsoleJobsPage({ searchParams }: PageProps<"/console/jobs">) {
  const [{ careers }, params] = await Promise.all([getContent(), searchParams]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Jobs</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Job openings</h1>
          <p className="mt-2 text-ink-800/60">Published roles appear on the Careers page with their full description.</p>
        </div>
        <Link
          href="/console/jobs/new"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(120deg,#0b5fc2,#1e88e5_55%,#3fa9f5)] px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgb(30_136_229/0.7)]"
        >
          <Plus className="size-4" /> New job
        </Link>
      </div>

      {params.saved && <Notice tone="success">Job saved and published to the Careers page.</Notice>}
      {params.deleted && <Notice tone="success">Job deleted.</Notice>}

      <div className="grid gap-3">
        {careers.jobs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-ink-800/15 bg-white p-10 text-center text-ink-800/55">
            No jobs yet. Create the first opening.
          </div>
        )}
        {careers.jobs.map((j) => (
          <article key={j.id} className="flex flex-col gap-4 rounded-3xl border border-ink-800/8 bg-white p-5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-bold tracking-tight">{j.title}</h2>
                <span
                  className={
                    j.active
                      ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-emerald-700"
                      : "rounded-full bg-ink-800/5 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink-800/50"
                  }
                >
                  {j.active ? "Published" : "Draft"}
                </span>
              </div>
              <div className="mt-1 text-sm text-ink-800/60">
                {j.team} · {j.location} · {j.type}
              </div>
              <div className="mt-1 text-xs text-ink-800/40">
                Updated {new Date(j.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Link
                href={`/console/jobs/${j.id}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-800/10 bg-white px-3 text-xs font-semibold text-ink-800 transition hover:border-brand-500/50"
              >
                <Pencil className="size-3.5" /> Edit
              </Link>
              <form action={toggleJob}>
                <input type="hidden" name="id" value={j.id} />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-800/10 bg-white px-3 text-xs font-semibold text-ink-800 transition hover:border-brand-500/50"
                >
                  {j.active ? (
                    <>
                      <EyeOff className="size-3.5" /> Unpublish
                    </>
                  ) : (
                    <>
                      <Eye className="size-3.5" /> Publish
                    </>
                  )}
                </button>
              </form>
              <form action={deleteJob}>
                <input type="hidden" name="id" value={j.id} />
                <ConfirmSubmit message={`Delete "${j.title}"? This cannot be undone.`}>
                  <Trash2 className="size-3.5" /> Delete
                </ConfirmSubmit>
              </form>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-ink-800/8 bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-lg font-bold tracking-tight">Careers page intro</h2>
        <div className="mt-4">
          <CareersIntroForm intro={careers.intro} />
        </div>
      </section>
    </div>
  );
}
