// Utility functions for handling Supabase image URLs

const SUPABASE_URL = 'https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads';

/**
 * Converts a photo path to a full Supabase storage URL
 * @param {string} path - The photo path (can be a filename or full URL)
 * @returns {string} - The full Supabase storage URL
 */
export function getImageUrl(path) {
  if (!path) return '';

  // If it's already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Otherwise, construct the Supabase URL
  return `${SUPABASE_URL}/${path}`;
}

/**
 * Converts an array of photo paths to full Supabase storage URLs
 * @param {string[]} paths - Array of photo paths
 * @returns {string[]} - Array of full Supabase storage URLs
 */
export function getImageUrls(paths) {
  if (!Array.isArray(paths)) return [];
  return paths.map(getImageUrl);
}
