"use client";

/** Short anchor targets so top nav hash links always land somewhere meaningful */
const bands = [
  {
    id: "media",
    title: "Media",
    copy: "Documentation film, exhibition photos, and process reels — slot your assets here.",
  },
  {
    id: "process",
    title: "Process",
    copy: "Sketches, shop tests, and iteration logs — the messy middle that made the wall legible.",
  },
  {
    id: "reflection",
    title: "Reflection",
    copy: "What softness demands from control systems, spectatorship, and maintenance in real rooms.",
  },
  {
    id: "future",
    title: "Future",
    copy: "Active deflation, depth sensing, ML integration — trajectories for the next envelope.",
  },
] as const;

export function ContinuationBands() {
  return (
    <div className="border-t border-[var(--hairline)] bg-[var(--canvas)]">
      {bands.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          className={`scroll-mt-24 border-[var(--hairline)] px-5 py-16 md:px-10 ${i > 0 ? "border-t" : ""}`}
        >
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
              {b.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{b.copy}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
