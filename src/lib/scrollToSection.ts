/**
 * Instant jumps feel responsive on long pages; motion design carries “transition”
 * (hero wash, SectionTransition). Avoid native smooth here — it stacks with browser
 * smoothing and feels laggy over large scroll distances.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
}
