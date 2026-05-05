"use client";
import { motion } from "motion/react";
import Link from "next/link";

const genres = [
  { slug: "tech", label: "Tech / SaaS", desc: "Dashboard reveals, floating UI", color: "from-blue-950 to-indigo-900", accent: "#6366f1" },
  { slug: "luxury", label: "Luxury / Fashion", desc: "Cinematic fades, slow parallax", color: "from-stone-950 to-zinc-900", accent: "#d4b896" },
  { slug: "fitness", label: "Fitness / Sports", desc: "Kinetic type, energy bursts", color: "from-zinc-950 to-red-950", accent: "#ef4444" },
  { slug: "food", label: "Food / Restaurant", desc: "Warm reveals, scroll feast", color: "from-amber-950 to-orange-900", accent: "#f59e0b" },
  { slug: "architecture", label: "Architecture / Real Estate", desc: "Minimal, structural reveals", color: "from-slate-950 to-gray-900", accent: "#94a3b8" },
  { slug: "music", label: "Music / Creative", desc: "Generative, cursor-reactive chaos", color: "from-violet-950 to-purple-900", accent: "#a855f7" },
  { slug: "finance", label: "Finance / Fintech", desc: "Clean confidence, number animations", color: "from-emerald-950 to-teal-900", accent: "#10b981" },
  { slug: "health", label: "Healthcare / Wellness", desc: "Soft breathing motion", color: "from-sky-950 to-cyan-900", accent: "#06b6d4" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center min-h-[40vh] px-6 pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">8 Genre Pages</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Amazing 3D Websites
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Each page. Different motion language. Different industry. All agency-tier.
          </p>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border-t border-zinc-800">
        {genres.map((g, i) => (
          <motion.div
            key={g.slug}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/${g.slug}`}>
              <motion.div
                className={`relative bg-gradient-to-br ${g.color} p-8 h-64 flex flex-col justify-between group cursor-pointer overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${g.accent}, transparent 70%)` }}
                />
                <div>
                  <div className="w-2 h-2 rounded-full mb-6" style={{ background: g.accent }} />
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">0{i + 1}</p>
                  <h2 className="text-xl font-semibold text-white leading-tight">{g.label}</h2>
                </div>
                <p className="text-zinc-400 text-sm">{g.desc}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
