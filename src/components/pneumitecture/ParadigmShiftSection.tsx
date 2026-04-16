"use client";

import Image from "next/image";
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { ParadigmWaveRibbon } from "@/components/pneumitecture/paradigm-shift/ParadigmWaveRibbon";
import { ParadigmDarkWaveShell } from "@/components/pneumitecture/paradigm-shift/ParadigmDarkWaveShell";
import { ParadigmGridWaveCross } from "@/components/pneumitecture/paradigm-shift/ParadigmGridWaveCross";
import { InspirationWall } from "@/components/pneumitecture/paradigm-shift/InspirationWall";
import { MetaphorCards } from "@/components/pneumitecture/paradigm-shift/MetaphorCards";
import { ArtifactsPeelStack } from "@/components/pneumitecture/paradigm-shift/ArtifactsPeelStack";
import { ConceptualFoundationsBand } from "@/components/pneumitecture/paradigm-shift/ConceptualFoundationsBand";
import DesignConcept from "@/components/pneumitecture/DesignConcept";

const BREATHING_DOME_SKETCH = publicAssetPath("/images/breathing-dome-sketch.png");

const BONE = "#fbfbf9";
const OBSIDIAN = "#121212";
const FOUNDATIONS = "#f3f3f5";

export default function ParadigmShiftSection() {
  return (
    <section id="paradigm-shift" className="relative isolate scroll-mt-24 overflow-hidden">
      <div className="relative bg-bone text-foreground">
        <div className="mx-auto max-w-[1580px] px-4 pb-5 pt-8 sm:px-6 md:px-10 lg:px-12 lg:pb-6 lg:pt-9">
          <SectionLabel number="02" text="Concept" textFirst />

          <h1 className="mt-[-1.25rem] max-w-[min(100%,1240px)] font-display text-[clamp(1.15rem,2.8vw,2rem)] font-light leading-[1.02] tracking-[0.01em] text-foreground/90 md:mt-[-1.75rem]">
            A Shift in Paradigm
          </h1>
        </div>
      </div>

      <div className="relative bg-[#030303] px-3 pb-8 pt-1 sm:px-5 md:pb-10 md:pt-2 lg:px-8 lg:pb-12">
        <ParadigmDarkWaveShell>
          <div className="relative">
            <ParadigmGridWaveCross />
            <div className="relative z-[2] flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-[3px] lg:bg-[#060607] lg:p-[3px]">
              <div className="relative z-[2] bg-bone px-4 py-5 text-foreground sm:px-5 sm:py-6 md:px-6 md:py-7">
                <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-structural md:text-[12px]">
                  1. THE PHILOSOPHY
                </p>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
                  <div className="relative mx-auto aspect-[2/1] w-full max-w-[min(100%,340px)] shrink-0 overflow-hidden rounded-md border border-[var(--hairline-strong)] bg-[#f5f2e9] shadow-sm lg:mx-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] [background-size:12px_12px]">
                    <Image
                      src={BREATHING_DOME_SKETCH}
                      alt="Hand-drawn breathing dome study with annotations and BREATHING DOME title"
                      fill
                      className="object-contain object-center p-2.5 sm:p-3.5"
                      sizes="(max-width:1024px) 90vw, 340px"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#f5f2e9]/95 to-transparent py-1.5 text-center font-display text-[8px] font-light uppercase tracking-[0.36em] text-structural">
                      BREATHING DOME
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 max-w-prose font-display text-base font-light italic leading-snug text-foreground md:text-lg">
                      What if our buildings were not just containers, but companions?
                    </p>
                    <p className="max-w-prose text-pretty font-sans text-[13px] font-light leading-relaxed text-structural md:text-[14px]">
                      At its core, the project explores the possibility of architecture that moves, breathes,
                      and responds like a living organism. Traditional architecture is typically conceived as
                      static: walls, ceilings, and surfaces that remain fixed once constructed. This project
                      challenges that paradigm by imagining a spatial system composed of soft pneumatic cells
                      capable of continuous transformation through cycles of inflation and deflation.
                    </p>
                  </div>
                </div>
              </div>

              <ParadigmWaveRibbon
                className="h-5 shrink-0 lg:hidden"
                topFill={BONE}
                bottomFill={OBSIDIAN}
              />

              <div className="relative z-[2] bg-obsidian px-4 py-5 text-bone sm:px-5 sm:py-6 md:px-6 md:py-6">
                <InspirationWall />
              </div>

              <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-white/12 to-transparent lg:hidden" />

              <div className="relative z-[2] bg-obsidian px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-6">
                <MetaphorCards />
              </div>

              <ParadigmWaveRibbon
                className="h-5 shrink-0 lg:hidden"
                topFill={OBSIDIAN}
                bottomFill={BONE}
              />

              <div className="relative z-[2] bg-bone px-4 py-5 text-foreground sm:px-5 sm:py-6 md:px-6 md:py-6">
                <ArtifactsPeelStack tone="light" />
              </div>
            </div>
          </div>
        </ParadigmDarkWaveShell>
      </div>

      <DesignConcept />
      <ParadigmWaveRibbon topFill="#060607" bottomFill={FOUNDATIONS} className="h-10 md:h-14 lg:h-16" />

      <ConceptualFoundationsBand />
    </section>
  );
}
