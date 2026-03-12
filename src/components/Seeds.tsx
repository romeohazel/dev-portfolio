"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface Seed {
  name: string;
  idea: string;
  color: string;
}

const seeds: Seed[] = [
  {
    name: "AI study buddy",
    idea: "An app that watches you study and learns your weak spots. Generates practice problems from your own notes and adapts difficulty in real time.",
    color: "#c4956a",
  },
  {
    name: "Hyperlocal events",
    idea: "A map that shows what's happening within walking distance right now. No promoted posts, no algorithms — just real people doing real things nearby.",
    color: "#8a9a72",
  },
  {
    name: "Open source CLI toolkit",
    idea: "A collection of developer tools I keep rebuilding across projects. Package them up, open source them, let other people use what I've battle-tested.",
    color: "#b8a0d2",
  },
];

function SeedItem({ seed, index }: { seed: Seed; index: number }) {
  const { ref, isInView } = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Seed icon */}
      <div className="flex-shrink-0 mt-1">
        <svg width="14" height="18" viewBox="0 0 14 18">
          <motion.path
            d="M7 18 L7 10"
            stroke={seed.color}
            strokeWidth="0.8"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          />
          <motion.ellipse
            cx="7" cy="6" rx="4" ry="5.5"
            fill={seed.color}
            opacity="0.2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          />
          <motion.ellipse
            cx="7" cy="6" rx="2" ry="3"
            fill={seed.color}
            opacity="0.35"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          />
        </svg>
      </div>

      <div>
        <h4 className="text-[14px] font-light text-text-primary mb-1">
          {seed.name}
        </h4>
        <p className="text-[12px] leading-[1.7] text-text-secondary font-light">
          {seed.idea}
        </p>
      </div>
    </motion.div>
  );
}

export default function Seeds() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative py-14 md:py-20 px-6 md:px-12" ref={ref}>
      <div className="max-w-xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.25em] text-text-faint font-mono">
            seeds — not yet planted
          </p>
        </motion.div>

        <div className="space-y-8">
          {seeds.map((seed, i) => (
            <SeedItem key={seed.name} seed={seed} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
