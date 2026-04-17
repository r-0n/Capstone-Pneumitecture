"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { publicAssetPath } from "@/lib/publicAssetPath";

const CONCEPT_VIDEO_YOUTUBE_ID = "fMwz87q0dC8";

const GALLERY_ITEMS = [
  {
    type: "image" as const,
    src: publicAssetPath("/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (1).png")),
    alt: "Soft white pillow-like pneumatic study",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/" + encodeURIComponent("Gemini_Generated_Image_5wyv915wyv915wyv (2).png")),
    alt: "Translucent bubble cluster concept",
  },
  {
    type: "image" as const,
    src: publicAssetPath("/images/hex-pouch-prototype.png"),
    alt: "Translucent hexagonal heat-sealed pouch with air tube on a wood tabletop",
  },
  {
    type: "video" as const,
    youtubeId: CONCEPT_VIDEO_YOUTUBE_ID,
    title: "Design concept video",
  },
] as const;

function youtubeEmbedSrc(id: string) {
  const q = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube.com/embed/${id}?${q.toString()}`;
}

/** Matches `FloatImage`: soft vertical drift with a slight horizontal sway. */
const floatMotion = {
  animate: { y: [0, -16, 0], x: [0, 4.8, 0] },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function DesignConceptFloatGallery() {
  return (
    <div
      className="relative h-full min-h-[min(52vh,22rem)] w-full flex-1 md:min-h-0"
      aria-label="Design concept studies"
    >
      <div className="grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-3 content-center sm:gap-4 md:gap-5">
        {GALLERY_ITEMS.map((item, i) => {
          const delay = i * 0.2;
          const tileClass =
            "relative aspect-[10/11] w-full min-h-0 overflow-hidden rounded-xl bg-[var(--paper)]/95 shadow-sm";

          if (item.type === "image") {
            return (
              <motion.div
                key={item.src}
                className={tileClass}
                {...floatMotion}
                transition={{ ...floatMotion.transition, delay }}
              >
                <span className="relative block h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 45vw, 280px"
                    draggable={false}
                  />
                </span>
              </motion.div>
            );
          }

          const embedSrc = youtubeEmbedSrc(item.youtubeId);
          return (
            <motion.div
              key={item.youtubeId}
              className={tileClass}
              {...floatMotion}
              transition={{ ...floatMotion.transition, delay }}
            >
              <span className="relative block h-full w-full">
                <iframe
                  title={item.title}
                  src={embedSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
