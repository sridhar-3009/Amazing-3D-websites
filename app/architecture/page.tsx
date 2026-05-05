"use client";
// Layout: PHOTO + BLUEPRINT OVERLAY — large architectural photo reveals with clip-path,
// blueprint grid drawn over it, projects show full-width photos on hover
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic } from "../components/motion-primitives";

const HERO_IMG = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80";
const ARCH2    = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";
const ARCH3    = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80";
const ARCH4    = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80";
const ARCH5    = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";

const projects = [
  { name: "The Fold House",   location: "Oslo, Norway",        year: "2024", type: "Residential", img: ARCH2 },
  { name: "Meridian Tower",   location: "Singapore",           year: "2023", type: "Commercial",  img: ARCH3 },
  { name: "Coastal Pavilion", location: "Lisbon, Portugal",    year: "2023", type: "Cultural",    img: ARCH4 },
  { name: "Ridge Atelier",    location: "Zurich, Switzerland", year: "2022", type: "Mixed-use",   img: ARCH5 },
];

function ProjectRow({ p, i }: { p: typeof projects[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative border-b border-slate-800 group overflow-hidden"
    >
      {/* Full-width image reveal on hover */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, scaleY: hov ? 1 : 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image src={p.img} alt={p.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-slate-950/75" />
      </motion.div>

      <motion.div
        animate={{ x: hov ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 grid grid-cols-12 items-center gap-4 py-8 px-0"
      >
        <div className="col-span-1 text-slate-700 text-xs font-mono">0{i + 1}</div>
        <div className="col-span-5">
          <div className={`text-2xl font-light transition-colors duration-300 ${hov ? "text-white" : "text-slate-200"}`}>{p.name}</div>
          <div className="text-slate-500 text-sm mt-1">{p.location}</div>
        </div>
        <div className="col-span-2 text-slate-500 text-sm">{p.type}</div>
        <div className="col-span-2 text-slate-600 text-sm">{p.year}</div>
        <motion.div animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -10 }}
          className="col-span-2 text-right text-slate-300 text-xl">→</motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ArchitecturePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden cursor-none">
      <CustomCursor color="#94a3b8" />
      <ScrollProgress color="#64748b" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-10 py-5 border-b border-slate-800/40 backdrop-blur-md">
        <Link href="/" className="text-slate-700 text-[10px] tracking-[0.4em] hover:text-slate-300 transition-colors uppercase">← Home</Link>
        <div className="text-sm tracking-[0.35em] uppercase font-light">Halvorsen Studio</div>
        <div className="text-slate-700 text-[10px] tracking-[0.3em] uppercase">Est. 2009</div>
      </nav>

      {/* HERO — large photo with blueprint overlay + clip-path reveal */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <Image src={HERO_IMG} alt="Architecture" fill className="object-cover object-center" priority />
        </motion.div>

        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <motion.div style={{ opacity }} className="relative z-10 flex flex-col justify-end min-h-screen pb-24 px-10 md:px-16">
          <ClipReveal direction="bottom" delay={0.4}>
            <p className="text-slate-600 text-[10px] tracking-[0.6em] uppercase mb-8">Architecture & urbanism · Oslo</p>
          </ClipReveal>

          <h1 className="text-7xl md:text-[9vw] font-thin tracking-tight leading-none text-slate-100 mb-8">
            <WordReveal text="Space is" className="block" stagger={0.12} delay={0.5} />
            <WordReveal text="not empty." className="block" stagger={0.12} delay={0.8} />
            <WordReveal text="It waits." className="block italic text-slate-500" stagger={0.12} delay={1.1} />
          </h1>

          <div className="flex items-end justify-between gap-8">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-slate-500 max-w-sm text-sm leading-relaxed">
              We design buildings that hold their breath. Projects that earn their place in the landscape.
            </motion.p>

            {/* Quick numbers */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
              className="flex gap-10 shrink-0">
              {[["62","Projects"],["14","Countries"],["15yr","Practice"]].map(([v,l]) => (
                <div key={l} className="text-right">
                  <div className="text-slate-300 text-2xl font-light">{v}</div>
                  <div className="text-slate-700 text-[9px] uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Vertical line */}
        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute right-16 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      </section>

      {/* Projects — full-width image rows */}
      <section className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-4">
            <ClipReveal direction="left">
              <p className="text-slate-600 text-[10px] tracking-[0.5em] uppercase">Selected work</p>
            </ClipReveal>
          </div>
          <ClipReveal direction="left" delay={0.1} className="mb-12">
            <h2 className="text-4xl font-thin">2022 – 2024</h2>
          </ClipReveal>

          <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}}
            style={{originX:0}} transition={{duration:1}} className="h-px bg-slate-800 mb-0" />
          {projects.map((p, i) => <ProjectRow key={p.name} p={p} i={i} />)}
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="py-4 px-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {[HERO_IMG, ARCH2, ARCH3, ARCH4, ARCH5, HERO_IMG, ARCH2, ARCH3, ARCH4, ARCH5].map((img, i) => (
            <div key={i} className="relative w-72 h-48 shrink-0 overflow-hidden">
              <Image src={img} alt="" fill className="object-cover opacity-40 hover:opacity-80 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Principles */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            ["01","Material honesty","We do not disguise structure."],
            ["02","Site as teacher","The land tells us where to build."],
            ["03","Light as material","Shadow is as important as form."],
            ["04","Long view","We build for a century, not a trend cycle."],
          ].map(([n,t,d],i) => (
            <motion.div key={t}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}}
              transition={{duration:0.7,delay:i*0.12,ease:[0.22,1,0.36,1]}}>
              <Tilt3D intensity={8} className="h-full">
                <div className="text-slate-700 font-mono text-xs mb-4">{n}</div>
                <div className="h-px bg-slate-800 w-10 mb-5" />
                <h3 className="text-slate-200 font-light text-lg mb-2">{t}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{d}</p>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA with photo */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={ARCH3} alt="Architecture" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-slate-950/85" />
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:1}} className="relative">
          <p className="text-slate-600 text-[10px] tracking-[0.6em] uppercase mb-6">New commissions</p>
          <h2 className="text-4xl font-thin mb-10">Tell us about your project.</h2>
          <Magnetic>
            <motion.button whileHover={{scale:1.05,borderColor:"#94a3b8",color:"#e2e8f0"}}
              whileTap={{scale:0.97}} transition={{type:"spring",stiffness:300,damping:20}}
              className="border border-slate-700 text-slate-500 px-14 py-5 text-[10px] tracking-[0.5em] uppercase transition-colors">
              Begin conversation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
