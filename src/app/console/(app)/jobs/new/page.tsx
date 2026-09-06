import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JobForm } from "@/components/console/forms";

export default function NewJobPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <div>
        <Link href="/console/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
          <ArrowLeft className="size-4" /> All jobs
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">New job opening</h1>
      </div>
      <JobForm />
    </div>
  );
}
