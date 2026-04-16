"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArtifactsImageSlider } from "@/components/pneumitecture/paradigm-shift/ArtifactsImageSlider";

const STACK = [
  {
    key: "schematics",
    label: "Image 8: Schematics",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    rotate: -1.2,
    y: 56,
    z: 10,
  },
  {
    key: "hardware",
    label: "Image 7: Hardware",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    rotate: 1.8,
    y: 28,
    z: 20,
  },
] as const;

const TOP = {
  key: "exhibition",
  label: "Image 6: Exhibition",
  src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  rotate: -2.2,
} as const;

type ArtifactsTone = "dark" | "light";

export function ArtifactsPeelStack({ tone = "dark" }: { tone?: ArtifactsTone }) {
  const [hovered, setHovered] = useState(false);
  const peel = hovered ? 20 : 9;

  const isLight = tone === "light";
  const labelMuted = isLight ? "text-neutral-500" : "text-white/55";
  const navBorder = isLight ? "border-neutral-300/80" : "border-white/20";
  const dotActive = isLight ? "bg-neutral-800" : "bg-white";
  const dotIdle = isLight ? "bg-neutral-800/30" : "bg-white/30";
  const cardBorder = isLight ? "border-neutral-300/70" : "border-white/25";
  const cardBg = isLight ? "bg-neutral-100" : "bg-neutral-900";
  const topCardBorder = isLight ? "border-neutral-400/60" : "border-white/35";
  const captionBar = isLight ? "border-neutral-300/80 bg-white/95" : "border-white/40 bg-white/95";
  const captionText = "text-neutral-600";

  return (
    <div className="relative flex min-h-[380px] flex-col lg:min-h-[440px]">
      <div className="mb-5 flex items-start justify-between gap-4 pr-6 lg:pr-8">
        <p className={`font-sans text-[11px] font-semibold uppercase tracking-[0.26em] md:text-[12px] ${labelMuted}`}>
          4. Initial sketches
        </p>
        <nav
          className={`flex flex-col gap-2 border-l pl-3 ${navBorder}`}
          aria-label="Artifact index"
        >
          {[TOP, ...STACK].map((c, i) => (
            <span
              key={c.key}
              className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                i === 0 ? dotActive : dotIdle
              }`}
            />
          ))}
        </nav>
      </div>

      <ArtifactsImageSlider tone={tone} />

      <div
        className="relative mx-auto mt-2 w-full max-w-lg flex-1 overflow-hidden lg:max-w-xl"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {STACK.map((c) => (
          <div
            key={c.key}
            className={`absolute left-[5%] right-[7%] overflow-hidden rounded-lg border shadow-xl ${cardBorder} ${cardBg}`}
            style={{
              top: c.y,
              zIndex: c.z,
              transform: `rotate(${c.rotate}deg)`,
            }}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image src={c.src} alt="" fill className="object-cover" sizes="400px" />
              <div className={`absolute inset-x-0 bottom-0 border-t px-3 py-1.5 ${captionBar}`}>
                <p className={`font-sans text-[9px] font-semibold uppercase tracking-[0.2em] ${captionText}`}>
                  {c.label}
                </p>
              </div>
            </div>
          </div>
        ))}

        <motion.div
          className={`absolute left-[3%] right-[5%] top-0 z-40 overflow-visible rounded-lg border bg-white shadow-2xl ${topCardBorder}`}
          style={{ transform: `rotate(${TOP.rotate}deg)` }}
          animate={{ rotate: hovered ? TOP.rotate - 1.2 : TOP.rotate }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg">
            <Image src={TOP.src} alt="Exhibition pavilion" fill className="object-cover" sizes="400px" />
            <div
              className="pointer-events-none absolute bottom-0 right-0 origin-bottom-right transition-transform duration-500 ease-out"
              style={{
                width: "40%",
                height: "44%",
                transform: `rotate(${peel}deg)`,
                boxShadow: hovered
                  ? "-14px -10px 32px rgba(0,0,0,0.4)"
                  : "-8px -6px 20px rgba(0,0,0,0.25)",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white via-neutral-100 to-neutral-400/90"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />
              <div
                className="absolute bottom-0 right-0 h-full w-full"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.2) 0%, rgba(200,200,200,0.55) 50%, rgba(140,140,140,0.35) 100%)",
                  clipPath: "polygon(100% 6%, 88% 100%, 100% 100%)",
                }}
              />
              <div
                className="absolute bottom-2 right-2 h-[52%] w-[52%] overflow-hidden rounded-sm border border-white/50 shadow-md"
                style={{ transform: "rotate(-5deg)" }}
              >
                <Image
                  src={STACK[1].src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </div>
          <div className={`border-t bg-white px-3 py-2 ${isLight ? "border-neutral-200" : "border-white/50"}`}>
            <p className={`font-sans text-[9px] font-semibold uppercase tracking-[0.2em] ${captionText}`}>
              {TOP.label}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
