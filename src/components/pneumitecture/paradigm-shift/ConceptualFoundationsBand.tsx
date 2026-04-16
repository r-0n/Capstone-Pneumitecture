import ConceptCard from "@/components/pneumitecture/ConceptCard";
import { publicAssetPath } from "@/lib/publicAssetPath";

const SOFT_IMG = publicAssetPath(
  "/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (2).png"),
);
const INFLATE_IMG = publicAssetPath(
  "/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (1).png"),
);
const PNEUMA_IMG = publicAssetPath("/images/pneumatics.PNG");

const CARDS = [
  {
    title: "Softness",
    image: SOFT_IMG,
    description:
      "Softness is explored as a spatial condition rather than a material quality. It enables architecture to move away from rigidity and towards adaptability, where form can deform, respond, and continuously shift in relation to external forces.",
  },
  {
    title: "Inflatables",
    image: INFLATE_IMG,
    description:
      "Inflatables introduce a lightweight system of spatial transformation driven by air. Their ability to expand and collapse allows architecture to exist in a state of constant change, challenging permanence and static form.",
  },
  {
    title: "Pneumatics",
    image: PNEUMA_IMG,
    description:
      "Pneumatics act as the driving mechanism behind the system, translating air pressure into controlled movement. This enables responsive behavior, where structural form becomes directly linked to environmental and human interaction.",
  },
] as const;

/** Light band after the Paradigm section — three conceptual pillars. */
export function ConceptualFoundationsBand() {
  return (
    <div className="relative border-t border-[var(--hairline)] bg-[#f3f3f5] text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(20,22,26,0.04) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1580px] px-5 py-14 sm:px-8 md:px-12 md:py-16 lg:px-14 lg:py-20">
        <p className="mb-2 font-sans text-[9px] font-semibold uppercase tracking-[0.32em] text-structural">
          Conceptual foundations
        </p>
        <h2 className="mb-10 max-w-2xl font-display text-2xl font-extralight tracking-tight text-foreground md:text-3xl">
          Three registers that ground the thesis
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map((card, i) => (
            <ConceptCard key={card.title} {...card} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
