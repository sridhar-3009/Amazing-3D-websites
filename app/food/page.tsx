"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic, SectionLabel } from "../components/motion-primitives";

const menu = [
  { category: "Starters", items: [
    { name: "Burrata & Heirloom", desc: "Buffalo burrata, vine tomatoes, aged balsamic, basil oil", price: "$18" },
    { name: "Cured Salmon Crudo", desc: "24hr cured salmon, yuzu crème fraîche, caviar, dill", price: "$24" },
  ]},
  { category: "Mains", items: [
    { name: "Dry-Aged Duck", desc: "42-day dry-aged duck breast, cherry reduction, root gratin", price: "$54" },
    { name: "Handmade Pappardelle", desc: "Wild boar ragù, pecorino, fresh herbs, truffle oil", price: "$38" },
  ]},
  { category: "Desserts", items: [
    { name: "Burnt Basque", desc: "Classic Basque cheesecake, seasonal compote, cream", price: "$16" },
    { name: "Bittersweet Soufflé", desc: "72% dark chocolate, Armagnac crème anglaise", price: "$22" },
  ]},
];

/* Steam particle */
function Steam({ x, delay }: { x: string; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -60, -120], opacity: [0, 0.4, 0], scaleX: [1, 1.5, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeOut" }}
      style={{ left: x, bottom: 0, position: "absolute" }}
      className="w-1 h-6 bg-gradient-to-t from-amber-300/30 to-transparent rounded-full blur-sm"
    />
  );
}

export default function FoodPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-amber-950 text-amber-50 overflow-x-hidden cursor-none">
      <CustomCursor color="#f59e0b" />
      <ScrollProgress color="#f59e0b" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 backdrop-blur-sm bg-amber-950/80 border-b border-amber-900/40">
        <Link href="/" className="text-amber-800 text-[10px] tracking-[0.4em] hover:text-amber-400 transition-colors uppercase">← Back</Link>
        <div className="text-center">
          <div className="font-serif text-2xl tracking-wide italic">Ember & Salt</div>
          <div className="text-amber-800 text-[9px] tracking-[0.4em] uppercase">New York</div>
        </div>
        <Magnetic strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#d97706" }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="border border-amber-600 text-amber-400 text-[10px] px-6 py-3 tracking-[0.3em] uppercase"
          >
            Reserve
          </motion.button>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-950 to-amber-950" />

        {/* Warm glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-400 blur-3xl pointer-events-none"
        />

        {/* Floating ingredient labels */}
        {[
          { text: "Truffle season", x: "8%", y: "30%",  delay: 1.0 },
          { text: "Dry-aged 42 days", x: "72%", y: "22%", delay: 1.2 },
          { text: "Wood fire, 800°F", x: "10%", y: "68%", delay: 1.4 },
          { text: "Local farms only",  x: "68%", y: "72%", delay: 1.6 },
        ].map((label) => (
          <motion.div
            key={label.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: label.delay }}
            style={{ position: "absolute", left: label.x, top: label.y }}
            className="hidden lg:block text-amber-800 text-xs tracking-[0.3em] uppercase border-l border-amber-800/60 pl-3"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: label.delay }}
            >
              {label.text}
            </motion.span>
          </motion.div>
        ))}

        <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-10 max-w-4xl">
          <ClipReveal direction="bottom" delay={0.5}>
            <p className="text-amber-700 text-[10px] tracking-[0.6em] uppercase mb-8">A restaurant for those who eat with intention</p>
          </ClipReveal>

          <h1 className="font-serif text-7xl md:text-[11vw] italic leading-none mb-8">
            <WordReveal text="Fire." className="block text-amber-100" stagger={0.15} delay={0.6} />
            <WordReveal text="Season." className="block text-amber-100" stagger={0.15} delay={0.85} />
            <WordReveal text="Serve." className="block text-amber-400" stagger={0.15} delay={1.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="text-amber-700 max-w-md mx-auto leading-relaxed"
          >
            Wood-fired cooking, seasonal ingredients, dishes built around the moment.
          </motion.p>
        </motion.div>

        {/* Steam effects at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          {[15, 25, 38, 52, 65, 78, 90].map((x, i) => (
            <Steam key={x} x={`${x}%`} delay={i * 0.4} />
          ))}
        </div>
      </section>

      {/* Details strip */}
      <section className="py-12 border-y border-amber-900/40">
        <div className="max-w-4xl mx-auto px-10 flex flex-wrap justify-center gap-14">
          {[
            { label: "Dinner",       value: "Tue–Sun" },
            { label: "Hours",        value: "6pm – 11pm" },
            { label: "Location",     value: "Soho, NY" },
            { label: "Reservations", value: "Required" },
          ].map((d, i) => (
            <ClipReveal key={d.label} direction="bottom" delay={i * 0.08} className="text-center">
              <div className="text-amber-400 font-medium">{d.value}</div>
              <div className="text-amber-800 text-[10px] tracking-[0.3em] uppercase mt-0.5">{d.label}</div>
            </ClipReveal>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="py-32 px-10">
        <div className="max-w-4xl mx-auto">
          <SectionLabel number="01" label="Tonight's offering" />
          <ClipReveal direction="left" className="mb-20">
            <h2 className="font-serif text-6xl italic text-amber-100">The Menu</h2>
          </ClipReveal>

          {menu.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: si * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-amber-700 text-[10px] tracking-[0.5em] uppercase">{section.category}</h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: si * 0.15 + 0.2 }}
                  style={{ originX: 0 }}
                  className="flex-1 h-px bg-amber-900/50"
                />
              </div>

              <div className="space-y-8">
                {section.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: ii * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 12 }}
                    className="flex justify-between items-start gap-8 group cursor-default"
                  >
                    <div>
                      <div className="font-serif italic text-xl text-amber-100 mb-1 group-hover:text-amber-300 transition-colors duration-500">
                        {item.name}
                      </div>
                      <div className="text-amber-800 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: ii * 0.5 }}
                      className="text-amber-400 font-light whitespace-nowrap text-lg"
                    >
                      {item.price}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center border-t border-amber-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-900/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <p className="text-amber-800 text-[10px] tracking-[0.5em] uppercase mb-6">Tables are limited</p>
          <h2 className="font-serif text-5xl italic text-amber-100 mb-4">Join us tonight.</h2>
          <p className="text-amber-800 mb-10">Seasonal menus. Soulful cooking. A room worth being in.</p>
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.06, backgroundColor: "#f59e0b", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-amber-700 text-amber-400 px-14 py-5 text-[10px] tracking-[0.5em] uppercase"
            >
              Reserve your table
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
