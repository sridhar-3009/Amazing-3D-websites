"use client";
// Layout: EDITORIAL SPLIT — full-height image right 55%, text left 45%, type bleeds over the boundary
// Unique: image stays fixed while text scrolls; collection uses oversized hover reveals
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Magnetic } from "../components/motion-primitives";

const HERO_IMG   = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80";
const BAG_IMG    = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80";
const FASHION2   = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80";
const WATCH_IMG  = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
const PERFUME    = "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80";

const collection = [
  { name: "Obsidian",  material: "Black Caiman", price: "€4,200", img: BAG_IMG,   tag: "SOLD OUT" },
  { name: "Ivoire",   material: "Veau Lisse",   price: "€3,800", img: FASHION2,  tag: "NEW" },
  { name: "Nuit",     material: "Suède Velvet",  price: "€5,100", img: WATCH_IMG, tag: "" },
  { name: "Sable",    material: "Python Naturel", price: "€6,900", img: PERFUME,  tag: "LIMITED" },
];

function CollectionItem({ item, i }: { item: typeof collection[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4">
        <motion.div animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0">
          <Image src={item.img} alt={item.name} fill className="object-cover" />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />

        {item.tag && (
          <div className="absolute top-4 left-4 text-[9px] tracking-[0.35em] uppercase text-stone-300 border border-stone-500/60 px-2 py-1 backdrop-blur-sm bg-stone-950/40">
            {item.tag}
          </div>
        )}

        {/* Shimmer on hover */}
        <motion.div
          animate={{ x: hovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Bottom name overlay */}
        <motion.div
          animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="text-white font-thin text-2xl italic tracking-wide">{item.name}</div>
        </motion.div>
      </div>

      <div className="flex justify-between items-baseline px-1">
        <div>
          <div className="text-stone-300 text-sm font-light tracking-widest uppercase">{item.name}</div>
          <div className="text-stone-600 text-xs tracking-wider mt-0.5">{item.material}</div>
        </div>
        <div className="text-[#d4b896] font-light">{item.price}</div>
      </div>
    </motion.div>
  );
}

export default function LuxuryPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden cursor-none">
      <CustomCursor color="#d4b896" />
      <ScrollProgress color="#d4b896" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 mix-blend-difference">
        <Link href="/" className="text-white text-[10px] tracking-[0.4em] hover:opacity-60 transition-opacity uppercase">← Portfolio</Link>
        <div className="text-center">
          <div className="text-white text-lg tracking-[0.4em] uppercase font-thin">Maison Verre</div>
        </div>
        <div className="text-white text-[10px] tracking-[0.4em] uppercase cursor-pointer hover:opacity-60 transition-opacity">Collection</div>
      </nav>

      {/* HERO — editorial split layout */}
      <section ref={scrollRef} className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[45%_55%]">
        {/* LEFT: Text panel */}
        <motion.div style={{ y: textY }}
          className="relative z-10 flex flex-col justify-end pb-24 px-10 lg:px-16 pt-32 lg:pt-0 bg-stone-950">
          <ClipReveal direction="bottom" delay={0.5}>
            <p className="text-stone-600 text-[10px] tracking-[0.6em] uppercase mb-8">Automne — Hiver 2025</p>
          </ClipReveal>

          <h1 className="text-6xl md:text-7xl font-thin tracking-tight leading-none mb-8 text-stone-100">
            <WordReveal text="L'Art de" className="block" stagger={0.12} delay={0.6} />
            <WordReveal text="la Peau." className="block italic text-[#d4b896]" stagger={0.12} delay={0.9} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-stone-500 max-w-xs text-sm leading-relaxed mb-12 tracking-wide">
            Each piece is a conversation between material and maker.
            120 hours. One pair of hands. Paris, always.
          </motion.p>

          <Magnetic strength={0.25}>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              whileHover={{ scale: 1.04, backgroundColor: "#d4b896", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
              className="border border-[#d4b896] text-[#d4b896] px-12 py-4 text-[10px] tracking-[0.5em] uppercase self-start">
              Discover collection
            </motion.button>
          </Magnetic>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="flex gap-10 mt-16 pt-10 border-t border-stone-800/60">
            {[["1887","Founded"],["43","Artisans"],["120+","Hours/piece"]].map(([v,l]) => (
              <div key={l}>
                <div className="text-[#d4b896] text-2xl font-thin">{v}</div>
                <div className="text-stone-700 text-[9px] uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Full-height image with parallax */}
        <div className="relative overflow-hidden h-[60vh] lg:h-screen">
          <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
            <Image src={HERO_IMG} alt="Luxury fashion" fill className="object-cover object-top" priority />
          </motion.div>
          {/* Left edge fade */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent lg:block hidden" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>
      </section>

      {/* Quote */}
      <section className="py-32 px-10 bg-stone-900/30">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto text-center">
          <p className="text-3xl md:text-4xl font-thin leading-relaxed text-stone-300 italic">
            &ldquo;We do not make objects.<br />We make <span className="text-[#d4b896]">memories</span> in leather.&rdquo;
          </p>
          <div className="text-stone-700 text-xs mt-8 tracking-[0.5em] uppercase">— Henri Verre, Fondateur</div>
        </motion.div>
      </section>

      {/* Collection — image grid */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-14">
            <ClipReveal direction="left">
              <h2 className="text-3xl font-thin tracking-wide">La Collection</h2>
            </ClipReveal>
            <span className="text-stone-700 text-[10px] tracking-[0.4em] uppercase">Pièces sélectionnées</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {collection.map((item, i) => <CollectionItem key={item.name} item={item} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center border-t border-stone-800/60">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}>
          <p className="text-stone-700 text-[10px] tracking-[0.6em] uppercase mb-6">Private appointments</p>
          <h2 className="text-4xl font-thin mb-10">Experience the atelier.</h2>
          <Magnetic>
            <motion.button whileHover={{ scale: 1.06, backgroundColor: "#d4b896", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-[#d4b896] text-[#d4b896] px-14 py-5 text-[10px] tracking-[0.5em] uppercase">
              Request invitation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
