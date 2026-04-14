type ScrollToSectionOptions = {
  /** Use `smooth` for short in-page hops (e.g. hero → next section). */
  behavior?: ScrollBehavior;
};

/**
 * Default `auto` keeps long nav jumps snappy. Pass `{ behavior: "smooth" }` for
 * deliberate short transitions (hero handoff).
 */
function scrollAncestorToElement(
  scrollRoot: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior,
): void {
  const rootRect = scrollRoot.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const delta = targetRect.top - rootRect.top + scrollRoot.scrollTop;
  scrollRoot.scrollTo({ top: Math.max(0, delta), behavior });
}

export function scrollToSection(id: string, opts?: ScrollToSectionOptions): void {
  const el = document.getElementById(id);
  if (!el) return;
  const behavior = opts?.behavior ?? "auto";

  el.scrollIntoView({ behavior, block: "start", inline: "nearest" });

  /**
   * If a parent became the scrollport (e.g. `overflow-x: hidden` on a tall wrapper),
   * the window may not move while the target stays off-screen. Nudge scrollable ancestors.
   */
  requestAnimationFrame(() => {
    const top = el.getBoundingClientRect().top;
    const winY = window.scrollY || document.documentElement.scrollTop || 0;
    if (top < window.innerHeight * 0.75 && top > -80) return;
    if (winY > 4 && top < window.innerHeight) return;

    let p: HTMLElement | null = el.parentElement;
    while (p) {
      const s = getComputedStyle(p);
      const oy = s.overflowY;
      if (
        (oy === "auto" || oy === "scroll") &&
        p.scrollHeight > p.clientHeight + 2
      ) {
        scrollAncestorToElement(p, el, behavior);
        break;
      }
      p = p.parentElement;
    }
  });
}
