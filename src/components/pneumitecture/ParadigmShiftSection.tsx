"use client";

import Image from "next/image";
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import ScrollReveal from "@/components/pneumitecture/ScrollReveal";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { InspirationWall } from "@/components/pneumitecture/paradigm-shift/InspirationWall";
import { MetaphorCards } from "@/components/pneumitecture/paradigm-shift/MetaphorCards";
import { ArtifactsPeelStack } from "@/components/pneumitecture/paradigm-shift/ArtifactsPeelStack";
import { ConceptualFoundationsBand } from "@/components/pneumitecture/paradigm-shift/ConceptualFoundationsBand";
import {
  ParadigmWaveBackdrop,
  ParadigmWaveFill,
  type ParadigmWaveBackdropShape,
} from "@/components/pneumitecture/paradigm-shift/ParadigmWavySeparator";
import DesignConcept from "@/components/pneumitecture/DesignConcept";

const BREATHING_DOME_SKETCH = publicAssetPath("/images/breathing-dome-sketch.png");

const BONE = "#fbfbf9";
/** Lower wave band gradient stops (swap order to put more blue at the seam). */
const LOWER_WAVE_CREAM = BONE;
const LOWER_WAVE_SKY = "#d8e8f4";

/**
 * Seam curve between row 1 and row 2 (`default` | `subtle` | `bold`).
 * See `PARADIGM_WAVE_BACKDROP_SHAPES` in ParadigmWavySeparator.tsx for geometry.
 */
const PARADIGM_LOWER_WAVE_SHAPE: ParadigmWaveBackdropShape = "default";

/**
 * Mobile ribbon between inspiration and row 2 — FILL_PATHS variant `1`…`4` (taller / different bump).
 */
const PARADIGM_MOBILE_LOWER_WAVE_VARIANT = 2 as 1 | 2 | 3 | 4;

const introPad = "mx-auto max-w-[min(100%,1200px)] px-5 sm:px-8 md:px-12 lg:px-14";
const cellPad = "h-full px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-10 lg:py-20 xl:px-12";

const topCellBorder = "border-b border-[var(--hairline)] lg:border-r lg:border-b-0";
const lowerRowBorder = "border-b border-[var(--hairline)] lg:border-r lg:border-b-0";

/**
 * Pulls the second Concept grid row (Metaphor + Artifacts) upward.
 * Tune this string only: more negative = higher (e.g. "-0.5rem", "-1.25rem", "-2.5rem", "-4rem").
 */
const PARADIGM_SECOND_ROW_LIFT = "-4.25rem";

export default function ParadigmShiftSection() {
  return (
    <section
      id="paradigm-shift"
      className="relative isolate scroll-mt-24 overflow-x-hidden bg-bone text-foreground"
    >
      {/* Wave only covers intro + 2×2 so DesignConcept stays on bone */}
      <div className="relative isolate overflow-x-hidden">
        <ParadigmWaveBackdrop
          boneFill={BONE}
          lowerBandFrom={LOWER_WAVE_CREAM}
          lowerBandTo={LOWER_WAVE_SKY}
          waveShape={PARADIGM_LOWER_WAVE_SHAPE}
          className="z-0"
        />

        <div className="relative z-[2]">
          <div className={`${introPad} border-b border-[var(--hairline)] pb-8 pt-12 sm:pb-10 sm:pt-14 md:pt-16`}>
            <SectionLabel number="02" text="Concept" textFirst />
            <ScrollReveal>
              <h2 className="relative mt-3 max-w-[min(100%,40rem)] font-display text-[clamp(1.35rem,2.75vw,2.1rem)] font-light leading-[1.12] tracking-tight text-[var(--ink)]">
                A Shift in Paradigm
              </h2>
            </ScrollReveal>
          </div>

          {/* 2×2 · top row: light · bottom row: cream→sky (backdrop) */}
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
            <ParadigmWaveFill
              topFill={BONE}
              bottomFill={LOWER_WAVE_SKY}
              variant={PARADIGM_MOBILE_LOWER_WAVE_VARIANT}
              className="h-12 sm:h-16"
            />
          </div>

          <div
            className="relative z-[3] col-span-full grid min-h-0 grid-cols-1 lg:col-span-2 lg:grid-cols-2 lg:items-stretch"
            style={{ marginTop: PARADIGM_SECOND_ROW_LIFT }}
          >
            {/* 3 · Metaphor */}
            <div className={`relative min-h-0 text-foreground ${lowerRowBorder}`}>
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background: "radial-gradient(ellipse 75% 50% at 85% 25%, rgba(107, 140, 255, 0.12), transparent 52%)",
                }}
                aria-hidden
              />
              <div className={`relative z-[1] min-h-0 ${cellPad}`}>
                <MetaphorCards tone="light" />
              </div>
            </div>

            {/* 4 · Artifacts */}
            <div className="relative min-h-0 text-foreground">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background: "radial-gradient(ellipse 80% 55% at 20% 20%, rgba(94, 184, 212, 0.1), transparent 55%)",
                }}
                aria-hidden
              />
              <div className={`relative z-[1] min-h-0 ${cellPad}`}>
                <ArtifactsPeelStack tone="light" />
              </div>
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
