import React from 'react';
import { motion } from 'framer-motion';
import { Film, Tv } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import clsx from 'clsx';

const TypeToggle = () => {
  const { contentType, setContentType } = useSearchStore();

  const options = [
    { id: 'movie', label: 'Movies', icon: Film },
    { id: 'tv', label: 'Web Series', icon: Tv },
  ];

  return (
    <div className="flex w-full max-w-sm bg-slate-800/80 p-1 rounded-full border border-slate-700/50 backdrop-blur-sm sm:w-fit mx-auto mb-6 sm:mb-8 relative">
      {options.map((opt) => {
        const isSelected = contentType === opt.id;
        const Icon = opt.icon;
        
        return (
          <button
            key={opt.id}
            onClick={() => setContentType(opt.id)}
            className={clsx(
              "relative flex-1 sm:flex-none justify-center px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-colors z-10 flex items-center gap-2",
              isSelected ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="type-pill"
                className="absolute inset-0 bg-slate-600 rounded-full z-[-1] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={18} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default TypeToggle;
