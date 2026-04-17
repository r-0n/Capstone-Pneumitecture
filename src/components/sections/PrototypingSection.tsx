"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { YouTubeForceMutedPlayer } from "@/components/pneumitecture/paradigm-shift/YouTubeForceMutedPlayer";
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
      playbackRate?: number;
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

function parseYouTubeVideoId(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.slice(1) || null;
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2] || null;
      }
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || null;
      }
      return url.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

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
        src: "https://youtube.com/shorts/wMBQTvkn0lQ",
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
        src: "https://youtube.com/shorts/lR4QNp3BsmE",
        title: "V4 scaling up video",
        label: "Scaling up study",
        playbackRate: 2,
      },
    ],
  },
  {
    id: "V5",
    phase: "Simulation",
    title: "Rhino+Grasshopper Physics Prototyping",
    copy: "As regional conditions escalated in March, the development of Pneumitecture transitioned toward digital prototyping. By simulating the system computationally, we were able to investigate the behavior of the pneumatic architecture without relying solely on physical fabrication. Using Rhinoceros and Grasshopper, we implemented physics-based simulations that approximated the real-world behavior of the pneumatic cells, allowing us to study how inflation, deformation, and spatial interactions might occur in a full-scale system. This shift not only enabled us to model the system’s dynamics but also opened a broader creative space to explore its physical limits, emergent behaviors, and choreographic potential.",
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
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionLabel number="07" text="Prototyping" textFirst />
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

        {/* Alternating timeline layout */}
        <div className="relative mt-16">
          {/* Vertical spine line (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--hairline)] md:block" />

          <div className="space-y-0">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const shouldMute =
                item.versionId === "V2" || item.versionId === "V3" || item.versionId === "V4";
              const youtubeVideoId = item.media.type === "video" ? parseYouTubeVideoId(item.media.src) : null;

              return (
                <motion.article
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative grid grid-cols-1 items-center md:grid-cols-2 md:gap-10 lg:gap-16 ${
                    idx < items.length - 1 ? "border-b border-[var(--hairline)]/70" : ""
                  } py-10 md:py-16`}
                >
                  {/* Central version marker (desktop) */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--canvas)] md:flex">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink-muted)]">
                      {item.versionId}
                    </span>
                  </div>

                  {/* Media block */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-slate-100 shadow-sm ${
                      isEven ? "md:order-1" : "md:order-2"
                    } aspect-video md:aspect-[4/3]`}
                  >
                    {item.media.type === "video" && youtubeVideoId && shouldMute ? (
                      <YouTubeForceMutedPlayer
                        videoId={youtubeVideoId}
                        title={item.media.title}
                        playbackRate={item.media.playbackRate ?? 1}
                      />
                    ) : item.media.type === "video" ? (
                      <iframe
                        src={item.media.src}
                        className="h-full w-full border-0"
                        loading="lazy"
                        allow={
                          shouldMute
                            ? "autoplay; encrypted-media"
                            : "autoplay; encrypted-media; picture-in-picture"
                        }
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={item.media.title}
                        allowFullScreen
                        ref={(node) => {
                          if (node && shouldMute) {
                            (node as HTMLIFrameElement & { muted?: boolean }).muted = true;
                          }
                        }}
                      />
                    ) : (
                      <Image
                        src={item.media.src}
                        alt={item.media.alt}
                        fill
                        className="h-full w-full object-cover"
                        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 42vw, 95vw"
                      />
                    )}
                  </div>

                  {/* Text block */}
                  <div
                    className={`flex flex-col justify-center py-10 md:py-14 ${
                      isEven ? "md:order-2 md:pl-10 lg:pl-16" : "md:order-1 md:pr-10 lg:pr-16"
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-4">
                      {/* Mobile version badge */}
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--hairline-strong)] font-mono text-[10px] tracking-[0.18em] text-[var(--ink-muted)] md:hidden">
                        {item.versionId}
                      </span>
                      <span className="tech-label text-[var(--ink-muted)]/80">{item.phase}</span>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                      {item.versionId}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[var(--ink)] md:text-xl">
                      {item.title}
                    </p>
                    {item.copy ? (
                      <p className="mt-3 max-w-sm text-sm text-[var(--ink-muted)] leading-relaxed">
                        {item.copy}
                      </p>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
