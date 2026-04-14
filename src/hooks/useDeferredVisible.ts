"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
  /** Start loading before the sentinel enters the viewport (vertical). */
  rootMargin?: string;
  /** Always mount after this delay so content never stays blank forever. */
  fallbackMs?: number;
};

export function useDeferredVisible(
  options: Options = {},
): { placeholderRef: RefObject<HTMLDivElement | null>; visible: boolean } {
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { rootMargin = "380px 0px 240px 0px", fallbackMs = 8000 } = options;

  useEffect(() => {
    if (visible) return;
    const el = placeholderRef.current;
    const show = () => setVisible(true);
    const t = window.setTimeout(show, fallbackMs);

    if (!el || typeof IntersectionObserver === "undefined") {
      return () => window.clearTimeout(t);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          window.clearTimeout(t);
          show();
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );
    io.observe(el);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [visible, rootMargin, fallbackMs]);

  return { placeholderRef, visible };
}
