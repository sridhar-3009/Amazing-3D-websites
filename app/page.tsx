"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomCursor, ScrollProgress, WordReveal } from "./components/motion-primitives";

const genres = [
  {
    slug: "tech",         num: "01", label: "Tech / SaaS",
    desc: "3D floating UI · live data · glassmorphism",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    color: "#6366f1",
  },
  {
    slug: "luxury",       num: "02", label: "Luxury / Fashion",
    desc: "Editorial split · cinematic parallax · haute couture",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    color: "#d4b896",
  },
  {
    slug: "fitness",      num: "03", label: "Fitness / Sports",
    desc: "Full-bleed impact · brutal type · raw energy",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    color: "#ef4444",
  },
  {
    slug: "food",         num: "04", label: "Food / Restaurant",
    desc: "Sensory imagery · spotlight cursor · hoverable menu",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    color: "#f59e0b",
  },
  {
    slug: "architecture", num: "05", label: "Architecture",
    desc: "Photo + blueprint · clip reveal · project gallery",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    color: "#94a3b8",
  },
  {
    slug: "music",        num: "06", label: "Music / Creative",
    desc: "Concert immersion · 3D vinyl · waveform chaos",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    color: "#a855f7",
  },
  {
    slug: "finance",      num: "07", label: "Finance / Fintech",
    desc: "Glass city · skyline parallax · data aesthetic",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    color: "#10b981",
  },
  {
    slug: "health",       num: "08", label: "Healthcare / Wellness",
    desc: "Nature parallax · layered depth · breathing motion",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    color: "#06b6d4",
  },
];

function GenreCard({ g, i }: { g: typeof genres[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 400, damping: 30 });
  const ry = useSpring(mx, { stiffness: 400, damping: 30 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <Link href={`/${g.slug}`}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
            my.set(-((e.clientY - rect.top) / rect.height - 0.5) * 14);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative h-80 overflow-hidden cursor-pointer group rounded-sm"
        >
          {/* Image layer */}
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={g.img} alt={g.label} fill className="object-cover" />
          </motion.div>

          {/* Dark overlay */}
          <motion.div
            animate={{ opacity: hovered ? 0.6 : 0.75 }}
            className="absolute inset-0 bg-black transition-opacity duration-500"
          />

          {/* Color accent overlay */}
          <motion.div
            animate={{ opacity: hovered ? 0.2 : 0 }}
            style={{ background: `radial-gradient(circle at 40% 60%, ${g.color}, transparent 70%)` }}
            className="absolute inset-0 transition-opacity duration-500"
          />

          {/* Scan line */}
          <motion.div
            animate={{ y: hovered ? "200%" : "-100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-x-0 h-px opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${g.color}, transparent)` }}
          />

          {/* Content — floats above in 3D */}
          <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 flex flex-col justify-between p-7">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs opacity-30 text-white">{g.num}</span>
              <motion.div
                animate={{ scale: hovered ? 1.5 : 1, opacity: hovered ? 1 : 0.5 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: g.color }}
              />
            </div>
            <div>
              <motion.h2
                animate={{ y: hovered ? -4 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-white text-xl font-bold mb-1 leading-tight"
              >
                {g.label}
              </motion.h2>
              <motion.p
                animate={{ opacity: hovered ? 1 : 0.4 }}
                className="text-zinc-400 text-xs leading-relaxed transition-opacity duration-300"
              >
                {g.desc}
              </motion.p>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            style={{ originX: 0, backgroundColor: g.color }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-0.5"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden cursor-none">
      <CustomCursor color="white" />
      <ScrollProgress color="#6366f1" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] px-6 text-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Ambient */}
        {["#6366f1","#a855f7","#06b6d4"].map((c, i) => (
          <motion.div key={c}
            animate={{ scale: [1,1.3,1], opacity:[0.04,0.10,0.04] }}
            transition={{ duration: 7+i*2, repeat: Infinity, delay: i*2 }}
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
            style={{ background:c, left:`${20+i*25}%`, top:"50%", transform:"translate(-50%,-50%)" }}
          />
        ))}

        <div className="relative z-10">
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
            className="text-zinc-600 text-xs tracking-[0.5em] uppercase mb-6">
            8 genre-defining pages
          </motion.p>
          <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter leading-none mb-6">
            <WordReveal text="Amazing" className="block" stagger={0.1} />
            <motion.span
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
              className="block text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
            >
              3D Websites
            </motion.span>
          </h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
            className="text-zinc-600 max-w-sm mx-auto text-sm leading-relaxed">
            Each page lives in a different world. Different structure. Different motion. All extraordinary.
          </motion.p>
        </div>
      </section>

      {/* Genre Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {genres.map((g, i) => <GenreCard key={g.slug} g={g} i={i} />)}
        </div>
      </section>
    </main>
  );
}
