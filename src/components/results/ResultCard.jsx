import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

const ResultCard = ({ item, onClick }) => {
  const isTV = !!item.first_air_date;
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? date.split('-')[0] : 'N/A';
  
  return (
    <motion.div
      layoutId={`card-${item.id}`}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(item)}
      className="relative rounded-xl overflow-hidden cursor-pointer group bg-slate-800 shadow-xl aspect-[2/3]"
    >
      {item.poster_path ? (
        <img
          src={getImageUrl(item.poster_path, 'w500')}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 p-4 text-center">
          No Image
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
          <span className="text-xs font-medium px-2 py-1 bg-rose-500/80 rounded-md text-white backdrop-blur-sm">
            {isTV ? 'Series' : 'Movie'}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
            <Star size={14} className="fill-current" />
            {item.vote_average ? item.vote_average.toFixed(1) : 'NR'}
          </div>
        </div>
        
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mt-2">{title}</h3>
        <p className="text-slate-300 text-sm mt-1">{year}</p>
        
        <p className="text-slate-400 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
          {item.overview || "No overview available."}
        </p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
