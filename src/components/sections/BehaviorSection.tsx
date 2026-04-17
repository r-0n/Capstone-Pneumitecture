"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { YouTubeForceMutedPlayer } from "@/components/pneumitecture/paradigm-shift/YouTubeForceMutedPlayer";
import { motion } from "framer-motion";

export function BehaviorSection() {
  return (
    <section
      id="behavior"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[radial-gradient(circle_at_0%_0%,rgba(255,250,242,0.72),rgba(255,250,242,0.18)_48%,transparent_74%),radial-gradient(circle_at_100%_0%,rgba(236,245,255,0.62),rgba(236,245,255,0.16)_52%,transparent_78%),linear-gradient(135deg,rgba(255,252,247,0.9),rgba(246,250,255,0.86)_58%,rgba(238,246,255,0.82))] py-20 md:py-28"
    >
      <div className="relative z-10 w-full px-4 md:px-6">
        <div className="mx-auto max-w-[1000px]">
          <SectionLabel number="08" text="Behavior" textFirst />
        </div>
        <div className="mx-auto max-w-[1680px]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="glass-card mt-4 overflow-hidden rounded-2xl p-3 md:p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
              Human Interaction Version
            </p>
            <div className="mt-3 grid gap-5 md:grid-cols-2">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--hairline)] bg-slate-100">
                  <YouTubeForceMutedPlayer
                    videoId="HhDLvsUwIR8"
                    title="Human Interaction Version video"
                    preferredQuality="highres"
                  />
                </div>
                <p className="mt-2 rounded-lg bg-white/70 px-2.5 py-1.5 text-sm font-medium leading-relaxed text-[var(--ink)]/88">
                  Live interaction capture showing how people influence the pneumatic response in real time.
                </p>
              </div>
              <div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--hairline)] bg-slate-100">
                  <YouTubeForceMutedPlayer
                    videoId="A9ya9y9IIzo"
                    title="Behavior choreography simulation video"
                    preferredQuality="highres"
                  />
                </div>
                <p className="mt-2 rounded-lg bg-white/70 px-2.5 py-1.5 text-sm font-medium leading-relaxed text-[var(--ink)]/88">
                  The project aimed to make the installation behave like choreography: timed, coordinated, and spatially composed motion.
                  This second video simulates that intent by previewing synchronized inflation patterns as a designed movement sequence.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
