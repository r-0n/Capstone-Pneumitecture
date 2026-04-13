'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mouse } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';

const HERO_IMG =
  'https://media.base44.com/images/public/69da883791905282c2acac77/57cf0bf69_generated_b102ce0f.png';

const SCROLL_TOP_THRESHOLD = 20;

export default function HeroSection() {
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrollHintVisible(window.scrollY < SCROLL_TOP_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-dvh w-full overflow-hidden bg-[#121212]">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt="Pneumatic membrane structure"
          className="h-full min-h-dvh w-full scale-110 object-cover will-change-transform"
          style={{ animation: 'heroFloat 20s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 bg-obsidian/40" />
      </div>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: scale(1.1) translate(0, 0); }
          33% { transform: scale(1.12) translate(-1%, -1.5%); }
          66% { transform: scale(1.1) translate(1%, 1%); }
        }
        @keyframes scroll-nudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
      `}</style>

      {/* Static handoff strip — no scroll-linked Framer layer (keeps wheel instant) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-b from-transparent via-obsidian/55 to-[#FBFBF9] md:h-36"
      />

      <div className="relative z-[4] flex min-h-dvh flex-col justify-between p-8 pb-24 md:p-16 md:pb-28">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="display-heading text-bone text-[12vw] md:text-[8vw] leading-none">
            PNEUMI
          </h1>
        </motion.div>

        <div className="flex flex-col items-end">
          <motion.h1
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="display-heading text-bone text-[12vw] md:text-[8vw] leading-none"
          >
            TECTURE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-bone/70 font-display font-extralight text-sm md:text-lg mt-6 max-w-xl text-right tracking-wide"
          >
            A kinetic architectural system exploring pneumatic responsiveness
          </motion.p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('pavilion-lead')}
        aria-label="Go to pavilion premise section"
        tabIndex={scrollHintVisible ? 0 : -1}
        className={`absolute bottom-3 left-1/2 z-30 -translate-x-1/2 cursor-pointer border-0 bg-transparent p-1 text-left transition-[opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 md:bottom-4 ${
          scrollHintVisible
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        <span className="flex flex-col items-center gap-0.5 rounded border border-white/12 bg-black/35 px-1.5 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <Mouse className="size-2 shrink-0 text-bone/30" strokeWidth={1} aria-hidden />
          <span className="tech-label text-bone/45 text-[6px] leading-none tracking-[0.22em]">
            Scroll
          </span>
          <span
            className="text-bone/35"
            style={{ animation: 'scroll-nudge 1.5s ease-in-out infinite' }}
            aria-hidden
          >
            <ChevronDown className="size-2" strokeWidth={2.5} />
          </span>
        </span>
      </button>
    </section>
  );
}
