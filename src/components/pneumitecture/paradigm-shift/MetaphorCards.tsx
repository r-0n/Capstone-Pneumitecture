"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cardBase =
  "group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.06)] backdrop-blur-sm";

export function MetaphorCards() {
  return (
    <div>
      <p className="mb-6 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
        3. The metaphor
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={cardBase}
        >
          <span className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/40 font-sans text-[10px] text-white/80">
            A
          </span>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="https://images.unsplash.com/photo-1576086213369-97a306367367?w=600&q=80"
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width:768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/35 to-transparent" />
            <p className="absolute inset-0 flex items-center justify-center font-display text-xl font-extralight tracking-[0.35em] text-white md:text-2xl">
              VISCERAL
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={cardBase}
        >
          <span className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/40 font-sans text-[10px] text-white/80">
            B
          </span>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80"
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width:768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
            <p className="absolute inset-0 flex items-center justify-center font-display text-xl font-extralight tracking-[0.35em] text-white md:text-2xl">
              FEEDBACK
            </p>
          </div>
        </motion.div>
      </div>
      <p className="mx-auto mt-8 max-w-xl text-center font-sans text-sm font-light leading-relaxed text-white/70 md:text-[15px]">
        Spatial empathy is breaking physical and digital boundaries — softness as signal, pressure as
        dialogue, and atmosphere as something you feel before you name it.
      </p>
    </div>
  );
}
