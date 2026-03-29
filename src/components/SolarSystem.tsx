"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Plant from "./Plant";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/data/projects";

export default function SolarSystem() {
  const { ref, isInView } = useInView(0.05);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="garden" className="relative pt-6 pb-16" ref={ref}>
      {/* Section label */}
      <div className="text-center mb-5 px-6">
        <p className="text-[11px] tracking-[0.25em] text-text-faint font-mono">
          what's growing
        </p>
      </div>

      {/* Horizontal scrolling garden bed */}
      <div className="relative">
        {/* Fade edges to indicate scrollability */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-soil to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-soil to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-8 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>

          <motion.div
            className="flex items-end gap-3 md:gap-6 px-4 md:px-10"
            style={{ width: "fit-content" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Left spacing */}
            <div className="flex-shrink-0 w-1 md:w-10" />

            {projects.map((project) => (
              <Plant
                key={project.name}
                plant={project}
                isInView={isInView}
              />
            ))}

            <div className="flex-shrink-0 w-1 md:w-10" />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
