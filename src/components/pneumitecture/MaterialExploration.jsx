import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';

const materialSrc = (filename) =>
  `/${encodeURIComponent('images 2')}/${encodeURIComponent(filename)}`;

const images = [
  { src: materialSrc('material exp 1.jpg'), alt: 'Heat-sealed seams and material testing' },
  { src: materialSrc('material exp 2.JPG'), alt: 'Inflatable prototypes and samples' },
  { src: materialSrc('material exp 3.jpg'), alt: 'Failed prototype analysis' },
  { src: materialSrc('material exp 4.jpg'), alt: 'Assembly process documentation' },
  { src: materialSrc('material exp 5.jpg'), alt: 'Membrane surface detail' },
  { src: materialSrc('material exp 6.jpg'), alt: 'Scale testing with interaction' },
];

export default function MaterialExploration() {
  return (
    <section id="materials" className="py-32 md:py-48 max-w-7xl mx-auto px-8 md:px-16">
      <SectionLabel number="06" text="Material Exploration" />
      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">Before the form, the material</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 className="font-display font-extralight text-3xl md:text-4xl tracking-tight mb-16 max-w-2xl">
          Early experiments in air, membrane & failure
        </h2>
      </ScrollReveal>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((img, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="overflow-hidden aspect-square bg-aero/20">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Text block */}
      <ScrollReveal>
        <div className="mt-16 md:mt-24 max-w-2xl">
          <p className="font-display font-extralight text-foreground/70 text-base leading-relaxed">
            Material experimentation formed the backbone of the project's development. 
            Through systematic testing of heat-sealing techniques, membrane thicknesses, 
            and seam configurations, a vocabulary of failure and success emerged that 
            directly informed the final system's construction methodology.
          </p>
          <p className="tech-label text-structural mt-6">
            <span className="font-bold">Materials:</span> TPU Coated Fabric (Silk, Cotton) · TPU 3D Print Filament ·
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
