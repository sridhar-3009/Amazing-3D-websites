"use client";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "motion/react";
import { useRef, useEffect, useState, ReactNode } from "react";

/* ─── 3D Tilt Card ─── */
export function Tilt3D({ children, className = "", intensity = 15 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic Button ─── */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Clip-path Wipe Reveal ─── */
export function ClipReveal({
  children,
  direction = "left",
  delay = 0,
  duration = 0.9,
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const clipMap = {
    left:   { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right:  { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
    top:    { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
  };
  const { from, to } = clipMap[direction];

  return (
    <motion.div
      initial={{ clipPath: from }}
      whileInView={{ clipPath: to }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Word-by-word reveal ─── */
export function WordReveal({ text, className = "", delay = 0, stagger = 0.08 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/* ─── Char-by-char scramble reveal ─── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
export function ScrambleText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(text.replace(/./g, "_"));

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 3;
      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (frame > i * 3) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        frame++;
        if (frame > totalFrames) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return <span ref={ref} className={className} aria-label={text}>{display}</span>;
}

/* ─── Scroll Progress Bar ─── */
export function ScrollProgress({ color = "#6366f1" }: { color?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left", backgroundColor: color }}
      className="fixed top-0 left-0 right-0 h-0.5 z-[100]"
    />
  );
}

/* ─── Custom Cursor ─── */
export function CustomCursor({ color = "white" }: { color?: string }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 30 });
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 30 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Trail ring */}
      <motion.div
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%", borderColor: color }}
        className="fixed w-8 h-8 rounded-full border pointer-events-none z-[9999] opacity-40"
      />
      {/* Dot */}
      <motion.div
        animate={{ scale: clicked ? 0.5 : 1 }}
        style={{ left: springX, top: springY, x: "-50%", y: "-50%", backgroundColor: color }}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}

/* ─── Floating 3D Layer ─── */
export function Float3D({ children, depth = 30, className = "" }: { children: ReactNode; depth?: number; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -depth, 0], rotateZ: [0, 1, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section number with line ─── */
export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="text-xs font-mono opacity-30">{number}</span>
      <div className="flex-1 h-px bg-current opacity-20" />
      <span className="text-xs uppercase tracking-[0.3em] opacity-50">{label}</span>
    </motion.div>
  );
}
