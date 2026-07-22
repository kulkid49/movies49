const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

/**
 * Returns a full image URL from a TMDB path.
 * @param {string} path - The image path from TMDB (e.g., "/someposter.jpg")
 * @param {string} size - The size of the image (e.g., "w500", "w1280", "original")
 * @returns {string} The full URL
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};
