"use client";
// Layout: FULL-BLEED IMAGE + BRUTAL DIAGONAL TYPE — athlete photo fills 100vw/vh,
// text and image overlap, diagonal red slash cuts across, programs are large image cards
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, Magnetic, ClipReveal } from "../components/motion-primitives";

const HERO_IMG    = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80";
const ATHLETE_IMG = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80";
const RUN_IMG     = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80";
const BOX_IMG     = "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80";

const programs = [
  { name: "IGNITE", level: "Beginner",     duration: "4 weeks", color: "#ef4444", img: RUN_IMG },
  { name: "FORGE",  level: "Intermediate", duration: "8 weeks", color: "#f97316", img: ATHLETE_IMG },
  { name: "APEX",   level: "Elite",        duration: "12 weeks", color: "#eab308", img: BOX_IMG },
];

function ProgramCard({ p, i }: { p: typeof programs[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative overflow-hidden cursor-pointer group h-48"
    >
      {/* Background image */}
      <motion.div animate={{ scale: hov ? 1.08 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0">
        <Image src={p.img} alt={p.name} fill className="object-cover" />
      </motion.div>
      {/* Dark overlay */}
      <motion.div animate={{ opacity: hov ? 0.5 : 0.75 }} className="absolute inset-0 bg-black transition-opacity duration-500" />
      {/* Color accent */}
      <motion.div animate={{ opacity: hov ? 0.3 : 0 }}
        style={{ background: `linear-gradient(135deg, ${p.color}60, transparent)` }}
        className="absolute inset-0 transition-opacity duration-500" />

      {/* Left red bar */}
      <motion.div animate={{ scaleY: hov ? 1 : 0 }} style={{ originY: 0, backgroundColor: p.color }}
        className="absolute left-0 inset-y-0 w-1 transition-transform duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex items-center justify-between">
        <div>
          <motion.div animate={{ x: hov ? 8 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="text-5xl font-black tracking-tighter leading-none" style={{ color: p.color }}>{p.name}</div>
            <div className="text-zinc-400 text-sm uppercase tracking-widest mt-1">{p.level}</div>
          </motion.div>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-xl">{p.duration}</div>
          <motion.div animate={{ x: hov ? 8 : 0, color: hov ? p.color : "#71717a" }}
            className="text-2xl mt-2 transition-colors duration-300">→</motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FitnessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden cursor-none">
      <CustomCursor color="#ef4444" />
      <ScrollProgress color="#ef4444" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-8 py-4 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900/60">
        <Link href="/" className="text-zinc-600 text-[10px] tracking-[0.4em] hover:text-white transition-colors uppercase">← Home</Link>
        <div className="font-black text-xl tracking-tighter">IRON<span className="text-red-500">FORGE</span></div>
        <Magnetic strength={0.25}>
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-red-500 hover:bg-red-400 text-white text-[10px] font-black px-6 py-3 tracking-[0.3em] uppercase">
            Join now
          </motion.button>
        </Magnetic>
      </nav>

      {/* HERO — full-bleed athlete photo with text overlay */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Full-bleed background image with parallax */}
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <Image src={HERO_IMG} alt="Athlete training" fill className="object-cover object-center" priority />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

        {/* Diagonal red slash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: "-100%", skewX: -15 }}
            animate={{ x: "120%" }}
            transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 w-2 bg-red-500/60 blur-sm"
          />
        </div>

        <motion.div style={{ y: textY, opacity }} className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 pt-20">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8">
            <motion.div animate={{ scaleX: [1, 1.8, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-0.5 bg-red-500" />
            <span className="text-red-500 text-[10px] font-black tracking-[0.5em] uppercase">No limits. No mercy.</span>
          </motion.div>

          {/* Massive impact headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none text-white"
              style={{ lineHeight: 0.85 }}
            >
              BREAK
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none text-red-500"
              style={{ lineHeight: 0.85, WebkitTextStroke: "2px #ef4444", color: "transparent" }}
            >
              LIMITS.
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex gap-4 mt-12">
            <Magnetic strength={0.2}>
              <motion.button whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.95, y: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-red-500 text-white font-black text-sm px-10 py-5 tracking-[0.3em] uppercase">
                Start training →
              </motion.button>
            </Magnetic>
            <motion.button whileHover={{ borderColor: "#ef4444", color: "#ef4444" }} whileTap={{ scale: 0.95 }}
              className="border-2 border-zinc-700 text-zinc-500 font-black text-sm px-10 py-5 tracking-[0.3em] uppercase transition-colors">
              View programs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[9px] tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
        </motion.div>
      </section>

      {/* Stats — red bar */}
      <section className="py-14 bg-red-500">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[["50K+","Athletes"],["94%","Goal rate"],["#1","Rated 2024"],["0","Excuses"]].map(([n,l],i) => (
            <ClipReveal key={l} direction="bottom" delay={i*0.08} className="text-center">
              <div className="text-4xl font-black text-white mb-1">{n}</div>
              <div className="text-red-200 text-[10px] font-bold tracking-[0.3em] uppercase">{l}</div>
            </ClipReveal>
          ))}
        </div>
      </section>

      {/* Programs — large image cards */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <ClipReveal direction="left" className="mb-4">
            <p className="text-red-500 text-[10px] font-black tracking-[0.5em] uppercase">Choose your weapon</p>
          </ClipReveal>
          <ClipReveal direction="left" delay={0.1} className="mb-12">
            <h2 className="text-6xl font-black tracking-tighter">Training Programs</h2>
          </ClipReveal>
          <div className="space-y-3">
            {programs.map((p, i) => <ProgramCard key={p.name} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA — full-bleed athlete image */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={ATHLETE_IMG} alt="Athlete" fill className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-red-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10">
          <h2 className="text-7xl font-black tracking-tighter mb-4">READY?</h2>
          <p className="text-red-200 mb-10 text-xl">Your excuses don&apos;t live here.</p>
          <Magnetic>
            <motion.button whileHover={{ scale: 1.08, backgroundColor: "#000", color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white text-red-500 font-black px-14 py-6 text-sm tracking-[0.3em] uppercase shadow-2xl">
              Begin today — free trial
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
