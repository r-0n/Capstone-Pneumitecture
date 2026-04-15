"use client";

import dynamic from "next/dynamic";

/**
 * Code-splits below-the-fold sections without waiting for scroll.
 * (Scroll-based deferral hid Design Process / Material Exploration from authors until deep scroll or ~8s.)
 */
const BelowFoldApp = dynamic(() => import("@/components/pages/BelowFoldApp"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[min(48vh,560px)] bg-[#FBFBF9]"
      aria-busy="true"
      aria-label="Loading rest of page"
    />
  ),
});

export function DeferredBelowFold() {
  return <BelowFoldApp />;
}
