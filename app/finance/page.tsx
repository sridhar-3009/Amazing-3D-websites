"use client";
// Layout: GLASS CITY — city skyline photo full-screen, glassmorphism panels floating over it,
// data aesthetic with ticker + animated counters
import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Tilt3D, Magnetic } from "../components/motion-primitives";

const SKYLINE_IMG  = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";
const TRADING_IMG  = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80";
const OFFICE_IMG   = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
const MEETING_IMG  = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80";

function Counter({ target, prefix="", suffix="", duration=2.5 }: { target:number; prefix?:string; suffix?:string; duration?:number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const c = animate(0, target, { duration, ease:[0.22,1,0.36,1], onUpdate:(v)=>setDisplay(Math.round(v).toLocaleString()) });
    return c.stop;
  }, [isInView, target, duration]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function Ticker() {
  const items = ["SPX +0.4%","NDX +1.2%","MSCI EM +0.7%","US10Y 4.32%","GOLD +0.2%","EUR/USD 1.085","BTC +2.1%","OIL -0.5%","CHF/USD 1.12","DAX +0.6%"];
  return (
    <div className="overflow-hidden border-y border-emerald-900/40 py-2 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-950 to-transparent z-10" />
      <motion.div animate={{x:[0,"-50%"]}} transition={{duration:25,repeat:Infinity,ease:"linear"}}
        className="flex gap-12 whitespace-nowrap">
        {[...items,...items].map((item,i) => (
          <span key={i} className={`text-xs font-mono ${item.includes("+")?"text-emerald-400":item.includes("-")?"text-red-400":"text-emerald-700"}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ChartBar({ h, delay, active }: { h:number; delay:number; active?:boolean }) {
  return (
    <motion.div initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true}}
      transition={{duration:0.5,delay,ease:[0.22,1,0.36,1]}}
      style={{height:`${h}%`,originY:1}}
      className={`flex-1 rounded-sm ${active?"bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]":"bg-emerald-900 hover:bg-emerald-800"} transition-colors cursor-pointer`} />
  );
}

const services = [
  { name:"Wealth management",  desc:"Bespoke portfolio construction across equities, fixed income, and alternatives.", tag:"Core",      img: OFFICE_IMG },
  { name:"Estate planning",    desc:"Generational wealth preservation with tax-efficient, multi-jurisdictional structures.", tag:"Advisory",  img: MEETING_IMG },
  { name:"Private credit",     desc:"Access to institutional private credit markets, previously closed to individuals.",  tag:"Exclusive", img: TRADING_IMG },
  { name:"Family office",      desc:"Full-service family office infrastructure for ultra-high-net-worth clients.",        tag:"Premium",   img: OFFICE_IMG },
];

export default function FinancePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], [0,160]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.7], [1,0]);
  const bars = [35,50,42,65,55,80,70,90,75,100,88,115];

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 overflow-x-hidden cursor-none">
      <CustomCursor color="#34d399" />
      <ScrollProgress color="#10b981" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-10 py-5 bg-emerald-950/95 backdrop-blur-sm border-b border-emerald-900/40">
        <Link href="/" className="text-emerald-800 text-[10px] tracking-[0.4em] hover:text-emerald-400 transition-colors uppercase">← Home</Link>
        <div className="font-serif text-lg tracking-wide">Meridian Capital</div>
        <Magnetic strength={0.2}>
          <motion.button whileHover={{scale:1.04,backgroundColor:"rgba(6,78,59,0.6)"}} whileTap={{scale:0.97}}
            transition={{type:"spring",stiffness:400,damping:17}}
            className="border border-emerald-800 text-emerald-500 text-[10px] px-6 py-3 tracking-[0.3em] uppercase transition-colors">
            Speak with us
          </motion.button>
        </Magnetic>
      </nav>

      <div className="pt-14">
        <Ticker />
      </div>

      {/* HERO — city skyline full-screen with glassmorphism panels */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Skyline parallax */}
        <motion.div style={{y:imgY}} className="absolute inset-0 scale-110">
          <Image src={SKYLINE_IMG} alt="City skyline" fill className="object-cover object-bottom" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-emerald-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50" />

        <motion.div style={{opacity:heroOpacity}} className="relative z-10 max-w-7xl mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <ClipReveal direction="bottom" delay={0.3}>
              <p className="text-emerald-700 text-[10px] tracking-[0.6em] uppercase mb-8">Private wealth · Est. 2003 · Geneva</p>
            </ClipReveal>

            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
              <WordReveal text="Capital that" className="block" stagger={0.1} delay={0.4} />
              <WordReveal text="compounds." className="block" stagger={0.1} delay={0.6} />
              <WordReveal text="Quietly." className="block italic text-emerald-400" stagger={0.1} delay={0.8} />
            </h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:1.0}}
              className="text-emerald-700 max-w-lg leading-relaxed mb-10">
              Institutional-grade strategies. No noise. No shortcuts.
              Long-horizon investing for those who built real wealth.
            </motion.p>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="flex gap-4">
              <Magnetic strength={0.2}>
                <motion.button whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                  transition={{type:"spring",stiffness:400,damping:17}}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 text-sm tracking-wider transition-colors">
                  Schedule consultation
                </motion.button>
              </Magnetic>
              <motion.button whileHover={{borderColor:"#34d399",color:"#6ee7b7"}} whileTap={{scale:0.97}}
                className="border border-emerald-900 text-emerald-700 px-8 py-4 text-sm tracking-wider transition-colors">
                Our approach
              </motion.button>
            </motion.div>
          </div>

          {/* Right: glassmorphism portfolio card */}
          <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}}
            transition={{duration:1,delay:0.9,ease:[0.22,1,0.36,1]}}
            style={{perspective:800}}>
            <Tilt3D intensity={8}
              className="bg-emerald-900/20 border border-emerald-700/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
              <div className="text-emerald-600 text-[10px] tracking-[0.4em] uppercase mb-6">Portfolio · 12-month</div>
              <div className="flex items-end gap-1 h-28 mb-6">
                {bars.map((h,i)=><ChartBar key={i} h={(h/Math.max(...bars))*100} delay={1.0+i*0.04} active={i===bars.length-1} />)}
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-emerald-900/50">
                <div>
                  <div className="text-3xl font-serif text-emerald-300">+14.2%</div>
                  <div className="text-emerald-800 text-xs">Annual return</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 text-sm font-medium">vs +9.1% benchmark</div>
                  <div className="text-emerald-800 text-xs">+5.1% alpha generated</div>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        </motion.div>
      </section>

      {/* Counters */}
      <section className="py-20 border-t border-emerald-900/40 bg-emerald-900/10">
        <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[["$","8.4B","AUM"],[""  ,"12,400+","Clients"],["","14.2%","Avg return"],["","22","Years"]].map(([p,v,l],i)=>(
            <motion.div key={l} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.1}} className="text-center">
              <div className="text-4xl font-serif text-emerald-300 mb-1">{v}</div>
              <div className="text-emerald-800 text-[10px] tracking-[0.3em] uppercase">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services — image-backed cards */}
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <ClipReveal direction="left" className="mb-4">
            <p className="text-emerald-700 text-[10px] tracking-[0.5em] uppercase">What we offer</p>
          </ClipReveal>
          <ClipReveal direction="left" delay={0.1} className="mb-14">
            <h2 className="text-4xl font-serif">Services</h2>
          </ClipReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s,i)=>(
              <motion.div key={s.name}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}}
                transition={{duration:0.6,delay:i*0.1,ease:[0.22,1,0.36,1]}}>
                <Tilt3D intensity={6} className="relative overflow-hidden h-52 cursor-default group">
                  <Image src={s.img} alt={s.name} fill className="object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-emerald-100 text-lg font-serif">{s.name}</h3>
                      <span className="text-emerald-800 text-[9px] tracking-[0.3em] border border-emerald-900 px-2 py-0.5">{s.tag}</span>
                    </div>
                    <p className="text-emerald-700 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — skyline photo */}
      <section className="relative py-40 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={SKYLINE_IMG} alt="Skyline" fill className="object-cover object-bottom" />
        </div>
        <div className="absolute inset-0 bg-emerald-950/85" />
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:1}} className="relative">
          <p className="text-emerald-800 text-[10px] tracking-[0.6em] uppercase mb-6">Minimum: $500,000</p>
          <h2 className="text-4xl font-serif text-emerald-100 mb-4">Grow your wealth differently.</h2>
          <p className="text-emerald-800 mb-10 max-w-sm mx-auto">Confidential. No-obligation. By appointment.</p>
          <Magnetic>
            <motion.button whileHover={{scale:1.05,y:-3,backgroundColor:"#047857"}} whileTap={{scale:0.97}}
              transition={{type:"spring",stiffness:300,damping:20}}
              className="bg-emerald-700 text-white px-14 py-5 text-[10px] tracking-[0.4em] uppercase shadow-2xl">
              Request consultation
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
