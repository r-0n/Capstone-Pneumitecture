import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import DesignConceptFloatGallery from './DesignConceptFloatGallery';

const contentPad = 'mx-auto max-w-[min(100%,1200px)] px-5 sm:px-8 md:px-12 lg:px-14';

export default function DesignConcept() {
  return (
    <section id="concept" className="scroll-mt-24 py-20 text-foreground sm:py-28 md:py-36">
      <div className={contentPad}>
        <SectionLabel number="03" text="Design Concept" textFirst />
        <ScrollReveal>
          <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">Softness as an Atmospheric Structure</h2>
        </ScrollReveal>

        {/* Split layout */}
        <div className="mb-24 grid grid-cols-1 gap-12 md:mb-36 md:grid-cols-12 md:items-stretch md:gap-16">
          <ScrollReveal className="md:col-span-5">
            <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed mb-8">
              At its core, the project explores the dynimism of architecture based on human presence.
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
          </ScrollReveal>

          <ScrollReveal
            delay={0.2}
            className="flex min-h-[min(52vh,22rem)] flex-col md:col-span-7 md:min-h-0 md:h-full"
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <DesignConceptFloatGallery />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
