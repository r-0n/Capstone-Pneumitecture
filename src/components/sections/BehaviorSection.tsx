"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { motion } from "framer-motion";

export function BehaviorSection() {
  return (
    <section
      id="behavior"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-blueprint py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-10">
        <SectionLabel number="07" text="Behavior" textFirst />
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="glass-card mt-8 overflow-hidden rounded-2xl p-4 md:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Human Interaction Version
          </p>
          <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-[var(--hairline)] bg-slate-100">
            <iframe
              src="https://drive.google.com/file/d/1WeAxBJEg7rBfVf8Zh_8egIQhuaDbYUiG/preview"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Human Interaction Version video"
              allowFullScreen
            />
          </div>
        </motion.article>
      </div>
    </section>
  );
}
