'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, ArrowDown, Download, Mail, Check } from 'lucide-react';
import { useState } from 'react';
import Terminal from './Terminal';

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Social link button ────────────────────────────────────────────────────────
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400
                 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/40
                 transition-colors duration-250 backdrop-blur-sm flex items-center justify-center
                 shadow-sm hover:shadow-[0_0_18px_rgba(99,102,241,0.22)]"
    >
      {icon}
    </motion.a>
  );
}

const EMAIL = 'harigovindmelath52@gmail.com';

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [copied, setCopied] = useState(false);

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-slate-950"
    >
      {/* ── Deep background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080e1e] via-[#060c18] to-[#030812] z-0 pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 0%, black 50%, transparent 100%)',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-[20%] left-[8%] w-[500px] h-[360px] rounded-full bg-indigo-700/[0.07] blur-[130px] z-0 pointer-events-none float-slow" />
      <div className="absolute top-[45%] left-[30%] w-[350px] h-[250px] rounded-full bg-violet-700/[0.06] blur-[110px] z-0 pointer-events-none float" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[200px] rounded-full bg-blue-800/[0.05] blur-[100px] z-0 pointer-events-none" />

      {/* ── Main content grid ── */}
      <div className="z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Text block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold tracking-[0.3em] text-indigo-400/70 uppercase"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name + glow */}
            <motion.div variants={itemVariants} className="relative w-fit">
              {/* Text glow behind name */}
              <div
                className="absolute inset-0 blur-[50px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 40% 60%, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.1) 60%, transparent 100%)',
                }}
              />
              <h1 className="relative text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tighter text-white leading-[1.04] glow-text">
                Harigovind P
              </h1>
              {/* Animated underline accent */}
              <span
                className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent"
                style={{ animation: 'underline-expand 0.8s 0.5s ease-out both' }}
              />
            </motion.div>

            {/* Role */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium text-slate-300 tracking-wide pt-2"
            >
              AI/ML Engineer
              <span className="text-indigo-500/40 mx-3 font-light">|</span>
              Software Developer
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] md:text-base text-slate-400/90 font-light leading-[1.8] max-w-[480px]"
            >
              AI/ML-focused engineer building intelligent systems with strong backend and software development foundations.
            </motion.p>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 self-start">
              <Mail className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
              <button
                onClick={copyEmail}
                title="Click to copy email"
                className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200 font-mono tracking-tight group flex items-center gap-2"
              >
                <span className="group-hover:underline underline-offset-4 decoration-zinc-600">
                  {EMAIL}
                </span>
                {copied && (
                  <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-sans">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                )}
              </button>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-1">
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500
                           text-white font-semibold text-sm shadow-lg shadow-indigo-950/50
                           hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-[background,box-shadow] duration-250"
              >
                <ArrowDown className="w-4 h-4" />
                Explore Projects
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12]
                           hover:bg-white/[0.09] hover:border-white/[0.22] text-slate-200 font-semibold text-sm
                           transition-all duration-250"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-1">
              <SocialLink href="https://github.com/harigovindmelath"       icon={<Github   className="w-[18px] h-[18px]" />} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/harigovind-melath" icon={<Linkedin className="w-[18px] h-[18px]" />} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/u/harigovindmelath/"  icon={<Code2    className="w-[18px] h-[18px]" />} label="LeetCode" />
            </motion.div>
          </motion.div>

          {/* RIGHT: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden lg:block"
          >
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
