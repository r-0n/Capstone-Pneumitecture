import { motion } from 'framer-motion';

export default function FloatImage({ src, alt, className = '', amplitude = 18, duration = 7, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0], x: [0, amplitude * 0.3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="w-full h-full"
    >
      <img src={src} alt={alt} className={className} />
    </motion.div>
  );
}
