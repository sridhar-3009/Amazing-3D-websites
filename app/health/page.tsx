"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const offerings = [
  { icon: "🌿", name: "Functional medicine", desc: "Root-cause diagnostics. We treat the system, not the symptom." },
  { icon: "🧘", name: "Movement therapy", desc: "Somatic practices designed around your nervous system, not a fitness trend." },
  { icon: "💤", name: "Sleep optimization", desc: "Deep sleep engineering using HRV tracking and personalized protocols." },
  { icon: "🍃", name: "Nutritional science", desc: "Evidence-based nutrition plans built from your bloodwork, not generic advice." },
  { icon: "🔬", name: "Longevity protocols", desc: "Cutting-edge interventions for cellular health, senolytic therapy, and metabolic reset." },
  { icon: "🧠", name: "Mental clarity", desc: "Stress architecture, breathwork, and neuroplasticity practices." },
];

const testimonials = [
  { quote: "For the first time in years, I felt my body working with me instead of against me.", name: "M. Okafor", label: "Longevity client, 18 months" },
  { quote: "They found what 12 other doctors missed. Six weeks later, I was sleeping through the night.", name: "S. Hartman", label: "Functional medicine client" },
  { quote: "Not a wellness spa. Not a clinic. Something in between that I didn't know I needed.", name: "A. Bergström", label: "Founding member" },
];

function BreathingOrb() {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-400/10 blur-2xl"
    />
  );
}

export default function HealthPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-sky-950 text-sky-100 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 backdrop-blur-md border-b border-sky-900/40 bg-sky-950/80">
        <Link href="/" className="text-sky-800 text-xs tracking-widest hover:text-sky-400 transition-colors uppercase">← Back</Link>
        <div className="text-center">
          <div className="tracking-[0.3em] text-sm uppercase font-light">Soma Wellness</div>
          <div className="text-sky-800 text-[9px] tracking-[0.4em] uppercase">Whole-body health</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="border border-sky-700 hover:bg-sky-700/30 text-sky-400 text-xs px-5 py-2.5 tracking-widest uppercase transition-colors rounded-full"
        >
          Book intake
        </motion.button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/30 via-sky-950 to-sky-950" />
          {/* Soft rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-800/30"
              style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px` }}
            />
          ))}
        </div>

        <motion.div style={{ y, opacity }} className="relative z-10 text-center px-10 max-w-4xl">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full bg-cyan-400 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sky-600 text-xs tracking-[0.5em] uppercase mb-8"
          >
            Integrative health · San Francisco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-thin tracking-tight leading-tight text-sky-50 mb-6"
          >
            Your body<br />
            knows<br />
            <span className="text-cyan-400 italic">the way.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-sky-600 max-w-md mx-auto leading-relaxed mb-10"
          >
            We listen to what your biology is telling us, then design a protocol
            that gives your body exactly what it needs to heal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 text-sm tracking-wider rounded-full"
            >
              Begin your intake
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="border border-sky-800 hover:border-sky-600 text-sky-600 hover:text-sky-300 px-8 py-4 text-sm tracking-wider rounded-full transition-colors"
            >
              Our approach
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Breathing section — gentle intro to offerings */}
      <section className="py-24 px-10 text-center border-t border-sky-900/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-sky-600 text-sm tracking-[0.3em] uppercase"
          >
            Breathe in · Hold · Breathe out
          </motion.p>
          <p className="text-sky-800 text-xs mt-2 tracking-wider">Healing starts here</p>
        </motion.div>
      </section>

      {/* Offerings */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sky-700 text-xs tracking-[0.4em] uppercase mb-3">What we offer</p>
            <h2 className="text-4xl font-thin">Whole-body programs</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, borderColor: "rgba(6,182,212,0.3)" }}
                className="bg-sky-900/20 border border-sky-900/40 rounded-2xl p-8 cursor-default transition-colors"
              >
                <div className="text-3xl mb-5">{o.icon}</div>
                <h3 className="text-sky-100 font-light text-lg mb-3">{o.name}</h3>
                <p className="text-sky-700 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-10 bg-sky-900/10 border-t border-sky-900/40">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.5em] uppercase text-sky-700 mb-16 text-center"
          >
            Member stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sky-300 text-sm leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sky-400 text-sm font-medium">{t.name}</div>
                  <div className="text-sky-800 text-xs mt-0.5">{t.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto"
        >
          <div className="relative w-24 h-24 mx-auto mb-10">
            <BreathingOrb />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🌿</div>
          </div>
          <h2 className="text-4xl font-thin mb-4">Ready to feel like yourself again?</h2>
          <p className="text-sky-700 mb-10">First consultation is complimentary. No pressure, no packages, just a conversation.</p>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-12 py-4 text-sm tracking-widest uppercase rounded-full"
          >
            Book free consultation
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
