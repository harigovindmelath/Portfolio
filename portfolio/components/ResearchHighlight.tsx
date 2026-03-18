"use client";

import { motion } from "framer-motion";

export default function ResearchHighlight() {
  return (
    <section id="research" className="py-16 border-t border-zinc-900/50">
      <div className="flex flex-col gap-8 max-w-3xl">

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
        >
          Research &amp; Publication
        </motion.h2>

        {/* Publication block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="group flex flex-col gap-3 bg-zinc-900/30 border border-zinc-800/40 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300"
        >
          {/* IEEE Badge */}
          <span className="self-start px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            IEEE Conference
          </span>

          {/* Paper title */}
          <h3 className="text-base md:text-lg font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors duration-200">
            Real-Time Water Leak and Usage Monitoring for Smart Apartments using IoT Flow Sensors and LSTM-based Leak Detection
          </h3>

          {/* Conference */}
          <p className="text-sm text-zinc-500 font-light">
            Presented at IEEE International Conference — IDCIoT 2026
          </p>
        </motion.div>

      </div>
    </section>
  );
}
