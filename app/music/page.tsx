"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const releases = [
  { title: "Negative Space", type: "Album", year: "2025", tracks: 11 },
  { title: "Drift (Remix EP)", type: "EP", year: "2024", tracks: 5 },
  { title: "Glass Teeth", type: "Single", year: "2024", tracks: 1 },
  { title: "Hollow Frequencies", type: "Album", year: "2023", tracks: 14 },
];

const shows = [
  { date: "JUN 12", city: "Berlin", venue: "Berghain Kantine", status: "Few left" },
  { date: "JUN 19", city: "London", venue: "Fabric", status: "Sold out" },
  { date: "JUL 3", city: "New York", venue: "Le Poisson Rouge", status: "On sale" },
  { date: "JUL 18", city: "Tokyo", venue: "Contact", status: "On sale" },
  { date: "AUG 2", city: "Los Angeles", venue: "The Fonda Theatre", status: "On sale" },
];

function CursorOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)",
      }}
      className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
    />
  );
}

function WaveBar({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{ scaleY: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.2, delay, ease: "easeInOut" }}
      style={{ originY: 0.5 }}
      className="w-0.5 h-8 bg-purple-500 rounded-full"
    />
  );
}

export default function MusicPage() {
  const [playing, setPlaying] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden relative" ref={containerRef}>
      {/* Cursor glow */}
      <motion.div
        style={{ left: springX, top: springY, position: "fixed", width: 400, height: 400, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)" }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-sm border-b border-zinc-900/60">
        <Link href="/" className="text-zinc-600 text-xs tracking-widest hover:text-white transition-colors uppercase z-10">← Back</Link>
        <div className="font-mono text-sm tracking-widest uppercase z-10">VØID SIGNAL</div>
        <div className="flex gap-4 z-10">
          {["Bandcamp", "Spotify", "SoundCloud"].map(p => (
            <span key={p} className="text-zinc-600 text-xs tracking-wider cursor-pointer hover:text-purple-400 transition-colors">{p}</span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-8 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Noise grain effect */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Scattered orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 30, -20, 10, 0],
                y: [0, -20, 30, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.5 }}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                background: `rgba(${168 - i * 20},${85 + i * 10},247,0.08)`,
                left: `${10 + i * 18}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-purple-500 font-mono text-xs tracking-[0.5em] uppercase mb-8"
          >
            New album — out now
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[12vw] font-black tracking-tighter leading-none mb-4"
          >
            NEGATIVE<br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(168,85,247,0.6)" }}
            >
              SPACE
            </span>
          </motion.h1>

          {/* Play button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6 mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => setPlaying(!playing)}
              className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-xl transition-colors"
            >
              {playing ? "⏸" : "▶"}
            </motion.button>

            {playing && (
              <div className="flex items-center gap-1">
                {[...Array(12)].map((_, i) => <WaveBar key={i} delay={i * 0.1} />)}
              </div>
            )}

            {!playing && (
              <div className="text-zinc-600 text-sm">
                <div className="text-white">Negative Space</div>
                <div className="text-xs mt-0.5">VØID SIGNAL · 2025</div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Discography */}
      <section className="py-24 px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-mono text-xs tracking-[0.5em] uppercase text-zinc-600 mb-10"
          >
            Discography
          </motion.h2>
          <div className="space-y-0">
            {releases.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8, backgroundColor: "rgba(168,85,247,0.04)" }}
                className="flex items-center justify-between py-6 border-b border-zinc-900 cursor-pointer group px-2"
              >
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-sm group-hover:border-purple-800 transition-colors" />
                  <div>
                    <div className="text-white font-medium group-hover:text-purple-300 transition-colors">{r.title}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{r.type} · {r.tracks} tracks</div>
                  </div>
                </div>
                <div className="text-zinc-700 text-sm">{r.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shows */}
      <section className="py-24 px-8 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-mono text-xs tracking-[0.5em] uppercase text-zinc-600 mb-10"
          >
            Live dates
          </motion.h2>
          <div className="space-y-0">
            {shows.map((s, i) => (
              <motion.div
                key={s.date + s.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between py-6 border-b border-zinc-900 group"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-sm text-zinc-500 w-16">{s.date}</span>
                  <div>
                    <div className="text-white font-medium">{s.city}</div>
                    <div className="text-zinc-600 text-xs">{s.venue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs tracking-wider ${s.status === "Sold out" ? "text-zinc-600" : s.status === "Few left" ? "text-yellow-500" : "text-purple-400"}`}>
                    {s.status}
                  </span>
                  {s.status !== "Sold out" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="border border-zinc-700 hover:border-purple-500 text-zinc-400 hover:text-purple-300 text-xs px-4 py-2 tracking-wider transition-colors"
                    >
                      Tickets
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
