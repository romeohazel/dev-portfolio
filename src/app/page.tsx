"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Sun from "@/components/Sun";
import SolarSystem from "@/components/SolarSystem";
import Experience from "@/components/Experience";
import Signal from "@/components/Signal";

const GardenBg = dynamic(() => import("@/components/GardenBg"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <GardenBg />
      <div className="relative z-10">
        <Nav />
        <Sun />
        <SolarSystem />
        <Experience />
        <Signal />
        <footer className="py-8 text-center">
          <span className="text-[10px] tracking-[0.15em] text-text-faint font-mono">
            © 2026 romeo hazel
          </span>
        </footer>
      </div>
    </>
  );
}
