import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/69da883791905282c2acac77/57cf0bf69_generated_b102ce0f.png';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Pneumatic membrane structure"
          className="w-full h-full object-cover scale-110"
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
      `}</style>

      {/* Title - split diagonal */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-16">
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="tech-label text-bone/50 text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-bone/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
