import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Calendar, Clock } from 'lucide-react';
import { fetchDetails } from '../../api/tmdb';
import { getImageUrl } from '../../utils/imageUrl';
import { formatRuntime } from '../../utils/runtimeFormat';
import clsx from 'clsx';

const DetailModal = ({ isOpen, onClose, item, contentType }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && item) {
      setLoading(true);
      fetchDetails(item.id, contentType)
        .then(data => setDetails(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setDetails(null);
    }
  }, [isOpen, item, contentType]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !item) return null;

  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? date.split('-')[0] : '';
  const backdropUrl = getImageUrl(item.backdrop_path, 'w1280');
  
  const trailer = details?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = details?.credits?.cast?.slice(0, 5) || [];
  const runtime = details?.runtime || (details?.episode_run_time?.[0]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          layoutId={`card-${item.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-48 sm:h-64 md:h-80 w-full shrink-0">
            {backdropUrl ? (
              <img src={backdropUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-4 overflow-y-auto custom-scrollbar flex-1 relative -mt-20 sm:-mt-32 z-10">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Left Column (Poster - hidden on small mobile) */}
              <div className="hidden sm:block shrink-0 w-32 md:w-48 rounded-lg overflow-hidden shadow-xl border border-slate-700 bg-slate-800">
                {item.poster_path ? (
                  <img src={getImageUrl(item.poster_path, 'w500')} alt={title} className="w-full h-auto" />
                ) : (
                  <div className="aspect-[2/3] w-full" />
                )}
              </div>
              
              {/* Right Column (Details) */}
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
                  {year && <div className="flex items-center gap-1"><Calendar size={14}/> {year}</div>}
                  {runtime > 0 && <div className="flex items-center gap-1"><Clock size={14}/> {formatRuntime(runtime)}</div>}
                  <div className="flex items-center gap-1 text-amber-400 font-medium">
                    <Star size={14} className="fill-current"/> {item.vote_average?.toFixed(1)}
                  </div>
                  {details?.genres && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {details.genres.map(g => (
                        <span key={g.id} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-slate-200 leading-relaxed mb-6">
                  {item.overview || "No overview available."}
                </p>

                {/* Actions / Trailer */}
                {trailer && (
                  <a 
                    href={`https://youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors mb-6"
                  >
                    <Play size={18} className="fill-current" /> Watch Trailer
                  </a>
                )}

                {/* Cast */}
                {cast.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Top Cast</h3>
                    <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
                      {cast.map(person => (
                        <div key={person.id} className="shrink-0 w-20 sm:w-24 snap-start">
                          <div className="w-full aspect-square rounded-full overflow-hidden bg-slate-800 mb-2 border border-slate-700">
                            {person.profile_path ? (
                              <img 
                                src={getImageUrl(person.profile_path, 'w185')} 
                                alt={person.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">No img</div>
                            )}
                          </div>
                          <p className="text-xs text-white text-center font-medium line-clamp-1">{person.name}</p>
                          <p className="text-[10px] text-slate-400 text-center line-clamp-1">{person.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DetailModal;
