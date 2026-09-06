import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";

export default function NotFound() {
  return (
    <section className="noise relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink-900 pt-32 pb-20 text-white">
      <Aurora />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="container-x relative text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-brand-300">RESPONSE CODE 404</p>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.03em] sm:text-7xl">Transaction not found.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
          The page you requested was declined by our router. Let&apos;s reverse this and get you back on track.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" variant="white" size="lg" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outline-light" size="lg">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
