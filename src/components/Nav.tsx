"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbient } from "@/hooks/useAmbient";

const links = [
  { label: "garden", href: "#garden" },
  { label: "roots", href: "#roots" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { playing, toggle: toggleSound } = useAmbient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-soil/70 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-12 flex items-center justify-between">
          <a
            href="#"
            className="text-[12px] tracking-[0.2em] font-mono text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            rh
          </a>

          <div className="flex items-center gap-5">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] tracking-[0.1em] font-mono text-text-faint hover:text-text-secondary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle ambient sound"
              className="p-1.5 relative transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" className="text-text-faint hover:text-text-secondary transition-colors">
                <path
                  d="M2 5.5h2l3-2.5v8l-3-2.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  strokeLinejoin="round"
                />
                {playing && (
                  <>
                    <path d="M9 5.2a2.5 2.5 0 010 3.6" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M10.5 3.8a4.5 4.5 0 010 6.4" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  </>
                )}
                {!playing && (
                  <line x1="9" y1="4.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                )}
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-4 h-px bg-text-secondary transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-4 h-px bg-text-secondary transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-soil/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[14px] tracking-[0.2em] font-mono text-text-faint hover:text-text-secondary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
