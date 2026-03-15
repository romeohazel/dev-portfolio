"use client";

import { motion } from "framer-motion";

// The seed — you, at the root of the garden
export default function Sun() {
  return (
    <section className="relative h-[50vh] md:h-[65vh] flex items-center justify-center">
      <div className="relative z-10 flex flex-col items-center">
        {/* Seed / root symbol */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Soft glow behind */}
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(106,143,94,0.08) 0%, transparent 70%)",
            }}
          />
          {/* The seed */}
          <svg width="40" height="56" viewBox="0 0 40 56" fill="none" className="opacity-60">
            {/* Stem */}
            <motion.line
              x1="20" y1="56" x2="20" y2="28"
              stroke="#5a7a52"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            {/* Left leaf */}
            <motion.path
              d="M20 36 Q10 30 8 20 Q14 26 20 30"
              fill="#3a5a3a"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ transformOrigin: "20px 30px" }}
            />
            {/* Right leaf */}
            <motion.path
              d="M20 32 Q30 26 32 16 Q26 22 20 28"
              fill="#3a5a3a"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ transformOrigin: "20px 28px" }}
            />
          </svg>
        </motion.div>

        {/* Identity */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-base tracking-[0.3em] uppercase font-light text-text-primary mb-3">
            Romeo Hazel
          </h1>
          <p className="text-[13px] tracking-[0.1em] text-text-secondary font-mono mb-4">
            full stack · CSUDH · incoming SWE @ Meta
          </p>
          <p className="text-[12px] leading-relaxed text-text-faint font-mono max-w-xs text-center mb-6">
            20, san diego, mobile and web developer, ex-college soccer player
          </p>
          <div className="flex items-center justify-center gap-6 text-[12px] tracking-[0.08em] text-text-faint font-mono">
            <a href="#garden" className="hover:text-moss-light transition-colors duration-500">
              explore garden
            </a>
            <span className="text-text-faint/30">·</span>
            <a href="#roots" className="hover:text-moss-light transition-colors duration-500">
              reach out
            </a>
          </div>
        </motion.div>

      </div>

      {/* Subtle ground fog */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-soil to-transparent"
      />
    </section>
  );
}
