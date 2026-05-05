"use client";
// Layout: CONCERT IMMERSION — full-screen concert photo hero, 3D spinning vinyl in center,
// album art grid in discography, dark moody aesthetic
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollProgress, ClipReveal, Magnetic } from "../components/motion-primitives";

const CONCERT_IMG  = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80";
const CONCERT2     = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80";
const VINYL_IMG    = "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=600&q=80";
const ALBUM1       = "https://images.unsplash.com/photo-1598387993441-a364f854cfn4?auto=format&fit=crop&w=400&q=80";
const ALBUM2       = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80";
const ALBUM3       = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80";
const ALBUM4       = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80";

const releases = [
  { title: "Negative Space",      type: "Album",  year: "2025", tracks: 11, img: ALBUM2 },
  { title: "Drift (Remix EP)",    type: "EP",     year: "2024", tracks: 5,  img: ALBUM3 },
  { title: "Glass Teeth",         type: "Single", year: "2024", tracks: 1,  img: ALBUM4 },
  { title: "Hollow Frequencies",  type: "Album",  year: "2023", tracks: 14, img: ALBUM2 },
];

const shows = [
  { date: "JUN 12", city: "Berlin",     venue: "Berghain Kantine", status: "Few left", dot: "#eab308" },
  { date: "JUN 19", city: "London",     venue: "Fabric",           status: "Sold out", dot: "#71717a" },
  { date: "JUL 3",  city: "New York",   venue: "Le Poisson Rouge", status: "On sale",  dot: "#a855f7" },
  { date: "JUL 18", city: "Tokyo",      venue: "Contact",          status: "On sale",  dot: "#a855f7" },
];

// 3D spinning vinyl record
function Vinyl3D() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full overflow-hidden"
      >
        <Image src={VINYL_IMG} alt="Vinyl record" fill className="object-cover rounded-full" />
        {/* Black overlay with grooves */}
        <div className="absolute inset-0 rounded-full bg-zinc-950/70" />
        {/* Groove rings */}
        {[30, 50, 70, 90, 110].map(r => (
          <div key={r} className="absolute rounded-full border border-zinc-700/30"
            style={{ inset: r, top: r, left: r, right: r, bottom: r }} />
        ))}
      </motion.div>

      {/* Center label - doesn't spin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700/60 z-10">
        <Image src={ALBUM2} alt="Label" fill className="object-cover" />
        <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-[8px] font-bold tracking-widest uppercase">VØID</div>
            <div className="text-purple-300 text-[7px] tracking-wider">45 rpm</div>
          </div>
        </div>
      </div>

      {/* Spindle hole */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-950 z-20 border border-zinc-700" />

      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-purple-600 blur-2xl -z-10 scale-75"
      />
    </div>
  );
}

function WaveBar({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{ scaleY: [0.2, 1, 0.2] }}
      transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ originY: 0.5, height: 28 + Math.random() * 16 }}
      className="w-0.5 bg-purple-500 rounded-full opacity-80"
    />
  );
}

export default function MusicPage() {
  const [playing, setPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden" style={{ cursor: "none" }}>
      <ScrollProgress color="#a855f7" />

      {/* Cursor */}
      <motion.div style={{ left: springX, top: springY, x: "-50%", y: "-50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.18), transparent 65%)" }}
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0" />
      <motion.div style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
        className="fixed w-2 h-2 rounded-full bg-purple-400 pointer-events-none z-[9999]" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-8 py-5 backdrop-blur-sm border-b border-zinc-900/60">
        <Link href="/" className="text-zinc-600 text-[10px] tracking-[0.4em] hover:text-white transition-colors uppercase">← Home</Link>
        <div className="font-mono text-sm tracking-widest uppercase">VØID SIGNAL</div>
        <div className="flex gap-5">
          {["Bandcamp","Spotify","SoundCloud"].map(p => (
            <motion.span key={p} whileHover={{ color: "#a855f7" }}
              className="text-zinc-600 text-xs tracking-wider cursor-pointer transition-colors">{p}</motion.span>
          ))}
        </div>
      </nav>

      {/* HERO — full-screen concert photo + vinyl */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Concert photo with parallax */}
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <Image src={CONCERT_IMG} alt="Concert" fill className="object-cover object-top" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />

        <motion.div style={{ y: contentY, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
          {/* Left: text */}
          <div>
            <ClipReveal direction="bottom" delay={0.4}>
              <p className="text-purple-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-8">New album — out now</p>
            </ClipReveal>

            <h1 className="text-8xl md:text-[12vw] font-black tracking-tighter leading-none mb-8">
              <motion.span initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}
                transition={{duration:0.8,delay:0.5,ease:[0.22,1,0.36,1]}} className="block">
                NEGATIVE
              </motion.span>
              <motion.span initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}
                transition={{duration:0.8,delay:0.7,ease:[0.22,1,0.36,1]}}
                className="block text-transparent" style={{WebkitTextStroke:"2px rgba(168,85,247,0.6)"}}>
                SPACE
              </motion.span>
            </h1>

            {/* Play button */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.8,delay:1.0}} className="flex items-center gap-6">
              <motion.button
                whileHover={{scale:1.1, boxShadow:"0 0 40px rgba(168,85,247,0.5)"}}
                whileTap={{scale:0.9}}
                transition={{type:"spring",stiffness:400,damping:17}}
                onClick={() => setPlaying(!playing)}
                className="relative w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-2xl overflow-hidden"
              >
                <motion.div animate={{scale:[1,2],opacity:[0.3,0]}} transition={{duration:1.5,repeat:Infinity}}
                  className="absolute inset-0 rounded-full bg-purple-500" />
                <span className="relative z-10">{playing ? "⏸" : "▶"}</span>
              </motion.button>

              {playing && (
                <div className="flex items-center gap-1">
                  {Array.from({length:14}).map((_,i) => <WaveBar key={i} delay={i*0.06} />)}
                </div>
              )}
              {!playing && (
                <div>
                  <div className="text-white font-medium">Negative Space</div>
                  <div className="text-zinc-500 text-xs">VØID SIGNAL · 2025 · 11 tracks</div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: 3D vinyl */}
          <motion.div initial={{opacity:0,scale:0.8,rotateY:-20}} animate={{opacity:1,scale:1,rotateY:0}}
            transition={{duration:1.2,delay:0.8,ease:[0.22,1,0.36,1]}}
            style={{perspective:800}}>
            <Vinyl3D />
          </motion.div>
        </motion.div>
      </section>

      {/* Discography — album art grid */}
      <section className="py-24 px-8 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <ClipReveal direction="left" className="mb-12">
            <h2 className="font-mono text-xs tracking-[0.5em] uppercase text-zinc-600">Discography</h2>
          </ClipReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {releases.map((r, i) => (
              <motion.div key={r.title}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.6,delay:i*0.1,ease:[0.22,1,0.36,1]}}
                whileHover={{y:-6, scale:1.02}}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square overflow-hidden mb-3">
                  <Image src={r.img} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-colors duration-300" />
                  <motion.div initial={{opacity:0}} whileHover={{opacity:1}}
                    className="absolute inset-0 flex items-center justify-center bg-purple-900/50">
                    <span className="text-3xl">▶</span>
                  </motion.div>
                </div>
                <div className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{r.title}</div>
                <div className="text-zinc-600 text-xs mt-0.5">{r.type} · {r.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shows */}
      <section className="py-24 px-8 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <ClipReveal direction="left" className="mb-12">
            <h2 className="font-mono text-xs tracking-[0.5em] uppercase text-zinc-600">Live dates</h2>
          </ClipReveal>
          {shows.map((s, i) => (
            <motion.div key={s.date}
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.5,delay:i*0.08}}
              whileHover={{x:8}}
              className="flex items-center justify-between py-5 border-b border-zinc-900 group"
            >
              <div className="flex items-center gap-8">
                <span className="font-mono text-sm text-zinc-600 w-16">{s.date}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                <div>
                  <div className="text-white font-medium">{s.city}</div>
                  <div className="text-zinc-600 text-xs">{s.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs tracking-wider ${s.status==="Sold out"?"text-zinc-700":s.status==="Few left"?"text-yellow-500":"text-purple-400"}`}>
                  {s.status}
                </span>
                {s.status !== "Sold out" && (
                  <motion.button whileHover={{scale:1.05,borderColor:"#a855f7",color:"#c084fc"}}
                    whileTap={{scale:0.95}} transition={{type:"spring",stiffness:400,damping:17}}
                    className="border border-zinc-800 text-zinc-600 text-xs px-4 py-2 tracking-wider transition-colors">
                    Tickets
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA — concert photo */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={CONCERT2} alt="Concert" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-zinc-950/80" />
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:1}} className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter mb-6">On tour now.</h2>
          <Magnetic>
            <motion.button whileHover={{scale:1.06,boxShadow:"0 0 50px rgba(168,85,247,0.4)"}}
              whileTap={{scale:0.97}} transition={{type:"spring",stiffness:400,damping:17}}
              className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-4 font-bold tracking-wider">
              Get tickets →
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
