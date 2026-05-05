"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, ClipReveal, WordReveal, Magnetic, Tilt3D, SectionLabel } from "../components/motion-primitives";

const collection = [
  { name: "Obsidian", material: "Black Caiman", price: "€4,200", tag: "SOLD OUT" },
  { name: "Ivoire",   material: "Veau Lisse",   price: "€3,800", tag: "NEW" },
  { name: "Nuit",     material: "Suède Velvet",  price: "€5,100", tag: "" },
  { name: "Sable",    material: "Python Naturel", price: "€6,900", tag: "LIMITED" },
];

const values = [
  { label: "Maison founded", value: "1887" },
  { label: "Artisans",       value: "43" },
  { label: "Hours per piece", value: "120+" },
  { label: "Countries",      value: "12" },
];

function LeatherCard({ item, i }: { item: typeof collection[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(y, { stiffness: 300, damping: 30 });
  const rotY = useSpring(x, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          x.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
          y.set(-((e.clientY - rect.top) / rect.height - 0.5) * 10);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="group cursor-pointer"
      >
        {/* Card face */}
        <div className="aspect-[3/4] bg-gradient-to-b from-stone-800 to-stone-900 relative overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent z-10" />
          {/* Leather texture simulation */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,184,150,0.1) 2px, rgba(212,184,150,0.1) 4px)" }}
          />
          {/* Shimmer sweep */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 + i * 0.5 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-20"
          />
          {item.tag && (
            <div className="absolute top-4 left-4 z-30 text-[9px] tracking-[0.35em] uppercase text-stone-400 border border-stone-700 px-2 py-1 backdrop-blur-sm">
              {item.tag}
            </div>
          )}
          {/* 3D depth label */}
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            className="absolute bottom-4 left-4 z-30 text-[#d4b896] text-2xl font-thin italic"
          >
            {item.name}
          </motion.div>
        </div>
        <div className="px-1 flex justify-between items-baseline">
          <p className="text-stone-600 text-xs tracking-wider">{item.material}</p>
          <span className="text-[#d4b896] text-sm">{item.price}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LuxuryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden cursor-none">
      <CustomCursor color="#d4b896" />
      <ScrollProgress color="#d4b896" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <Link href="/" className="text-stone-700 text-[10px] tracking-[0.4em] hover:text-stone-400 transition-colors uppercase">← Portfolio</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }} className="text-center">
          <div className="text-xl tracking-[0.4em] uppercase font-light">Maison Verre</div>
          <div className="text-stone-700 text-[9px] tracking-[0.5em] uppercase mt-0.5">Paris · Since 1887</div>
        </motion.div>
        <Magnetic strength={0.2}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-stone-700 text-[10px] tracking-[0.4em] uppercase hover:text-stone-400 transition-colors cursor-pointer">
            Collection
          </motion.div>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-28 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(212,184,150,0.06),transparent_65%)]" />

        {/* Floating text watermark */}
        <motion.div
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-0 right-0 text-[18vw] font-thin tracking-tighter text-stone-900 select-none pointer-events-none whitespace-nowrap overflow-hidden"
        >
          MAISON VERRE MAISON VERRE
        </motion.div>

        <motion.div style={{ y: textY, opacity }} className="relative z-10 px-10 max-w-7xl w-full">
          <ClipReveal direction="bottom" delay={0.6}>
            <p className="text-stone-600 text-[10px] tracking-[0.6em] uppercase mb-8">Automne — Hiver 2025</p>
          </ClipReveal>

          <h1 className="text-6xl md:text-8xl lg:text-[9vw] font-thin tracking-tight leading-none mb-8">
            <WordReveal text="L'Art de" className="block" stagger={0.12} delay={0.8} />
            <WordReveal text="la Peau." className="block italic text-[#d4b896]" stagger={0.12} delay={1.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-stone-600 max-w-sm text-sm leading-relaxed tracking-wide"
          >
            Each piece is a conversation between material and maker.
            Crafted by hand in our Paris atelier over 120 hours.
          </motion.p>
        </motion.div>

        {/* Vertical line accent */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute right-16 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-stone-700 to-transparent"
        />

        {/* Bottom rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent"
        />
      </section>

      {/* Values */}
      <section className="py-16 border-b border-stone-800/60">
        <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {values.map((v, i) => (
            <ClipReveal key={v.label} direction="bottom" delay={i * 0.1} className="text-center">
              <div className="text-3xl font-thin text-[#d4b896] mb-2">{v.value}</div>
              <div className="text-stone-700 text-[10px] tracking-[0.4em] uppercase">{v.label}</div>
            </ClipReveal>
          ))}
        </div>
      </section>

      {/* Collection */}
      <section className="py-32 px-10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="01" label="La Collection" />
          <div className="flex items-baseline justify-between mb-16">
            <ClipReveal direction="left">
              <h2 className="text-4xl font-thin tracking-wide">Pièces sélectionnées</h2>
            </ClipReveal>
            <span className="text-stone-700 text-[10px] tracking-[0.4em] uppercase hidden md:block">Automne 2025</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {collection.map((item, i) => <LeatherCard key={item.name} item={item} i={i} />)}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-32 px-10 border-t border-stone-800/60 bg-stone-900/20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            animate={{ scaleX: [0.3, 1, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-16 h-px bg-[#d4b896] mx-auto mb-12 opacity-40"
          />
          <p className="text-3xl md:text-4xl font-thin leading-relaxed text-stone-300 italic">
            &ldquo;We do not make objects.<br />
            We make <span className="text-[#d4b896]">memories</span> in leather.&rdquo;
          </p>
          <p className="text-stone-700 text-xs mt-10 tracking-[0.5em] uppercase">— Henri Verre, Fondateur</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center border-t border-stone-800/60">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-stone-700 text-[10px] tracking-[0.6em] uppercase mb-6">Private appointments</p>
          <h2 className="text-4xl font-thin mb-10">Experience the atelier.</h2>
          <Magnetic strength={0.25}>
            <motion.button
              whileHover={{ scale: 1.06, backgroundColor: "#d4b896", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-[#d4b896] text-[#d4b896] px-14 py-5 text-[10px] tracking-[0.5em] uppercase font-light"
            >
              Request invitation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
