"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data";
import { ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const [showAllAdditional, setShowAllAdditional] = useState(false);

  const featuredProjects   = projects.filter((p) => p.featured);
  const additionalProjects = projects.filter((p) => !p.featured);
  const visibleAdditional  = additionalProjects.slice(0, 3);
  const hiddenAdditional   = additionalProjects.slice(3);

  return (
    <section id="projects" className="py-24 border-t border-zinc-900/50">
      <div className="flex flex-col gap-14">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.38 }}
            className="text-zinc-400 text-base font-light max-w-2xl leading-[1.8]"
          >
            Selected work spanning Artificial Intelligence, Machine Learning, and full-stack development —
            built to solve real-world problems end-to-end.
          </motion.p>
        </div>

        {/* ── Featured Projects ─────────────────────────────────────── */}
        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-[10px] uppercase tracking-[0.32em] text-zinc-600 font-bold"
          >
            Featured Projects
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} isFeatured />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Additional Projects ───────────────────────────────────── */}
        <div className="space-y-5 pt-10 border-t border-zinc-900/40">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-[10px] uppercase tracking-[0.32em] text-zinc-600 font-bold"
          >
            More Notable Projects
          </motion.p>

          {/* Always visible first 3 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {visibleAdditional.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Expandable hidden projects */}
          <AnimatePresence>
            {showAllAdditional && (
              <motion.div
                key="extra-projects"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 pt-5">
                  {hiddenAdditional.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle — styled as a pill button */}
          {hiddenAdditional.length > 0 && (
            <div className="flex justify-center pt-2">
              <motion.button
                onClick={() => setShowAllAdditional((v) => !v)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800/80 bg-zinc-900/40
                           text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:border-zinc-700/80
                           hover:bg-zinc-800/40 transition-all duration-250 group"
              >
                <motion.span
                  animate={{ rotate: showAllAdditional ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
                {showAllAdditional
                  ? "Show less"
                  : `Show ${hiddenAdditional.length} more projects`}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
