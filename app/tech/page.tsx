"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const features = [
  { icon: "⚡", title: "Real-time sync", desc: "Sub-10ms latency across all devices. Your data moves faster than you think." },
  { icon: "🔐", title: "Zero-trust auth", desc: "Every request verified. Every session encrypted. No exceptions." },
  { icon: "📊", title: "Live analytics", desc: "See what's happening in your product right now, not yesterday." },
  { icon: "🔄", title: "Auto-scaling", desc: "From 1 user to 1 million. Infrastructure that grows with you." },
  { icon: "🧩", title: "API-first", desc: "Built to connect. 200+ integrations out of the box." },
  { icon: "🤖", title: "AI-powered", desc: "Intelligent suggestions, anomaly detection, and automated workflows." },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<10ms", label: "P99 Latency" },
  { value: "2M+", label: "API calls/day" },
  { value: "SOC2", label: "Type II certified" },
];

function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-indigo-400 mb-1">{value}</div>
      <div className="text-zinc-500 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

function FloatingCard({ delay, x, y, children }: { delay: number; x: number; y: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
      }}
      className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-400 backdrop-blur-sm shadow-2xl"
    >
      {children}
    </motion.div>
  );
}

export default function TechPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md border-b border-zinc-800/50">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-zinc-500 text-sm hover:text-white transition-colors">← Back</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="font-semibold tracking-tight">Synapse</span>
          <span className="text-indigo-400 ml-0.5">.</span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-full font-medium"
        >
          Get started
        </motion.button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 rounded-full px-4 py-1.5 text-indigo-400 text-sm mb-8"
          >
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Now in public beta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            The platform
            <br />
            <span className="text-indigo-400">that thinks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10"
          >
            Synapse is the infrastructure layer for modern teams. Real-time, secure, and intelligent by default.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              Start free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-8 py-4 rounded-full font-semibold text-lg"
            >
              View docs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating UI cards */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingCard delay={0.8} x={5} y={20}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">System healthy</span>
            </div>
            <div className="text-zinc-500">All 12 services online</div>
          </FloatingCard>

          <FloatingCard delay={1} x={72} y={15}>
            <div className="text-zinc-500 mb-1">Active sessions</div>
            <div className="text-2xl font-bold text-white">24,891</div>
            <div className="text-green-400 text-xs">↑ 12% this hour</div>
          </FloatingCard>

          <FloatingCard delay={1.2} x={10} y={65}>
            <div className="font-mono text-indigo-400">POST /api/sync</div>
            <div className="text-zinc-500">200 OK · 7ms</div>
          </FloatingCard>

          <FloatingCard delay={1.4} x={68} y={70}>
            <div className="text-zinc-500 mb-2 text-xs uppercase tracking-wider">Throughput</div>
            <div className="flex gap-1 items-end h-8">
              {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.6 + i * 0.05 }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className="w-2 bg-indigo-500 rounded-sm"
                />
              ))}
            </div>
          </FloatingCard>
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-radial-gradient from-indigo-950/30 via-transparent to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => <StatCounter key={s.label} {...s} delay={i * 0.1} />)}
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-4">Platform capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need.<br />Nothing you don&apos;t.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 cursor-default"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-950 to-zinc-900 border border-indigo-800 rounded-3xl p-16"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-400 mb-8">Join 12,000+ teams already on Synapse. Free to start, scales with you.</p>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-semibold text-lg"
          >
            Start for free
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
