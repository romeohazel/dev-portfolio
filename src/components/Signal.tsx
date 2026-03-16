"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const channels = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/romeohazel/", id: "li" },
  { label: "GitHub", href: "https://github.com/romeohazel", id: "gh" },
];

export default function Signal() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="roots" className="relative py-10 md:py-16 px-6 md:px-12" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          {/* Root network visualization */}
          <div className="relative w-24 h-16 mx-auto mb-8">
            <svg width="96" height="64" viewBox="0 0 96 64" className="opacity-40">
              <motion.path
                d="M48 0 L48 20"
                stroke="#5a7a52"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6 }}
              />
              <motion.path
                d="M48 20 Q30 35 16 58"
                stroke="#5a7a52"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.path
                d="M48 20 Q48 40 48 60"
                stroke="#5a7a52"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.path
                d="M48 20 Q66 35 80 58"
                stroke="#5a7a52"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </svg>
          </div>

          <p className="text-[12px] tracking-[0.15em] text-text-faint font-mono mb-8">
            connected underground
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-5 md:gap-8"
        >
          {channels.map((ch) => (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-[0.08em] font-mono text-text-faint hover:text-moss-light transition-colors duration-500"
            >
              {ch.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
