import React, { useState, useEffect } from 'react';
import { useSearchStore } from '../store/useSearchStore';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/results/FilterBar';
import ResultsGrid from '../components/results/ResultsGrid';
import DetailModal from '../components/results/DetailModal';
import { useDiscover } from '../hooks/useDiscover';
import AnimatedBackground from '../components/common/AnimatedBackground';

const Results = () => {
  const searchStore = useSearchStore();
  const navigate = useNavigate();
  const { mood, contentType } = searchStore;
  
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Redirect back to landing if no mood is selected
    if (!mood) {
      navigate('/');
    }
  }, [mood, navigate]);

  const { data, loading, hasMore, loadMore, sortBy, setSortBy } = useDiscover(searchStore);

  if (!mood) return null;

  return (
    <div className="min-h-screen relative pb-12">
      <AnimatedBackground />
      
      <FilterBar sortBy={sortBy} setSortBy={setSortBy} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ResultsGrid 
          data={data} 
          loading={loading} 
          hasMore={hasMore} 
          loadMore={loadMore}
          onCardClick={setSelectedItem}
        />
      </main>

      {selectedItem && (
        <DetailModal 
          isOpen={!!selectedItem}
          item={selectedItem}
          contentType={contentType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Results;
