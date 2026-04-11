"use client";

import { SiteNav } from "@/components/site/SiteNav";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { MaterialSection } from "@/components/sections/MaterialSection";
import { PrototypingSection } from "@/components/sections/PrototypingSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { BehaviorSection } from "@/components/sections/BehaviorSection";
import { PavilionSection } from "@/components/sections/PavilionSection";
import { ContinuationBands } from "@/components/sections/ContinuationBands";

export function HomePage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <Hero />
      <ConceptSection />
      <SystemSection />
      <MaterialSection />
      <PrototypingSection />
      <BehaviorSection />
      <PavilionSection />
      <ContinuationBands />
      <footer className="border-t border-[var(--hairline)] bg-[var(--canvas-deep)] py-12 text-center text-[11px] text-[var(--ink-muted)]">
        Pneumitecture — portfolio shell aligned to design boards. Replace placeholders with your
        photography &amp; video.
      </footer>
    </>
  );
}
