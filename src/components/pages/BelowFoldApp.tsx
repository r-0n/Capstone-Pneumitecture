"use client";

import PavilionReveal from "@/components/pneumitecture/PavilionReveal";
import ParadigmShiftSection from "@/components/pneumitecture/ParadigmShiftSection";
import DesignConcept from "@/components/pneumitecture/DesignConcept";
import DesignProcess from "@/components/pneumitecture/DesignProcess";
import MaterialExploration from "@/components/pneumitecture/MaterialExploration";
import MediaArchive from "@/components/pneumitecture/MediaArchive";
import { SectionBreak } from "@/components/site/SectionBreak";
import { SectionTransition } from "@/components/site/SectionTransition";
import { BehaviorSection } from "@/components/sections/BehaviorSection";
import { PavilionSection } from "@/components/sections/PavilionSection";
import { PrototypingSection } from "@/components/sections/PrototypingSection";
import { SystemSection } from "@/components/sections/SystemSection";

/**
 * Everything below the first pavilion lead block — loaded as a separate JS chunk
 * after the user scrolls near this region (see DeferredBelowFold).
 */
export default function BelowFoldApp() {
  return (
    <>
      <SectionBreak />
      <SectionTransition>
        <ParadigmShiftSection />
      </SectionTransition>
      <SectionBreak />
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
        <PavilionReveal />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <DesignConcept />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <MediaArchive />
      </SectionTransition>
      <SectionBreak />
      <SectionTransition>
        <footer className="border-t border-[var(--hairline)] bg-[var(--canvas-deep)] py-12 text-center text-[11px] text-[var(--ink-muted)]">
          Pneumitecture — portfolio shell aligned to design boards. Replace placeholders with your
          photography & video.
        </footer>
      </SectionTransition>
    </>
  );
}
