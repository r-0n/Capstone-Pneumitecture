"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const SOFT_1 = "https://media.base44.com/images/public/69da883791905282c2acac77/c6cce64a4_generated_image.png";
const SOFT_2 = "https://media.base44.com/images/public/69da883791905282c2acac77/a8704d1c6_generated_image.png";
const SOFT_3 = "https://media.base44.com/images/public/69da883791905282c2acac77/af3c113a0_generated_image.png";

const contentPad = "mx-auto max-w-[min(100%,1200px)] px-5 sm:px-8 md:px-12 lg:px-14";

export default function DesignConcept() {
  return (
    <section id="concept" className="scroll-mt-24 py-20 text-foreground sm:py-28 md:py-36">
      <div className={contentPad}>
        <SectionLabel number="03" text="Design Concept" textFirst />
        <ScrollReveal>
          <h2 className="mb-16 max-w-3xl font-display text-3xl font-extralight tracking-tight md:text-5xl">
            Softness as an Atmospheric Structure
          </h2>
        </ScrollReveal>

        <div className="mb-24 grid grid-cols-1 gap-8 md:mb-36 md:grid-cols-[0.9fr_1.3fr] md:gap-12">
          <ScrollReveal>
            <div className="flex h-full flex-col justify-center py-4">
              <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                At its core, the project explores the dynamism of architecture based on human presence.
                Traditional architecture is typically conceived as static: walls,
                ceilings, and surfaces that remain fixed once constructed. This project challenges that
                paradigm by imagining a spatial system composed of soft pneumatic cells capable of continuous
                transformation through cycles of inflation and deflation.

                Pneumitecture is conceived as a responsive atmospheric structure, where space becomes dynamic
                through softness rather than solidity. Instead of fixed architectural elements, it is composed
                of inflatable forms that continuously performs choreography in response to human presence.
              </p>
              <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                Its spatial condition is not static. It is produced through cycles of expansion and release,
                allowing it to subtly reconfigure itself over time. This creates an environment that feels less
                constructed and more emergent, as if space is forming and unforming within the same gesture.
              </p>
              <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed">
                The design draws from natural respiratory systems, where rhythm, pressure, and flow generate
                continuity between body and environment. In this sense, the Pavilion behaves less like an
                object and more like a breathing field, where architecture is experienced as a living atmospheric
                condition.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-5 lg:gap-6">
            <ScrollReveal delay={0.15} className="md:col-span-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[var(--paper)]/95 shadow-sm md:aspect-[14/7]"
              >
                <Image
                  src={SOFT_3}
                  alt="Hand touching soft membrane"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="md:col-span-6 md:mt-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--paper)]/95 shadow-sm md:aspect-[1/1]"
              >
                <Image
                  src={SOFT_2}
                  alt="Pneumatic pillow forms"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.25} className="md:col-span-6 md:-mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[7/4] overflow-hidden rounded-xl bg-[var(--paper)]/95 shadow-sm md:aspect-[6/4]"
              >
                <Image
                  src={SOFT_1}
                  alt="Translucent membrane folds"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
