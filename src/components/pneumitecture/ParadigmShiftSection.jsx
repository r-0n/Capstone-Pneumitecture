'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { publicAssetPath } from '@/lib/publicAssetPath';

const MENU_TRIGGER_ID = 'site-menu-trigger';

const inspirationImages = [
  { src: publicAssetPath('/process/P1.jpeg'), alt: 'Fibrous organic micro-structure' },
  { src: publicAssetPath('/process/P3.jpeg'), alt: 'Industrial coil springs' },
  { src: publicAssetPath('/images/pillow-bg.jpeg'), alt: 'Translucent membrane material' },
  { src: publicAssetPath('/diagram/D5.png'), alt: 'Structural joint detail' },
  { src: publicAssetPath('/process/P6.jpeg'), alt: 'Soft pneumatic volume study' },
];

const philosophySketch = publicAssetPath('/diagram/D1.PNG');

const metaphorCards = [
  {
    label: 'VISCERAL',
    src: publicAssetPath('/process/P2.jpeg'),
    alt: 'Blue-toned cellular reference imagery',
  },
  {
    label: 'FEEDBACK',
    src: publicAssetPath(
      '/images 2/' + encodeURIComponent('material exp 3.jpg'),
    ),
    alt: 'Hands shaping a clear inflatable membrane',
  },
];

const artifactExhibition = publicAssetPath('/images/pavilion.png');
const artifactHardware = publicAssetPath('/diagram/D6.jpg');
const artifactSchematics = publicAssetPath('/diagram/D2.JPG');

function openSiteMenu() {
  if (typeof document === 'undefined') return;
  document.getElementById(MENU_TRIGGER_ID)?.click();
}

/**
 * Black regions UR + LL for a soft checkerboard (white UL + LR):
 *   UR: x ≥ cx(y) and y ≤ ry(x)
 *   LL: x ≤ cx(y) and y ≥ ry(x)
 * Column curve: cx(y) = midX + ampX * sin(π y / H)
 * Row curve:    ry(x) = midY − ampY * sin(π x / W)
 */
function buildParadigmBlackRegions(viewW, viewH, ampFrac = 0.085) {
  const midX = viewW / 2;
  const midY = viewH / 2;
  const ampX = viewW * ampFrac;
  const ampY = viewH * ampFrac;
  const cx = (y) => midX + ampX * Math.sin((Math.PI * y) / viewH);
  const ry = (x) => midY - ampY * Math.sin((Math.PI * x) / viewW);

  const n = 96;

  /** Saddle where row and column boundaries cross: x = cx(ry(x)) */
  let lo = 0;
  let hi = viewW;
  for (let k = 0; k < 48; k += 1) {
    const mid = (lo + hi) / 2;
    const f = mid - cx(ry(mid));
    if (f > 0) lo = mid;
    else hi = mid;
  }
  const xs = (lo + hi) / 2;
  const ys = ry(xs);

  const dUR = [];
  dUR.push(`M ${cx(0).toFixed(2)},0`);
  dUR.push(`L ${viewW},0`);
  dUR.push(`L ${viewW},${ry(viewW).toFixed(2)}`);
  for (let i = 0; i <= n; i += 1) {
    const x = viewW * (1 - i / n);
    if (x < xs) break;
    dUR.push(`L ${x.toFixed(2)},${ry(x).toFixed(2)}`);
  }
  dUR.push(`L ${xs.toFixed(2)},${ys.toFixed(2)}`);
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    const y = ys * (1 - t);
    dUR.push(`L ${cx(y).toFixed(2)},${y.toFixed(2)}`);
  }
  dUR.push('Z');

  const dLL = [];
  dLL.push(`M 0,${ry(0).toFixed(2)}`);
  dLL.push(`L 0,${viewH}`);
  dLL.push(`L ${cx(viewH).toFixed(2)},${viewH}`);
  for (let i = 1; i <= n; i += 1) {
    const y = viewH - ((viewH - ys) * i) / n;
    dLL.push(`L ${cx(y).toFixed(2)},${y.toFixed(2)}`);
  }
  for (let i = 0; i <= n; i += 1) {
    const x = xs * (1 - i / n);
    dLL.push(`L ${x.toFixed(2)},${ry(x).toFixed(2)}`);
  }
  dLL.push('Z');

  return { dUR: dUR.join(' '), dLL: dLL.join(' ') };
}

function ParadigmWaveBackground() {
  const { dUR, dLL } = useMemo(() => buildParadigmBlackRegions(1000, 720, 0.088), []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none"
      viewBox="0 0 1000 720"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width="1000" height="720" fill="#f5f5f2" />
      <path fill="#0a0a0a" d={dUR} />
      <path fill="#0a0a0a" d={dLL} />
    </svg>
  );
}

export default function ParadigmShiftSection() {
  return (
    <section
      id="paradigm-shift"
      className="relative isolate min-h-[min(100vh,920px)] overflow-hidden bg-[#f5f5f2] text-neutral-900"
    >
      <ParadigmWaveBackground />

      <header className="relative z-20 px-5 pb-4 pt-12 md:px-10 md:pb-6 md:pt-14 lg:px-14">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <h1 className="max-w-[min(100%,52rem)] font-display text-[clamp(2rem,6.8vw,5.25rem)] font-extralight uppercase leading-[0.95] tracking-[0.08em] text-neutral-950">
            THE PARADIGM SHIFT
          </h1>
          <button
            type="button"
            onClick={openSiteMenu}
            className="shrink-0 self-end font-sans text-[10px] font-medium uppercase tracking-[0.38em] text-neutral-500 transition hover:text-neutral-900 md:pt-2"
          >
            MENU (O)
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-0 lg:min-h-[560px] lg:grid-cols-2 lg:grid-rows-2">
        {/* 1 · Philosophy — upper-left (white) */}
        <div className="relative px-6 py-8 md:px-10 md:py-12 lg:pr-12">
          <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            1. THE PHILOSOPHY
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="relative aspect-[4/3] w-full max-w-md shrink-0 overflow-hidden rounded-sm border border-neutral-200/80 bg-neutral-100 lg:max-w-[46%]">
              <Image
                src={philosophySketch}
                alt="Hand-drawn breathing dome study with breathing arrow and BREATHING DOME label"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 28vw"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-5 font-display text-lg font-light italic leading-snug text-neutral-900 md:text-xl">
                What if our buildings were not just containers, but companions?
              </p>
              <p className="max-w-prose font-sans text-sm font-light leading-relaxed text-neutral-700 md:text-[15px]">
                For millennia, architecture has been defined by rigidity — stone, steel, and glass resisting
                time. The paradigm explored here asks for a softer contract: spaces that listen, yield, and
                co-evolve with the people and climates they hold. Soft systems invite empathy between inhabitant
                and envelope, treating the building less as a monument and more as a responsive companion.
              </p>
            </div>
          </div>
        </div>

        {/* 2 · Inspiration — upper-right (black) */}
        <div className="relative px-6 py-8 text-[#f2f2ec] md:px-10 md:py-12 lg:pl-12">
          <p className="mb-8 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
            2. THE INSPIRATION WALL
          </p>
          <div className="relative flex min-h-[200px] items-center justify-center pl-2 pr-4 md:min-h-[240px]">
            <div className="relative flex w-full max-w-xl items-center justify-center">
              {inspirationImages.map((img, i) => {
                const isCenter = i === 1;
                return (
                  <div
                    key={img.alt}
                    className={`relative shrink-0 overflow-hidden rounded-[999px] border border-white/10 bg-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${
                      isCenter
                        ? 'z-20 -mx-5 h-44 w-44 scale-110 border-white/20 md:h-52 md:w-52'
                        : 'z-10 -mx-4 h-32 w-32 md:h-36 md:w-36'
                    }`}
                    style={{ marginLeft: i === 0 ? 0 : undefined }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="208px" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3 · Metaphor — lower-left (black) */}
        <div className="relative px-6 py-10 text-[#f2f2ec] md:px-10 md:py-14 lg:pr-12">
          <p className="mb-8 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
            3. THE METAPHOR
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {metaphorCards.map((c) => (
              <div
                key={c.label}
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10"
              >
                <Image src={c.src} alt={c.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <p className="absolute bottom-4 left-4 font-display text-xl font-extralight tracking-[0.2em] text-white md:text-2xl">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-lg text-center font-sans text-sm font-light leading-relaxed text-white/75 md:text-[15px]">
            Spatial empathy is breaking physical and digital boundaries so the pavilion reads as a field you feel
            with your body — visceral materiality and closed-loop feedback as two halves of one conversation.
          </p>
        </div>

        {/* 4 · Artifacts — lower-right (white) */}
        <div className="relative px-6 py-10 md:px-10 md:py-14 lg:pl-12">
          <p className="mb-10 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            4. THE ARTIFACTS
          </p>
          <div className="relative mx-auto flex min-h-[340px] max-w-lg items-center justify-center md:min-h-[400px]">
            <div
              className="pointer-events-none absolute inset-0 rounded-sm border border-neutral-200/60 opacity-35 mix-blend-multiply"
              style={{
                backgroundImage: `url(${publicAssetPath('/images/noise.svg')})`,
              }}
              aria-hidden
            />

            {/* IMAGE 8 — back */}
            <figure
              className="absolute w-[86%] max-w-md overflow-hidden rounded-md border border-neutral-200/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
              style={{ transform: 'rotate(-2deg) translate(10px, 22px)', zIndex: 10 }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={artifactSchematics}
                  alt="IMAGE 8: Schematics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <figcaption className="border-t border-neutral-100 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                IMAGE 8: Schematics
              </figcaption>
            </figure>

            {/* IMAGE 7 — middle (revealed at peeled corner) */}
            <figure
              className="absolute w-[86%] max-w-md overflow-hidden rounded-md border border-neutral-200/90 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.12)]"
              style={{ transform: 'rotate(2.5deg) translate(-6px, 8px)', zIndex: 20 }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={artifactHardware}
                  alt="IMAGE 7: Hardware"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <figcaption className="border-t border-neutral-100 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                IMAGE 7: Hardware
              </figcaption>
            </figure>

            {/* IMAGE 6 — top + bottom-right peel */}
            <figure
              className="absolute w-[86%] max-w-md overflow-visible rounded-md border border-neutral-200/90 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
              style={{ transform: 'rotate(-3deg) translateY(-6px)', zIndex: 30 }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-md">
                <Image
                  src={artifactExhibition}
                  alt="IMAGE 6: Exhibition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Peel: wedge shows hardware layer */}
                <div
                  className="pointer-events-none absolute bottom-0 right-0 z-10 h-[38%] w-[34%] overflow-hidden"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 origin-bottom-right shadow-[-6px_-6px_18px_rgba(0,0,0,0.35)]"
                    style={{
                      transform: 'skewX(-6deg) rotate(18deg) translate(8%, 4%)',
                      clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                  >
                    <div className="relative h-[145%] w-[145%] -translate-x-[5%] -translate-y-[8%]" aria-hidden>
                      <Image src={artifactHardware} alt="" fill className="object-cover" sizes="200px" />
                    </div>
                  </div>
                  <div
                    className="absolute bottom-[12%] right-[6%] h-[3px] w-[42%] -rotate-[32deg] rounded-full bg-gradient-to-r from-transparent via-black/25 to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
              <figcaption className="rounded-b-md border-t border-neutral-100 bg-white px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                IMAGE 6: Exhibition
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="relative z-20 h-px w-full bg-neutral-200/80" aria-hidden />
    </section>
  );
}
