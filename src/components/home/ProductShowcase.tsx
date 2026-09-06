"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMocks } from "@/components/products/ProductMocks";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="noise relative isolate overflow-hidden bg-ink-900 text-white section-y">
      <Aurora />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Products"
          title={
            <>
              Purpose-built tools for the <span className="text-gradient-light">BASE24 ecosystem.</span>
            </>
          }
          description="Monitoring, reporting and simulation software written by switch engineers, for switch engineers. Supported on Guardian, Linux, Unix and Windows."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Scrolling copy */}
          <div className="lg:col-span-5">
            {products.map((p, i) => (
              <ProductBlock key={p.slug} index={i} active={active === i} onActive={() => setActive(i)} product={p} />
            ))}
          </div>

          {/* Sticky mock */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgb(63_169_245/0.25),transparent_70%)] blur-2xl" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={products[active].slug}
                    initial={{ opacity: 0, y: 30, scale: 0.97, rotateX: 6 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformPerspective: 1200 }}
                    className="relative"
                  >
                    <Mock slug={products[active].slug} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {products.map((p, i) => (
                  <span
                    key={p.slug}
                    className={cn("h-1.5 rounded-full transition-all duration-500", active === i ? "w-8 bg-brand-400" : "w-3 bg-white/20")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mock({ slug }: { slug: keyof typeof productMocks }) {
  const Comp = productMocks[slug];
  return <Comp />;
}

function ProductBlock({
  product,
  index,
  active,
  onActive,
}: {
  product: (typeof products)[number];
  index: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[70vh]">
      <div
        className={cn(
          "transition-opacity duration-500",
          active ? "opacity-100" : "lg:opacity-35",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-brand-300">0{index + 1}</span>
          <span className="h-px w-10 bg-brand-300/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{product.kicker}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h3>
        <p className="mt-4 text-lg text-white/70">{product.tagline}</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f.title} className="glass-dark rounded-xl px-3.5 py-2.5 text-sm text-white/80">
              {f.title}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.platforms.map((pl) => (
            <span key={pl} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.7rem] text-white/55">
              {pl}
            </span>
          ))}
        </div>
        <Link
          href={`/products#${product.slug}`}
          className="group mt-7 inline-flex items-center gap-2 font-semibold text-brand-300 transition hover:text-white"
        >
          Explore {product.name}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Mobile mock */}
        <div className="mt-8 lg:hidden">
          <Mock slug={product.slug} />
        </div>
      </div>
    </div>
  );
}
