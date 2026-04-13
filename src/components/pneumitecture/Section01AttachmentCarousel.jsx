"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/images/section01/attachment-01.png",
    alt: "Attachment prototype: pneumatic TPU cells in a modular grid within a frame",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/section01/attachment-02.png",
    alt: "Attachment prototype: kinetic pneumatic surface and studio lighting",
    width: 800,
    height: 600,
  },
  {
    src: "/images/section01/attachment-03.png",
    alt: "Attachment prototype: vertical pneumatic columns and actuation study",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/section01/attachment-04.png",
    alt: "Attachment prototype: installation with scale reference",
    width: 800,
    height: 600,
  },
  {
    src: "/images/section01/attachment-05.png",
    alt: "Attachment prototype: distributed pneumatic cells render study",
    width: 1024,
    height: 768,
  },
];

const INTERVAL_MS = 5000;

export default function Section01AttachmentCarousel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const slide = SLIDES[index];

  return (
    <div className="mt-14 border-t border-neutral-200 pt-12 md:mt-16 md:pt-14">
      <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        Attachment — render sequence
      </p>
      <figure className="flex flex-col items-center gap-6">
        <div className="flex w-full justify-center">
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            className="h-auto max-h-[min(78vh,900px)] w-auto max-w-full object-contain"
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority={index === 0}
          />
        </div>
        <figcaption className="sr-only">
          Slide {index + 1} of {SLIDES.length}. Advances automatically every few seconds.
        </figcaption>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Carousel position"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-black" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </figure>
    </div>
  );
}
