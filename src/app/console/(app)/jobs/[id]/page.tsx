import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { JobForm } from "@/components/console/forms";
import { getContent } from "@/lib/content";

export default async function EditJobPage({ params }: PageProps<"/console/jobs/[id]">) {
  const [{ careers }, { id }] = await Promise.all([getContent(), params]);
  const job = careers.jobs.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/console/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
            <ArrowLeft className="size-4" /> All jobs
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">{job.title}</h1>
        </div>
        {job.active && (
          <Link href={`/careers#${job.id}`} target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800/60 hover:text-ink-800">
            View on site <ExternalLink className="size-3.5" />
          </Link>
        )}
      </div>
      <JobForm job={job} />
    </div>
  );
}
