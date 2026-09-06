"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CreditCard, Landmark, Smartphone, Store, ShieldCheck, Activity } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/* Geometry (viewBox 600 x 360) */
const CENTER = { x: 300, y: 180 };
const LEFT = [
  { x: 70, y: 70, label: "POS", Icon: Store },
  { x: 70, y: 180, label: "ATM", Icon: CreditCard },
  { x: 70, y: 290, label: "Mobile", Icon: Smartphone },
];
const RIGHT = [
  { x: 530, y: 70, label: "Visa / MC" },
  { x: 530, y: 180, label: "RuPay / NPCI" },
  { x: 530, y: 290, label: "Core banking" },
];

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

type Txn = { id: number; channel: string; amount: string; ms: number; status: "Approved" | "Declined" };

const CHANNELS = ["POS", "ATM", "UPI", "E-com", "Mobile"];
function randomTxn(id: number): Txn {
  const amt = Math.round(120 + Math.random() * 24000);
  return {
    id,
    channel: CHANNELS[Math.floor(Math.random() * CHANNELS.length)],
    amount: `₹${amt.toLocaleString("en-IN")}`,
    ms: 18 + Math.round(Math.random() * 40),
    status: Math.random() > 0.06 ? "Approved" : "Declined",
  };
}

export function TransactionFlow({ className }: { className?: string }) {
  const [txns, setTxns] = useState<Txn[]>([]);
  const [tps, setTps] = useState(1180);

  useEffect(() => {
    // Seeded on the client only (random values would otherwise mismatch during hydration).
    let id = 0;
    const tick = () => {
      setTxns((prev) => [randomTxn(id++), ...prev].slice(0, 4));
      setTps((v) => Math.max(900, Math.min(1600, v + Math.round((Math.random() - 0.5) * 60))));
    };
    const warmup = [0, 120, 240, 360].map((d) => setTimeout(tick, d));
    const t = setInterval(tick, 1600);
    return () => {
      warmup.forEach(clearTimeout);
      clearInterval(t);
    };
  }, []);

  const paths = [
    ...LEFT.map((n) => curve(n, { x: CENTER.x - 46, y: CENTER.y })),
    ...RIGHT.map((n) => curve({ x: CENTER.x + 46, y: CENTER.y }, n)),
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Main glass console */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark relative overflow-hidden rounded-[2rem] p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-medium text-white/60">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Live switch monitor
          </div>
          <div className="font-mono text-[0.7rem] text-white/45">BASE24-eps · PROD-01</div>
        </div>

        {/* Flow diagram */}
        <div className="relative mt-4">
          <svg viewBox="0 0 600 360" className="w-full" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="flow-line" x1="0" x2="1">
                <stop offset="0" stopColor="#3fa9f5" stopOpacity="0.15" />
                <stop offset="0.5" stopColor="#3fa9f5" stopOpacity="0.55" />
                <stop offset="1" stopColor="#3fa9f5" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="core-glow">
                <stop offset="0" stopColor="#3fa9f5" stopOpacity="0.55" />
                <stop offset="1" stopColor="#3fa9f5" stopOpacity="0" />
              </radialGradient>
            </defs>

            {paths.map((d, i) => (
              <path key={i} d={d} stroke="url(#flow-line)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash" />
            ))}

            {/* Core glow */}
            <circle cx={CENTER.x} cy={CENTER.y} r="110" fill="url(#core-glow)" />

            {/* Travelling packets */}
            {paths.map((d, i) => {
              const begin = `${((i % 3) * 0.55 + (i >= 3 ? 1.6 : 0)).toFixed(2)}s`;
              return (
                <g key={`p-${i}`}>
                  <circle r="7" fill="#5eead4" opacity="0.25">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin={begin} path={d} calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
                  </circle>
                  <circle r="3" fill="#5eead4">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin={begin} path={d} calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Nodes overlay, positioned in % of the viewBox */}
          {LEFT.map((n) => (
            <Node key={n.label} x={n.x} y={n.y} label={n.label}>
              <n.Icon className="size-4 text-brand-200" />
            </Node>
          ))}
          {RIGHT.map((n) => (
            <Node key={n.label} x={n.x} y={n.y} label={n.label}>
              <Landmark className="size-4 text-brand-200" />
            </Node>
          ))}

          {/* Center switch */}
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${(CENTER.x / 600) * 100}%`, top: `${(CENTER.y / 360) * 100}%` }}
          >
            <div className="relative grid size-20 place-items-center rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgb(30_136_229/0.35),rgb(11_95_194/0.15))] shadow-[0_0_60px_-10px_rgb(63_169_245/0.8)] backdrop-blur-xl sm:size-24">
              <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-brand-300/40" />
              <LogoMark className="h-10 w-14" id="flow" />
            </div>
            <span className="mt-2 rounded-full bg-white/8 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-white/80">
              ALPHA SWITCH
            </span>
          </div>
        </div>

        {/* Live ticker */}
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-3">
            <div className="flex items-center justify-between px-1 pb-2 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/40">
              <span>Recent authorisations</span>
              <span className="flex items-center gap-1">
                <Activity className="size-3" /> live
              </span>
            </div>
            <ul className="space-y-1.5">
              <AnimatePresence initial={false}>
                {txns.map((t) => (
                  <motion.li
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 font-mono text-[0.72rem] text-white/80"
                  >
                    <span className="w-12 text-white/50">{t.channel}</span>
                    <span className="flex-1 text-right sm:text-left">{t.amount}</span>
                    <span className="hidden w-14 text-right text-white/45 sm:inline">{t.ms} ms</span>
                    <span
                      className={cn(
                        "ml-3 rounded-full px-2 py-0.5 text-[0.62rem] font-semibold",
                        t.status === "Approved" ? "bg-accent/15 text-accent" : "bg-rose-400/15 text-rose-300",
                      )}
                    >
                      {t.status}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            <Metric label="Throughput" value={`${tps.toLocaleString("en-IN")}`} unit="TPS" />
            <Metric label="Approval rate" value="99.97" unit="%" icon={<ShieldCheck className="size-3.5 text-accent" />} />
          </div>
        </div>
      </motion.div>

      {/* Floating glass chips */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark absolute -top-7 right-8 hidden animate-float rounded-2xl px-4 py-3 text-xs text-white/80 lg:block"
      >
        <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/45">Avg latency</div>
        <div className="mt-0.5 font-display text-xl font-bold text-white">
          31<span className="text-sm text-white/50"> ms</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark absolute -bottom-7 left-8 hidden animate-float-slow rounded-2xl px-4 py-3 text-xs text-white/80 lg:block"
      >
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(94_234_212/0.7)]" />
          All interfaces healthy
        </div>
        <div className="mt-1 text-[0.65rem] text-white/45">Visa · Mastercard · RuPay · Host</div>
      </motion.div>
    </div>
  );
}

function Node({ x, y, label, children }: { x: number; y: number; label: string; children: React.ReactNode }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `${(x / 600) * 100}%`, top: `${(y / 360) * 100}%` }}
    >
      <div className="grid size-10 place-items-center rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur-md sm:size-11">
        {children}
      </div>
      <span className="whitespace-nowrap text-[0.62rem] font-medium tracking-wide text-white/55">{label}</span>
    </div>
  );
}

function Metric({ label, value, unit, icon }: { label: string; value: string; unit: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-3">
      <div className="flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/40">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-bold text-white tabular-nums">
        {value}
        <span className="ml-1 text-sm font-semibold text-white/45">{unit}</span>
      </div>
    </div>
  );
}
