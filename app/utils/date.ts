/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date string or Date object into DD-MM-YYYY format
 * @param date - Date string (YYYY-MM-DD) or Date object to format
 * @returns Formatted date string in DD-MM-YYYY format
 * @example
 * formatDate('2024-01-15') // returns '15-01-2024'
 * formatDate(new Date('2024-06-15')) // returns '15-06-2024'
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
} 