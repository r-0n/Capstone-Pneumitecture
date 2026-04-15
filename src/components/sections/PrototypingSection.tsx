"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { publicAssetPath } from "@/lib/publicAssetPath";
import { motion } from "framer-motion";
import Image from "next/image";

type PrototypeMediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      label?: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
      label?: string;
    }

type PrototypeVersion = {
  id: string;
  phase: string;
  title: string;
  copy: string;
  media: PrototypeMediaItem[];
};

type RoadmapItem = {
  key: string;
  versionId: string;
  phase: string;
  title: string;
  copy: string;
  media: PrototypeMediaItem;
};

const versions: PrototypeVersion[] = [
  {
    id: "V1",
    phase: "Origin",
    title: "First ideation attempt",
    copy: "Our very first prototype concept study.",
    media: [
      {
        type: "image",
        src: publicAssetPath("/images/prototyping/prototype-v1.png"),
        alt: "V1 first ideation prototype concept image",
        label: "Concept sketch prototype",
      },
    ],
  },
  {
    id: "V2",
    phase: "Exploration",
    title: "ProtoEllipse Model",
    copy: "Second prototypical exploration of the concept.",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1v7CAfBKotMHACjqYL1g7JzN3Co_-_Hpr/preview",
        title: "V2 prototypical exploration video",
        label: "Modular response test",
      },
    ],
  },
  {
    id: "V3",
    phase: "Maturation",
    title: "Hexagonal Breathing Grid",
    copy: "Transparent cellular module with refined logic — exhibition-ready responsiveness.",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1S9HCrs4D9AX2rWAZKvv_8I3tH-EtQGu1/preview",
        title: "V3 hexagonal breathing grid video",
        label: "Hexagonal breathing test",
      },
    ],
  },
  {
    id: "V4",
    phase: "Scale",
    title: "Scaling Up",
    copy: "Transitioning the prototype logic toward larger spatial deployment.",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1ZnFgcApK-7O6e3EUslGnDBkalMxwu1Ht/preview",
        title: "V4 scaling up video",
        label: "Scaling up study",
      },
    ],
  },
  {
    id: "V5",
    phase: "Simulation",
    title: "Rhino+Grasshopper Physics Prototyping",
    copy: "The war forced us to branch into digital simulation, which let us test and push the capstone idea to further limits.",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1yEIp8EeoqVb-49s7lg82Hja2zv9A0w9R/preview",
        title: "V5 Rhino Grasshopper physics prototyping video",
        label: "Digital physics simulation study",
      },
    ],
  },
];

export function PrototypingSection() {
  const items: RoadmapItem[] = versions.flatMap((v) =>
    v.media.length > 0
      ? v.media.map((media, idx) => ({
          key: `${v.id}-${idx}`,
          versionId: v.id,
          phase: v.phase,
          title: v.title,
          copy: v.copy,
          media,
        }))
      : [
          {
            key: `${v.id}-placeholder`,
            versionId: v.id,
            phase: v.phase,
            title: v.title,
            copy: v.copy,
            media: {
              type: "image",
              src: publicAssetPath("/images/pillow-bg.jpeg"),
              alt: `${v.id} placeholder`,
              label: "Awaiting media",
            },
          },
        ],
  );

  return (
    <section
      id="prototyping"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[var(--canvas)] py-24 md:py-32"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionLabel number="07" text="Prototyping" />
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Prototyping
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Prototype Iterations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)]">
            Prototype progression shown as a clean visual process set.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item, idx) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="glass-card overflow-hidden rounded-2xl p-3"
            >
              <div className="relative min-h-[240px] overflow-hidden rounded-xl border border-[var(--hairline)] bg-slate-100 md:min-h-[260px]">
                {item.media.type === "video" ? (
                  <iframe
                    src={item.media.src}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={item.media.title}
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    fill
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 32vw, 95vw"
                  />
                )}
              </div>
              <div className="mt-2.5 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                  {item.versionId} · {item.phase}
                </p>
                <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                {item.copy ? <p className="text-xs text-[var(--ink-muted)]">{item.copy}</p> : null}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-16 text-center text-sm font-medium text-[var(--ink-muted)]">
          <a href="#system" className="inline-flex items-center gap-2 hover:text-[var(--ink)]">
            Go to System Design
            <span aria-hidden className="text-[var(--accent-soft)]">
              ✦
            </span>
          </a>
        </p>
      </div>
    </section>
  );
}
