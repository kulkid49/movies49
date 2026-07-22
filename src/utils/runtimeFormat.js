/**
 * Formats a runtime in minutes to "Xh Ym".
 * @param {number} minutes - Runtime in minutes
 * @returns {string} Formatted string
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${m}m`;
};
