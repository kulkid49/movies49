import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import { LANGUAGES } from '../../api/moodMapping';
import clsx from 'clsx';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { language, setLanguage } = useSearchStore();

  const selectedLanguage = LANGUAGES.find(l => l.code === language);
  
  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={clsx("relative w-full md:w-64", isOpen ? "z-40" : "z-20")}>
      <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Language</label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 glass-panel px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Globe size={18} className="text-slate-400" />
          <span className="truncate text-white font-medium">
            {selectedLanguage ? selectedLanguage.name : "Select language..."}
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
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white mb-2 focus:outline-none focus:border-rose-500"
            />
            <div className="max-h-48 overflow-y-auto grid grid-cols-1 gap-1">
              {filteredLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                    language === l.code ? "bg-slate-700 text-white font-medium" : "text-slate-300 hover:bg-slate-700"
                  )}
                >
                  {l.name}
                </button>
              ))}
              {filteredLanguages.length === 0 && (
                <div className="text-slate-500 text-sm text-center py-2">No results</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
