import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import FloatImage from './FloatImage';

const CONCEPT_IMG = 'https://media.base44.com/images/public/69da883791905282c2acac77/f3d27552b_generated_1489b319.png';

export default function DesignConcept() {
  return (
    <section id="concept" className="border-t border-[var(--hairline)] bg-[var(--canvas)] py-32 md:py-48 max-w-7xl mx-auto px-8 md:px-16">
      <SectionLabel number="03" text="Design Concept" textFirst />
      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">The Central Thesis</p>
        <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">Softness as an Atmospheric Structure</h2>
      </ScrollReveal>

      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-32 md:mb-48">
        <ScrollReveal className="md:col-span-5">
          <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed mb-8">
            The Pavilion is conceived as a responsive atmospheric structure, where space is generated through softness rather than solidity. Instead of fixed architectural elements, it is composed of inflatable and compliant forms that continuously shift between presence and dissolution.
          </p>
          <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
            Its spatial condition is not static. It is produced through cycles of expansion and release, allowing the pavilion to subtly reconfigure itself over time. This creates an environment that feels less constructed and more emergent, as if space is forming and unforming within the same gesture.
          </p>
          <p className="font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed">
            The design draws from natural respiratory systems, where rhythm, pressure, and flow generate continuity between body and environment. In this sense, the Pavilion behaves less like an object and more like a breathing field, where architecture is experienced as a living atmospheric condition.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="md:col-span-7">
          <div className="overflow-hidden">
            <FloatImage
              src={CONCEPT_IMG}
              alt="Pneumatic pavilion concept"
              className="w-full h-auto object-cover"
              amplitude={14}
              duration={9}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
