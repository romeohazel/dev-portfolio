"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Plant, { PlantData } from "./Plant";
import { useInView } from "@/hooks/useInView";

const projects: PlantData[] = [
  {
    name: "Phantom",
    tagline: "Vanishing encrypted messaging",
    description:
      "End-to-end encrypted messages that self-destruct after reading. No accounts, no metadata, no trace. Generate a one-time link, share it, it burns after open.",
    color: "#c27a8e",
    leafColor: "#6b8f5e",
    leaves: ["React Native", "Expo", "TypeScript", "Node.js", "Supabase"],
    status: "deployed",
    metrics: "zero-knowledge",
    stemHeight: 170,
    details: [
      "AES-256 encryption happens entirely client-side — the server never sees plaintext",
      "Messages stored as encrypted blobs with a TTL, automatically purged after read or expiry",
      "No sign-up required — share a one-time URL, recipient opens it, content is destroyed",
      "Built a custom key exchange protocol so even link interception doesn't expose content",
    ],
  },
  {
    name: "ShadowAI",
    tagline: "AI boxing coach",
    description:
      "Computer vision tracks your movements and overlays a real-time body grid. Coaches you as you shadow box. Global leaderboards, streaks, live virtual gym sessions.",
    color: "#c4956a",
    leafColor: "#8a9a72",
    leaves: ["React Native", "TypeScript", "Node.js", "SQL", "WebSockets"],
    status: "deployed",
    metrics: "30 fps tracking",
    stemHeight: 200,
    details: [
      "Pose estimation runs on-device at 30fps using TensorFlow Lite for real-time feedback",
      "Scoring algorithm compares form against pro boxer reference data for accuracy grading",
      "WebSocket-powered live sessions let users spar virtually with friends in real time",
      "Global leaderboard with ELO-style ranking, daily streaks, and workout history tracking",
    ],
  },
  {
    name: "CampusMarket",
    tagline: "Peer-to-peer campus marketplace",
    description:
      "Campus marketplace that grew to 1,000+ users organically. .edu email verification for trust. Peer-to-peer transactions with no middleman.",
    color: "#8a9a72",
    leafColor: "#5a7a52",
    leaves: ["TypeScript", "SQL", "Supabase", "REST API"],
    status: "scaling",
    metrics: "1,000+ users",
    stemHeight: 150,
    details: [
      "Grew to 1,000+ verified users through word of mouth alone — zero marketing spend",
      ".edu email verification ensures only real students can list or buy",
      "Real-time chat between buyers and sellers with push notifications",
      "Category-based browsing with search, filters, and location-based sorting",
    ],
  },
  {
    name: "Momentary",
    tagline: "Social media without the scoreboard",
    description:
      "No likes, no follower counts, no algorithm. Just people posting what they actually care about. Chronological feeds, private reactions sent directly to the creator, and zero vanity metrics.",
    color: "#b8a0d2",
    leafColor: "#7a8f6b",
    leaves: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    status: "current project",
    stemHeight: 185,
    details: [
      "Feed is purely chronological — no engagement-optimizing algorithm deciding what you see",
      "Reactions are private and sent directly to the creator, not displayed publicly",
      "No follower counts, no like counts, no metrics visible anywhere in the app",
      "Redis-backed feed generation for fast timeline rendering without algorithmic ranking",
    ],
  },
  {
    name: "Chatly",
    tagline: "AI chatbots that understand your business",
    description:
      "Fully managed AI chatbot platform for businesses. Train a bot on your products, FAQs, and brand voice — deploy it to your site with zero code. 24/7 customer support on autopilot.",
    color: "#6ab0c4",
    leafColor: "#5a8a6e",
    leaves: ["Next.js", "React", "TypeScript", "Node.js", "AI/ML"],
    status: "deployed",
    metrics: "24/7 autopilot",
    stemHeight: 165,
    details: [
      "Custom-trained AI chatbots that learn a business's products, policies, and communication style",
      "Zero-code deployment — business owners embed a widget with no technical expertise required",
      "Centralized dashboard with conversation analytics and lead capture tracking",
      "Two-tier SaaS model with 5,000 and unlimited conversation plans scaling to any business size",
    ],
  },
];

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

    </section>
  );
}
