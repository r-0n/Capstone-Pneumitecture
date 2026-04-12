"use client";

/**
 * Static hero photo (`/images/backg.PNG` via `.hero-bg` in globals) with layered
 * sheen, light, and grain — no mouse tracking.
 */
export function ReferencePillowBackground() {
  return (
    <div
      className="hero-pillow-stack pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="hero-bg-outer">
        <div className="hero-bg" />
      </div>
      <div className="hero-light" />
      <div className="hero-sheen" />
      <div className="hero-noise" />
    </div>
  );
}
