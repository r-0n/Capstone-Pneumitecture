"use client";

import { motion } from "framer-motion";
import { SITE_SECTIONS } from "@/config/navigation";
import { scrollToSection } from "@/lib/scrollToSection";

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav-glass pointer-events-auto fixed inset-x-0 top-0 z-[200] border-b border-[var(--hairline)] pt-[env(safe-area-inset-top,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]"
    >
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-center gap-0 overflow-x-auto px-2 py-3 md:px-5"
        aria-label="Primary"
      >
        <ul className="flex min-w-max flex-nowrap items-center justify-center gap-x-0 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--ink-muted)] sm:text-[10px] md:text-[11px]">
          {SITE_SECTIONS.map((item, i) => (
            <li key={item.id} className="flex items-center">
              {i > 0 ? (
                <span className="mx-1.5 hidden text-[var(--hairline-strong)] sm:inline" aria-hidden>
                  |
                </span>
              ) : null}
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="rounded-full px-1.5 py-1 text-[var(--ink-muted)] transition-colors hover:bg-white/50 hover:text-[var(--ink)]"
              >
                <span className="sm:hidden">{item.shortLabel ?? item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
