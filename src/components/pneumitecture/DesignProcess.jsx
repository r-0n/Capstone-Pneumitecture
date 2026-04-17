"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { DesignProcessPhaseSlider } from "./DesignProcessPhaseSlider";

/** Google Drive preview (share: anyone with link can view). */
const PROCESS_DRIVE_IFRAME =
  "https://drive.google.com/file/d/1Q5lOm8fj7E4ZU8Q0P8gw5YoUdD-n5RZ0/preview";

const heatImg = (n) =>
  publicAssetPath(`/images/design-process/heat-sealing/${String(n).padStart(2, "0")}.png`);

const mountingImg = (n) =>
  publicAssetPath(`/images/design-process/mounting-rods/${String(n).padStart(2, "0")}.png`);

const MOUNTING_TEST_VIDEO_IFRAME_A =
  "https://www.youtube.com/embed/9Bi_o7kGaBA?rel=0&modestbranding=1&playsinline=1&mute=1";
const MOUNTING_TEST_VIDEO_UNIT_CELL =
  "https://www.youtube.com/embed/oivFJ6d2UN4?rel=0&modestbranding=1&playsinline=1&mute=1";
const ARDUINO_TEST_VIDEO_IFRAME_BEFORE_A =
  "https://www.youtube.com/embed/wMBQTvkn0lQ?rel=0&modestbranding=1&playsinline=1&mute=1";
const ARDUINO_TEST_VIDEO_IFRAME_A =
  "https://www.youtube.com/embed/kY4dTFvlMXI?rel=0&modestbranding=1&playsinline=1&mute=1";
const ARDUINO_TEST_VIDEO_IFRAME_C =
  "https://www.youtube.com/embed/lR4QNp3BsmE?rel=0&modestbranding=1&playsinline=1&mute=1";
const RHINO_GH_VIDEO_IFRAME_A =
  "https://www.youtube.com/embed/icCzrSQQW_o?rel=0&modestbranding=1&playsinline=1&mute=1";
const RHINO_GH_VIDEO_IFRAME_B =
  "https://www.youtube.com/embed/A9ya9y9IIzo?rel=0&modestbranding=1&playsinline=1&mute=1";
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
    src: MOUNTING_TEST_VIDEO_UNIT_CELL,
    poster: mountingImg(3),
    alt: "Unit cell inflation — scaling test video",
    caption: "Test video: Unit Cell Inflation",
    youtube: { playbackRate: 2 },
  },
  {
    type: "iframe",
    src: MOUNTING_TEST_VIDEO_IFRAME_A,
    poster: mountingImg(1),
    alt: "Mounting onto aluminium rods test video A",
    caption: "Test video A — mounting sequence and initial behavior.",
    youtube: { playbackRate: 2 },
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
    title: "Material Exploration & Unit Design  ",
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
    title: "Moving from Single Cell to Cell Population",
    sub: "",
    body:
      "The shift from singular experimentation to collective behavior. As cells were combined, new spatial conditions began to emerge — driven by interaction, pressure, and constraint. What was once a unit became a system, defining the project’s architectural direction.",
    slides: CELL_POPULATION_SLIDES,
  },
  {
    num: 4,
    title: "Structural Design &Frame Fabrication",
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
        src: ARDUINO_TEST_VIDEO_IFRAME_BEFORE_A,
        poster: arduinoImg(2),
        alt: "Pneumatic inflation sequence before test A",
        caption: "Miniature TPU Grid: Solenoid Valve Control",
        youtube: { playbackRate: 2 },
      },
      {
        type: "iframe",
        src: ARDUINO_TEST_VIDEO_IFRAME_A,
        poster: arduinoImg(1),
        alt: "Arduino and solenoid inflation test video A",
        caption: "Test video A — solenoid-actuated inflation sequence.",
        youtube: { playbackRate: 2 },
      },
      {
        type: "iframe",
        src: ARDUINO_TEST_VIDEO_IFRAME_C,
        poster: arduinoImg(3),
        alt: "Arduino and solenoid inflation test video C",
        caption: "Test video C — follow-up inflation sequence.",
        youtube: { playbackRate: 2 },
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
    body: "To achieve this responsive inflation, the system relies on a synchronized network of native Grasshopper logic and Kangaroo 2 physics components. The initial spatial trigger is established using Distance and Smaller Than components, which act as a proximity sensor between the moving agent (as a point attractor) and the geometric centroids of the surface. This boolean output is translated into fluid data using a Grasshopper Graph Mapper component set to a Bezier curve, which is then fed into a Multiplication component to dynamically scale the simulation's intensity. The physical deformation itself is executed by the core Kangaroo Solver component. Within this solver, the outward force generated by the Kangaroo Pressure goal is continuously balanced against the mesh's structural resistance-defined by EdgeLengths (tension) and constrained by rigid Anchor points along the diamond cutouts-ultimately producing the organic, pillow-like inflation.",
    slides: [
      ...RHINO_GH_SLIDES,
      {
        type: "iframe",
        src: RHINO_GH_VIDEO_IFRAME_A,
        poster: rhinoImg(14),
        alt: "Rhinoceros+Grasshopper simulation video A",
        caption:
          "Simulation Video- 3 Combination Cell Simulation: Without Inflation Physics",
        youtube: { playbackRate: 2 },
      },
      {
        type: "iframe",
        src: RHINO_GH_VIDEO_IFRAME_B,
        poster: rhinoImg(13),
        alt: "Rhinoceros+Grasshopper simulation video B",
        caption: "Simulation B: Cell Grid with Inflation Physics.",
        youtube: { playbackRate: 2 },
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

/** Small card for non-featured phases. */
function PhaseCard({ phase, index, hovered, setHovered }) {
  const isHovered = hovered === index;

  return (
    <div
      className="flex cursor-default flex-col items-center text-center"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className="w-full transition-[transform,box-shadow] duration-300 ease-out"
        style={{
          transform: isHovered ? "scale(1.03)" : "scale(1)",
          boxShadow: isHovered ? "0 12px 40px rgba(0,0,0,0.09)" : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <DesignProcessPhaseSlider slides={phase.slides} priority={phase.num === 1} />
      </div>
      <div
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-obsidian transition-transform duration-300"
        style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
      >
        <span className="font-mono text-[10px] text-bone">{phase.num}</span>
      </div>
      <span
        className="tech-label mt-2 block text-obsidian"
        style={{
          opacity: hovered === null || isHovered ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      >
        {phase.title}
      </span>
      {phase.sub ? (
        <span
          className="tech-label block text-structural/60"
          style={{
            opacity: hovered === null || isHovered ? 1 : 0.2,
            transition: "opacity 0.3s",
          }}
        >
          {phase.sub}
        </span>
      ) : null}
    </div>
  );
}

/** Full-width hero card for featured phases (3 & 7). */
function FeaturedPhaseCard({ phase }) {
  return (
    <div className="my-12 border-y border-[var(--hairline)] px-4 py-12 md:my-16 md:px-6 md:py-20">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-obsidian">
          <span className="font-mono text-xs text-bone">{phase.num}</span>
        </div>
        <div className="hairline flex-1" />
      </div>
      <div
        className={`grid grid-cols-1 items-center gap-8 md:items-center md:justify-items-stretch ${
          phase.num === 7
            ? "md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] md:gap-10 lg:gap-14"
            : "md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] md:gap-12 md:justify-items-center"
        }`}
      >
        <div className={`w-full min-w-0 ${phase.num === 7 ? "max-w-none" : "max-w-xl"}`}>
          {phase.sub ? (
            <p className="tech-label mb-3 text-structural/50">{phase.sub}</p>
          ) : null}
          <h3 className="font-display mb-4 text-3xl font-extralight tracking-tight md:text-4xl">
            {phase.title}
          </h3>
          {phase.body ? (
            <p
              className={`font-display font-extralight text-foreground/70 text-base md:text-lg leading-relaxed ${
                phase.num === 7
                  ? "md:columns-2 md:gap-x-12 lg:gap-x-16 md:[column-fill:_balance] [text-wrap:pretty]"
                  : ""
              }`}
            >
              {phase.body}
            </p>
          ) : null}
        </div>
        <div
          className={`w-full min-w-0 ${
            phase.num === 7
              ? "max-w-none"
              : "max-w-[32rem] md:justify-self-center md:mx-auto lg:max-w-[36rem]"
          }`}
        >
          <div className="h-full w-full" style={{ aspectRatio: "16/10" }}>
            <DesignProcessPhaseSlider slides={phase.slides} tall />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesignProcess() {
  const [hovered, setHovered] = useState(null);

  // Segments following the reference layout: [1,2] | 3 | [4,5,6] | 7
  const seg1 = phases.filter((p) => p.num === 1 || p.num === 2);
  const feat3 = phases.find((p) => p.num === 3);
  const seg2 = phases.filter((p) => p.num === 4 || p.num === 5 || p.num === 6);
  const feat7 = phases.find((p) => p.num === 7);

  return (
    <section id="design-process" className="w-full py-32 px-4 md:py-48 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel number="04" text="Design Process" textFirst />

        <ScrollReveal>
          <h2 className="font-display font-extralight text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">
            From geometry to form
          </h2>
        </ScrollReveal>

        {/* Segment 1: phases 1–2 */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {seg1.map((phase, i) => (
            <ScrollReveal key={phase.num} delay={i * 0.1}>
              <PhaseCard phase={phase} index={i} hovered={hovered} setHovered={setHovered} />
            </ScrollReveal>
          ))}
        </div>

        {/* Featured: Phase 3 */}
        {feat3 ? (
          <ScrollReveal>
            <FeaturedPhaseCard phase={feat3} />
          </ScrollReveal>
        ) : null}

        {/* Segment 2: phases 4–6 */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {seg2.map((phase, i) => (
            <ScrollReveal key={phase.num} delay={i * 0.1}>
              <PhaseCard phase={phase} index={i + 10} hovered={hovered} setHovered={setHovered} />
            </ScrollReveal>
          ))}
        </div>

        {/* Featured: Phase 7 */}
        {feat7 ? (
          <ScrollReveal>
            <FeaturedPhaseCard phase={feat7} />
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
