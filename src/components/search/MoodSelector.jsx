import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import { MOODS } from '../../api/moodMapping';
import clsx from 'clsx';

const MoodSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mood, setMood } = useSearchStore();

  const selectedMood = MOODS.find(m => m.id === mood);

  return (
    <div className="relative z-30 w-full md:w-64">
      <label className="block text-sm font-medium text-slate-400 mb-2">How are you feeling?</label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 glass-panel px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Sparkles size={18} className={selectedMood ? "text-amber-400" : "text-slate-400"} />
          <span className={clsx("truncate", selectedMood ? "text-white font-medium" : "text-slate-300")}>
            {selectedMood ? selectedMood.label : "Select a mood..."}
          </span>
        </span>
        <ChevronDown size={18} className={clsx("text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 glass-panel rounded-xl max-h-64 overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-1">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMood(m.id);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 hover:bg-slate-700",
                    mood === m.id ? "bg-slate-700 text-white font-medium" : "text-slate-300"
                  )}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${m.color}`} />
                  {m.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodSelector;
