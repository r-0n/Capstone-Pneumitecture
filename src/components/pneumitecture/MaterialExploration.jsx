import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import { publicImages2Path } from '@/lib/publicAssetPath';

const images = [
  {
    src: publicImages2Path('material exp 1.jpg'),
    alt: 'Heat-sealed seams and material testing',
    label: 'Heat-Sealed Seams',
    desc: 'Controlled bonding of membrane layers using a soldering iron to form precise, curved seams.',
  },
  {
    src: publicImages2Path('material exp 2.JPG'),
    alt: 'Inflatable prototypes and samples',
    label: 'Pattern Mapping',
    desc: 'Translating geometric logic onto flat membranes to guide inflation behavior.',
  },
  {
    src: publicImages2Path('material exp 3.jpg'),
    alt: 'Failed prototype analysis',
    label: '3D Printed TPU Joint',
    desc: 'Flexible connector fabricated using TPU filament to link and stabilize pneumatic elements.',
  },
  {
    src: publicImages2Path('material exp 4.jpg'),
    alt: 'Assembly process documentation',
    label: 'TPU Fabric Sandwich',
    desc: 'TPU layer embedded between two Lycra fabrics to combine airtightness with flexibility.',
  },
  {
    src: publicImages2Path('material exp 5.jpg'),
    alt: 'Membrane surface detail',
    label: 'Structural Rod Integration',
    desc: 'Placing internal rods to support and maintain the form of inflated TPU elements.',
  },
  {
    src: publicImages2Path('material exp 6.jpg'),
    alt: 'Scale testing with interaction',
    label: 'Modular Unit Testing',
    desc: 'Exploration of repeatable connection nodes for scalable pneumatic assemblies.',
  },
];

function MaterialCard({ img, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div
        className="relative overflow-hidden aspect-square rounded-2xl bg-white shadow-md p-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-all duration-700 hover:scale-105"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-3"
            style={{
              background: hovered ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' : 'transparent',
              transition: 'background 0.4s ease',
            }}
          >
            <div
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <p className="tech-label text-white mb-1">{img.label}</p>
              <p className="font-display font-extralight text-white/80 text-sm leading-relaxed">{img.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function MaterialExploration() {
  return (
    <section id="materials" className="mx-auto max-w-7xl min-w-0 px-4 py-24 sm:px-6 md:px-12 md:py-48 lg:px-16">
      <SectionLabel number="06" text="Material Exploration" textFirst />
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
          <MaterialCard key={i} img={img} delay={i * 0.08} />
        ))}
      </div>

      {/* Text block */}
      <ScrollReveal>
        <div className="mt-16 md:mt-24 max-w-2xl">
          <p className="font-display font-extralight text-foreground/70 text-base leading-relaxed">
            Material experimentation formed the backbone of the project&apos;s development.
            Through systematic testing of heat-sealing techniques, membrane thicknesses,
            and seam configurations, a vocabulary of failure and success emerged that
            directly informed the final system&apos;s construction methodology.
          </p>
          <p className="tech-label text-structural mt-6">
            <span className="font-bold">Materials:</span> Lycra Fabric (Silk, Cotton) · TPU 3D Print Filament ·
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
