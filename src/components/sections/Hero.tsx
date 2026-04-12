"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ReferencePillowBackground } from "@/components/hero/ReferencePillowBackground";

const titleEase = [0.16, 1, 0.3, 1] as const;

function ScrollChevron() {
  return (
    <svg
      className="mt-1.5 h-2 w-3 text-white/75"
      viewBox="0 0 12 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 1.5 L6 6.5 L11 1.5" />
    </svg>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const titleTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.1, ease: titleEase };

  const subTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.85, delay: 0.32, ease: titleEase };

  const pneumiInitial = reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -26, y: -26 };
  const pneumiAnimate = { opacity: 1, x: 0, y: 0 };

  const tectureInitial = reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 26, y: 26 };
  const tectureAnimate = { opacity: 1, x: 0, y: 0 };

  const subInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 };
  const subAnimate = { opacity: 1, y: 0 };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--canvas)] pb-16 pt-6 md:pb-24 md:pt-8"
    >
      <ReferencePillowBackground />

      {/* Legibility overlay — matches reference mood; background asset unchanged */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/[0.22] via-black/[0.28] to-black/[0.38]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-1 flex-col px-6 md:px-12">
        <h1 className="sr-only">Pneumitecture</h1>
        <div className="pointer-events-none absolute inset-0">
          <motion.p
            className="absolute left-6 top-16 font-sans text-[clamp(2.75rem,9.5vw,6.25rem)] font-extralight leading-none tracking-[0.14em] text-white md:left-10 md:top-20"
            initial={pneumiInitial}
            animate={pneumiAnimate}
            transition={titleTransition}
          >
            PNEUMI
          </motion.p>
          <motion.p
            className="absolute bottom-44 right-6 text-right font-sans text-[clamp(2.75rem,9.5vw,6.25rem)] font-extralight leading-none tracking-[0.14em] text-white md:bottom-52 md:right-10"
            initial={tectureInitial}
            animate={tectureAnimate}
            transition={titleTransition}
          >
            TECTURE
          </motion.p>
        </div>

        <div className="relative z-20 mt-auto flex w-full max-w-[720px] flex-col items-center self-center px-2 pb-6 pt-8 md:max-w-[820px] md:pb-8 md:pt-12">
          <motion.p
            className="text-center font-sans text-[15px] font-extralight leading-snug tracking-tight text-white md:text-[17px] md:leading-relaxed"
            initial={subInitial}
            animate={subAnimate}
            transition={subTransition}
          >
            A kinetic architectural system exploring pneumatic responsiveness
          </motion.p>

          <motion.a
            href="#concept"
            className="mt-8 flex flex-col items-center text-[10px] font-extralight uppercase tracking-[0.35em] text-white/55 md:mt-10 md:text-[11px]"
            animate={reduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SCROLL
            <ScrollChevron />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
