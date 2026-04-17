"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { YouTubeForceMutedPlayer } from "@/components/pneumitecture/paradigm-shift/YouTubeForceMutedPlayer";

type MetaphorClip =
  | { kind: "drive"; id: string; title: string }
  | { kind: "youtube"; videoId: string; title: string };

const METAPHOR_VIDEOS: MetaphorClip[] = [
  {
    kind: "drive",
    id: "15LPcn--R-cZZXUlfOctfqLajAIJmroL5",
    title: "The metaphor — reference video A",
  },
  {
    kind: "youtube",
    videoId: "oivFJ6d2UN4",
    title: "The metaphor — reference video B",
  },
];

type FocusIndex = 0 | 1 | null;

function clipKey(c: MetaphorClip) {
  return c.kind === "drive" ? `drive-${c.id}` : `yt-${c.videoId}`;
}

function drivePreviewSrc(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function MetaphorVideoSurface({
  clip,
  isFocused,
  onFocusRequest,
  tone,
}: {
  clip: MetaphorClip;
  isFocused: boolean;
  onFocusRequest: () => void;
  tone: "light" | "dark";
}) {
  const frame =
    tone === "light"
      ? "bg-neutral-100 shadow-[0_20px_48px_-12px_rgba(15,23,42,0.12)] ring-1 ring-neutral-300/80"
      : "bg-black shadow-[0_28px_60px_-14px_rgba(0,0,0,0.85)] ring-1 ring-white/12";
  const focusRingOffset =
    tone === "light"
      ? "focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      : "focus-visible:ring-offset-2 focus-visible:ring-offset-black/40";

  return (
    <div className={`relative aspect-4/3 w-full overflow-hidden rounded-xl ${frame}`}>
      {clip.kind === "drive" ? (
        <iframe
          title={clip.title}
          src={drivePreviewSrc(clip.id)}
          className="absolute inset-0 block h-full w-full border-0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <YouTubeForceMutedPlayer videoId={clip.videoId} title={clip.title} />
      )}
      <button
        type="button"
        aria-pressed={isFocused}
        aria-label={isFocused ? `${clip.title} (focused)` : `Focus ${clip.title}`}
        className={
          isFocused
            ? "pointer-events-none absolute inset-0 z-2 rounded-xl"
            : `absolute inset-0 z-2 cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${focusRingOffset}`
        }
        onClick={(e) => {
          e.stopPropagation();
          onFocusRequest();
        }}
      />
    </div>
  );
}

function card0LayoutClass(focus: FocusIndex) {
  if (focus === null) {
    return "left-0 top-2 z-10 w-[min(100%,17.5rem)] sm:w-[min(100%,20rem)] md:top-4 md:w-[56%]";
  }
  if (focus === 0) {
    return "left-1/2 top-1/2 z-30 w-[min(92vw,36rem)] max-w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2";
  }
  return "left-2 top-3 z-10 w-[min(100%,11rem)] sm:left-3 sm:top-4 sm:w-[min(100%,12rem)] md:w-[38%] opacity-[0.55]";
}

function card1LayoutClass(focus: FocusIndex) {
  if (focus === null) {
    return "bottom-2 right-0 z-20 w-[min(100%,17.5rem)] sm:w-[min(100%,20rem)] md:bottom-4 md:w-[56%]";
  }
  if (focus === 1) {
    return "left-1/2 top-1/2 z-30 w-[min(92vw,36rem)] max-w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2";
  }
  return "bottom-3 right-2 z-10 w-[min(100%,11rem)] sm:bottom-4 sm:right-3 sm:w-[min(100%,12rem)] md:w-[38%] opacity-[0.55]";
}

type MetaphorCardsProps = {
  /** When true, scales min-heights to fit the Paradigm bento cell. */
  fillContainer?: boolean;
  /** Light: for cream / canvas lower band. Dark: obsidian-style band. */
  tone?: "light" | "dark";
};

export function MetaphorCards({ fillContainer = false, tone = "dark" }: MetaphorCardsProps) {
  const reduceMotion = useReducedMotion();
  const [focus, setFocus] = useState<FocusIndex>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!stackRef.current?.contains(e.target as Node)) setFocus(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [focus]);

  const layoutSpring = reduceMotion
    ? { type: "tween" as const, duration: 0.2 }
    : { type: "spring" as const, stiffness: 320, damping: 34, mass: 0.85 };

  const driftA = reduceMotion
    ? undefined
    : {
        y: [0, -10, 0],
        rotate: [-1.2, 0.4, -1.2],
        x: [0, 4, 0],
      };

  const driftB = reduceMotion
    ? undefined
    : {
        y: [0, 12, 0],
        rotate: [1.1, -0.5, 1.1],
        x: [0, -5, 0],
      };

  const transitionA = reduceMotion
    ? undefined
    : { duration: 9, repeat: Infinity, ease: [0.45, 0, 0.55, 1] as const };

  const transitionB = reduceMotion
    ? undefined
    : {
        duration: 11,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1] as const,
        delay: 0.6,
      };

  const innerDrift0 = focus === null || focus === 1 ? driftA : undefined;
  const innerDrift1 = focus === null || focus === 0 ? driftB : undefined;
  const innerTransition0 = focus === null || focus === 1 ? transitionA : undefined;
  const innerTransition1 = focus === null || focus === 0 ? transitionB : undefined;

  const handleCardFocus = (idx: 0 | 1) => {
    setFocus(idx);
  };

  const isLight = tone === "light";
  const headingClass = isLight
    ? "text-structural"
    : "text-white/55";
  const bodyClass = isLight ? "text-[var(--ink-muted)]" : "text-white/70";

  const stackClass =
    fillContainer && focus !== null
      ? "relative mx-auto min-h-[22rem] w-full px-1 py-4 sm:min-h-[26rem] sm:px-3 md:min-h-[30rem] md:py-8"
      : fillContainer
        ? "relative mx-auto min-h-[20rem] w-full px-1 py-4 sm:min-h-[22rem] sm:px-3 md:min-h-[26rem] md:py-6"
        : focus !== null
          ? "relative mx-auto min-h-[min(100vw,32rem)] w-full px-1 py-6 sm:min-h-[min(100vw,36rem)] sm:px-3 md:min-h-[min(100vw,42rem)] md:py-10"
          : "relative mx-auto min-h-[min(100vw,28rem)] w-full px-1 py-6 sm:min-h-[min(100vw,32rem)] sm:px-3 md:min-h-[min(100vw,36rem)] md:py-10";

  return (
    <div
      className={
        fillContainer ? "flex h-full min-h-0 w-full min-w-0 flex-1 flex-col" : "w-full min-w-0"
      }
    >
      <p
        className={`mb-4 shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.26em] md:text-[12px] ${headingClass}`}
      >
        3. The metaphor
      </p>

      <div
        className={
          fillContainer
            ? "mx-auto flex min-h-0 w-full min-w-0 flex-1 flex-col max-w-none"
            : "mx-auto w-full min-w-0 max-w-xl sm:max-w-2xl lg:max-w-3xl"
        }
      >
        <div ref={stackRef} className={stackClass}>
          {/* Back / balanced — upper left */}
          <motion.div
            key={clipKey(METAPHOR_VIDEOS[0])}
            layout
            className={`absolute origin-center ${card0LayoutClass(focus)}`}
            initial={false}
            transition={{ layout: layoutSpring }}
            style={{ willChange: reduceMotion ? undefined : "transform" }}
          >
            <motion.div
              initial={false}
              animate={innerDrift0 ?? { y: 0, x: 0, rotate: 0 }}
              transition={
                innerDrift0
                  ? innerTransition0
                  : reduceMotion
                    ? { duration: 0.15 }
                    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
              }
              style={{ willChange: reduceMotion ? undefined : "transform" }}
            >
              <MetaphorVideoSurface
                clip={METAPHOR_VIDEOS[0]}
                isFocused={focus === 0}
                onFocusRequest={() => handleCardFocus(0)}
                tone={tone}
              />
            </motion.div>
          </motion.div>

          {/* Front / balanced — lower right */}
          <motion.div
            key={clipKey(METAPHOR_VIDEOS[1])}
            layout
            className={`absolute origin-center ${card1LayoutClass(focus)}`}
            initial={false}
            transition={{ layout: layoutSpring }}
            style={{ willChange: reduceMotion ? undefined : "transform" }}
          >
            <motion.div
              initial={false}
              animate={innerDrift1 ?? { y: 0, x: 0, rotate: 0 }}
              transition={
                innerDrift1
                  ? innerTransition1
                  : reduceMotion
                    ? { duration: 0.15 }
                    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
              }
              style={{ willChange: reduceMotion ? undefined : "transform" }}
            >
              <MetaphorVideoSurface
                clip={METAPHOR_VIDEOS[1]}
                isFocused={focus === 1}
                onFocusRequest={() => handleCardFocus(1)}
                tone={tone}
              />
            </motion.div>
          </motion.div>

          {/* Soft glow between layers */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-15 h-[40%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            aria-hidden
          />
        </div>
      </div>

      <p
        className={`mx-auto max-w-xl text-center font-sans text-sm font-light leading-relaxed md:text-[15px] ${bodyClass} ${
          fillContainer ? "mt-auto shrink-0 pt-3" : "mt-5"
        }`}
      >
        Rather than being purely functional, the motion of the system is designed to be expressive and
        choreographic.
      </p>
    </div>
  );
}
