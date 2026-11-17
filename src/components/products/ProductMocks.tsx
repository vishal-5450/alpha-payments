"use client";

import { motion } from "motion/react";
import { Bell, CircleCheck as CheckCircle2, Cpu, Download, Funnel as Filter, Play, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------ */
/* Shared chrome                                                             */
/* ------------------------------------------------------------------------ */

function Window({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(180deg,rgb(16_27_54/0.92),rgb(7_12_26/0.96))] text-white shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[0.7rem] text-white/45">{title}</span>
      </div>
      <div className="relative p-4 sm:p-5">{children}</div>
      {/* Scanline sheen */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
        <div className="h-1/3 w-full animate-scan bg-[linear-gradient(to_bottom,transparent,rgb(255_255_255/0.035),transparent)]" />
      </div>
    </div>
  );
}

function Bars({ values, colorClass = "bg-brand-500" }: { values: number[]; colorClass?: string }) {
  return (
    <div className="flex h-24 items-end gap-1.5">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className={cn("flex-1 rounded-t-md", colorClass)}
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: 0.45 + (v / 100) * 0.55 }}
        />
      ))}
    </div>
  );
}

function Sparkline({ points, stroke = "#5eead4" }: { points: number[]; stroke?: string }) {
  const w = 200;
  const h = 56;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`sp-${stroke.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L ${w} ${h} L 0 ${h} Z`}
        fill={`url(#sp-${stroke.replace("#", "")})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Insight — real-time monitoring                                            */
/* ------------------------------------------------------------------------ */

export function InsightMock({ className }: { className?: string }) {
  return (
    <Window title="insight — prod-switch-01 · live" className={className}>
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Approval rate", v: "99.97%", d: "+0.02" },
          { l: "Avg response", v: "31 ms", d: "-3 ms" },
          { l: "TPS", v: "1,240", d: "+4.1%" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <div className="text-[0.6rem] uppercase tracking-[0.15em] text-white/40">{k.l}</div>
            <div className="mt-1 font-display text-lg font-bold">{k.v}</div>
            <div className="text-[0.62rem] text-accent">{k.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between text-[0.62rem] text-white/45">
            <span>Transactions / min · by channel</span>
            <span className="font-mono">last 60 min</span>
          </div>
          <div className="mt-3">
            <Bars values={[42, 55, 48, 62, 70, 66, 78, 84, 76, 90, 86, 94, 88, 97, 91, 84, 88, 95, 99, 92]} />
          </div>
          <div className="mt-2 flex gap-3 text-[0.6rem] text-white/45">
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-brand-500" /> POS</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-brand-300" /> ATM</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-accent" /> E-com</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 text-[0.62rem] text-white/45">
            <Bell className="size-3" /> Alerts
          </div>
          {[
            { t: "Visa interface latency", s: "warn", m: "2m ago" },
            { t: "ATM declines spike", s: "ok", m: "resolved" },
            { t: "Host reconnect", s: "ok", m: "auto-healed" },
          ].map((a) => (
            <div key={a.t} className="flex items-start gap-2 rounded-lg bg-white/[0.04] p-2 text-[0.66rem]">
              {a.s === "warn" ? (
                <TriangleAlert className="mt-0.5 size-3 shrink-0 text-amber-300" />
              ) : (
                <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-accent" />
              )}
              <div>
                <div className="text-white/85">{a.t}</div>
                <div className="text-white/40">{a.m}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------------ */
/* Decipher — extracts & reporting                                           */
/* ------------------------------------------------------------------------ */

export function DecipherMock({ className }: { className?: string }) {
  const rows = [
    ["09:41:03", "PTLF", "0200", "₹2,450.00", "00"],
    ["09:41:03", "TLF", "0210", "₹18,999.00", "00"],
    ["09:41:04", "TLF", "0200", "₹560.00", "51"],
    ["09:41:05", "PTLF", "0420", "₹4,100.00", "00"],
    ["09:41:06", "TLF", "0200", "₹1,250.00", "00"],
  ];
  return (
    <Window title="decipher — extract run #4821 · TLF/PTLF" className={className}>
      <div className="flex flex-wrap items-center gap-2">
        {["Date: 2026-09-06", "Host: PROD-01", "Type: TLF + PTLF", "Format: XLSX"].map((c) => (
          <span key={c} className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.62rem] text-white/70">
            {c}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-2/20 px-2.5 py-1 text-[0.62rem] font-semibold text-accent-2">
          <Filter className="size-3" /> 12 filters
        </span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.04]">
          <table className="w-full text-left font-mono text-[0.62rem]">
            <thead className="bg-white/[0.04] text-white/45">
              <tr>
                {["Time", "Log", "MTI", "Amount", "RC"].map((h) => (
                  <th key={h} className="px-2.5 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={i}
                  className="border-t border-white/6 text-white/80"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {r.map((c, j) => (
                    <td key={j} className={cn("px-2.5 py-1.5", j === 4 && c !== "00" && "text-rose-300")}>{c}</td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
          <div className="text-[0.62rem] text-white/45">Comparison · today vs yesterday</div>
          <div className="mt-2">
            <Sparkline points={[30, 42, 38, 55, 61, 58, 72, 80, 76, 90, 88, 96]} stroke="#a78bfa" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[0.62rem]">
            <div className="rounded-lg bg-white/[0.04] p-2">
              <div className="text-white/40">Matched</div>
              <div className="font-display text-base font-bold">1,204,318</div>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-2">
              <div className="text-white/40">Exceptions</div>
              <div className="font-display text-base font-bold text-amber-300">37</div>
            </div>
          </div>
          <button type="button" className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/10 py-2 text-[0.66rem] font-semibold text-white">
            <Download className="size-3" /> Export extract
          </button>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------------ */
/* ISO Genie — ISO 8583 simulator                                            */
/* ------------------------------------------------------------------------ */

export function IsoGenieMock({ className }: { className?: string }) {
  return (
    <Window title="iso-genie — analytics · client / host" className={className}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { l: "Client devices", v: "26" },
          { l: "Client testcases", v: "356" },
          { l: "Host transactions", v: "101,773" },
          { l: "Host devices", v: "23" },
          { l: "Host testcases", v: "1,462" },
          { l: "Unit / regression", v: "135 / 3" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <div className="text-[0.58rem] uppercase tracking-[0.14em] text-white/40">{k.l}</div>
            <div className="mt-1 font-display text-lg font-bold">{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.04] p-3">
        <div className="flex items-center justify-between text-[0.62rem] text-white/45">
          <span>Transaction logs overview · ISO client / host</span>
          <span className="font-mono">VISA · Mastercard · Postbridge</span>
        </div>
        <div className="mt-3">
          <Bars values={[18, 22, 40, 55, 48, 30, 28, 35, 42, 38, 50, 58, 44, 36, 52, 60, 45, 32, 48, 54]} />
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------------ */
/* API Genie — simulator                                                     */
/* ------------------------------------------------------------------------ */

export function ApiGenieMock({ className }: { className?: string }) {
  return (
    <Window title="api-genie — scenario: auth-purchase-emv · 500 threads" className={className}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-ink-950/60 p-3 font-mono text-[0.64rem] leading-relaxed">
          <div className="mb-2 flex items-center justify-between text-white/40">
            <span>request.json</span>
            <span className="text-brand-300">POST /v1/authorise</span>
          </div>
          <pre className="text-white/85">
{`{
  "mti": "0200",
  "pan": "4***********1234",
  "amount": 245000,
  "currency": "INR",
  "pos_entry": "051",
  "emv": { "9F26": "A1B2…", "9F10": "0610…" }
}`}
          </pre>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/8 bg-ink-950/60 p-3 font-mono text-[0.64rem] leading-relaxed">
            <div className="mb-2 flex items-center justify-between text-white/40">
              <span>response.json</span>
              <span className="text-accent">200 · 27 ms</span>
            </div>
            <pre className="text-white/85">
{`{
  "mti": "0210",
  "rc": "00",
  "auth_code": "A7K2Q9",
  "stan": "004821"
}`}
            </pre>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <div className="flex items-center justify-between text-[0.62rem] text-white/45">
              <span className="flex items-center gap-1.5"><Cpu className="size-3" /> Load · 500 concurrent</span>
              <span className="flex items-center gap-1 text-accent"><Play className="size-3" /> running</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1e88e5,#5eead4)]"
                initial={{ width: "0%" }}
                whileInView={{ width: "72%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[0.62rem]">
              <div><div className="text-white/40">Passed</div><div className="font-display text-sm font-bold text-accent">36,120</div></div>
              <div><div className="text-white/40">Failed</div><div className="font-display text-sm font-bold text-rose-300">14</div></div>
              <div><div className="text-white/40">p95</div><div className="font-display text-sm font-bold">41 ms</div></div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export const productMocks = {
  "iso-genie": IsoGenieMock,
  "api-genie": ApiGenieMock,
  insight: InsightMock,
  decipher: DecipherMock,
} as const;
