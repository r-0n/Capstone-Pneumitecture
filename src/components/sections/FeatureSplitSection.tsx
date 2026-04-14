"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { publicAssetPath } from "@/lib/publicAssetPath";

const SPLIT_IMAGE = publicAssetPath("/images/pavilion.png");

export function FeatureSplitSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="feature-split bg-[var(--canvas)] px-5 py-10 md:px-5 md:py-20"
      aria-labelledby="feature-split-heading"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col text-center md:text-left"
        >
          <h2
            id="feature-split-heading"
            className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Design Concept
          </h2>
          <p className="mt-3 text-base font-medium text-[#666] md:text-lg">
            A pavilion that breathes
          </p>
          <div className="mx-auto mt-5 max-w-[500px] space-y-4 text-sm leading-relaxed text-[var(--ink-muted)] md:mx-0 md:text-base">
            <p>
              The central concept explores a responsive pneumatic pavilion built from soft inflatable
              columns. Each column acts as an independent actuator, capable of inflation and
              deflation to create shifting spatial volumes.
            </p>
            <p>
              The system draws from biological models of respiration, where rhythmic expansion and
              contraction create dynamic, living environments that respond to human presence and
              environmental stimuli.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="group relative w-full overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-shadow duration-300 ease-out hover:shadow-[0_28px_72px_rgba(15,23,42,0.12)]"
        >
          <div className="relative aspect-[4/3] w-full min-h-[240px] transition-transform duration-300 ease-out group-hover:scale-[1.02] md:aspect-[5/4]">
            <Image
              src={SPLIT_IMAGE}
              alt="Soft interior architecture with natural light"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
