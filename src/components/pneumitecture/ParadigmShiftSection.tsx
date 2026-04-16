"use client";

import Image from "next/image";
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import ScrollReveal from "@/components/pneumitecture/ScrollReveal";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { InspirationWall } from "@/components/pneumitecture/paradigm-shift/InspirationWall";
import { MetaphorCards } from "@/components/pneumitecture/paradigm-shift/MetaphorCards";
import { ArtifactsPeelStack } from "@/components/pneumitecture/paradigm-shift/ArtifactsPeelStack";
import { ConceptualFoundationsBand } from "@/components/pneumitecture/paradigm-shift/ConceptualFoundationsBand";
import { ParadigmWaveBackdrop, ParadigmWaveFill } from "@/components/pneumitecture/paradigm-shift/ParadigmWavySeparator";
import DesignConcept from "@/components/pneumitecture/DesignConcept";

const BREATHING_DOME_SKETCH = publicAssetPath("/images/breathing-dome-sketch.png");

const BONE = "#fbfbf9";
const OBSIDIAN = "#121212";

const introPad = "mx-auto max-w-[min(100%,1200px)] px-5 sm:px-8 md:px-12 lg:px-14";
const cellPad = "h-full px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-10 lg:py-20 xl:px-12";

const topCellBorder = "border-b border-[var(--hairline)] lg:border-r lg:border-b-0";
const darkCellBorder = "border-b border-white/[0.08] lg:border-r lg:border-b-0";

export default function ParadigmShiftSection() {
  return (
    <section
      id="paradigm-shift"
      className="relative isolate scroll-mt-24 overflow-x-hidden bg-bone text-foreground"
    >
      {/* Wave + watermark only cover intro + 2×2 so DesignConcept stays on bone */}
      <div className="relative isolate overflow-x-hidden">
        <ParadigmWaveBackdrop boneFill={BONE} obsidianFill={OBSIDIAN} className="z-0" />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex justify-center overflow-hidden px-4 pt-6 sm:pt-10 md:pt-14"
          aria-hidden
        >
          <p className="max-w-[100%] text-center font-display text-[clamp(1.85rem,11vw,7rem)] font-extralight uppercase leading-none tracking-[0.08em] text-[var(--ink)] opacity-[0.07] select-none">
            The paradigm shift
          </p>
        </div>

        <div className="relative z-[2]">
          <div className={`${introPad} border-b border-[var(--hairline)] pb-8 pt-12 sm:pb-10 sm:pt-14 md:pt-16`}>
          <SectionLabel number="02" text="Concept" textFirst />
          <ScrollReveal>
            <h2 className="relative mt-3 max-w-[min(100%,40rem)] font-display text-[clamp(1.65rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-tight text-[var(--ink)]">
              A Shift in Paradigm
            </h2>
            <p className="relative mt-4 max-w-[min(100%,34rem)] font-sans text-[15px] font-light leading-relaxed text-[var(--ink-muted)] md:text-[16px] md:leading-[1.65]">
              Philosophy, reference, motion, and artifact—each register opens a different conversation before
              the work moves into process and system.
            </p>
          </ScrollReveal>
          </div>

          {/* 2×2 · top row: light · bottom row: dark (matches reference) */}
          <div className="relative mx-auto grid max-w-[1800px] grid-cols-1 lg:grid-cols-2 lg:items-stretch">
          {/* 1 · Philosophy */}
          <div className={`relative min-h-0 ${topCellBorder}`}>
            <div className={cellPad}>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-structural md:text-[12px]">
                1. The philosophy
              </p>
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                <div className="relative mx-auto aspect-[2/1] w-full max-w-[min(100%,360px)] shrink-0 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--paper)] shadow-[var(--shadow-soft)] lg:mx-0 lg:w-[44%] lg:max-w-none">
                  <Image
                    src={BREATHING_DOME_SKETCH}
                    alt="Hand-drawn breathing dome study with annotations and BREATHING DOME title"
                    fill
                    className="object-contain object-center p-3 sm:p-4"
                    sizes="(max-width:1024px) 90vw, 45vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--paper)]/95 to-transparent py-2 text-center font-display text-[8px] font-light uppercase tracking-[0.36em] text-structural">
                    BREATHING DOME
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-3 font-display text-lg font-light italic leading-snug md:text-xl">
                    What if our buildings were not just containers, but companions?
                  </p>
                  <p className="max-w-prose text-pretty font-sans text-[13px] font-light leading-[1.75] text-structural md:text-[14px]">
                    At its core, the project explores the possibility of architecture that moves, breathes, and
                    responds like a living organism. Traditional architecture is typically conceived as static:
                    walls, ceilings, and surfaces that remain fixed once constructed. This project challenges that
                    paradigm by imagining a spatial system composed of soft pneumatic cells capable of continuous
                    transformation through cycles of inflation and deflation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2 · Inspiration — light band */}
          <div className="relative min-h-0 border-b border-[var(--hairline)] lg:border-b-0">
            <div className={cellPad}>
              <InspirationWall tone="light" fillContainer />
            </div>
          </div>

          {/* Mobile-only seam where the static backdrop doesn’t match the stack order */}
          <div className="col-span-full lg:hidden">
            <ParadigmWaveFill topFill={BONE} bottomFill={OBSIDIAN} variant={2} className="h-12 sm:h-16" />
          </div>

          {/* 3 · Metaphor */}
          <div className={`relative min-h-0 text-bone ${darkCellBorder}`}>
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(ellipse 75% 50% at 85% 25%, rgba(107, 140, 255, 0.1), transparent 52%)",
              }}
              aria-hidden
            />
            <div className={`relative z-[1] min-h-0 ${cellPad}`}>
              <MetaphorCards />
            </div>
          </div>

          {/* 4 · Artifacts */}
          <div className="relative min-h-0 text-bone">
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                background: "radial-gradient(ellipse 80% 55% at 20% 20%, rgba(94, 184, 212, 0.08), transparent 55%)",
              }}
              aria-hidden
            />
            <div className={`relative z-[1] min-h-0 ${cellPad}`}>
              <ArtifactsPeelStack tone="dark" />
            </div>
          </div>
          </div>
        </div>
      </div>

      <DesignConcept />
      <ConceptualFoundationsBand />
    </section>
  );
}
