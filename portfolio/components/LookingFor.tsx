"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Cpu, Code2, FlaskConical } from "lucide-react";

const lookingFor = [
  { icon: Cpu, label: "AI/ML Engineer Roles" },
  { icon: Code2, label: "Backend Developer Roles" },
  { icon: BriefcaseBusiness, label: "Software Development Opportunities" },
  { icon: FlaskConical, label: "Real-world problem-solving projects" },
];

export default function LookingFor() {
  return (
    <section id="looking-for" className="py-16 border-t border-zinc-900/50">
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

        {/* Left: Title */}
        <div className="flex-shrink-0 md:w-48">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold pt-1"
          >
            Looking For
          </motion.h2>
        </div>

        {/* Right: Items */}
        <div className="flex flex-col gap-5">
          {lookingFor.map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center gap-3 group"
            >
              <Icon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-base font-light leading-snug">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
