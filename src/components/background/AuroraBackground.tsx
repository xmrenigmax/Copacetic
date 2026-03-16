'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none bg-black">
      <motion.div animate={{ scale: [ 1, 1.2, 1 ], opacity: [ 0.3, 0.5, 0.3 ], x: [ 0, 100, 0 ], y: [ 0, -50, 0 ] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/40 blur-[120px]" />
      <motion.div animate={{ scale: [ 1, 1.5, 1 ], opacity: [ 0.2, 0.4, 0.2 ], x: [ 0, -100, 0 ], y: [ 0, 100, 0 ] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/30 blur-[150px]" />
      <motion.div animate={{ scale: [ 1, 1.3, 1 ], opacity: [ 0.2, 0.5, 0.2 ], x: [ 0, 50, 0 ], y: [ 0, 50, 0 ] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-teal-900/20 blur-[100px]" />
    </div>
  );
};