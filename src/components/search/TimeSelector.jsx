import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import { TIME_OPTIONS } from '../../api/moodMapping';
import clsx from 'clsx';

const TimeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { timeAvailable, setTimeAvailable, contentType } = useSearchStore();

  const selectedTime = TIME_OPTIONS.find(t => t.id === timeAvailable);
  
  // Filter options based on content type (movies vs tv)
  const validOptions = TIME_OPTIONS.filter(t => t.type === 'any' || t.type === contentType || (contentType === 'movie' && t.type.includes('movie')));

  // If content type changed and selected time is no longer valid, reset it
  React.useEffect(() => {
    if (timeAvailable && !validOptions.find(t => t.id === timeAvailable)) {
      setTimeAvailable('');
    }
  }, [contentType, timeAvailable, setTimeAvailable, validOptions]);

  return (
    <div className="relative z-20 w-full md:w-64">
      <label className="block text-sm font-medium text-slate-400 mb-2">How much time do you have?</label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 glass-panel px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Clock size={18} className={selectedTime ? "text-sky-400" : "text-slate-400"} />
          <span className={clsx("truncate", selectedTime ? "text-white font-medium" : "text-slate-300")}>
            {selectedTime ? selectedTime.label : "Any time amount..."}
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
            className="absolute top-full left-0 right-0 mt-2 p-2 glass-panel rounded-xl"
          >
            <div className="grid grid-cols-1 gap-1">
              <button
                 onClick={() => { setTimeAvailable(''); setIsOpen(false); }}
                 className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700"
              >
                Any amount
              </button>
              {validOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTimeAvailable(t.id);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                    timeAvailable === t.id ? "bg-slate-700 text-white font-medium" : "text-slate-300 hover:bg-slate-700"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSelector;
