"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, ChevronDown } from "lucide-react";
import { certifications } from "@/data";

// Reusable cert row
function CertRow({ cert, delay = 0 }: { cert: typeof certifications[0]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group py-7 border-b border-zinc-900/50 last:border-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors duration-250 flex-shrink-0" />
            <h3 className="text-base md:text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors duration-200 leading-snug">
              {cert.title}
            </h3>
          </div>
          <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200 font-light leading-relaxed pl-6">
            {cert.description}
          </p>
        </div>

        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-100
                       transition-colors duration-200 group/link flex-shrink-0 sm:pl-6"
          >
            <span className="border-b border-transparent group-hover/link:border-zinc-500 transition-colors duration-200">
              View Certificate
            </span>
            <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100 transition-opacity duration-200" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCerts = certifications.slice(0, 2);
  const hiddenCerts  = certifications.slice(2);

  return (
    <section id="certifications" className="py-24 border-t border-zinc-900/50">
      <div className="flex flex-col gap-10">

        {/* Header */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.38 }}
            className="text-zinc-400 text-base font-light max-w-2xl leading-[1.8]"
          >
            Credentials and continuous learning in cloud, AI, and software engineering.
          </motion.p>
        </div>

        {/* Cert list */}
        <div className="flex flex-col max-w-4xl">
          {/* Always-visible top 2 */}
          {visibleCerts.map((cert, i) => (
            <CertRow key={cert.id} cert={cert} delay={i * 0.06} />
          ))}

          {/* Expandable section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="hidden-certs"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {hiddenCerts.map((cert, i) => (
                  <CertRow key={cert.id} cert={cert} delay={i * 0.07} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setIsExpanded((v) => !v)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 mt-6 self-start px-4 py-2 rounded-full border border-zinc-800/80
                       bg-zinc-900/30 text-sm font-medium text-zinc-500 hover:text-zinc-100
                       hover:border-zinc-700/60 hover:bg-zinc-800/30 transition-all duration-250 group"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
            {isExpanded ? "Show less" : `+ ${hiddenCerts.length} more certifications`}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
