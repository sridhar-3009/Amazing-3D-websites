"use client";
import { motion, useMotionValue, useSpring, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollProgress, ClipReveal, SectionLabel } from "../components/motion-primitives";

const releases = [
  { title: "Negative Space",      type: "Album",  year: "2025", tracks: 11 },
  { title: "Drift (Remix EP)",    type: "EP",     year: "2024", tracks: 5 },
  { title: "Glass Teeth",         type: "Single", year: "2024", tracks: 1 },
  { title: "Hollow Frequencies",  type: "Album",  year: "2023", tracks: 14 },
];

const shows = [
  { date: "JUN 12", city: "Berlin",    venue: "Berghain Kantine",   status: "Few left" },
  { date: "JUN 19", city: "London",    venue: "Fabric",             status: "Sold out" },
  { date: "JUL 3",  city: "New York",  venue: "Le Poisson Rouge",   status: "On sale" },
  { date: "JUL 18", city: "Tokyo",     venue: "Contact",            status: "On sale" },
  { date: "AUG 2",  city: "Los Angeles", venue: "The Fonda Theatre", status: "On sale" },
];

function WaveBar({ delay, height }: { delay: number; height: number }) {
  return (
    <motion.div
      animate={{ scaleY: [0.15, 1, 0.15] }}
      transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ originY: 0.5, height }}
      className="w-1 bg-purple-500 rounded-full opacity-80"
    />
  );
}

/* Generative noise orbs */
function NoiseOrb({ i }: { i: number }) {
  const positions = [
    { x: "10%", y: "20%", size: 350 },
    { x: "65%", y: "15%", size: 280 },
    { x: "30%", y: "65%", size: 400 },
    { x: "78%", y: "55%", size: 250 },
    { x: "50%", y: "40%", size: 500 },
  ];
  const p = positions[i % positions.length];
  return (
    <motion.div
      animate={{
        x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20 * (i % 2 === 0 ? 1 : -1), 0],
        y: [0, -25 * (i % 3 === 0 ? 1 : -1), 15, 0],
        opacity: [0.04, 0.1, 0.04],
      }}
      transition={{ duration: 8 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
      className="absolute rounded-full blur-3xl"
      style={{
        width: p.size,
        height: p.size,
        background: `rgba(${168 - i * 15},${85 + i * 8},247,0.5)`,
        left: p.x,
        top: p.y,
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }}
    />
  );
}

export default function MusicPage() {
  const [playing, setPlaying] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const trailX = useSpring(mouseX, { stiffness: 25, damping: 18 });
  const trailY = useSpring(mouseY, { stiffness: 25, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <ScrollProgress color="#a855f7" />

      {/* Multi-layer cursor glow */}
      <motion.div
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%", background: "radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%)" }}
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      />
      <motion.div
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 65%)",
        }}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0"
      />
      {/* Cursor dot */}
      <motion.div
        style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
        className="fixed w-2 h-2 rounded-full bg-purple-400 pointer-events-none z-[9999]"
      />
      <motion.div
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%", borderColor: "#a855f7" }}
        className="fixed w-8 h-8 rounded-full border opacity-40 pointer-events-none z-[9999]"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-sm border-b border-zinc-900/60">
        <Link href="/" className="text-zinc-600 text-[10px] tracking-[0.4em] hover:text-white transition-colors uppercase z-10">← Back</Link>
        <div className="font-mono text-sm tracking-widest uppercase z-10">VØID SIGNAL</div>
        <div className="flex gap-5 z-10">
          {["Bandcamp", "Spotify", "SoundCloud"].map(p => (
            <motion.span
              key={p}
              whileHover={{ color: "#a855f7" }}
              className="text-zinc-600 text-xs tracking-wider cursor-pointer transition-colors"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-8 pt-20 overflow-hidden">
        {/* Background noise orbs */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 5 }).map((_, i) => <NoiseOrb key={i} i={i} />)}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <ClipReveal direction="bottom" delay={0.4}>
            <p className="text-purple-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-8">New album — out now</p>
          </ClipReveal>

          <div style={{ perspective: 600 }}>
            <motion.h1
              initial={{ opacity: 0, y: 80, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-[13vw] font-black tracking-tighter leading-none mb-6"
            >
              NEGATIVE
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(168,85,247,0.5)" }}>
                SPACE
              </span>
            </motion.h1>
          </div>

          {/* Play button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6 mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => setPlaying(!playing)}
              className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-2xl relative overflow-hidden"
            >
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-purple-500"
              />
              <span className="relative z-10">{playing ? "⏸" : "▶"}</span>
            </motion.button>

            {playing && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="flex items-center gap-1 overflow-hidden"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <WaveBar key={i} delay={i * 0.08} height={32 + (i % 3) * 16} />
                ))}
              </motion.div>
            )}

            <div className="text-zinc-600 text-sm">
              <div className="text-white font-medium">Negative Space</div>
              <div className="text-xs mt-0.5">VØID SIGNAL · 2025 · 11 tracks</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discography */}
      <section className="py-24 px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <SectionLabel number="01" label="Discography" />
          <div className="space-y-0">
            {releases.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 10, backgroundColor: "rgba(168,85,247,0.04)" }}
                className="flex items-center justify-between py-6 border-b border-zinc-900 cursor-pointer group px-2 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ borderColor: "#a855f7", backgroundColor: "rgba(168,85,247,0.1)" }}
                    className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-zinc-700 text-xs font-mono transition-colors"
                  >
                    {r.tracks}
                  </motion.div>
                  <div>
                    <div className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">{r.title}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{r.type} · {r.tracks} track{r.tracks !== 1 ? "s" : ""}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-zinc-700 text-sm">{r.year}</div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-purple-500"
                  >→</motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shows */}
      <section className="py-24 px-8 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <SectionLabel number="02" label="Live dates" />
          {shows.map((s, i) => (
            <motion.div
              key={s.date + s.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ x: 6 }}
              className="flex items-center justify-between py-6 border-b border-zinc-900"
            >
              <div className="flex items-center gap-8">
                <span className="font-mono text-sm text-zinc-600 w-16">{s.date}</span>
                <div>
                  <div className="text-white font-medium">{s.city}</div>
                  <div className="text-zinc-600 text-xs">{s.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs tracking-wider ${
                  s.status === "Sold out" ? "text-zinc-700" :
                  s.status === "Few left" ? "text-yellow-500" :
                  "text-purple-400"}`}>
                  {s.status}
                </span>
                {s.status !== "Sold out" && (
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#a855f7", color: "#c084fc" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="border border-zinc-800 text-zinc-600 text-xs px-4 py-2 tracking-wider transition-colors"
                  >
                    Tickets
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
