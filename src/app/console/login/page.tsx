import { Logo, LogoMark } from "@/components/layout/Logo";
import { LoginForm } from "@/components/console/forms";
import { Aurora } from "@/components/ui/Aurora";

export default async function ConsoleLoginPage({ searchParams }: PageProps<"/console/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;

  return (
    <div className="relative isolate grid min-h-screen flex-1 place-items-center overflow-hidden bg-ink-900 px-4 py-16 text-white">
      <Aurora />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 opacity-[0.08]">
        <LogoMark className="h-[30rem] w-auto" id="login-wm" flat />
      </div>

      <div className="glass-dark relative w-full max-w-md rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <Logo tone="dark" id="login" />
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-200">
            Master console
          </span>
        </div>
        <h1 className="mt-8 font-display text-2xl font-bold tracking-tight">HR sign in</h1>
        <p className="mt-1.5 text-sm text-white/60">Restricted area. Manage contact details, office address and job openings.</p>
        <div className="mt-8 rounded-3xl bg-white p-6 text-ink-800">
          <LoginForm next={next} />
        </div>
        <p className="mt-6 text-center text-xs text-white/40">Sessions expire after 8 hours. Sign-in attempts are rate limited.</p>
      </div>
    </div>
  );
}
