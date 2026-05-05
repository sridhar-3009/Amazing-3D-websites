"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";

const programs = [
  { name: "IGNITE", level: "Beginner", duration: "4 weeks", sessions: "3x/week", color: "#ef4444" },
  { name: "FORGE", level: "Intermediate", duration: "8 weeks", sessions: "5x/week", color: "#f97316" },
  { name: "APEX", level: "Elite", duration: "12 weeks", sessions: "6x/week", color: "#eab308" },
];

const stats = [
  { number: "50K+", label: "Athletes trained" },
  { number: "94%", label: "Goal achieved" },
  { number: "#1", label: "Rated app 2024" },
  { number: "0", label: "Excuses accepted" },
];

const words = ["STRONGER", "FASTER", "HARDER", "LEANER", "UNSTOPPABLE"];

function KineticWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -100, skewX: -15 }}
      whileInView={{ opacity: 1, x: 0, skewX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="block text-5xl md:text-7xl font-black tracking-tighter leading-none"
      style={{ color: index % 2 === 0 ? "white" : "transparent", WebkitTextStroke: index % 2 !== 0 ? "1px #ef4444" : "none" }}
    >
      {word}
    </motion.span>
  );
}

export default function FitnessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-900">
        <Link href="/" className="text-zinc-600 text-xs tracking-widest hover:text-white transition-colors uppercase">← Back</Link>
        <div className="font-black text-xl tracking-tighter">
          IRON<span className="text-red-500">FORGE</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="bg-red-500 text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase"
        >
          Join now
        </motion.button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-zinc-950" />

        {/* Diagonal stripe bg */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0px, #ef4444 2px, transparent 2px, transparent 20px)"
          }}
        />

        <div className="relative z-10 px-8 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-0.5 bg-red-500" />
            <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">No limits. No mercy.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl md:text-[14vw] font-black tracking-tighter leading-none mb-6"
          >
            BREAK<br />
            <span className="text-red-500">LIMITS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg max-w-md mb-10"
          >
            Elite training programs built for people who refuse to be average.
            Science-backed. Coach-designed. Brutal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-red-500 hover:bg-red-400 text-white font-black text-sm px-8 py-4 tracking-widest uppercase"
            >
              Start training
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="border-2 border-zinc-700 hover:border-red-500 text-zinc-400 font-bold text-sm px-8 py-4 tracking-widest uppercase transition-colors"
            >
              View programs
            </motion.button>
          </motion.div>
        </div>

        {/* Side kinetic text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden w-48 md:w-64">
          {words.map((w, i) => <KineticWord key={w} word={w} index={i} />)}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-500">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-white mb-1">{s.number}</div>
              <div className="text-red-200 text-xs font-bold tracking-widest uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase mb-3">Choose your weapon</p>
            <h2 className="text-5xl font-black tracking-tight">Training<br />Programs</h2>
          </motion.div>

          <div className="space-y-2">
            {programs.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setHoveredProgram(i)}
                onHoverEnd={() => setHoveredProgram(null)}
                className="relative border border-zinc-800 p-8 cursor-pointer overflow-hidden"
              >
                <motion.div
                  animate={{ opacity: hoveredProgram === i ? 0.08 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                  style={{ backgroundColor: p.color }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-4xl font-black tracking-tighter" style={{ color: p.color }}>{p.name}</span>
                    <span className="text-zinc-600 text-sm uppercase tracking-widest">{p.level}</span>
                  </div>
                  <div className="flex gap-12 text-right">
                    <div>
                      <div className="text-white font-bold">{p.duration}</div>
                      <div className="text-zinc-600 text-xs uppercase tracking-wider">Duration</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{p.sessions}</div>
                      <div className="text-zinc-600 text-xs uppercase tracking-wider">Frequency</div>
                    </div>
                    <motion.div
                      animate={{ x: hoveredProgram === i ? 8 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl"
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
      <section className="py-24 px-8 bg-red-500 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl font-black tracking-tighter mb-4">READY?</h2>
          <p className="text-red-200 mb-8 text-lg">Your excuses don&apos;t live here.</p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "black" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-white text-red-500 font-black px-12 py-5 text-sm tracking-widest uppercase"
          >
            Begin today — free trial
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
