import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import TypeToggle from './TypeToggle';
import LanguageSelector from './LanguageSelector';
import MoodSelector from './MoodSelector';
import TimeSelector from './TimeSelector';

const SearchHero = () => {
  const navigate = useNavigate();
  const { mood } = useSearchStore();

  const handleSearch = () => {
    // Only require mood for now, others have defaults or are optional
    if (!mood) {
      alert("Please select a mood first!");
      return;
    }
    navigate('/results');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-4 sm:mb-6 text-white text-shadow"
          layoutId="main-title"
        >
          What should I watch?
        </motion.h1>
        <p className="text-slate-300 text-base sm:text-lg mb-8 sm:mb-12 text-center max-w-lg">
          Tell us how you're feeling and how much time you have. We'll find the perfect match.
        </p>

        <motion.div 
          className="w-full p-4 sm:p-6 md:p-8 rounded-3xl glass-panel relative z-10"
          layoutId="search-card"
        >
          <TypeToggle />
          
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-stretch md:items-end mt-4">
            <MoodSelector />
            <LanguageSelector />
            <TimeSelector />
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className={`
                group relative w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-rose-500 rounded-full font-bold text-white text-base sm:text-lg
                shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)] hover:shadow-[0_0_60px_-10px_rgba(244,63,94,0.7)]
                transition-all flex items-center gap-3 overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <span className="relative z-10 flex items-center gap-2">
                Find My Watch <Play size={20} className="fill-current" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SearchHero;
