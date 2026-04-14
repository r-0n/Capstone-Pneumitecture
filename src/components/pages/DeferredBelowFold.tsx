"use client";

import dynamic from "next/dynamic";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";

const BelowFoldApp = dynamic(() => import("@/components/pages/BelowFoldApp"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[min(72vh,820px)] bg-[#FBFBF9]"
      aria-busy="true"
      aria-label="Loading rest of page"
    />
  ),
});

export function DeferredBelowFold() {
  const { placeholderRef, visible } = useDeferredVisible();

  if (!visible) {
    return (
      <div
        ref={placeholderRef}
        className="min-h-[min(100vh,960px)] bg-[#FBFBF9]"
        aria-hidden
      />
    );
  }

  return <BelowFoldApp />;
}
