"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { Project } from "@/data";
import { useRef } from "react";

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
}

export default function ProjectCard({ project, isFeatured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth tilt tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: isFeatured ? -6 : -4, scale: 1.015 }}
      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      className={`group relative flex flex-col h-full rounded-xl border transition-[border-color,box-shadow] duration-300 ${
        isFeatured
          ? "p-7 bg-zinc-900/50 border-zinc-800/50 hover:border-indigo-500/30 hover:shadow-[0_0_28px_rgba(99,102,241,0.1)] backdrop-blur-sm"
          : "p-6 bg-zinc-900/20 border-zinc-800/30 hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.07)]"
      }`}
    >
      {/* Gradient fill on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-violet-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

      {/* Top row: badges + links */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-wrap gap-1.5">
          {isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Featured
            </span>
          )}
          {project.isAI && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
              <Sparkles className="w-2.5 h-2.5" />
              AI-assisted
            </span>
          )}
        </div>

        <div className="flex gap-3 items-center">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              title="View on GitHub"
              className="text-zinc-600 hover:text-zinc-200 transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
          )}
          <span className="text-zinc-800 cursor-not-allowed" title="Live demo not available">
            <ExternalLink className="w-[17px] h-[17px]" />
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-zinc-100 group-hover:text-white transition-colors duration-200 leading-snug mb-3 ${
          isFeatured ? "text-[1.05rem]" : "text-[0.95rem]"
        }`}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className={`text-zinc-400/90 leading-[1.75] flex-grow font-light line-clamp-3 group-hover:text-zinc-300 transition-colors duration-200 ${
          isFeatured ? "text-[14px]" : "text-[13px]"
        }`}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-6">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="px-2 py-[3px] rounded-md bg-zinc-800/60 border border-zinc-700/30 text-[10px] font-medium text-zinc-500
                       group-hover:border-zinc-600/50 group-hover:text-zinc-400 transition-all duration-250"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
