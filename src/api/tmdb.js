import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
  }
});

// Interceptor to handle errors or inject token if needed differently
tmdbApi.interceptors.request.use((config) => {
  // If the token isn't in env but stored elsewhere, can inject here
  return config;
});

export const fetchDiscover = async (type = 'movie', params = {}) => {
  const { data } = await tmdbApi.get(`/discover/${type}`, { params });
  return data;
};

export const fetchDetails = async (id, type = 'movie') => {
  const { data } = await tmdbApi.get(`/${type}/${id}`, {
    params: {
      append_to_response: 'credits,videos,watch/providers'
    }
  });
  return data;
};

export const fetchGenres = async (type = 'movie') => {
  const { data } = await tmdbApi.get(`/genre/${type}/list`);
  return data;
};
