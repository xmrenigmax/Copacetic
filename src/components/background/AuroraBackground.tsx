'use client';

import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  theme: string;
}

export const AuroraBackground = ({ theme }: AuroraBackgroundProps) => {
  const themes: Record<string, string[]> = {
    midnight: [ 'bg-blue-900/40', 'bg-purple-900/30', 'bg-teal-900/20' ],
    crimson: [ 'bg-red-900/40', 'bg-rose-900/30', 'bg-orange-900/20' ],
    forest: [ 'bg-green-900/40', 'bg-emerald-900/30', 'bg-teal-900/20' ],
    monochrome: [ 'bg-gray-600/30', 'bg-gray-500/20', 'bg-gray-800/40' ]
  };

  const [
    color1,
    color2,
    color3
  ] = themes[theme] || themes.midnight;

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none bg-black">
      <motion.div animate={{ scale: [ 1, 1.2, 1 ], opacity: [ 0.3, 0.5, 0.3 ], x: [ 0, 100, 0 ], y: [ 0, -50, 0 ] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${color1}`} />
      <motion.div animate={{ scale: [ 1, 1.5, 1 ], opacity: [ 0.2, 0.4, 0.2 ], x: [ 0, -100, 0 ], y: [ 0, 100, 0 ] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] ${color2}`} />
      <motion.div animate={{ scale: [ 1, 1.3, 1 ], opacity: [ 0.2, 0.5, 0.2 ], x: [ 0, 50, 0 ], y: [ 0, 50, 0 ] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] ${color3}`} />
    </div>
  );
};
