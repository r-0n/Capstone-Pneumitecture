"use client";

import BubbleBackground from "@/components/pneumitecture/BubbleBackground";
import NavOverlay from "@/components/pneumitecture/NavOverlay";
import HeroSection from "@/components/pneumitecture/HeroSection";
import PavilionLeadSection from "@/components/pneumitecture/PavilionLeadSection";
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
        {/* Pulls up under the hero wash so scroll from home → body reads as one soft blend */}
        <div
          aria-hidden
          className="pointer-events-none relative z-[8] -mt-32 h-32 bg-gradient-to-b from-transparent via-[#FBFBF9]/65 to-[#FBFBF9] md:-mt-44 md:h-44"
        />
        <SectionBreak />
        <SectionTransition>
          <PavilionLeadSection />
        </SectionTransition>
        <main className="flex flex-1 flex-col">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
