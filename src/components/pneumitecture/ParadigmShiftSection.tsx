"use client";

import Image from "next/image";
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { ParadigmWaveRibbon } from "@/components/pneumitecture/paradigm-shift/ParadigmWaveRibbon";
import { InspirationWall } from "@/components/pneumitecture/paradigm-shift/InspirationWall";
import { MetaphorCards } from "@/components/pneumitecture/paradigm-shift/MetaphorCards";
import { ArtifactsPeelStack } from "@/components/pneumitecture/paradigm-shift/ArtifactsPeelStack";
import { ConceptualFoundationsBand } from "@/components/pneumitecture/paradigm-shift/ConceptualFoundationsBand";

const BREATHING_DOME_SKETCH = publicAssetPath("/images/breathing-dome-sketch.png");

const BONE = "#fbfbf9";
const OBSIDIAN = "#121212";
const FOUNDATIONS = "#f3f3f5";

export default function ParadigmShiftSection() {
  return (
    <section id="paradigm-shift" className="relative isolate scroll-mt-24 overflow-hidden">
      <div className="relative bg-bone text-foreground">
        <div className="absolute inset-x-0 top-0 h-[min(380px,45vh)] bg-[linear-gradient(180deg,rgba(238,241,246,0.5)_0%,transparent_70%)]" aria-hidden />

        <div className="relative mx-auto max-w-[1580px] px-5 pb-14 pt-10 sm:px-8 md:px-12 md:pb-16 md:pt-12 lg:px-14 lg:pb-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--hairline)] pb-6">
            <SectionLabel number="02" text="The Paradigm Shift" />
            <button
              type="button"
              className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-structural transition hover:text-foreground hover:underline underline-offset-4"
            >
              MENU (O)
            </button>
          </div>

          <h1 className="mx-auto max-w-[min(100%,1240px)] text-center font-display text-[clamp(2.25rem,7.5vw,5.75rem)] font-extralight uppercase leading-[0.9] tracking-[0.04em] text-foreground/90">
            THE PARADIGM SHIFT
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center font-sans text-[11px] font-light uppercase tracking-[0.22em] text-structural">
            Four registers · one thesis
          </p>

          <div className="mx-auto mt-12 grid max-w-[1580px] grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-0 lg:gap-x-16">
            <div className="min-w-0 lg:border-r lg:border-[var(--hairline)] lg:pr-12">
              <p className="mb-4 font-sans text-[9px] font-semibold uppercase tracking-[0.32em] text-structural">
                1. THE PHILOSOPHY
              </p>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
                <div className="relative mx-auto aspect-[2/1] w-full max-w-[400px] shrink-0 overflow-hidden rounded-md border border-[var(--hairline-strong)] bg-[#f5f2e9] shadow-sm lg:mx-0 lg:max-w-[min(100%,360px)] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] [background-size:12px_12px]">
                  <Image
                    src={BREATHING_DOME_SKETCH}
                    alt="Hand-drawn breathing dome study with annotations and BREATHING DOME title"
                    fill
                    className="object-contain object-center p-3 sm:p-4"
                    sizes="(max-width:1024px) 90vw, 360px"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#f5f2e9]/95 to-transparent py-2 text-center font-display text-[9px] font-light uppercase tracking-[0.36em] text-structural">
                    BREATHING DOME
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-3 max-w-prose font-display text-lg font-light italic leading-snug text-foreground md:text-xl">
                    What if our buildings were not just containers, but companions?
                  </p>
                  <p className="max-w-prose text-pretty font-sans text-sm font-light leading-relaxed text-structural md:text-[15px]">
                    At its core, the project explores the possibility of architecture that moves, breathes,
                    and responds like a living organism. Traditional architecture is typically conceived as
                    static: walls, ceilings, and surfaces that remain fixed once constructed. This project
                    challenges that paradigm by imagining a spatial system composed of soft pneumatic cells
                    capable of continuous transformation through cycles of inflation and deflation.
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:pl-4">
              <InspirationWall />
            </div>
          </div>
        </div>
      </div>

      <ParadigmWaveRibbon topFill={BONE} bottomFill={OBSIDIAN} />

      <div className="relative bg-obsidian text-bone">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 18% 0%, rgba(94,184,212,0.07), transparent 55%), radial-gradient(ellipse 55% 40% at 100% 100%, rgba(255,255,255,0.04), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1580px] px-5 py-14 sm:px-8 md:px-12 md:py-16 lg:px-14 lg:py-20">
          <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="shrink-0 font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-bone/45">
              Material &amp; evidence
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 lg:border-r lg:border-white/10 lg:pr-12">
              <MetaphorCards />
            </div>
            <div className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm md:p-8 lg:pl-10">
              <ArtifactsPeelStack />
            </div>
          </div>
        </div>
      </div>

      <ParadigmWaveRibbon topFill={OBSIDIAN} bottomFill={FOUNDATIONS} className="h-12 md:h-16 lg:h-20" />

      <ConceptualFoundationsBand />
    </section>
  );
}
