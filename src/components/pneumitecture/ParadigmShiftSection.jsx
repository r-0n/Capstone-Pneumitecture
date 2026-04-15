'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';
import { publicAssetPath } from '@/lib/publicAssetPath';

const inspirationImages = [
  { src: publicAssetPath('/process/P1.jpeg'), alt: 'Fibrous organic micro-structure' },
  { src: publicAssetPath('/process/P3.jpeg'), alt: 'Industrial coil springs' },
  { src: publicAssetPath('/images/pillow-bg.jpeg'), alt: 'Translucent membrane material' },
  { src: publicAssetPath('/diagram/D5.png'), alt: 'Structural joint detail' },
  { src: publicAssetPath('/process/P6.jpeg'), alt: 'Soft pneumatic volume study' },
];

const philosophyPrimary = publicAssetPath('/images/breathing-dome.png');
const philosophyFallback = publicAssetPath('/diagram/D1.PNG');

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

const artifactCards = [
  {
    key: 'exhibition',
    label: 'IMAGE 6: Exhibition',
    src: publicAssetPath('/images/pavilion.png'),
    base: { rotate: -3, tx: 0, ty: -6 },
  },
  {
    key: 'hardware',
    label: 'IMAGE 7: Hardware',
    src: publicAssetPath('/diagram/D6.jpg'),
    base: { rotate: 2.5, tx: -6, ty: 8 },
  },
  {
    key: 'schematics',
    label: 'IMAGE 8: Schematics',
    src: publicAssetPath('/diagram/D2.JPG'),
    base: { rotate: -2, tx: 10, ty: 22 },
  },
];

function artifactRank(cardIndex, topIndex) {
  return (cardIndex - topIndex + artifactCards.length) % artifactCards.length;
}

/**
 * Wavy shells — quiet shifts in the site canvas / paper family, one cool accent whisper.
 * Aligns with globals: --canvas, --canvas-deep, --paper, --ink.
 */
const PARADIGM_SHELL = {
  tl: 'linear-gradient(165deg, #fbfbf9 0%, #eef1f6 45%, #e8eef6 100%)',
  tr: 'linear-gradient(175deg, #f7f8fb 0%, #eef1f6 40%, #e9f3f6 100%)',
  bl: 'linear-gradient(168deg, #14161a 0%, #1c222b 52%, #1a2430 100%)',
  br: 'linear-gradient(155deg, #ffffff 0%, #f5f6f8 55%, #eef1f6 100%)',
};

const sectionLabelLight =
  'mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500';
const sectionLabelDark =
  'mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400';

function WavyShell({ clipUrl, shellGradient, children }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ clipPath: clipUrl, background: shellGradient }}
      />
      <div className="relative z-[1] min-h-full" style={{ clipPath: clipUrl }}>
        {children}
      </div>
    </>
  );
}

function pathFromPoints(points) {
  if (!points.length) return '';
  const [x0, y0] = points[0];
  let d = `M ${x0} ${y0}`;
  for (let i = 1; i < points.length; i += 1) {
    d += ` L ${points[i][0]} ${points[i][1]}`;
  }
  d += ' Z';
  return d;
}

/** Organic clip paths (objectBoundingBox) — gentle waves, calmer silhouette. */
function buildParadigmGeometry() {
  const ins = 0.028;
  const wv = 0.022;
  const m = 36;

  const clipTL = (() => {
    const pts = [];
    pts.push([ins, ins], [1 - ins, ins]);
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const y = ins + t * (1 - 2 * ins);
      pts.push([1 - ins - wv * Math.sin(2 * Math.PI * 1.12 * t + 0.15), y]);
    }
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const x = 1 - ins - t * (1 - 2 * ins);
      pts.push([x, 1 - ins - wv * Math.sin(2 * Math.PI * 1.08 * (1 - t) + 0.4)]);
    }
    pts.push([ins, 1 - ins], [ins, ins]);
    return pathFromPoints(pts);
  })();

  const clipTR = (() => {
    const pts = [];
    pts.push([ins, ins], [1 - ins, ins], [1 - ins, 1 - ins]);
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const x = 1 - ins - t * (1 - 2 * ins);
      pts.push([x, 1 - ins - wv * Math.sin(2 * Math.PI * 1.05 * t + 0.35)]);
    }
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const y = 1 - ins - t * (1 - 2 * ins);
      pts.push([ins + wv * Math.sin(2 * Math.PI * 1.1 * (1 - t) + 0.1), y]);
    }
    pts.push([ins, ins]);
    return pathFromPoints(pts);
  })();

  const clipBL = (() => {
    const pts = [];
    pts.push([ins, 1 - ins], [1 - ins, 1 - ins]);
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const y = 1 - ins - t * (1 - 2 * ins);
      pts.push([1 - ins - wv * Math.sin(2 * Math.PI * 1.14 * t + 0.45), y]);
    }
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const x = 1 - ins - t * (1 - 2 * ins);
      pts.push([x, ins + wv * Math.sin(2 * Math.PI * 1.08 * (1 - t) + 0.22)]);
    }
    pts.push([ins, ins], [ins, 1 - ins]);
    return pathFromPoints(pts);
  })();

  const clipBR = (() => {
    const pts = [];
    pts.push([1 - ins, 1 - ins], [ins, 1 - ins]);
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const y = 1 - ins - t * (1 - 2 * ins);
      pts.push([ins + wv * Math.sin(2 * Math.PI * 1.1 * t + 0.18), y]);
    }
    pts.push([ins, ins]);
    for (let k = 0; k <= m; k += 1) {
      const t = k / m;
      const x = ins + t * (1 - 2 * ins);
      pts.push([x, ins + wv * Math.sin(2 * Math.PI * 1.05 * (1 - t) + 0.32)]);
    }
    pts.push([1 - ins, ins], [1 - ins, 1 - ins]);
    return pathFromPoints(pts);
  })();

  return { clipTL, clipTR, clipBL, clipBR };
}

/** Shared clip-path definitions; quadrant panels supply their own fills. */
function ParadigmClipDefs({ clipIdPrefix, geometry }) {
  const { clipTL, clipTR, clipBL, clipBR } = geometry;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <clipPath id={`${clipIdPrefix}-tl`} clipPathUnits="objectBoundingBox">
          <path d={clipTL} />
        </clipPath>
        <clipPath id={`${clipIdPrefix}-tr`} clipPathUnits="objectBoundingBox">
          <path d={clipTR} />
        </clipPath>
        <clipPath id={`${clipIdPrefix}-bl`} clipPathUnits="objectBoundingBox">
          <path d={clipBL} />
        </clipPath>
        <clipPath id={`${clipIdPrefix}-br`} clipPathUnits="objectBoundingBox">
          <path d={clipBR} />
        </clipPath>
      </defs>
    </svg>
  );
}

const PARADIGM_HEADING = 'THE PARADIGM SHIFT';

export default function ParadigmShiftSection() {
  const clipIdPrefix = useId().replace(/:/g, '');
  const paradigmGeometry = useMemo(() => buildParadigmGeometry(), []);

  const [philosophySrc, setPhilosophySrc] = useState(philosophyPrimary);
  const [inspirationFocus, setInspirationFocus] = useState(0);
  const [artifactTop, setArtifactTop] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setInspirationFocus((i) => (i + 1) % inspirationImages.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const peelUnderSrc = artifactCards[(artifactTop + 1) % artifactCards.length].src;

  const clip = (suffix) => `url(#${clipIdPrefix}-${suffix})`;

  return (
    <section
      id="paradigm-shift"
      className="relative isolate min-h-screen overflow-hidden bg-[var(--canvas)] text-neutral-900"
    >
      <ParadigmClipDefs clipIdPrefix={clipIdPrefix} geometry={paradigmGeometry} />

      <header className="relative z-20 border-b border-[color:var(--hairline)] px-4 pb-6 pt-8 sm:px-6 sm:pb-7 sm:pt-10 md:px-10 md:pt-12 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="m-0 font-display text-[clamp(2.1rem,7vw,5.85rem)] font-extralight uppercase leading-[0.92] tracking-[0.12em] text-[var(--ink)]">
            {PARADIGM_HEADING}
          </h1>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-0 lg:min-h-[min(62vh,640px)] lg:grid-cols-2 lg:grid-rows-2">
        {/* 1 · Philosophy — upper-left (light) */}
        <div className="relative lg:pr-8 lg:pt-4">
          <WavyShell clipUrl={clip('tl')} shellGradient={PARADIGM_SHELL.tl}>
            <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
              <p className={sectionLabelLight}>1. The philosophy</p>
              <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
            <div className="relative aspect-[4/3] w-full max-w-md shrink-0 overflow-hidden rounded-sm border border-[color:var(--hairline-strong)] bg-[var(--paper)] lg:max-w-[46%]">
              <Image
                src={philosophySrc}
                alt="Hand-drawn breathing dome study with airflow annotations and BREATHING DOME title"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 28vw"
                onError={() => setPhilosophySrc((s) => (s === philosophyPrimary ? philosophyFallback : s))}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-5 font-display text-lg font-light italic leading-snug text-[var(--ink)] md:text-xl">
                What if our buildings were not just containers, but companions?
              </p>
              <p className="max-w-prose font-sans text-sm font-light leading-relaxed text-[var(--ink-muted)] md:text-[15px]">
                At its core, the project explores the possibility of architecture that moves, breathes,
                and responds like a living organism. Traditional architecture is typically conceived as 
                static: walls, ceilings, and surfaces that remain fixed once constructed. This project challenges 
                that paradigm by imagining a spatial system composed of soft pneumatic cells capable of continuous 
                transformation through cycles of inflation and deflation.
              </p>
            </div>
              </div>
            </div>
          </WavyShell>
        </div>

        {/* 2 · Inspiration — upper-right (light) */}
        <div className="relative text-neutral-900 lg:pl-8 lg:pt-4">
          <WavyShell clipUrl={clip('tr')} shellGradient={PARADIGM_SHELL.tr}>
            <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
              <p className={`${sectionLabelLight} mb-5`}>2. The inspiration wall</p>
              <div className="relative flex min-h-[200px] items-center justify-center md:min-h-[220px]">
                <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2.5 md:gap-3">
              {inspirationImages.map((img, i) => {
                const isFocused = inspirationFocus === i;
                return (
                  <div
                    key={img.alt}
                    className={[
                      'relative aspect-square shrink-0 overflow-hidden rounded-md border bg-[var(--paper)] shadow-sm transition-[transform,opacity,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      isFocused
                        ? 'z-10 h-44 w-44 border-[color:var(--hairline-strong)] shadow-[var(--shadow-soft)] md:h-48 md:w-48'
                        : 'z-0 h-24 w-24 border-[color:var(--hairline)] opacity-80 md:h-28 md:w-28',
                    ].join(' ')}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes={isFocused ? '224px' : '128px'}
                    />
                  </div>
                );
              })}
                </div>
              </div>
            </div>
          </WavyShell>
        </div>

        {/* 3 · Metaphor — lower-left (dark) */}
        <div className="relative text-neutral-200 lg:pr-8 lg:pb-6">
          <WavyShell clipUrl={clip('bl')} shellGradient={PARADIGM_SHELL.bl}>
            <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
              <p className={sectionLabelDark}>3. The metaphor</p>
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg sm:gap-4">
            {metaphorCards.map((c) => (
              <div
                key={c.label}
                className="relative aspect-[5/4] min-h-[9.5rem] overflow-hidden rounded-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:min-h-[10.5rem] md:min-h-[11rem]"
              >
                <Image src={c.src} alt={c.alt} fill className="object-cover" sizes="(max-width: 640px) 45vw, 220px" />
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute inset-0 flex items-center justify-center px-2 text-center font-display text-base font-extralight tracking-[0.16em] text-white md:text-lg">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
              <p className="mx-auto mt-5 max-w-md text-center font-sans text-xs font-light leading-relaxed text-neutral-300 sm:text-sm md:text-[15px]">
            Spatial empathy is breaking physical and digital boundaries so the pavilion reads as a field you feel
            with your body — visceral materiality and closed-loop feedback as two halves of one conversation.
              </p>
            </div>
          </WavyShell>
        </div>

        {/* 4 · Artifacts — lower-right (light) */}
        <div className="relative lg:pl-8 lg:pb-8">
          <WavyShell clipUrl={clip('br')} shellGradient={PARADIGM_SHELL.br}>
            <div className="px-5 py-7 sm:px-6 sm:py-8 md:px-8 md:py-9">
              <p className={`${sectionLabelLight} mb-6`}>4. The artifacts</p>
          <button
            type="button"
            className="relative mx-auto flex min-h-[280px] w-full max-w-lg cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400 md:min-h-[320px]"
            onClick={() => setArtifactTop((t) => (t + 1) % artifactCards.length)}
            aria-label="Show next artifact in the stack"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-sm border border-neutral-200/60 opacity-35 mix-blend-multiply"
              style={{
                backgroundImage: `url(${publicAssetPath('/images/noise.svg')})`,
              }}
              aria-hidden
            />

            {artifactCards.map((card, i) => {
              const rank = artifactRank(i, artifactTop);
              const z = 10 + (2 - rank) * 10;
              const { rotate, tx, ty } = card.base;
              const lift = rank === 0 ? 0 : rank === 1 ? 4 : 8;
              const scale = rank === 0 ? 1 : rank === 1 ? 0.985 : 0.97;
              const isTop = rank === 0;
              const showPeel = isTop;

              return (
                <figure
                  key={card.key}
                  className={`absolute w-[86%] max-w-md rounded-md border border-neutral-200/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isTop ? 'overflow-visible' : 'overflow-hidden'
                  }`}
                  style={{
                    zIndex: z,
                    transform: `rotate(${rotate}deg) translate(${tx}px, ${ty + lift}px) scale(${scale})`,
                  }}
                >
                  <div
                    className={`relative aspect-[16/10] w-full ${showPeel ? 'overflow-visible' : 'overflow-hidden'} ${showPeel ? 'rounded-t-md' : ''}`}
                  >
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    {showPeel ? (
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
                            <Image src={peelUnderSrc} alt="" fill className="object-cover" sizes="200px" />
                          </div>
                        </div>
                        <div
                          className="absolute bottom-[12%] right-[6%] h-[3px] w-[42%] -rotate-[32deg] rounded-full bg-gradient-to-r from-transparent via-black/25 to-transparent"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                  </div>
                  <figcaption className="rounded-b-md border-t border-neutral-100 bg-white px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                    {card.label}
                  </figcaption>
                </figure>
              );
            })}
          </button>
            </div>
          </WavyShell>
        </div>
      </div>

      <div className="hairline relative z-20 mx-auto max-w-[1600px] opacity-80" aria-hidden />
    </section>
  );
}
