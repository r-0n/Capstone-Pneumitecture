type ScrollToSectionOptions = {
  /** Use `smooth` for short hops (e.g. hero → pavilion lead). Default keeps long nav snappy. */
  behavior?: ScrollBehavior;
};

/**
 * Default `auto` keeps long nav jumps responsive. Pass `{ behavior: "smooth" }` for
 * deliberate short transitions (hero handoff into the next block).
 */
export function scrollToSection(id: string, opts?: ScrollToSectionOptions): void {
  const el = document.getElementById(id);
  if (!el) return;
  const behavior = opts?.behavior ?? "auto";
  el.scrollIntoView({ behavior, block: "start", inline: "nearest" });
}
