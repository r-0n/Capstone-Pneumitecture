import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import ConceptCard from './ConceptCard';
import FloatImage from './FloatImage';

const CONCEPT_IMG = 'https://media.base44.com/images/public/69da883791905282c2acac77/f3d27552b_generated_1489b319.png';

const SOFT_IMG =
  '/images/' + encodeURIComponent('Gemini_Generated_Image_5wyv915wyv915wyv (2).png');
const INFLATE_IMG =
  '/images/' + encodeURIComponent('Gemini_Generated_Image_5wyv915wyv915wyv (1).png');
const PNEUMA_IMG = '/images/pneumatics.PNG';

const cards = [
  {
    title: 'Softness',
    image: SOFT_IMG,
    description:
      'Softness is explored as a spatial condition rather than a material quality. It enables architecture to move away from rigidity and towards adaptability, where form can deform, respond, and continuously shift in relation to external forces.',
  },
  {
    title: 'Inflatables',
    image: INFLATE_IMG,
    description:
      'Inflatables introduce a lightweight system of spatial transformation driven by air. Their ability to expand and collapse allows architecture to exist in a state of constant change, challenging permanence and static form.',
  },
  {
    title: 'Pneumatics',
    image: PNEUMA_IMG,
    description:
      'Pneumatics act as the driving mechanism behind the system, translating air pressure into controlled movement. This enables responsive behavior, where structural form becomes directly linked to environmental and human interaction.',
  },
];

export default function DesignConcept() {
  return (
    <section id="concept" className="py-32 md:py-48 max-w-7xl mx-auto px-8 md:px-16">
      <SectionLabel number="03" text="Design Concept" />
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

      {/* Conceptual Foundations */}
      <ScrollReveal>
        <h3 className="font-display font-extralight text-xl md:text-2xl tracking-tight mb-12">
          Conceptual Foundations
        </h3>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <ConceptCard key={card.title} {...card} index={i} />
        ))}
      </div>
    </section>
  );
}
