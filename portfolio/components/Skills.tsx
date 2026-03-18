"use client";

import { motion } from "framer-motion";

interface SkillItemProps {
  name: string;
  level?: "Advanced" | "Intermediate" | "Basic";
  index?: number;
}

const LEVEL_CONFIG = {
  Advanced:     { pct: 90, label: "Advanced",     color: "from-indigo-500 to-violet-500",         glow: "rgba(99,102,241,0.5)"  },
  Intermediate: { pct: 65, label: "Intermediate",  color: "from-indigo-400/80 to-violet-400/70",   glow: "rgba(99,102,241,0.3)"  },
  Basic:        { pct: 35, label: "Basic",         color: "from-indigo-400/50 to-violet-400/40",   glow: "rgba(99,102,241,0.18)" },
};

const SkillItem = ({ name, level, index = 0 }: SkillItemProps) => {
  const config = level ? LEVEL_CONFIG[level] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="group flex flex-col py-3 border-b border-zinc-900/50 last:border-0
                 hover:bg-white/[0.015] rounded px-1 -mx-1 transition-colors duration-200 cursor-default"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[14px] text-zinc-300 group-hover:text-zinc-100 transition-colors duration-200 font-light">
          {name}
        </span>
        {config && (
          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 font-medium tracking-wide transition-colors duration-200">
            {config.label}
          </span>
        )}
      </div>

      {config && (
        <div className="relative w-full h-[2px] bg-zinc-800/70 rounded-full overflow-visible">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: `${config.pct}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.05 }}
            className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${config.color}`}
            style={{ boxShadow: `0 0 8px ${config.glow}` }}
          />
        </div>
      )}
    </motion.div>
  );
};

const SkillCategory = ({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-2"
  >
    <h3 className="text-[10px] uppercase tracking-[0.32em] text-zinc-600 font-bold pb-3 border-b border-zinc-800/60">
      {title}
    </h3>
    <div className="flex flex-col">{children}</div>
  </motion.div>
);

const SkillTag = ({ name, index = 0 }: { name: string; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="group flex items-center py-2.5 border-b border-zinc-900/50 last:border-0
               hover:bg-white/[0.015] rounded px-1 -mx-1 transition-colors duration-200 cursor-default"
  >
    <span className="text-[13.5px] text-zinc-400 font-light group-hover:text-zinc-200 transition-colors duration-200 leading-none">
      {name}
    </span>
  </motion.div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-zinc-900/50">
      <div className="flex flex-col gap-14">
        {/* Header */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
          >
            Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.38 }}
            className="text-zinc-400 text-base font-light max-w-2xl leading-[1.8]"
          >
            AI/ML–focused development with strong backend and system design experience.
          </motion.p>
        </div>

        {/* Grid: Languages → Frameworks → Tools → AI/ML → Databases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-12">

          <SkillCategory title="Programming Languages" delay={0.05}>
            <SkillItem name="Python"  level="Advanced"     index={0} />
            <SkillItem name="Java"    level="Intermediate"  index={1} />
            <SkillItem name="SQL"     level="Intermediate"  index={2} />
            <SkillItem name="HTML"    level="Intermediate"  index={3} />
            <SkillItem name="CSS"     level="Intermediate"  index={4} />
            <SkillItem name="C"       level="Basic"         index={5} />
          </SkillCategory>

          <SkillCategory title="Frameworks & Libraries" delay={0.12}>
            {["PyTorch","OpenCV","Scikit-learn","NumPy","Pandas","Django","Flask"].map((s, i) => (
              <SkillTag key={s} name={s} index={i} />
            ))}
          </SkillCategory>

          <SkillCategory title="Tools & Platforms" delay={0.18}>
            {["Git","GitHub","Linux (Ubuntu)","Jupyter Notebook","Google Colab","Windows CMD"].map((s, i) => (
              <SkillTag key={s} name={s} index={i} />
            ))}
          </SkillCategory>

          <SkillCategory title="AI / Machine Learning" delay={0.24}>
            {["Machine Learning","Deep Learning","Computer Vision","Natural Language Processing"].map((s, i) => (
              <SkillTag key={s} name={s} index={i} />
            ))}
          </SkillCategory>

          <SkillCategory title="Databases" delay={0.30}>
            {["MySQL","SQLite"].map((s, i) => (
              <SkillTag key={s} name={s} index={i} />
            ))}
          </SkillCategory>

        </div>
      </div>
    </section>
  );
}
