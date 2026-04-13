"use client";

/**
 * Hard boundary between narrative blocks — high contrast so it never “disappears”
 * into the page background (#FBFBF9).
 */
export function SectionBreak() {
  return (
    <div
      aria-hidden
      className="relative left-1/2 z-20 w-screen -translate-x-1/2 border-y border-slate-400/25 bg-[#cfd8e8] py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_28px_rgba(15,23,42,0.06)]"
    >
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-6">
        <span className="h-px min-h-px flex-1 rounded-full bg-slate-500/35" />
        <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-soft)] shadow-[0_0_0_3px_rgba(107,140,255,0.2)]" />
        <span className="h-px min-h-px flex-1 rounded-full bg-slate-500/35" />
      </div>
    </div>
  );
}
