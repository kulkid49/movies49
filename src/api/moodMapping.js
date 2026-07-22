// Mood to TMDB genres and keywords mapping
// Movie genres and TV genres have slightly different IDs in TMDB, so we map both.

export const MOODS = [
  { id: 'happy', label: 'Happy & Energetic', color: 'from-amber-400 to-orange-500' },
  { id: 'sad', label: 'Need a Laugh', color: 'from-yellow-300 to-amber-400' },
  { id: 'romantic', label: 'Romantic', color: 'from-pink-500 to-rose-600' },
  { id: 'adventurous', label: 'Adventurous/Thrilling', color: 'from-red-600 to-red-900' },
  { id: 'anxious', label: 'Comfort & Chill', color: 'from-teal-300 to-emerald-400' },
  { id: 'curious', label: 'Curious/Thoughtful', color: 'from-blue-600 to-indigo-700' },
  { id: 'demotivated', label: 'Inspirational', color: 'from-sky-400 to-blue-500' },
  { id: 'nostalgic', label: 'Nostalgic', color: 'from-purple-500 to-fuchsia-600' },
];

export const getMoodConfig = (moodId, contentType = 'movie') => {
  const configs = {
    happy: {
      movie: { with_genres: '28,12,35' }, // Action, Adventure, Comedy
      tv: { with_genres: '10759,35' } // Action & Adventure, Comedy
    },
    sad: {
      movie: { with_genres: '35' }, // Comedy
      tv: { with_genres: '35' } // Comedy
    },
    romantic: {
      movie: { with_genres: '10749' }, // Romance
      tv: { with_genres: '10749' } // Romance (if available, often grouped with Drama in TV but 10749 works sometimes)
    },
    adventurous: {
      movie: { with_genres: '53,27' }, // Thriller, Horror
      tv: { with_genres: '9648,10768' } // Mystery, War & Politics
    },
    anxious: {
      movie: { with_genres: '10751,16' }, // Family, Animation
      tv: { with_genres: '10751,16' } // Family, Animation
    },
    curious: {
      movie: { with_genres: '99,9648' }, // Documentary, Mystery
      tv: { with_genres: '99,9648' } // Documentary, Mystery
    },
    demotivated: {
      movie: { with_genres: '18', with_keywords: '10270' }, // Drama + "biography"
      tv: { with_genres: '18', with_keywords: '10270' }
    },
    nostalgic: {
      movie: { with_genres: '18', 'primary_release_date.lte': '2005-12-31' },
      tv: { with_genres: '18', 'first_air_date.lte': '2005-12-31' }
    }
  };

  return configs[moodId]?.[contentType] || {};
};

// Common Time Available options
export const TIME_OPTIONS = [
  { id: 'short', label: '< 30 min (Quick episode)', type: 'tv' },
  { id: 'movie_short', label: '~1.5 hr', type: 'movie', value: 100 },
  { id: 'movie_long', label: '~2-2.5 hr', type: 'movie', value: 160 },
  { id: 'binge', label: 'I have all day', type: 'any' }
];

// Common Languages (ISO 639-1)
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'bn', name: 'Bengali' },
];
