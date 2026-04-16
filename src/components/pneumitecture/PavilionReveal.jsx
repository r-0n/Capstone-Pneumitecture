'use client';

import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import FloatImage from './FloatImage';

import { publicAssetPath } from '@/lib/publicAssetPath';

const INTERACTION_IMG = publicAssetPath('/images/pavilion.png');
const PAVILION_COL_IMG_2 = publicAssetPath('/images/pav1.PNG');
const PAVILION_COL_IMG_3 = publicAssetPath('/images/pav2.png');

export default function PavilionReveal() {
  return (
    <section
      id="pavilion"
      className="relative z-[5] scroll-mt-24 bg-[#FBFBF9] pb-32 md:pb-48"
    >
      <div className="mx-auto max-w-7xl px-8 pt-12 md:px-16 md:pt-16">
        <SectionLabel number="09" text="Future Vision" textFirst />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <ScrollReveal>
            <div className="mb-6 min-w-0">
              <p className="font-display font-extralight text-foreground/40 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl tracking-tight overflow-x-auto mb-0.5">
                A constructed atmosphere rather than a constructed object.
              </p>
              <p className="font-display font-bold text-foreground whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl tracking-tight overflow-x-auto">
                FUTURE VISION
              </p>
            </div>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              The Pavilion emerges as a continuation of the Pneumitecture investigation, projecting a future where air, softness, and atmospheric behavior become spatially tangible. It is no longer understood as a fixed architectural object, but as a condition—one that forms, adapts, and dissolves over time.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Rather than relying on solidity or permanence, the Pavilion operates as a porous and responsive system. Boundaries remain unstable, continuously reshaped by light, air, and human presence.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              In this vision, architecture shifts away from enclosure and toward transformation.
            </p>
            <p className="font-display font-bold text-foreground text-base leading-relaxed mt-8 mb-3">
              Architecture as breath
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Within this future, architecture behaves as a living, breathing system—responsive, lightweight, and in constant flux. The Pavilion resists a singular interpretation, existing instead as a sequence of evolving atmospheric states.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Its presence is never fixed. It thickens, softens, or dissipates depending on environmental and human conditions, creating a dynamic relationship between body and space.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              This instability is intentional. It proposes an architecture that is not imposed, but one that lives, reacts, and coexists with its surroundings.
            </p>
            <p className="font-display font-bold text-foreground text-base leading-relaxed mt-8 mb-3">
              Material becomes atmosphere
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Here, materiality moves beyond surface. The Pavilion explores a threshold where matter begins to behave as atmosphere—where boundaries blur and dissolve into gradients.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Surfaces act as filters rather than edges, diffusing light, softening spatial limits, and allowing space to feel fluid and indeterminate.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              In this future vision, architecture is no longer experienced as form, but as sensation—defined by immersion, ambiguity, and a quiet, responsive tension between body, material, and air.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-3">
              <div className="overflow-hidden">
                <FloatImage
                  src={INTERACTION_IMG}
                  alt="People engaging with the pavilion"
                  className="w-full h-auto object-cover"
                  amplitude={16}
                  duration={8}
                  delay={1}
                />
              </div>
              <div className="overflow-hidden">
                <FloatImage
                  src={PAVILION_COL_IMG_2}
                  alt="Pavilion detail"
                  className="w-full h-auto object-cover"
                  amplitude={16}
                  duration={8}
                  delay={1.2}
                />
              </div>
              <div className="overflow-hidden">
                <FloatImage
                  src={PAVILION_COL_IMG_3}
                  alt="Pavilion detail"
                  className="w-full h-auto object-cover"
                  amplitude={16}
                  duration={8}
                  delay={1.4}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
