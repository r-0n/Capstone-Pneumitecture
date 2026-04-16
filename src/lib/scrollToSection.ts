type ScrollToSectionOptions = {
  /** Default is `smooth`. Pass `{ behavior: "auto" }` for an instant jump. */
  behavior?: ScrollBehavior;
};

/**
 * Smooth scroll to a section by id (nav, progress rail, hero CTA). Root `html` stays
 * `scroll-behavior: auto` so the mouse wheel feels normal; this API supplies smooth jumps.
 * Respects `prefers-reduced-motion: reduce` by using instant scroll when smooth was requested.
 */
export function scrollToSection(id: string, opts?: ScrollToSectionOptions): void {
  const el = document.getElementById(id);
  if (!el) return;
  const requested = opts?.behavior ?? "smooth";
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior =
    prefersReduced && requested === "smooth" ? "auto" : requested;
  el.scrollIntoView({ behavior, block: "start", inline: "nearest" });
}
