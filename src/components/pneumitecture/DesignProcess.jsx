"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { publicAssetPath, publicImages2Path } from "@/lib/publicAssetPath";
import { DesignProcessPhaseSlider } from "./DesignProcessPhaseSlider";

/** Phase 1: your uploaded process imagery (`public/images/design-process/phase1-slide0*.png`). */
const PHASE1_SLIDES = [
  {
    type: "image",
    src: publicAssetPath("/images/design-process/phase1-slide01.png"),
    alt: "Digital sketch: hexagonal modules, tube connector notes, and joint geometry in a drawing app",
    caption:
      "Digital sketch — hexagonal modularity, tube connector callouts, and early joint geometry in tablet software.",
  },
  {
    type: "image",
    src: publicAssetPath("/images/design-process/phase1-slide02.png"),
    alt: "Color diagram with frame, hex cells, fishing-line supports, and TPU tube to air annotations",
    caption:
      "Assembly diagram — fishing-line supports, TPU path to air, and rigid–flexible relationships inside the study frame.",
  },
  {
    type: "image",
    src: publicAssetPath("/images/design-process/phase1-slide03.png"),
    alt: "Translucent heat-sealed hexagonal pouch prototype with inflation tube on a wooden tabletop",
    caption:
      "Physical study — heat-sealed translucent hex cell, inflation port, and bench-scale material test.",
  },
  {
    type: "image",
    src: publicAssetPath("/images/design-process/phase1-slide04.png"),
    alt: "Marker sketches on paper: hex clusters, arcs, and tessellated layout studies",
    caption:
      "Hand ideation — tessellated hex grids, arc arrangements, and connectivity studies on trace paper.",
  },
];

const phases = [
  {
    num: 1,
    title: "Circular Geometry",
    sub: "& Plan Organisation",
    slides: PHASE1_SLIDES,
  },
  {
    num: 2,
    title: "Space Frame",
    sub: "& Structural System",
    slides: [
      {
        type: "image",
        src: publicImages2Path("base 2.png"),
        alt: "Space frame and structural system diagram",
        caption: "Space frame — structural system and assembly logic.",
      },
      // Example: { type: "video", src: publicAssetPath("/videos/space-frame.mp4"), poster: publicImages2Path("base 2.png"), alt: "Process video", caption: "Walkthrough or screen recording." },
    ],
  },
  {
    num: 3,
    title: "Volumetric Form",
    sub: "Development",
    slides: [
      {
        type: "image",
        src: publicImages2Path("base 3.png"),
        alt: "Volumetric form development study",
        caption: "Volumetric form — massing and envelope development.",
      },
    ],
  },
  {
    num: 4,
    title: "Triangulated Skin",
    sub: "& Cladding Panels",
    slides: [
      {
        type: "image",
        src: publicImages2Path("base4.png"),
        alt: "Triangulated skin and cladding panel study",
        caption: "Triangulated skin — panel logic and cladding studies.",
      },
    ],
  },
  {
    num: 5,
    title: "Biomorphic Facade",
    sub: "& Final Envelope",
    slides: [
      {
        type: "image",
        src: publicImages2Path("base 5.png"),
        alt: "Biomorphic facade and final envelope study",
        caption: "Biomorphic facade — final envelope and surface resolution.",
      },
    ],
  },
];

export default function DesignProcess() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="design-process" className="py-32 md:py-48 w-full px-4 md:px-8">
      <SectionLabel number="04" text="Design Process" />

      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">
          The central thesis
        </p>
        <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">
          From geometry to form
        </h2>
      </ScrollReveal>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {phases.slice(0, 3).map((phase, i) => (
            <ScrollReveal key={phase.num} delay={i * 0.1}>
              <div
                className="flex flex-col items-center text-center cursor-default"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="w-full transition-[transform,box-shadow] duration-300 ease-out"
                  style={{
                    transform: hovered === i ? "scale(1.03)" : "scale(1)",
                    boxShadow: hovered === i ? "0 12px 40px rgba(0,0,0,0.09)" : "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <DesignProcessPhaseSlider slides={phase.slides} priority={phase.num === 1} />
                </div>
                <div
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-obsidian transition-transform duration-300"
                  style={{ transform: hovered === i ? "scale(1.15)" : "scale(1)" }}
                >
                  <span className="font-mono text-[10px] text-bone">{phase.num}</span>
                </div>
                <span
                  className="tech-label mt-2 block text-obsidian"
                  style={{ opacity: hovered === null || hovered === i ? 1 : 0.3, transition: "opacity 0.3s" }}
                >
                  {phase.title}
                </span>
                <span
                  className="tech-label block text-structural/60"
                  style={{ opacity: hovered === null || hovered === i ? 1 : 0.2, transition: "opacity 0.3s" }}
                >
                  {phase.sub}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-3">
          {phases.slice(3, 5).map((phase, i) => (
            <ScrollReveal key={phase.num} delay={(i + 3) * 0.1} className="md:w-1/3">
              <div
                className="flex flex-col items-center text-center cursor-default"
                onMouseEnter={() => setHovered(i + 3)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="w-full transition-[transform,box-shadow] duration-300 ease-out"
                  style={{
                    transform: hovered === i + 3 ? "scale(1.03)" : "scale(1)",
                    boxShadow: hovered === i + 3 ? "0 12px 40px rgba(0,0,0,0.09)" : "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <DesignProcessPhaseSlider slides={phase.slides} />
                </div>
                <div
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-obsidian transition-transform duration-300"
                  style={{ transform: hovered === i + 3 ? "scale(1.15)" : "scale(1)" }}
                >
                  <span className="font-mono text-[10px] text-bone">{phase.num}</span>
                </div>
                <span
                  className="tech-label mt-2 block text-obsidian"
                  style={{ opacity: hovered === null || hovered === i + 3 ? 1 : 0.3, transition: "opacity 0.3s" }}
                >
                  {phase.title}
                </span>
                <span
                  className="tech-label block text-structural/60"
                  style={{ opacity: hovered === null || hovered === i + 3 ? 1 : 0.2, transition: "opacity 0.3s" }}
                >
                  {phase.sub}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
