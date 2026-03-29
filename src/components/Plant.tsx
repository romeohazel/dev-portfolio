"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { track } from "@vercel/analytics";

export interface PlantData {
  name: string;
  tagline: string;
  description: string;
  color: string;
  leafColor: string;
  leaves: string[];
  status: string;
  metrics?: string;
  stemHeight: number;
  details?: string[];
  links?: { label: string; href: string }[];
}

function Leaf({ name, index, color }: {
  name: string;
  index: number;
  color: string;
}) {
  const side = index % 2 === 0 ? "left" : "right";
  const yOffset = 18 + index * 20;

  return (
    <motion.div
      className="absolute flex items-center gap-1.5"
      style={{
        bottom: yOffset,
        ...(side === "left"
          ? { right: "50%", marginRight: 2, flexDirection: "row-reverse" }
          : { left: "50%", marginLeft: 2 }),
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
    >
      <svg
        width="18" height="9" viewBox="0 0 18 9" aria-hidden="true"
        style={{
          transform: `rotate(${side === "left" ? -15 : 15}deg)`,
          animation: `sway-slow ${3 + index * 0.4}s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        }}
      >
        <path
          d={side === "left"
            ? "M18 4.5 Q9 0 0 4.5 Q9 9 18 4.5"
            : "M0 4.5 Q9 0 18 4.5 Q9 9 0 4.5"
          }
          fill={color}
          opacity={0.5 + (index % 3) * 0.12}
        />
      </svg>
      <span className="text-[10px] tracking-[0.05em] text-text-secondary font-mono whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

function Bloom({ color, hovered = false }: { color: string; hovered?: boolean }) {
  return (
    <motion.div
      className="absolute -top-4 left-1/2 -translate-x-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="rounded-full transition-all duration-500"
        style={{
          width: hovered ? 18 : 14,
          height: hovered ? 18 : 14,
          marginLeft: hovered ? -2 : 0,
          marginTop: hovered ? -2 : 0,
          background: `radial-gradient(circle at 40% 35%, ${color}${hovered ? "ee" : "cc"}, ${color}${hovered ? "88" : "55"})`,
          boxShadow: hovered
            ? `0 0 24px 8px ${color}30`
            : `0 0 14px 4px ${color}18`,
        }}
      />
    </motion.div>
  );
}

function TextBlock({ plant, expanded, setExpanded }: { plant: PlantData; expanded: boolean; setExpanded: (v: boolean) => void }) {
  const { ref, isInView } = useInView(0.3);
  const hasDetails = plant.details && plant.details.length > 0;

  return (
    <motion.div
      ref={ref}
      className="text-center px-4"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="text-[10px] tracking-[0.12em] text-text-faint font-mono block mb-2">
        {plant.status}{plant.metrics ? ` · ${plant.metrics}` : ""}
      </span>
      <h3 className="text-lg font-light tracking-[0.03em] text-text-primary mb-1">
        {plant.name}
      </h3>
      <p className="text-[12px] tracking-wide mb-3" style={{ color: plant.color, opacity: 0.8 }}>
        {plant.tagline}
      </p>
      <p className="text-[13px] leading-[1.7] text-text-secondary font-light">
        {plant.description}
      </p>

      {/* Expand trigger */}
      {hasDetails && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} details for ${plant.name}`}
          className="mt-3 py-1.5 px-3 text-[10px] tracking-[0.12em] font-mono transition-colors duration-300"
          style={{ color: expanded ? plant.color : undefined }}
        >
          {expanded ? "— collapse" : "+ read more"}
        </button>
      )}

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && plant.details && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2.5 text-left">
              {plant.details.map((detail, i) => (
                <motion.p
                  key={i}
                  className="text-[12px] leading-[1.7] text-text-secondary font-light flex gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span style={{ color: plant.leafColor }} className="flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <path d="M0 4 Q4 1 8 4 Q4 7 0 4" fill="currentColor" opacity="0.6" />
                    </svg>
                  </span>
                  {detail}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {plant.links && plant.links.length > 0 && (
        <div className="flex justify-center gap-4 mt-4">
          {plant.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} ${plant.name}`}
              className="text-[10px] tracking-[0.1em] font-mono text-text-faint hover:text-moss-light transition-colors duration-300"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Plant({ plant, isInView }: {
  plant: PlantData;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hasDetails = plant.details && plant.details.length > 0;

  return (
    <div
      className="flex flex-col items-center flex-shrink-0 w-[260px] sm:w-[280px] md:w-[320px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Plant visual growing upward */}
      <div
        className="relative flex items-end justify-center"
        style={{ height: plant.stemHeight + 50, cursor: hasDetails ? "pointer" : undefined }}
        onClick={() => {
          if (!hasDetails) return;
          if (!expanded) track("project_expand", { project: plant.name });
          setExpanded(!expanded);
        }}
        role={hasDetails ? "button" : undefined}
        aria-label={hasDetails ? `${expanded ? "Collapse" : "Expand"} details for ${plant.name}` : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasDetails && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            if (!expanded) track("project_expand", { project: plant.name });
            setExpanded(!expanded);
          }
        }}
      >
        <div
          className="relative transition-transform duration-700 ease-out"
          style={{
            height: plant.stemHeight,
            width: 180,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? `drop-shadow(0 0 12px ${plant.color}25)` : "none",
          }}
        >
          {/* Stem */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px origin-bottom"
            style={{
              height: plant.stemHeight,
              background: `linear-gradient(to top, ${plant.leafColor}${hovered ? "88" : "55"}, ${plant.leafColor}22)`,
              transition: "background 0.5s ease",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Leaves */}
          {isInView && plant.leaves.map((leaf, i) => (
            <Leaf key={leaf} name={leaf} index={i} color={plant.leafColor} />
          ))}

          {/* Bloom */}
          {isInView && <Bloom color={plant.color} hovered={hovered} />}
        </div>
      </div>

      <div className="mb-5" />

      {/* Text below the plant — only visible on scroll */}
      <TextBlock plant={plant} expanded={expanded} setExpanded={setExpanded} />
    </div>
  );
}
