// src/utils/stringUtils.js

/**
 * Truncate a string if it's longer than maxLength and add ellipsis
 * @param {string} text - The string to truncate
 * @param {number} maxLength - Maximum allowed length (default 15)
 * @returns {string} - Truncated string with '...' if needed
 */
export function truncateTitle(text :any, maxLength = 15) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
