import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import SectionLabel from './SectionLabel';
import { publicAssetPath } from '@/lib/publicAssetPath';

const categories = ['All', 'Process', 'Diagrams', 'Final', 'AI Explorations'];

const archiveItems = [
  { src: publicAssetPath('/process/P1.jpeg'), cat: 'Process', alt: 'Process 1' },
  { src: publicAssetPath('/diagram/D1.PNG'), cat: 'Diagrams', alt: 'Diagram D1' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/f6f53df90_generated_4a8cfce4.png', cat: 'Final', alt: 'Evening installation' },
  { src: publicAssetPath('/AI/A1.PNG'), cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: publicAssetPath('/AI/A2.PNG'), cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: publicAssetPath('/AI/A3.JPG'), cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: publicAssetPath('/AI/A4.PNG'), cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: publicAssetPath('/AI/A5.png'), cat: 'AI Explorations', alt: 'AI Exploration' },
  { src: publicAssetPath('/process/P2.jpeg'), cat: 'Process', alt: 'Process 2' },
  { src: publicAssetPath('/diagram/D2.JPG'), cat: 'Diagrams', alt: 'Diagram D2' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/35e41024e_generated_6a3cdc10.png', cat: 'Final', alt: 'Aerial view' },
  { src: publicAssetPath('/process/P3.jpeg'), cat: 'Process', alt: 'Process 3' },
  { src: publicAssetPath('/diagram/D3.JPG'), cat: 'Diagrams', alt: 'Diagram D3' },
  { src: 'https://media.base44.com/images/public/69da883791905282c2acac77/c83535d10_generated_00681be3.png', cat: 'Final', alt: 'Interior experience' },
  { src: publicAssetPath('/process/P4.jpeg'), cat: 'Process', alt: 'Process 4' },
  { src: publicAssetPath('/diagram/D4.png'), cat: 'Diagrams', alt: 'Diagram D4' },
  { src: publicAssetPath('/diagram/D5.png'), cat: 'Diagrams', alt: 'Diagram D5' },
  { src: publicAssetPath('/diagram/D6.jpg'), cat: 'Diagrams', alt: 'Diagram D6' },
  { src: publicAssetPath('/process/P5.jpeg'), cat: 'Process', alt: 'Process 5' },
  { src: publicAssetPath('/process/P6.jpeg'), cat: 'Process', alt: 'Process 6' },
  { src: publicAssetPath('/process/P7.jpeg'), cat: 'Process', alt: 'Process 7' },
  { src: publicAssetPath('/process/P8.jpeg'), cat: 'Process', alt: 'Process 8' },
  { src: publicAssetPath('/process/P9.jpeg'), cat: 'Process', alt: 'Process 9' },
  { src: publicAssetPath('/process/P10.jpeg'), cat: 'Process', alt: 'Process 10' },
];

export default function MediaArchive() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showWeeklyLinks, setShowWeeklyLinks] = useState(false);
  const weeklyLinksRef = useRef(null);

  const filtered = filter === 'All' 
    ? archiveItems 
    : archiveItems.filter(item => item.cat === filter);

  useEffect(() => {
    if (!showWeeklyLinks) return;
    const onPointerDown = (e) => {
      const target = e.target;
      if (weeklyLinksRef.current && !weeklyLinksRef.current.contains(target)) {
        setShowWeeklyLinks(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [showWeeklyLinks]);

  return (
    <section id="archive" className="mx-auto max-w-7xl min-w-0 px-4 py-24 sm:px-6 md:px-12 md:py-48 lg:px-16">
      <SectionLabel number="10" text="Media / Archive" textFirst />

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
          <span className="mx-1 hidden h-10 w-px bg-[rgba(0,0,0,0.12)] md:block" aria-hidden />
          <div ref={weeklyLinksRef} className="contents">
            <button
              type="button"
              onClick={() => setShowWeeklyLinks((prev) => !prev)}
              className={`tech-label px-4 py-2 border transition-all duration-300 ${
                showWeeklyLinks
                  ? 'bg-[#121212] text-[#FBFBF9] border-[#121212]'
                  : 'bg-transparent text-[#707070] border-[rgba(0,0,0,0.15)] hover:border-[#121212]'
              }`}
            >
              Weekly Blog Links
            </button>
            <AnimatePresence>
              {showWeeklyLinks
                ? [
                    <motion.a
                      key="weekly-notion-r0n"
                      href="https://www.notion.so/Capstone-Journey-2607962f620780ffbfabe559b247534c?source=copy_link"
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="tech-label border border-[rgba(0,0,0,0.15)] px-4 py-2 text-[#707070] transition-all duration-300 hover:border-[#121212] hover:text-[#121212]"
                    >
                      r-0n
                    </motion.a>,
                    <motion.a
                      key="weekly-notion-mariam"
                      href="https://www.notion.so/Capstone-Progress-2626e8ec69fb80648cfde741894381bf?source=copy_link"
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="tech-label border border-[rgba(0,0,0,0.15)] px-4 py-2 text-[#707070] transition-all duration-300 hover:border-[#121212] hover:text-[#121212]"
                    >
                      Mariam
                    </motion.a>,
                  ]
                : null}
            </AnimatePresence>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square cursor-pointer overflow-hidden bg-[#F5F5F3]"
              onClick={() => setSelected(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(item);
                }
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4"
          >
            <div
              className="pointer-events-auto max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                width={2000}
                height={1500}
                sizes="90vw"
                className="h-auto max-h-[90vh] w-auto max-w-[min(90vw,1200px)] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
