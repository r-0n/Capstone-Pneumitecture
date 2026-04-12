import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import FloatImage from './FloatImage';

const PAVILION_IMG = 'https://media.base44.com/images/public/69da883791905282c2acac77/ab5c92bac_generated_b1619c65.png';
const INTERACTION_IMG = "/images/pavilion.png";

export default function PavilionReveal() {
  return (
    <section id="pavilion" className="bg-transparent py-32 md:py-48">
      {/* Full-width pavilion image */}
      <ScrollReveal>
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={PAVILION_IMG}
            alt="Final pneumatic pavilion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 max-w-2xl">
            <p className="text-bone font-display font-extralight text-lg md:text-2xl leading-relaxed">
              A responsive pneumatic pavilion that breathes, adapts, and responds to human presence through kinetic inflatable architecture.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 2-column layout */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-20 md:mt-32">
        <SectionLabel number="01" text="The Pavilion" />
        <ScrollReveal>
          <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">A pavilion that breathes</p>
          <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">Design Concept</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <ScrollReveal>
            <p className="font-display font-extralight text-foreground/80 text-lg md:text-xl leading-relaxed">
              The central concept explores a responsive pneumatic pavilion built from soft inflatable columns. Each column acts as an independent actuator, capable of inflation and deflation to create shifting spatial volumes.
            </p>
            <p className="font-display font-extralight text-structural text-base mt-6 leading-relaxed">
              The system draws from biological models of respiration, where rhythmic expansion and contraction create dynamic, living environments that respond to human presence and environmental stimuli.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
