import React from 'react';
import { motion } from 'framer-motion';
import ResultCard from './ResultCard';
import SkeletonCard from '../common/SkeletonCard';

const ResultsGrid = ({ data, loading, hasMore, loadMore, onCardClick }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (data.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-48 h-48 mb-6 opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-full flex items-center justify-center mix-blend-screen">
            <span className="text-4xl">🎬</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
        <p>Try loosening your filters or picking a different mood.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {data.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <ResultCard item={item} onClick={onCardClick} />
          </motion.div>
        ))}
        
        {loading && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div key={`skel-${i}`} variants={itemVariants}>
                <SkeletonCard />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
      
      {!loading && hasMore && (
        <div className="flex justify-center mt-12 mb-8">
          <button 
            onClick={loadMore}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-colors border border-slate-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;
