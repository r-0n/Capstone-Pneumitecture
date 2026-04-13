/**
 * Ambient orbs — pure CSS keyframes (no Framer loop on scroll thread).
 */
const bubbles = [
  { size: 600, x: '5%', y: '8%', delay: 0, duration: 18 },
  { size: 400, x: '75%', y: '3%', delay: 3, duration: 22 },
  { size: 300, x: '40%', y: '15%', delay: 6, duration: 16 },
  { size: 500, x: '85%', y: '30%', delay: 1, duration: 24 },
  { size: 250, x: '20%', y: '40%', delay: 8, duration: 20 },
  { size: 450, x: '60%', y: '50%', delay: 4, duration: 19 },
  { size: 350, x: '10%', y: '65%', delay: 7, duration: 21 },
  { size: 280, x: '50%', y: '75%', delay: 2, duration: 17 },
  { size: 520, x: '80%', y: '70%', delay: 5, duration: 23 },
  { size: 200, x: '30%', y: '88%', delay: 9, duration: 15 },
];

export default function BubbleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FBFBF9]">
      <style>{`
        @keyframes bubble-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(14px, -22px, 0) scale(1.035); }
        }
      `}</style>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background:
              'radial-gradient(circle at 35% 35%, rgba(225,229,232,0.18), rgba(225,229,232,0.04))',
            border: '0.5px solid rgba(112,112,112,0.06)',
            animationName: 'bubble-drift',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
    </div>
  );
}
