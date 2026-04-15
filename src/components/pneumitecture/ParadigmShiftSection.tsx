"use client";

import Image from "next/image";
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { OrganicWaveDivider } from "@/components/pneumitecture/paradigm-shift/OrganicWaveDivider";
import { InspirationWall } from "@/components/pneumitecture/paradigm-shift/InspirationWall";
import { MetaphorCards } from "@/components/pneumitecture/paradigm-shift/MetaphorCards";
import { ArtifactsPeelStack } from "@/components/pneumitecture/paradigm-shift/ArtifactsPeelStack";

/**
 * Full-board “Paradigm Shift” concept layout — organic wave split, four quadrants,
 * inspiration collage, metaphor cards, stacked artifacts with peel interaction.
 */
export default function ParadigmShiftSection() {
  return (
    <section
      id="paradigm-shift"
      className="relative isolate scroll-mt-24 overflow-hidden bg-neutral-950 text-neutral-900"
    >
      {/* Upper field */}
      <div className="relative bg-[#f4f4f2] pb-0 pt-10 md:pt-14">
        <div className="relative z-[2] mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-12">
          <SectionLabel number="02" text="The Paradigm Shift" />

          <h1 className="pointer-events-none relative z-[1] mt-2 max-w-[98%] font-display text-[clamp(2rem,7.5vw,5.75rem)] font-extralight uppercase leading-[0.92] tracking-[0.12em] text-neutral-400/90 mix-blend-multiply md:mt-4">
            THE PARADIGM SHIFT
          </h1>

          <div className="relative z-[2] mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-12 pb-8 lg:mt-14 lg:grid-cols-2 lg:gap-16 lg:pb-12">
            {/* 1 · Philosophy */}
            <div className="min-w-0 lg:pr-4">
              <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                1. The philosophy
              </p>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-sm shrink-0 overflow-hidden rounded-sm border border-neutral-200/80 bg-white shadow-sm lg:mx-0 lg:max-w-[46%]">
                  <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
                    alt="Hand-drawn breathing dome study placeholder"
                    fill
                    className="object-cover object-center opacity-95"
                    sizes="(max-width:1024px) 90vw, 28vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent py-3 text-center font-display text-[10px] font-light uppercase tracking-[0.35em] text-neutral-600">
                    Breathing dome
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-4 font-display text-lg font-light italic leading-snug text-neutral-800 md:text-xl">
                    What if our buildings were not just containers, but companions?
                  </p>
                  <p className="max-w-prose font-sans text-sm font-light leading-relaxed text-neutral-500 md:text-[15px]">
                    At its core, the project explores the possibility of architecture that moves, breathes,
                    and responds like a living organism. Traditional architecture is typically conceived as
                    static: walls, ceilings, and surfaces that remain fixed once constructed. This project
                    challenges that paradigm by imagining a spatial system composed of soft pneumatic cells
                    capable of continuous transformation through cycles of inflation and deflation.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 · Inspiration */}
            <div className="min-w-0 lg:pl-4">
              <InspirationWall />
            </div>
          </div>
        </div>
      </div>

      <OrganicWaveDivider className="relative z-[3] h-[88px] md:h-[110px]" />

      <div className="relative z-[4] bg-neutral-950 pb-20 pt-4 md:pb-28 md:pt-6">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0 lg:pr-6">
              <MetaphorCards />
            </div>
            <div className="min-w-0 lg:pl-6">
              <ArtifactsPeelStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
