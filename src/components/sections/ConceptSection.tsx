"use client";

import Image from "next/image";
import { publicAssetPath } from "@/lib/publicAssetPath";

const pillars = [
  {
    title: "Softness",
    copy:
      "Softness is explored as a spatial condition rather than a material quality. It enables architecture to move away from rigidity and towards adaptability, where form can deform, respond, and continuously shift in relation to external forces.",
    image: publicAssetPath(
      "/images/" +
        encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (2).png"),
    ),
  },
  {
    title: "Inflatables",
    copy:
      "Inflatables introduce a lightweight system of spatial transformation driven by air. Their ability to expand and collapse allows architecture to exist in a state of constant change, challenging permanence and static form.",
    image: publicAssetPath(
      "/images/" +
        encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (1).png"),
    ),
  },
  {
    title: "Pneumatics",
    copy:
      "Pneumatics act as the driving mechanism behind the system, translating air pressure into controlled movement. This enables responsive behavior, where structural form becomes directly linked to environmental and human interaction.",
    image: publicAssetPath("/images/pneumatics.PNG"),
  },
];

function CardImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--paper)] shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-[border-color] duration-400 ease-[ease] group-hover:border-transparent">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority}
      />
    </div>
  );
}

export function ConceptSection() {
  return (
    <section
      id="concept"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[var(--canvas)] py-24 md:py-32"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Conceptual Foundations
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
            A responsive pneumatic pavilion defined by softness, movement, and interaction
          </p>
        </header>

        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="group glass-card flex flex-col rounded-2xl border !border-transparent p-8 md:p-10 transition-[border-color] duration-400 ease-[ease] group-hover:!border-[var(--glass-border)]"
            >
              <CardImage src={p.image} alt={p.title} priority={i === 0} />
              <h3 className="font-display mt-10 text-center text-xl font-semibold text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="mt-4 translate-y-2 text-center text-sm leading-relaxed text-[var(--ink-muted)] opacity-0 transition-[opacity,transform] duration-400 ease-[ease] group-hover:translate-y-0 group-hover:opacity-100">
                {p.copy}
              </p>
              <p className="mt-8 translate-y-2 border-t border-[var(--hairline)] pt-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)] opacity-0 transition-[opacity,transform] duration-400 ease-[ease] group-hover:translate-y-0 group-hover:opacity-100">
                Adaptive &amp; Air Controlled
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
