"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const collection = [
  { name: "Obsidian", material: "Black Caiman", price: "€4,200", tag: "SOLD OUT" },
  { name: "Ivoire", material: "Veau Lisse", price: "€3,800", tag: "NEW" },
  { name: "Nuit", material: "Suède Velvet", price: "€5,100", tag: "" },
  { name: "Sable", material: "Python Naturel", price: "€6,900", tag: "LIMITED" },
];

const values = [
  { label: "Maison founded", value: "1887" },
  { label: "Artisans", value: "43" },
  { label: "Hours per piece", value: "120+" },
  { label: "Countries", value: "12" },
];

export default function LuxuryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <Link href="/" className="text-stone-600 text-xs tracking-widest hover:text-stone-300 transition-colors uppercase">← Portfolio</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center"
        >
          <div className="text-xl tracking-[0.4em] uppercase font-light">Maison Verre</div>
          <div className="text-stone-600 text-[9px] tracking-[0.5em] uppercase mt-0.5">Paris · Since 1887</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-stone-600 text-xs tracking-widest uppercase hover:text-stone-300 transition-colors cursor-pointer"
        >
          Collection
        </motion.div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,184,150,0.06),transparent_60%)]" />

        <motion.div style={{ y: textY, opacity }} className="relative z-10 px-10 max-w-7xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-500 text-xs tracking-[0.5em] uppercase mb-8"
          >
            Automne — Hiver 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[10vw] font-thin tracking-tight leading-none mb-6 text-stone-100"
          >
            L&apos;Art de<br />
            <span className="italic text-[#d4b896]">la Peau.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-500 max-w-sm text-sm leading-relaxed tracking-wide"
          >
            Each piece is a conversation between material and maker.
            Crafted by hand in our Paris atelier over 120 hours.
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent"
        />
      </section>

      {/* Values row */}
      <section className="py-16 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-3xl font-thin text-[#d4b896] mb-1">{v.value}</div>
              <div className="text-stone-600 text-xs tracking-widest uppercase">{v.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collection */}
      <section className="py-32 px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="text-3xl font-thin tracking-wide">La Collection</h2>
            <span className="text-stone-600 text-xs tracking-widest uppercase">Pièces sélectionnées</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {collection.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="aspect-[3/4] bg-gradient-to-b from-stone-800 to-stone-900 mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent z-10" />
                    {item.tag && (
                      <div className="absolute top-4 left-4 z-20 text-[9px] tracking-[0.3em] uppercase text-stone-400 border border-stone-700 px-2 py-1">
                        {item.tag}
                      </div>
                    )}
                    {/* Simulated leather texture */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,184,150,0.05) 2px, rgba(212,184,150,0.05) 4px)`,
                      }}
                    />
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-light tracking-widest uppercase text-sm">{item.name}</h3>
                      <span className="text-[#d4b896] text-sm">{item.price}</span>
                    </div>
                    <p className="text-stone-600 text-xs tracking-wider mt-0.5">{item.material}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Brand statement */}
      <section className="py-32 px-10 border-t border-stone-800">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-stone-500 text-xs tracking-[0.5em] uppercase mb-8">Le savoir-faire</p>
          <p className="text-3xl md:text-4xl font-thin leading-relaxed text-stone-200">
            &ldquo;We do not make objects.<br />
            We make <em className="text-[#d4b896]">memories</em> in leather.&rdquo;
          </p>
          <p className="text-stone-600 text-sm mt-8 tracking-widest uppercase">— Henri Verre, Fondateur</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-10 text-center border-t border-stone-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-stone-500 text-xs tracking-[0.5em] uppercase mb-6">Private appointments</p>
          <h2 className="text-3xl font-thin mb-8">Experience the atelier.</h2>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#d4b896" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-[#d4b896] text-[#d4b896] px-12 py-4 text-xs tracking-[0.4em] uppercase font-light"
          >
            Request invitation
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
