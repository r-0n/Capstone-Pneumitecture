"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { publicAssetPath } from "@/lib/publicAssetPath";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80";

/** Direct MP4 URL (optional locally; set in CI secret for GitHub Pages). Relative `/…` paths get `basePath`. */
const rawVideoSrc = process.env.NEXT_PUBLIC_FEATURE_VIDEO_SRC?.trim();
const ENV_VIDEO_SRC = rawVideoSrc ? publicAssetPath(rawVideoSrc) : null;

export function FeatureVideoSection() {
  const reduceMotion = useReducedMotion();
  const videoSrc = ENV_VIDEO_SRC;
  const showVideo = Boolean(videoSrc) && !reduceMotion;

  return (
    <section
      className="feature-video bg-[var(--canvas)] px-5 py-10 md:px-5 md:py-20"
      aria-labelledby="feature-video-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-shadow duration-300 ease-out hover:shadow-[0_28px_72px_rgba(15,23,42,0.12)]"
        >
          <div className="relative aspect-[16/10] min-h-[220px] w-full transition-transform duration-300 ease-out group-hover:scale-[1.02] md:aspect-[16/9]">
            {showVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={videoSrc ?? undefined}
                poster={FALLBACK_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={FALLBACK_POSTER}
                alt="Video poster — rocky mountain landscape timelapse"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                unoptimized={FALLBACK_POSTER.includes("images.pexels.com")}
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <h2
                id="feature-video-heading"
                className="max-w-3xl rounded-xl bg-black/25 px-4 py-4 font-display text-xl font-semibold leading-snug tracking-tight text-white backdrop-blur-sm md:bg-black/20 md:px-6 md:py-5 md:text-2xl lg:text-3xl"
              >
                Architecture that responds, expands, and transforms through air and human
                interaction.
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
