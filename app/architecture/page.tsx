"use client";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic, SectionLabel } from "../components/motion-primitives";

const projects = [
  { name: "The Fold House",    location: "Oslo, Norway",          year: "2024", type: "Residential", area: "420 m²" },
  { name: "Meridian Tower",    location: "Singapore",             year: "2023", type: "Commercial",  area: "14,200 m²" },
  { name: "Coastal Pavilion",  location: "Lisbon, Portugal",      year: "2023", type: "Cultural",    area: "880 m²" },
  { name: "Ridge Atelier",     location: "Zurich, Switzerland",   year: "2022", type: "Mixed-use",   area: "2,100 m²" },
];

const principles = [
  { number: "01", title: "Material honesty",   desc: "We do not disguise structure. Every surface reveals its nature." },
  { number: "02", title: "Site as teacher",     desc: "Each project begins with listening. The land tells us where to build." },
  { number: "03", title: "Light as material",   desc: "Shadow is as important as form. We design both with equal intention." },
  { number: "04", title: "Long view",           desc: "We build for a century. Not a decade, not a trend cycle." },
];

/* Blueprint SVG line animation */
function BlueprintGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bp" width="80" height="80" patternUnits="userSpaceOnUse">
          <motion.path
            d="M 80 0 L 0 0 0 80"
            stroke="#94a3b8"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp)" />
    </svg>
  );
}

function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
      className={`h-px bg-slate-700 ${className}`}
    />
  );
}

export default function ArchitecturePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden cursor-none">
      <CustomCursor color="#94a3b8" />
      <ScrollProgress color="#64748b" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-slate-800/40 backdrop-blur-md">
        <Link href="/" className="text-slate-700 text-[10px] tracking-[0.4em] hover:text-slate-300 transition-colors uppercase">← Back</Link>
        <div className="text-sm tracking-[0.35em] uppercase font-light">Halvorsen Studio</div>
        <div className="text-slate-700 text-[10px] tracking-[0.3em] uppercase">Est. 2009</div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <BlueprintGrid />

        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="grid grid-cols-12 gap-6 items-end min-h-[80vh]">
            <div className="col-span-12 md:col-span-7 self-center">
              <ClipReveal direction="bottom" delay={0.4}>
                <p className="text-slate-600 text-[10px] tracking-[0.6em] uppercase mb-8">Architecture & urbanism</p>
              </ClipReveal>

              <div className="mb-8" style={{ perspective: 800 }}>
                <h1 className="text-6xl md:text-8xl font-thin tracking-tight leading-none text-slate-100">
                  <WordReveal text="Space is" className="block" stagger={0.12} delay={0.5} />
                  <WordReveal text="not empty." className="block" stagger={0.12} delay={0.8} />
                  <WordReveal text="It waits." className="block italic text-slate-600" stagger={0.12} delay={1.1} />
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-slate-600 max-w-sm leading-relaxed text-sm"
              >
                We design buildings that hold their breath. Projects that earn their place.
              </motion.p>
            </div>

            <div className="col-span-12 md:col-span-5 self-end">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={6} className="border-l border-slate-800 pl-8 pb-8">
                  <div className="text-slate-600 text-[10px] tracking-[0.4em] uppercase mb-6">Selected numbers</div>
                  {[
                    ["15", "Years practice"],
                    ["62", "Projects"],
                    ["14", "Countries"],
                    ["3",  "Pritzker mentors"],
                  ].map(([num, label], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                      className="flex justify-between py-3 border-b border-slate-800/50 group hover:border-slate-600/50 transition-colors"
                    >
                      <span className="text-slate-500 text-sm">{label}</span>
                      <span className="text-slate-200 font-light">{num}</span>
                    </motion.div>
                  ))}
                </Tilt3D>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vertical structural line */}
        <motion.div style={{ opacity: lineOpacity }} className="absolute right-10 top-20 bottom-20">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="w-px h-full bg-gradient-to-b from-slate-700 via-slate-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-32 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-10">
          <SectionLabel number="01" label="Selected work" />
          <ClipReveal direction="left" className="mb-16">
            <h2 className="text-4xl font-thin tracking-wide">2022 – 2024</h2>
          </ClipReveal>
          <DrawLine className="mb-0" />

          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setActiveProject(i)}
              onHoverEnd={() => setActiveProject(null)}
              className="group border-b border-slate-800 py-10 cursor-pointer relative overflow-hidden"
            >
              {/* Hover fill */}
              <motion.div
                animate={{ scaleX: activeProject === i ? 1 : 0 }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-slate-900/50"
                transition={{ duration: 0.3 }}
              />
              <div className="relative grid grid-cols-12 items-center gap-4">
                <div className="col-span-1 text-slate-700 text-xs font-mono">0{i + 1}</div>
                <motion.div
                  animate={{ x: activeProject === i ? 16 : 0 }}
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
                  animate={{ opacity: activeProject === i ? 1 : 0, x: activeProject === i ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                  className="col-span-1 text-right text-slate-400 text-xl"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="py-32 px-10 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="02" label="How we work" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={8} className="h-full">
                  <div className="text-slate-700 text-xs font-mono tracking-widest mb-4">{p.number}</div>
                  <DrawLine delay={0.2 + i * 0.1} className="mb-5 w-12" />
                  <h3 className="text-slate-200 font-light text-lg mb-3">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </Tilt3D>
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
          <p className="text-slate-700 text-[10px] tracking-[0.6em] uppercase mb-6">New commissions</p>
          <h2 className="text-4xl font-thin mb-10">Tell us about your project.</h2>
          <Magnetic strength={0.25}>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#94a3b8", color: "#e2e8f0" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-slate-700 text-slate-500 px-14 py-5 text-[10px] tracking-[0.5em] uppercase transition-colors"
            >
              Begin conversation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
