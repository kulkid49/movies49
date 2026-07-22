import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSearchStore = create(
  persist(
    (set) => ({
      contentType: 'movie', // 'movie' or 'tv'
      language: 'en',
      mood: '',
      timeAvailable: '',

      setContentType: (type) => set({ contentType: type }),
      setLanguage: (lang) => set({ language: lang }),
      setMood: (mood) => set({ mood }),
      setTimeAvailable: (time) => set({ timeAvailable: time }),
      
      resetSearch: () => set({
        contentType: 'movie',
        language: 'en',
        mood: '',
        timeAvailable: ''
      })
    }),
    {
      name: 'mood-movie-search-storage',
    }
  )
);
