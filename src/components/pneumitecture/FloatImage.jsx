"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/** Intrinsic aspect for layout; `className` controls responsive sizing (e.g. `h-full` in fixed-height cards). */
const W = 1600;
const H = 1067;

export default function FloatImage({ src, alt, className = "", amplitude = 18, duration = 7, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0], x: [0, amplitude * 0.3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className="w-full"
    >
      <Image src={src} alt={alt} width={W} height={H} sizes="(max-width: 768px) 100vw, 800px" className={className} />
    </motion.div>
  );
}
