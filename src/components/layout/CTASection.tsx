import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { getContent, phoneHref } from "@/lib/content";

type Props = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export async function CTASection({
  title = "Let's build the next generation of your payments stack.",
  description = "Talk to our switch engineers about implementation, monitoring, automation or a modernisation roadmap. We respond within one business day.",
  primary = { label: "Start a conversation", href: "/contact" },
  secondary: secondaryProp,
}: Props) {
  const { contact } = await getContent();
  const secondary = secondaryProp ?? { label: `Call ${contact.phone}`, href: phoneHref(contact.phone) };
  return (
    <section className="container-x section-y">
      <Reveal>
        <div className="noise relative isolate overflow-hidden rounded-[2.5rem] bg-ink-900 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          {/* Background art */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(30_136_229/0.55),transparent_60%)]" />
          <div className="absolute -bottom-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgb(11_95_194/0.5),rgb(94_234_212/0.35),rgb(167_139_250/0.35),rgb(11_95_194/0.5))] blur-[100px] animate-spin-slow" />
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          {/* Brand watermark */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-10 -top-16 opacity-[0.07] sm:left-0">
            <LogoMark className="h-64 w-auto sm:h-80" id="cta-wm" flat />
          </div>

          {/* Orbiting ring */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">{description}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={primary.href} variant="white" size="lg" arrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outline-light" size="lg">
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
