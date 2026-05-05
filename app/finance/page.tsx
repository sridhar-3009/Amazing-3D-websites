"use client";
import { motion, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic, SectionLabel } from "../components/motion-primitives";

function Counter({ target, prefix = "", suffix = "", duration = 2.5 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return controls.stop;
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* Animated chart bar */
function ChartBar({ height, delay, active }: { height: number; delay: number; active?: boolean }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: `${height}%`, originY: 1 }}
      className={`flex-1 rounded-sm ${active ? "bg-emerald-400" : "bg-emerald-900 hover:bg-emerald-800"} transition-colors cursor-pointer`}
    />
  );
}

/* Ticker tape */
function Ticker() {
  const items = [
    "SPX +0.4%", "NDX +1.2%", "MSCI EM +0.7%", "US10Y 4.32%",
    "GOLD +0.2%", "EUR/USD 1.085", "BTC +2.1%", "OIL -0.5%",
  ];
  return (
    <div className="overflow-hidden border-y border-emerald-900/40 py-2 relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-emerald-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-emerald-950 to-transparent z-10" />
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-xs font-mono ${item.includes("+") ? "text-emerald-400" : item.includes("-") ? "text-red-400" : "text-emerald-700"}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const services = [
  { name: "Wealth management",  desc: "Bespoke portfolio construction across equities, fixed income, and alternatives.", tag: "Core" },
  { name: "Estate planning",    desc: "Generational wealth preservation with tax-efficient structures.",                tag: "Advisory" },
  { name: "Private credit",     desc: "Access to institutional private credit markets, previously closed to individuals.", tag: "Exclusive" },
  { name: "Family office",      desc: "Full-service family office infrastructure for UHNW clients.",                 tag: "Premium" },
];

export default function FinancePage() {
  const barData = [35, 50, 42, 65, 55, 80, 70, 90, 75, 100, 88, 110];
  const maxBar = Math.max(...barData);

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 overflow-x-hidden cursor-none">
      <CustomCursor color="#34d399" />
      <ScrollProgress color="#10b981" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-emerald-950/95 backdrop-blur-sm border-b border-emerald-900/40">
        <Link href="/" className="text-emerald-800 text-[10px] tracking-[0.4em] hover:text-emerald-400 transition-colors uppercase">← Back</Link>
        <div className="font-serif text-lg tracking-wide">Meridian Capital</div>
        <Magnetic strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#065f46" }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="border border-emerald-800 text-emerald-500 text-[10px] px-6 py-3 tracking-[0.3em] uppercase transition-colors"
          >
            Speak with us
          </motion.button>
        </Magnetic>
      </nav>

      {/* Ticker */}
      <div className="pt-16">
        <Ticker />
      </div>

      {/* Hero */}
      <section className="relative py-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <ClipReveal direction="bottom" delay={0.3}>
              <p className="text-emerald-700 text-[10px] tracking-[0.6em] uppercase mb-8">Private wealth management · Est. 2003</p>
            </ClipReveal>

            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
              <WordReveal text="Capital that" className="block" stagger={0.1} delay={0.4} />
              <WordReveal text="compounds." className="block" stagger={0.1} delay={0.6} />
              <WordReveal text="Quietly." className="block italic text-emerald-400" stagger={0.1} delay={0.8} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-emerald-700 max-w-lg leading-relaxed mb-10"
            >
              Institutional-grade strategies. No noise. No shortcuts.
              Just disciplined, long-horizon investing for those who built real wealth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex gap-4"
            >
              <Magnetic strength={0.2}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 text-sm tracking-wider transition-colors"
                >
                  Schedule consultation
                </motion.button>
              </Magnetic>
              <motion.button
                whileHover={{ borderColor: "#34d399", color: "#6ee7b7" }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="border border-emerald-900 text-emerald-700 px-8 py-4 text-sm tracking-wider transition-colors"
              >
                Our approach
              </motion.button>
            </motion.div>
          </div>

          {/* Portfolio card */}
          <div className="col-span-12 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 800 }}
            >
              <Tilt3D intensity={8} className="bg-emerald-900/30 border border-emerald-800/40 p-8">
                <div className="text-emerald-700 text-[10px] tracking-[0.4em] uppercase mb-6">Portfolio · 12-month</div>
                <div className="flex items-end gap-1 h-28 mb-6">
                  {barData.map((h, i) => (
                    <ChartBar
                      key={i}
                      height={(h / maxBar) * 100}
                      delay={0.9 + i * 0.04}
                      active={i === barData.length - 1}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-emerald-900/50">
                  <div>
                    <div className="text-3xl font-serif text-emerald-300">+14.2%</div>
                    <div className="text-emerald-800 text-xs">Annual return</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-500 text-sm font-medium">vs +9.1% benchmark</div>
                    <div className="text-emerald-800 text-xs">+5.1% alpha</div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated counters */}
      <section className="py-20 border-t border-emerald-900/40 bg-emerald-900/10">
        <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: "AUM",                 target: 8,    prefix: "$", suffix: ".4B" },
            { label: "Clients",             target: 12400,prefix: "",  suffix: "+" },
            { label: "Annual return",       target: 14,   prefix: "",  suffix: ".2%" },
            { label: "Years operating",     target: 22,   prefix: "",  suffix: "" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-4xl font-serif text-emerald-300 mb-1">
                <Counter target={m.target} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-emerald-800 text-[10px] tracking-[0.3em] uppercase">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="02" label="What we offer" />
          <ClipReveal direction="left" className="mb-16">
            <h2 className="text-4xl font-serif">Services</h2>
          </ClipReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-emerald-900/20">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={5} className="p-10 border border-emerald-900/40 hover:border-emerald-800/60 transition-colors h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-emerald-100 text-lg font-serif">{s.name}</h3>
                    <span className="text-emerald-800 text-[9px] tracking-[0.3em] border border-emerald-900 px-2 py-0.5">{s.tag}</span>
                  </div>
                  <p className="text-emerald-800 text-sm leading-relaxed">{s.desc}</p>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center border-t border-emerald-900/40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-emerald-800 text-[10px] tracking-[0.6em] uppercase mb-6">Minimum investment: $500,000</p>
          <h2 className="text-4xl font-serif text-emerald-100 mb-4">Grow your wealth differently.</h2>
          <p className="text-emerald-800 mb-10 max-w-sm mx-auto">Initial consultations are confidential and no-obligation.</p>
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05, y: -3, backgroundColor: "#047857" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-emerald-700 text-white px-14 py-5 text-[10px] tracking-[0.4em] uppercase shadow-2xl"
            >
              Request consultation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
