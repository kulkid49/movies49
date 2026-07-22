import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="w-full aspect-[2/3] rounded-xl bg-slate-800/80 overflow-hidden relative shadow-lg">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent skew-x-12 translate-x-[-150%]"
        animate={{
          translateX: ['-150%', '150%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default SkeletonCard;
