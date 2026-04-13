import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';

const categories = ['All', 'Process', 'Diagrams', 'Final', 'AI Explorations'];

const archiveItems = [
  { src: '/process/P1.jpeg', cat: 'Process', alt: 'Process 1' },
  { src: '/diagram/D1.PNG', cat: 'Diagrams', alt: 'Diagram D1' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/f6f53df90_generated_4a8cfce4.png', cat: 'Final', alt: 'Evening installation' },
  { src: '/AI/A1.PNG', cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: '/AI/A2.PNG', cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: '/AI/A3.JPG', cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: '/AI/A4.PNG', cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: '/AI/A5.png', cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: '/process/P2.jpeg', cat: 'Process', alt: 'Process 2' },
  { src: '/diagram/D2.JPG', cat: 'Diagrams', alt: 'Diagram D2' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/35e41024e_generated_6a3cdc10.png', cat: 'Final', alt: 'Aerial view' },
  { src: '/process/P3.jpeg', cat: 'Process', alt: 'Process 3' },
  { src: '/diagram/D3.JPG', cat: 'Diagrams', alt: 'Diagram D3' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/c83535d10_generated_00681be3.png', cat: 'Final', alt: 'Interior experience' },
  { src: '/process/P4.jpeg', cat: 'Process', alt: 'Process 4' },
  { src: '/diagram/D4.png', cat: 'Diagrams', alt: 'Diagram D4' },
  { src: '/diagram/D5.png', cat: 'Diagrams', alt: 'Diagram D5' },
  { src: '/diagram/D6.jpg', cat: 'Diagrams', alt: 'Diagram D6' },
  { src: '/process/P5.jpeg', cat: 'Process', alt: 'Process 5' },
  { src: '/process/P6.jpeg', cat: 'Process', alt: 'Process 6' },
  { src: '/process/P7.jpeg', cat: 'Process', alt: 'Process 7' },
  { src: '/process/P8.jpeg', cat: 'Process', alt: 'Process 8' },
  { src: '/process/P9.jpeg', cat: 'Process', alt: 'Process 9' },
  { src: '/process/P10.jpeg', cat: 'Process', alt: 'Process 10' },
];

export default function MediaArchive() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All' 
    ? archiveItems 
    : archiveItems.filter(item => item.cat === filter);

  return (
    <section id="archive" className="py-32 md:py-48 max-w-7xl mx-auto px-8 md:px-16">
      <SectionLabel number="10" text="Media / Archive" />

      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">Every image, every diagram</p>
        <h2 className="font-display font-extralight text-3xl md:text-4xl tracking-tight mb-12">Project Archive</h2>
      </ScrollReveal>

      {/* Filter UI */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`tech-label px-4 py-2 border transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#121212] text-[#FBFBF9] border-[#121212]'
                  : 'bg-transparent text-[#707070] border-[rgba(0,0,0,0.15)] hover:border-[#121212]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden aspect-square bg-[#F5F5F3] group cursor-pointer relative"
            >
              <img
                src={item.src}
                alt={item.alt}
                onClick={() => setSelected(item)}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
          >
            <img
              src={selected.src}
              alt={selected.alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
