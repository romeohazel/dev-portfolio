"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Sun from "@/components/Sun";
import SolarSystem from "@/components/SolarSystem";
import Experience from "@/components/Experience";
import Signal from "@/components/Signal";

const GardenBg = dynamic(() => import("@/components/GardenBg"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-soil" />
  ),
});

export default function Home() {
  return (
    <>
      <a
        href="#garden"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-1.5 focus:bg-soil focus:text-text-primary focus:text-[11px] focus:font-mono focus:tracking-[0.1em] focus:rounded focus:ring-1 focus:ring-moss-light"
      >
        Skip to content
      </a>
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
