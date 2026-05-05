"use client";
// Layout: NATURE PARALLAX DEPTH — 3-layer parallax (sky, trees, foreground)
// gives extraordinary 3D depth, soft organic motion, wellness photography throughout
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic } from "../components/motion-primitives";

const FOREST_IMG  = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80";
const YOGA_IMG    = "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80";
const NATURE2     = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80";
const WELLNESS    = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80";
const HERBS       = "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80";
const MEDITATE    = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80";
const SLEEP_IMG   = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80";

const offerings = [
  { icon:"🌿", name:"Functional medicine",  desc:"Root-cause diagnostics. We treat the system, not the symptom.", img: HERBS },
  { icon:"🧘", name:"Movement therapy",      desc:"Somatic practices designed around your nervous system.",         img: YOGA_IMG },
  { icon:"💤", name:"Sleep optimization",    desc:"Deep sleep engineering using HRV tracking and personalized protocols.", img: SLEEP_IMG },
  { icon:"🍃", name:"Nutritional science",   desc:"Evidence-based nutrition plans built from your bloodwork.",      img: HERBS },
  { icon:"🔬", name:"Longevity protocols",   desc:"Senolytic therapy, metabolic reset, cellular health interventions.", img: WELLNESS },
  { icon:"🧠", name:"Mental clarity",        desc:"Breathwork, neuroplasticity practices, stress architecture.",    img: MEDITATE },
];

function OfferingCard({ o, i }: { o: typeof offerings[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt3D intensity={8} className="relative overflow-hidden rounded-2xl h-60 cursor-default group">
        <Image src={o.img} alt={o.name} fill className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/70 to-transparent" />
        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity }}>
            <div className="text-3xl mb-3">{o.icon}</div>
          </motion.div>
          <h3 className="text-sky-100 font-light text-lg mb-2">{o.name}</h3>
          <p className="text-sky-600 text-sm leading-relaxed">{o.desc}</p>
        </div>
      </Tilt3D>
    </motion.div>
  );
}

export default function HealthPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Three parallax layers — creates deep 3D forest illusion
  const skyY     = useTransform(scrollYProgress, [0, 1], [0, 60]);    // sky moves slowest
  const treeY    = useTransform(scrollYProgress, [0, 1], [0, 120]);   // mid trees
  const foreY    = useTransform(scrollYProgress, [0, 1], [0, 200]);   // foreground fastest
  const textY    = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-sky-950 text-sky-100 overflow-x-hidden cursor-none">
      <CustomCursor color="#67e8f9" />
      <ScrollProgress color="#06b6d4" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-10 py-5 backdrop-blur-md border-b border-sky-900/40 bg-sky-950/70">
        <Link href="/" className="text-sky-800 text-[10px] tracking-[0.4em] hover:text-sky-400 transition-colors uppercase">← Home</Link>
        <div className="text-center">
          <div className="tracking-[0.35em] text-sm uppercase font-light">Soma Wellness</div>
          <div className="text-sky-800 text-[9px] tracking-[0.4em] uppercase">Whole-body health</div>
        </div>
        <Magnetic strength={0.2}>
          <motion.button whileHover={{scale:1.04, backgroundColor:"rgba(8,145,178,0.15)"}} whileTap={{scale:0.97}}
            transition={{type:"spring",stiffness:400,damping:17}}
            className="border border-sky-800 text-sky-500 text-[10px] px-6 py-3 tracking-[0.3em] uppercase rounded-full transition-colors">
            Book intake
          </motion.button>
        </Magnetic>
      </nav>

      {/* HERO — 3-layer parallax depth effect */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Layer 1: Sky/background — slowest */}
        <motion.div style={{ y: skyY }} className="absolute inset-0 scale-125">
          <Image src={NATURE2} alt="Sky background" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-sky-950/50" />
        </motion.div>

        {/* Layer 2: Forest — medium speed */}
        <motion.div style={{ y: treeY }} className="absolute inset-0 scale-110">
          <Image src={FOREST_IMG} alt="Forest" fill className="object-cover object-center opacity-70" />
        </motion.div>

        {/* Layer 3: Foreground vignette — fastest */}
        <motion.div style={{ y: foreY }} className="absolute inset-x-0 bottom-0 h-1/2">
          <div className="w-full h-full bg-gradient-to-t from-sky-950 via-sky-950/60 to-transparent" />
        </motion.div>

        {/* Main overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-sky-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-transparent to-sky-950/40" />

        {/* Breathing orb */}
        <motion.div
          animate={{ scale:[1,1.3,1], opacity:[0.06,0.15,0.06] }}
          transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400 blur-3xl pointer-events-none"
        />

        {/* Concentric rings */}
        {[1,2,3].map(i => (
          <motion.div key={i}
            animate={{scale:[1,1.06+i*0.02,1], opacity:[0.04,0.10,0.04]}}
            transition={{duration:6+i*2, repeat:Infinity, delay:i*1.5}}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-600/20"
            style={{width:200+i*180, height:200+i*180}}
          />
        ))}

        <motion.div style={{ y: textY, opacity }} className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
          {/* Breathing dot */}
          <motion.div animate={{scale:[1,1.6,1],opacity:[0.5,1,0.5]}}
            transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
            className="w-3 h-3 rounded-full bg-cyan-400 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          />

          <ClipReveal direction="bottom" delay={0.5}>
            <p className="text-sky-700 text-[10px] tracking-[0.7em] uppercase mb-8">Integrative health · San Francisco</p>
          </ClipReveal>

          <h1 className="text-6xl md:text-8xl font-thin tracking-tight leading-tight text-sky-50 mb-8">
            <WordReveal text="Your body" className="block" stagger={0.1} delay={0.6} />
            <WordReveal text="knows" className="block" stagger={0.1} delay={0.9} />
            <WordReveal text="the way." className="block italic text-cyan-300" stagger={0.1} delay={1.1} />
          </h1>

          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2,delay:1.5}}
            className="text-sky-600 max-w-sm leading-relaxed mb-12 text-lg">
            We listen to what your biology tells us, then build the protocol your body needs.
          </motion.p>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.8}} className="flex gap-4">
            <Magnetic strength={0.2}>
              <motion.button whileHover={{scale:1.05,y:-2}} whileTap={{scale:0.97}}
                transition={{type:"spring",stiffness:400,damping:17}}
                className="bg-cyan-700 hover:bg-cyan-600 text-white px-8 py-4 text-sm tracking-wider rounded-full">
                Begin your intake
              </motion.button>
            </Magnetic>
            <motion.button whileHover={{borderColor:"#0e7490",color:"#67e8f9"}} whileTap={{scale:0.97}}
              className="border border-sky-900 text-sky-700 px-8 py-4 text-sm tracking-wider rounded-full transition-colors">
              Our approach
            </motion.button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div animate={{y:[0,10,0]}} transition={{duration:2,repeat:Infinity}}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-sky-800">
            <span className="text-[9px] tracking-[0.5em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-sky-700 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Yoga + wellness photos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sky-900/20">
        <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
          transition={{duration:0.8}} className="relative h-80 overflow-hidden group">
          <Image src={YOGA_IMG} alt="Yoga" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 to-transparent" />
          <div className="absolute bottom-6 left-6 font-thin text-sky-100 text-2xl">Movement</div>
        </motion.div>
        <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
          transition={{duration:0.8,delay:0.1}} className="relative h-80 overflow-hidden group">
          <Image src={WELLNESS} alt="Wellness" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 to-transparent" />
          <div className="absolute bottom-6 left-6 font-thin text-sky-100 text-2xl">Restoration</div>
        </motion.div>
      </section>

      {/* Breathe moment */}
      <section className="py-16 text-center border-t border-sky-900/30">
        <motion.div animate={{opacity:[0.4,1,0.4]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}>
          <p className="text-sky-700 text-sm tracking-[0.4em] uppercase">Breathe in · Hold · Breathe out</p>
        </motion.div>
      </section>

      {/* Offerings — image-backed cards */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <ClipReveal direction="left" className="mb-3">
            <p className="text-sky-700 text-[10px] tracking-[0.5em] uppercase">Whole-body programs</p>
          </ClipReveal>
          <ClipReveal direction="left" delay={0.1} className="mb-14">
            <h2 className="text-4xl font-thin">What we offer</h2>
          </ClipReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offerings.map((o, i) => <OfferingCard key={o.name} o={o} i={i} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-10 bg-sky-900/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { q:"For the first time in years, I felt my body working with me.", n:"M. Okafor", l:"Longevity client" },
            { q:"They found what 12 other doctors missed. Sleeping through the night now.", n:"S. Hartman", l:"Functional medicine" },
            { q:"Not a spa, not a clinic. Something in between I didn't know I needed.", n:"A. Bergström", l:"Founding member" },
          ].map((t,i) => (
            <motion.div key={t.n}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.8,delay:i*0.15}}>
              <motion.div animate={{scaleX:[0.4,1,0.4]}} transition={{duration:6,repeat:Infinity,delay:i*1.5}}
                className="w-8 h-px bg-cyan-700 mb-5" />
              <p className="text-sky-300 text-sm leading-relaxed italic mb-5">&ldquo;{t.q}&rdquo;</p>
              <div className="text-sky-400 text-sm font-medium">{t.n}</div>
              <div className="text-sky-800 text-xs mt-0.5">{t.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA — forest photo */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={FOREST_IMG} alt="Forest" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-sky-950/80" />
        <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
          transition={{duration:1}} className="relative z-10">
          {/* Breathing rings */}
          <div className="relative w-24 h-24 mx-auto mb-10">
            {[1,2,3].map(i=>(
              <motion.div key={i}
                animate={{scale:[1,1+i*0.15,1],opacity:[0.3,0.6,0.3]}}
                transition={{duration:4,repeat:Infinity,delay:i*0.8}}
                className="absolute inset-0 rounded-full border border-cyan-500/30"
                style={{margin:`-${i*10}px`}}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🌿</div>
          </div>

          <h2 className="text-4xl font-thin mb-4">Ready to feel like yourself again?</h2>
          <p className="text-sky-700 mb-10">First consultation complimentary. No pressure.</p>
          <Magnetic>
            <motion.button whileHover={{scale:1.05,boxShadow:"0 0 40px rgba(6,182,212,0.3)"}}
              whileTap={{scale:0.97}} transition={{type:"spring",stiffness:400,damping:17}}
              className="bg-cyan-800 hover:bg-cyan-700 text-white px-14 py-5 text-[10px] tracking-[0.5em] uppercase rounded-full">
              Book free consultation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
