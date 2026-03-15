"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  detail: string;
  color: string;
  leafColor: string;
}

const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "SWE Intern",
    org: "Meta",
    detail: "Incoming summer internship",
    color: "#5b8cc4",
    leafColor: "#6b8f5e",
  },
  {
    year: "2024 – 2028",
    title: "B.S. Computer Science",
    org: "CSUDH",
    detail: "Full stack development, algorithms, systems",
    color: "#8a9a72",
    leafColor: "#5a7a52",
  },
  {
    year: "2020",
    title: "Started building",
    org: "Self-taught",
    detail: "Picked up coding as a hobby freshman year of high school during COVID. Never stopped.",
    color: "#c4956a",
    leafColor: "#8a9a72",
  },
];

function EntryText({ entry }: { entry: TimelineEntry }) {
  return (
    <>
      <span className="text-[10px] tracking-[0.15em] text-text-faint font-mono block mb-1">
        {entry.year}
      </span>
      <h4 className="text-[14px] md:text-[15px] font-light text-text-primary mb-0.5">
        {entry.title}
      </h4>
      <p className="text-[12px] tracking-wide mb-1" style={{ color: entry.color, opacity: 0.8 }}>
        {entry.org}
      </p>
      <p className="text-[12px] text-text-secondary font-light">
        {entry.detail}
      </p>
    </>
  );
}

function VineNodeEl({ entry, index }: { entry: TimelineEntry; index: number }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-6 md:w-8 flex justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <svg width="16" height="10" viewBox="0 0 16 10" className="absolute -top-1"
        style={{ animation: `sway-slow ${3 + index * 0.5}s ease-in-out infinite` }}
      >
        <path d="M0 5 Q8 0 16 5 Q8 10 0 5" fill={entry.leafColor} opacity={0.5} />
      </svg>
      <div
        className="w-2.5 h-2.5 rounded-full mt-2"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${entry.color}cc, ${entry.color}66)`,
          boxShadow: `0 0 8px 2px ${entry.color}18`,
        }}
      />
    </motion.div>
  );
}

function VineNode({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, isInView } = useInView(0.3);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref}>
      {/* Mobile layout — always node left, text right */}
      <div className="flex md:hidden items-center gap-4">
        {isInView && <VineNodeEl entry={entry} index={index} />}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EntryText entry={entry} />
        </motion.div>
      </div>

      {/* Desktop layout — alternating */}
      <div className="hidden md:flex items-center gap-6">
        {/* Left side */}
        <div className="flex-1">
          {isLeft && isInView && (
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EntryText entry={entry} />
            </motion.div>
          )}
        </div>

        {isInView && <VineNodeEl entry={entry} index={index} />}

        {/* Right side */}
        <div className="flex-1">
          {!isLeft && isInView && (
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EntryText entry={entry} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[11px] tracking-[0.25em] text-text-faint font-mono">
            growth rings
          </p>
        </div>

        <div className="relative">
          {/* The vine stem */}
          <motion.div
            className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-0 w-px origin-top"
            style={{
              height: "100%",
              background: "linear-gradient(to bottom, rgba(90,122,82,0.2), rgba(90,122,82,0.05))",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {timeline.map((entry, i) => (
              <VineNode key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
