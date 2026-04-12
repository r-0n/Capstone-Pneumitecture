"use client";

import BubbleBackground from "@/components/pneumitecture/BubbleBackground";
import NavOverlay from "@/components/pneumitecture/NavOverlay";
import SectionFade from "@/components/pneumitecture/SectionFade";
import HeroSection from "@/components/pneumitecture/HeroSection";
import PavilionReveal from "@/components/pneumitecture/PavilionReveal";
import { HomePage } from "@/components/pages/HomePage";

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "#FBFBF9" }}>
      <BubbleBackground />
      <div className="relative z-10">
        <NavOverlay />
        <HeroSection />
        <SectionFade fromColor="#121212" toColor="#FBFBF9" height={160} />
        <PavilionReveal />
        <main className="flex flex-1 flex-col">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
