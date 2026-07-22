import React from 'react';
import { motion } from 'framer-motion';
import { useSearchStore } from '../../store/useSearchStore';
import { MOODS } from '../../api/moodMapping';

const AnimatedBackground = () => {
  const { mood } = useSearchStore();
  
  // Find the selected mood color, default to a neutral dark gradient
  const selectedMood = MOODS.find(m => m.id === mood);
  const bgClass = selectedMood ? selectedMood.color : 'from-slate-900 to-slate-800';

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-900">
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${bgClass} opacity-30`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full bg-rose-500/10 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-2/3 h-2/3 rounded-full bg-blue-500/10 blur-[150px]"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
