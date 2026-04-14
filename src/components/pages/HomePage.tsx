"use client";

import { ScrollProgress } from "@/components/site/ScrollProgress";
import { DeferredBelowFold } from "@/components/pages/DeferredBelowFold";

export function HomePage() {
  return (
    <>
      <ScrollProgress />
      <DeferredBelowFold />
    </>
  );
}
