"use client";

/** Soft separator between narrative blocks for a seamless scroll rhythm. */
export function SectionBreak() {
  return (
    <div
      aria-hidden
      className="relative left-1/2 z-10 w-screen -translate-x-1/2 border-y border-slate-300/25 bg-linear-to-b from-[#eef2f8] via-[#e9eef6] to-[#eef2f8] py-5"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-6">
        <span className="h-px min-h-px flex-1 rounded-full bg-slate-400/25" />
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]/80 shadow-[0_0_0_2px_rgba(107,140,255,0.15)]" />
        <span className="h-px min-h-px flex-1 rounded-full bg-slate-400/25" />
      </div>
    </div>
  );
}
