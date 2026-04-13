"use client";

import BubbleBackground from "@/components/pneumitecture/BubbleBackground";
import NavOverlay from "@/components/pneumitecture/NavOverlay";
import HeroSection from "@/components/pneumitecture/HeroSection";
import PavilionLeadSection from "@/components/pneumitecture/PavilionLeadSection";
import PavilionReveal from "@/components/pneumitecture/PavilionReveal";
import DesignConcept from "../components/pneumitecture/DesignConcept";
import { SectionBreak } from "@/components/site/SectionBreak";
import { SectionTransition } from "@/components/site/SectionTransition";
import { HomePage } from "@/components/pages/HomePage";

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#FBFBF9" }}
    >
      <BubbleBackground />
      <div className="relative z-10">
        <NavOverlay />
        <HeroSection />
        <SectionBreak />
        <SectionTransition>
          <PavilionLeadSection />
        </SectionTransition>
        <SectionBreak />
        <SectionTransition>
          <PavilionReveal />
        </SectionTransition>
        <SectionBreak />
        <SectionTransition>
          <DesignConcept />
        </SectionTransition>
        <main className="flex flex-1 flex-col">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
