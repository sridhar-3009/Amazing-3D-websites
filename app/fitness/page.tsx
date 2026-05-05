"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, ClipReveal, Magnetic, SectionLabel } from "../components/motion-primitives";

const programs = [
  { name: "IGNITE", level: "Beginner", duration: "4 weeks", sessions: "3x/week", color: "#ef4444" },
  { name: "FORGE",  level: "Intermediate", duration: "8 weeks", sessions: "5x/week", color: "#f97316" },
  { name: "APEX",   level: "Elite", duration: "12 weeks", sessions: "6x/week", color: "#eab308" },
];

function ImpactLetter({ char, index, total }: { char: string; index: number; total: number }) {
  const isInView = useInView(useRef(null), { once: true });
  return (
    <motion.span
      initial={{ opacity: 0, y: -120, scaleY: 2, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      style={{ display: "inline-block", transformOrigin: "bottom" }}
    >
      {char}
    </motion.span>
  );
}

function ImpactWord({ word, className = "" }: { word: string; className?: string }) {
  return (
    <span className={className}>
      {word.split("").map((c, i) => (
        <ImpactLetter key={i} char={c} index={i} total={word.length} />
      ))}
    </span>
  );
}

function EnergyBar() {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2] }}
          transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
          style={{ originY: 1, height: "100%", backgroundColor: i < 14 ? "#ef4444" : "#ef4444" + "40" }}
          className="w-1 rounded-sm"
        />
      ))}
    </div>
  );
}

export default function FitnessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden cursor-none">
      <CustomCursor color="#ef4444" />
      <ScrollProgress color="#ef4444" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-900">
        <Link href="/" className="text-zinc-600 text-[10px] tracking-[0.4em] hover:text-white transition-colors uppercase">← Back</Link>
        <div className="font-black text-xl tracking-tighter">
          IRON<span className="text-red-500">FORGE</span>
        </div>
        <Magnetic strength={0.25}>
          <motion.button
            whileHover={{ scale: 1.06, backgroundColor: "#dc2626" }} whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-red-500 text-white text-[10px] font-black px-6 py-3 tracking-[0.3em] uppercase"
          >
            Join now
          </motion.button>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          {/* Diagonal energy stripes */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0px, #ef4444 2px, transparent 2px, transparent 24px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-0.5 bg-red-500"
            />
            <span className="text-red-500 text-[10px] font-black tracking-[0.5em] uppercase">No limits. No mercy.</span>
          </motion.div>

          <div className="mb-8" style={{ perspective: 600 }}>
            <h1 className="text-[14vw] font-black tracking-tighter leading-none">
              <ImpactWord word="BREAK" className="block" />
              <ImpactWord word="LIMITS." className="block text-red-500" />
            </h1>
          </div>

          {/* Energy bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <EnergyBar />
            <span className="text-zinc-600 text-xs font-mono">LEVEL 94% — PEAK OUTPUT</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-zinc-500 max-w-md mb-10 text-lg"
          >
            Elite training programs built for people who refuse to be average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4"
          >
            <Magnetic strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.95, y: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-red-500 text-white font-black text-sm px-10 py-5 tracking-[0.3em] uppercase"
              >
                Start training →
              </motion.button>
            </Magnetic>
            <motion.button
              whileHover={{ borderColor: "#ef4444", color: "#ef4444" }} whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="border-2 border-zinc-800 text-zinc-600 font-black text-sm px-10 py-5 tracking-[0.3em] uppercase"
            >
              View programs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Side slamming text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden">
          {["STRONGER", "FASTER", "HARDER", "UNSTOPPABLE"].map((w, i) => (
            <motion.div
              key={w}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
              style={{
                color: i % 2 === 0 ? "transparent" : "transparent",
                WebkitTextStroke: `1px rgba(239,68,68,${0.15 + i * 0.05})`,
              }}
            >
              {w}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Red stats bar */}
      <section className="py-14 bg-red-500">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "50K+", l: "Athletes" },
            { n: "94%",  l: "Goal rate" },
            { n: "#1",   l: "Rated 2024" },
            { n: "0",    l: "Excuses" },
          ].map((s, i) => (
            <ClipReveal key={s.l} direction="bottom" delay={i * 0.08} className="text-center">
              <div className="text-4xl font-black text-white mb-1">{s.n}</div>
              <div className="text-red-200 text-[10px] font-bold tracking-[0.3em] uppercase">{s.l}</div>
            </ClipReveal>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="02" label="Choose your weapon" />
          <ClipReveal direction="left" className="mb-16">
            <h2 className="text-6xl font-black tracking-tighter">Training<br />Programs</h2>
          </ClipReveal>

          <div className="space-y-2">
            {programs.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setHoveredProgram(i)}
                onHoverEnd={() => setHoveredProgram(null)}
                className="relative border border-zinc-800 p-8 overflow-hidden cursor-pointer group"
              >
                {/* Hover fill */}
                <motion.div
                  animate={{ scaleX: hoveredProgram === i ? 1 : 0 }}
                  style={{ originX: 0, backgroundColor: p.color + "0a" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                />
                {/* Left accent bar */}
                <motion.div
                  animate={{ scaleY: hoveredProgram === i ? 1 : 0 }}
                  style={{ originY: 0, backgroundColor: p.color }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 inset-y-0 w-0.5"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <motion.span
                      animate={{ scale: hoveredProgram === i ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-5xl font-black tracking-tighter"
                      style={{ color: p.color }}
                    >
                      {p.name}
                    </motion.span>
                    <span className="text-zinc-600 text-sm uppercase tracking-wider">{p.level}</span>
                  </div>
                  <div className="flex gap-12 text-right items-center">
                    <div>
                      <div className="text-white font-bold">{p.duration}</div>
                      <div className="text-zinc-600 text-xs uppercase tracking-wider">Duration</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{p.sessions}</div>
                      <div className="text-zinc-600 text-xs uppercase tracking-wider">Frequency</div>
                    </div>
                    <motion.div
                      animate={{ x: hoveredProgram === i ? 12 : 0, color: hoveredProgram === i ? p.color : "#52525b" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl font-black"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 bg-red-500 text-center relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h2 className="text-7xl font-black tracking-tighter mb-4">READY?</h2>
          <p className="text-red-200 mb-10 text-xl">Your excuses don&apos;t live here.</p>
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: "#000", color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white text-red-500 font-black px-14 py-6 text-sm tracking-[0.3em] uppercase shadow-2xl"
            >
              Begin today — free trial
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
