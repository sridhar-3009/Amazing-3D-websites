"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const menu = [
  {
    category: "Starters",
    items: [
      { name: "Burrata & Heirloom", desc: "Buffalo burrata, vine tomatoes, aged balsamic, basil oil", price: "$18" },
      { name: "Cured Salmon Crudo", desc: "24hr cured salmon, yuzu crème fraîche, caviar, dill", price: "$24" },
    ]
  },
  {
    category: "Mains",
    items: [
      { name: "Dry-Aged Duck", desc: "42-day dry-aged duck breast, cherry reduction, root vegetable gratin", price: "$54" },
      { name: "Handmade Pappardelle", desc: "Wild boar ragù, pecorino, fresh herbs, truffle oil", price: "$38" },
    ]
  },
  {
    category: "Desserts",
    items: [
      { name: "Burnt Basque", desc: "Classic Basque cheesecake, seasonal compote, cream", price: "$16" },
      { name: "Bittersweet Soufflé", desc: "72% dark chocolate, Armagnac crème anglaise", price: "$22" },
    ]
  },
];

const details = [
  { label: "Dinner", value: "Tue–Sun" },
  { label: "Hours", value: "6pm – 11pm" },
  { label: "Location", value: "Soho, NY" },
  { label: "Reservations", value: "Required" },
];

export default function FoodPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main className="min-h-screen bg-amber-950 text-amber-50 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 backdrop-blur-sm bg-amber-950/80 border-b border-amber-900/40">
        <Link href="/" className="text-amber-700 text-xs tracking-widest hover:text-amber-400 transition-colors uppercase">← Back</Link>
        <div className="text-center">
          <div className="font-serif text-2xl tracking-wide italic">Ember & Salt</div>
          <div className="text-amber-700 text-[9px] tracking-[0.4em] uppercase">New York</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="border border-amber-600 text-amber-400 text-xs px-5 py-2.5 tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-colors"
        >
          Reserve
        </motion.button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-950 to-amber-950"
        />

        {/* Warm radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(251,191,36,0.08),transparent_60%)]" />

        <motion.div style={{ y: textY }} className="relative z-10 text-center px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-amber-600 text-xs tracking-[0.5em] uppercase mb-6"
          >
            A restaurant for those who eat with intention
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-7xl md:text-[10vw] italic leading-none mb-8 text-amber-100"
          >
            Fire.<br />
            Season.<br />
            <span className="text-amber-400">Serve.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-amber-700 max-w-md mx-auto leading-relaxed"
          >
            Wood-fired cooking, seasonal ingredients, and dishes built around the moment.
            We change the menu. We don&apos;t change the philosophy.
          </motion.p>
        </motion.div>

        {/* Floating ingredient labels */}
        {[
          { text: "Truffle season", x: "8%", y: "30%" },
          { text: "Dry-aged 42 days", x: "72%", y: "25%" },
          { text: "Wood fire, 800°F", x: "12%", y: "70%" },
          { text: "Local farms only", x: "68%", y: "72%" },
        ].map((label, i) => (
          <motion.div
            key={label.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: label.x, top: label.y }}
            className="text-amber-700 text-xs tracking-widest uppercase border-l border-amber-800 pl-3"
          >
            {label.text}
          </motion.div>
        ))}
      </section>

      {/* Details strip */}
      <section className="py-12 border-y border-amber-900/50 bg-amber-950/80">
        <div className="max-w-4xl mx-auto px-10 flex flex-wrap justify-center gap-12">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-amber-400 font-medium">{d.value}</div>
              <div className="text-amber-800 text-xs tracking-widest uppercase mt-0.5">{d.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="py-32 px-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <p className="text-amber-700 text-xs tracking-[0.4em] uppercase mb-3">Tonight&apos;s offering</p>
            <h2 className="font-serif text-5xl italic text-amber-100">The Menu</h2>
          </motion.div>

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
                <h3 className="text-amber-600 text-xs tracking-[0.4em] uppercase">{section.category}</h3>
                <div className="flex-1 h-px bg-amber-900/50" />
              </div>
              <div className="space-y-8">
                {section.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: ii * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 8 }}
                    className="flex justify-between items-start gap-8 group cursor-default"
                  >
                    <div>
                      <div className="font-serif italic text-xl text-amber-100 mb-1 group-hover:text-amber-300 transition-colors">{item.name}</div>
                      <div className="text-amber-700 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                    <div className="text-amber-400 font-light whitespace-nowrap">{item.price}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-32 px-10 text-center bg-amber-900/30 border-t border-amber-900/50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-amber-700 text-xs tracking-[0.4em] uppercase mb-6">Tables are limited</p>
          <h2 className="font-serif text-5xl italic text-amber-100 mb-4">Join us tonight.</h2>
          <p className="text-amber-700 mb-10">Seasonal menus. Soulful cooking. A room worth being in.</p>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#f59e0b", color: "#000" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-amber-600 text-amber-400 px-12 py-4 text-xs tracking-[0.4em] uppercase"
          >
            Reserve your table
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
