import React from 'react';
import { motion } from 'framer-motion';
import { useSearchStore } from '../../store/useSearchStore';
import { ArrowLeft, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FilterBar = ({ sortBy, setSortBy }) => {
  const navigate = useNavigate();
  const { resetSearch } = useSearchStore();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.div 
      layoutId="search-card"
      className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 p-4 mb-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Settings2 size={16} />
            <span>Refine Search</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-rose-500"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="primary_release_date.desc">Newest</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
