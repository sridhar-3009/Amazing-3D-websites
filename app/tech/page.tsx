"use client";
// Layout: Full-screen dark space + 3D floating browser window containing real dashboard image
// Unique: the hero IS the product — a 3D tilting macOS-style window
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic } from "../components/motion-primitives";

const DASH_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
const BG_IMG   = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80";

const features = [
  { img: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=600&q=80", icon: "⚡", title: "Real-time sync",    desc: "Sub-10ms latency. Events stream instantly across every client." },
  { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", icon: "🔐", title: "Zero-trust auth",   desc: "Every request verified. Every session end-to-end encrypted." },
  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", icon: "📊", title: "Live analytics",    desc: "What's happening right now, not yesterday's batch report." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", icon: "🤖", title: "AI-powered",        desc: "Anomaly detection, smart routing, and auto-scaling built in." },
  { img: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=600&q=80", icon: "🔄", title: "Auto-scaling",      desc: "1 to 1M users without touching a single config file." },
  { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", icon: "🧩", title: "API-first",          desc: "200+ integrations. Ships with SDKs in 8 languages." },
];

// 3D browser window component
function BrowserWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 200, damping: 30 });
  const ry = useSpring(mx, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
        my.set(-((e.clientY - rect.top) / rect.height - 0.5) * 20);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Window chrome */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        className="bg-zinc-900 rounded-xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)] border border-zinc-700/60"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/40">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="flex-1 mx-4 bg-zinc-700/60 rounded-md px-3 py-1 text-zinc-500 text-xs font-mono">
            app.synapse.io/dashboard
          </div>
        </div>

        {/* Dashboard screenshot */}
        <div className="relative h-72 overflow-hidden">
          <Image src={DASH_IMG} alt="Synapse dashboard" fill className="object-cover" priority />
          {/* Overlay UI elements floating above */}
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4 bg-zinc-900/90 border border-indigo-500/40 rounded-lg p-3 backdrop-blur-sm"
          >
            <div className="text-indigo-400 text-xs font-mono mb-1">LIVE SESSIONS</div>
            <div className="text-white text-2xl font-black">24,891</div>
            <div className="text-green-400 text-xs">↑ 12% this hour</div>
          </motion.div>
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-4 left-4 bg-zinc-900/90 border border-green-500/40 rounded-lg px-3 py-2 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono">All systems nominal</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D shadow/reflection */}
      <motion.div
        style={{ transform: "translateZ(-10px) translateY(20px) rotateX(90deg) scaleY(0.15)" }}
        className="absolute inset-x-8 h-20 bg-indigo-600 blur-3xl opacity-30 rounded-full pointer-events-none"
      />
    </motion.div>
  );
}

function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Tilt3D intensity={10} className="relative rounded-2xl overflow-hidden border border-zinc-800 h-56 cursor-pointer">
        {/* Background image */}
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 0.3 : 0.15 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image src={f.img} alt={f.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <motion.div animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.3 }}>
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
            <motion.p
              animate={{ opacity: hovered ? 1 : 0.5 }}
              className="text-zinc-500 text-sm leading-relaxed"
            >
              {f.desc}
            </motion.p>
          </motion.div>
        </div>
      </Tilt3D>
    </motion.div>
  );
}

export default function TechPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const windowScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  return (
    <main className="min-h-screen bg-[#060811] text-white overflow-x-hidden cursor-none">
      <CustomCursor color="#818cf8" />
      <ScrollProgress color="#6366f1" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-8 py-5 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-zinc-600 text-xs hover:text-white transition-colors tracking-widest uppercase">← Home</Link>
        <span className="font-black tracking-tight text-lg">Synapse<span className="text-indigo-400">.</span></span>
        <Magnetic strength={0.3}>
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
            transition={{ type:"spring", stiffness:400, damping:17 }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-6 py-2.5 rounded-full font-semibold tracking-wider">
            Get started
          </motion.button>
        </Magnetic>
      </nav>

      {/* HERO — two-column: text left, 3D window right */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background tech image with parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10">
          <Image src={BG_IMG} alt="" fill className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#060811] via-[#060811]/80 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Glow */}
        <motion.div animate={{ opacity:[0.08,0.18,0.08] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-600 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
              className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 rounded-full px-4 py-2 text-indigo-400 text-xs mb-10 backdrop-blur-sm">
              <motion.span animate={{scale:[1,1.5,1]}} transition={{duration:1.5,repeat:Infinity}}
                className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              System nominal · 24,891 active sessions
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-8">
              <WordReveal text="The platform" className="block" stagger={0.07} />
              <WordReveal text="that thinks." className="block text-indigo-400" stagger={0.07} delay={0.2} />
            </h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.5}}
              className="text-zinc-400 text-lg max-w-md leading-relaxed mb-10">
              Real-time infrastructure for modern teams. Secure, intelligent, and effortlessly scalable.
            </motion.p>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}} className="flex gap-4">
              <Magnetic strength={0.2}>
                <motion.button whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                  transition={{type:"spring",stiffness:400,damping:17}}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold">
                  Start free →
                </motion.button>
              </Magnetic>
              <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}}
                transition={{type:"spring",stiffness:400,damping:17}}
                className="border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-8 py-4 rounded-full">
                View docs
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}
              className="flex gap-8 mt-14 pt-10 border-t border-zinc-800/50">
              {[["99.99%","Uptime"],["<10ms","Latency"],["SOC2","Certified"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="text-zinc-600 text-xs uppercase tracking-wider mt-0.5">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D browser window */}
          <motion.div style={{ y: windowY, scale: windowScale }}>
            <BrowserWindow />
          </motion.div>
        </div>
      </section>

      {/* Features — image-backed cards */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <ClipReveal direction="left" className="mb-4">
            <p className="text-indigo-400 text-xs uppercase tracking-[0.4em]">Platform capabilities</p>
          </ClipReveal>
          <ClipReveal direction="left" delay={0.1} className="mb-16">
            <h2 className="text-5xl font-black tracking-tighter">Everything you need.<br />
              <span className="text-zinc-600">Nothing you don&apos;t.</span>
            </h2>
          </ClipReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={BG_IMG} alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060811] via-[#060811]/90 to-[#060811]" />
        <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:1,ease:[0.22,1,0.36,1]}} className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-500 mb-10 text-lg">Join 12,000+ teams already on Synapse. Free to start.</p>
          <Magnetic>
            <motion.button whileHover={{scale:1.06,y:-3}} whileTap={{scale:0.97}}
              transition={{type:"spring",stiffness:400,damping:17}}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-14 py-5 rounded-full font-bold text-lg shadow-[0_0_60px_rgba(99,102,241,0.4)]">
              Start for free →
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
