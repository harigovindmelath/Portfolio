"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BrainCircuit, ScanSearch, ServerCog, Cpu, Code2, BriefcaseBusiness, FlaskConical } from "lucide-react";

const lookingFor = [
  { icon: Cpu, label: "AI/ML Engineer Roles" },
  { icon: Code2, label: "Backend Developer Roles" },
  { icon: BriefcaseBusiness, label: "Software Development Opportunities" },
  { icon: FlaskConical, label: "Real-world problem-solving projects" },
];

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="py-24 border-t border-zinc-900/50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        {/* Left Column: Text Content + Looking For */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl text-zinc-100 font-bold tracking-tight"
            >
              About Me
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-5 text-lg text-zinc-400 leading-relaxed font-light">
              <p>
                I&apos;m a final-year B.Tech student in{" "}
                <strong className="text-zinc-200 font-medium">Artificial Intelligence and Machine Learning</strong>,
                focused on building intelligent systems that solve real-world problems end-to-end.
              </p>
              <p>
                My work spans{" "}
                <strong className="text-zinc-200 font-medium">ML model development</strong>,{" "}
                <strong className="text-zinc-200 font-medium">Computer Vision</strong>, and{" "}
                backend engineering — from training models to integrating them into scalable, deployable systems.
                I care about building things that actually work in practice.
              </p>
            </motion.div>
          </div>

          {/* Looking For block — integrated into the left column */}
          <motion.div
            variants={itemVariants}
            className="border-t border-zinc-900/50 pt-8"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-5">
              Looking For
            </p>
            <div className="flex flex-col gap-3">
              {lookingFor.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <Icon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-[15px] font-light">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Highlight Card */}
        <motion.div variants={itemVariants} className="relative w-full">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-zinc-800/20 via-zinc-800/5 to-transparent rounded-3xl blur-xl -z-10" />
          
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col gap-8">
              
              {/* Highlight 1 */}
              <div className="flex flex-row items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mt-1 shadow-sm">
                  <BrainCircuit className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg leading-tight mb-1">AI/ML Projects</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Architecting and deploying practical ML systems focused on real-world problem solving.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-800/50" />

              {/* Highlight 2 */}
              <div className="flex flex-row items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mt-1 shadow-sm">
                  <ScanSearch className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg leading-tight mb-1">Computer Vision Systems</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Specialized in PyTorch and OpenCV for building robust vision and perception workflows.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-800/50" />

              {/* Highlight 3 */}
              <div className="flex flex-row items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mt-1 shadow-sm">
                  <ServerCog className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg leading-tight mb-1">Backend + ML Integration</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Bridging custom model development with scalable backend services for deployable products.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
