"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic, SectionLabel } from "../components/motion-primitives";

const offerings = [
  { icon: "🌿", name: "Functional medicine",  desc: "Root-cause diagnostics. We treat the system, not the symptom." },
  { icon: "🧘", name: "Movement therapy",      desc: "Somatic practices designed around your nervous system." },
  { icon: "💤", name: "Sleep optimization",    desc: "Deep sleep engineering using HRV tracking and personalized protocols." },
  { icon: "🍃", name: "Nutritional science",   desc: "Evidence-based nutrition from bloodwork, not generic advice." },
  { icon: "🔬", name: "Longevity protocols",   desc: "Senolytic therapy, metabolic reset, cellular health." },
  { icon: "🧠", name: "Mental clarity",        desc: "Breathwork, neuroplasticity practices, stress architecture." },
];

const testimonials = [
  { quote: "For the first time in years, I felt my body working with me instead of against me.", name: "M. Okafor", label: "Longevity client" },
  { quote: "They found what 12 other doctors missed. Six weeks later, sleeping through the night.", name: "S. Hartman", label: "Functional medicine" },
  { quote: "Not a spa, not a clinic. Something in between that I didn't know I needed.", name: "A. Bergström", label: "Founding member" },
];

/* Floating particle */
function Particle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 10, -5, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      className="absolute rounded-full bg-cyan-400 blur-sm pointer-events-none"
    />
  );
}

/* Concentric breathing rings */
function BreathingRings() {
  return (
    <div className="relative w-48 h-48 mx-auto mb-10">
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1 + i * 0.08, 1], opacity: [0.4 - i * 0.07, 0.7 - i * 0.1, 0.4 - i * 0.07] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-cyan-600/30"
          style={{ margin: `-${i * 14}px` }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(6,182,212,0.1)", "0 0 60px rgba(6,182,212,0.3)", "0 0 20px rgba(6,182,212,0.1)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-800/30 to-sky-900/20 flex items-center justify-center"
      >
        <span className="text-5xl">🌿</span>
      </motion.div>
    </div>
  );
}

export default function HealthPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const particleSeeds = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 37 + 10) % 90,
    y: (i * 53 + 5) % 85,
    size: 2 + (i % 4),
    delay: i * 0.3,
  }));

  return (
    <main className="min-h-screen bg-sky-950 text-sky-100 overflow-x-hidden cursor-none">
      <CustomCursor color="#67e8f9" />
      <ScrollProgress color="#06b6d4" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 backdrop-blur-md border-b border-sky-900/40 bg-sky-950/80">
        <Link href="/" className="text-sky-800 text-[10px] tracking-[0.4em] hover:text-sky-400 transition-colors uppercase">← Back</Link>
        <div className="text-center">
          <div className="tracking-[0.35em] text-sm uppercase font-light">Soma Wellness</div>
          <div className="text-sky-800 text-[9px] tracking-[0.4em] uppercase">Whole-body health</div>
        </div>
        <Magnetic strength={0.2}>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "rgba(8,145,178,0.2)" }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="border border-sky-800 text-sky-500 text-[10px] px-6 py-3 tracking-[0.3em] uppercase rounded-full transition-colors"
          >
            Book intake
          </motion.button>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-sky-950 to-sky-950" />
          {/* Ambient glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500 blur-3xl"
          />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particleSeeds.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* Breathing rings (desktop accent) */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, delay: i * 1.8, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-700/20"
            style={{ width: `${200 + i * 180}px`, height: `${200 + i * 180}px` }}
          />
        ))}

        <motion.div style={{ opacity }} className="relative z-10 text-center px-10 max-w-4xl">
          {/* Breathing dot */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full bg-cyan-400 mx-auto mb-8 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          />

          <ClipReveal direction="bottom" delay={0.5}>
            <p className="text-sky-700 text-[10px] tracking-[0.6em] uppercase mb-8">Integrative health · San Francisco</p>
          </ClipReveal>

          <h1 className="text-6xl md:text-8xl font-thin tracking-tight leading-tight text-sky-50 mb-8">
            <WordReveal text="Your body" className="block" stagger={0.1} delay={0.6} />
            <WordReveal text="knows" className="block" stagger={0.1} delay={0.9} />
            <WordReveal text="the way." className="block italic text-cyan-400" stagger={0.1} delay={1.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="text-sky-700 max-w-md mx-auto leading-relaxed mb-10"
          >
            We listen to what your biology tells us, then design a protocol
            that gives your body exactly what it needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center gap-4"
          >
            <Magnetic strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-4 text-sm tracking-wider rounded-full transition-colors"
              >
                Begin your intake
              </motion.button>
            </Magnetic>
            <motion.button
              whileHover={{ borderColor: "#0e7490", color: "#67e8f9" }} whileTap={{ scale: 0.97 }}
              className="border border-sky-900 text-sky-700 px-8 py-4 text-sm tracking-wider rounded-full transition-colors"
            >
              Our approach
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Breathe moment */}
      <section className="py-16 text-center border-t border-sky-900/30">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sky-700 text-sm tracking-[0.4em] uppercase">Breathe in · Hold · Breathe out</p>
        </motion.div>
      </section>

      {/* Offerings */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="01" label="Whole-body programs" />
          <ClipReveal direction="left" className="mb-16">
            <h2 className="text-4xl font-thin">What we offer</h2>
          </ClipReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={8} className="bg-sky-900/15 border border-sky-900/30 rounded-2xl p-8 h-full hover:border-cyan-800/40 transition-colors">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl mb-5"
                  >
                    {o.icon}
                  </motion.div>
                  <h3 className="text-sky-100 font-light text-lg mb-3">{o.name}</h3>
                  <p className="text-sky-700 text-sm leading-relaxed">{o.desc}</p>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-10 border-t border-sky-900/30 bg-sky-900/10">
        <div className="max-w-5xl mx-auto">
          <SectionLabel number="02" label="Member stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D intensity={6} className="h-full">
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 }}
                    className="w-8 h-px bg-cyan-700 mb-6"
                  />
                  <p className="text-sky-300 text-sm leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="text-sky-400 text-sm font-medium">{t.name}</div>
                    <div className="text-sky-800 text-xs mt-0.5">{t.label}</div>
                  </div>
                </Tilt3D>
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
          <BreathingRings />
          <h2 className="text-4xl font-thin mb-4">Ready to feel like yourself again?</h2>
          <p className="text-sky-700 mb-10">First consultation complimentary. No pressure, no packages.</p>
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-cyan-800 hover:bg-cyan-700 text-white px-14 py-5 text-[10px] tracking-[0.5em] uppercase rounded-full transition-colors"
            >
              Book free consultation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
