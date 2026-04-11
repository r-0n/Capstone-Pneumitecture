"use client";

import { motion } from "framer-motion";

export function PavilionSection() {
  return (
    <section
      id="pavilion"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] py-28 md:py-36"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(15,18,28,0.75) 0%, rgba(30,40,60,0.45) 40%, rgba(240,248,255,0.35) 100%), radial-gradient(ellipse at 30% 70%, rgba(107,140,255,0.25), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[var(--canvas)]/25 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl"
        >
          A Walkthrough Experience
        </motion.h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
          Step inside, explore, interact — a pavilion-scale field of translucent cells, lit from
          within, breathing with the room.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-14 h-56 w-full max-w-xl rounded-[2rem] bg-linear-to-t from-white/90 via-sky-50/80 to-indigo-100/40 shadow-[var(--shadow-soft)] md:h-72"
        />
      </div>
    </section>
  );
}
