"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { publicAssetPath, publicImages2Path } from "@/lib/publicAssetPath";
import { DesignProcessPhaseSlider } from "./DesignProcessPhaseSlider";

/** Google Drive preview (share: anyone with link can view). */
const PROCESS_DRIVE_IFRAME =
  "https://drive.google.com/file/d/1Q5lOm8fj7E4ZU8Q0P8gw5YoUdD-n5RZ0/preview";

const heatImg = (n) =>
  publicAssetPath(`/images/design-process/heat-sealing/${String(n).padStart(2, "0")}.png`);

const mountingImg = (n) =>
  publicAssetPath(`/images/design-process/mounting-rods/${String(n).padStart(2, "0")}.png`);

const MOUNTING_TEST_VIDEO_IFRAME_A =
  "https://drive.google.com/file/d/1ikSUiOJzLn-oxtvjNdaSKWz1vevogtTZ/preview";
const MOUNTING_TEST_VIDEO_IFRAME_B =
  "https://drive.google.com/file/d/1UNXmqvHuG1tgUvb4lcKx-CTSmjbxRWj5/preview";
const ARDUINO_TEST_VIDEO_IFRAME_A =
  "https://drive.google.com/file/d/1TT4enFtedAvIoGcyQMHh5onOeebDkuSz/preview";
const ARDUINO_TEST_VIDEO_IFRAME_B =
  "https://drive.google.com/file/d/1ZnFgcApK-7O6e3EUslGnDBkalMxwu1Ht/preview";
const RHINO_GH_VIDEO_IFRAME_A =
  "https://drive.google.com/file/d/1yEIp8EeoqVb-49s7lg82Hja2zv9A0w9R/preview";
const RHINO_GH_VIDEO_IFRAME_B =
  "https://drive.google.com/file/d/15LPcn--R-cZZXUlfOctfqLajAIJmroL5/preview";
const RHINO_GH_VIDEO_IFRAME_C =
  "https://drive.google.com/file/d/1WeAxBJEg7rBfVf8Zh_8egIQhuaDbYUiG/preview";

const HEAT_CAPTIONS = [
  "Film layout — red-line geometry taped to the bench for seam planning.",
  "Template pass — octagram / two-square diagram with centre guides on vellum.",
  "Pattern study — tessellated marks on translucent film before sealing.",
  "Fabric leaf — hand-tacked black layer beside the film study.",
  "Heat trace — tool-guided seam along drawn channels on the membrane.",
  "Sealing pass — bonding translucent panels along the layout lines.",
  "Inflation layout — tubes taped at intersections for chamber testing.",
  "Workbench — iron, fabric leaf, and film cutouts in one station.",
  "Two-panel spread — ruler, impulse sealer, and marked geometry on film.",
  "Star cutout — iron tip at a sealed junction on the workshop table.",
  "Flat assembly — large sealed sheets laid out on the rug for review.",
  "Paired prototypes — stitched fabric leaf and sealed film leaf with inflation tube.",
];

const HEAT_SEALING_SLIDES = HEAT_CAPTIONS.map((caption, idx) => ({
  type: "image",
  src: heatImg(idx + 1),
  alt: `Heat-sealing and testing — bench study ${idx + 1}`,
  caption,
}));

const arduinoImg = (n) =>
  publicAssetPath(`/images/design-process/arduino-circuit/${String(n).padStart(2, "0")}.png`);

const frameImg = (n) =>
  publicAssetPath(`/images/design-process/frame-design/${String(n).padStart(2, "0")}.png`);
const rhinoImg = (n) =>
  publicAssetPath(`/images/design-process/rhino-gh/${String(n).padStart(2, "0")}.png`);

const RHINO_GH_CAPTIONS = [
  "Grasshopper flow — triangulation and pressure setup blocks.",
  "Single strip study — parametric panel profile in Rhino.",
  "Three-strip array — replicated panel strips for facade assembly.",
  "Definition check — selective activation with gene pools.",
  "Simulation stage — inflated and resting cells across the frame.",
  "Perspective stage — alternating inflation pattern behavior.",
  "Viewport capture — white/red inflation distribution test.",
  "Rendered preview — frame and membrane atmosphere test.",
  "Pipeline graph — full Kangaroo/Weaverbird wiring map.",
  "Data setup — geometry extraction and rule conditioning.",
  "Dispatch stage — mesh split and custom preview channels.",
  "Human interaction setup — proximity influence and frame anchors.",
  "Combined Rhino + Grasshopper workspace for system assembly.",
  "Final viewport tune — display settings and composed frame scene.",
];

const RHINO_GH_SLIDES = RHINO_GH_CAPTIONS.map((caption, idx) => ({
  type: "image",
  src: rhinoImg(idx + 1),
  alt: `Rhinoceros+Grasshopper modeling capture ${idx + 1}`,
  caption,
}));

/** Phase 1: ideation imagery. */
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

/** Cell population process imagery (`public/CP/`). */
const CELL_POPULATION_SLIDES = [
  {
    type: "image",
    src: publicAssetPath("/CP/CP6.png"),
    alt: "Cell population — bench study 6",
    caption:
      "Initial exploration – Initial manual exploration of cell behavior through physical arrangement and early aggregation tests.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP1.JPG"),
    alt: "Cell population — bench study 1",
    caption:
      "Constraint testing – Constraint testing of pneumatic cells within a rigid boundary frame to study controlled expansion.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP2.PNG"),
    alt: "Cell population — bench study 2",
    caption:
      "Sealing pattern development – Sealing pattern development defining inflatable zones and heat-pressed boundaries within the cell system.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP3.JPG"),
    alt: "Cell population — bench study 3",
    caption:
      "Refined outline – Refined outline of the sealing logic, isolating the structural geometry of the inflatable network.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP4.JPG"),
    alt: "Cell population — bench study 4",
    caption:
      "Aggregation study – Aggregation study of combined units showing directional expansion and airflow distribution across the system.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP5.png"),
    alt: "Cell population — bench study 5",
    caption:
      "Controlled field setup – Physical setup using a hexagonal frame to allow cells to expand and operate within a controlled field.",
  },
  {
    type: "image",
    src: publicAssetPath("/CP/CP7.png"),
    alt: "Cell population — bench study 7",
    caption:
      "Geometry development – Development of the inflatable unit's hexagonal geometry as a basis for population and repetition.",
  },
];

const MOUNTING_PHASE_SLIDES = [
  {
    type: "image",
    src: mountingImg(1),
    alt: "Mounted translucent membrane test on aluminium rods",
    caption: "Mounted assembly — membrane fixed on aluminium rods for full-span testing.",
  },
  {
    type: "image",
    src: mountingImg(2),
    alt: "Aluminium-rod mounting close-up",
    caption: "Mount detail — edge geometry and rod connection alignment.",
  },
  {
    type: "image",
    src: mountingImg(3),
    alt: "Mounted sheet test layout on workbench",
    caption: "Bench test — mounted panel behavior under handling and setup.",
  },
  {
    type: "iframe",
    src: MOUNTING_TEST_VIDEO_IFRAME_A,
    poster: mountingImg(1),
    alt: "Mounting onto aluminium rods test video A",
    caption: "Test video A — mounting sequence and initial behavior.",
  },
  {
    type: "iframe",
    src: MOUNTING_TEST_VIDEO_IFRAME_B,
    poster: mountingImg(3),
    alt: "Mounting onto aluminium rods test video B",
    caption: "Test video B — rod-mounted response during handling.",
  },
];

const phases = [
  {
    num: 1,
    title: "Ideating & sketching",
    sub: "",
    slides: PHASE1_SLIDES,
  },
  {
    num: 2,
    title: "Material Exploration",
    sub: "",
    slides: [
      ...HEAT_SEALING_SLIDES,
      {
        type: "iframe",
        src: PROCESS_DRIVE_IFRAME,
        poster: heatImg(12),
        alt: "Heat-sealing and testing — process video on Google Drive",
        caption: "Process recap — walkthrough on Google Drive.",
      },
    ],
  },
  {
    num: 3,
    title: "Cell Population",
    sub: "",
    slides: CELL_POPULATION_SLIDES,
  },
  {
    num: 4,
    title: "Frame Fabrication",
    sub: "",
    slides: [
      {
        type: "image",
        src: frameImg(1),
        alt: "Primary timber test frame on base platform",
        caption: "Frame setup — primary timber rig assembled on the base platform.",
      },
      {
        type: "image",
        src: frameImg(2),
        alt: "Concept sketch for dual vertical rails and membrane routing",
        caption: "Frame concept — drawn guide for rail spacing and inflatable path.",
      },
      {
        type: "image",
        src: frameImg(3),
        alt: "Second angle of timber frame prototype",
        caption: "Build check — assembled frame geometry and joint stability.",
      },
      {
        type: "image",
        src: frameImg(4),
        alt: "Single-cell cross-section sketch between frame rails",
        caption: "Cell profile — section sketch for one inflation bay between rails.",
      },
      {
        type: "image",
        src: frameImg(5),
        alt: "Mounted modular panel on timber frame",
        caption: "Testing stage — mounted module panel inside completed frame.",
      },
    ],
  },
  {
    num: 5,
    title: "Pneumatic System Design",
    sub: "",
    slides: [
      {
        type: "image",
        src: arduinoImg(1),
        alt: "Solenoid valve manifold and tubing layout",
        caption: "Valve network — routed pneumatic lines and solenoid distribution.",
      },
      {
        type: "image",
        src: arduinoImg(2),
        alt: "Arduino with jumper-wire harness",
        caption: "Control core — Arduino wiring and relay path prototyping.",
      },
      {
        type: "image",
        src: arduinoImg(3),
        alt: "Top-down tubing and valve board",
        caption: "Bench map — channel routing and valve placement checks.",
      },
      {
        type: "image",
        src: arduinoImg(4),
        alt: "Close-up of breadboard and driver components",
        caption: "Circuit build — breadboard drivers for controlled inflation cycles.",
      },
      {
        type: "iframe",
        src: ARDUINO_TEST_VIDEO_IFRAME_A,
        poster: arduinoImg(1),
        alt: "Arduino and solenoid inflation test video A",
        caption: "Test video A — solenoid-actuated inflation sequence.",
      },
      {
        type: "iframe",
        src: ARDUINO_TEST_VIDEO_IFRAME_B,
        poster: arduinoImg(4),
        alt: "Arduino and solenoid inflation test video B",
        caption: "Test video B — timing and control response check.",
      },
    ],
  },
  {
    num: 6,
    title: "Scaling Up",
    sub: "",
    slides: [...MOUNTING_PHASE_SLIDES],
  },
  {
    num: 7,
    title: "Project Digital Simulation",
    sub: "",
    slides: [
      ...RHINO_GH_SLIDES,
      {
        type: "iframe",
        src: RHINO_GH_VIDEO_IFRAME_A,
        poster: rhinoImg(14),
        alt: "Rhinoceros+Grasshopper simulation video A",
        caption: "Simulation video A — parametric behavior playback.",
      },
      {
        type: "iframe",
        src: RHINO_GH_VIDEO_IFRAME_B,
        poster: rhinoImg(13),
        alt: "Rhinoceros+Grasshopper simulation video B",
        caption: "Simulation video B — inflation sequence and logic check.",
      },
      {
        type: "iframe",
        src: RHINO_GH_VIDEO_IFRAME_C,
        poster: rhinoImg(12),
        alt: "Rhinoceros+Grasshopper simulation video C",
        caption: "Simulation video C — final behavior pass.",
      },
    ],
  },
];

export default function DesignProcess() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="design-process" className="py-32 md:py-48 w-full px-4 md:px-8">
      <SectionLabel number="03" text="Design Process" textFirst />

      <ScrollReveal>
        <p className="font-display font-extralight text-structural text-base md:text-lg tracking-wide mb-2">
          The central thesis
        </p>
        <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">
          From geometry to form
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {phases.map((phase, i) => (
          <ScrollReveal
            key={phase.num}
            delay={i * 0.1}
            className={i === phases.length - 1 ? "flex justify-center md:col-span-3" : ""}
          >
            <div className={i === phases.length - 1 ? "w-full md:w-2/3" : "w-full"}>
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
                {phase.sub ? (
                  <span
                    className="tech-label block text-structural/60"
                    style={{ opacity: hovered === null || hovered === i ? 1 : 0.2, transition: "opacity 0.3s" }}
                  >
                    {phase.sub}
                  </span>
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
