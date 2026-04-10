"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import { AirSensitive } from "@/components/air/AirSensitive";
import { BalloonLine } from "@/components/sections/BalloonText";

/**
 * Single `src` + index cycling is more predictable than multiple `<source>`
 * with `onError` (Strict Mode / aborted loads can fire error once and never recover).
 * Add `public/hero-breathing.mp4` and prepend "/hero-breathing.mp4" when ready.
 */
const VIDEO_SOURCES = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-white-smoke-on-black-background-44712-large.mp4",
];

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  const p = video.play();
  if (p !== undefined) {
    void p.catch(() => {
      /* Autoplay can be deferred; muted + playsInline still usually wins on next tick */
    });
  }
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const src = VIDEO_SOURCES[srcIndex] ?? VIDEO_SOURCES[0];

  const onVideoError = useCallback(
    (e: SyntheticEvent<HTMLVideoElement, Event>) => {
      const el = e.currentTarget;
      const code = el.error?.code;
      /* React Strict Mode / navigation can abort the previous load — don’t burn through fallbacks */
      if (code === MediaError.MEDIA_ERR_ABORTED) return;
      setSrcIndex((i) => {
        const next = i + 1;
        return next < VIDEO_SOURCES.length ? next : i;
      });
    },
    [],
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    v.load();

    const onCanPlay = () => tryPlay(v);
    v.addEventListener("canplay", onCanPlay);
    tryPlay(v);

    return () => v.removeEventListener("canplay", onCanPlay);
  }, [src]);

  return (
    <section className="relative flex min-h-dvh w-full items-end justify-center overflow-hidden bg-[#050506] pb-16 pt-28 md:items-center md:pb-24 md:pt-0">
      {/* z-0: ambient pulse only — stays under the video */}
      <div
        className="hero-membrane pointer-events-none absolute inset-0 z-0 opacity-50"
        aria-hidden
      />
      <div
        className="hero-membrane hero-membrane--delayed pointer-events-none absolute inset-0 z-0 opacity-35"
        aria-hidden
      />

      {/* z-[1]: video + scrim — never unmount video (avoids “stuck hidden” after refresh) */}
      <div className="absolute inset-0 z-[1]">
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={onVideoError}
        />

        <div
          className="absolute inset-0 z-[2] bg-linear-to-b from-[#050506]/55 via-[#050506]/35 to-[#050506]/88"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_50%_38%,transparent_0%,#050506_65%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:gap-8 md:px-10">
        <AirSensitive strength={14} radius={220} className="origin-left">
          <h1 className="font-display text-[clamp(3.25rem,12vw,9rem)] font-normal leading-[0.92] tracking-[0.02em]">
            <BalloonLine text="Pneumitecture" className="block" />
          </h1>
        </AirSensitive>

        <AirSensitive strength={9} radius={180} className="max-w-2xl">
          <p className="text-lg leading-relaxed text-white/75 md:text-xl md:leading-relaxed">
            Prototyping Empathic Spaces through{" "}
            <span className="text-(--accent-blue)">Pneumatic Soft Robotics</span>
            .
          </p>
        </AirSensitive>

        <motion.div
          className="mt-4 h-px max-w-xs origin-left bg-linear-to-r from-(--accent-orange)/80 via-white/25 to-transparent"
          initial={{ scaleX: 0.2, opacity: 0.4 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </section>
  );
}
