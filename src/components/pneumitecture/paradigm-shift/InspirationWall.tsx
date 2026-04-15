"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const floatSlow = {
  y: [0, -8, 0],
  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

const floatMed = {
  y: [0, 7, 0],
  transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const, delay: 0.4 },
};

export function InspirationWall() {
  return (
    <div className="relative min-h-[320px] lg:min-h-[380px]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          2. The inspiration wall
        </p>
        <button
          type="button"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 underline-offset-4 transition hover:text-neutral-700 hover:underline"
        >
          Menu (O)
        </button>
      </div>

      <div className="relative mx-auto mt-6 aspect-[16/11] max-w-xl overflow-visible rounded-sm">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-neutral-300/35"
          aria-hidden
        >
          <defs>
            <filter id="paradigm-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
            </filter>
          </defs>
          <circle cx="18%" cy="58%" r="16%" fill="currentColor" filter="url(#paradigm-blur)" />
          <circle cx="42%" cy="28%" r="12%" fill="currentColor" filter="url(#paradigm-blur)" />
          <circle cx="68%" cy="38%" r="18%" fill="currentColor" filter="url(#paradigm-blur)" />
          <circle cx="86%" cy="68%" r="10%" fill="currentColor" filter="url(#paradigm-blur)" />
        </svg>

        <motion.div
          className="absolute left-[4%] top-[18%] h-[38%] w-[32%] rotate-[-6deg] overflow-hidden rounded-[2rem] opacity-70 grayscale"
          animate={floatSlow}
        >
          <Image
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
        <motion.div
          className="absolute right-[8%] top-[12%] h-[34%] w-[30%] rotate-[8deg] overflow-hidden rounded-full opacity-60 grayscale"
          animate={floatMed}
        >
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-[8%] left-[22%] h-[28%] w-[26%] rotate-[4deg] overflow-hidden rounded-3xl opacity-55 grayscale"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-[min(52%,220px)] -translate-x-1/2 -translate-y-1/2 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border border-white/90 bg-white p-2 pb-8 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=85"
                alt="Industrial springs reference"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <p className="mt-2 text-center font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-500">
              Springs — actuation study
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
