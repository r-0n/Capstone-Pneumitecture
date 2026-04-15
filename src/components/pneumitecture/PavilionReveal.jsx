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
        <SectionLabel number="08" text="The Pavilion" textFirst />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <ScrollReveal>
            <div className="mb-6 min-w-0">
              <p className="font-display font-extralight text-foreground/40 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl tracking-tight overflow-x-auto mb-0.5">
                A constructed atmosphere rather than a constructed object.
              </p>
              <p className="font-display font-bold text-foreground whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl tracking-tight overflow-x-auto">
                THE PAVILION
              </p>
            </div>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              The Pavilion is an extension of the Pneumitecture investigation, where ideas of air, softness, and atmospheric behavior become spatially tangible. It is not defined as a fixed architectural object, but as a condition that temporarily takes form.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Instead of relying on solidity or permanence, the Pavilion operates as a porous system. Boundaries remain unstable, and space is continuously shaped by light, air, and movement.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              It shifts the role of architecture away from enclosure and toward transformation.
            </p>
            <p className="font-display font-bold text-foreground text-base leading-relaxed mt-8 mb-3">
              Architecture as breath.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Within Pneumitecture, architecture is understood as a breathing system that is responsive, light, and constantly in flux. The Pavilion embodies this by resisting a single reading. It exists as a sequence of atmospheric states rather than a fixed form.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Depending on environmental conditions, it appears to thicken, dissolve, or almost disappear entirely.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              This instability is intentional. It reflects a shift toward architecture that is alive within its environment, rather than imposed upon it.
            </p>
            <p className="font-display font-bold text-foreground text-base leading-relaxed mt-8 mb-3">
              Material becomes atmosphere.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              The Pavilion explores the threshold where material stops acting as surface and begins behaving as atmosphere. Surfaces function less as boundaries and more as filters, softening edges, diffusing light, and blurring spatial definition.
            </p>
            <p className="font-display font-extralight text-foreground/80 text-base leading-relaxed mb-3">
              Here, architecture is not experienced as form, but as feeling. The experience is defined by immersion, ambiguity, and quiet spatial tension.
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
