"use client";

import { motion } from "framer-motion";
import { SITE_SECTIONS } from "@/config/navigation";

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav-glass pointer-events-auto fixed inset-x-0 top-0 z-[200] border-b border-[var(--hairline)]"
    >
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-center gap-0 overflow-x-auto px-4 py-3.5 md:px-8"
        aria-label="Primary"
      >
        <ul className="flex min-w-max flex-nowrap items-center justify-center gap-x-0 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink-muted)] sm:text-[11px] md:text-[12px]">
          {SITE_SECTIONS.map((item, i) => (
            <li key={item.id} className="flex items-center">
              {i > 0 ? (
                <span className="mx-2 hidden text-[var(--hairline-strong)] sm:inline" aria-hidden>
                  |
                </span>
              ) : null}
              <a
                href={item.id === "top" ? "#top" : `#${item.id}`}
                className="rounded-full px-2 py-1 text-[var(--ink-muted)] transition-colors hover:bg-white/50 hover:text-[var(--ink)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
