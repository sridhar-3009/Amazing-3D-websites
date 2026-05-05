"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal } from "./components/motion-primitives";

const genres = [
  { slug: "tech",         label: "Tech / SaaS",               desc: "Dashboard reveals · floating UI · typing code",  color: "from-blue-950 to-indigo-900",   accent: "#6366f1", num: "01" },
  { slug: "luxury",       label: "Luxury / Fashion",           desc: "Cinematic fades · clip-path · slow parallax",    color: "from-stone-950 to-zinc-900",    accent: "#d4b896", num: "02" },
  { slug: "fitness",      label: "Fitness / Sports",           desc: "Kinetic slamming type · energy · impact",        color: "from-zinc-950 to-red-950",      accent: "#ef4444", num: "03" },
  { slug: "food",         label: "Food / Restaurant",          desc: "Warm reveals · scroll feast · ingredients",      color: "from-amber-950 to-orange-900",  accent: "#f59e0b", num: "04" },
  { slug: "architecture", label: "Architecture",               desc: "Blueprint lines · structural wipes · precision",  color: "from-slate-950 to-gray-900",    accent: "#94a3b8", num: "05" },
  { slug: "music",        label: "Music / Creative",           desc: "Cursor orb · waveform · generative chaos",       color: "from-violet-950 to-purple-900", accent: "#a855f7", num: "06" },
  { slug: "finance",      label: "Finance / Fintech",          desc: "Number counters · 3D charts · ticker",           color: "from-emerald-950 to-teal-900",  accent: "#10b981", num: "07" },
  { slug: "health",       label: "Healthcare / Wellness",      desc: "Breathing orbs · soft particles · gentle depth",  color: "from-sky-950 to-cyan-900",      accent: "#06b6d4", num: "08" },
];

function GenreCard({ g, i }: { g: typeof genres[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 400, damping: 30 });
  const glowOpacity = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(py * -12);
    y.set(px * 12);
    glowOpacity.set(0.15);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <Link href={`/${g.slug}`}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={() => { x.set(0); y.set(0); glowOpacity.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02, z: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`relative bg-gradient-to-br ${g.color} h-72 flex flex-col justify-between p-8 overflow-hidden cursor-pointer group`}
        >
          {/* Radial glow on hover */}
          <motion.div
            style={{ opacity: glowOpacity, background: `radial-gradient(circle at 50% 50%, ${g.accent}, transparent 70%)` }}
            className="absolute inset-0"
          />
          {/* Scan line */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
            className="absolute inset-x-0 h-px opacity-10"
            style={{ background: `linear-gradient(90deg, transparent, ${g.accent}, transparent)` }}
          />
          {/* 3D inner layer - depth */}
          <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
            <div className="flex items-start justify-between mb-auto">
              <span className="text-xs font-mono opacity-20">{g.num}</span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: g.accent }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </div>
          </div>

          <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
            <h2 className="text-lg font-semibold text-white mb-2 leading-tight">{g.label}</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">{g.desc}</p>
          </div>

          {/* Corner accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: i * 0.07 + 0.3 }}
            style={{ originX: 0, backgroundColor: g.accent }}
            className="absolute bottom-0 left-0 h-0.5 w-full opacity-30"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden cursor-none">
      <CustomCursor color="white" />
      <ScrollProgress color="#6366f1" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Ambient orbs */}
        {[
          { c: "#6366f1", x: "20%", y: "30%" },
          { c: "#a855f7", x: "75%", y: "60%" },
          { c: "#06b6d4", x: "50%", y: "80%" },
        ].map((o, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ background: o.c, left: o.x, top: o.y, transform: "translate(-50%, -50%)" }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto">
          <ClipReveal direction="top" delay={0.2}>
            <p className="text-xs uppercase tracking-[0.5em] text-zinc-600 mb-6">8 genre-defining pages</p>
          </ClipReveal>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
            <WordReveal text="Amazing" className="block" stagger={0.1} />
            <WordReveal text="3D Websites" className="block text-transparent" stagger={0.1} delay={0.2}
            />
          </h1>

          {/* Outline text effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-transparent pointer-events-none select-none opacity-[0.03]"
            style={{ WebkitTextStroke: "1px white" }}>
            WEB
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-zinc-500 text-lg max-w-lg mx-auto mb-12"
          >
            Each page. Different motion language. Different industry. All agency-tier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-zinc-700 text-xs tracking-widest uppercase"
            >
              <span>Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Genre grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border-t border-zinc-900">
        {genres.map((g, i) => <GenreCard key={g.slug} g={g} i={i} />)}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-700 text-xs tracking-widest uppercase"
        >
          Built with Claude Code · Motion · Next.js
        </motion.p>
      </footer>
    </main>
  );
}
