import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatImage from './FloatImage';

export default function ConceptCard({ title, description, index, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 md:p-10 cursor-default transition-colors duration-500 hover:bg-aero/30"
      style={{ border: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* Card image */}
      {image && (
        <div className="w-full h-40 overflow-hidden mb-6">
          <FloatImage
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            amplitude={10}
            duration={6 + index * 1.5}
            delay={index * 0.8}
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <span className="tech-label text-structural">0{index + 1}</span>
        <motion.div
          animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
          className="w-2 h-2 rounded-full bg-obsidian"
        />
      </div>

      <h3 className="font-display font-extralight text-2xl md:text-3xl text-foreground mb-4 tracking-tight">
        {title}
      </h3>

      <motion.div
        initial={false}
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="font-display font-light text-structural text-sm leading-relaxed pt-2">
          {description}
        </p>
      </motion.div>

      <div className="hairline mt-6 group-hover:bg-obsidian/20 transition-colors duration-500" />
    </motion.div>
  );
}
