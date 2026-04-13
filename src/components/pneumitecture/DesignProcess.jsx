import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';

const phases = [
  {
    num: 1,
    img: '/images2/base1.png',
    title: 'Circular Geometry',
    sub: '& Plan Organisation',
  },
  {
    num: 2,
    img: '/images2/' + encodeURIComponent('base 2.png'),
    title: 'Space Frame',
    sub: '& Structural System',
  },
  {
    num: 3,
    img: '/images2/' + encodeURIComponent('base 3.png'),
    title: 'Volumetric Form',
    sub: 'Development',
  },
  {
    num: 4,
    img: '/images2/base4.png',
    title: 'Triangulated Skin',
    sub: '& Cladding Panels',
  },
  {
    num: 5,
    img: '/images2/' + encodeURIComponent('base 5.png'),
    title: 'Biomorphic Facade',
    sub: '& Final Envelope',
  },
];

export default function DesignProcess() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="design-process" className="py-32 md:py-48 w-full px-4 md:px-8">
      <SectionLabel number="04" text="Design Process" />

      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">
          The central thesis
        </p>
        <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">
          From geometry to form
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <div className="space-y-3">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {phases.slice(0, 3).map((phase, i) => (
            <ScrollReveal key={phase.num} delay={i * 0.1}>
              <div
                className="flex flex-col items-center text-center cursor-default"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl p-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    padding: 0,
                    transform: hovered === i ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: hovered === i ? '0 12px 40px rgba(0,0,0,0.09)' : '0 0 0 rgba(0,0,0,0)',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  }}
                >
                  <img
                    src={phase.img}
                    alt={phase.title}
                    className="absolute inset-0 h-full w-full border-0 object-contain block"
                  />
                </div>
                <div
                  className="w-7 h-7 rounded-full bg-obsidian flex items-center justify-center mb-3 flex-shrink-0 transition-transform duration-300"
                  style={{ transform: hovered === i ? 'scale(1.15)' : 'scale(1)' }}
                >
                  <span className="text-bone font-mono text-[10px]">{phase.num}</span>
                </div>
                <span className="tech-label text-obsidian block" style={{ opacity: hovered === null || hovered === i ? 1 : 0.3, transition: 'opacity 0.3s' }}>{phase.title}</span>
                <span className="tech-label text-structural/60 block" style={{ opacity: hovered === null || hovered === i ? 1 : 0.2, transition: 'opacity 0.3s' }}>{phase.sub}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="flex flex-col md:flex-row justify-center gap-3">
          {phases.slice(3, 5).map((phase, i) => (
            <ScrollReveal key={phase.num} delay={(i + 3) * 0.1} className="md:w-1/3">
              <div
                className="flex flex-col items-center text-center cursor-default"
                onMouseEnter={() => setHovered(i + 3)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl p-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    padding: 0,
                    transform: hovered === i + 3 ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: hovered === i + 3 ? '0 12px 40px rgba(0,0,0,0.09)' : '0 0 0 rgba(0,0,0,0)',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  }}
                >
                  <img
                    src={phase.img}
                    alt={phase.title}
                    className="absolute inset-0 h-full w-full border-0 object-contain block"
                  />
                </div>
                <div
                  className="w-7 h-7 rounded-full bg-obsidian flex items-center justify-center mb-3 flex-shrink-0 transition-transform duration-300"
                  style={{ transform: hovered === i + 3 ? 'scale(1.15)' : 'scale(1)' }}
                >
                  <span className="text-bone font-mono text-[10px]">{phase.num}</span>
                </div>
                <span className="tech-label text-obsidian block" style={{ opacity: hovered === null || hovered === i + 3 ? 1 : 0.3, transition: 'opacity 0.3s' }}>{phase.title}</span>
                <span className="tech-label text-structural/60 block" style={{ opacity: hovered === null || hovered === i + 3 ? 1 : 0.2, transition: 'opacity 0.3s' }}>{phase.sub}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
