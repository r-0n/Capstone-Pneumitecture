import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';

const sections = [
  { label: 'Hero', id: 'hero' },
  { label: 'Pavilion', id: 'pavilion-lead' },
  { label: 'Paradigm', id: 'paradigm-shift' },
  { label: 'Concept', id: 'concept' },
  { label: 'Materials', id: 'materials' },
  { label: 'System', id: 'system' },
  { label: 'Prototyping', id: 'prototyping' },
  { label: 'Interaction', id: 'interaction' },
  { label: 'Installation', id: 'installation' },
  { label: 'Reflection', id: 'reflection' },
  { label: 'Archive', id: 'archive' },
];

export default function NavOverlay() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(id));
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center mix-blend-difference"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-bone" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => scrollTo(s.id)}
                  className="text-bone font-display font-extralight text-3xl md:text-5xl tracking-tight hover:opacity-60 transition-opacity duration-300"
                >
                  {s.label}
                </motion.button>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 tech-label text-structural">
              Pneumitecture — 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
