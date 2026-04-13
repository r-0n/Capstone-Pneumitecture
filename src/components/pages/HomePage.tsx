"use client";

import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SectionBreak } from "@/components/site/SectionBreak";
import { SectionTransition } from "@/components/site/SectionTransition";
import DesignProcess from "@/components/pneumitecture/DesignProcess";
import MaterialExploration from "@/components/pneumitecture/MaterialExploration";
import { PrototypingSection } from "@/components/sections/PrototypingSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { BehaviorSection } from "@/components/sections/BehaviorSection";
import { PavilionSection } from "@/components/sections/PavilionSection";
import MediaArchive from "../pneumitecture/MediaArchive";

export function HomePage() {
  return (
    <>
      <ScrollProgress />
      <SectionTransition>
        <DesignProcess />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <SystemSection />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <MaterialExploration />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <PrototypingSection />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <BehaviorSection />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <PavilionSection />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <MediaArchive />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <footer className="border-t border-[var(--hairline)] bg-[var(--canvas-deep)] py-12 text-center text-[11px] text-[var(--ink-muted)]">
          Pneumitecture — portfolio shell aligned to design boards. Replace placeholders with your
          photography &amp; video.
        </footer>
      </SectionTransition>
    </>
  );
}
