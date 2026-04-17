"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { publicAssetPath } from "@/lib/publicAssetPath";

const CONCEPT_VIDEO_YOUTUBE_ID = "fMwz87q0dC8";

const GALLERY_ITEMS = [
  {
    type: "image" as const,
    src: publicAssetPath("/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (1).png")),
    alt: "Soft white pillow-like pneumatic study",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (2).png")),
    alt: "Translucent bubble cluster concept",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/pavilion.png"),
    alt: "Plaza gathering pavilion illustration",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/section01/attachment-03.png"),
    alt: "Material and form study",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/hex-pouch-prototype.png"),
    alt: "Translucent hexagonal heat-sealed pouch with air tube on a wood tabletop",
  },
  {
    type: "video" as const,
    youtubeId: CONCEPT_VIDEO_YOUTUBE_ID,
    title: "Design concept video",
  },
] as const;

function youtubeEmbedSrc(id: string) {
  const q = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube.com/embed/${id}?${q.toString()}`;
}

type Particle = {
  id: string;
  kind: "image" | "video";
  src: string;
  alt: string;
  youtubeId?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  phase: number;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/** Axis-aligned overlap depth; <=0 means no overlap. */
function aabbOverlapDepth(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
): { ox: number; oy: number } {
  const ox = Math.min(ax + aw, bx + bw) - Math.max(ax, bx);
  const oy = Math.min(ay + ah, by + bh) - Math.max(ay, by);
  return { ox, oy };
}

/**
 * Separate two AABBs and bounce velocities. Frozen particles (hover/focus) act as static obstacles.
 */
function resolveParticlePair(
  a: Particle,
  b: Particle,
  aFrozen: boolean,
  bFrozen: boolean,
  restitution = 0.88,
) {
  if (aFrozen && bFrozen) return;

  const { ox, oy } = aabbOverlapDepth(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
  if (ox <= 0 || oy <= 0) return;

  const acx = a.x + a.w * 0.5;
  const acy = a.y + a.h * 0.5;
  const bcx = b.x + b.w * 0.5;
  const bcy = b.y + b.h * 0.5;

  let nx = 0;
  let ny = 0;
  let sep = 0;

  if (ox < oy) {
    sep = ox + 0.35;
    nx = acx < bcx ? 1 : -1;
  } else {
    sep = oy + 0.35;
    ny = acy < bcy ? 1 : -1;
  }

  const moveA = !aFrozen;
  const moveB = !bFrozen;
  const parts = (moveA ? 1 : 0) + (moveB ? 1 : 0);
  const share = parts > 0 ? 1 / parts : 1;

  a.x -= nx * sep * share * (moveA ? 1 : 0);
  a.y -= ny * sep * share * (moveA ? 1 : 0);
  b.x += nx * sep * share * (moveB ? 1 : 0);
  b.y += ny * sep * share * (moveB ? 1 : 0);

  const nLen = Math.hypot(nx, ny) || 1;
  const ux = nx / nLen;
  const uy = ny / nLen;

  if (!aFrozen && !bFrozen) {
    const rvx = b.vx - a.vx;
    const rvy = b.vy - a.vy;
    const velAlongN = rvx * ux + rvy * uy;
    if (velAlongN > 0.12) return;

    const j = (-(1 + restitution) * velAlongN) / 2;
    const jx = j * ux;
    const jy = j * uy;
    a.vx -= jx;
    a.vy -= jy;
    b.vx += jx;
    b.vy += jy;
    return;
  }

  const reflectDyn = (dyn: Particle, st: Particle) => {
    let dnx = dyn.x + dyn.w * 0.5 - (st.x + st.w * 0.5);
    let dny = dyn.y + dyn.h * 0.5 - (st.y + st.h * 0.5);
    const dlen = Math.hypot(dnx, dny);
    if (dlen < 1e-3) {
      dnx = ux;
      dny = uy;
    } else {
      dnx /= dlen;
      dny /= dlen;
    }
    const vn = dyn.vx * dnx + dyn.vy * dny;
    if (vn >= -0.08) return;
    dyn.vx -= (1 + restitution) * vn * dnx;
    dyn.vy -= (1 + restitution) * vn * dny;
  };

  if (aFrozen && !bFrozen) reflectDyn(b, a);
  else if (!aFrozen && bFrozen) reflectDyn(a, b);
}

function resolveParticleCollisions(
  particles: Particle[],
  focused: string | null,
  hovered: string | null,
  passes = 3,
) {
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        resolveParticlePair(
          a,
          b,
          a.id === focused || a.id === hovered,
          b.id === focused || b.id === hovered,
        );
      }
    }
  }
}

function initParticles(cw: number, ch: number): Particle[] {
  const n = GALLERY_ITEMS.length;
  const w = clamp(cw * 0.26, 108, 200);
  const h = w * 1.08;
  const cols = 3;
  const rowCount = Math.max(1, Math.ceil(n / cols));
  const rowDenom = Math.max(1, rowCount - 1);
  return GALLERY_ITEMS.map((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col / cols) * Math.max(0, cw - w) * 0.88 + cw * 0.04;
    const y =
      rowCount === 1
        ? ch * 0.05
        : (row / rowDenom) * Math.max(0, ch - h) * 0.72 + ch * 0.05;
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.45;
    const speed = 12 + Math.random() * 14;
    const base = {
      id: `dc-float-${i}`,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w,
      h,
      phase: Math.random() * Math.PI * 2,
    };
    if (item.type === "image") {
      return { ...base, kind: "image" as const, src: item.src, alt: item.alt };
    }
    return {
      ...base,
      kind: "video" as const,
      src: "",
      alt: item.title,
      youtubeId: item.youtubeId,
    };
  });
}

export default function DesignConceptFloatGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const focusedRef = useRef<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    focusedRef.current = focusedId;
  }, [focusedId]);
  useEffect(() => {
    hoveredRef.current = hoveredId;
  }, [hoveredId]);

  const applyTransforms = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const focused = focusedRef.current;
    const hovered = hoveredRef.current;
    for (const p of particlesRef.current) {
      const el = root.querySelector<HTMLElement>(`[data-float-id="${p.id}"]`);
      if (!el) continue;
      const zBase = Math.round(12 + p.y * 0.1);
      const z = p.id === focused ? 220 : p.id === hovered ? 180 : zBase;
      const sc = p.id === focused ? 1.06 : p.id === hovered ? 1.04 : 1;
      el.style.width = `${p.w}px`;
      el.style.height = `${p.h}px`;
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${sc})`;
      el.style.zIndex = String(z);
    }
  }, []);

  const setupFromSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width: cw, height: ch } = el.getBoundingClientRect();
    if (cw < 48 || ch < 48) return;
    particlesRef.current = initParticles(cw, ch);
    lastRef.current = performance.now();
    requestAnimationFrame(() => applyTransforms());
  }, [applyTransforms]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setupFromSize());
    ro.observe(el);
    setupFromSize();
    return () => ro.disconnect();
  }, [setupFromSize]);

  useEffect(() => {
    applyTransforms();
  }, [applyTransforms, focusedId, hoveredId]);

  useEffect(() => {
    const tick = (now: number) => {
      const root = containerRef.current;
      if (!root) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const { width: cw, height: ch } = root.getBoundingClientRect();
      const particles = particlesRef.current;
      if (cw < 48 || ch < 48 || particles.length === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      let dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      dt = clamp(dt, 0, 0.055);

      const focused = focusedRef.current;
      const hovered = hoveredRef.current;

      for (const p of particles) {
        if (p.id === focused || p.id === hovered) continue;

        const t = now / 1000;
        const buoy = Math.sin(t * 0.42 + p.phase) * 6.5;
        const sway = Math.cos(t * 0.36 + p.phase * 1.2) * 5.5;
        p.vx += sway * dt;
        p.vy += buoy * dt;
        p.vx *= 1 - dt * 0.045;
        p.vy *= 1 - dt * 0.045;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x <= 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx) * 0.97;
        } else if (p.x + p.w >= cw) {
          p.x = cw - p.w;
          p.vx = -Math.abs(p.vx) * 0.97;
        }
        if (p.y <= 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy) * 0.97;
        } else if (p.y + p.h >= ch) {
          p.y = ch - p.h;
          p.vy = -Math.abs(p.vy) * 0.97;
        }

        const minSpeed = 10;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < minSpeed && sp > 0.02) {
          p.vx = (p.vx / sp) * minSpeed;
          p.vy = (p.vy / sp) * minSpeed;
        }
      }

      resolveParticleCollisions(particles, focused, hovered, 4);

      for (const p of particles) {
        if (p.id === focused || p.id === hovered) continue;
        if (p.x <= 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx) * 0.97;
        } else if (p.x + p.w >= cw) {
          p.x = cw - p.w;
          p.vx = -Math.abs(p.vx) * 0.97;
        }
        if (p.y <= 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy) * 0.97;
        } else if (p.y + p.h >= ch) {
          p.y = ch - p.h;
          p.vy = -Math.abs(p.vy) * 0.97;
        }
      }

      for (const p of particles) {
        const el = root.querySelector<HTMLElement>(`[data-float-id="${p.id}"]`);
        if (!el) continue;
        const zBase = Math.round(12 + p.y * 0.1);
        const z = p.id === focused ? 220 : p.id === hovered ? 180 : zBase;
        const sc = p.id === focused ? 1.06 : p.id === hovered ? 1.04 : 1;
        el.style.width = `${p.w}px`;
        el.style.height = `${p.h}px`;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${sc})`;
        el.style.zIndex = String(z);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        focusedRef.current = null;
        setFocusedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[min(52vh,22rem)] w-full flex-1 overflow-hidden md:min-h-0"
      aria-label="Floating design concept studies"
    >
      {GALLERY_ITEMS.map((item, i) => {
        const id = `dc-float-${i}`;
        const isFocused = focusedId === id;
        const isHovered = hoveredId === id;
        const tileChrome = `absolute left-0 top-0 overflow-hidden rounded-xl bg-[var(--paper)]/95 text-left shadow-sm transition-[box-shadow,ring] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${
          isFocused
            ? "ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-[var(--bone)] shadow-md"
            : isHovered
              ? "ring-2 ring-cyan-400/50 shadow-md"
              : "ring-0"
        }`;

        const onEnter = () => {
          hoveredRef.current = id;
          setHoveredId(id);
        };
        const onLeave = () => {
          hoveredRef.current = null;
          setHoveredId((h) => (h === id ? null : h));
        };
        const onToggleFocus = () => {
          setFocusedId((f) => {
            const next = f === id ? null : id;
            focusedRef.current = next;
            return next;
          });
        };

        if (item.type === "image") {
          return (
            <button
              key={id}
              type="button"
              data-float-id={id}
              className={tileChrome}
              style={{ width: 160, height: 172, transform: "translate3d(0,0,0) scale(1)" }}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={onToggleFocus}
            >
              <span className="relative block h-full w-full">
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="220px" draggable={false} />
              </span>
            </button>
          );
        }

        const embedSrc = youtubeEmbedSrc(item.youtubeId);
        return (
          <div
            key={id}
            role="button"
            tabIndex={0}
            data-float-id={id}
            aria-label={item.title}
            className={tileChrome}
            style={{ width: 160, height: 172, transform: "translate3d(0,0,0) scale(1)" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={onToggleFocus}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleFocus();
              }
            }}
          >
            <span className="relative block h-full w-full">
              <iframe
                title={item.title}
                src={embedSrc}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ pointerEvents: isFocused ? "auto" : "none" }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
