"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { productMocks } from "@/components/products/ProductMocks";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Home products section — same pattern as /products:
 * each product is its own row with copy + mock UI side by side
 * (no sticky scroll-synced panel).
 */
export function ProductShowcase() {
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

        <div className="mt-16 flex flex-col gap-24 lg:gap-32">
          {products.map((product, index) => (
            <ProductRow key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRow({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const Mock = productMocks[product.slug];
  const mediaOnRight = index % 2 === 0;

  return (
    <article id={`home-${product.slug}`} className="scroll-mt-28">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className={cn("lg:col-span-5", !mediaOnRight && "lg:order-2")}>
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
        </Reveal>

        <Reveal delay={0.12} className={cn("lg:col-span-7", !mediaOnRight && "lg:order-1")}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgb(63_169_245/0.22),transparent_70%)] blur-2xl" />
            <Mock className="relative" />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
