import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';
import { SITE_SECTIONS } from '@/config/navigation';

export default function NavOverlay() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const [scrollUI, setScrollUI] = useState({ visible: false, thumbH: 0, thumbY: 0 });

  const scrollTo = (id) => {
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(id));
    });
  };

  useEffect(() => {
    if (!open) return;
    const navEl = navRef.current;
    if (!navEl) return;

    const updateScrollUI = () => {
      const { scrollHeight, clientHeight, scrollTop } = navEl;
      const hasOverflow = scrollHeight > clientHeight + 1;
      if (!hasOverflow) {
        setScrollUI({ visible: false, thumbH: 0, thumbY: 0 });
        return;
      }
      const trackH = clientHeight - 16;
      const rawThumb = (clientHeight / scrollHeight) * trackH;
      const thumbH = Math.max(48, Math.min(trackH, rawThumb));
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const maxTravel = Math.max(0, trackH - thumbH);
      const thumbY = (scrollTop / maxScroll) * maxTravel;
      setScrollUI({ visible: true, thumbH, thumbY });
    };

    updateScrollUI();
    navEl.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI);
    return () => {
      navEl.removeEventListener('scroll', updateScrollUI);
      window.removeEventListener('resize', updateScrollUI);
    };
  }, [open]);

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

            <div className="relative w-full max-w-[28rem]">
              <nav
                ref={navRef}
                className="flex max-h-[74vh] w-full flex-col items-center gap-3 overflow-y-auto px-4 py-2 pr-8 text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {SITE_SECTIONS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => scrollTo(s.id)}
                    className="max-w-full whitespace-normal text-bone font-display text-xl font-light leading-tight sm:text-2xl md:text-3xl lg:text-4xl tracking-tight hover:opacity-60 transition-opacity duration-300"
                  >
                    {s.label}
                  </motion.button>
                ))}
              </nav>
              {scrollUI.visible ? (
                <div className="pointer-events-none absolute bottom-2 right-2 top-2 w-3 rounded-full border border-white/15 bg-gradient-to-b from-white/20 to-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  <div
                    className="absolute left-[2px] right-[2px] rounded-full border border-white/25 bg-gradient-to-b from-[#dbe6ff] via-[#8ea7ff] to-[#70c9e8] shadow-[0_0_16px_rgba(126,155,255,0.65),inset_0_0_10px_rgba(255,255,255,0.35)] transition-[height,transform] duration-200"
                    style={{ height: `${scrollUI.thumbH}px`, transform: `translateY(${scrollUI.thumbY}px)` }}
                  />
                </div>
              ) : null}
            </div>

            <div className="absolute bottom-8 left-8 tech-label text-structural">
              Pneumitecture — Capstone Project 2026 @ New York University Abu Dhabi
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
