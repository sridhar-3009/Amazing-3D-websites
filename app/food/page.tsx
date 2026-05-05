"use client";
// Layout: SENSORY IMMERSION — full-screen food photo hero, spotlight cursor revealing image,
// menu items with right-side image preview on hover
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomCursor, ScrollProgress, WordReveal, ClipReveal, Magnetic } from "../components/motion-primitives";

const HERO_IMG  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80";
const FOOD2     = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
const FOOD3     = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
const FOOD4     = "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80";
const CHEF_IMG  = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80";
const REST_IMG  = "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80";

const menuItems = [
  { name: "Burrata & Heirloom",    desc: "Buffalo burrata, vine tomatoes, aged balsamic", price: "$18", img: FOOD2 },
  { name: "Cured Salmon Crudo",    desc: "24hr cured salmon, yuzu crème fraîche, caviar", price: "$24", img: FOOD3 },
  { name: "Dry-Aged Duck",         desc: "42-day duck breast, cherry reduction, root gratin", price: "$54", img: HERO_IMG },
  { name: "Handmade Pappardelle",  desc: "Wild boar ragù, pecorino, truffle oil",         price: "$38", img: FOOD4 },
  { name: "Burnt Basque",          desc: "Basque cheesecake, seasonal compote, cream",    price: "$16", img: FOOD2 },
  { name: "Bittersweet Soufflé",   desc: "72% dark chocolate, Armagnac crème anglaise",   price: "$22", img: FOOD3 },
];

// Cursor spotlight effect on hero
function SpotlightHero() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 760);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={scrollRef} className="relative min-h-screen overflow-hidden">
      {/* Background food image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image src={HERO_IMG} alt="Plated food" fill className="object-cover" priority />
      </motion.div>

      {/* Dark mask with spotlight hole */}
      <div
        ref={heroRef}
        className="absolute inset-0"
        onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
        style={{ cursor: "none" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mouseX.get()}px ${mouseY.get()}px, transparent 0%, rgba(0,0,0,0.92) 70%)`,
          }}
        />
      </div>

      {/* Fixed overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-amber-950/60 pointer-events-none" />

      {/* Text */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-8">
        <ClipReveal direction="bottom" delay={0.5}>
          <p className="text-amber-600 text-[10px] tracking-[0.7em] uppercase mb-8">A restaurant for those who eat with intention</p>
        </ClipReveal>

        <h1 className="font-serif text-7xl md:text-[11vw] italic leading-none mb-8 text-amber-50">
          <WordReveal text="Fire." className="block" stagger={0.15} delay={0.6} />
          <WordReveal text="Season." className="block" stagger={0.15} delay={0.85} />
          <WordReveal text="Serve." className="block text-amber-400" stagger={0.15} delay={1.1} />
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
          className="text-amber-700 max-w-sm leading-relaxed">
          Wood-fired cooking. Seasonal ingredients. Dishes built around the moment.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
          className="mt-10">
          <Magnetic>
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "#f59e0b", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border border-amber-600 text-amber-400 px-12 py-4 text-[10px] tracking-[0.5em] uppercase">
              Reserve a table
            </motion.button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Menu item with image preview on hover
function MenuItem({ item, i }: { item: typeof menuItems[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const category = i < 2 ? "Starters" : i < 4 ? "Mains" : "Desserts";
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="group relative border-b border-amber-900/30 py-6 flex justify-between items-start gap-8 cursor-default"
    >
      <div className="flex-1">
        <motion.div animate={{ x: hov ? 10 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
          <div className="font-serif italic text-xl text-amber-100 mb-1 group-hover:text-amber-300 transition-colors duration-400">
            {item.name}
          </div>
          <div className="text-amber-800 text-sm">{item.desc}</div>
        </motion.div>
      </div>
      <div className="text-amber-400 font-light text-lg whitespace-nowrap">{item.price}</div>

      {/* Hover image preview — floats right */}
      <motion.div
        initial={false}
        animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.9, x: hov ? 0 : 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-40 h-28 ml-6 overflow-hidden pointer-events-none z-20"
        style={{ marginLeft: "1.5rem" }}
      >
        <Image src={item.img} alt={item.name} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-amber-950 text-amber-50 overflow-x-hidden cursor-none">
      <CustomCursor color="#f59e0b" />
      <ScrollProgress color="#f59e0b" />

      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-10 py-5 backdrop-blur-sm bg-amber-950/70 border-b border-amber-900/30">
        <Link href="/" className="text-amber-800 text-[10px] tracking-[0.4em] hover:text-amber-400 transition-colors uppercase">← Home</Link>
        <div className="text-center">
          <div className="font-serif text-xl tracking-wide italic">Ember & Salt</div>
          <div className="text-amber-800 text-[9px] tracking-[0.4em] uppercase">New York</div>
        </div>
        <Magnetic strength={0.2}>
          <motion.button whileHover={{ scale: 1.04, backgroundColor: "#d97706" }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="border border-amber-700 text-amber-500 text-[10px] px-6 py-3 tracking-[0.3em] uppercase transition-colors">
            Reserve
          </motion.button>
        </Magnetic>
      </nav>

      <SpotlightHero />

      {/* Details strip */}
      <section className="py-10 border-y border-amber-900/30 bg-amber-900/20">
        <div className="max-w-4xl mx-auto px-10 flex flex-wrap justify-center gap-14">
          {[["Dinner","Tue–Sun"],["Hours","6pm – 11pm"],["Location","Soho, NY"],["Reservations","Required"]].map(([l,v]) => (
            <div key={l} className="text-center">
              <div className="text-amber-300 font-medium">{v}</div>
              <div className="text-amber-800 text-[10px] tracking-[0.3em] uppercase mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Chef + Restaurant images */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.8,ease:[0.22,1,0.36,1]}} className="relative h-80 overflow-hidden">
            <Image src={CHEF_IMG} alt="Chef" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 to-transparent" />
            <div className="absolute bottom-6 left-6 font-serif italic text-amber-100 text-xl">The craft</div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.8,delay:0.1,ease:[0.22,1,0.36,1]}} className="relative h-80 overflow-hidden">
            <Image src={REST_IMG} alt="Restaurant interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 to-transparent" />
            <div className="absolute bottom-6 left-6 font-serif italic text-amber-100 text-xl">The room</div>
          </motion.div>
        </div>
      </section>

      {/* Menu with hover previews */}
      <section className="py-16 px-10">
        <div className="max-w-3xl mx-auto">
          <ClipReveal direction="left" className="mb-3">
            <p className="text-amber-700 text-[10px] tracking-[0.5em] uppercase">Tonight&apos;s offering</p>
          </ClipReveal>
          <ClipReveal direction="left" delay={0.1} className="mb-12">
            <h2 className="font-serif text-5xl italic text-amber-100">The Menu</h2>
          </ClipReveal>
          {menuItems.map((item, i) => <MenuItem key={item.name} item={item} i={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={FOOD4} alt="Food" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-amber-950/80" />
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:1,ease:[0.22,1,0.36,1]}} className="relative">
          <h2 className="font-serif text-5xl italic text-amber-100 mb-4">Join us tonight.</h2>
          <p className="text-amber-700 mb-10">Seasonal menus. Soulful cooking.</p>
          <Magnetic>
            <motion.button whileHover={{scale:1.06,backgroundColor:"#f59e0b",color:"#000"}}
              whileTap={{scale:0.97}} transition={{type:"spring",stiffness:300,damping:20}}
              className="border border-amber-700 text-amber-400 px-14 py-5 text-[10px] tracking-[0.5em] uppercase">
              Reserve your table
            </motion.button>
          </Magnetic>
        </motion.div>
      </section>
    </main>
  );
}
