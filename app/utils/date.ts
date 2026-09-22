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
/**
 * Parse a YYYY-MM-DD date string as a local date (new Date() would parse it as UTC midnight)
 * @param date - Date string in YYYY-MM-DD format
 * @returns The Date at local midnight
 * @example
 * parseDate('2024-01-15') // returns 15 Jan 2024 00:00 local time
 */
export const parseDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year!, month! - 1, day!)
}

export const DATE_RANGES = ['1m', '3m', '6m', '1y', 'all'] as const
export type DateRange = typeof DATE_RANGES[number]

const RANGE_MONTHS: Record<Exclude<DateRange, 'all'>, number> = {
  '1m': 1,
  '3m': 3,
  '6m': 6,
  '1y': 12
}

/**
 * Get the first date (YYYY-MM-DD) included in a date range, counted back from today
 * @param range - The date range
 * @param today - The reference date, defaults to now
 * @returns The start date in YYYY-MM-DD format, or null for 'all'
 * @example
 * getRangeStartDate('3m', new Date(2026, 4, 31)) // returns '2026-02-28'
 */
export const getRangeStartDate = (range: DateRange, today: Date = new Date()): string | null => {
  if (range === 'all') return null

  const targetMonth = today.getMonth() - RANGE_MONTHS[range]
  const lastDayOfTargetMonth = new Date(today.getFullYear(), targetMonth + 1, 0).getDate()
  const start = new Date(today.getFullYear(), targetMonth, Math.min(today.getDate(), lastDayOfTargetMonth))

  const year = start.getFullYear()
  const month = (start.getMonth() + 1).toString().padStart(2, '0')
  const day = start.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Keep only the entries whose date falls within a date range
 * @param entries - Entries with a YYYY-MM-DD date
 * @param range - The date range
 * @param today - The reference date, defaults to now
 * @returns The entries within the range
 */
export const filterByDateRange = <T extends { date: string }>(
  entries: T[],
  range: DateRange,
  today: Date = new Date()
): T[] => {
  const start = getRangeStartDate(range, today)
  if (start === null) return entries
  return entries.filter(entry => entry.date >= start)
}
