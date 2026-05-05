"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic, SectionLabel } from "../components/motion-primitives";

/* ── Typing effect ── */
function TypingCode() {
  const lines = [
    "const synapse = await init({ region: 'auto' });",
    "const stream = synapse.subscribe('events.*');",
    "stream.on('data', (e) => pipeline.process(e));",
    "await synapse.sync({ latency: '<10ms' });",
  ];
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const isInView = useInView(useRef(null), { once: true });

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setText(prev => prev + line[charIdx]);
        setCharIdx(c => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText(prev => prev + "\n");
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  return (
    <pre className="font-mono text-xs text-indigo-300 leading-relaxed whitespace-pre-wrap">
      {text}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>▋</motion.span>
    </pre>
  );
}

/* ── Animated stat ── */
function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-black text-indigo-400 mb-2 tracking-tighter">{value}</div>
      <div className="text-zinc-600 text-xs uppercase tracking-[0.25em]">{label}</div>
    </motion.div>
  );
}

const features = [
  { icon: "⚡", title: "Real-time sync", desc: "Sub-10ms latency across all devices." },
  { icon: "🔐", title: "Zero-trust auth", desc: "Every request verified, every session encrypted." },
  { icon: "📊", title: "Live analytics", desc: "What's happening in your product right now." },
  { icon: "🔄", title: "Auto-scaling", desc: "From 1 user to 1M. Infrastructure grows with you." },
  { icon: "🧩", title: "API-first", desc: "200+ integrations out of the box." },
  { icon: "🤖", title: "AI-powered", desc: "Anomaly detection and automated workflows." },
];

export default function TechPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden cursor-none">
      <CustomCursor color="#818cf8" />
      <ScrollProgress color="#6366f1" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md border-b border-zinc-800/40">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-zinc-600 text-xs hover:text-white transition-colors tracking-widest uppercase">← All pages</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="font-black tracking-tight text-lg">
          Synapse<span className="text-indigo-400">.</span>
        </motion.div>
        <Magnetic strength={0.3}>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-indigo-600 text-white text-xs px-6 py-3 rounded-full font-semibold tracking-wider uppercase"
          >
            Get started
          </motion.button>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950" />
        </motion.div>

        {/* Ambient glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600 blur-[120px] pointer-events-none"
        />

        <motion.div style={{ opacity, scale }} className="relative z-10 px-8 max-w-7xl mx-auto w-full pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 rounded-full px-4 py-2 text-indigo-400 text-xs mb-10 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
            />
            System nominal · 24,891 active sessions
          </motion.div>

          <h1 className="text-7xl md:text-8xl lg:text-[10vw] font-black tracking-tighter leading-none mb-8">
            <WordReveal text="The platform" className="block" stagger={0.08} />
            <WordReveal text="that thinks." className="block text-indigo-400" stagger={0.08} delay={0.2} />
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-zinc-400 text-xl max-w-lg leading-relaxed"
            >
              Synapse is the infrastructure layer for modern teams. Real-time, secure, and intelligent by default.
            </motion.p>

            {/* Floating code card */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 800, transformStyle: "preserve-3d" }}
              className="flex-1 max-w-lg"
            >
              <Tilt3D intensity={8} className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                <div className="flex gap-1.5 mb-4">
                  {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                  <span className="ml-2 text-zinc-600 text-xs font-mono">synapse.config.ts</span>
                </div>
                <TypingCode />
              </Tilt3D>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 mt-12"
          >
            <Magnetic strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold tracking-wide"
              >
                Start free →
              </motion.button>
            </Magnetic>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-8 py-4 rounded-full font-medium"
            >
              View docs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating metric cards */}
        {[
          { label: "Active sessions", value: "24,891", sub: "↑ 12% this hour", x: "72%", y: "18%", delay: 1.0 },
          { label: "P99 latency", value: "7ms", sub: "all regions", x: "5%", y: "25%", delay: 1.2 },
          { label: "Uptime", value: "99.99%", sub: "30-day rolling", x: "68%", y: "72%", delay: 1.4 },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: card.x, top: card.y }}
            className="hidden lg:block"
          >
            <Tilt3D intensity={10} className="bg-zinc-900/80 border border-zinc-700/60 rounded-xl p-4 backdrop-blur-sm min-w-[140px] shadow-2xl">
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{card.label}</div>
              <div className="text-white text-2xl font-black">{card.value}</div>
              <div className="text-green-400 text-xs mt-0.5">{card.sub}</div>
            </Tilt3D>
          </motion.div>
        ))}
      </section>

      {/* Stats */}
      <section className="py-24 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat value="99.99%" label="Uptime SLA" delay={0} />
          <Stat value="<10ms" label="P99 Latency" delay={0.1} />
          <Stat value="2M+" label="API calls/day" delay={0.2} />
          <Stat value="SOC2" label="Type II certified" delay={0.3} />
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="02" label="Platform capabilities" />
          <ClipReveal direction="left" className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              Everything you need.<br />
              <span className="text-zinc-600">Nothing you don&apos;t.</span>
            </h2>
          </ClipReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={8} className="bg-zinc-900 border border-zinc-800 hover:border-indigo-800/50 rounded-2xl p-8 h-full transition-colors">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, delay: i * 1.2 }}
                    className="text-3xl mb-5 inline-block"
                  >
                    {f.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tilt3D intensity={5} className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-950 to-zinc-900 border border-indigo-800/40 rounded-3xl p-16 text-center shadow-2xl">
            <h2 className="text-5xl font-black tracking-tighter mb-4">Ready to ship faster?</h2>
            <p className="text-zinc-500 mb-10 text-lg">Join 12,000+ teams already on Synapse.</p>
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-full font-bold text-lg"
              >
                Start for free →
              </motion.button>
            </Magnetic>
          </Tilt3D>
        </motion.div>
      </section>
    </main>
  );
}
