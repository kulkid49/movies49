import { useState, useEffect, useCallback } from 'react';
import { fetchDiscover } from '../api/tmdb';
import { getMoodConfig } from '../api/moodMapping';

export const useDiscover = (searchStore) => {
  const { contentType, language, mood, timeAvailable } = searchStore;
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Local filters (e.g. from the FilterBar on results page)
  const [sortBy, setSortBy] = useState('popularity.desc');

  const loadData = useCallback(async (pageNum, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const moodConfig = getMoodConfig(mood, contentType);
      
      const params = {
        page: pageNum,
        sort_by: sortBy,
        with_original_language: language,
        ...moodConfig
      };

      if (timeAvailable) {
        // If it's a movie and we have a value
        if (contentType === 'movie') {
          const timeOpt = ['movie_short', 'movie_long'].includes(timeAvailable) ? 
            (timeAvailable === 'movie_short' ? 100 : 160) : null;
            
          if (timeOpt) {
            params['with_runtime.lte'] = timeOpt;
          } else if (timeAvailable === 'short') {
            params['with_runtime.lte'] = 45; // Just in case
          }
        }
        // TV filtering by runtime isn't directly supported by discover in a reliable way for episodes,
        // so we omit it for TV, or we could add 'with_runtime.lte' but it filters total runtime sometimes.
      }

      const response = await fetchDiscover(contentType, params);
      
      if (append) {
        setData(prev => [...prev, ...response.results]);
      } else {
        setData(response.results);
      }
      
      setHasMore(response.page < response.total_pages);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [contentType, language, mood, timeAvailable, sortBy]);

  // Initial load
  useEffect(() => {
    setPage(1);
    loadData(1, false);
  }, [loadData]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(nextPage, true);
    }
  };

  return { data, loading, error, hasMore, loadMore, sortBy, setSortBy };
};
