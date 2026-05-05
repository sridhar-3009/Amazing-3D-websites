"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";

const projects = [
  { name: "The Fold House", location: "Oslo, Norway", year: "2024", type: "Residential", area: "420 m²" },
  { name: "Meridian Tower", location: "Singapore", year: "2023", type: "Commercial", area: "14,200 m²" },
  { name: "Coastal Pavilion", location: "Lisbon, Portugal", year: "2023", type: "Cultural", area: "880 m²" },
  { name: "Ridge Atelier", location: "Zurich, Switzerland", year: "2022", type: "Mixed-use", area: "2,100 m²" },
];

const principles = [
  { number: "01", title: "Material honesty", desc: "We do not disguise structure. Every surface reveals its nature." },
  { number: "02", title: "Site as teacher", desc: "Each project begins with listening. The land tells us where to build." },
  { number: "03", title: "Light as material", desc: "Shadow is as important as form. We design both with equal intention." },
  { number: "04", title: "Long view", desc: "We build for a century. Not a decade, not a trend cycle." },
];

export default function ArchitecturePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-slate-800/50 backdrop-blur-md">
        <Link href="/" className="text-slate-600 text-xs tracking-widest hover:text-slate-300 transition-colors uppercase">← Back</Link>
        <div className="text-sm tracking-[0.3em] uppercase font-light">Halvorsen Studio</div>
        <div className="text-slate-600 text-xs tracking-widest uppercase">Est. 2009</div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="grid grid-cols-12 gap-6 items-end min-h-[80vh]">
            <div className="col-span-12 md:col-span-7 self-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-slate-600 text-xs tracking-[0.5em] uppercase mb-8"
              >
                Architecture & urbanism
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-thin tracking-tight leading-none mb-8 text-slate-100"
              >
                Space is<br />
                not empty.<br />
                <span className="text-slate-500 italic">It waits.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-slate-500 max-w-sm leading-relaxed text-sm"
              >
                We design buildings that hold their breath. Projects that earn their place.
                Work that outlives the conversation around it.
              </motion.p>
            </div>

            <div className="col-span-12 md:col-span-5 self-end">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-slate-700 pl-8 pb-8"
              >
                <div className="text-slate-600 text-xs tracking-widest uppercase mb-6">Selected numbers</div>
                {[
                  ["15", "Years practice"],
                  ["62", "Projects completed"],
                  ["14", "Countries"],
                  ["3", "Pritzker mentors"],
                ].map(([num, label]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-slate-800/50">
                    <span className="text-slate-400 text-sm">{label}</span>
                    <span className="text-slate-200 font-light">{num}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Structural line */}
        <motion.div
          style={{ scaleY: lineScale, originY: 0 }}
          className="absolute right-10 top-20 bottom-20 w-px bg-slate-800"
        />
      </section>

      {/* Projects */}
      <section className="py-32 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-baseline justify-between mb-16"
          >
            <h2 className="text-3xl font-thin tracking-wide">Selected work</h2>
            <span className="text-slate-600 text-xs tracking-widest uppercase">2022–2024</span>
          </motion.div>

          <div className="space-y-0">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setActiveProject(i)}
                onHoverEnd={() => setActiveProject(null)}
                className="group border-t border-slate-800 py-10 cursor-pointer"
              >
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-1 text-slate-700 text-sm">0{i + 1}</div>
                  <motion.div
                    animate={{ x: activeProject === i ? 12 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="col-span-5"
                  >
                    <div className="text-slate-100 text-2xl font-light group-hover:text-white transition-colors">{p.name}</div>
                    <div className="text-slate-600 text-sm mt-1">{p.location}</div>
                  </motion.div>
                  <div className="col-span-2 text-slate-600 text-sm">{p.type}</div>
                  <div className="col-span-2 text-slate-600 text-sm">{p.area}</div>
                  <div className="col-span-1 text-slate-700 text-sm">{p.year}</div>
                  <motion.div
                    animate={{ opacity: activeProject === i ? 1 : 0, x: activeProject === i ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="col-span-1 text-right text-slate-400 text-lg"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-slate-800" />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-32 px-10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-thin tracking-wide">How we work</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-slate-700 text-xs tracking-widest mb-4">{p.number}</div>
                <h3 className="text-slate-200 font-light text-lg mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center border-t border-slate-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-slate-600 text-xs tracking-[0.5em] uppercase mb-6">New commissions</p>
          <h2 className="text-4xl font-thin mb-10">Tell us about your project.</h2>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-slate-600 hover:border-slate-300 text-slate-400 hover:text-slate-100 px-12 py-4 text-xs tracking-[0.4em] uppercase transition-colors"
          >
            Begin conversation
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
