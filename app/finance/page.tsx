"use client";
import { motion, useScroll, useTransform, animate, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

function AnimatedNumber({ target, prefix = "", suffix = "", duration = 2 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

const metrics = [
  { label: "AUM", value: 8400000000, prefix: "$", suffix: "", display: "$8.4B" },
  { label: "Clients", value: 12400, prefix: "", suffix: "+", display: "12,400+" },
  { label: "Avg. annual return", value: 14, prefix: "", suffix: ".2%", display: "14.2%" },
  { label: "Years operating", value: 22, prefix: "", suffix: "", display: "22" },
];

const services = [
  { name: "Wealth management", desc: "Bespoke portfolio construction across equities, fixed income, and alternatives.", tag: "Core" },
  { name: "Estate planning", desc: "Generational wealth preservation with tax-efficient structures.", tag: "Advisory" },
  { name: "Private credit", desc: "Access to institutional private credit markets, previously closed to individuals.", tag: "Exclusive" },
  { name: "Family office", desc: "Full-service family office infrastructure for UHNW clients.", tag: "Premium" },
];

const team = [
  { name: "Eleanor Marsh", role: "Managing Partner", years: "22 yrs" },
  { name: "Daniel Okonkwo", role: "Chief Investment Officer", years: "18 yrs" },
  { name: "Sarah Lindqvist", role: "Head of Private Credit", years: "14 yrs" },
];

export default function FinancePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-emerald-950/95 backdrop-blur-sm border-b border-emerald-900/50">
        <Link href="/" className="text-emerald-800 text-xs tracking-widest hover:text-emerald-400 transition-colors uppercase">← Back</Link>
        <div className="font-serif text-lg tracking-wide">Meridian Capital</div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="border border-emerald-700 hover:bg-emerald-700 text-emerald-300 text-xs px-5 py-2.5 tracking-widest uppercase transition-colors"
        >
          Speak with us
        </motion.button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
            <div className="col-span-12 md:col-span-7">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-emerald-600 text-xs tracking-[0.5em] uppercase mb-8"
              >
                Private wealth management · Est. 2003
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-serif leading-tight mb-8"
              >
                Capital that<br />
                compounds.<br />
                <span className="text-emerald-400 italic">Quietly.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-emerald-700 max-w-lg leading-relaxed mb-10"
              >
                We manage wealth for those who built it. Institutional-grade strategies.
                No noise. No shortcuts. Just disciplined, long-horizon investing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 text-sm tracking-wider"
                >
                  Schedule consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="border border-emerald-800 hover:border-emerald-600 text-emerald-600 hover:text-emerald-400 px-8 py-4 text-sm tracking-wider transition-colors"
                >
                  Our approach
                </motion.button>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="bg-emerald-900/30 border border-emerald-800/50 p-8 rounded-sm"
              >
                <div className="text-emerald-600 text-xs tracking-widest uppercase mb-6">Portfolio snapshot</div>
                {/* Simulated chart */}
                <div className="flex items-end gap-1 h-24 mb-6">
                  {[35, 50, 42, 65, 55, 80, 70, 90, 75, 100, 88, 110].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 1.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: `${h}%`, originY: 1 }}
                      className={`flex-1 rounded-sm ${i === 11 ? "bg-emerald-400" : "bg-emerald-800"}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-2xl font-serif text-emerald-100">+14.2%</div>
                    <div className="text-emerald-700 text-xs">12-month return</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm">vs +9.1% index</div>
                    <div className="text-emerald-700 text-xs">outperformance</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated metrics */}
      <section className="py-20 border-t border-emerald-900/50 bg-emerald-900/20">
        <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-3xl font-serif text-emerald-300 mb-1">{m.display}</div>
              <div className="text-emerald-700 text-xs tracking-widest uppercase">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-emerald-600 text-xs tracking-[0.4em] uppercase mb-3">What we offer</p>
            <h2 className="text-4xl font-serif">Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-emerald-900/30">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ backgroundColor: "rgba(16,185,129,0.04)" }}
                className="p-10 border border-emerald-900/50 cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-emerald-100 text-lg font-serif">{s.name}</h3>
                  <span className="text-emerald-700 text-xs tracking-widest border border-emerald-800 px-2 py-0.5">{s.tag}</span>
                </div>
                <p className="text-emerald-700 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-10 bg-emerald-900/10 border-t border-emerald-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif">The partners</h2>
          </motion.div>
          <div className="space-y-0">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex justify-between items-center py-8 border-b border-emerald-900/50"
              >
                <div>
                  <div className="text-emerald-100 font-serif text-xl">{t.name}</div>
                  <div className="text-emerald-700 text-sm mt-1">{t.role}</div>
                </div>
                <div className="text-emerald-800 text-sm">{t.years} experience</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-emerald-700 text-xs tracking-[0.5em] uppercase mb-6">Minimum investment: $500,000</p>
          <h2 className="text-4xl font-serif text-emerald-100 mb-4">Ready to grow your wealth differently?</h2>
          <p className="text-emerald-700 mb-10 max-w-md mx-auto">Initial consultations are confidential, no-obligation, and available by appointment.</p>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#059669" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-emerald-600 text-white px-12 py-4 text-sm tracking-widest uppercase"
          >
            Request consultation
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
