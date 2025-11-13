// src/utils/numberUtils.js

/**
 * Format a number into human-readable form with K, M, B suffix
 * @param {number} num - The number to format
 * @returns {string} - Formatted number, e.g., 1.2K, 3.5M
 */
export function MarketFormatNumber(num : any) {
  if (num === null || num === undefined) return '0';
  if (num < 1000) return num.toString();

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (absNum >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
}
